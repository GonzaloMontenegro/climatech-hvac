# Arquitectura del Sistema HVAC

## 1. Árbol de Directorios Next.js 15 (App Router)

```text
/
├── app/
│   ├── (auth)/                 # Rutas relacionadas a la autenticación
│   │   └── login/page.tsx
│   ├── (dashboard)/            # Dashboard del cliente (baja fricción)
│   │   ├── dashboard/page.tsx
│   │   └── layout.tsx
│   ├── (admin)/                # Panel de control operativo (alta densidad, protegido)
│   │   ├── admin/page.tsx
│   │   └── layout.tsx
│   ├── e-commerce/             # Catálogo y carrito de compras
│   │   ├── [equipo_id]/page.tsx
│   │   └── page.tsx
│   ├── climatizacion/          # Páginas SEO programáticas
│   │   └── [servicio]/[comuna]/page.tsx
│   ├── api/                    # Rutas API de Next.js
│   ├── layout.tsx              # Layout raíz 
│   ├── page.tsx                # Landing page principal
│   └── globals.css             # Tailwind v4 y CSS global
├── components/
│   ├── ui/                     # Componentes visuales genéricos
│   ├── seo/                    # Componentes SEO (LocalSchema)
│   └── layout/                 # Componentes de diseño estructural
├── lib/                        # Lógica de negocio y utilidades
│   ├── auth/                   # Lógica de Autenticación (NextAuth / Firebase Auth)
│   ├── db.ts                   # Instancia de Base de Datos (Prisma)
│   ├── firebase/               # Inicialización de Firebase (Client / Admin)
│   ├── store/                  # Estado global (Zustand)
│   ├── gtm/                    # Utilidades analítica
│   ├── actions/                # Server Actions de Next.js
│   └── mockData.ts             # Datos temporales para desarrollo UI
├── types/                      # Interfaces TypeScript globales
├── public/                     # Recursos estáticos
├── next.config.ts              # Configuración de Next.js
├── tailwind.config.ts          # Configuración de estilización (si aplica)
├── tsconfig.json
└── package.json
```

## 2. Esquema de Base de Datos (Definición Base)

*(Nota: Actualmente el proyecto incluye dependencias de Prisma y PostgreSQL en esta rama, pero el esquema se define bajo la óptica de Firebase/NoSQL según `GEMINI.md`)*

### Colección/Tabla: `usuarios`
- `id` (PK): ID del usuario.
- `rol` (String): 'cliente' | 'tecnico' | 'admin'.
- `nombre` (String)
- `email` (String)
- `telefono` (String)
- `direccion` (JSON/Map): comuna y calle.
- `fechaRegistro` (DateTime)

### Colección/Tabla: `equipos_catalogo`
- `id` (PK)
- `sku` (String)
- `marca` (String)
- `modelo` (String)
- `capacidadBTU` (Number)
- `precioCLP` (Number)
- `stock` (Number)
- `etiquetaSEC_url` (String)
- `especificaciones` (JSON/Map)
- `habilitadoECommerce` (Boolean)

### Colección/Tabla: `servicios_instalacion`
- `id` (PK)
- `nombre` (String)
- `precioCLP` (Number)
- `comunasDisponibles` (Array)
- `tiempoEstimadoHoras` (Number)

### Colección/Tabla: `citas_mantenimiento`
- `id` (PK)
- `clienteId` (FK -> usuarios)
- `tecnicoId` (FK -> usuarios, opcional)
- `equipoClienteId` (String)
- `fechaProgramada` (DateTime)
- `estado` (String): 'pendiente' | 'confirmada' | 'en_ruta' | 'completada' | 'cancelada'
- `tipoServicio` (String): 'predictivo' | 'correctivo' | 'instalacion'
