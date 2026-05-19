import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    let citas;
    if (userId) {
      citas = await prisma.servicio.findMany({
        where: { userId },
        orderBy: { fecha: "asc" },
      });
    } else {
      citas = await prisma.servicio.findMany({
        orderBy: { fecha: "asc" },
      });
    }

    return NextResponse.json(citas);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, tipo, equipo, fecha, hora, notas } = body;

    if (!userId || !tipo || !fecha) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    const citaId = "srv-" + crypto.randomUUID().slice(0, 10);

    // Intentamos buscar si hay un equipo que coincida para asociarlo
    let equipoId = null;
    if (equipo) {
      const dbEquipo = await prisma.equipo.findFirst({
        where: {
          userId,
          OR: [
            { modelo: { contains: equipo, mode: "insensitive" } },
            { marca: { contains: equipo, mode: "insensitive" } },
          ],
        },
      });
      if (dbEquipo) {
        equipoId = dbEquipo.id;
      }
    }

    const cita = await prisma.servicio.create({
      data: {
        id: citaId,
        userId,
        tipo,
        fecha: new Date(fecha),
        hora: hora || "09:00",
        notas: notas || `Equipo: ${equipo || "No especificado"}`,
        estado: "pendiente",
        duracion: "2 horas",
        precio: tipo.toLowerCase().includes("limpieza") ? 18000 : 35000,
        equipoId: equipoId,
      },
    });

    return NextResponse.json(cita);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
