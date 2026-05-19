# Backlog del Proyecto - Plataforma HVAC

## ✅ Sprint Completado: Arquitectura y UI (Fase 1)
- [x] **Resolución de Stack Tecnológico**: Migrado al 100% a arquitectura Firebase (Prisma y NextAuth eliminados).
- [x] **Diseño del E-commerce**: Vistas de catálogo y detalle (`e-commerce`) maquetadas con diseño premium.
- [x] **Layouts de Plataforma**: `(dashboard)` y `(admin)` estilizados con barras de navegación oscuras y métricas funcionales.
- [x] **Calculadora de BTU**: Componente visual e interactivo terminado e integrado en la landing.
- [x] **Mock Auth**: Sistema de autenticación de prueba implementado para desarrollo visual.

## 🚀 Próximo Sprint: Integración Backend Firebase (Fase 2)
- [ ] **Autenticación Real (Firebase Auth)**: Reemplazar `demoAuth.tsx` por el SDK real de Firebase Auth (Email/Password y Google).
- [ ] **Conexión Firestore**: Sustituir el catálogo estático (`MOCK_EQUIPOS`) por queries reales a la base de datos NoSQL para E-commerce y Dashboards.
- [ ] **Lógica de Carrito de Compras**: Desarrollar el panel lateral/flotante del carrito y su estado persistente con Zustand.
- [ ] **Protección de Rutas Definitiva**: Crear un middleware seguro o hooks de protección de servidor que verifiquen el token JWT de Firebase.

## 🧊 Congelador (Prioridad Baja)
- [ ] **Panel Administrativo Completo**: Vistas complejas de tabla para gestión de inventario, asignación de técnicos y métricas.
- [ ] **Eventos de Analítica**: Integración de eventos GTM (ViewItem, AddToCart, Purchase) en las interacciones clave.
- [ ] **Generación de PDFs**: Generación de cotizaciones en formato PDF para enviar a los clientes por correo.
