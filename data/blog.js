/* Datos de Mabit — editá el array de abajo, tal cual fuera JSON.
   Se carga con <script src> (no fetch) para que el sitio funcione
   abriendo el .html con doble clic, sin necesidad de servidor.

   Cada entrada:
   - id: identificador único, sin espacios (se usa para enlazar directo)
   - category: "Noticia" | "Blog" | "Novedades Mabit" (podés agregar otras)
   - title, date (AAAA-MM-DD), text, author (opcional)
   - photo: foto principal
   - gallery: array opcional de fotos adicionales (miniaturas + zoom)

   No hace falta cargarlas en orden: siempre se ordenan por fecha,
   la más nueva primero. Por defecto solo se muestran las del año
   actual; si hay de años anteriores, aparece un archivo por mes en
   la barra lateral para poder verlas.

   IMPORTANTE sobre las fechas de estos 4 ejemplos: están calculadas
   en relación a HOY (con isoDaysAgo) en vez de ser fechas fijas, para
   que la demo (año actual / año anterior) funcione siempre, sin
   importar qué día la abras. Cuando cargues tus noticias reales,
   simplemente escribí la fecha fija como texto: "date": "2026-03-15" */
(function () {
  function isoDaysAgo(days) {
    const d = new Date();
    d.setDate(d.getDate() - days);
    return d.toISOString().slice(0, 10);
  }

  window.MABIT_DATA = window.MABIT_DATA || {};
  window.MABIT_DATA.blog = [
    {
      "id": "reemplazar-primer-articulo",
      "category": "Novedades Mabit",
      "title": "Reemplazá este título por el de tu primera noticia",
      "date": isoDaysAgo(3),
      "author": "Equipo Mabit",
      "text": "Este es un texto de ejemplo. Reemplazalo por el contenido real de tu noticia o artículo — podés escribir uno o varios párrafos, contar una novedad de producto, un caso de éxito, o cualquier novedad de la empresa que quieras compartir con tus clientes.",
      "photo": "assets/img/blog/placeholder.jpg",
      "gallery": [
        "assets/img/blog/placeholder-2.jpg",
        "assets/img/blog/placeholder-3.jpg",
        "assets/img/blog/placeholder-4.jpg"
      ]
    },
    {
      "id": "segundo-articulo-ejemplo",
      "category": "Blog",
      "title": "Segundo artículo de ejemplo",
      "date": isoDaysAgo(20),
      "author": "Equipo Mabit",
      "text": "Otro texto de ejemplo para mostrar cómo se ve el listado con más de una entrada. Agregá tantas noticias como quieras copiando este bloque en data/blog.js.",
      "photo": "assets/img/blog/placeholder-2.jpg",
      "gallery": [
        "assets/img/blog/placeholder.jpg",
        "assets/img/blog/placeholder-3.jpg"
      ]
    },
    {
      "id": "tercer-articulo-ejemplo",
      "category": "Noticia",
      "title": "Tercer artículo de ejemplo",
      "date": isoDaysAgo(45),
      "author": "Equipo Mabit",
      "text": "Un tercer ejemplo para que veas cómo se ve el filtro por categoría funcionando con distintos tipos de contenido.",
      "photo": "assets/img/blog/placeholder-3.jpg"
    },	  
	{
	       "id": "convenio",
	       "category": "Noticia",
	       "title": "Gran noticia kp",
	       "date": isoDaysAgo(300),
	       "author": "Equipo Mabit",
	       "text": "BLA BLA BLA BLA",
	       "photo": "assets/img/blog/placeholder-3.jpg"
    },
    {
      "id": "articulo-del-anio-pasado",
      "category": "Blog",
      "title": "Artículo de ejemplo del año pasado",
      "date": isoDaysAgo(400),
      "author": "Equipo Mabit",
      "text": "Este artículo tiene más de un año — sirve para mostrar cómo funciona el archivo por mes en la barra lateral. No se muestra en el listado principal por defecto, solo cuando se selecciona ese mes en 'Archivo'.",
      "photo": "assets/img/blog/placeholder-4.jpg"
    }
  ];
})();
