/* Datos de Mabit — editá solo el array/objeto de abajo, tal cual fuera JSON.
   Se carga con <script src> (no fetch) para que el sitio funcione
   abriendo el .html con doble clic, sin necesidad de servidor. */
window.MABIT_DATA = window.MABIT_DATA || {};
window.MABIT_DATA.products = [
  {
    "id": "proge",
    "code": "01 — ERP Comercial",
    "name": "Mabit Pro GE",
    "tagline": "Sistema ERP de gestión comercial multisucursal: stock, ventas, compras, caja, facturación electrónica y reportes en un solo lugar.",
    "status": "live",
    "platform": "Aplicación de escritorio + apps web complementarias (inventario y más), con soporte multisucursal.",
    "industries": ["Hoteles", "Supermercados", "Ferreterías", "Restaurantes", "Cafeterías", "Talleres mecánicos", "Casas de repuestos", "Peluquerías"],
    "note": "Con facturación electrónica conforme a la DNIT (Paraguay). ¿Operás en otro país? El sistema es parametrizable a la normativa fiscal local.",
    "images": [
      "assets/img/products/proge/screenshot-1.jpg",
      "assets/img/products/proge/screenshot-2.jpg",
      "assets/img/products/proge/screenshot-3.jpg"
    ],
    "pricing": {
      "currency": "Gs.",
      "monthly": 300000,
      "annual": 3000000,
      "unit": "por terminal",
      "includes": [
        "Sin límites de usuarios, productos ni cantidad de facturación",
        "Asistencia técnica incluida",
        "Actualizaciones sin costo adicional"
      ],
      "installNote": "La instalación tiene un costo aparte según la cantidad de terminales y la complejidad del trabajo — te lo pasamos en privado, a medida.",
      "extra": "¿Sos emprendedor? Tenemos descuentos especiales. ¿Ya usás otro sistema? Te migramos los datos sin problemas.",
      "cta": "Este precio es solo una referencia — escribinos y conversamos según tu caso."
    },
    "actions": [
      {
        "label": "Solicitar demo",
        "type": "whatsapp",
        "text": "Hola, quiero más información sobre Mabit Pro GE"
      }
    ]
  },
  {
    "id": "citas",
    "code": "02 — Agenda & Turnos",
    "name": "Mabit Citas",
    "tagline": "Control de citas y turnos: agenda online, recordatorios por WhatsApp y disponibilidad en tiempo real.",
    "status": "live",
    "note": "Pensado para clínicas, salones y estudios que gestionan turnos todos los días.",
    "images": [
      "assets/img/products/citas/screenshot-1.jpg",
      "assets/img/products/citas/screenshot-2.jpg"
    ],
    "pricing": {
      "currency": "Gs.",
      "monthly": 100000,
      "annual": 1000000,
      "unit": "por negocio",
      "includes": [
        "Hasta 5 usuarios y sin límites de citas agendadas",
        "Asistencia técnica incluida",
        "Actualizaciones sin costo adicional"
      ],
      "installNote": "No se requiere instalar nada. El costo del despliegue es Gs. 500.000 (pago por única vez)",
      "extra": "¿Sos emprendedor? Tenemos descuentos especiales.",
      "cta": "Este precio es solo una referencia — escribinos y conversamos según tu caso."
    },
    "actions": [
      {
        "label": "Ver plataforma",
        "type": "link",
        "url": "https://citas.mabit.com.py/"
      },
      {
        "label": "Consultar",
        "type": "whatsapp",
        "text": "Hola, quiero más información sobre Mabit Citas"
      }
    ]
  },
  {
    "id": "go",
    "code": "03 — Logística",
    "name": "Mabit Go",
    "tagline": "Envío y rastreo de paquetes en tiempo real, de origen a destino.",
    "status": "soon",
    "note": "Dejanos tu contacto y te avisamos apenas esté disponible.",
    "images": [
      "assets/img/products/go/coming-soon.svg"
    ],
    "actions": [
      {
        "label": "Avisenme",
        "type": "whatsapp",
        "text": "Hola, quiero que me avisen cuando lance Mabit Go"
      }
    ]
  },
  {
    "id": "agro",
    "code": "04 — Agroganadera",
    "name": "Mabit Agro",
    "tagline": "Gestión agroganadera: control de hacienda, insumos, producción y campo.",
    "status": "soon",
    "note": "Dejanos tu contacto y te avisamos apenas esté disponible.",
    "images": [
      "assets/img/products/agro/coming-soon.svg"
    ],
    "actions": [
      {
        "label": "Avisenme",
        "type": "whatsapp",
        "text": "Hola, quiero que me avisen cuando lance Mabit Agro"
      }
    ]
  }
];
