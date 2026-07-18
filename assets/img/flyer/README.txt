Por ahora, en la sección "Quiénes somos" se muestra una imagen de
referencia (monitor + tablet + celular) ubicada en:

    assets/img/flyer-placeholder-devices.jpg

Cuando tengas el flyer real, colocalo en esta carpeta (por ejemplo:
mabit-flyer.jpg) y luego abrí assets/js/main.js, buscá la función
initFlyer() y completá la constante FLYER_SRC, por ejemplo:

    const FLYER_SRC = "assets/img/flyer/mabit-flyer.jpg";

Eso reemplaza automáticamente la imagen de referencia por tu flyer real.
