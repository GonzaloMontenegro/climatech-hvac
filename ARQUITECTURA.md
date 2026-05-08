# Arquitectura del Sistema HVAC

## 1. Árbol de Directorios Next.js 15 (App Router)

```text
/
├── app/
│   ├── (auth)/                 # Rutas relacionadas a la autenticación
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (dashboard)/            # Dashboard del cliente (baja fricción)
│   │   ├── dashboard/page.tsx
│   │   ├── mis-equipos/page.tsx
│   │   └── garantias/page.tsx
│   ├── (admin)/                # Panel de control operativo (alta densidad, protegido)
│   │   ├── admin/page.tsx
│   │   ├── inventario/page.tsx
│   │   └── asignaciones/page.tsx
│   ├── e-commerce/             # Catálogo y carrito de compras
│   │   ├── [equipo_id]/page.tsx
│   │   └── carrito/page.tsx
│   ├── api/                    # Rutas API de Next.js (ej. Merchant API)
│   ├── layout.tsx              # Layout raíz (GoogleTagManager)
│   ├── page.tsx                # Landing page (Motor de Leads / Calculadora BTU)
│   └── globals.css             # Tailwind y CSS global
├── components/
│   ├── ui/                     # Componentes visuales genéricos
│   ├── hvac/                   # Componentes específicos (Calculadora BTU, Etiquetas SEC)
│   └── layout/                 # Componentes de diseño estructural
├── lib/                        # Lógica de negocio y utilidades
│   ├── firebase/               # Inicialización (auth, firestore)
│   ├── store/                  # Estado global (Zustand)
│   ├── gtm/                    # Utilidades analítica (view_item, etc.)
│   └── utils.ts
├── types/                      # Interfaces TypeScript globales
├── public/                     # Recursos estáticos
├── next.config.mjs             # Configuración de Next.js
├── tailwind.config.ts          # Configuración de estilización
├── tsconfig.json
└── package.json
```

## 2. Esquema NoSQL de Firebase (Firestore)

### Colección: `usuarios`
- `uid` (String, PK): ID del usuario de Auth.
- `rol` (String): 'cliente' | 'tecnico' | 'admin' (sincronizado con custom claims).
- `nombre` (String)
- `email` (String)
- `telefono` (String)
- `direccion` (Map):
  - `comuna` (String)
  - `calle` (String)
- `fechaRegistro` (Timestamp)

### Colección: `equipos_catalogo`
- `id` (String, PK)
- `sku` (String)
- `marca` (String)
- `modelo` (String)
- `capacidadBTU` (Number)
- `precioCLP` (Number)
- `stock` (Number)
- `etiquetaSEC_url` (String) # PE Nº 1/26/2:2020
- `especificaciones` (Map)
- `habilitadoECommerce` (Boolean)

### Colección: `servicios_instalacion`
- `id` (String, PK)
- `nombre` (String) # ej. 'Instalación Recoleta'
- `precioCLP` (Number)
- `comunasDisponibles` (Array<String>)
- `tiempoEstimadoHoras` (Number)

### Colección: `citas_mantenimiento`
- `id` (String, PK)
- `clienteId` (Reference -> usuarios)
- `tecnicoId` (Reference -> usuarios, opcional)
- `equipoClienteId` (String)
- `fechaProgramada` (Timestamp)
- `estado` (String): 'pendiente' | 'confirmada' | 'en_ruta' | 'completada' | 'cancelada'
- `tipoServicio` (String): 'predictivo' | 'correctivo' | 'instalacion'

### Colección: `ordenes_telemetria`
- `id` (String, PK)
- `clienteId` (Reference -> usuarios)
- `estadoPago` (String): 'pendiente' | 'pagado' | 'rechazado'
- `items` (Array):
  - `tipo` (String): 'equipo' | 'servicio'
  - `itemId` (String)
  - `cantidad` (Number)
  - `precioUnitario` (Number)
- `totalCLP` (Number)
- `eventosGTM_emitidos` (Boolean)
- `fechaOrden` (Timestamp)
