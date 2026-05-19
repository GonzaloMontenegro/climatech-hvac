// Datos mock para demo — se reemplazarán por queries a Prisma/PostgreSQL
// cuando la base de datos de Render esté conectada

export const MOCK_EQUIPOS_CLIENTE = [
  {
    id: "ceq-001",
    marca: "Samsung",
    modelo: "Wind-Free Inverter 9000 BTU",
    ubicacion: "Dormitorio Principal",
    instalado: "2023-08-15",
    garantiaHasta: "2026-08-15",
    estadoGarantia: "vigente",
    ultimoMantenimiento: "2025-01-10",
    proximoMantenimiento: "2025-07-10",
    estado: "operativo",
    eficiencia: 94,
    btu: 9000,
  },
  {
    id: "ceq-002",
    marca: "LG",
    modelo: "Dualcool Premium 12000 BTU",
    ubicacion: "Living Comedor",
    instalado: "2022-12-01",
    garantiaHasta: "2025-12-01",
    estadoGarantia: "por vencer",
    ultimoMantenimiento: "2024-11-20",
    proximoMantenimiento: "2025-05-20",
    estado: "requiere_servicio",
    eficiencia: 78,
    btu: 12000,
  },
];

export const MOCK_CITAS = [
  {
    id: "cita-001",
    tipo: "Mantenimiento Preventivo",
    equipo: "Samsung Wind-Free - Dormitorio",
    tecnico: "Roberto Pizarro",
    fecha: "2025-05-20",
    hora: "10:00",
    estado: "confirmada",
    duracion: "2 horas",
    precio: 35000,
  },
  {
    id: "cita-002",
    tipo: "Limpieza de Filtros",
    equipo: "LG Dualcool - Living",
    tecnico: "Patricia Jara",
    fecha: "2025-06-05",
    hora: "14:30",
    estado: "pendiente",
    duracion: "1 hora",
    precio: 18000,
  },
  {
    id: "cita-003",
    tipo: "Mantenimiento Preventivo",
    equipo: "Samsung Wind-Free - Dormitorio",
    tecnico: "Roberto Pizarro",
    fecha: "2024-12-10",
    hora: "09:00",
    estado: "completada",
    duracion: "2 horas",
    precio: 35000,
  },
];

export const MOCK_TECNICOS = [
  { id: "tec-001", nombre: "Roberto Pizarro", zona: "Recoleta / Independencia", citasHoy: 3, estado: "activo", rating: 4.9 },
  { id: "tec-002", nombre: "Patricia Jara", zona: "Providencia / Ñuñoa", citasHoy: 2, estado: "en_ruta", rating: 4.8 },
  { id: "tec-003", nombre: "Marcelo Soto", zona: "Santiago Centro", citasHoy: 4, estado: "activo", rating: 4.7 },
  { id: "tec-004", nombre: "Claudia Rojas", zona: "Las Condes / Vitacura", citasHoy: 1, estado: "libre", rating: 5.0 },
];

export const MOCK_SERVICIOS_TIPO = [
  { id: "preventivo", label: "Mantenimiento Preventivo", duracion: "2 horas", precio: 35000, icon: "🔧" },
  { id: "correctivo", label: "Mantenimiento Correctivo", duracion: "Variable", precio: null, icon: "🛠️" },
  { id: "limpieza_filtros", label: "Limpieza de Filtros", duracion: "1 hora", precio: 18000, icon: "💧" },
  { id: "carga_gas", label: "Carga de Gas Refrigerante", duracion: "1-2 horas", precio: 45000, icon: "🧊" },
  { id: "revision_electrica", label: "Revisión Eléctrica", duracion: "1 hora", precio: 25000, icon: "⚡" },
  { id: "instalacion", label: "Instalación de Equipo", duracion: "3-4 horas", precio: 60000, icon: "📦" },
];

export const MOCK_METRICAS_ADMIN = {
  ingresosMes: 4850000,
  ingresosMesAnterior: 3800000,
  citasMes: 47,
  citasCompletadas: 38,
  clientesActivos: 124,
  clientesNuevosMes: 12,
  ticketPromedio: 38000,
  nps: 87,
  serviciosMes: 47,
  ingresosTecnicos: 2840000,
};

export const MOCK_EQUIPOS = [
  {
    id: "eq-001",
    sku: "HVAC-SM-001",
    marca: "Samsung",
    modelo: "Wind-Free Premium",
    categoria: "Split",
    capacidadBTU: 12000,
    precioCLP: 450000,
    stock: 8,
    color: "#2563eb",
    eficiencia: "A++",
    descripcion: "Aire acondicionado con tecnología Wind-Free que enfría sin ráfagas de aire directo. Ideal para dormitorios y salas de estar.",
  },
  {
    id: "eq-002",
    sku: "HVAC-LG-001",
    marca: "LG",
    modelo: "Dual Inverter ARTCOOL",
    categoria: "Split",
    capacidadBTU: 18000,
    precioCLP: 580000,
    stock: 2,
    color: "#16a34a",
    eficiencia: "A+++",
    descripcion: "Diseño elegante y panel de espejo. Con compresor Dual Inverter que ahorra hasta un 70% de energía y enfría un 40% más rápido.",
  },
  {
    id: "eq-003",
    sku: "HVAC-MD-001",
    marca: "Midea",
    modelo: "Xtreme Save Pro",
    categoria: "Split",
    capacidadBTU: 9000,
    precioCLP: 320000,
    stock: 0,
    color: "#ea580c",
    eficiencia: "A+",
    descripcion: "Modo ahorro extremo de energía. Funciona incluso con fluctuaciones de voltaje. Filtro de alta densidad anti-polvo.",
  },
  {
    id: "eq-004",
    sku: "HVAC-SM-002",
    marca: "Samsung",
    modelo: "Cassette 360",
    categoria: "VRF/VRV",
    capacidadBTU: 36000,
    precioCLP: 1250000,
    stock: 15,
    color: "#9333ea",
    eficiencia: "A",
    descripcion: "Diseño circular innovador que distribuye el aire de manera uniforme en todas las direcciones sin corrientes frías.",
  }
];
