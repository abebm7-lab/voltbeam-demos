/* =====================================================================
   PLANTILLA: RESTAURANTE · ARMADO DE LA PÁGINA (app.js)
   ---------------------------------------------------------------------
   Lee config.js y construye la página: menú con carrito, promo del día,
   "abierto ahora" y reservaciones. Para cambiar contenido, edita config.js.
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

  /* ---------- tiempo y horario ---------- */
  const DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  const DIAS_CORTOS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  const aMin = (hhmm) => { const [h, m] = hhmm.split(":").map(Number); return h * 60 + m; };
  const hora12 = (hhmm) => {
    let [h, m] = hhmm.split(":").map(Number);
    if (h === 23 && m === 59) return "medianoche";
    const suf = h >= 12 ? "p.m." : "a.m."; h = h % 12 || 12;
    return h + (m ? ":" + String(m).padStart(2, "0") : "") + " " + suf;
  };
  // "a la 1 p.m." / "a las 3 p.m."
  const aLas = (hhmm) => { const h = Number(hhmm.split(":")[0]); return (h === 1 || h === 13 ? "a la " : "a las ") + hora12(hhmm); };
  const hoy = new Date();
  const diaHoy = hoy.getDay();
  const turnoDe = (d) => (N.horario || []).find((h) => h.dia === d);

  const estadoAbierto = () => {
    const ahora = new Date(); const d = ahora.getDay(); const min = ahora.getHours() * 60 + ahora.getMinutes();
    const t = turnoDe(d);
    if (t && min >= aMin(t.abre) && min < aMin(t.cierra)) return { abierto: true, texto: "Abierto, cierra " + aLas(t.cierra) };
    if (t && min < aMin(t.abre)) return { abierto: false, texto: "Cerrado, abre hoy " + aLas(t.abre) };
    for (let i = 1; i <= 7; i++) {
      const sig = (d + i) % 7; const ts = turnoDe(sig);
      if (ts) return { abierto: false, texto: "Cerrado, abre " + (i === 1 ? "mañana" : "el " + DIAS[sig]) + " " + aLas(ts.abre) };
    }
    return { abierto: false, texto: "Cerrado" };
  };
  const horarioHoyTexto = (() => { const t = turnoDe(diaHoy); return t ? "de " + hora12(t.abre) + " a " + hora12(t.cierra) : "cerrado"; })();
  const promoHoy = (S.promos && S.promos.porDia && S.promos.porDia[diaHoy]) || "";

  /* ---------- piezas ---------- */
  const mxn = (n) => "$" + Number(n).toLocaleString("es-MX");
  const BTN = {
    primario: "inline-flex items-center justify-center gap-2 h-14 px-7 rounded-full bg-acento text-white font-bold text-[17px] hover:brightness-110 active:scale-[.98] transition",
    claro: "inline-flex items-center justify-center gap-2 h-14 px-7 rounded-full bg-white text-acento font-bold text-[17px] hover:bg-white/90 active:scale-[.98] transition",
    contorno: "inline-flex items-center justify-center gap-2 h-14 px-7 rounded-full border-2 border-white/70 text-white font-bold text-[17px] hover:bg-white/10 active:scale-[.98] transition",
    oscuro: "inline-flex items-center justify-center gap-2 h-14 px-7 rounded-full bg-texto text-white font-bold text-[17px] hover:brightness-125 active:scale-[.98] transition"
  };
  const ETIQUETA = {
    Favorito: "bg-acentoSuave text-texto",
    Picante: "bg-[#FFE1E1] text-[#B42318]",
    Vegetariano: "bg-[#DDF5E3] text-[#11643A]",
    Nuevo: "bg-acento/10 text-acento"
  };
  const slug = (t) => t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-");

  // Índice de platillos para el carrito
  const PLATILLOS = {};
  (S.menu ? S.menu.categorias : []).forEach((cat) => cat.platillos.forEach((p) => {
    const id = slug(cat.nombre + "-" + p.nombre); p._id = id; PLATILLOS[id] = p;
  }));

  /* ---------- secciones ---------- */
  const R = {};

  R.avisoDemo = (s) =>
    '<div class="bg-texto text-white text-sm"><div class="mx-auto max-w-5xl px-5 py-2.5 flex items-center gap-3">' +
      '<a href="../../" class="inline-flex items-center gap-1.5 opacity-80 hover:opacity-100 shrink-0" aria-label="Volver a VoltBeam"><i data-lucide="arrow-left" class="w-4 h-4"></i></a>' +
      '<p class="flex-1 truncate opacity-90"><span class="sm:hidden">Demo VoltBeam</span><span class="hidden sm:inline">' + e(s.texto) + "</span></p>" +
      '<a href="' + e(VB.waUrl(s.numero, s.mensaje)) + '" target="_blank" rel="noopener" data-origen="aviso-demo" class="shrink-0 font-semibold underline underline-offset-4">' + e(s.enlaceTexto) + "</a>" +
    "</div></div>";

  R.menuSuperior = () => {
    const st = estadoAbierto();
    return '<header class="sticky top-0 z-50 bg-fondo/90 backdrop-blur-md border-b border-linea">' +
      '<nav class="mx-auto max-w-5xl h-16 px-5 flex items-center gap-3">' +
        '<a href="#" class="font-extrabold text-2xl tracking-[-0.04em] mr-auto">' + e(N.nombre) + "</a>" +
        '<span id="estado" class="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-textoSuave"><span class="w-2 h-2 rounded-full ' + (st.abierto ? "bg-[#16A34A]" : "bg-textoSuave/50") + '"></span>' + e(st.texto) + "</span>" +
        '<button type="button" data-abrir-carrito class="relative inline-flex items-center gap-2 h-10 pl-3.5 pr-4 rounded-full bg-acento text-white text-sm font-bold"><i data-lucide="shopping-bag" class="w-[18px] h-[18px]"></i>Pedido<span data-cuenta class="hidden min-w-5 h-5 px-1 rounded-full bg-acentoSuave text-texto text-xs font-extrabold grid place-items-center"></span></button>' +
      "</nav>" +
    "</header>";
  };

  R.hero = (s) => {
    const st = estadoAbierto();
    return '<section class="bg-acento text-white px-5 pt-10 pb-16 sm:pt-16 sm:pb-24 overflow-hidden">' +
      '<div class="mx-auto max-w-5xl">' +
        '<p class="inline-flex sm:hidden items-center gap-2 text-sm font-medium text-white/85"><span class="w-2 h-2 rounded-full ' + (st.abierto ? "bg-[#4ADE80]" : "bg-white/50") + '"></span>' + e(st.texto) + "</p>" +
        '<p class="hidden sm:block font-medium text-white/80">' + e(N.tipo) + ", " + e(N.direccion) + "</p>" +
        '<h1 class="mt-4 font-extrabold text-[3.1rem] leading-[.95] sm:text-[5.5rem] tracking-[-0.045em] max-w-4xl text-balance">' + e(s.titulo) + "</h1>" +
        '<p class="mt-6 text-lg sm:text-xl text-white/90 max-w-xl leading-relaxed">' + e(s.subtitulo) + "</p>" +
        '<div class="mt-8 flex flex-col sm:flex-row gap-3">' +
          '<a href="#menu" class="' + BTN.claro + '"><i data-lucide="utensils" class="w-5 h-5"></i>' + e(s.botonMenu) + "</a>" +
          (activo("reservar") ? '<a href="#reservar" class="' + BTN.contorno + '"><i data-lucide="calendar-days" class="w-5 h-5"></i>' + e(s.botonReservar) + "</a>" : "") +
        "</div>" +
        (activo("promos") && promoHoy
          ? '<div class="mt-12 sm:mt-14 inline-block max-w-md -rotate-2 rounded-2xl bg-acentoSuave text-texto px-5 py-4 shadow-[6px_6px_0_rgb(var(--c-texto))]">' +
              '<p class="text-sm font-bold">Hoy, ' + DIAS[diaHoy] + "</p>" +
              '<p class="mt-1 text-xl font-extrabold leading-snug tracking-[-0.02em]">' + e(promoHoy) + "</p>" +
            "</div>"
          : "") +
      "</div>" +
    "</section>";
  };

  R.promos = (s) => {
    const orden = [1, 2, 3, 4, 5, 6, 0];
    return '<section id="promos" class="px-5 py-14 sm:py-20"><div class="mx-auto max-w-5xl">' +
      '<h2 class="font-extrabold text-[2rem] sm:text-5xl tracking-[-0.035em]">' + e(s.titulo) + "</h2>" +
      '<ul class="mt-8 -mx-5 px-5 flex gap-3 overflow-x-auto sin-barra snap-x pb-2">' +
        orden.filter((d) => s.porDia[d]).map((d) =>
          '<li class="snap-start shrink-0 w-[15.5rem] rounded-2xl p-5 ' + (d === diaHoy ? "bg-acentoSuave" : "bg-superficie") + '">' +
            '<p class="flex items-center justify-between text-sm font-bold"><span>' + DIAS_CORTOS[d] + "</span>" + (d === diaHoy ? '<span class="rounded-full bg-texto text-white px-2.5 py-0.5 text-xs">Hoy</span>' : "") + "</p>" +
            '<p class="mt-3 font-semibold leading-snug">' + e(s.porDia[d]) + "</p>" +
          "</li>").join("") +
      "</ul>" +
    "</div></section>";
  };

  R.menu = (s) =>
    '<section id="menu" class="pb-16 sm:pb-24">' +
      '<div class="sticky top-16 z-40 bg-fondo/95 backdrop-blur border-b border-linea">' +
        '<div class="mx-auto max-w-5xl px-5 py-3 flex items-center gap-2 overflow-x-auto sin-barra" role="tablist" aria-label="Categorías del menú">' +
          s.categorias.map((cat, i) =>
            '<a href="#cat-' + slug(cat.nombre) + '" data-tab="cat-' + slug(cat.nombre) + '" class="shrink-0 rounded-full px-4 h-10 inline-flex items-center text-[15px] font-semibold border transition ' + (i === 0 ? "bg-texto text-white border-texto" : "border-linea text-textoSuave hover:text-texto") + '">' + e(cat.nombre) + "</a>").join("") +
        "</div>" +
      "</div>" +
      '<div class="mx-auto max-w-5xl px-5">' +
        '<div class="pt-10 flex items-end justify-between gap-4"><h2 class="font-extrabold text-[2.6rem] sm:text-6xl tracking-[-0.045em] leading-none">' + e(s.titulo) + '</h2><p class="text-sm text-textoSuave text-right">' + e(s.nota) + "</p></div>" +
        s.categorias.map((cat) =>
          '<div id="cat-' + slug(cat.nombre) + '" data-cat class="pt-10">' +
            '<h3 class="text-xl font-extrabold tracking-[-0.02em] pb-3 border-b-2 border-texto">' + e(cat.nombre) + "</h3>" +
            '<ul class="divide-y divide-linea">' +
              cat.platillos.map((p) =>
                '<li class="py-5 flex gap-4 items-start">' +
                  '<div class="flex-1 min-w-0">' +
                    '<p class="flex flex-wrap items-center gap-x-2 gap-y-1"><span class="text-lg font-bold leading-tight">' + e(p.nombre) + "</span>" +
                      (p.etiqueta ? '<span class="rounded-full px-2 py-0.5 text-xs font-bold ' + (ETIQUETA[p.etiqueta] || "bg-superficie") + '">' + e(p.etiqueta) + "</span>" : "") + "</p>" +
                    '<p class="mt-1 text-textoSuave leading-snug">' + e(p.descripcion) + "</p>" +
                    '<p class="mt-2 font-bold">' + mxn(p.precio) + "</p>" +
                  "</div>" +
                  '<div class="shrink-0 pt-1" data-control="' + p._id + '"></div>' +
                "</li>").join("") +
            "</ul>" +
          "</div>").join("") +
      "</div>" +
    "</section>";

  R.reservar = (s) => {
    const manana = new Date();
    const iso = (d) => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
    const campo = "w-full h-12 rounded-xl border border-linea bg-fondo px-4 text-[16px] focus:border-acento focus:outline-none focus:ring-2 focus:ring-acento/25";
    return '<section id="reservar" class="px-5 py-16 sm:py-24 bg-superficie"><div class="mx-auto max-w-5xl grid lg:grid-cols-[.9fr_1.1fr] gap-10 items-start">' +
      "<div>" +
        '<h2 class="font-extrabold text-[2.4rem] sm:text-6xl tracking-[-0.045em] leading-[.98]">' + e(s.titulo) + "</h2>" +
        '<p class="mt-4 text-lg text-textoSuave max-w-md">' + e(s.subtitulo) + "</p>" +
      "</div>" +
      '<form id="form-reserva" class="rounded-3xl bg-fondo border border-linea p-6 sm:p-8 space-y-6" novalidate>' +
        '<div><p class="text-sm font-semibold text-textoSuave">Personas</p>' +
          '<div class="mt-2 flex items-center gap-4"><button type="button" data-personas="-1" class="w-12 h-12 rounded-full border border-linea grid place-items-center" aria-label="Menos personas"><i data-lucide="minus" class="w-5 h-5"></i></button>' +
          '<output id="personas" class="text-3xl font-extrabold tabular-nums w-10 text-center">2</output>' +
          '<button type="button" data-personas="1" class="w-12 h-12 rounded-full border border-linea grid place-items-center" aria-label="Más personas"><i data-lucide="plus" class="w-5 h-5"></i></button></div></div>' +
        '<label class="block"><span class="text-sm font-semibold text-textoSuave">Fecha</span><input type="date" name="fecha" required min="' + iso(manana) + '" value="' + iso(manana) + '" class="mt-2 ' + campo + '"></label>' +
        '<fieldset><legend class="text-sm font-semibold text-textoSuave">Hora</legend><div class="mt-2 flex flex-wrap gap-2">' +
          s.horas.map((h, i) => '<label class="cursor-pointer"><input type="radio" name="hora" value="' + e(h) + '" class="peer sr-only"' + (i === 0 ? " checked" : "") + '><span class="inline-block rounded-full border border-linea px-4 py-2 font-semibold peer-checked:bg-texto peer-checked:text-white peer-checked:border-texto peer-focus-visible:ring-2 peer-focus-visible:ring-acento transition">' + e(hora12(h)) + "</span></label>").join("") +
        "</div></fieldset>" +
        '<label class="block"><span class="text-sm font-semibold text-textoSuave">A nombre de</span><input name="nombre" required autocomplete="name" placeholder="Tu nombre" class="mt-2 ' + campo + '"></label>' +
        '<label class="block"><span class="text-sm font-semibold text-textoSuave">Algo que debamos saber (opcional)</span><input name="nota" maxlength="120" placeholder="Es cumpleaños, silla para bebé…" class="mt-2 ' + campo + '"></label>' +
        '<p id="error-reserva" class="hidden text-sm font-semibold text-[#B42318]" role="alert"></p>' +
        '<button type="submit" class="' + BTN.primario + ' w-full"><i data-lucide="message-circle" class="w-5 h-5"></i>' + e(s.boton) + "</button>" +
      "</form>" +
    "</div></section>";
  };

  R.ubicacion = (s) => {
    const orden = [1, 2, 3, 4, 5, 6, 0];
    return '<section id="ubicacion" class="px-5 py-16 sm:py-24"><div class="mx-auto max-w-5xl grid md:grid-cols-2 gap-10">' +
      "<div>" +
        '<h2 class="font-extrabold text-[2.4rem] sm:text-5xl tracking-[-0.04em]">' + e(s.titulo) + "</h2>" +
        '<p class="mt-4 text-lg flex gap-2.5"><i data-lucide="map-pin" class="w-5 h-5 mt-1 text-acento shrink-0"></i>' + e(N.direccion) + "</p>" +
        '<div class="mt-6 flex flex-col sm:flex-row gap-3">' +
          '<a href="' + e(N.mapsUrl) + '" target="_blank" rel="noopener" class="' + BTN.oscuro + '"><i data-lucide="navigation" class="w-5 h-5"></i>' + e(s.botonMaps) + "</a>" +
          (N.telefono ? '<a href="tel:' + e(N.telefono) + '" class="' + BTN.primario + '"><i data-lucide="phone" class="w-5 h-5"></i>Llamar</a>' : "") +
        "</div>" +
      "</div>" +
      '<dl class="divide-y divide-linea border-y border-linea">' +
        orden.map((d) => {
          const t = turnoDe(d);
          return '<div class="flex justify-between py-3 ' + (d === diaHoy ? "font-bold" : "") + '"><dt class="capitalize">' + DIAS[d] + (d === diaHoy ? " (hoy)" : "") + '</dt><dd class="' + (d === diaHoy ? "" : "text-textoSuave") + '">' + (t ? hora12(t.abre) + " a " + hora12(t.cierra) : "Cerrado") + "</dd></div>";
        }).join("") +
      "</dl>" +
    "</div></section>";
  };

  R.ctaFinal = (s) =>
    '<section class="px-5 pb-16"><div class="mx-auto max-w-5xl rounded-[2rem] bg-acentoSuave px-6 py-12 sm:p-16 flex flex-col sm:flex-row sm:items-center justify-between gap-6">' +
      '<h2 class="font-extrabold text-[2.4rem] sm:text-6xl tracking-[-0.045em] leading-none">' + e(s.titulo) + "</h2>" +
      '<a href="#menu" class="' + BTN.oscuro + '"><i data-lucide="shopping-bag" class="w-5 h-5"></i>' + e(s.boton) + "</a>" +
    "</div></section>";

  R.footer = () =>
    '<footer class="px-5 pt-4 pb-32"><div class="mx-auto max-w-5xl border-t border-linea pt-8 flex flex-col sm:flex-row gap-3 justify-between text-sm text-textoSuave">' +
      '<p><span class="font-extrabold text-texto text-base tracking-[-0.03em]">' + e(N.nombre) + "</span>, " + e(N.direccion) + "</p>" +
      '<p>Sitio por <a href="../../" class="font-semibold text-texto hover:text-acento">VoltBeam</a></p>' +
    "</div></footer>";

  /* ---------- carrito (barra + hoja inferior) ---------- */
  const P = S.pedido || {};
  const carritoHTML = () => {
    const campo = "w-full h-12 rounded-xl border border-linea bg-fondo px-4 text-[16px] focus:border-acento focus:outline-none focus:ring-2 focus:ring-acento/25";
    return '<button type="button" id="barra-carrito" data-abrir-carrito class="hidden fixed z-[55] left-3 right-3 bottom-3 sm:left-auto sm:right-6 sm:bottom-6 sm:w-[380px] h-16 rounded-2xl bg-texto text-white px-5 items-center justify-between shadow-2xl">' +
        '<span class="flex items-center gap-3 font-bold"><i data-lucide="shopping-bag" class="w-5 h-5"></i><span data-cuenta-texto></span></span><span class="font-extrabold text-lg" data-total></span>' +
      "</button>" +
      '<div id="velo" class="velo fixed inset-0 z-[80] bg-black/40" data-open="false"></div>' +
      '<section id="hoja" class="hoja fixed z-[90] inset-x-0 bottom-0 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[420px] max-h-[92dvh] flex flex-col rounded-t-3xl sm:rounded-3xl bg-fondo shadow-2xl" role="dialog" aria-modal="true" aria-label="Tu pedido" data-open="false">' +
        '<header class="flex items-center justify-between px-5 pt-5 pb-3"><h2 class="text-2xl font-extrabold tracking-[-0.03em]">Tu pedido</h2><button type="button" data-cerrar-carrito class="w-10 h-10 rounded-full bg-superficie grid place-items-center" aria-label="Cerrar"><i data-lucide="x" class="w-5 h-5"></i></button></header>' +
        '<form id="form-pedido" class="flex-1 overflow-y-auto px-5 pb-5" novalidate>' +
          '<ul id="lista-carrito" class="divide-y divide-linea"></ul>' +
          '<p id="carrito-vacio" class="py-10 text-center text-textoSuave">Aún no agregas nada. Elige algo del menú.</p>' +
          '<div id="datos-pedido" class="space-y-5 pt-4">' +
            '<fieldset><legend class="text-sm font-semibold text-textoSuave">Entrega</legend><div class="mt-2 grid grid-cols-2 gap-2">' +
              (P.tiposEntrega || []).map((t, i) => '<label class="cursor-pointer"><input type="radio" name="entrega" value="' + e(t) + '" class="peer sr-only"' + (i === 0 ? " checked" : "") + '><span class="flex items-center justify-center h-12 rounded-xl border border-linea font-semibold peer-checked:bg-texto peer-checked:text-white peer-checked:border-texto peer-focus-visible:ring-2 peer-focus-visible:ring-acento">' + e(t) + "</span></label>").join("") +
            "</div></fieldset>" +
            '<div id="bloque-domicilio" class="hidden space-y-2"><label class="block"><span class="text-sm font-semibold text-textoSuave">Dirección</span><input name="direccion" autocomplete="street-address" placeholder="Calle, número y colonia" class="mt-2 ' + campo + '"></label><p class="text-sm text-textoSuave">' + e(P.notaDomicilio || "") + "</p></div>" +
            '<label class="block"><span class="text-sm font-semibold text-textoSuave">Tu nombre</span><input name="nombre" autocomplete="name" placeholder="Para saber de quién es" class="mt-2 ' + campo + '"></label>' +
            '<label class="block"><span class="text-sm font-semibold text-textoSuave">Notas (opcional)</span><input name="notas" maxlength="140" placeholder="Sin cebolla, salsa aparte…" class="mt-2 ' + campo + '"></label>' +
          "</div>" +
        "</form>" +
        '<footer class="border-t border-linea px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">' +
          '<p id="error-pedido" class="hidden mb-3 text-sm font-semibold text-[#B42318]" role="alert"></p>' +
          '<div class="flex items-center justify-between mb-3"><span class="text-textoSuave">Total</span><span class="text-2xl font-extrabold" data-total>$0</span></div>' +
          '<button type="submit" form="form-pedido" class="' + BTN.primario + ' w-full"><i data-lucide="message-circle" class="w-5 h-5"></i>' + e(P.boton || "Enviar pedido") + "</button>" +
        "</footer>" +
      "</section>";
  };

  /* ---------- armado ---------- */
  const activo = (n) => S[n] && S[n].activo;
  let html = C.modoDemo && S.avisoDemo ? R.avisoDemo(S.avisoDemo) : "";
  html += R.menuSuperior();
  html += "<main>" + (C.orden || []).filter((n) => activo(n) && R[n]).map((n) => R[n](S[n])).join("") + "</main>";
  html += R.footer();
  if (activo("menu")) html += carritoHTML();
  document.getElementById("app").innerHTML = html;

  /* ---------- lógica del carrito ---------- */
  const carrito = {}; // id -> cantidad
  const $ = (s) => document.querySelector(s);
  const total = () => Object.entries(carrito).reduce((t, [id, q]) => t + PLATILLOS[id].precio * q, 0);
  const piezas = () => Object.values(carrito).reduce((a, b) => a + b, 0);

  const control = (id) => {
    const q = carrito[id] || 0;
    const p = PLATILLOS[id];
    if (!q) return '<button type="button" data-mas="' + id + '" class="w-11 h-11 rounded-full bg-acento text-white grid place-items-center active:scale-95 transition" aria-label="Agregar ' + e(p.nombre) + '"><i data-lucide="plus" class="w-5 h-5"></i></button>';
    return '<div class="flex items-center gap-1 rounded-full bg-superficie p-1">' +
      '<button type="button" data-menos="' + id + '" class="w-9 h-9 rounded-full bg-fondo grid place-items-center" aria-label="Quitar uno de ' + e(p.nombre) + '"><i data-lucide="minus" class="w-4 h-4"></i></button>' +
      '<span class="w-6 text-center font-extrabold tabular-nums" aria-live="polite">' + q + "</span>" +
      '<button type="button" data-mas="' + id + '" class="w-9 h-9 rounded-full bg-acento text-white grid place-items-center" aria-label="Agregar otro ' + e(p.nombre) + '"><i data-lucide="plus" class="w-4 h-4"></i></button>' +
    "</div>";
  };

  const pintar = () => {
    document.querySelectorAll("[data-control]").forEach((el) => { el.innerHTML = control(el.dataset.control); });
    const n = piezas(); const t = total();
    document.querySelectorAll("[data-total]").forEach((el) => { el.textContent = mxn(t); });
    document.querySelectorAll("[data-cuenta]").forEach((el) => { el.textContent = n; el.classList.toggle("hidden", !n); el.classList.toggle("grid", !!n); });
    document.querySelectorAll("[data-cuenta-texto]").forEach((el) => { el.textContent = "Ver pedido (" + n + (n === 1 ? " producto)" : " productos)"); });
    const barra = $("#barra-carrito");
    if (barra) { barra.classList.toggle("hidden", !n); barra.classList.toggle("flex", !!n); }
    document.body.classList.toggle("carrito-activo", !!n);
    const lista = $("#lista-carrito");
    if (lista) {
      lista.innerHTML = Object.entries(carrito).map(([id, q]) =>
        '<li class="py-3 flex items-center gap-3"><div class="flex-1 min-w-0"><p class="font-bold truncate">' + e(PLATILLOS[id].nombre) + '</p><p class="text-sm text-textoSuave">' + mxn(PLATILLOS[id].precio * q) + "</p></div>" + control(id) + "</li>").join("");
      $("#carrito-vacio").classList.toggle("hidden", !!n);
      $("#datos-pedido").classList.toggle("hidden", !n);
    }
    VB.icons();
  };

  const hoja = $("#hoja"), velo = $("#velo");
  const abrirCarrito = () => { if (!hoja) return; hoja.dataset.open = "true"; velo.dataset.open = "true"; document.documentElement.style.overflow = "hidden"; VB.track("carrito_abierto", { productos: piezas() }); setTimeout(() => hoja.querySelector("[data-cerrar-carrito]").focus({ preventScroll: true }), 80); };
  const cerrarCarrito = () => { if (!hoja) return; hoja.dataset.open = "false"; velo.dataset.open = "false"; document.documentElement.style.overflow = ""; };

  document.addEventListener("click", (ev) => {
    const mas = ev.target.closest("[data-mas]"), menos = ev.target.closest("[data-menos]");
    if (mas) { const id = mas.dataset.mas; carrito[id] = (carrito[id] || 0) + 1; if (carrito[id] === 1) VB.track("agregar_platillo", { platillo: PLATILLOS[id].nombre }); pintar(); return; }
    if (menos) { const id = menos.dataset.menos; carrito[id] = (carrito[id] || 0) - 1; if (carrito[id] <= 0) delete carrito[id]; pintar(); return; }
    if (ev.target.closest("[data-abrir-carrito]")) { abrirCarrito(); return; }
    if (ev.target.closest("[data-cerrar-carrito]") || ev.target === velo) { cerrarCarrito(); return; }
    const a = ev.target.closest('a[href^="https://wa.me"]');
    if (a) VB.track("whatsapp_click", { origen: a.dataset.origen || "enlace" });
  });
  document.addEventListener("keydown", (ev) => { if (ev.key === "Escape" && hoja && hoja.dataset.open === "true") cerrarCarrito(); });

  const formPedido = $("#form-pedido");
  if (formPedido) {
    formPedido.addEventListener("change", (ev) => {
      if (ev.target.name === "entrega") $("#bloque-domicilio").classList.toggle("hidden", ev.target.value !== P.tiposEntrega[1]);
    });
    formPedido.addEventListener("submit", (ev) => {
      ev.preventDefault();
      const d = Object.fromEntries(new FormData(formPedido).entries());
      const err = $("#error-pedido");
      const fallo = (txt, campo) => { err.textContent = txt; err.classList.remove("hidden"); if (campo) formPedido.querySelector("[name=" + campo + "]").focus(); };
      if (!piezas()) return fallo("Agrega al menos un platillo del menú.");
      const domicilio = d.entrega === P.tiposEntrega[1];
      if (domicilio && P.minimoDomicilio && total() < P.minimoDomicilio) return fallo("El pedido mínimo a domicilio es de " + mxn(P.minimoDomicilio) + ". Te faltan " + mxn(P.minimoDomicilio - total()) + ".");
      if (domicilio && !(d.direccion || "").trim()) return fallo("Escribe la dirección de entrega.", "direccion");
      if (!(d.nombre || "").trim()) return fallo("Escribe tu nombre para el pedido.", "nombre");
      err.classList.add("hidden");
      const lineas = Object.entries(carrito).map(([id, q]) => "• " + q + "x " + PLATILLOS[id].nombre + " (" + mxn(PLATILLOS[id].precio * q) + ")");
      const datos = ["Total: " + mxn(total()), "Entrega: " + d.entrega];
      if (domicilio) datos.push("Dirección: " + d.direccion.trim());
      datos.push("Nombre: " + d.nombre.trim());
      if ((d.notas || "").trim()) datos.push("Notas: " + d.notas.trim());
      const texto = M.pedidoInicio + "\n" + lineas.join("\n") + "\n\n" + datos.join("\n");
      VB.track("pedido_enviado", { total: total(), productos: piezas() });
      VB.openWA(NUM, texto, "pedido");
    });
  }

  /* ---------- reservaciones ---------- */
  const formReserva = $("#form-reserva");
  if (formReserva) {
    let personas = 2;
    formReserva.addEventListener("click", (ev) => {
      const b = ev.target.closest("[data-personas]"); if (!b) return;
      personas = Math.min(S.reservar.maxPersonas || 20, Math.max(1, personas + Number(b.dataset.personas)));
      $("#personas").textContent = personas;
    });
    formReserva.addEventListener("submit", (ev) => {
      ev.preventDefault();
      const d = Object.fromEntries(new FormData(formReserva).entries());
      const err = $("#error-reserva");
      if (!d.nombre.trim()) { err.textContent = "Escribe a nombre de quién va la reservación."; err.classList.remove("hidden"); formReserva.querySelector("[name=nombre]").focus(); return; }
      if (!d.fecha) { err.textContent = "Elige una fecha."; err.classList.remove("hidden"); return; }
      err.classList.add("hidden");
      const f = new Date(d.fecha + "T12:00:00");
      const fecha = DIAS[f.getDay()] + " " + f.getDate() + " de " + f.toLocaleDateString("es-MX", { month: "long" });
      VB.openWA(NUM, VB.fill(M.reservacion, { personas: personas, fecha: fecha, hora: aLas(d.hora), nombre: d.nombre.trim(), nota: d.nota ? "Nota: " + d.nota.trim() : "" }), "reservacion");
    });
  }

  /* ---------- pestañas del menú que siguen el scroll ---------- */
  const tabs = document.querySelectorAll("[data-tab]");
  if (tabs.length && "IntersectionObserver" in window) {
    const marcar = (id) => tabs.forEach((t) => {
      const on = t.dataset.tab === id;
      t.classList.toggle("bg-texto", on); t.classList.toggle("text-white", on); t.classList.toggle("border-texto", on);
      t.classList.toggle("text-textoSuave", !on); t.classList.toggle("border-linea", !on);
      if (on && t.parentElement) t.parentElement.scrollTo({ left: Math.max(0, t.offsetLeft - 20), behavior: "smooth" });
    });
    const obs = new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) marcar(en.target.id); }), { rootMargin: "-140px 0px -60% 0px" });
    document.querySelectorAll("[data-cat]").forEach((el) => obs.observe(el));
  }

  // Actualiza "Abierto/Cerrado" cada minuto
  setInterval(() => { const el = $("#estado"); if (el) { const st = estadoAbierto(); el.lastChild.textContent = st.texto; } }, 60000);

  pintar();
  document.body.classList.add("listo");

  if (C.bot) {
    C.bot.variables = Object.assign({ negocio: N.nombre, direccion: N.direccion, horarioHoy: horarioHoyTexto, promoHoy: promoHoy || "sin promo especial, pero todo está buenísimo", mapsUrl: N.mapsUrl }, C.bot.variables || {});
    VB.Bot(C.bot, NUM);
  }
})();
