// Estructura única del panel de SuperAdmin: 5 grupos (P1-P5), cada uno con
// sus casos de uso (CU). Es la fuente de verdad tanto para el menú
// desplegable (AdminMenu.jsx) como para las rutas placeholder en App.jsx,
// para que nunca queden desincronizados.
export const GRUPOS_ADMIN = [
  {
    id: 'p1',
    titulo: 'Usuarios y Seguridad',
    items: [
      {
        cu: 'CU01',
        titulo: 'Gestionar Cuentas de Empresas',
        to: '/admin/empresas',
        implementado: true,
      },
      {
        cu: 'CU02',
        titulo: 'Autenticar y Registrar Usuarios',
        to: '/admin/usuarios',
        implementado: true,
      },
      {
        cu: 'CU03',
        titulo: 'Gestionar Perfil de Usuarios',
        to: '/perfil',
        implementado: true,
      },
      {
        cu: 'CU09',
        titulo: 'Gestionar Empleados y Permisos',
        to: '/admin/empleados',
        descripcion:
          'Define qué puede ver y hacer cada empleado de una empresa: a qué secciones tiene acceso su cuenta.',
      },
      {
        cu: 'CU24',
        titulo: 'Administrar Roles y Permisos',
        to: '/admin/roles',
        implementado: true,
      },
    ],
  },
  {
    id: 'p2',
    titulo: 'Catálogo y Productos',
    items: [
      {
        cu: 'CU06',
        titulo: 'Gestionar Categorías de Productos',
        to: '/admin/categorias',
        descripcion: 'Crear, editar y eliminar categorías, y ver qué productos están dentro de cada una.',
      },
      {
        cu: 'CU07',
        titulo: 'Gestionar Productos',
        to: '/admin/productos',
        descripcion: 'Registrar, editar y eliminar productos, y ver los productos que registraron las empresas.',
      },
      {
        cu: 'CU08',
        titulo: 'Categorizar Producto mediante Visión Artificial',
        to: '/admin/vision-artificial',
        descripcion:
          'Clasifica automáticamente los productos que suben las empresas usando un modelo de visión artificial, sugiriendo la categoría antes de publicarlos.',
      },
      {
        cu: 'CU05',
        titulo: 'Buscar y Explorar Catálogo de Productos',
        to: '/admin/catalogo',
        descripcion:
          'Vista administrativa del catálogo público, con los mismos filtros de búsqueda y categorías que ve el comprador, para supervisión y soporte.',
      },
      {
        cu: 'CU25',
        titulo: 'Personalizar Vitrina Digital de Empresa',
        to: '/admin/vitrina',
        descripcion:
          'Permite a cada empresa personalizar el diseño de su vitrina (banner, colores, orden de productos destacados) dentro del marketplace.',
      },
    ],
  },
  {
    id: 'p3',
    titulo: 'Inventario, Pedidos y Ventas',
    items: [
      {
        cu: 'CU10',
        titulo: 'Gestionar Inventario y Stock',
        to: '/admin/inventario',
        descripcion: 'Control de existencias por producto y empresa, con alertas de stock bajo y ajustes manuales o automáticos por venta.',
      },
      {
        cu: 'CU11',
        titulo: 'Gestionar Carrito de Compras',
        to: '/admin/carritos',
        descripcion: 'Vista administrativa de los carritos activos y abandonados de los compradores, para soporte y análisis de conversión.',
      },
      {
        cu: 'CU12',
        titulo: 'Gestionar Pedidos y Ventas',
        to: '/admin/pedidos',
        descripcion: 'Seguimiento del ciclo de vida de cada pedido (pendiente, confirmado, en camino, entregado, cancelado) y su venta asociada.',
      },
      {
        cu: 'CU13',
        titulo: 'Gestionar Entregas',
        to: '/admin/entregas',
        descripcion: 'Asignación y seguimiento de repartidores o puntos de entrega, y el estado de cada envío.',
      },
      {
        cu: 'CU26',
        titulo: 'Gestionar Facturación y Comisiones',
        to: '/admin/facturacion',
        descripcion: 'Cálculo y registro de las comisiones que cobra la plataforma a cada empresa por venta, y la generación de comprobantes.',
      },
    ],
  },
  {
    id: 'p4',
    titulo: 'Comunicación, Marketing y Live Commerce',
    items: [
      {
        cu: 'CU04',
        titulo: 'Gestionar Reputación y Valoraciones',
        to: '/admin/reputacion',
        descripcion: 'Moderación de las calificaciones y reseñas que dejan los compradores sobre productos y empresas.',
      },
      {
        cu: 'CU14',
        titulo: 'Gestionar Chat Interno entre Comprador y Empresa',
        to: '/admin/chat',
        descripcion: 'Supervisión de las conversaciones entre compradores y empresas dentro de la plataforma.',
      },
      {
        cu: 'CU15',
        titulo: 'Consultar Chatbot de Atención',
        to: '/admin/chatbot',
        descripcion: 'Configuración y monitoreo del chatbot de atención automática al comprador.',
      },
      {
        cu: 'CU16',
        titulo: 'Gestionar Promociones y Descuentos',
        to: '/admin/promociones',
        descripcion: 'Creación y seguimiento de cupones, descuentos y campañas promocionales por empresa o plataforma.',
      },
      {
        cu: 'CU17',
        titulo: 'Gestionar Transmisiones en Vivo - Live Commerce',
        to: '/admin/live-commerce',
        descripcion: 'Programación y moderación de transmisiones en vivo donde las empresas venden sus productos.',
      },
      {
        cu: 'CU27',
        titulo: 'Gestionar Programa de Referidos',
        to: '/admin/referidos',
        descripcion: 'Seguimiento de invitaciones entre usuarios y las recompensas del programa de referidos.',
      },
    ],
  },
  {
    id: 'p5',
    titulo: 'Reportes, IA y Auditoría',
    items: [
      {
        cu: 'CU18',
        titulo: 'Visualizar Dashboard y Reportes de Empresa',
        to: '/admin/reportes-empresa',
        descripcion: 'Métricas de ventas, productos más vendidos y desempeño para cada empresa.',
      },
      {
        cu: 'CU19',
        titulo: 'Visualizar Dashboard y Reportes Administrativos',
        to: '/admin/reportes-admin',
        descripcion: 'Métricas globales de la plataforma: usuarios, empresas, ventas y crecimiento.',
      },
      {
        cu: 'CU20',
        titulo: 'Gestionar Planes y Suscripciones',
        to: '/admin/planes',
        descripcion: 'Definición de los planes de suscripción para empresas y su ciclo de cobro.',
      },
      {
        cu: 'CU21',
        titulo: 'Generar Recomendaciones mediante Inteligencia Artificial',
        to: '/admin/recomendaciones-ia',
        descripcion: 'Motor de recomendación de productos personalizado según el historial de cada comprador.',
      },
      {
        cu: 'CU22',
        titulo: 'Consultar Logs de Auditoría del Sistema',
        to: '/bitacora',
        implementado: true,
      },
      {
        cu: 'CU23',
        titulo: 'Gestionar Notificaciones del Sistema',
        to: '/admin/notificaciones',
        descripcion: 'Configuración y envío de notificaciones a usuarios y empresas (push, email, in-app).',
      },
    ],
  },
];
