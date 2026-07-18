/* Datos de Mabit — editá solo el array de abajo, tal cual fuera JSON.
   Se carga con <script src> (no fetch) para que el sitio funcione
   abriendo el .html con doble clic, sin necesidad de servidor.

   "recommended" debe usar exactamente los mismos nombres que en
   data/equipment.js, para que se puedan mostrar como etiquetas. */
window.MABIT_DATA = window.MABIT_DATA || {};
window.MABIT_DATA.recommendations = [
  {
    "business": "Carnicerías y verdulerías",
    "recommended": ["Balanza electrónica", "Computadora punto de venta"],
    "note": "La balanza es imprescindible para vender por peso."
  },
  {
    "business": "Supermercados y minimarkets",
    "recommended": ["Balanza electrónica", "Lector de código de barras", "Cajón monedero"],
    "note": "Con muchos productos distintos, el lector de código agiliza mucho la fila."
  },
  {
    "business": "Ferreterías y casas de repuestos",
    "recommended": ["Computadora punto de venta", "Cajón monedero"],
    "note": "El lector de código de barras es opcional si tenés relativamente pocos productos distintos."
  },
  {
    "business": "Restaurantes y cafeterías",
    "recommended": ["Computadora punto de venta", "Cajón monedero"],
    "note": "La balanza y el lector de código normalmente no son necesarios."
  },
  {
    "business": "Peluquerías y centros estéticos",
    "recommended": ["Computadora punto de venta"],
    "note": "Con Mabit Citas para la agenda, alcanza con un equipo simple."
  }
];
