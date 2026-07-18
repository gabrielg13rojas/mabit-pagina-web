/* Fragmento de footer — mismo HTML de siempre, envuelto para poder
   cargarlo con <script src> y así funcionar con doble clic (sin servidor). */
window.MABIT_FRAGMENTS = window.MABIT_FRAGMENTS || {};
window.MABIT_FRAGMENTS.footer = `
<footer class="section-darker pt-5 pb-4">
  <div class="container">
    <div class="row pb-4 mb-4 border-bottom" style="border-color:rgba(255,255,255,.1)!important;">
      <div class="col-md-4 mb-4 mb-md-0">
        <div class="d-flex align-items-center gap-2 mb-2">
          <img src="assets/img/logo/logo-240.png" width="30" alt="Mabit">
          <span class="fw-bold">MABIT</span>
        </div>
        <p class="text-white-50 small" style="max-width:280px;">Management with Bits. Software de gestión hecho en Paraguay, listo para adaptarse a tu empresa.</p>
      </div>
      <div class="col-md-2 col-6 mb-4 mb-md-0">
        <h4 class="h6 mb-3">Productos</h4>
        <a href="index.html#productos" class="d-block text-white-50 small mb-2 text-decoration-none">Mabit Pro GE</a>
        <a href="https://citas.mabit.com.py/" target="_blank" rel="noopener" class="d-block text-white-50 small mb-2 text-decoration-none">Mabit Citas</a>
        <a href="index.html#productos" class="d-block text-white-50 small mb-2 text-decoration-none">Mabit Go</a>
        <a href="index.html#productos" class="d-block text-white-50 small mb-2 text-decoration-none">Mabit Agro</a>
        <a href="equipos.html" class="d-block text-white-50 small mb-2 text-decoration-none">Equipos y accesorios</a>
      </div>
      <div class="col-md-3 col-6 mb-4 mb-md-0">
        <h4 class="h6 mb-3">Empresa</h4>
        <a href="index.html#about" class="d-block text-white-50 small mb-2 text-decoration-none">Nosotros</a>
        <a href="index.html#equipo" class="d-block text-white-50 small mb-2 text-decoration-none">Nuestro equipo</a>
        <a href="index.html#reseñas" class="d-block text-white-50 small mb-2 text-decoration-none">Reseñas</a>
        <a href="tutoriales.html" class="d-block text-white-50 small mb-2 text-decoration-none">Tutoriales</a>
        <a href="descargas.html" class="d-block text-white-50 small mb-2 text-decoration-none">Descargas</a>
        <a href="blog.html" class="d-block text-white-50 small mb-2 text-decoration-none">Blog y noticias</a>
        <a href="index.html#faq" class="d-block text-white-50 small mb-2 text-decoration-none">Preguntas frecuentes</a>
      </div>
      <div class="col-md-3">
        <h4 class="h6 mb-3">Contacto directo</h4>
        <a href="tel:+595986709035" class="d-block text-white-50 small mb-2 text-decoration-none">+595 986 709 035</a>
        <a href="mailto:info@mabit.com.py" class="d-block text-white-50 small mb-2 text-decoration-none">info@mabit.com.py</a>
      </div>
    </div>
    <div class="d-flex justify-content-between flex-wrap gap-2 mono small text-white-50">
      <span>© <span id="currentYear">2026</span> Mabit — Reservados todos los derechos.</span>
      <span>Curuguaty, Canindeyú-Paraguay</span>
    </div>
  </div>
</footer>

<a class="wa-float" href="https://wa.me/595986709035" target="_blank" rel="noopener" aria-label="WhatsApp">
  <img src="assets/img/tech/whatsapp.svg" alt="" width="28" height="28">
</a>

<!-- Modal de contacto grande, disparado desde las preguntas del acordeón
     (implementación propia en CSS/JS, sin depender del componente Modal de Bootstrap) -->
<div class="mb-modal" id="contactModal">
  <div class="mb-modal-panel p-3 p-md-4">
    <div class="d-flex justify-content-between align-items-start mb-3">
      <h3 class="h5 mb-0" id="contactModalTitle">Contanos sobre tu negocio</h3>
      <button type="button" class="mb-modal-close" data-close-contact-modal aria-label="Cerrar">&times;</button>
    </div>
    <p class="text-white-50 small mb-4" id="contactModalContext"></p>
    <form id="modalContactForm">
      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label small text-white-50">Nombre completo</label>
          <input type="text" class="form-control form-control-dark" placeholder="Tu nombre" required>
        </div>
        <div class="col-md-6">
          <label class="form-label small text-white-50">Correo electrónico</label>
          <input type="email" class="form-control form-control-dark" placeholder="tucorreo@empresa.com" required>
        </div>
        <div class="col-12">
          <label class="form-label small text-white-50">Producto de interés</label>
          <select class="form-select form-control-dark">
            <option>Mabit Pro GE</option>
            <option>Mabit Citas</option>
            <option>Mabit Go (próximamente)</option>
            <option>Mabit Agro (próximamente)</option>
            <option>Aún no lo sé</option>
          </select>
        </div>
        <div class="col-12">
          <label class="form-label small text-white-50">Contanos brevemente qué necesitás</label>
          <textarea class="form-control form-control-dark" rows="3" placeholder="Ej: quiero controlar mis ventas y stock en una sola pantalla"></textarea>
        </div>
      </div>
      <button type="submit" class="btn btn-teal w-100 py-2 rounded-pill mt-4">Enviar por WhatsApp</button>
    </form>
  </div>
</div>

<!-- Modal "Trabajá con nosotros" -->
<div class="mb-modal" id="careersModal">
  <div class="mb-modal-panel p-3 p-md-4">
    <div class="d-flex justify-content-between align-items-start mb-3">
      <h3 class="h5 mb-0">Trabajá con nosotros</h3>
      <button type="button" class="mb-modal-close" data-close-careers aria-label="Cerrar">&times;</button>
    </div>
    <p class="text-white-50 small mb-4">Contanos un poco sobre vos y te contactamos si hay un lugar donde puedas encajar.</p>
    <form id="careersForm">
      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label small text-white-50">Nombre completo</label>
          <input type="text" class="form-control form-control-dark" placeholder="Tu nombre" required>
        </div>
        <div class="col-md-6">
          <label class="form-label small text-white-50">Teléfono</label>
          <input type="tel" class="form-control form-control-dark" placeholder="0981 234 567" required>
        </div>
        <div class="col-12">
          <label class="form-label small text-white-50">¿En qué área te gustaría aportar?</label>
          <select class="form-select form-control-dark">
            <option>Desarrollo de software</option>
            <option>Implementación y soporte</option>
            <option>Diseño y experiencia de usuario</option>
            <option>Ventas y atención al cliente</option>
            <option>Otra</option>
          </select>
        </div>
        <div class="col-12">
          <label class="form-label small text-white-50">Contanos más de vos y por qué querés trabajar con nosotros</label>
          <textarea class="form-control form-control-dark" rows="4" placeholder="Tu experiencia, qué te motiva, algo que quieras que sepamos…" required></textarea>
        </div>
      </div>
      <button type="submit" class="btn btn-teal w-100 py-2 rounded-pill mt-4">Enviar postulación por WhatsApp</button>
    </form>
  </div>
</div>

<!-- Lightbox de imágenes, reutilizable (blog, fichas de producto, etc.) -->
<div class="mb-modal lightbox-modal" id="lightboxModal">
  <button type="button" class="mb-modal-close lightbox-close" data-close-lightbox aria-label="Cerrar">&times;</button>
  <img id="lightboxImg" src="" alt="" class="lightbox-img">
</div>

`;
