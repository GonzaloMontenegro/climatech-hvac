"use server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";

interface RegisterData {
  nombre: string;
  email: string;
  telefono: string;
  password: string;
}

export async function registerUser(data: RegisterData) {
  const { nombre, email, telefono, password } = data;

  // Verificar si el email ya existe
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { ok: false, error: "Este correo ya está registrado." };
  }

  // Hash de contraseña
  const hashedPassword = await bcrypt.hash(password, 12);

  // Crear usuario + perfil en una transacción
  await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        name: nombre,
        email,
        password: hashedPassword,
      },
    });
    await tx.userProfile.create({
      data: {
        telefono,
        rol: "cliente",
        userId: user.id,
      },
    });
  });

  return { ok: true };
}
