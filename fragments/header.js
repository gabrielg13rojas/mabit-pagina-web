/* Fragmento de header — mismo HTML de siempre, envuelto para poder
   cargarlo con <script src> y así funcionar con doble clic (sin servidor). */
window.MABIT_FRAGMENTS = window.MABIT_FRAGMENTS || {};
window.MABIT_FRAGMENTS.header = `
<nav class="navbar navbar-expand-lg navbar-mabit fixed-top py-2" id="mainNav">
  <div class="container">
    <a class="navbar-brand d-flex align-items-center gap-2" href="index.html">
      <img src="assets/img/logo/logo-240.png" alt="Mabit" width="34" height="34">
      <span class="fw-bold fs-5">MA<em>BIT</em></span>
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMain">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navMain">
      <ul class="navbar-nav mx-auto gap-lg-3 py-3 py-lg-0">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Nosotros</a>
          <ul class="dropdown-menu dropdown-menu-mabit">
            <li><a class="dropdown-item" href="index.html#about">Quiénes somos</a></li>
            <li><a class="dropdown-item" href="index.html#equipo">Nuestro equipo</a></li>
            <li><a class="dropdown-item" href="index.html#historia">Nuestra historia</a></li>
          </ul>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Productos</a>
          <ul class="dropdown-menu dropdown-menu-mabit">
            <li><a class="dropdown-item" href="index.html#productos">Software Mabit</a></li>
            <li><a class="dropdown-item" href="equipos.html">Equipos y accesorios</a></li>
          </ul>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Recursos</a>
          <ul class="dropdown-menu dropdown-menu-mabit">
            <li><a class="dropdown-item" href="tutoriales.html">Tutoriales</a></li>
            <li><a class="dropdown-item" href="descargas.html">Descargas</a></li>
            <li><a class="dropdown-item" href="blog.html">Blog y noticias</a></li>
          </ul>
        </li>
        <li class="nav-item"><a class="nav-link" href="index.html#reseñas">Reseñas</a></li>
        <li class="nav-item"><a class="nav-link" href="index.html#faq">Preguntas</a></li>
      </ul>
      <div class="d-flex gap-2 align-items-center">
        <a href="blog.html" class="btn btn-bell rounded-pill btn-sm d-flex align-items-center gap-1" title="Novedades">
          <svg class="bell-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0112 0c0 7 3 9 3 9H3s3-2 3-9"></path><path d="M10.3 21a1.94 1.94 0 003.4 0"></path></svg>
          Novedades
        </a>
        <a href="index.html#contacto" class="btn btn-teal rounded-pill btn-sm">Hablemos</a>
      </div>
    </div>
  </div>
</nav>

`;
