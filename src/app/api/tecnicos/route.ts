import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const tecnicos = await prisma.user.findMany({
      where: {
        UserProfile: {
          rol: "tecnico",
        },
      },
      include: {
        UserProfile: true,
      },
    });

    const parsed = tecnicos.map((t) => ({
      id: t.id,
      nombre: t.name || "Sin nombre",
      email: t.email,
      telefono: t.UserProfile?.telefono || "",
      zona: t.UserProfile?.comuna || "General",
      rating: 4.8, // Mocked rating
      citasHoy: 0,
      estado: "activo",
    }));

    return NextResponse.json(parsed);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nombre, email, telefono, zona } = body;

    if (!email) {
      return NextResponse.json({ error: "El email es requerido" }, { status: 400 });
    }

    const userId = "tec-" + crypto.randomUUID().slice(0, 10);
    const profileId = "prof-" + crypto.randomUUID().slice(0, 10);

    const user = await prisma.user.create({
      data: {
        id: userId,
        name: nombre,
        email: email.toLowerCase(),
        updatedAt: new Date(),
        UserProfile: {
          create: {
            id: profileId,
            telefono: telefono || "",
            rol: "tecnico",
            comuna: zona || "",
          },
        },
      },
      include: {
        UserProfile: true,
      },
    });

    return NextResponse.json({
      id: user.id,
      nombre: user.name,
      email: user.email,
      telefono: user.UserProfile?.telefono,
      zona: user.UserProfile?.comuna,
      rating: 4.8,
      citasHoy: 0,
      estado: "activo",
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
