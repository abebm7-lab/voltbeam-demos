/* =====================================================================
   PLANTILLA: TALLER MECÁNICO · ARMADO DE LA PÁGINA (app.js)
   ---------------------------------------------------------------------
   Cotizador, diagnóstico por síntoma, calculadora de mantenimiento y
   seguimiento de orden. Para cambiar contenido, edita config.js.
   ===================================================================== */
(function () {
  "use strict";
  const C = window.SITE_CONFIG;
  const VB = window.VB;
  if (!C || !VB) { console.error("Falta config.js o bot.js"); return; }

  const S = C.secciones || {};
  const N = C.negocio;
  const NUM = C.contacto.whatsapp;
  const M = C.contacto.mensajes;
  const e = VB.esc;
  const $ = (s) => document.querySelector(s);

  VB.applyColors(C.colores);
  VB.injectCSS();
  VB.analytics(C.analitica);

  const mxn = (n) => "$" + Math.round(n).toLocaleString("es-MX");
  const redondear = (n) => Math.round(n / 50) * 50;

  /* ---------- piezas ---------- */
  const BTN = {
    primario: "inline-flex items-center justify-center gap-2 h-14 px-6 bg-acento text-white font-display font-bold text-xl tracking-wide hover:brightness-110 active:translate-y-px transition",
    oscuro: "inline-flex items-center justify-center gap-2 h-14 px-6 bg-texto text-white font-display font-bold text-xl tracking-wide hover:bg-black active:translate-y-px transition",
    contorno: "inline-flex items-center justify-center gap-2 h-14 px-6 border-2 border-texto font-display font-bold text-xl tracking-wide hover:bg-texto hover:text-white transition"
  };
  const waLink = (texto, mensaje, origen, estilo, icono) =>
    '<a href="' + e(VB.waUrl(NUM, mensaje)) + '" target="_blank" rel="noopener" data-origen="' + e(origen) + '" class="' + BTN[estilo || "primario"] + '"><i data-lucide="' + (icono || "message-circle") + '" class="w-5 h-5"></i>' + e(texto) + "</a>";
  const titulo = (t, sub, claro) =>
    '<h2 class="font-display font-extrabold text-[2.6rem] leading-[.95] sm:text-6xl tracking-[-0.01em]">' + e(t) + "</h2>" +
    (sub ? '<p class="mt-3 text-lg max-w-2xl ' + (claro ? "text-white/70" : "text-textoSuave") + '">' + e(sub) + "</p>" : "");
  const seccion = (id, contenido, extra) =>
    '<section id="' + id + '" class="px-5 sm:px-8 py-16 sm:py-24 ' + (extra || "") + '"><div class="mx-auto max-w-6xl">' + contenido + "</div></section>";
  const paso = (n, t) => '<p class="flex items-center gap-3 font-display font-bold text-xl"><span class="w-8 h-8 bg-texto text-white grid place-items-center text-lg">' + n + "</span>" + e(t) + "</p>";

  const URG = {
    alta:  { texto: "Urgente", clase: "bg-[#C81E1E] text-white", icono: "octagon-alert" },
    media: { texto: "Revisar pronto", clase: "bg-[#F5B800] text-texto", icono: "triangle-alert" },
    baja:  { texto: "Puede esperar unos días", clase: "bg-[#2F855A] text-white", icono: "circle-check" }
  };

  /* ---------- secciones ---------- */
  const R = {};

  R.avisoDemo = (s) =>
    '<div class="bg-acento text-white text-sm"><div class="mx-auto max-w-6xl px-5 sm:px-8 py-2 flex items-center gap-3">' +
      '<a href="../../" class="inline-flex items-center opacity-90 hover:opacity-100 shrink-0" aria-label="Volver a VoltBeam"><i data-lucide="arrow-left" class="w-4 h-4"></i></a>' +
      '<p class="flex-1 truncate font-medium"><span class="sm:hidden">Demo VoltBeam</span><span class="hidden sm:inline">' + e(s.texto) + "</span></p>" +
      '<a href="' + e(VB.waUrl(s.numero, s.mensaje)) + '" target="_blank" rel="noopener" data-origen="aviso-demo" class="shrink-0 font-bold underline underline-offset-4">' + e(s.enlaceTexto) + "</a>" +
    "</div></div>";

  R.menuSuperior = () =>
    '<header class="sticky top-0 z-50 bg-texto text-white">' +
      '<nav class="mx-auto max-w-6xl h-16 px-5 sm:px-8 flex items-center gap-6">' +
        '<a href="#" class="mr-auto flex items-baseline gap-2"><span class="font-display font-extrabold text-[1.7rem] tracking-tight leading-none">' + e(N.nombre) + '</span><span class="font-display font-semibold text-acento text-lg leading-none">' + e(N.ciudad) + "</span></a>" +
        '<div class="hidden md:flex gap-6 font-medium text-white/75">' +
          '<a href="#cotizador" class="hover:text-white">Cotizar</a><a href="#sintomas" class="hover:text-white">Síntomas</a><a href="#seguimiento" class="hover:text-white">Mi auto</a><a href="#ubicacion" class="hover:text-white">Ubicación</a>' +
        "</div>" +
        '<a href="' + e(VB.waUrl(NUM, M.grua)) + '" target="_blank" rel="noopener" data-origen="grua-menu" class="inline-flex items-center gap-2 h-10 px-4 bg-acento font-display font-bold text-lg"><i data-lucide="siren" class="w-[18px] h-[18px]"></i>Grúa</a>' +
      "</nav>" +
    "</header>";

  R.hero = (s) =>
    '<section class="bg-texto text-white">' +
      '<div class="mx-auto max-w-6xl px-5 sm:px-8 pt-10 pb-14 sm:pt-20 sm:pb-20">' +
        '<p class="font-display font-semibold text-acento text-xl">' + e(N.lema) + " en " + e(N.ciudad) + "</p>" +
        '<h1 class="mt-3 font-display font-extrabold text-[3.4rem] leading-[.9] sm:text-[6.2rem] tracking-[-0.015em] max-w-4xl text-balance">' + e(s.titulo) + "</h1>" +
        '<p class="mt-6 text-lg sm:text-xl text-white/75 max-w-2xl leading-relaxed">' + e(s.subtitulo) + "</p>" +
        '<div class="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/15 border border-white/15">' +
          s.accesos.filter((a) => activo(a.ancla.slice(1))).map((a) =>
            '<a href="' + e(a.ancla) + '" class="group bg-texto p-4 sm:p-6 flex flex-col gap-3 hover:bg-[#1f2329] transition">' +
              '<i data-lucide="' + e(a.icono) + '" class="w-7 h-7 text-acento"></i>' +
              '<span class="font-display font-bold text-[1.35rem] sm:text-2xl leading-tight">' + e(a.titulo) + "</span>" +
              '<span class="text-sm text-white/60 flex items-center justify-between gap-2">' + e(a.texto) + '<i data-lucide="arrow-down-right" class="w-4 h-4 shrink-0 text-white/40 group-hover:text-acento transition"></i></span>' +
            "</a>").join("") +
        "</div>" +
        '<div class="mt-8">' + waLink(s.botonGrua, M.grua, "grua-hero", "primario", "siren") + "</div>" +
      "</div>" +
      '<div class="franja h-3" aria-hidden="true"></div>' +
    "</section>";

  R.cotizador = (s) =>
    seccion("cotizador",
      titulo(s.titulo, s.subtitulo) +
      '<form id="form-cotizador" class="mt-10 grid lg:grid-cols-[1.3fr_1fr] border-2 border-texto bg-superficie" novalidate>' +
        '<div class="p-5 sm:p-8 space-y-8">' +
          "<div>" + paso(1, "Tu vehículo") +
            '<div class="mt-4 grid grid-cols-3 gap-2">' +
              s.tipos.map((t, i) =>
                '<label class="cursor-pointer"><input type="radio" name="tipo" value="' + i + '" class="peer sr-only"' + (i === 0 ? " checked" : "") + '>' +
                '<span class="h-full flex flex-col items-center justify-center gap-2 text-center border-2 border-linea p-3 font-semibold leading-tight peer-checked:border-texto peer-checked:bg-texto peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-acento transition"><i data-lucide="' + e(t.icono) + '" class="w-6 h-6"></i><span class="text-sm sm:text-base">' + e(t.nombre) + "</span></span></label>").join("") +
            "</div>" +
            '<label class="block mt-4"><span class="sr-only">Marca, modelo y año</span><input name="auto" placeholder="Marca, modelo y año (ej. Versa 2019)" maxlength="60" class="w-full h-12 border-2 border-linea bg-fondo px-4 text-[16px] focus:border-texto focus:outline-none"></label>' +
          "</div>" +
          "<div>" + paso(2, "Servicios") +
            '<ul class="mt-4 divide-y divide-linea border-y border-linea">' +
              s.servicios.map((sv, i) =>
                '<li><label class="flex items-center gap-4 py-3.5 cursor-pointer">' +
                  '<input type="checkbox" name="servicio" value="' + i + '" class="w-5 h-5 accent-[rgb(var(--c-acento))] shrink-0">' +
                  '<span class="flex-1 font-medium leading-snug">' + e(sv.nombre) + "</span>" +
                  '<span class="text-sm text-textoSuave tabular-nums text-right" data-rango="' + i + '"></span>' +
                "</label></li>").join("") +
            "</ul>" +
          "</div>" +
        "</div>" +
        '<div class="bg-texto text-white p-5 sm:p-8 flex flex-col">' +
          paso(3, "Estimado").replace("bg-texto text-white", "bg-acento text-white") +
          '<p id="cot-rango" class="mt-6 font-display font-extrabold text-[3.2rem] sm:text-6xl leading-none tabular-nums text-acento">$0</p>' +
          '<p id="cot-detalle" class="mt-3 text-white/65">Elige al menos un servicio.</p>' +
          '<ul id="cot-lista" class="mt-6 space-y-2 text-white/85"></ul>' +
          '<p id="cot-error" class="hidden mt-4 text-[#FFB59A] font-semibold" role="alert"></p>' +
          '<div class="mt-auto pt-8"><button type="submit" class="' + BTN.primario + ' w-full"><i data-lucide="message-circle" class="w-5 h-5"></i>' + e(s.boton) + "</button></div>" +
        "</div>" +
      "</form>");

  R.sintomas = (s) =>
    seccion("sintomas",
      titulo(s.titulo, s.subtitulo) +
      '<div class="mt-10 grid grid-cols-2 md:grid-cols-3 gap-2" role="group" aria-label="Síntomas">' +
        s.lista.map((x, i) =>
          '<button type="button" data-sintoma="' + i + '" aria-pressed="false" class="text-left bg-superficie border-2 border-transparent p-4 sm:p-5 flex flex-col gap-3 hover:border-texto aria-pressed:border-texto aria-pressed:bg-texto aria-pressed:text-white transition">' +
            '<i data-lucide="' + e(x.icono) + '" class="w-6 h-6 text-acento"></i><span class="font-display font-bold text-xl leading-tight">' + e(x.nombre) + "</span>" +
          "</button>").join("") +
      "</div>" +
      '<div id="sintoma-detalle" class="mt-4" aria-live="polite"></div>' +
      '<p class="mt-4 text-sm text-textoSuave flex items-center gap-2"><i data-lucide="info" class="w-4 h-4 shrink-0"></i>' + e(s.aviso) + "</p>",
      "bg-[#E2E5E8]");

  R.mantenimiento = (s) =>
    seccion("mantenimiento",
      '<div class="grid lg:grid-cols-2 gap-10">' +
        "<div>" + titulo(s.titulo, s.subtitulo) + "</div>" +
        '<div class="border-2 border-texto bg-superficie p-5 sm:p-8">' +
          '<div class="grid grid-cols-2 gap-3">' +
            '<label class="block"><span class="text-sm font-semibold text-textoSuave">Km actuales</span><input id="km-actual" type="number" inputmode="numeric" min="0" step="100" value="48500" class="mt-1.5 w-full h-12 border-2 border-linea bg-fondo px-3 text-lg font-semibold tabular-nums focus:border-texto focus:outline-none"></label>' +
            '<label class="block"><span class="text-sm font-semibold text-textoSuave">Km del último cambio</span><input id="km-ultimo" type="number" inputmode="numeric" min="0" step="100" value="45000" class="mt-1.5 w-full h-12 border-2 border-linea bg-fondo px-3 text-lg font-semibold tabular-nums focus:border-texto focus:outline-none"></label>' +
          "</div>" +
          '<fieldset class="mt-4"><legend class="text-sm font-semibold text-textoSuave">Tipo de aceite</legend><div class="mt-1.5 grid grid-cols-2 gap-2">' +
            s.aceites.map((a, i) => '<label class="cursor-pointer"><input type="radio" name="aceite" value="' + a.intervalo + '" class="peer sr-only"' + (i === 0 ? " checked" : "") + '><span class="flex flex-col items-center justify-center h-14 border-2 border-linea font-semibold leading-tight peer-checked:border-texto peer-checked:bg-texto peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-acento">' + e(a.nombre) + '<span class="text-xs opacity-70">cada ' + a.intervalo.toLocaleString("es-MX") + " km</span></span></label>").join("") +
          "</div></fieldset>" +
          '<div class="mt-7"><div class="h-4 bg-[#E2E5E8] overflow-hidden"><div id="km-barra" class="h-full bg-texto transition-all"></div></div>' +
            '<p id="km-texto" class="mt-3 font-display font-extrabold text-3xl leading-tight"></p><p id="km-sub" class="mt-1 text-textoSuave"></p></div>' +
          '<div id="km-boton" class="mt-6"></div>' +
        "</div>" +
      "</div>");

  R.seguimiento = (s) =>
    seccion("seguimiento",
      titulo(s.titulo, s.subtitulo, true) +
      '<form id="form-folio" class="mt-8 flex max-w-xl">' +
        '<label class="flex-1"><span class="sr-only">Folio</span><input name="folio" required autocomplete="off" autocapitalize="characters" placeholder="Ej. ML-1024" class="w-full h-14 bg-white text-texto px-4 text-lg font-semibold uppercase placeholder:normal-case placeholder:font-normal focus:outline-none focus:ring-4 focus:ring-acento/50"></label>' +
        '<button class="h-14 px-6 bg-acento font-display font-bold text-xl">Buscar</button>' +
      "</form>" +
      (C.modoDemo && s.ejemplos.length ? '<p class="mt-3 text-sm text-white/60">Para probar la demo usa ' + s.ejemplos.map((x) => '<button type="button" data-folio="' + e(x.folio) + '" class="underline underline-offset-4 text-white">' + e(x.folio) + "</button>").join(" o ") + ".</p>" : "") +
      '<div id="folio-resultado" class="mt-8" aria-live="polite"></div>',
      "bg-texto text-white");

  R.servicios = (s) =>
    seccion("servicios",
      titulo(s.titulo) +
      '<table class="mt-8 w-full max-w-3xl border-t-2 border-texto"><thead class="sr-only"><tr><th>Servicio</th><th>Tiempo aproximado</th></tr></thead><tbody class="divide-y divide-linea">' +
        s.lista.map((x) => '<tr><td class="py-4 font-display font-bold text-xl sm:text-2xl">' + e(x.nombre) + '</td><td class="py-4 text-right text-textoSuave whitespace-nowrap"><i data-lucide="clock" class="inline w-4 h-4 mr-1.5 -mt-0.5"></i>' + e(x.tiempo) + "</td></tr>").join("") +
      "</tbody></table>");

  R.garantia = (s) =>
    seccion("garantia",
      titulo(s.titulo) +
      '<div class="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-linea border border-linea">' +
        s.puntos.map((p) =>
          '<div class="bg-superficie p-6"><i data-lucide="' + e(p.icono) + '" class="w-7 h-7 text-acento"></i>' +
            '<h3 class="mt-4 font-display font-bold text-2xl leading-tight">' + e(p.titulo) + "</h3>" +
            '<p class="mt-2 text-textoSuave leading-relaxed">' + e(p.texto) + "</p></div>").join("") +
      "</div>", "pt-0 sm:pt-0");

  R.ubicacion = (s) =>
    '<section id="ubicacion" class="bg-texto text-white"><div class="franja h-3" aria-hidden="true"></div>' +
      '<div class="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-20 grid md:grid-cols-2 gap-10">' +
        "<div>" + titulo(s.titulo, "", true) +
          '<p class="mt-5 text-lg flex gap-2.5"><i data-lucide="map-pin" class="w-5 h-5 mt-1 text-acento shrink-0"></i>' + e(N.direccion) + "</p>" +
          '<div class="mt-6 flex flex-col sm:flex-row gap-3">' +
            '<a href="' + e(N.mapsUrl) + '" target="_blank" rel="noopener" class="' + BTN.primario + '"><i data-lucide="navigation" class="w-5 h-5"></i>' + e(s.botonMaps) + "</a>" +
            (N.telefono ? '<a href="tel:' + e(N.telefono) + '" class="' + BTN.contorno.replace("border-texto", "border-white") + '"><i data-lucide="phone" class="w-5 h-5"></i>Llamar</a>' : "") +
          "</div>" +
        "</div>" +
        '<dl class="border-t-2 border-white/20 divide-y divide-white/15 self-start">' +
          N.horario.map((h) => '<div class="flex justify-between gap-4 py-4"><dt class="font-display font-bold text-xl">' + e(h.dias) + '</dt><dd class="text-white/70 text-right">' + e(h.horas) + "</dd></div>").join("") +
          '<div class="flex justify-between gap-4 py-4"><dt class="font-display font-bold text-xl">Domingo</dt><dd class="text-white/70">Solo grúa por WhatsApp</dd></div>' +
        "</dl>" +
      "</div>" +
      '<div class="mx-auto max-w-6xl px-5 sm:px-8 pb-32 sm:pb-12 pt-6 border-t border-white/10 text-sm text-white/50 flex flex-col sm:flex-row justify-between gap-2">' +
        "<p>" + e(N.nombre) + " " + e(N.ciudad) + ", " + e(N.direccion) + "</p>" +
        '<p>Sitio por <a href="../../" class="text-white font-semibold hover:text-acento">VoltBeam</a></p>' +
      "</div>" +
    "</section>";

  /* ---------- armado ---------- */
  const activo = (n) => S[n] && S[n].activo;
  let html = C.modoDemo && S.avisoDemo ? R.avisoDemo(S.avisoDemo) : "";
  html += R.menuSuperior();
  html += "<main>" + (C.orden || []).filter((n) => activo(n) && R[n]).map((n) => R[n](S[n])).join("") + "</main>";
  document.getElementById("app").innerHTML = html;

  /* ---------- cotizador ---------- */
  const fc = $("#form-cotizador");
  if (fc) {
    const cfg = S.cotizador;
    const vehiculoTexto = () => {
      const t = cfg.tipos[Number(fc.querySelector("[name=tipo]:checked").value)];
      const auto = fc.querySelector("[name=auto]").value.trim();
      return auto ? auto + " (" + t.nombre + ")" : t.nombre;
    };
    const calcular = () => {
      const f = cfg.tipos[Number(fc.querySelector("[name=tipo]:checked").value)].factor;
      cfg.servicios.forEach((sv, i) => { fc.querySelector('[data-rango="' + i + '"]').textContent = mxn(redondear(sv.min * f)) + " a " + mxn(redondear(sv.max * f)); });
      const elegidos = [...fc.querySelectorAll("[name=servicio]:checked")].map((c) => cfg.servicios[Number(c.value)]);
      const min = elegidos.reduce((a, sv) => a + redondear(sv.min * f), 0);
      const max = elegidos.reduce((a, sv) => a + redondear(sv.max * f), 0);
      $("#cot-rango").textContent = elegidos.length ? mxn(min) + "–" + mxn(max).slice(1) : "$0";
      $("#cot-rango").setAttribute("aria-label", elegidos.length ? "De " + mxn(min) + " a " + mxn(max) : "Sin servicios");
      $("#cot-detalle").textContent = elegidos.length ? elegidos.length + (elegidos.length === 1 ? " servicio" : " servicios") + " para " + vehiculoTexto() + "." : "Elige al menos un servicio.";
      $("#cot-lista").innerHTML = elegidos.map((sv) => '<li class="flex gap-2"><i data-lucide="check" class="w-4 h-4 mt-1 text-acento shrink-0"></i>' + e(sv.nombre) + "</li>").join("");
      VB.icons();
      return { elegidos, min, max };
    };
    fc.addEventListener("input", calcular);
    fc.addEventListener("change", calcular);
    fc.addEventListener("submit", (ev) => {
      ev.preventDefault();
      const r = calcular();
      const err = $("#cot-error");
      if (!r.elegidos.length) { err.textContent = "Marca al menos un servicio para cotizar."; err.classList.remove("hidden"); return; }
      err.classList.add("hidden");
      VB.openWA(NUM, VB.fill(M.cotizacion, { vehiculo: vehiculoTexto(), servicios: r.elegidos.map((sv) => "• " + sv.nombre).join("\n"), rango: mxn(r.min) + " a " + mxn(r.max) }), "cotizador");
    });
    calcular();
  }

  /* ---------- síntomas ---------- */
  const det = $("#sintoma-detalle");
  if (det) {
    const cfg = S.sintomas;
    document.querySelectorAll("[data-sintoma]").forEach((b) => b.addEventListener("click", () => {
      document.querySelectorAll("[data-sintoma]").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      const x = cfg.lista[Number(b.dataset.sintoma)];
      const u = URG[x.urgencia] || URG.media;
      VB.track("sintoma", { sintoma: x.nombre });
      det.innerHTML =
        '<div class="bg-superficie border-2 border-texto grid md:grid-cols-[1fr_1.2fr]">' +
          '<div class="p-5 sm:p-7 border-b-2 md:border-b-0 md:border-r-2 border-texto">' +
            '<span class="inline-flex items-center gap-1.5 px-2.5 py-1 text-sm font-bold ' + u.clase + '"><i data-lucide="' + u.icono + '" class="w-4 h-4"></i>' + u.texto + "</span>" +
            '<h3 class="mt-4 font-display font-extrabold text-3xl leading-tight">' + e(x.nombre) + "</h3>" +
            '<p class="mt-5 text-sm font-semibold text-textoSuave">Causas más comunes</p>' +
            '<ul class="mt-2 space-y-1.5">' + x.causas.map((c) => '<li class="flex gap-2"><i data-lucide="chevron-right" class="w-4 h-4 mt-1 text-acento shrink-0"></i>' + e(c) + "</li>").join("") + "</ul>" +
          "</div>" +
          '<div class="p-5 sm:p-7 flex flex-col gap-6">' +
            '<div><p class="text-sm font-semibold text-textoSuave">Qué hacer</p><p class="mt-2 text-lg leading-relaxed">' + e(x.recomendacion) + "</p></div>" +
            '<div class="mt-auto flex flex-col sm:flex-row gap-2">' +
              waLink(cfg.boton, VB.fill(M.diagnostico, { vehiculo: "auto", sintoma: x.nombre.toLowerCase() }), "sintoma") +
              (x.urgencia === "alta" ? waLink("Pedir grúa", M.grua, "grua-sintoma", "oscuro", "siren") : "") +
            "</div>" +
          "</div>" +
        "</div>";
      VB.icons();
      if (window.innerWidth < 768) det.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }));
  }

  /* ---------- mantenimiento ---------- */
  const kmA = $("#km-actual"), kmU = $("#km-ultimo");
  if (kmA) {
    const calcKm = () => {
      const actual = Math.max(0, Number(kmA.value) || 0), ultimo = Math.max(0, Number(kmU.value) || 0);
      const intervalo = Number(document.querySelector("[name=aceite]:checked").value);
      const recorridos = actual - ultimo;
      const barra = $("#km-barra"), txt = $("#km-texto"), sub = $("#km-sub");
      if (recorridos < 0) { barra.style.width = "0%"; txt.textContent = "Revisa los kilómetros"; sub.textContent = "El último cambio no puede ser mayor que el kilometraje actual."; $("#km-boton").innerHTML = ""; return; }
      const pct = Math.min(100, (recorridos / intervalo) * 100);
      const falta = intervalo - recorridos;
      barra.style.width = pct + "%";
      barra.className = "h-full transition-all " + (falta <= 0 ? "bg-[#C81E1E]" : falta <= intervalo * 0.15 ? "bg-acento" : "bg-texto");
      if (falta <= 0) { txt.textContent = "Ya te pasaste " + Math.abs(falta).toLocaleString("es-MX") + " km"; sub.textContent = "Agenda tu cambio de aceite cuanto antes."; }
      else { txt.textContent = "Te faltan " + falta.toLocaleString("es-MX") + " km"; sub.textContent = "Próximo cambio a los " + (ultimo + intervalo).toLocaleString("es-MX") + " km. Llevas " + recorridos.toLocaleString("es-MX") + " km desde el último."; }
      $("#km-boton").innerHTML = waLink(S.mantenimiento.boton, VB.fill(M.mantenimiento, { km: actual.toLocaleString("es-MX") }), "mantenimiento", falta <= intervalo * 0.15 ? "primario" : "oscuro", "calendar-check").replace('class="', 'class="w-full ');
      VB.icons();
    };
    [kmA, kmU].forEach((i) => i.addEventListener("input", calcKm));
    document.querySelectorAll("[name=aceite]").forEach((i) => i.addEventListener("change", calcKm));
    calcKm();
  }

  /* ---------- seguimiento ---------- */
  const ff = $("#form-folio");
  if (ff) {
    const cfg = S.seguimiento;
    const buscar = (folio) => {
      folio = folio.trim().toUpperCase();
      const out = $("#folio-resultado");
      const o = cfg.ejemplos.find((x) => x.folio.toUpperCase() === folio);
      VB.track("seguimiento", { encontrado: !!o });
      if (!o) {
        out.innerHTML = '<div class="border-2 border-white/25 p-5 sm:p-6 max-w-xl"><p class="font-display font-bold text-2xl">No encontramos el folio ' + e(folio) + "</p>" +
          '<p class="mt-2 text-white/70">Revisa que esté igual que en tu orden de servicio, o pregúntanos directo.</p>' +
          '<div class="mt-5">' + waLink(cfg.boton, VB.fill(M.seguimiento, { folio: folio }), "seguimiento") + "</div></div>";
        VB.icons(); return;
      }
      out.innerHTML =
        '<div class="bg-white text-texto max-w-3xl">' +
          '<div class="px-5 sm:px-7 py-4 flex flex-wrap items-baseline justify-between gap-2 border-b-2 border-texto"><p class="font-display font-extrabold text-2xl">' + e(o.vehiculo) + '</p><p class="font-semibold text-textoSuave">Folio ' + e(o.folio) + "</p></div>" +
          '<ol class="px-5 sm:px-7 py-6 grid gap-4 sm:grid-cols-4 sm:gap-0">' +
            cfg.etapas.map((et, i) => {
              const hecho = i < o.etapa, actual = i === o.etapa;
              return '<li class="flex sm:flex-col items-center sm:items-start gap-3 sm:gap-2">' +
                '<div class="flex items-center w-auto sm:w-full"><span class="w-9 h-9 grid place-items-center shrink-0 font-bold ' + (hecho ? "bg-texto text-white" : actual ? "bg-acento text-white" : "border-2 border-linea text-textoSuave") + '">' + (hecho ? '<i data-lucide="check" class="w-5 h-5"></i>' : i + 1) + "</span>" +
                (i < cfg.etapas.length - 1 ? '<span class="hidden sm:block flex-1 h-0.5 ' + (hecho ? "bg-texto" : "bg-linea") + '"></span>' : "") + "</div>" +
                '<span class="font-display font-bold text-lg leading-tight ' + (hecho || actual ? "" : "text-textoSuave") + '">' + e(et) + (actual ? '<span class="block font-sans text-sm font-semibold text-acento">Etapa actual</span>' : "") + "</span></li>";
            }).join("") +
          "</ol>" +
          '<p class="px-5 sm:px-7 py-4 bg-acentoSuave flex gap-2.5"><i data-lucide="info" class="w-5 h-5 text-acento shrink-0 mt-0.5"></i>' + e(o.nota) + "</p>" +
        "</div>" +
        '<div class="mt-4">' + waLink(cfg.boton, VB.fill(M.seguimiento, { folio: o.folio }), "seguimiento") + "</div>";
      VB.icons();
    };
    ff.addEventListener("submit", (ev) => { ev.preventDefault(); const v = ff.folio.value; if (v.trim()) buscar(v); else ff.folio.focus(); });
    document.querySelectorAll("[data-folio]").forEach((b) => b.addEventListener("click", () => { ff.folio.value = b.dataset.folio; buscar(b.dataset.folio); }));
  }

  document.addEventListener("click", (ev) => {
    const a = ev.target.closest('a[href^="https://wa.me"]');
    if (a) VB.track("whatsapp_click", { origen: a.dataset.origen || "enlace" });
  });

  VB.icons();
  document.body.classList.add("listo");

  if (C.bot) {
    C.bot.variables = Object.assign({ negocio: N.nombre + " " + N.ciudad, direccion: N.direccion, horario: N.horarioCorto, mapsUrl: N.mapsUrl }, C.bot.variables || {});
    VB.Bot(C.bot, NUM);
  }
})();
