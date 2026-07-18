/* Datos de Mabit — editá solo el array de abajo, tal cual fuera JSON.
   Se carga con <script src> (no fetch) para que el sitio funcione
   abriendo el .html con doble clic, sin necesidad de servidor.

   Cada item: name, description, icon (ruta local), url (link externo
   de descarga oficial), category (para agrupar). */
window.MABIT_DATA = window.MABIT_DATA || {};
window.MABIT_DATA.downloads = [
  {
    "name": "OpenJDK 21",
    "description": "Entorno de ejecución Java, requerido para instalar y correr Mabit Pro GE.",
    "icon": "assets/img/tech/java.svg",
    "url": "https://jdk.java.net/21/",
    "category": "Requisitos del sistema"
  },
  {
    "name": "PostgreSQL",
    "description": "Motor de base de datos utilizado por nuestros sistemas de gestión.",
    "icon": "assets/img/tech/postgresql.svg",
    "url": "https://www.postgresql.org/download/",
    "category": "Requisitos del sistema"
  },
  {
    "name": "MySQL Community Server",
    "description": "Motor de base de datos alternativo, compatible con Mabit Pro GE.",
    "icon": "assets/img/tech/mysql.svg",
    "url": "https://dev.mysql.com/downloads/mysql/",
    "category": "Requisitos del sistema"
  },
  {
    "name": "Driver de impresora fiscal",
    "description": "Controlador necesario para imprimir tickets y facturas desde Mabit Pro GE. Consultanos el modelo exacto de tu impresora.",
    "icon": "assets/img/downloads/printer.svg",
    "url": "#",
    "category": "Drivers de impresoras"
  },
  {
    "name": "Driver de impresora térmica",
    "description": "Controlador para impresoras térmicas de tickets compatibles.",
    "icon": "assets/img/downloads/printer.svg",
    "url": "#",
    "category": "Drivers de impresoras"
  },
  {
    "name": "Manual de instalación — Mabit Pro GE",
    "description": "Guía paso a paso para dejar el sistema funcionando en tu negocio.",
    "icon": "assets/img/downloads/generic.svg",
    "url": "#",
    "category": "Manuales"
  }
];
