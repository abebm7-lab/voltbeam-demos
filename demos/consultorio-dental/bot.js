/* =====================================================================
   VOLTBEAM · NÚCLEO COMPARTIDO (bot.js)
   ---------------------------------------------------------------------
   Simulador de WhatsApp, enlaces a WhatsApp, analítica y utilidades.
   NO necesitas editar este archivo: todo se controla desde config.js.
   Este mismo archivo se copia tal cual en cada plantilla de demos/.
   ===================================================================== */
(function () {
  "use strict";

  const VB = {};
  const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- utilidades ---------- */
  VB.esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // Reemplaza {variable} por su valor. Las variables vacías se quitan.
  VB.fill = (tpl, vars) => String(tpl ?? "").replace(/\{(\w+)\}/g, (_, k) => (vars && vars[k] != null ? vars[k] : ""));

  VB.waUrl = (numero, mensaje) =>
    "https://wa.me/" + String(numero).replace(/\D/g, "") + (mensaje ? "?text=" + encodeURIComponent(mensaje.replace(/\s+/g, " ").trim()) : "");

  VB.openWA = (numero, mensaje, origen) => {
    VB.track("whatsapp_click", { origen: origen || "general" });
    window.open(VB.waUrl(numero, mensaje), "_blank", "noopener");
  };

  VB.icons = () => { if (window.lucide && window.lucide.createIcons) window.lucide.createIcons(); };

  const hexToRgb = (hex) => {
    const h = String(hex).replace("#", "");
    const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255].join(" ");
  };

  // Convierte config.marca.colores en variables CSS: --c-fondo: "0 0 0"
  VB.applyColors = (colores) => {
    const root = document.documentElement;
    Object.entries(colores || {}).forEach(([k, v]) => root.style.setProperty("--c-" + k, hexToRgb(v)));
  };

  /* ---------- analítica (Meta Pixel / Google Analytics) ---------- */
  VB.analytics = (cfg) => {
    cfg = cfg || {};
    if (cfg.metaPixelId) {
      /* eslint-disable */
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
      /* eslint-enable */
      window.fbq("init", cfg.metaPixelId);
      window.fbq("track", "PageView");
    }
    if (cfg.googleAnalyticsId) {
      const s = document.createElement("script");
      s.async = true;
      s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(cfg.googleAnalyticsId);
      document.head.appendChild(s);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag("js", new Date());
      window.gtag("config", cfg.googleAnalyticsId);
    }
  };

  VB.track = (evento, datos) => {
    try {
      if (window.fbq) {
        if (evento === "whatsapp_click") window.fbq("track", "Contact", datos || {});
        else window.fbq("trackCustom", evento, datos || {});
      }
      if (window.gtag) window.gtag("event", evento, datos || {});
    } catch (e) { /* la analítica nunca debe romper la página */ }
  };

  /* ---------- estilos del chat (look de WhatsApp) ---------- */
  const css = `
  .vbchat{--wa-bg:#0B141A;--wa-head:#1F2C34;--wa-in:#1F2C34;--wa-out:#005C4B;--wa-text:#E9EDEF;--wa-sub:#8696A0;--wa-chip:#0B141A;--wa-chip-b:#2A3942;--wa-chip-t:#53BDEB;--wa-doodle:rgba(255,255,255,.035)}
  .vbchat.vb-claro{--wa-bg:#EFEAE2;--wa-head:#008069;--wa-in:#FFFFFF;--wa-out:#D9FDD3;--wa-text:#111B21;--wa-sub:#667781;--wa-chip:#FFFFFF;--wa-chip-b:#D1D7DB;--wa-chip-t:#008069;--wa-doodle:rgba(0,0,0,.035)}
  .vbchat .vb-body{background-color:var(--wa-bg);background-image:radial-gradient(var(--wa-doodle) 1.2px,transparent 1.2px);background-size:18px 18px}
  .vbchat .vb-b{max-width:82%;padding:6px 9px 8px;border-radius:8px;font-size:14.5px;line-height:1.38;color:var(--wa-text);box-shadow:0 1px .5px rgba(0,0,0,.13);position:relative;word-wrap:break-word;white-space:pre-line}
  .vbchat .vb-in{background:var(--wa-in);align-self:flex-start;border-top-left-radius:0}
  .vbchat .vb-out{background:var(--wa-out);align-self:flex-end;border-top-right-radius:0}
  .vbchat .vb-t{display:block;text-align:right;font-size:11px;color:var(--wa-sub);margin-top:2px;margin-bottom:-3px}
  .vbchat.vb-claro .vb-out .vb-t{color:#667781}
  .vbchat .vb-head{background:var(--wa-head);color:#fff}
  .vbchat .vb-head .vb-sub{color:rgba(255,255,255,.72)}
  .vbchat .vb-chip{background:var(--wa-chip);border:1px solid var(--wa-chip-b);color:var(--wa-chip-t);border-radius:999px;padding:8px 14px;font-size:14px;font-weight:500;transition:background .15s,transform .1s}
  .vbchat .vb-chip:hover{filter:brightness(1.15)}
  .vbchat .vb-chip:active{transform:scale(.97)}
  .vbchat .vb-foot{background:var(--wa-head)}
  .vbchat.vb-claro .vb-foot{background:#F0F2F5}
  .vbchat .vb-input{background:var(--wa-chip);color:var(--wa-text);border:1px solid var(--wa-chip-b)}
  .vbchat .vb-typing{display:inline-flex;gap:4px;padding:12px 12px}
  .vbchat .vb-typing i{width:7px;height:7px;border-radius:50%;background:var(--wa-sub);animation:vbdot 1.1s infinite}
  .vbchat .vb-typing i:nth-child(2){animation-delay:.15s}.vbchat .vb-typing i:nth-child(3){animation-delay:.3s}
  @keyframes vbdot{0%,60%,100%{opacity:.35;transform:translateY(0)}30%{opacity:1;transform:translateY(-3px)}}
  .vb-pop{animation:vbpop .22s ease-out both}
  @keyframes vbpop{from{opacity:0;transform:translateY(6px) scale(.98)}to{opacity:1;transform:none}}
  .vb-panel{transform-origin:bottom right;transition:opacity .2s ease,transform .2s ease}
  .vb-panel[data-open="false"]{opacity:0;transform:translateY(12px) scale(.98);pointer-events:none;visibility:hidden}
  .vb-panel[data-open="true"]{opacity:1;transform:none;visibility:visible}
  @media (prefers-reduced-motion: reduce){.vb-pop,.vbchat .vb-typing i{animation:none}.vb-panel{transition:none}}
  `;
  const injectCSS = () => {
    if (document.getElementById("vb-chat-css")) return;
    const st = document.createElement("style");
    st.id = "vb-chat-css";
    st.textContent = css;
    document.head.appendChild(st);
  };

  const now = () => {
    const d = new Date();
    let h = d.getHours(); const m = String(d.getMinutes()).padStart(2, "0");
    const suf = h >= 12 ? "p.m." : "a.m."; h = h % 12 || 12;
    return h + ":" + m + " " + suf;
  };
  const wait = (ms) => new Promise((r) => setTimeout(r, reduceMotion ? 0 : ms));
  const bubble = (texto, de, hora) => {
    const el = document.createElement("div");
    el.className = "vb-b vb-pop " + (de === "bot" ? "vb-in" : "vb-out");
    el.innerHTML = VB.esc(texto) + '<span class="vb-t">' + VB.esc(hora || now()) + (de === "bot" ? "" : " ✓✓") + "</span>";
    return el;
  };
  const typingEl = () => {
    const el = document.createElement("div");
    el.className = "vb-b vb-in vb-pop";
    el.style.padding = "0";
    el.innerHTML = '<span class="vb-typing" aria-label="escribiendo"><i></i><i></i><i></i></span>';
    return el;
  };

  /* ---------- chat de ejemplo que se reproduce solo (hero) ---------- */
  // contenedor: elemento .vb-body vacío. mensajes: [{de, texto, hora}]
  VB.playChat = async (contenedor, mensajes, opciones) => {
    injectCSS();
    opciones = opciones || {};
    const estado = opciones.estadoEl;
    for (const m of mensajes || []) {
      if (m.de === "bot") {
        if (estado) estado.textContent = "escribiendo…";
        const t = typingEl(); contenedor.appendChild(t);
        await wait(Math.min(1700, 500 + m.texto.length * 18));
        t.remove();
        if (estado) estado.textContent = opciones.estadoTexto || "en línea";
      } else {
        await wait(900);
      }
      contenedor.appendChild(bubble(m.texto, m.de, m.hora));
      contenedor.scrollTop = contenedor.scrollHeight;
    }
    if (opciones.alTerminar) opciones.alTerminar();
  };

  /* ---------- simulador interactivo (widget flotante) ---------- */
  VB.Bot = function (cfg, numeroWA) {
    if (!cfg || !cfg.activo) return null;
    injectCSS();
    const tema = cfg.tema === "claro" ? "vb-claro" : "";
    // Variables iniciales que el guion puede usar como {negocio}, {direccion}...
    const base = Object.assign({}, cfg.variables || {});
    const vars = Object.assign({}, base);
    let ocupado = false;

    // Botón flotante
    const launcher = document.createElement("button");
    launcher.type = "button";
    launcher.className = "fixed z-[60] bottom-4 right-4 sm:bottom-6 sm:right-6 flex items-center gap-2 rounded-full bg-[#25D366] text-[#06331a] font-semibold shadow-[0_10px_30px_-8px_rgba(37,211,102,.6)] pl-4 pr-5 h-14 hover:brightness-105 active:scale-[.98] transition focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40";
    launcher.setAttribute("aria-haspopup", "dialog");
    launcher.setAttribute("aria-expanded", "false");
    launcher.innerHTML = '<i data-lucide="message-circle" class="w-6 h-6"></i><span class="text-[15px]">' + VB.esc(cfg.textoBoton || "Probar asistente") + "</span>";

    // Panel
    const panel = document.createElement("section");
    panel.className = "vb-panel vbchat " + tema + " fixed z-[70] inset-0 sm:inset-auto sm:bottom-24 sm:right-6 sm:w-[380px] sm:h-[620px] sm:max-h-[calc(100dvh-8rem)] flex flex-col sm:rounded-2xl overflow-hidden shadow-2xl";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-label", cfg.nombre || "Asistente");
    panel.dataset.open = "false";
    panel.innerHTML =
      '<header class="vb-head flex items-center gap-3 px-3 py-2.5 pt-[max(.625rem,env(safe-area-inset-top))]">' +
        '<button type="button" data-vb="cerrar" class="p-1.5 rounded-full hover:bg-white/10" aria-label="Cerrar"><i data-lucide="arrow-left" class="w-5 h-5"></i></button>' +
        (cfg.avatar
          ? '<img src="' + VB.esc(cfg.avatar) + '" alt="" class="w-9 h-9 rounded-full object-contain p-1.5" style="background:' + VB.esc(cfg.avatarFondo || "#000") + '">'
          : '<div class="w-9 h-9 rounded-full grid place-items-center bg-white/20"><i data-lucide="' + VB.esc(cfg.avatarIcono || "bot") + '" class="w-5 h-5"></i></div>') +
        '<div class="flex-1 min-w-0"><p class="font-semibold text-[15px] leading-tight truncate">' + VB.esc(cfg.nombre) + '</p><p class="vb-sub text-xs leading-tight" data-vb="estado">' + VB.esc(cfg.estado || "en línea") + "</p></div>" +
        '<button type="button" data-vb="reiniciar" class="p-2 rounded-full hover:bg-white/10" aria-label="Reiniciar conversación"><i data-lucide="rotate-ccw" class="w-[18px] h-[18px]"></i></button>' +
      "</header>" +
      '<div class="vb-body flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-1.5" data-vb="body" aria-live="polite"></div>' +
      '<div class="vb-foot px-3 pt-2.5 pb-[max(.75rem,env(safe-area-inset-bottom))]">' +
        '<div data-vb="acciones" class="flex flex-wrap gap-2 justify-end min-h-[2.5rem]"></div>' +
        '<p class="text-[11px] mt-2 text-center" style="color:var(--wa-sub)">' + VB.esc(cfg.aviso || "Simulación de demostración") + "</p>" +
      "</div>";

    document.body.appendChild(launcher);
    document.body.appendChild(panel);

    const $ = (sel) => panel.querySelector('[data-vb="' + sel + '"]');
    const body = $("body"), acciones = $("acciones"), estado = $("estado");

    const scroll = () => { body.scrollTop = body.scrollHeight; };
    const limpiarAcciones = () => { acciones.innerHTML = ""; };

    const decir = async (texto) => {
      estado.textContent = "escribiendo…";
      const t = typingEl(); body.appendChild(t); scroll();
      await wait(Math.min(1500, 450 + texto.length * 14));
      t.remove();
      estado.textContent = cfg.estado || "en línea";
      body.appendChild(bubble(texto, "bot")); scroll();
    };

    const responder = (texto) => { body.appendChild(bubble(texto, "cliente")); scroll(); };

    const ir = async (id) => {
      const paso = cfg.pasos && cfg.pasos[id];
      if (!paso) return;
      ocupado = true;
      limpiarAcciones();
      for (const m of paso.mensajes || []) await decir(VB.fill(m, vars));
      ocupado = false;
      mostrarAcciones(paso);
    };

    const chip = (texto, onClick, extra) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "vb-chip vb-pop " + (extra || "");
      b.textContent = texto;
      b.addEventListener("click", onClick);
      return b;
    };

    const mostrarAcciones = (paso) => {
      limpiarAcciones();
      (paso.opciones || []).forEach((op) => {
        acciones.appendChild(chip(op.texto, () => {
          if (ocupado) return;
          if (op.url) {
            const url = VB.fill(op.url, vars);
            VB.track("bot_link", { url: url });
            if (/^https?:/i.test(url)) window.open(url, "_blank", "noopener");
            else window.location.href = url;
            return;
          }
          responder(op.texto);
          if (op.guardar) vars[op.guardar] = op.valor || op.texto;
          VB.track("bot_opcion", { opcion: op.texto });
          ir(op.ir);
        }));
      });

      if (paso.entrada) {
        const f = document.createElement("form");
        f.className = "flex w-full gap-2 vb-pop";
        f.innerHTML =
          '<input class="vb-input flex-1 rounded-full px-4 h-11 text-[15px] outline-none focus:ring-2 focus:ring-[#25D366]/50" maxlength="80" required placeholder="' + VB.esc(paso.entrada.placeholder || "Escribe aquí") + '" aria-label="' + VB.esc(paso.entrada.placeholder || "Tu respuesta") + '">' +
          '<button class="w-11 h-11 rounded-full bg-[#00A884] text-white grid place-items-center shrink-0" aria-label="Enviar"><i data-lucide="send-horizontal" class="w-5 h-5"></i></button>';
        f.addEventListener("submit", (e) => {
          e.preventDefault();
          const v = f.querySelector("input").value.trim();
          if (!v || ocupado) return;
          vars[paso.entrada.guardar] = v;
          responder(v);
          ir(paso.entrada.ir);
        });
        acciones.appendChild(f);
        setTimeout(() => f.querySelector("input").focus({ preventScroll: true }), 50);
      }

      if (paso.final) {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "vb-pop w-full h-12 rounded-full bg-[#25D366] text-[#06331a] font-semibold flex items-center justify-center gap-2";
        b.innerHTML = '<i data-lucide="message-circle" class="w-5 h-5"></i>' + VB.esc(paso.final.boton || "Continuar en WhatsApp");
        b.addEventListener("click", () => VB.openWA(numeroWA, VB.fill(paso.final.mensaje, vars), "bot"));
        acciones.appendChild(b);
        acciones.appendChild(chip("Empezar de nuevo", reiniciar, "mx-auto"));
      }
      VB.icons();
      const primero = acciones.querySelector("button, input");
      if (primero && primero.tagName === "BUTTON" && panel.dataset.open === "true" && !paso.entrada) primero.focus({ preventScroll: true });
      scroll();
    };

    let iniciado = false;
    const reiniciar = () => {
      if (ocupado) return;
      Object.keys(vars).forEach((k) => delete vars[k]);
      Object.assign(vars, base);
      body.innerHTML = "";
      ir(cfg.pasoInicial || "inicio");
    };

    const abrir = () => {
      panel.dataset.open = "true";
      launcher.setAttribute("aria-expanded", "true");
      launcher.classList.add("max-sm:hidden");
      if (window.innerWidth < 640) document.documentElement.style.overflow = "hidden";
      VB.track("bot_abierto", {});
      if (!iniciado) { iniciado = true; ir(cfg.pasoInicial || "inicio"); }
      setTimeout(() => $("cerrar").focus({ preventScroll: true }), 60);
    };
    const cerrar = () => {
      panel.dataset.open = "false";
      launcher.setAttribute("aria-expanded", "false");
      launcher.classList.remove("max-sm:hidden");
      document.documentElement.style.overflow = "";
      launcher.focus({ preventScroll: true });
    };
    const alternar = () => (panel.dataset.open === "true" ? cerrar() : abrir());

    launcher.addEventListener("click", alternar);
    $("cerrar").addEventListener("click", cerrar);
    $("reiniciar").addEventListener("click", reiniciar);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && panel.dataset.open === "true") cerrar(); });

    // Cualquier elemento con data-abrir-bot abre el simulador
    document.addEventListener("click", (e) => {
      const t = e.target.closest("[data-abrir-bot]");
      if (t) { e.preventDefault(); abrir(); }
    });

    VB.icons();
    if (cfg.abrirSolo) setTimeout(abrir, 1200);
    return { abrir, cerrar };
  };

  VB.injectCSS = injectCSS;
  window.VB = VB;
})();
