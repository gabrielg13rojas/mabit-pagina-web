# Sitio Mabit

## Cómo funciona (100% estático, sin servidor)

El sitio abre directo con **doble clic** en `index.html`, sin instalar
nada ni levantar ningún servidor. Los datos (productos, reseñas,
preguntas, tecnologías, tutoriales) y el menú/pie de página ya no se
cargan con `fetch()` de archivos `.json` — eso lo bloquean los
navegadores por seguridad cuando abrís un archivo local (protocolo
`file://`). En su lugar, cada dato vive en un archivo `.js` físico
(mismo contenido, formato JSON, solo con una línea de envoltorio) que
se incluye con una etiqueta `<script src="...">`, que sí funciona sin
servidor.

Cuando subas el sitio a tu hosting (mabit.com.py) esto sigue
funcionando exactamente igual — de hecho funciona mejor, porque los
navegadores cargan varios `<script>` en paralelo.

## Estructura

```
mabit-site/
├── index.html              → página principal
├── tutoriales.html         → página de video-tutoriales
├── assets/
│   ├── css/style.css       → todos los estilos propios (paleta, animaciones)
│   ├── js/main.js          → arma el HTML dinámico a partir de los datos
│   ├── vendor/bootstrap/   → Bootstrap 5 guardado localmente (sin CDN)
│   └── img/
│       ├── logo/           → logo de Mabit en 2 tamaños
│       ├── watermark/      → poné aquí mabit-watermark.png (ver README.txt)
│       ├── flyer/          → poné aquí el flyer (ver README.txt)
│       ├── products/
│       │   ├── proge/      → capturas de Mabit Pro GE
│       │   ├── citas/      → capturas de Mabit Citas
│       │   ├── go/         → capturas de Mabit Go (agregá las tuyas cuando estén)
│       │   └── agro/       → capturas de Mabit Agro (agregá las tuyas cuando estén)
│       ├── need/            → iconitos del acordeón "¿Cómo saber que nos necesitás?"
│       └── tech/            → logos reales de Java, PostgreSQL, MySQL, HTML5, Spring Boot y WhatsApp
├── data/
│   ├── products.js           → los 4 productos (nombre, estado, imágenes, botones)
│   ├── reviews.js             → reseñas de clientes
│   ├── need.js                 → preguntas del acordeón "¿Cómo saber que nos necesitás?"
│   ├── faq.js                   → preguntas frecuentes
│   ├── tech.js                   → stack tecnológico
│   └── tutorials.js               → videos de YouTube por módulo
└── fragments/
    ├── header.js            → menú (se inyecta en index.html y tutoriales.html)
    └── footer.js             → pie de página + botón de WhatsApp + modal de contacto
```

## Cómo editar cada archivo `data/*.js`

Cada archivo tiene esta forma — **solo editás la parte entre corchetes
o llaves**, como si fuera JSON normal, y dejás intactas la primera y
la última línea:

```js
window.MABIT_DATA = window.MABIT_DATA || {};
window.MABIT_DATA.products = [
  { "id": "proge", "name": "Mabit Pro GE", ... },
  ...
];
```

- **Nuevo producto o cambiar textos/imágenes** → `data/products.js`.
  Cada producto tiene un array `images`; agregá tantas rutas como
  capturas quieras y el carrusel se arma solo.
- **Nueva reseña** → `data/reviews.js`. Se agrupan de a 3 automáticamente
  en el carrusel (nunca menos de 3 visibles).
- **Nueva pregunta del diagnóstico** → `data/need.js`, con `question`,
  `answer` e `icon` (ruta a un ícono chico).
- **Nueva pregunta frecuente** → `data/faq.js`.
- **Nueva tecnología** → `data/tech.js`, con el logo guardado en
  `assets/img/tech/`.
- **Nuevo video tutorial** → `data/tutorials.js`, con el `youtubeId`
  real (lo que sale después de `v=` en la URL de YouTube). Los 5 que
  ya están cargados tienen IDs de ejemplo (`REEMPLAZAR_ID_1`, etc.) —
  reemplazalos por los IDs reales de tus videos.

## Sobre las imágenes

Todas las imágenes que vas a ver en el sitio (logo, capturas, iconos,
logos de tecnologías) están **guardadas localmente** en `assets/img/`,
no dependen de ningún link externo que pueda caerse en el futuro. Los
íconos de las tecnologías se descargaron de los repositorios oficiales
de Devicon y Simple Icons y quedaron embebidos en el proyecto.

Las únicas dos imágenes que faltan (porque no las tengo) son:

1. **La marca de agua** → `assets/img/watermark/mabit-watermark.png`
2. **El flyer** → `assets/img/flyer/` (y activarlo en `assets/js/main.js`,
   función `initFlyer()`, completando `FLYER_SRC`)

## Modal de contacto desde el acordeón

Cada pregunta de "¿Cómo saber que nos necesitás?" tiene un botón
"Quiero una respuesta a medida →". Al hacer clic abre un formulario de
contacto grande (modal), y al enviarlo abre WhatsApp con un mensaje
prellenado que incluye a qué pregunta respondía.

## Menú (navbar)

Fijo (`position: fixed`), de fondo oscuro sólido siempre (no se aclara
ni desaparece al hacer scroll, y con un z-index alto para que ningún
carrusel o card quede nunca por encima), y el logo + "MABIT" llevan a
`index.html` (inicio) desde cualquier página del sitio.

