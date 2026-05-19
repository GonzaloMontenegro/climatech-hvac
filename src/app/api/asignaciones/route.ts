import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const servicios = await prisma.servicio.findMany({
      orderBy: {
        fecha: "asc",
      },
    });
    return NextResponse.json(servicios);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { serviceId, tecnicoNombre } = body;

    if (!serviceId) {
      return NextResponse.json({ error: "ID de servicio requerido" }, { status: 400 });
    }

    const updated = await prisma.servicio.update({
      where: { id: serviceId },
      data: {
        tecnico: tecnicoNombre,
        estado: "confirmada", // Cambia a confirmada automáticamente cuando se asigna técnico
      },
    });

    return NextResponse.json(updated);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
