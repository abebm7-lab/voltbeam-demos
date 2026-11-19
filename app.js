/* =====================================================================
   VOLTBEAM · ARMADO DE LA PÁGINA PRINCIPAL (app.js)
   ---------------------------------------------------------------------
   Lee config.js y construye cada sección. Para cambiar contenido,
   edita config.js. Este archivo solo se toca para cambiar el diseño.
   ===================================================================== */
(function () {
  "use strict";
  const C = window.SITE_CONFIG;
  const VB = window.VB;
  if (!C || !VB) { console.error("Falta config.js o bot.js"); return; }

  const S = C.secciones || {};
  const NUM = C.contacto.whatsapp;
  const e = VB.esc;
  const msg = (clave) => (C.contacto.mensajes && C.contacto.mensajes[clave]) || clave || C.contacto.mensajes.general;

  VB.applyColors(C.marca.colores);
  VB.injectCSS();
  VB.analytics(C.analitica);

  /* ---------- piezas reutilizables ---------- */
  const BTN = {
    primario: "inline-flex items-center justify-center gap-2.5 h-14 px-7 rounded-full bg-acento text-black font-semibold text-base hover:bg-acentoSuave active:scale-[.98] transition",
    secundario: "inline-flex items-center justify-center gap-2.5 h-14 px-7 rounded-full border border-linea text-texto font-medium hover:border-acento/70 hover:bg-white/[.03] active:scale-[.98] transition",
    texto: "inline-flex items-center gap-2 text-acento font-semibold hover:text-acentoSuave transition"
  };

  // Botón/enlace que abre WhatsApp con un mensaje prellenado
  const wa = (texto, mensaje, origen, estilo, icono) =>
    '<a href="' + e(VB.waUrl(NUM, mensaje)) + '" target="_blank" rel="noopener" data-origen="' + e(origen) + '" class="' + BTN[estilo || "primario"] + '">' +
    '<i data-lucide="' + (icono || "message-circle") + '" class="w-5 h-5 shrink-0"></i><span>' + e(texto) + "</span></a>";

  const wrap = (id, contenido, extra) =>
    '<section id="' + id + '" class="px-5 sm:px-8 py-20 sm:py-28 ' + (extra || "") + '"><div class="mx-auto max-w-6xl">' + contenido + "</div></section>";

  const encabezado = (titulo, subtitulo) =>
    '<h2 class="font-display font-semibold text-[2rem] leading-[1.1] sm:text-5xl sm:leading-[1.06] tracking-[-0.02em] max-w-3xl text-balance">' + e(titulo) + "</h2>" +
    (subtitulo ? '<p class="mt-4 text-lg text-textoSuave max-w-2xl leading-relaxed">' + e(subtitulo) + "</p>" : "");

  const wordmark = (tam) =>
    '<span class="font-display font-bold uppercase tracking-tight ' + (tam || "text-[19px]") + '"><span>' + e(C.marca.nombreParte1) + '</span><span class="text-acento">' + e(C.marca.nombreParte2) + "</span></span>";

  // Triángulo de líneas inspirado en el logo
  const trianguloSVG = (clase) =>
    '<svg aria-hidden="true" class="' + clase + '" viewBox="0 0 200 174" fill="none">' +
    '<path d="M100 2 L198 172 L2 172 Z" stroke="rgb(var(--c-acento))" stroke-opacity=".55" stroke-width="1.2"/>' +
    '<path d="M100 40 L165 152 L35 152 Z" stroke="rgb(var(--c-acento))" stroke-opacity=".22" stroke-width="1"/>' +
    "</svg>";

  /* ---------- secciones ---------- */
  const R = {};

  R.menu = (s) =>
    '<header class="sticky top-0 z-50 bg-fondo/80 backdrop-blur-md border-b border-linea/60">' +
      '<nav class="mx-auto max-w-6xl h-16 px-5 sm:px-8 flex items-center gap-6">' +
        '<a href="#" class="flex items-center gap-2.5 mr-auto" aria-label="' + e(C.marca.nombre) + ', inicio">' +
          '<img src="' + e(C.marca.logo) + '" alt="" class="h-7 w-auto">' + wordmark() + "</a>" +
        '<div class="hidden md:flex items-center gap-7 text-[15px] text-textoSuave">' +
          s.links.map((l) => '<a class="hover:text-texto transition" href="' + e(l.ancla) + '">' + e(l.texto) + "</a>").join("") +
        "</div>" +
        '<a href="' + e(VB.waUrl(NUM, msg(s.boton.mensaje))) + '" target="_blank" rel="noopener" data-origen="menu" class="inline-flex items-center gap-2 h-10 px-4 rounded-full bg-acento text-black text-sm font-semibold hover:bg-acentoSuave transition">' +
          '<i data-lucide="message-circle" class="w-4 h-4"></i>' + e(s.boton.texto) + "</a>" +
      "</nav>" +
    "</header>";

  R.hero = (s) => {
    const ch = s.chatEjemplo || {};
    return '<section id="inicio" class="relative overflow-hidden px-5 sm:px-8 pt-10 pb-20 sm:pt-20 sm:pb-28">' +
      '<div class="mx-auto max-w-6xl grid lg:grid-cols-[1.15fr_.85fr] gap-14 lg:gap-10 items-center">' +
        "<div>" +
          '<p class="inline-flex items-center gap-2 rounded-full border border-linea px-3.5 py-1.5 text-sm text-textoSuave"><i data-lucide="map-pin" class="w-4 h-4 text-acento"></i>' + e(s.etiqueta) + "</p>" +
          '<h1 class="mt-6 font-display font-semibold text-[2.55rem] leading-[1.04] sm:text-6xl lg:text-[4.25rem] tracking-[-0.025em] text-balance">' + e(s.titulo) + "</h1>" +
          '<p class="mt-6 text-lg sm:text-xl text-textoSuave max-w-xl leading-relaxed">' + e(s.subtitulo) + "</p>" +
          '<div class="mt-9 flex flex-col sm:flex-row gap-3">' +
            wa(s.botonPrincipal.texto, msg(s.botonPrincipal.mensaje), "hero") +
            '<a href="' + e(s.botonSecundario.ancla) + '" class="' + BTN.secundario + '"><i data-lucide="play" class="w-[18px] h-[18px]"></i>' + e(s.botonSecundario.texto) + "</a>" +
          "</div>" +
          (s.notaBajoBotones ? '<p class="mt-4 text-sm text-textoSuave flex items-center gap-2"><i data-lucide="check" class="w-4 h-4 text-acento"></i>' + e(s.notaBajoBotones) + "</p>" : "") +
        "</div>" +
        '<div class="relative mx-auto w-full max-w-[340px] sm:max-w-[360px]">' +
          trianguloSVG("absolute left-1/2 -translate-x-1/2 -top-12 w-[150%] max-w-[560px] pointer-events-none") +
          '<div class="relative rounded-[2.4rem] border border-linea bg-[#0B141A] p-2 shadow-[0_50px_100px_-40px_rgb(var(--c-acento)/.45)]">' +
            '<div class="vbchat rounded-[1.9rem] overflow-hidden">' +
              '<div class="vb-head flex items-center gap-3 px-4 py-3">' +
                '<div class="w-9 h-9 rounded-full bg-white/15 grid place-items-center"><i data-lucide="store" class="w-[18px] h-[18px]"></i></div>' +
                '<div class="leading-tight"><p class="font-semibold text-[15px]">' + e(ch.nombreNegocio) + '</p><p class="vb-sub text-xs" id="hero-estado">' + e(ch.estado) + "</p></div>" +
              "</div>" +
              '<div id="hero-chat" class="vb-body h-[390px] px-3 py-4 flex flex-col justify-end gap-1.5 overflow-hidden" aria-label="Conversación de ejemplo"></div>' +
              '<div class="vb-foot px-3 py-2.5 flex items-center gap-2"><div class="flex-1 h-10 rounded-full vb-input px-4 flex items-center text-sm" style="color:var(--wa-sub)">Mensaje</div><div class="w-10 h-10 rounded-full bg-[#00A884] grid place-items-center"><i data-lucide="mic" class="w-[18px] h-[18px] text-white"></i></div></div>' +
            "</div>" +
          "</div>" +
          (ch.pie ? '<p id="hero-pie" class="mt-5 text-center text-sm text-textoSuave transition-opacity duration-500 opacity-0">' + e(ch.pie) + "</p>" : "") +
        "</div>" +
      "</div>" +
    "</section>";
  };

  R.problema = (s) => wrap("problema",
    encabezado(s.titulo, s.subtitulo) +
    '<div class="mt-12 grid md:grid-cols-2 gap-4">' +
      '<div class="rounded-2xl border border-linea p-6 sm:p-8">' +
        '<h3 class="font-display font-semibold text-xl text-textoSuave">' + e(s.columnaHoy.titulo) + "</h3>" +
        '<ul class="mt-5 space-y-4">' + s.columnaHoy.puntos.map((p) => '<li class="flex gap-3 text-textoSuave"><i data-lucide="x" class="w-5 h-5 mt-0.5 shrink-0 opacity-60"></i><span>' + e(p) + "</span></li>").join("") + "</ul>" +
      "</div>" +
      '<div class="rounded-2xl border border-acento/50 bg-acento/[.06] p-6 sm:p-8">' +
        '<h3 class="font-display font-semibold text-xl text-acento">' + e(s.columnaSolucion.titulo) + "</h3>" +
        '<ul class="mt-5 space-y-4">' + s.columnaSolucion.puntos.map((p) => '<li class="flex gap-3"><i data-lucide="check" class="w-5 h-5 mt-0.5 shrink-0 text-acento"></i><span>' + e(p) + "</span></li>").join("") + "</ul>" +
      "</div>" +
    "</div>", "border-t border-linea/60");

  R.servicios = (s) => wrap("servicios",
    encabezado(s.titulo, s.subtitulo) +
    '<div class="mt-12 grid md:grid-cols-3 gap-px bg-linea border border-linea rounded-2xl overflow-hidden">' +
      s.lista.map((v) =>
        '<article class="relative p-7 sm:p-8 flex flex-col ' + (v.destacado ? "bg-superficie" : "bg-fondo") + '">' +
          (v.destacado ? '<span class="absolute inset-x-0 top-0 h-[3px] bg-acento"></span>' : "") +
          '<div class="w-11 h-11 rounded-xl bg-acento/10 text-acento grid place-items-center"><i data-lucide="' + e(v.icono) + '" class="w-[22px] h-[22px]"></i></div>' +
          '<h3 class="mt-5 font-display font-semibold text-xl">' + e(v.titulo) + "</h3>" +
          '<p class="mt-3 text-textoSuave leading-relaxed">' + e(v.descripcion) + "</p>" +
          '<ul class="mt-5 space-y-2.5 text-[15px]">' + (v.puntos || []).map((p) => '<li class="flex gap-2.5"><i data-lucide="check" class="w-4 h-4 mt-1 text-acento shrink-0"></i>' + e(p) + "</li>").join("") + "</ul>" +
          '<div class="mt-auto pt-7">' + wa(v.boton, VB.fill(msg("cotizar"), { servicio: v.titulo }), "servicio", "texto") + "</div>" +
        "</article>").join("") +
    "</div>");

  R.demos = (s) => wrap("demos",
    encabezado(s.titulo, s.subtitulo) +
    '<div class="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">' +
      s.lista.filter((d) => d.activo).map((d) => {
        const vivo = !!d.url;
        const interior =
          '<div class="flex items-center justify-between">' +
            '<div class="w-11 h-11 rounded-xl ' + (vivo ? "bg-acento/10 text-acento" : "bg-white/5 text-textoSuave") + ' grid place-items-center"><i data-lucide="' + e(d.icono) + '" class="w-[22px] h-[22px]"></i></div>' +
            '<span class="inline-flex items-center gap-1.5 text-xs ' + (vivo ? "text-[#4ADE80]" : "text-textoSuave") + '"><span class="w-1.5 h-1.5 rounded-full ' + (vivo ? "bg-[#4ADE80]" : "bg-textoSuave/60") + '"></span>' + e(d.etiqueta) + "</span>" +
          "</div>" +
          '<h3 class="mt-5 font-display font-semibold text-xl">' + e(d.nombre) + "</h3>" +
          '<p class="mt-2 text-textoSuave leading-relaxed">' + e(d.descripcion) + "</p>" +
          (vivo ? '<span class="mt-6 inline-flex items-center gap-2 text-acento font-semibold">Abrir demo<i data-lucide="arrow-up-right" class="w-[18px] h-[18px] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"></i></span>' : "");
        return vivo
          ? '<a href="' + e(d.url) + '" class="group rounded-2xl border border-linea bg-superficie p-6 sm:p-7 hover:border-acento/60 transition">' + interior + "</a>"
          : '<div class="rounded-2xl border border-dashed border-linea p-6 sm:p-7 opacity-70">' + interior + "</div>";
      }).join("") +
    "</div>" +
    '<div class="mt-8"><button type="button" data-abrir-bot class="' + BTN.secundario + ' w-full sm:w-auto"><i data-lucide="bot" class="w-5 h-5"></i>' + e(s.botonBot) + "</button></div>");

  R.calculadora = (s) => {
    const v = s.valores;
    const control = (id, etiqueta, min, max, paso, valor, formato) =>
      '<div>' +
        '<div class="flex items-baseline justify-between gap-4"><label for="calc-' + id + '" class="text-[15px] text-textoSuave">' + etiqueta + '</label><output id="out-' + id + '" class="font-display font-semibold text-lg tabular-nums" data-formato="' + formato + '"></output></div>' +
        '<input id="calc-' + id + '" data-calc="' + id + '" type="range" min="' + min + '" max="' + max + '" step="' + paso + '" value="' + valor + '" class="mt-3 w-full h-2 cursor-pointer">' +
      "</div>";
    return wrap("calculadora",
      encabezado(s.titulo, s.subtitulo) +
      '<div class="mt-12 grid lg:grid-cols-2 gap-6 lg:gap-10 items-start">' +
        '<div class="space-y-8 rounded-2xl border border-linea p-6 sm:p-8">' +
          control("mensajesDia", "Mensajes nuevos al día", 1, 200, 1, v.mensajesDia, "num") +
          control("perdidos", "Contestas tarde o nunca", 0, 100, 5, v.perdidos, "pct") +
          control("cierre", "De esos, cuántos habrían comprado", 0, 100, 5, v.cierre, "pct") +
          control("ticket", "Venta promedio", 50, 10000, 50, v.ticket, "mxn") +
        "</div>" +
        '<div class="rounded-2xl bg-superficie border border-linea p-6 sm:p-8 lg:sticky lg:top-24">' +
          '<p class="text-textoSuave">Con estos números, ' + e(s.textoResultado) + "</p>" +
          '<p id="calc-resultado" class="mt-3 font-display font-bold text-acento text-5xl sm:text-6xl tracking-tight tabular-nums" aria-live="polite">$0</p>' +
          '<p id="calc-detalle" class="mt-4 text-sm text-textoSuave leading-relaxed"></p>' +
          '<div class="mt-7" id="calc-boton"></div>' +
        "</div>" +
      "</div>", "border-t border-linea/60");
  };

  R.proceso = (s) => wrap("proceso",
    encabezado(s.titulo) +
    '<ol class="mt-12 grid md:grid-cols-3 gap-10 md:gap-8">' +
      s.pasos.map((p, i) =>
        '<li class="border-t border-linea pt-6">' +
          '<span class="font-display font-semibold text-5xl text-acento leading-none">' + (i + 1) + "</span>" +
          '<h3 class="mt-5 font-display font-semibold text-xl">' + e(p.titulo) + "</h3>" +
          '<p class="mt-2 text-textoSuave leading-relaxed">' + e(p.descripcion) + "</p>" +
        "</li>").join("") +
    "</ol>");

  R.paquetes = (s) => wrap("paquetes",
    encabezado(s.titulo, s.subtitulo) +
    '<div class="mt-12 grid md:grid-cols-3 gap-4 items-stretch">' +
      s.lista.map((p) =>
        '<article class="relative rounded-2xl p-7 sm:p-8 flex flex-col ' + (p.destacado ? "border-2 border-acento bg-superficie" : "border border-linea") + '">' +
          (p.destacado && p.etiquetaDestacado ? '<span class="absolute -top-3 left-7 rounded-full bg-acento text-black text-xs font-semibold px-3 py-1">' + e(p.etiquetaDestacado) + "</span>" : "") +
          '<h3 class="font-display font-semibold text-2xl">' + e(p.nombre) + "</h3>" +
          '<p class="mt-2 text-textoSuave">' + e(p.para) + "</p>" +
          (s.mostrarPrecios && p.precio ? '<p class="mt-5 font-display font-bold text-3xl">' + e(p.precio) + "</p>" : "") +
          '<ul class="mt-6 space-y-3 text-[15px]">' + p.incluye.map((i) => '<li class="flex gap-2.5"><i data-lucide="check" class="w-4 h-4 mt-1 text-acento shrink-0"></i>' + e(i) + "</li>").join("") + "</ul>" +
          '<div class="mt-auto pt-8">' + wa(p.boton, VB.fill(msg("cotizar"), { servicio: "paquete " + p.nombre }), "paquete", p.destacado ? "primario" : "secundario").replace('class="', 'class="w-full ') + "</div>" +
        "</article>").join("") +
    "</div>" +
    (s.botonPrueba ? '<p class="mt-8 text-center">' + wa(s.botonPrueba, msg("prueba"), "paquetes-prueba", "texto", "sparkles") + "</p>" : ""), "border-t border-linea/60");

  R.testimonios = (s) => wrap("testimonios",
    encabezado(s.titulo) +
    '<div class="mt-12 grid md:grid-cols-3 gap-4">' +
      s.lista.map((t) =>
        '<figure class="rounded-2xl border border-linea p-7">' +
          '<i data-lucide="quote" class="w-6 h-6 text-acento"></i>' +
          '<blockquote class="mt-4 leading-relaxed">' + e(t.texto) + "</blockquote>" +
          '<figcaption class="mt-5 text-sm"><span class="font-semibold">' + e(t.nombre) + '</span><br><span class="text-textoSuave">' + e(t.negocio) + "</span></figcaption>" +
        "</figure>").join("") +
    "</div>");

  R.sobre = (s) => wrap("sobre",
    '<div class="grid lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-16 items-center">' +
      "<div>" + encabezado(s.titulo) + '<p class="mt-6 text-lg text-textoSuave leading-relaxed max-w-2xl">' + e(s.texto) + "</p></div>" +
      '<ul class="space-y-3">' +
        s.puntos.map((p) => '<li class="flex items-center gap-4 rounded-xl border border-linea px-5 py-4"><i data-lucide="' + e(p.icono) + '" class="w-5 h-5 text-acento shrink-0"></i><span>' + e(p.texto) + "</span></li>").join("") +
      "</ul>" +
    "</div>", "border-t border-linea/60");

  R.faq = (s) => wrap("faq",
    encabezado(s.titulo) +
    '<div class="mt-10 divide-y divide-linea border-y border-linea max-w-3xl">' +
      s.lista.map((f) =>
        '<details class="group py-5">' +
          '<summary class="flex items-center justify-between gap-4 cursor-pointer list-none font-medium text-lg">' + e(f.pregunta) + '<i data-lucide="plus" class="w-5 h-5 text-acento shrink-0 transition-transform group-open:rotate-45"></i></summary>' +
          '<p class="mt-3 text-textoSuave leading-relaxed">' + e(f.respuesta) + "</p>" +
        "</details>").join("") +
    "</div>");

  R.contacto = (s) => {
    const campo = "w-full h-12 rounded-xl bg-superficie border border-linea px-4 text-texto placeholder:text-textoSuave/60 focus:border-acento focus:outline-none focus:ring-2 focus:ring-acento/30 transition";
    return wrap("contacto",
      '<div class="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16">' +
        "<div>" + encabezado(s.titulo, s.subtitulo) +
          '<p class="mt-8 flex items-center gap-3 text-textoSuave"><i data-lucide="phone" class="w-5 h-5 text-acento"></i>WhatsApp: <a class="text-texto font-medium hover:text-acento" href="' + e(VB.waUrl(NUM, msg("general"))) + '" target="_blank" rel="noopener" data-origen="contacto-numero">' + e(C.contacto.whatsappVisible) + "</a></p>" +
          (C.contacto.correo ? '<p class="mt-3 flex items-center gap-3 text-textoSuave"><i data-lucide="mail" class="w-5 h-5 text-acento"></i><a class="text-texto hover:text-acento" href="mailto:' + e(C.contacto.correo) + '">' + e(C.contacto.correo) + "</a></p>" : "") +
        "</div>" +
        '<form id="form-contacto" class="space-y-5" novalidate>' +
          '<div class="grid sm:grid-cols-2 gap-5">' +
            '<label class="block"><span class="text-sm text-textoSuave">Tu nombre</span><input name="nombre" required autocomplete="name" class="mt-2 ' + campo + '" placeholder="Laura"></label>' +
            '<label class="block"><span class="text-sm text-textoSuave">Tu negocio</span><input name="negocio" required autocomplete="organization" class="mt-2 ' + campo + '" placeholder="Estética Laura"></label>' +
          "</div>" +
          '<label class="block"><span class="text-sm text-textoSuave">Giro</span><select name="giro" class="mt-2 ' + campo + ' appearance-none">' + s.giros.map((g) => "<option>" + e(g) + "</option>").join("") + "</select></label>" +
          '<fieldset><legend class="text-sm text-textoSuave">¿Qué te interesa?</legend><div class="mt-2 flex flex-wrap gap-2">' +
            s.necesidades.map((n, i) =>
              '<label class="cursor-pointer"><input type="radio" name="necesidad" value="' + e(n) + '" class="peer sr-only"' + (i === 0 ? " checked" : "") + '><span class="inline-block rounded-full border border-linea px-4 py-2 text-[15px] peer-checked:border-acento peer-checked:bg-acento/10 peer-checked:text-acento peer-focus-visible:ring-2 peer-focus-visible:ring-acento transition">' + e(n) + "</span></label>").join("") +
          "</div></fieldset>" +
          '<label class="block"><span class="text-sm text-textoSuave">Algo más (opcional)</span><textarea name="comentario" rows="3" maxlength="300" class="mt-2 ' + campo + ' h-auto py-3 resize-none" placeholder="Ej. me escriben mucho de noche y no alcanzo a contestar"></textarea></label>' +
          '<p id="form-error" class="hidden text-sm text-[#F87171]" role="alert"></p>' +
          '<button type="submit" class="' + BTN.primario + ' w-full sm:w-auto"><i data-lucide="message-circle" class="w-5 h-5"></i>' + e(s.boton) + "</button>" +
        "</form>" +
      "</div>", "border-t border-linea/60");
  };

  R.ctaFinal = (s) =>
    '<section class="relative overflow-hidden px-5 sm:px-8 py-24 sm:py-32 bg-superficie border-y border-linea">' +
      trianguloSVG("absolute -right-24 -bottom-10 w-[420px] sm:w-[560px] pointer-events-none opacity-70") +
      '<div class="relative mx-auto max-w-6xl">' +
        '<h2 class="font-display font-semibold text-[2.3rem] leading-[1.06] sm:text-6xl tracking-[-0.025em] max-w-3xl text-balance">' + e(s.titulo) + "</h2>" +
        '<p class="mt-5 text-lg text-textoSuave max-w-xl">' + e(s.subtitulo) + "</p>" +
        '<div class="mt-9">' + wa(s.boton.texto, msg(s.boton.mensaje), "cta-final") + "</div>" +
      "</div>" +
    "</section>";

  R.footer = (s) => {
    const redes = Object.entries(C.contacto.redes || {}).filter(([, url]) => url);
    return '<footer class="px-5 sm:px-8 pt-14 pb-28 sm:pb-14">' +
      '<div class="mx-auto max-w-6xl flex flex-col sm:flex-row gap-8 sm:items-end justify-between">' +
        "<div>" +
          '<div class="flex items-center gap-2.5"><img src="' + e(C.marca.logo) + '" alt="" class="h-7 w-auto">' + wordmark() + "</div>" +
          '<p class="mt-3 text-sm text-textoSuave max-w-xs">' + e(s.texto) + "</p>" +
        "</div>" +
        '<div class="text-sm text-textoSuave sm:text-right space-y-1.5">' +
          '<p>' + e(C.marca.ciudad) + "</p>" +
          '<p>WhatsApp <a class="text-texto hover:text-acento" href="' + e(VB.waUrl(NUM, msg("general"))) + '" target="_blank" rel="noopener" data-origen="footer">' + e(C.contacto.whatsappVisible) + "</a></p>" +
          (redes.length ? "<p>" + redes.map(([r, url]) => '<a class="capitalize hover:text-acento mr-3 sm:mr-0 sm:ml-3" href="' + e(url) + '" target="_blank" rel="noopener">' + e(r) + "</a>").join("") + "</p>" : "") +
          '<p class="pt-2">© ' + new Date().getFullYear() + " " + e(C.marca.firma) + "</p>" +
        "</div>" +
      "</div>" +
    "</footer>";
  };

  /* ---------- armado ---------- */
  const activo = (n) => S[n] && S[n].activo;
  let html = activo("menu") ? R.menu(S.menu) : "";
  html += "<main>" + (C.orden || []).filter((n) => activo(n) && R[n]).map((n) => R[n](S[n])).join("") + "</main>";
  if (activo("footer")) html += R.footer(S.footer);
  document.getElementById("app").innerHTML = html;

  /* ---------- comportamiento ---------- */

  // Calculadora
  if (activo("calculadora")) {
    const cfg = S.calculadora;
    const mxn = (n) => "$" + Math.round(n).toLocaleString("es-MX");
    const fmt = { num: (n) => n, pct: (n) => n + "%", mxn };
    const calcular = () => {
      const v = {};
      document.querySelectorAll("[data-calc]").forEach((inp) => {
        v[inp.dataset.calc] = Number(inp.value);
        const out = document.getElementById("out-" + inp.dataset.calc);
        out.textContent = fmt[out.dataset.formato](Number(inp.value));
      });
      const perdidosMes = v.mensajesDia * cfg.diasMes * (v.perdidos / 100);
      const ventas = perdidosMes * (v.cierre / 100);
      const dinero = ventas * v.ticket;
      document.getElementById("calc-resultado").textContent = mxn(dinero);
      document.getElementById("calc-detalle").textContent =
        "≈ " + Math.round(perdidosMes) + " mensajes al mes sin buena respuesta, de los que unos " + Math.round(ventas) + " habrían sido venta, a " + mxn(v.ticket) + " cada una.";
      const texto = VB.fill(cfg.mensaje, { mensajesDia: v.mensajesDia, perdidos: v.perdidos, ticket: Math.round(v.ticket).toLocaleString("es-MX"), resultado: Math.round(dinero).toLocaleString("es-MX") });
      document.getElementById("calc-boton").innerHTML = wa(cfg.boton, texto, "calculadora").replace('class="', 'class="w-full ');
      VB.icons();
    };
    document.querySelectorAll("[data-calc]").forEach((inp) => inp.addEventListener("input", calcular));
    calcular();
  }

  // Formulario -> WhatsApp
  const form = document.getElementById("form-contacto");
  if (form) {
    form.addEventListener("submit", (ev) => {
      ev.preventDefault();
      const d = Object.fromEntries(new FormData(form).entries());
      const err = document.getElementById("form-error");
      if (!d.nombre.trim() || !d.negocio.trim()) {
        err.textContent = "Escribe tu nombre y el de tu negocio para armar el mensaje.";
        err.classList.remove("hidden");
        form.querySelector(!d.nombre.trim() ? "[name=nombre]" : "[name=negocio]").focus();
        return;
      }
      err.classList.add("hidden");
      VB.openWA(NUM, VB.fill(S.contacto.mensaje, d), "formulario");
    });
  }

  // Registrar clics a WhatsApp en la analítica
  document.addEventListener("click", (ev) => {
    const a = ev.target.closest('a[href^="https://wa.me"]');
    if (a) VB.track("whatsapp_click", { origen: a.dataset.origen || "enlace" });
  });

  VB.icons();
  document.body.classList.add("listo");

  // Chat animado del hero
  if (activo("hero")) {
    const ch = S.hero.chatEjemplo || {};
    setTimeout(() => VB.playChat(document.getElementById("hero-chat"), ch.mensajes, {
      estadoEl: document.getElementById("hero-estado"),
      estadoTexto: ch.estado,
      alTerminar: () => { const p = document.getElementById("hero-pie"); if (p) p.classList.remove("opacity-0"); }
    }), 600);
  }

  // Simulador flotante
  VB.Bot(C.bot, NUM);
})();
