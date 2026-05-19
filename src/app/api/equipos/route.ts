import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "El userId es requerido" }, { status: 400 });
    }

    const equipos = await prisma.equipo.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(equipos);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, marca, modelo, btu, ubicacion, instalado, garantia } = body;

    if (!userId || !marca || !modelo || !btu || !ubicacion) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    const equipoId = "eq-" + crypto.randomUUID().slice(0, 10);

    const equipo = await prisma.equipo.create({
      data: {
        id: equipoId,
        userId,
        marca,
        modelo,
        btu: Number(btu),
        ubicacion,
        instalado: instalado ? new Date(instalado) : new Date(),
        garantia: garantia ? new Date(garantia) : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 año por defecto
      },
    });

    return NextResponse.json(equipo);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
