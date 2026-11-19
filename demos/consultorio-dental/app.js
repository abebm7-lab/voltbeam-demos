/* =====================================================================
   PLANTILLA: CONSULTORIO DENTAL · ARMADO DE LA PÁGINA (app.js)
   ---------------------------------------------------------------------
   Lee config.js y construye la página. Para cambiar contenido edita
   config.js; este archivo solo se toca para cambiar el diseño.
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

  VB.applyColors(C.colores);
  VB.injectCSS();
  VB.analytics(C.analitica);

  /* ---------- piezas reutilizables ---------- */
  const BTN = {
    primario: "inline-flex items-center justify-center gap-2.5 h-14 px-7 rounded-2xl bg-acento text-white font-semibold text-base hover:brightness-110 active:scale-[.98] transition shadow-[0_10px_24px_-12px_rgb(var(--c-acento)/.8)]",
    secundario: "inline-flex items-center justify-center gap-2.5 h-14 px-7 rounded-2xl bg-superficie border border-linea text-texto font-semibold hover:border-acento/60 active:scale-[.98] transition",
    texto: "inline-flex items-center gap-2 text-acento font-semibold hover:underline underline-offset-4"
  };
  const wa = (texto, mensaje, origen, estilo, icono, numero) =>
    '<a href="' + e(VB.waUrl(numero || NUM, mensaje)) + '" target="_blank" rel="noopener" data-origen="' + e(origen) + '" class="' + BTN[estilo || "primario"] + '">' +
    '<i data-lucide="' + (icono || "message-circle") + '" class="w-5 h-5 shrink-0"></i><span>' + e(texto) + "</span></a>";

  const wrap = (id, contenido, extra) =>
    '<section id="' + id + '" class="px-5 sm:px-8 py-16 sm:py-24 ' + (extra || "") + '"><div class="mx-auto max-w-6xl">' + contenido + "</div></section>";

  const titulo = (t, sub) =>
    '<h2 class="text-[1.9rem] leading-[1.12] sm:text-[2.6rem] font-extrabold tracking-[-0.02em] max-w-2xl text-balance">' + e(t) + "</h2>" +
    (sub ? '<p class="mt-3 text-lg text-textoSuave max-w-2xl">' + e(sub) + "</p>" : "");

  const logo = (tam) => N.logo
    ? '<img src="' + e(N.logo) + '" alt="" class="' + (tam || "h-9") + ' w-auto">'
    : '<span class="' + (tam || "w-9 h-9") + ' rounded-full bg-acento text-white grid place-items-center shrink-0"><i data-lucide="' + e(N.logoIcono || "smile") + '" class="w-5 h-5"></i></span>';

  const horarioTexto = N.horarioCorto || (N.horario || []).map((h) => h.dias + " " + h.horas).join(", ");

  /* ---------- secciones ---------- */
  const R = {};

  R.avisoDemo = (s) =>
    '<div class="bg-texto text-white text-sm">' +
      '<div class="mx-auto max-w-6xl px-5 sm:px-8 py-2.5 flex items-center gap-3">' +
        '<a href="../../" class="inline-flex items-center gap-1.5 opacity-80 hover:opacity-100 shrink-0" aria-label="Volver a VoltBeam"><i data-lucide="arrow-left" class="w-4 h-4"></i><span class="hidden sm:inline">VoltBeam</span></a>' +
        '<p class="hidden sm:block flex-1 truncate opacity-90">' + e(s.texto) + "</p>" +
        '<a href="' + e(VB.waUrl(s.numero, s.mensaje)) + '" target="_blank" rel="noopener" data-origen="aviso-demo" class="ml-auto truncate font-semibold underline underline-offset-4">' + e(s.enlaceTexto) + "</a>" +
      "</div>" +
    "</div>";

  R.menu = (s) =>
    '<header class="sticky top-0 z-50 bg-fondo/85 backdrop-blur-md border-b border-linea">' +
      '<nav class="mx-auto max-w-6xl h-16 px-5 sm:px-8 flex items-center gap-6">' +
        '<a href="#" class="flex items-center gap-2.5 mr-auto min-w-0">' + logo() + '<span class="font-extrabold text-lg tracking-tight truncate">' + e(N.nombreCorto || N.nombre) + "</span></a>" +
        '<div class="hidden md:flex items-center gap-7 text-[15px] font-medium text-textoSuave">' +
          s.links.map((l) => '<a class="hover:text-texto" href="' + e(l.ancla) + '">' + e(l.texto) + "</a>").join("") +
        "</div>" +
        '<a href="#agenda" class="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-acento text-white text-sm font-semibold hover:brightness-110 shrink-0"><i data-lucide="calendar-check" class="w-4 h-4"></i>' + e(s.boton) + "</a>" +
      "</nav>" +
    "</header>";

  R.hero = (s) => {
    const a = s.agenda;
    const chips = (nombre, valores, etiqueta) =>
      '<fieldset class="mt-5"><legend class="text-sm font-semibold text-textoSuave">' + etiqueta + '</legend><div class="mt-2 flex flex-wrap gap-2">' +
        valores.map((v, i) =>
          '<label class="cursor-pointer"><input type="radio" name="' + nombre + '" value="' + e(v) + '" class="peer sr-only"' + (i === 0 ? " checked" : "") + '>' +
          '<span class="inline-block rounded-xl border border-linea bg-superficie px-4 py-2.5 text-[15px] font-medium peer-checked:border-acento peer-checked:bg-acentoSuave peer-checked:text-acento peer-focus-visible:ring-2 peer-focus-visible:ring-acento transition">' + e(v) + "</span></label>").join("") +
      "</div></fieldset>";
    return '<section class="px-5 sm:px-8 pt-10 pb-14 sm:pt-16 sm:pb-24">' +
      '<div class="mx-auto max-w-6xl grid lg:grid-cols-[1.1fr_.9fr] gap-10 lg:gap-14 items-center">' +
        "<div>" +
          '<p class="text-textoSuave font-medium">' + e(N.giro) + " en " + e(N.ciudad) + "</p>" +
          '<h1 class="mt-4 text-[2.5rem] leading-[1.05] sm:text-6xl sm:leading-[1.02] font-extrabold tracking-[-0.03em] text-balance">' + e(s.titulo) + "</h1>" +
          '<p class="mt-5 text-lg sm:text-xl text-textoSuave max-w-xl leading-relaxed">' + e(s.subtitulo) + "</p>" +
          '<div class="mt-7">' + wa(s.botonUrgencia, M.urgencia, "hero-urgencia", "texto", "siren") + "</div>" +
        "</div>" +
        '<form id="agenda" class="rounded-3xl bg-superficie border border-linea p-6 sm:p-8 shadow-[0_30px_60px_-30px_rgb(var(--c-texto)/.25)]">' +
          '<div class="flex items-center gap-3"><span class="w-10 h-10 rounded-xl bg-acentoSuave text-acento grid place-items-center"><i data-lucide="calendar-check" class="w-5 h-5"></i></span><h2 class="text-xl font-extrabold">' + e(a.titulo) + "</h2></div>" +
          '<label class="block mt-6"><span class="text-sm font-semibold text-textoSuave">Tratamiento</span>' +
            '<div class="relative mt-2"><select name="tratamiento" class="w-full h-12 appearance-none rounded-xl border border-linea bg-fondo px-4 pr-10 text-[15px] font-medium focus:border-acento focus:outline-none focus:ring-2 focus:ring-acento/25">' +
              a.tratamientos.map((t) => "<option>" + e(t) + "</option>").join("") +
            '</select><i data-lucide="chevron-down" class="w-5 h-5 absolute right-3 top-3.5 text-textoSuave pointer-events-none"></i></div></label>' +
          chips("dia", a.dias, "Día") +
          chips("turno", a.turnos, "Turno") +
          '<button type="submit" class="' + BTN.primario + ' w-full mt-7"><i data-lucide="message-circle" class="w-5 h-5"></i>' + e(a.boton) + "</button>" +
          '<p class="mt-3 text-sm text-textoSuave text-center">' + e(a.nota) + "</p>" +
        "</form>" +
      "</div>" +
    "</section>";
  };

  R.confianza = (s) =>
    '<section class="px-5 sm:px-8"><div class="mx-auto max-w-6xl grid grid-cols-2 lg:grid-cols-4 gap-px bg-linea border border-linea rounded-2xl overflow-hidden">' +
      s.puntos.map((p) => '<div class="bg-superficie p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 min-w-0"><i data-lucide="' + e(p.icono) + '" class="w-5 h-5 text-acento shrink-0"></i><span class="text-[15px] font-medium leading-snug break-words">' + e(p.texto) + "</span></div>").join("") +
    "</div></section>";

  R.tratamientos = (s) => wrap("tratamientos",
    titulo(s.titulo, s.mostrarPrecios ? s.subtitulo : "") +
    '<div class="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">' +
      s.lista.map((t) =>
        '<article class="rounded-2xl bg-superficie border border-linea p-6 flex flex-col">' +
          '<span class="w-11 h-11 rounded-xl bg-acentoSuave text-acento grid place-items-center"><i data-lucide="' + e(t.icono) + '" class="w-[22px] h-[22px]"></i></span>' +
          '<h3 class="mt-4 text-lg font-bold">' + e(t.nombre) + "</h3>" +
          '<p class="mt-1.5 text-textoSuave leading-relaxed">' + e(t.descripcion) + "</p>" +
          '<div class="mt-auto pt-5 flex items-end justify-between gap-3">' +
            (s.mostrarPrecios && t.precio ? '<p class="font-bold text-lg">' + e(t.precio) + "</p>" : "<span></span>") +
            '<a href="' + e(VB.waUrl(NUM, VB.fill(M.tratamiento, { tratamiento: t.nombre.toLowerCase() }))) + '" target="_blank" rel="noopener" data-origen="tratamiento" class="text-sm ' + BTN.texto + '">Pedir informes</a>' +
          "</div>" +
        "</article>").join("") +
    "</div>");

  R.porque = (s) => wrap("porque",
    titulo(s.titulo) +
    '<div class="mt-10 grid md:grid-cols-3 gap-8">' +
      s.lista.map((p) =>
        '<div class="border-l-[3px] border-acento pl-5">' +
          '<h3 class="text-lg font-bold">' + e(p.titulo) + "</h3>" +
          '<p class="mt-2 text-textoSuave leading-relaxed">' + e(p.texto) + "</p>" +
        "</div>").join("") +
    "</div>", "bg-superficie border-y border-linea");

  R.doctora = (s) => {
    const iniciales = s.nombre.replace(/^(Dra?\.|Dr\.)\s*/i, "").split(/\s+/).map((w) => w[0]).slice(0, 2).join("");
    return wrap("doctora",
      '<div class="grid md:grid-cols-[.8fr_1.2fr] gap-8 md:gap-14 items-center">' +
        (s.foto
          ? '<img src="' + e(s.foto) + '" alt="' + e(s.nombre) + '" class="w-full aspect-[4/5] object-cover rounded-3xl">'
          : '<div class="w-full aspect-[4/5] max-h-[440px] rounded-3xl bg-acento text-white grid place-items-center relative overflow-hidden" aria-hidden="true">' +
              '<span class="text-[7rem] font-extrabold tracking-tight opacity-95">' + e(iniciales) + "</span>" +
              '<i data-lucide="smile" class="absolute bottom-6 right-6 w-10 h-10 opacity-60"></i>' +
            "</div>") +
        "<div>" +
          '<p class="text-textoSuave font-medium">' + e(s.titulo) + "</p>" +
          '<h2 class="mt-2 text-[2rem] sm:text-[2.6rem] font-extrabold tracking-[-0.02em] leading-tight">' + e(s.nombre) + "</h2>" +
          '<p class="mt-1 text-acento font-semibold">' + e(s.especialidad) + "</p>" +
          (s.cedula ? '<p class="mt-1 text-sm text-textoSuave">' + e(s.cedula) + "</p>" : "") +
          '<p class="mt-5 text-lg text-textoSuave leading-relaxed max-w-xl">' + e(s.texto) + "</p>" +
          '<ul class="mt-6 space-y-2.5">' + s.puntos.map((p) => '<li class="flex gap-2.5"><i data-lucide="check" class="w-5 h-5 text-acento shrink-0"></i>' + e(p) + "</li>").join("") + "</ul>" +
        "</div>" +
      "</div>");
  };

  R.proceso = (s) => wrap("proceso",
    titulo(s.titulo) +
    '<ol class="mt-10 grid md:grid-cols-3 gap-4">' +
      s.pasos.map((p, i) =>
        '<li class="rounded-2xl bg-superficie border border-linea p-6">' +
          '<span class="w-9 h-9 rounded-full bg-acento text-white font-bold grid place-items-center">' + (i + 1) + "</span>" +
          '<h3 class="mt-4 text-lg font-bold">' + e(p.titulo) + "</h3>" +
          '<p class="mt-1.5 text-textoSuave leading-relaxed">' + e(p.texto) + "</p>" +
        "</li>").join("") +
    "</ol>" +
    '<div class="mt-8"><button type="button" data-abrir-bot class="' + BTN.secundario + ' w-full sm:w-auto"><i data-lucide="bot" class="w-5 h-5 text-acento"></i>Probar el asistente</button></div>');

  R.testimonios = (s) => wrap("testimonios",
    titulo(s.titulo) +
    '<div class="mt-10 grid md:grid-cols-3 gap-4">' +
      s.lista.map((t) =>
        '<figure class="rounded-2xl bg-superficie border border-linea p-6 flex flex-col">' +
          '<div class="flex items-center justify-between"><span class="flex gap-0.5 text-[#E9A23B]" aria-label="5 de 5">' + '<i data-lucide="star" class="w-4 h-4 fill-current"></i>'.repeat(5) + "</span>" +
            (C.modoDemo ? '<span class="text-xs font-semibold rounded-md bg-fondo border border-linea px-2 py-0.5 text-textoSuave">Ejemplo</span>' : "") + "</div>" +
          '<blockquote class="mt-4 leading-relaxed flex-1">' + e(t.texto) + "</blockquote>" +
          '<figcaption class="mt-5 text-sm"><span class="font-bold">' + e(t.nombre) + '</span><span class="text-textoSuave">, ' + e(t.detalle) + "</span></figcaption>" +
        "</figure>").join("") +
    "</div>", "bg-superficie border-y border-linea");

  R.faq = (s) => wrap("faq",
    titulo(s.titulo) +
    '<div class="mt-8 max-w-3xl divide-y divide-linea border-y border-linea">' +
      s.lista.map((f) =>
        '<details class="group py-5">' +
          '<summary class="flex items-center justify-between gap-4 cursor-pointer list-none text-lg font-semibold">' + e(f.pregunta) + '<i data-lucide="plus" class="w-5 h-5 text-acento shrink-0 transition-transform group-open:rotate-45"></i></summary>' +
          '<p class="mt-3 text-textoSuave leading-relaxed">' + e(f.respuesta) + "</p>" +
        "</details>").join("") +
    "</div>");

  R.ubicacion = (s) => wrap("ubicacion",
    '<div class="rounded-3xl bg-superficie border border-linea p-6 sm:p-10 grid md:grid-cols-2 gap-8">' +
      "<div>" + titulo(s.titulo) +
        '<p class="mt-4 flex gap-3 text-lg"><i data-lucide="map-pin" class="w-5 h-5 text-acento mt-1 shrink-0"></i>' + e(N.direccion) + "</p>" +
      "</div>" +
      "<div>" +
        '<dl class="divide-y divide-linea border-y border-linea">' +
          (N.horario || []).map((h) => '<div class="flex justify-between gap-4 py-3"><dt class="font-medium">' + e(h.dias) + '</dt><dd class="text-textoSuave text-right">' + e(h.horas) + "</dd></div>").join("") +
        "</dl>" +
        '<div class="mt-6 flex flex-col sm:flex-row gap-3">' +
          '<a href="' + e(N.mapsUrl) + '" target="_blank" rel="noopener" class="' + BTN.secundario + '"><i data-lucide="navigation" class="w-5 h-5 text-acento"></i>' + e(s.botonMaps) + "</a>" +
          (C.contacto.telefono ? '<a href="tel:' + e(C.contacto.telefono) + '" class="' + BTN.secundario + '"><i data-lucide="phone" class="w-5 h-5 text-acento"></i>Llamar</a>' : "") +
        "</div>" +
      "</div>" +
    "</div>");

  R.ctaFinal = (s) =>
    '<section class="px-5 sm:px-8 pb-16 sm:pb-24"><div class="mx-auto max-w-6xl rounded-3xl bg-acento text-white px-6 py-12 sm:p-16">' +
      '<h2 class="text-[2rem] leading-[1.1] sm:text-5xl font-extrabold tracking-[-0.02em] max-w-2xl text-balance">' + e(s.titulo) + "</h2>" +
      '<p class="mt-4 text-lg opacity-90">' + e(s.subtitulo) + "</p>" +
      '<a href="' + e(VB.waUrl(NUM, M.general)) + '" target="_blank" rel="noopener" data-origen="cta-final" class="mt-8 inline-flex items-center justify-center gap-2.5 h-14 px-7 rounded-2xl bg-white text-acento font-bold hover:bg-white/90 active:scale-[.98] transition w-full sm:w-auto"><i data-lucide="message-circle" class="w-5 h-5"></i>' + e(s.boton) + "</a>" +
    "</div></section>";

  R.footer = () =>
    '<footer class="px-5 sm:px-8 pb-28 sm:pb-12 pt-4"><div class="mx-auto max-w-6xl border-t border-linea pt-8 flex flex-col sm:flex-row gap-4 justify-between text-sm text-textoSuave">' +
      '<div class="flex items-center gap-2.5">' + logo("w-7 h-7") + '<span class="font-bold text-texto">' + e(N.nombre) + "</span></div>" +
      "<p>" + e(N.direccion) + "</p>" +
      '<p>Sitio por <a href="../../" class="font-semibold text-texto hover:text-acento">VoltBeam</a></p>' +
    "</div></footer>";

  /* ---------- armado ---------- */
  const activo = (n) => S[n] && S[n].activo;
  let html = C.modoDemo && S.avisoDemo ? R.avisoDemo(S.avisoDemo) : "";
  html += activo("menu") ? R.menu(S.menu) : "";
  html += "<main>" + (C.orden || []).filter((n) => activo(n) && R[n]).map((n) => R[n](S[n])).join("") + "</main>";
  html += R.footer();
  document.getElementById("app").innerHTML = html;

  /* ---------- comportamiento ---------- */
  const agenda = document.getElementById("agenda");
  if (agenda) {
    agenda.addEventListener("submit", (ev) => {
      ev.preventDefault();
      const d = Object.fromEntries(new FormData(agenda).entries());
      d.tratamiento = d.tratamiento.toLowerCase();
      d.dia = d.dia.toLowerCase();
      d.turno = d.turno.toLowerCase();
      VB.openWA(NUM, VB.fill(M.cita, d), "agenda");
    });
  }

  document.addEventListener("click", (ev) => {
    const a = ev.target.closest('a[href^="https://wa.me"]');
    if (a) VB.track("whatsapp_click", { origen: a.dataset.origen || "enlace" });
  });

  VB.icons();
  document.body.classList.add("listo");

  // El asistente recibe los datos del negocio como variables
  if (C.bot) {
    C.bot.variables = Object.assign({ negocio: N.nombre, direccion: N.direccion, horario: horarioTexto, mapsUrl: N.mapsUrl }, C.bot.variables || {});
    VB.Bot(C.bot, NUM);
  }
})();
