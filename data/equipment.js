/* Datos de Mabit — editá solo el array de abajo, tal cual fuera JSON.
   Se carga con <script src> (no fetch) para que el sitio funcione
   abriendo el .html con doble clic, sin necesidad de servidor.

   Cada producto:
   - code: código interno único (se muestra en el catálogo y la ficha)
   - name, description, price (número en guaraníes, o null para "Consultar")
   - photo: foto principal · gallery: array opcional de fotos adicionales
   - category: para agrupar y filtrar por la barra lateral
   - importance: número, cuanto más alto, más "vendido"/destacado se
     considera (se usa para el orden "Más vendidos"). Un producto sin
     este campo se trata como importance: 0.
   - driverUrl / manualUrl: opcionales — si los cargás, en la ficha
     del producto (producto.html) aparecen los botones "Driver" y
     "Manual". Si no los cargás, esos botones no se muestran. */
window.MABIT_DATA = window.MABIT_DATA || {};
window.MABIT_DATA.equipment = [
  {
    "code": "BAL-001",
    "name": "Balanza electrónica",
    "description": "Balanza de precisión conectable a Mabit Pro GE, ideal para comercios que venden por peso.",
    "price": 850000,
    "photo": "assets/img/equipment/balanza.jpg",
    "gallery": ["assets/img/equipment/balanza.jpg"],
    "category": "Balanzas",
    "importance": 8,
    "driverUrl": "#",
    "manualUrl": "#"
  },
  {
    "code": "PC-001",
    "name": "Computadora punto de venta",
    "description": "Equipo listo para instalar Mabit Pro GE, pensado para el mostrador.",
    "price": 3200000,
    "photo": "assets/img/equipment/computadora.jpg",
    "gallery": ["assets/img/equipment/computadora.jpg"],
    "category": "Computadoras",
    "importance": 10,
    "manualUrl": "#"
  },
  {
    "code": "LEC-001",
    "name": "Lector de código de barras",
    "description": "Lector inalámbrico compatible con Mabit Pro GE, agiliza la carga de ventas.",
    "price": 420000,
    "photo": "assets/img/equipment/lector-codigo-barras.jpg",
    "gallery": ["assets/img/equipment/lector-codigo-barras.jpg"],
    "category": "Lectores de código de barras",
    "importance": 6,
    "driverUrl": "#"
  },
  {
    "code": "ACC-001",
    "name": "Cajón monedero",
    "description": "Cajón de caja con apertura automática desde Mabit Pro GE.",
    "price": 380000,
    "photo": "assets/img/equipment/cajon-monedero.jpg",
    "gallery": ["assets/img/equipment/cajon-monedero.jpg"],
    "category": "Accesorios",
    "importance": 3
  },
  {
    "code": "ACC-002",
    "name": "Cajón monedero",
    "description": "Cajón de caja con apertura automática desde Mabit Pro GE.",
    "price": 380000,
    "photo": "assets/img/equipment/cajon-monedero.jpg",
    "gallery": ["assets/img/equipment/cajon-monedero.jpg"],
    "category": "Accesorios",
    "importance": 3
  }
];
