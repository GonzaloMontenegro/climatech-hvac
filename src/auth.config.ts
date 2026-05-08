import type { NextAuthConfig } from "next-auth";

// Configuración edge-compatible (sin Prisma) — se usa en middleware
// La configuración completa con adaptador Prisma está en src/auth.ts
export default {
  providers: [], // los providers reales se definen en auth.ts
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isProtected =
        nextUrl.pathname.startsWith("/dashboard") ||
        nextUrl.pathname.startsWith("/admin");

      if (isProtected && !isLoggedIn) {
        return Response.redirect(new URL("/login", nextUrl));
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
