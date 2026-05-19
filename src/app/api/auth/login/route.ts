import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth/password";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email y contraseña son obligatorios." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      include: {
        UserProfile: true,
      },
    });

    if (!user || !user.password) {
      return NextResponse.json({ error: "Credenciales inválidas." }, { status: 401 });
    }

    const valid = verifyPassword(password, user.password);
    if (!valid) {
      return NextResponse.json({ error: "Credenciales inválidas." }, { status: 401 });
    }

    return NextResponse.json({
      uid: user.id,
      email: user.email,
      nombre: user.name,
      rol: user.UserProfile?.rol || "cliente",
      avatar: (user.name || "U").slice(0, 2).toUpperCase(),
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
