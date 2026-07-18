/* =========================================================
   Mabit — main.js
   Arma el header/footer y todas las secciones dinámicas a partir
   de los datos cargados por <script src="..."> desde /data/*.js
   y /fragments/*.js (ver esos archivos). Al usar <script> en vez
   de fetch(), el sitio funciona abriendo el .html con doble clic,
   sin necesidad de ningún servidor.
   ========================================================= */

const WA_NUMBER = "595986709035";

/* ---------- helpers ---------- */
function getData(key) {
  const data = window.MABIT_DATA && window.MABIT_DATA[key];
  if (!data) throw new Error(`No se encontraron datos para "${key}". ¿Falta incluir data/${key}.js en el HTML?`);
  return data;
}

function mountFragment(key, mountSelector) {
  const mount = document.querySelector(mountSelector);
  const html = window.MABIT_FRAGMENTS && window.MABIT_FRAGMENTS[key];
  if (!mount || !html) return;
  mount.innerHTML = html;
}

function waLink(text) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

/* ---------- navbar ---------- */
function initNavbar() {
  const nav = document.getElementById("mainNav");
  if (!nav) return;
  window.addEventListener("scroll", () => nav.classList.toggle("scrolled", window.scrollY > 8));

  // el alto del navbar puede variar según el ancho de pantalla (se acomoda
  // el logo/links), así que lo medimos de verdad en vez de adivinarlo por CSS
  function syncNavHeight() {
    document.documentElement.style.setProperty("--nav-height", nav.offsetHeight + "px");
  }
  syncNavHeight();
  window.addEventListener("resize", syncNavHeight);
  window.addEventListener("load", syncNavHeight);
  // al abrir/cerrar el menú mobile el alto también cambia
  const collapseEl = document.getElementById("navMain");
  if (collapseEl) {
    collapseEl.addEventListener("shown.bs.collapse", syncNavHeight);
    collapseEl.addEventListener("hidden.bs.collapse", syncNavHeight);
  }
}

/* ---------- animated counters ---------- */
function initCounters() {
  const els = document.querySelectorAll(".count-up");
  if (!els.length) return;
  function animate(el) {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || "";
    const pad = el.dataset.pad ? parseInt(el.dataset.pad, 10) : 0;
    const duration = 1400, start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(target * eased)).padStart(pad, "0") + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { animate(e.target); io.unobserve(e.target); } });
  }, { threshold: .5 });
  els.forEach(el => io.observe(el));
}

/* ---------- flyer loader ---------- */
function initFlyer() {
  // Por defecto se muestra una imagen de referencia (monitor + tablet + celular).
  // Cuando tengas el flyer real, poné su ruta acá, ej: "assets/img/flyer/mabit-flyer.jpg"
  const FLYER_SRC = "";
  const img = document.getElementById("flyerImg");
  const slot = document.getElementById("flyerSlot");
  if (!img || !slot || !FLYER_SRC) return;
  slot.classList.remove("loaded");
  img.src = FLYER_SRC;
  img.addEventListener("load", () => slot.classList.add("loaded"));
}

/* ---------- productos ---------- */
function productActionsHTML(actions) {
  return actions.map(a => {
    if (a.type === "whatsapp") {
      return `<a href="${waLink(a.text)}" target="_blank" rel="noopener" class="btn btn-prod rounded-pill px-4">${a.label}</a>`;
    }
    return `<a href="${a.url}" target="_blank" rel="noopener" class="btn btn-prod rounded-pill px-4">${a.label}</a>`;
  }).join(" ");
}

function formatGs(n) {
  return Number(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function pricingHTML(p) {
  if (p.pricing) {
    const pr = p.pricing;
    return `
    <div class="pricing-block p-4 rounded-4 mt-3">
      <div class="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-3">
        <div>
          <span class="mono small fw-semibold" style="color:var(--prod-deep);">DESDE</span>
          <div class="d-flex align-items-baseline gap-2 flex-wrap">
            <span class="price-amount fs-3 fw-bold" data-monthly="${pr.monthly}" data-annual="${pr.annual}">${pr.currency} ${formatGs(pr.monthly)}</span>
            <span class="price-unit text-secondary small">/ mes, ${pr.unit}</span>
          </div>
        </div>
        <div class="btn-group btn-group-sm price-toggle" role="group">
          <button type="button" class="btn btn-outline-secondary active" data-price-mode="monthly">Mensual</button>
          <button type="button" class="btn btn-outline-secondary" data-price-mode="annual">Anual</button>
        </div>
      </div>
      <ul class="small text-secondary mb-3 ps-3">
        ${pr.includes.map(i => `<li>${i}</li>`).join("")}
      </ul>
      <p class="small text-secondary mb-1"><strong class="text-body">Instalación:</strong> ${pr.installNote}</p>
      <p class="small text-secondary mb-1">${pr.extra}</p>
      <p class="small fw-semibold mb-0" style="color:var(--prod-deep);">${pr.cta}</p>
    </div>`;
  }
  if (p.status === "soon") {
    return `<div class="pricing-block p-4 rounded-4 mt-3"><p class="small text-secondary mb-0">Precio a definir — todavía está en desarrollo. Dejanos tu contacto y te avisamos apenas esté disponible, con condiciones especiales para quienes se anoten primero.</p></div>`;
  }
  return "";
}

function productCardHTML(p, idx) {
  const carId = `carousel-${p.id}`;
  const slides = p.images.map((src, i) => `
    <div class="carousel-item ${i === 0 ? "active" : ""}">
      <div class="slide-media"><img src="${src}" alt="${p.name} — captura ${i + 1}"></div>
    </div>`).join("");
  const indicators = p.images.map((_, i) => `
    <button type="button" data-bs-target="#${carId}" data-bs-slide-to="${i}" class="${i === 0 ? "active" : ""}"></button>`).join("");
  const controls = p.images.length > 1 ? `
    <button class="carousel-control-prev" type="button" data-bs-target="#${carId}" data-bs-slide="prev"><span class="carousel-control-prev-icon"></span></button>
    <button class="carousel-control-next" type="button" data-bs-target="#${carId}" data-bs-slide="next"><span class="carousel-control-next-icon"></span></button>` : "";
  const statusBadge = p.status === "live"
    ? `<span class="badge badge-live rounded-pill align-self-start px-3 py-2">● Disponible</span>`
    : `<span class="badge badge-soon rounded-pill align-self-start px-3 py-2">◐ Próximamente</span>`;
  const platformHTML = p.platform
    ? `<p class="text-secondary small mb-3"><strong class="text-body">Plataforma:</strong> ${p.platform}</p>` : "";
  const industriesHTML = (p.industries && p.industries.length)
    ? `<div class="d-flex flex-wrap gap-2 mb-1">${p.industries.map(i => `<span class="badge rounded-pill" style="background:var(--prod-tint);color:var(--prod-deep);font-weight:500;">${i}</span>`).join("")}</div>`
    : "";

  return `
  <div class="card product-card prod-${p.id} mb-4">
    <div class="card-body p-4 p-md-5 pb-3">
      <div class="d-flex justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <span class="badge badge-id rounded-2 mb-2">${p.code}</span>
          <h3 class="h4 mb-2">${p.name}</h3>
          <p class="text-secondary mb-2" style="max-width:520px;">${p.tagline}</p>
          ${platformHTML}
          ${industriesHTML}
        </div>
        ${statusBadge}
      </div>
      ${pricingHTML(p)}
    </div>
    <div id="${carId}" class="carousel slide px-4 px-md-5" data-bs-ride="carousel" data-bs-interval="4500">
      <div class="carousel-inner rounded-3 overflow-hidden">${slides}</div>
      ${controls}
      <div class="carousel-indicators position-static mt-2">${indicators}</div>
    </div>
    <div class="card-body p-4 p-md-5 pt-4 d-flex flex-wrap justify-content-between align-items-center gap-3 border-top mt-3">
      <p class="text-secondary mb-0">${p.note}</p>
      <div class="d-flex gap-2 flex-wrap">${productActionsHTML(p.actions)}</div>
    </div>
  </div>`;
}

function renderProducts() {
  const mount = document.getElementById("productsContainer");
  if (!mount) return;
  try {
    const products = getData("products");
    mount.innerHTML = products.map(productCardHTML).join("");
  } catch (e) {
    mount.innerHTML = `<div class="alert alert-warning">No se pudieron cargar los productos (${e.message}).</div>`;
  }
}

/* ---------- reseñas (carrusel agrupado de a 3) ---------- */
function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function reviewCardHTML(r) {
  const initial = r.name.trim().charAt(0).toUpperCase();
  const stars = "★".repeat(r.stars) + "☆".repeat(5 - r.stars);
  const websiteHTML = r.website
    ? `<a href="${r.website}" target="_blank" rel="noopener" class="small fw-semibold text-decoration-none d-inline-flex align-items-center gap-1 mt-3" style="color:var(--teal-deep);">Visitar página web →</a>`
    : "";
  return `
  <div class="col">
    <div class="card review-card h-100 p-4">
      <div class="stars mb-3">${stars}</div>
      <p class="mb-4">"${r.text}"</p>
      <div class="d-flex align-items-center gap-2 mt-auto">
        <div class="review-avatar">${initial}</div>
        <div><b class="d-block small">${r.name}</b><span class="text-secondary small">${r.role}</span></div>
      </div>
      ${websiteHTML}
    </div>
  </div>`;
}

function renderReviews() {
  const inner = document.getElementById("reviewsInner");
  const indicatorsWrap = document.getElementById("reviewsIndicators");
  if (!inner) return;
  try {
    const reviews = getData("reviews");
    const groups = chunk(reviews, 3);
    inner.innerHTML = groups.map((g, i) => `
      <div class="carousel-item ${i === 0 ? "active" : ""}">
        <div class="row row-cols-1 row-cols-md-3 g-4">${g.map(reviewCardHTML).join("")}</div>
      </div>`).join("");
    if (indicatorsWrap) {
      indicatorsWrap.innerHTML = groups.map((_, i) => `
        <button type="button" data-bs-target="#reviewsCarousel" data-bs-slide-to="${i}" class="${i === 0 ? "active" : ""}"></button>`).join("");
    }
  } catch (e) {
    inner.innerHTML = `<div class="alert alert-warning">No se pudieron cargar las reseñas (${e.message}).</div>`;
  }
}

/* ---------- acordeón "¿cómo saber que nos necesitas?" con imagen + CTA a modal ---------- */
function renderNeedAccordion() {
  const mount = document.getElementById("needAccordion");
  if (!mount) return;
  try {
    const items = getData("need");
    mount.innerHTML = items.map((it, i) => {
      const id = `need-${i}`;
      return `
      <div class="accordion-item">
        <h3 class="accordion-header">
          <button class="accordion-button collapsed d-flex align-items-center gap-3" type="button" data-bs-toggle="collapse" data-bs-target="#${id}">
            <img src="${it.icon}" class="accordion-thumb" alt="">
            <span>${it.question}</span>
          </button>
        </h3>
        <div id="${id}" class="accordion-collapse collapse" data-bs-parent="#needAccordion">
          <div class="accordion-body">
            <p>${it.answer}</p>
            <button type="button" class="accordion-cta" data-open-contact-modal data-context="${it.question.replace(/"/g, "&quot;")}">Quiero una respuesta a medida →</button>
          </div>
        </div>
      </div>`;
    }).join("");
  } catch (e) {
    mount.innerHTML = `<div class="alert alert-warning">No se pudieron cargar las preguntas (${e.message}).</div>`;
  }
}

/* ---------- FAQ ---------- */
function renderFaqAccordion() {
  const mount = document.getElementById("faqAccordion");
  if (!mount) return;
  try {
    const items = getData("faq");
    mount.innerHTML = items.map((it, i) => {
      const id = `faq-${i}`;
      const linkHTML = it.link ? ` <a href="${it.link.url}" target="_blank" rel="noopener">${it.link.label}</a>` : "";
      return `
      <div class="accordion-item">
        <h3 class="accordion-header"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${id}">${it.question}</button></h3>
        <div id="${id}" class="accordion-collapse collapse" data-bs-parent="#faqAccordion"><div class="accordion-body">${it.answer}${linkHTML}</div></div>
      </div>`;
    }).join("");
  } catch (e) {
    mount.innerHTML = `<div class="alert alert-warning">No se pudieron cargar las preguntas frecuentes (${e.message}).</div>`;
  }
}

/* ---------- tecnologías (carrusel agrupado de a 3, logos reales locales) ---------- */
function renderTech() {
  const inner = document.getElementById("techInner");
  const indicatorsWrap = document.getElementById("techIndicators");
  if (!inner) return;
  try {
    const items = getData("tech");
    const groups = chunk(items, 3);
    inner.innerHTML = groups.map((g, i) => `
      <div class="carousel-item ${i === 0 ? "active" : ""}">
        <div class="row row-cols-2 row-cols-md-3 g-3">
          ${g.map(t => `<div class="col"><div class="tech-logo-box"><img src="${t.icon}" alt="${t.name}"><span>${t.name}</span></div></div>`).join("")}
        </div>
      </div>`).join("");
    if (indicatorsWrap) {
      indicatorsWrap.innerHTML = groups.map((_, i) => `
        <button type="button" data-bs-target="#techCarousel" data-bs-slide-to="${i}" class="${i === 0 ? "active" : ""}"></button>`).join("");
    }
  } catch (e) {
    inner.innerHTML = `<div class="alert alert-warning">No se pudo cargar el stack tecnológico (${e.message}).</div>`;
  }
}

function adCardHTML(a) {
  return `
  <div class="col-md-6">
    <div class="card tutorial-card h-100">
      <div class="ratio ratio-16x9">
        <iframe src="https://www.youtube.com/embed/${a.youtubeId}" title="${a.title}" loading="lazy" allowfullscreen></iframe>
      </div>
      <div class="card-body">
        <h3 class="h6">${a.title}</h3>
        <p class="text-secondary small mb-0">${a.description}</p>
      </div>
    </div>
  </div>`;
}

function renderAds() {
  const mount = document.getElementById("adsContainer");
  if (!mount) return;
  try {
    const items = getData("ads");
    mount.innerHTML = items.map(adCardHTML).join("");
  } catch (e) {
    mount.innerHTML = `<div class="alert alert-warning">No se pudieron cargar los videos publicitarios (${e.message}).</div>`;
  }
}

function teamCardHTML(m) {
  return `
  <div class="col-6 col-md-3">
    <div class="text-center">
      <img src="${m.photo}" alt="${m.name}" class="rounded-4 mb-3 w-100" style="aspect-ratio:1/1;object-fit:cover;">
      <b class="d-block small">${m.name}</b>
      <span class="text-secondary small">${m.role}</span>
    </div>
  </div>`;
}

function renderTeam() {
  const mount = document.getElementById("teamContainer");
  if (!mount) return;
  try {
    const items = getData("team");
    mount.innerHTML = items.map(teamCardHTML).join("");
  } catch (e) {
    mount.innerHTML = `<div class="alert alert-warning">No se pudo cargar el equipo (${e.message}).</div>`;
  }
}

function downloadCardHTML(d) {
  const url = d.url && d.url !== "#" ? d.url : "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(`Hola, necesito el enlace de descarga de "${d.name}"`);
  return `
  <div class="col-md-6 col-lg-4">
    <div class="card h-100 p-4" style="border:none;border-radius:16px;box-shadow:0 20px 40px -28px rgba(0,0,0,.25);">
      <div class="d-flex align-items-center gap-3 mb-3">
        <div class="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0" style="width:48px;height:48px;background:var(--teal-tint);">
          <img src="${d.icon}" alt="" width="26" height="26">
        </div>
        <h3 class="h6 mb-0">${d.name}</h3>
      </div>
      <p class="text-secondary small flex-grow-1">${d.description}</p>
      <a href="${url}" target="_blank" rel="noopener" class="btn btn-teal rounded-pill btn-sm align-self-start px-3">Descargar</a>
    </div>
  </div>`;
}

function renderDownloads() {
  const mount = document.getElementById("downloadsContainer");
  const searchInput = document.getElementById("downloadsSearchInput");
  if (!mount) return;
  try {
    const items = getData("downloads");
    function draw() {
      const term = searchInput ? searchInput.value.trim().toLowerCase() : "";
      const filtered = !term ? items : items.filter(d =>
        (d.name + " " + d.description + " " + (d.category || "")).toLowerCase().includes(term));
      const categories = [...new Set(filtered.map(d => d.category || "Otros"))];
      mount.innerHTML = categories.length ? categories.map(cat => `
        <div class="mb-5">
          <h2 class="h5 mb-3 pb-2 border-bottom" style="border-color:rgba(0,0,0,.08)!important;">${cat}</h2>
          <div class="row g-4">
            ${filtered.filter(d => (d.category || "Otros") === cat).map(downloadCardHTML).join("")}
          </div>
        </div>`).join("") : `<p class="text-secondary small">No se encontraron descargas.</p>`;
    }
    if (searchInput) searchInput.addEventListener("input", draw);
    draw();
  } catch (e) {
    mount.innerHTML = `<div class="alert alert-warning">No se pudieron cargar las descargas (${e.message}).</div>`;
  }
}

function formatBlogDate(iso) {
  try {
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("es-PY", { day: "numeric", month: "long", year: "numeric" });
  } catch (e) { return iso; }
}
function formatMonthYear(iso) {
  const d = new Date(iso + "T00:00:00");
  const label = d.toLocaleDateString("es-PY", { month: "long", year: "numeric" });
  return label.charAt(0).toUpperCase() + label.slice(1);
}
function sortBlogByDateDesc(posts) {
  return [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
}
function truncate(text, n) {
  return text.length > n ? text.slice(0, n).trim() + "…" : text;
}

function blogGalleryHTML(post) {
  const images = (post.gallery && post.gallery.length) ? post.gallery : [];
  if (!images.length) return "";
  const carId = "gal-" + (post.id || Math.random().toString(36).slice(2));
  const PER_SLIDE = 4;
  const groups = chunk(images, PER_SLIDE);
  const slides = groups.map((group, i) => `
    <div class="carousel-item ${i === 0 ? "active" : ""}">
      <div class="row row-cols-2 row-cols-sm-4 g-2">
        ${group.map((src, j) => `
          <div class="col">
            <img src="${src}" alt="${post.title} — miniatura ${i * PER_SLIDE + j + 1}" data-lightbox-src="${src}"
              class="rounded-3 w-100" style="aspect-ratio:1/1;object-fit:cover;cursor:zoom-in;">
          </div>`).join("")}
      </div>
    </div>`).join("");
  const controls = groups.length > 1 ? `
    <button class="carousel-control-prev" type="button" data-bs-target="#${carId}" data-bs-slide="prev"><span class="carousel-control-prev-icon"></span></button>
    <button class="carousel-control-next" type="button" data-bs-target="#${carId}" data-bs-slide="next"><span class="carousel-control-next-icon"></span></button>` : "";
  return `
  <div id="${carId}" class="carousel slide thumb-gallery-carousel" data-bs-ride="carousel">
    <div class="carousel-inner">${slides}</div>
    ${controls}
  </div>`;
}

function blogCardHTML(post) {
  const authorHTML = post.author ? ` · <span class="mono">${post.author}</span>` : "";
  const excerpt = truncate(post.text, 160);
  const searchBlob = (post.title + " " + post.text).toLowerCase();
  const d = new Date(post.date + "T00:00:00");
  const yearMonth = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  const detailUrl = `noticia.html?id=${encodeURIComponent(post.id || "")}`;

  return `
  <article class="d-flex flex-column flex-sm-row gap-4 mb-4 pb-4 border-bottom blog-post" id="${post.id || ""}"
    data-category="${post.category || "Blog"}" data-year="${d.getFullYear()}" data-yearmonth="${yearMonth}"
    data-search="${searchBlob.replace(/"/g, "&quot;")}"
    style="border-color:rgba(0,0,0,.08)!important;scroll-margin-top:calc(var(--nav-height, 72px) + 20px);">
    <a href="${detailUrl}" class="flex-shrink-0">
      <img src="${post.photo}" alt="${post.title}" class="rounded-4 shadow" style="width:220px;max-width:100%;aspect-ratio:4/3;object-fit:cover;">
    </a>
    <div class="flex-grow-1">
      <button type="button" class="badge rounded-pill border-0 blog-tag-btn mb-2" data-filter="${post.category || "Blog"}" style="background:var(--teal-tint);color:var(--teal-deep);">${post.category || "Blog"}</button>
      <h2 class="h5 mb-1"><a href="${detailUrl}" class="text-decoration-none text-body">${post.title}</a></h2>
      <span class="mono small text-secondary d-block mb-2">${formatBlogDate(post.date)}${authorHTML}</span>
      <p class="text-secondary small mb-2">${excerpt}</p>
      <a href="${detailUrl}" class="small fw-semibold text-decoration-none" style="color:var(--teal-deep);">Leer más →</a>
    </div>
  </article>`;
}

function applyBlogFilters(mount, state) {
  const currentYear = new Date().getFullYear();
  mount.querySelectorAll(".blog-post").forEach(el => {
    const matchesCategory = state.category === "Todas" || el.dataset.category === state.category;
    const matchesArchive = state.archive === "current-year"
      ? Number(el.dataset.year) === currentYear
      : el.dataset.yearmonth === state.archive;
    const matchesSearch = !state.search || el.dataset.search.includes(state.search);
    el.classList.toggle("is-hidden", !(matchesCategory && matchesArchive && matchesSearch));
  });
}

function renderBlog() {
  const mount = document.getElementById("blogContainer");
  const sidebarMount = document.getElementById("blogSidebar");
  if (!mount) return;
  try {
    const posts = sortBlogByDateDesc(getData("blog"));
    const currentYear = new Date().getFullYear();
    const categories = ["Todas", ...new Set(posts.map(p => p.category || "Blog"))];

    const filtersHTML = categories.length > 2 ? `
      <div class="d-flex gap-2 flex-wrap mb-4" id="blogFilters">
        ${categories.map((c, i) => `<button type="button" class="btn btn-sm rounded-pill blog-filter-btn ${i === 0 ? "active" : ""}" data-filter="${c}">${c}</button>`).join("")}
      </div>` : "";
    mount.innerHTML = filtersHTML + `<div id="blogList">${posts.map(blogCardHTML).join("")}</div>` +
      `<p class="text-secondary small d-none" id="blogNoResults">No hay noticias que coincidan con la búsqueda.</p>`;

    const state = { category: "Todas", archive: "current-year", search: "" };
    const refresh = () => {
      applyBlogFilters(mount, state);
      const anyVisible = [...mount.querySelectorAll(".blog-post")].some(el => !el.classList.contains("is-hidden"));
      document.getElementById("blogNoResults").classList.toggle("d-none", anyVisible);
    };
    const setCategory = (cat) => {
      state.category = cat;
      mount.querySelectorAll(".blog-filter-btn").forEach(b => b.classList.toggle("active", b.dataset.filter === cat));
      refresh();
    };

    // delegación: cubre tanto los botones de filtro de arriba como el
    // tag de categoría de cada noticia individual, con un solo listener
    mount.addEventListener("click", (e) => {
      const tagBtn = e.target.closest("[data-filter]");
      if (tagBtn) { setCategory(tagBtn.dataset.filter); window.scrollTo({ top: mount.offsetTop - 100, behavior: "smooth" }); }
    });

    // ---- sidebar: buscador + recientes + archivo por mes ----
    if (sidebarMount) {
      const recent = posts.slice(0, 3);
      const hasOlderPosts = posts.some(p => new Date(p.date).getFullYear() !== currentYear);
      const archiveGroups = [];
      const seen = new Set();
      posts.forEach(p => {
        const d = new Date(p.date + "T00:00:00");
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
        if (!seen.has(key)) { seen.add(key); archiveGroups.push({ key, label: formatMonthYear(p.date) }); }
      });

      sidebarMount.innerHTML = `
        <div class="mb-4">
          <label class="small fw-semibold d-block mb-2">Buscar</label>
          <input type="search" id="blogSearchInput" class="form-control" placeholder="Buscar noticias…">
        </div>
        <div class="mb-4">
          <h3 class="h6 mb-3 pb-2 border-bottom" style="border-color:rgba(0,0,0,.08)!important;">Recientes</h3>
          <div class="d-flex flex-column gap-1">${recent.map(latestBlogItemHTML).join("")}</div>
        </div>
        ${hasOlderPosts ? `
        <div>
          <h3 class="h6 mb-3 pb-2 border-bottom" style="border-color:rgba(0,0,0,.08)!important;">Archivo</h3>
          <div class="d-flex flex-column gap-1">
            <button type="button" class="btn btn-sm text-start archive-btn active" data-archive="current-year">Este año</button>
            ${archiveGroups.map(g => `<button type="button" class="btn btn-sm text-start archive-btn" data-archive="${g.key}">${g.label}</button>`).join("")}
          </div>
        </div>` : ""}
      `;

      const searchInput = document.getElementById("blogSearchInput");
      if (searchInput) {
        searchInput.addEventListener("input", () => {
          state.search = searchInput.value.trim().toLowerCase();
          refresh();
        });
      }
      sidebarMount.querySelectorAll(".archive-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          sidebarMount.querySelectorAll(".archive-btn").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          state.archive = btn.dataset.archive;
          refresh();
        });
      });
    }

    refresh();
  } catch (e) {
    mount.innerHTML = `<div class="alert alert-warning">No se pudieron cargar las noticias (${e.message}).</div>`;
  }
}

/* ---------- detalle de una noticia (noticia.html) ---------- */
function renderPostDetail() {
  const mount = document.getElementById("postDetailContainer");
  if (!mount) return;
  try {
    const posts = getData("blog");
    const id = new URLSearchParams(window.location.search).get("id");
    const post = posts.find(p => p.id === id);
    if (!post) {
      mount.innerHTML = `
        <p class="text-secondary">No encontramos esa noticia.</p>
        <a href="blog.html" class="btn btn-outline-custom rounded-pill px-4">← Volver al blog</a>`;
      return;
    }
    const authorHTML = post.author ? ` · <span class="mono">${post.author}</span>` : "";
    const gallery = (post.gallery || []).filter(g => g !== post.photo);
    const galleryPost = { ...post, gallery: gallery.length ? gallery : null };

    mount.innerHTML = `
      <a href="blog.html" class="small fw-semibold text-decoration-none d-inline-block mb-4" style="color:var(--teal-deep);">← Volver al blog</a>
      <span class="badge rounded-pill mb-3" style="background:var(--teal-tint);color:var(--teal-deep);">${post.category || "Blog"}</span>
      <h1 class="h2 mb-2">${post.title}</h1>
      <span class="mono small text-secondary d-block mb-4">${formatBlogDate(post.date)}${authorHTML}</span>
      <img src="${post.photo}" alt="${post.title}" data-lightbox-src="${post.photo}" class="img-fluid rounded-4 shadow w-100 mb-4" style="aspect-ratio:16/9;object-fit:cover;cursor:zoom-in;">
      <div class="post-text" style="max-width:760px;">
        <p class="text-secondary" style="white-space:pre-line;">${post.text}</p>
      </div>
      ${gallery.length ? `<h3 class="h6 mt-5 mb-3">Más fotos</h3><div style="max-width:760px;">${blogGalleryHTML(galleryPost)}</div>` : ""}
      <a href="blog.html" class="btn btn-outline-custom rounded-pill px-4 mt-5">← Volver al blog</a>`;

    document.title = `${post.title} — Mabit`;
  } catch (e) {
    mount.innerHTML = `<div class="alert alert-warning">No se pudo cargar la noticia (${e.message}).</div>`;
  }
}

/* ---------- últimas noticias (sidebar en el index y en blog.html) ---------- */
function latestBlogItemHTML(post) {
  return `
  <a href="noticia.html?id=${encodeURIComponent(post.id || "")}" class="d-flex gap-3 align-items-center text-decoration-none latest-blog-item p-2 rounded-3">
    <img src="${post.photo}" alt="" style="width:56px;height:56px;object-fit:cover;border-radius:10px;flex-shrink:0;">
    <div>
      <span class="d-block small fw-semibold text-body">${post.title}</span>
      <span class="mono text-secondary" style="font-size:.72rem;">${formatBlogDate(post.date)}</span>
    </div>
  </a>`;
}

/* nota: latestBlogItemHTML se usa dentro de renderBlog() para armar el
   widget "Recientes" de la barra lateral de blog.html */

function equipmentCardHTML(e) {
  const hasPrice = e.price !== null && e.price !== undefined;
  const priceHTML = hasPrice
    ? `<span class="fs-5 fw-bold" style="color:var(--teal-deep);">Gs. ${formatGs(e.price)}</span>`
    : `<span class="fs-6 fw-semibold text-secondary">Consultar precio</span>`;
  const text = `Hola, quiero más información sobre: ${e.name}`;
  const cartBtn = hasPrice
    ? `<button type="button" class="btn btn-teal btn-sm rounded-pill px-3" data-add-to-cart data-name="${e.name}" data-price="${e.price}">Agregar</button>`
    : `<a href="${waLink(text)}" target="_blank" rel="noopener" class="btn btn-teal btn-sm rounded-pill px-3">Consultar</a>`;
  const detailUrl = `producto.html?code=${encodeURIComponent(e.code)}`;
  return `
  <div class="col-md-6 col-lg-4 equipment-item" data-category="${e.category || "Otros"}" data-search="${(e.name + " " + e.description + " " + e.code).toLowerCase().replace(/"/g, "&quot;")}">
    <div class="card h-100" style="border:none;border-radius:16px;overflow:hidden;box-shadow:0 20px 40px -28px rgba(0,0,0,.25);">
      <a href="${detailUrl}">
        <img src="${e.photo}" alt="${e.name}" style="aspect-ratio:4/3;object-fit:cover;width:100%;">
      </a>
      <div class="card-body p-4 d-flex flex-column">
        <span class="mono text-secondary mb-1" style="font-size:.72rem;">${e.code}</span>
        <a href="${detailUrl}" class="text-decoration-none text-body"><h3 class="h6 mb-2">${e.name}</h3></a>
        <p class="text-secondary small flex-grow-1">${e.description}</p>
        <div class="d-flex justify-content-between align-items-center mt-2">
          ${priceHTML}
          ${cartBtn}
        </div>
      </div>
    </div>
  </div>`;
}

function equipmentCategorySidebarHTML(categories, active) {
  return `
  <div class="p-4 rounded-4" style="background:var(--charcoal);position:sticky;top:calc(var(--nav-height, 72px) + 20px);">
    <h3 class="h6 text-white mb-3">Categorías</h3>
    <div class="d-flex flex-column gap-1">
      <button type="button" class="btn btn-sm text-start equipment-cat-btn ${active === "Todos" ? "active" : ""}" data-cat="Todos">Todos los equipos</button>
      ${categories.map(c => `<button type="button" class="btn btn-sm text-start equipment-cat-btn ${active === c ? "active" : ""}" data-cat="${c}">${c}</button>`).join("")}
    </div>
  </div>`;
}

function renderEquipment() {
  const mount = document.getElementById("equipmentContainer");
  const sidebarMount = document.getElementById("equipmentSidebar");
  const searchInput = document.getElementById("equipmentSearchInput");
  const sortSelect = document.getElementById("equipmentSortSelect");
  if (!mount) return;
  const PAGE_SIZE = 6;
  try {
    const items = getData("equipment");
    const categories = [...new Set(items.map(e => e.category || "Otros"))];
    const state = { category: "Todos", search: "", visible: PAGE_SIZE, sort: "importance" };

    if (sidebarMount) {
      sidebarMount.innerHTML = equipmentCategorySidebarHTML(categories, state.category);
      sidebarMount.querySelectorAll(".equipment-cat-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          state.category = btn.dataset.cat;
          state.visible = PAGE_SIZE;
          sidebarMount.querySelectorAll(".equipment-cat-btn").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          draw();
        });
      });
    }
    if (searchInput) {
      searchInput.addEventListener("input", () => {
        state.search = searchInput.value.trim().toLowerCase();
        state.visible = PAGE_SIZE;
        draw();
      });
    }
    if (sortSelect) {
      sortSelect.addEventListener("change", () => {
        state.sort = sortSelect.value;
        draw();
      });
    }

    function sortItems(list) {
      const sorted = [...list];
      if (state.sort === "price-asc") {
        sorted.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
      } else if (state.sort === "price-desc") {
        sorted.sort((a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity));
      } else {
        sorted.sort((a, b) => (b.importance || 0) - (a.importance || 0));
      }
      return sorted;
    }

    function draw() {
      const filtered = sortItems(items.filter(e =>
        (state.category === "Todos" || (e.category || "Otros") === state.category) &&
        (!state.search || (e.name + " " + e.description + " " + e.code).toLowerCase().includes(state.search))
      ));
      const visibleItems = filtered.slice(0, state.visible);
      const hasMore = filtered.length > state.visible;
      mount.innerHTML = `<div class="row g-4">${visibleItems.map(equipmentCardHTML).join("") || `<p class="text-secondary small">No se encontraron equipos.</p>`}</div>` +
        (hasMore ? `<div class="text-center mt-4"><button type="button" class="btn btn-outline-custom rounded-pill px-4" id="loadMoreEquipment">Cargar más</button></div>` : "");
      const loadMoreBtn = document.getElementById("loadMoreEquipment");
      if (loadMoreBtn) loadMoreBtn.addEventListener("click", () => { state.visible += PAGE_SIZE; draw(); });
    }
    draw();
  } catch (e) {
    mount.innerHTML = `<div class="alert alert-warning">No se pudo cargar el catálogo (${e.message}).</div>`;
  }
}

function renderProductDetail() {
  const mount = document.getElementById("productDetailContainer");
  if (!mount) return;
  try {
    const items = getData("equipment");
    const code = new URLSearchParams(window.location.search).get("code");
    const item = items.find(e => e.code === code);
    if (!item) {
      mount.innerHTML = `
        <p class="text-secondary">No encontramos ese producto.</p>
        <a href="equipos.html" class="btn btn-outline-custom rounded-pill px-4">← Volver al catálogo</a>`;
      return;
    }
    const images = (item.gallery && item.gallery.length) ? item.gallery : [item.photo];
    const thumbsHTML = images.map((src, i) => `
      <img src="${src}" alt="" class="product-thumb ${i === 0 ? "active" : ""}" data-main-src="${src}">`).join("");
    const hasPrice = item.price !== null && item.price !== undefined;
    const priceHTML = hasPrice
      ? `<span class="fs-3 fw-bold" style="color:var(--teal-deep);">Gs. ${formatGs(item.price)}</span>`
      : `<span class="fs-5 fw-semibold text-secondary">Consultar precio</span>`;
    const text = `Hola, quiero más información sobre: ${item.name} (${item.code})`;
    const cartBtn = hasPrice
      ? `<button type="button" class="btn btn-teal btn-lg rounded-pill px-4" data-add-to-cart data-name="${item.name}" data-price="${item.price}">Agregar al carrito</button>`
      : `<a href="${waLink(text)}" target="_blank" rel="noopener" class="btn btn-teal btn-lg rounded-pill px-4">Consultar por WhatsApp</a>`;
    const driverBtn = item.driverUrl
      ? `<a href="${item.driverUrl}" target="_blank" rel="noopener" class="btn btn-outline-custom rounded-pill px-4">⬇ Driver</a>` : "";
    const manualBtn = item.manualUrl
      ? `<a href="${item.manualUrl}" target="_blank" rel="noopener" class="btn btn-outline-custom rounded-pill px-4">⬇ Manual</a>` : "";

    mount.innerHTML = `
      <nav class="mono small text-secondary mb-4">
        <a href="equipos.html" class="text-decoration-none text-secondary">Inicio</a> /
        <a href="equipos.html" class="text-decoration-none text-secondary">${item.category || "Equipos"}</a> /
        <span class="text-body">${item.name}</span>
      </nav>
      <div class="row g-5 align-items-start">
        <div class="col-md-6">
          <div class="d-flex gap-3">
            <div class="d-flex flex-column gap-2 flex-shrink-0" id="productThumbs">${thumbsHTML}</div>
            <div class="flex-grow-1" style="min-width:0;">
              <img id="productMainImg" src="${images[0]}" alt="${item.name}" data-lightbox-src="${images[0]}"
                class="rounded-4 shadow" style="aspect-ratio:4/3;object-fit:cover;width:100%;display:block;cursor:zoom-in;">
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <span class="mono small text-secondary d-block mb-2">Código: ${item.code}</span>
          <h1 class="h3 mb-2">${item.name}</h1>
          <span class="badge rounded-pill mb-3" style="background:var(--teal-tint);color:var(--teal-deep);">${item.category || "Equipos"}</span>
          <p class="text-secondary">${item.description}</p>
          <div class="mb-4">${priceHTML}</div>
          <div class="d-flex flex-wrap gap-2">
            ${cartBtn}
            ${driverBtn}
            ${manualBtn}
            <a href="equipos.html" class="btn btn-outline-custom rounded-pill px-4">← Volver</a>
          </div>
        </div>
      </div>`;

    document.title = `${item.name} — Mabit`;

    const mainImg = document.getElementById("productMainImg");
    document.querySelectorAll(".product-thumb").forEach(t => {
      t.addEventListener("click", () => {
        document.querySelectorAll(".product-thumb").forEach(x => x.classList.remove("active"));
        t.classList.add("active");
        mainImg.src = t.dataset.mainSrc;
        mainImg.dataset.lightboxSrc = t.dataset.mainSrc;
      });
    });
  } catch (e) {
    mount.innerHTML = `<div class="alert alert-warning">No se pudo cargar el producto (${e.message}).</div>`;
  }
}

function recommendationCardHTML(r) {
  return `
  <div class="col-md-6">
    <div class="h-100 p-4 rounded-4" style="background:#fff;box-shadow:0 20px 40px -28px rgba(0,0,0,.25);">
      <h3 class="h6 mb-2">${r.business}</h3>
      <div class="d-flex flex-wrap gap-2 mb-2">
        ${r.recommended.map(i => `<span class="badge rounded-pill" style="background:var(--teal-tint);color:var(--teal-deep);">${i}</span>`).join("")}
      </div>
      <p class="text-secondary small mb-0">${r.note}</p>
    </div>
  </div>`;
}

function renderRecommendations() {
  const mount = document.getElementById("recommendationsContainer");
  if (!mount) return;
  try {
    const items = getData("recommendations");
    mount.innerHTML = items.map(recommendationCardHTML).join("");
  } catch (e) {
    mount.innerHTML = `<div class="alert alert-warning">No se pudieron cargar las recomendaciones (${e.message}).</div>`;
  }
}

/* ---------- carrito (solo en equipos.html) ---------- */
const CART_KEY = "mabit_cart";

function getCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) { return []; }
}
function saveCart(cart) {
  try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) { /* almacenamiento no disponible, seguimos igual */ }
}
function cartCount(cart) { return cart.reduce((n, i) => n + i.qty, 0); }
function cartTotal(cart) { return cart.reduce((n, i) => n + i.qty * i.price, 0); }

function addToCart(name, price) {
  const cart = getCart();
  const existing = cart.find(i => i.name === name);
  if (existing) existing.qty += 1;
  else cart.push({ name, price, qty: 1 });
  saveCart(cart);
  renderCart();
}
function changeQty(name, delta) {
  const cart = getCart();
  const item = cart.find(i => i.name === name);
  if (!item) return;
  item.qty += delta;
  const next = cart.filter(i => i.qty > 0);
  saveCart(next);
  renderCart();
}
function removeFromCart(name) {
  saveCart(getCart().filter(i => i.name !== name));
  renderCart();
}

function cartRowHTML(item) {
  return `
  <div class="d-flex align-items-center justify-content-between gap-2 py-2 border-bottom" style="border-color:rgba(255,255,255,.1)!important;">
    <div>
      <span class="d-block small fw-semibold">${item.name}</span>
      <span class="mono text-secondary" style="font-size:.76rem;">Gs. ${formatGs(item.price)} c/u</span>
    </div>
    <div class="d-flex align-items-center gap-2">
      <button type="button" class="btn btn-sm btn-outline-light" data-cart-qty="-1" data-name="${item.name}">−</button>
      <span class="mono small">${item.qty}</span>
      <button type="button" class="btn btn-sm btn-outline-light" data-cart-qty="1" data-name="${item.name}">+</button>
      <button type="button" class="btn btn-sm btn-outline-light" data-cart-remove data-name="${item.name}" aria-label="Quitar">&times;</button>
    </div>
  </div>`;
}

function renderCart() {
  const badge = document.getElementById("cartBadge");
  const listEl = document.getElementById("cartItems");
  const totalEl = document.getElementById("cartTotal");
  const emptyEl = document.getElementById("cartEmpty");
  if (!badge && !listEl) return; // el carrito solo existe en equipos.html
  const cart = getCart();
  if (badge) {
    const count = cartCount(cart);
    badge.textContent = count;
    badge.style.display = count > 0 ? "flex" : "none";
  }
  if (listEl) {
    listEl.innerHTML = cart.map(cartRowHTML).join("");
    if (emptyEl) emptyEl.style.display = cart.length ? "none" : "block";
  }
  if (totalEl) totalEl.textContent = "Gs. " + formatGs(cartTotal(cart));
}

function initCart() {
  const cartModal = document.getElementById("cartModal");
  if (!cartModal) return; // página sin carrito

  renderCart();

  document.addEventListener("click", (e) => {
    const addBtn = e.target.closest("[data-add-to-cart]");
    if (addBtn) {
      addToCart(addBtn.dataset.name, Number(addBtn.dataset.price));
      addBtn.textContent = "Agregado ✓";
      setTimeout(() => { addBtn.textContent = "Agregar al carrito"; }, 1200);
      return;
    }
    const qtyBtn = e.target.closest("[data-cart-qty]");
    if (qtyBtn) { changeQty(qtyBtn.dataset.name, Number(qtyBtn.dataset.cartQty)); return; }
    const removeBtn = e.target.closest("[data-cart-remove]");
    if (removeBtn) { removeFromCart(removeBtn.dataset.name); return; }
    if (e.target.closest("[data-open-cart]")) {
      cartModal.classList.add("show");
      document.body.classList.add("mb-modal-open");
      return;
    }
    if (e.target.closest("[data-close-cart]") || e.target === cartModal) {
      cartModal.classList.remove("show");
      document.body.classList.remove("mb-modal-open");
      return;
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && cartModal.classList.contains("show")) {
      cartModal.classList.remove("show");
      document.body.classList.remove("mb-modal-open");
    }
  });

  const checkoutForm = document.getElementById("checkoutForm");
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const cart = getCart();
      if (!cart.length) return;
      const inputs = checkoutForm.querySelectorAll("input");
      const [name, phone] = inputs;
      const lines = cart.map(i => `• ${i.qty}x ${i.name} (Gs. ${formatGs(i.price)} c/u)`).join("\n");
      const text = `Hola, soy ${name.value || "—"} (${phone.value || "—"}). Quiero hacer un pedido de equipos:\n${lines}\nTotal: Gs. ${formatGs(cartTotal(cart))}`;
      window.open(waLink(text), "_blank");
      saveCart([]);
      renderCart();
      checkoutForm.reset();
      cartModal.classList.remove("show");
      document.body.classList.remove("mb-modal-open");
    });
  }
}

/* ---------- tutoriales (solo en tutoriales.html) ---------- */
function tutorialCardHTML(t) {
  return `
  <div class="col-md-6 col-lg-4">
    <div class="card tutorial-card h-100">
      <div class="ratio ratio-16x9">
        <iframe src="https://www.youtube.com/embed/${t.youtubeId}" title="${t.title}" loading="lazy" allowfullscreen></iframe>
      </div>
      <div class="card-body">
        <span class="module-pill mb-2 d-inline-block">${t.module}</span>
        <h3 class="h6">${t.title}</h3>
        <p class="text-secondary small mb-0">${t.description}</p>
      </div>
    </div>
  </div>`;
}

function renderTutorials() {
  const mount = document.getElementById("tutorialsContainer");
  const searchInput = document.getElementById("tutorialsSearchInput");
  if (!mount) return;
  try {
    const items = getData("tutorials");
    function draw() {
      const term = searchInput ? searchInput.value.trim().toLowerCase() : "";
      const filtered = !term ? items : items.filter(t =>
        (t.title + " " + t.description + " " + (t.module || "")).toLowerCase().includes(term));
      mount.innerHTML = filtered.length ? filtered.map(tutorialCardHTML).join("") : `<p class="text-secondary small">No se encontraron tutoriales.</p>`;
    }
    if (searchInput) searchInput.addEventListener("input", draw);
    draw();
  } catch (e) {
    mount.innerHTML = `<div class="alert alert-warning">No se pudieron cargar los tutoriales (${e.message}).</div>`;
  }
}

/* ---------- modal de contacto (disparado desde el acordeón) ---------- */
/* ---------- lightbox de imágenes (genérico, para blog y fichas de producto) ---------- */
function initLightbox() {
  const modal = document.getElementById("lightboxModal");
  const img = document.getElementById("lightboxImg");
  if (!modal || !img) return;

  function open(src, alt) {
    img.src = src;
    img.alt = alt || "";
    modal.classList.add("show");
    document.body.classList.add("mb-modal-open");
  }
  function close() {
    modal.classList.remove("show");
    document.body.classList.remove("mb-modal-open");
    img.src = "";
  }

  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-lightbox-src]");
    if (trigger) { open(trigger.dataset.lightboxSrc, trigger.alt || trigger.dataset.lightboxAlt); return; }
    if (e.target.closest("[data-close-lightbox]") || e.target === modal) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("show")) close();
  });
}

/* ---------- modal "Trabajá con nosotros" ---------- */
function initCareersModal() {
  const modalEl = document.getElementById("careersModal");
  if (!modalEl) return;

  function open() {
    modalEl.classList.add("show");
    document.body.classList.add("mb-modal-open");
  }
  function close() {
    modalEl.classList.remove("show");
    document.body.classList.remove("mb-modal-open");
  }

  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-open-careers]")) { open(); return; }
    if (e.target.closest("[data-close-careers]") || e.target === modalEl) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalEl.classList.contains("show")) close();
  });

  const form = document.getElementById("careersForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const inputs = form.querySelectorAll("input, select, textarea");
      const [name, phone, area, message] = inputs;
      const text = `Hola, soy ${name.value || "—"} (${phone.value || "—"}) y quiero postularme para trabajar en Mabit. Área de interés: ${area.value}. ${message.value ? "Sobre mí: " + message.value : ""}`;
      window.open(waLink(text), "_blank");
      close();
      form.reset();
    });
  }
}

function initContactModal() {
  const modalEl = document.getElementById("contactModal");
  if (!modalEl) return;

  function openModal(context) {
    const contextEl = document.getElementById("contactModalContext");
    if (contextEl) contextEl.textContent = context ? `Sobre tu consulta: "${context}"` : "";
    modalEl.classList.add("show");
    document.body.classList.add("mb-modal-open");
  }
  function closeModal() {
    modalEl.classList.remove("show");
    document.body.classList.remove("mb-modal-open");
  }

  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-open-contact-modal]");
    if (trigger) { openModal(trigger.dataset.context || ""); return; }
    if (e.target.closest("[data-close-contact-modal]")) { closeModal(); return; }
    // clic en el fondo oscuro (fuera del panel) también cierra
    if (e.target === modalEl) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalEl.classList.contains("show")) closeModal();
  });

  document.addEventListener("submit", (e) => {
    if (e.target.id !== "modalContactForm") return;
    e.preventDefault();
    const inputs = e.target.querySelectorAll("input, select, textarea");
    const [name, email, product, message] = inputs;
    const context = document.getElementById("contactModalContext")?.textContent || "";
    const text = `Hola, soy ${name.value || "—"} (${email.value || "—"}). Me interesa: ${product.value}. ${message.value ? "Detalle: " + message.value + ". " : ""}${context}`;
    window.open(waLink(text), "_blank");
    closeModal();
    e.target.reset();
  });
}

/* ---------- formulario de contacto principal ---------- */
/* ---------- toggle de precio mensual / anual ---------- */
function initPriceToggle() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-price-mode]");
    if (!btn) return;
    const group = btn.closest(".price-toggle");
    const card = btn.closest(".product-card");
    if (!group || !card) return;
    group.querySelectorAll("button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const amountEl = card.querySelector(".price-amount");
    const unitEl = card.querySelector(".price-unit");
    const mode = btn.dataset.priceMode;
    const value = amountEl.dataset[mode];
    amountEl.textContent = "Gs. " + formatGs(value);
    if (unitEl) {
      const baseUnit = unitEl.dataset.unit || unitEl.textContent.replace(/^\/\s*(mes|año),\s*/, "");
      unitEl.dataset.unit = baseUnit;
      unitEl.textContent = (mode === "monthly" ? "/ mes, " : "/ año, ") + baseUnit;
    }
  });
}

function initMainContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputs = form.querySelectorAll("input, select, textarea");
    const [name, email, product, message] = inputs;
    const text = `Hola, soy ${name.value || "—"} (${email.value || "—"}). Me interesa: ${product.value}. ${message.value ? "Detalle: " + message.value : ""}`;
    window.open(waLink(text), "_blank");
  });
}

/* ---------- init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  mountFragment("header", "#header-placeholder");
  mountFragment("footer", "#footer-placeholder");
  const yearEl = document.getElementById("currentYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  initNavbar();
  initContactModal();
  initCareersModal();
  initLightbox();
  initFlyer();
  initCounters();
  initMainContactForm();
  initPriceToggle();
  initCart();
  renderProducts();
  renderReviews();
  renderNeedAccordion();
  renderFaqAccordion();
  renderTech();
  renderTutorials();
  renderAds();
  renderTeam();
  renderDownloads();
  renderBlog();
  renderEquipment();
  renderRecommendations();
  renderProductDetail();
  renderPostDetail();

  // red de seguridad: nos aseguramos de que todos los carruseles queden
  // corriendo, sin depender del orden exacto entre el auto-init de
  // Bootstrap y la inyección de contenido dinámico de arriba
  document.querySelectorAll(".carousel").forEach(el => {
    bootstrap.Carousel.getOrCreateInstance(el);
  });
});
