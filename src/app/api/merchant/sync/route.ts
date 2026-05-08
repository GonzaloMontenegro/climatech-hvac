import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { adminDb } from "@/lib/firebase/admin";

export async function POST(request: NextRequest) {
  try {
    const client = new google.auth.JWT(
      process.env.FIREBASE_CLIENT_EMAIL,
      undefined,
      process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      ["https://www.googleapis.com/auth/content"]
    );

    await client.authorize();
    
    const merchant = google.content({
      version: "v2.1",
      auth: client
    });

    const merchantId = process.env.MERCHANT_ACCOUNT_ID;
    if (!merchantId) throw new Error("MERCHANT_ACCOUNT_ID is missing");

    const snapshot = await adminDb.collection("equipos_catalogo").where("habilitadoECommerce", "==", true).get();
    const batchRequests: any[] = [];

    snapshot.docs.forEach((doc, idx) => {
      const data = doc.data();
      batchRequests.push({
        batchId: idx,
        merchantId: merchantId,
        method: "insert",
        productId: `online:es:CL:${data.sku}`,
        product: {
          offerId: data.sku,
          title: `${data.marca} ${data.modelo} - ${data.capacidadBTU} BTU`,
          description: "Aire Acondicionado HVAC Alta Eficiencia",
          link: `${process.env.NEXT_PUBLIC_BASE_URL}/e-commerce/${doc.id}`,
          imageLink: data.etiquetaSEC_url || "https://placeholder.com/default.jpg",
          contentLanguage: "es",
          targetCountry: "CL",
          feedLabel: "CL",
          channel: "online",
          availability: data.stock > 0 ? "in stock" : "out of stock",
          condition: "new",
          price: {
            value: data.precioCLP.toString(),
            currency: "CLP"
          }
        }
      });
    });

    if (batchRequests.length > 0) {
      await merchant.products.custombatch({
        requestBody: { entries: batchRequests }
      });
    }

    return NextResponse.json({ success: true, count: batchRequests.length }, { status: 200 });

  } catch (err: any) {
    console.error("Merchant Sync Err:", err.message);
    return NextResponse.json({ error: "Failed to sync catalog" }, { status: 500 });
  }
}
