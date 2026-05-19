# Historial del Proyecto

Este documento mantiene el registro paso a paso de lo que se ha construido y el plan de construcción.

## Fases Construidas (Hasta la fecha)

1. **Inicialización y Configuración Base**:
   - Configuración de **Next.js 15** utilizando App Router y Turbopack.
   - Integración de **Tailwind CSS v4** y **TypeScript** en modo estricto.
   - Definición de reglas del proyecto mediante `GEMINI.md`.

2. **Estructura de Enrutamiento (Routing)**:
   - Rutas públicas: Landing page principal, e-commerce (`/e-commerce`) y páginas SEO dinámicas (`/climatizacion/[servicio]/[comuna]`).
   - Rutas de clientes: Zona protegida en `(dashboard)` con subrutas para citas, garantías y mis-equipos.
   - Rutas administrativas: Zona protegida en `(admin)` para control de inventario y asignaciones.
   - Rutas de autenticación: Módulo `(auth)` para login.

3. **Arquitectura de Lógica y Datos (`src/lib`)**:
   - Setup inicial de **Firebase** (`src/lib/firebase/`) tanto para el cliente como con Firebase Admin.
   - Creación de *Mock Data* (`mockData.ts`) para trabajar el UI antes de conectar la DB.
   - Configuración de estado global con Zustand (`src/lib/store/`).
   - Exploración de stack híbrido en ramas (Prisma y NextAuth introducidos en `feature/ui-mejoras`).

4. **SEO y Componentes Base**:
   - Creación de esquema estructurado Local (`LocalSchema.tsx`) para posicionamiento.
   - Layouts maestros configurados.

## Fases por Construir

1. **Consolidación del Stack**: Alinear el código de la rama actual con las directrices de `GEMINI.md` (Firebase Auth y Firestore) o actualizar las reglas si se adopta NextAuth + PostgreSQL (Prisma).
2. **Diseño Visual (UI/UX)**:
   - Implementar el diseño minimalista en las interfaces de E-commerce y Dashboard.
   - Construir los componentes UI reutilizables (Botones, Tarjetas, Modales) con Tailwind.
3. **Integración Backend**:
   - Conectar las vistas con los datos de Firebase/Prisma.
   - Implementar la protección de rutas usando el `middleware.ts`.
4. **Funcionalidades Core**:
   - Carrito de compras funcional (Zustand + UI).
   - Motor de reservas y cotizador BTU.
