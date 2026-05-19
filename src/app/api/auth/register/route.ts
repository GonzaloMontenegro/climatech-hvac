import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth/password";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nombre, email, password, telefono, comuna } = body;

    if (!email || !password || !nombre) {
      return NextResponse.json(
        { error: "Nombre, email y contraseña son obligatorios." },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "El correo electrónico ya está registrado." },
        { status: 400 }
      );
    }

    const hashedPassword = hashPassword(password);
    const userId = "usr-" + crypto.randomUUID().slice(0, 10);
    const profileId = "prof-" + crypto.randomUUID().slice(0, 10);

    // Si es el primer usuario en registrarse, le otorgamos rol "admin" automáticamente
    const userCount = await prisma.user.count();
    const rol = userCount === 0 ? "admin" : "cliente";

    const user = await prisma.user.create({
      data: {
        id: userId,
        name: nombre,
        email: email.toLowerCase(),
        password: hashedPassword,
        updatedAt: new Date(),
        UserProfile: {
          create: {
            id: profileId,
            telefono: telefono || "",
            comuna: comuna || "",
            rol: rol,
          },
        },
      },
      include: {
        UserProfile: true,
      },
    });

    return NextResponse.json({
      uid: user.id,
      email: user.email,
      nombre: user.name,
      rol: user.UserProfile?.rol || "cliente",
      avatar: (user.name || "U").slice(0, 2).toUpperCase(),
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 550 });
  }
}
