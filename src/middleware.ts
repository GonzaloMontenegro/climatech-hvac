import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// En modo demo, la autenticación se maneja completamente en el cliente
// via localStorage. El middleware sólo bloquea rutas si no hay ningún
// indicador de sesión en las cookies (modo producción con Firebase).
// Durante desarrollo, dejamos pasar todas las rutas protegidas y el
// AuthProvider del cliente se encarga de redirigir si no hay sesión.

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // En producción con Firebase real, aquí se verificaría la session cookie.
  // En modo demo, permitir el paso — el AuthProvider client-side maneja el RBAC.
  const isProtectedRoute = pathname.startsWith('/admin') || pathname.startsWith('/dashboard');
  const isAuthRoute = pathname === '/login';

  // Si hay cookie de sesión real (producción Firebase), validar aquí.
  const session = request.cookies.get('session');

  // Modo producción: bloquear sin sesión
  if (session === undefined && isProtectedRoute && process.env.NODE_ENV === 'production') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Modo desarrollo / demo: dejar pasar, el AuthProvider redirige
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*', '/login'],
};
