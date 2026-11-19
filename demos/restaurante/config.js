/* =====================================================================
   PLANTILLA: RESTAURANTE · CONFIGURACIÓN
   ---------------------------------------------------------------------
   Todo lo editable está aquí. Ver GUIA-EDICION.md en la raíz.
   - activo: true/false  -> muestra u oculta la sección
   - "orden"             -> orden de la página
   - modoDemo: true      -> barra "Demo VoltBeam" visible.
                            PONLO EN false AL ENTREGAR AL CLIENTE.
   ===================================================================== */

window.SITE_CONFIG = {

  modoDemo: true,

  /* ---------------------------------------------------------------
     1. DATOS DEL NEGOCIO
     --------------------------------------------------------------- */
  negocio: {
    nombre: "Comal 47",
    lema: "Cocina de barrio, hecha al momento.",
    tipo: "Antojitos y comida mexicana",
    direccion: "Zona Centro, León, Gto.",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Zona+Centro+Le%C3%B3n+Guanajuato",
    telefono: "",              // opcional, para "Llamar"

    // Horario para calcular "Abierto ahora".
    // dia: 0=domingo, 1=lunes ... 6=sábado. Formato 24 h "HH:MM".
    // Si un día no está en la lista, se muestra como cerrado.
    horario: [
      { dia: 1, abre: "13:00", cierra: "22:00" },
      { dia: 2, abre: "13:00", cierra: "22:00" },
      { dia: 3, abre: "13:00", cierra: "22:00" },
      { dia: 4, abre: "13:00", cierra: "23:00" },
      { dia: 5, abre: "13:00", cierra: "23:59" },
      { dia: 6, abre: "09:00", cierra: "23:59" },
      { dia: 0, abre: "09:00", cierra: "18:00" }
    ]
  },

  /* ---------------------------------------------------------------
     2. COLORES (HEX)
     --------------------------------------------------------------- */
  colores: {
    fondo:       "#FFFFFF",
    superficie:  "#F6F3FA",  // bloques suaves (lila muy claro)
    linea:       "#E6E0EC",
    acento:      "#D6006F",  // rosa mexicano
    acentoSuave: "#FFC83D",  // mostaza (etiquetas, promo)
    texto:       "#1B1320",
    textoSuave:  "#6B5F72"
  },

  /* ---------------------------------------------------------------
     3. WHATSAPP (en la demo apunta a VoltBeam)
     --------------------------------------------------------------- */
  contacto: {
    whatsapp: "524761900495",
    mensajes: {
      general: "Hola, quiero información de {negocio}.",
      reservacion: "Hola, quiero reservar mesa para {personas} personas el {fecha}, {hora}, a nombre de {nombre}. {nota}",
      // El pedido se arma solo con lo que hay en el carrito
      pedidoInicio: "Hola, quiero hacer un pedido:"
    }
  },

  analitica: { metaPixelId: "", googleAnalyticsId: "" },

  orden: ["hero", "promos", "menu", "reservar", "ubicacion", "ctaFinal"],

  secciones: {

    avisoDemo: {
      numero: "524761900495",
      texto: "Esta es una demo creada por VoltBeam.",
      enlaceTexto: "Quiero una así",
      mensaje: "Hola VoltBeam, vi la demo del restaurante y quiero algo así para mi negocio."
    },

    hero: {
      activo: true,
      titulo: "Pide tus antojos en dos toques.",
      subtitulo: "Arma tu pedido aquí y nos llega directo por WhatsApp. Sin apps, sin comisiones, sin esperar a que contestemos.",
      botonMenu: "Ver el menú",
      botonReservar: "Reservar mesa"
    },

    /* ---------- PROMO DEL DÍA (cambia sola) ---------- */
    promos: {
      activo: true,
      titulo: "Cada día tiene lo suyo",
      // 0=domingo ... 6=sábado. Vacío = sin promo ese día.
      porDia: {
        0: "Domingo familiar: refresco de 2 L gratis en pedidos de más de $400",
        1: "Lunes de chilaquiles: con huevo a $79",
        2: "Martes de tacos: 3x2 en pastor",
        3: "Miércoles de pozole: 2x1 en tostadas",
        4: "Jueves de gringas: la segunda a mitad de precio",
        5: "Viernes: agua fresca de litro a $29",
        6: "Sábado: menudo y birria desde las 9 a.m."
      }
    },

    /* ---------- MENÚ CON CARRITO ---------- */
    menu: {
      activo: true,
      titulo: "Menú",
      nota: "Precios en pesos, IVA incluido.",
      // Etiquetas disponibles: "Favorito", "Picante", "Vegetariano", "Nuevo"
      categorias: [
        {
          nombre: "Tacos",
          platillos: [
            { nombre: "Pastor",           descripcion: "Con piña, cebolla y cilantro. Tortilla de maíz.", precio: 22, etiqueta: "Favorito" },
            { nombre: "Suadero",          descripcion: "Jugoso, del trompo de cobre.",                   precio: 24 },
            { nombre: "Campechano",       descripcion: "Suadero con longaniza.",                         precio: 26 },
            { nombre: "Gringa de pastor", descripcion: "Tortilla de harina, queso gratinado y pastor.",  precio: 65 },
            { nombre: "Taco de nopal",    descripcion: "Nopal asado, queso fresco y salsa verde.",       precio: 22, etiqueta: "Vegetariano" }
          ]
        },
        {
          nombre: "Platos fuertes",
          platillos: [
            { nombre: "Enchiladas mineras",   descripcion: "Con papa, zanahoria y queso. Receta guanajuatense.", precio: 105, etiqueta: "Favorito" },
            { nombre: "Chilaquiles rojos",    descripcion: "Con crema, queso y cebolla. Agrega pollo o huevo.",  precio: 89 },
            { nombre: "Guacamole al molcajete", descripcion: "Para compartir, con totopos recién hechos.",      precio: 95, etiqueta: "Vegetariano" },
            { nombre: "Birria de res",        descripcion: "Con consomé, cebolla, cilantro y tortillas.",       precio: 135, etiqueta: "Picante" }
          ]
        },
        {
          nombre: "Bebidas",
          platillos: [
            { nombre: "Agua de horchata",  descripcion: "Medio litro, preparada del día.", precio: 35 },
            { nombre: "Agua de jamaica",   descripcion: "Medio litro, poco dulce.",        precio: 35 },
            { nombre: "Refresco de vidrio",descripcion: "355 ml.",                          precio: 30 },
            { nombre: "Café de olla",      descripcion: "Con canela y piloncillo.",        precio: 32 }
          ]
        },
        {
          nombre: "Postres",
          platillos: [
            { nombre: "Flan napolitano",    descripcion: "Casero, con cajeta.",            precio: 45 },
            { nombre: "Churros con cajeta", descripcion: "Orden de 4, recién hechos.",     precio: 55, etiqueta: "Nuevo" }
          ]
        }
      ]
    },

    /* ---------- OPCIONES DEL PEDIDO ---------- */
    pedido: {
      tiposEntrega: ["Para recoger", "A domicilio"],
      notaDomicilio: "Envío en zona centro. El costo se confirma por WhatsApp.",
      minimoDomicilio: 150,       // 0 = sin mínimo
      boton: "Enviar pedido por WhatsApp"
    },

    /* ---------- RESERVACIONES ---------- */
    reservar: {
      activo: true,
      titulo: "Reserva tu mesa",
      subtitulo: "Para cumpleaños, comidas de trabajo o nomás porque sí.",
      maxPersonas: 20,
      horas: ["13:00", "14:00", "15:00", "16:00", "19:00", "20:00", "21:00"],
      boton: "Pedir reservación"
    },

    ubicacion: {
      activo: true,
      titulo: "Dónde estamos",
      botonMaps: "Cómo llegar"
    },

    ctaFinal: {
      activo: true,
      titulo: "¿Ya te dio hambre?",
      boton: "Armar mi pedido"
    }
  },

  /* ---------------------------------------------------------------
     4. ASISTENTE DE WHATSAPP (simulador)
     Variables automáticas: {negocio}, {direccion}, {horarioHoy}, {promoHoy}, {mapsUrl}
     --------------------------------------------------------------- */
  bot: {
    activo: true,
    tema: "claro",
    nombre: "Comal 47",
    estado: "en línea",
    avatar: "",
    avatarIcono: "utensils",
    textoBoton: "Pregúntanos",
    aviso: "Demo: así respondería el asistente de tu restaurante.",
    pasoInicial: "inicio",
    pasos: {
      inicio: {
        mensajes: ["¡Qué tal! 🌮 Bienvenido a {negocio}.", "¿Qué se te antoja hoy?"],
        opciones: [
          { texto: "Hacer un pedido",    ir: "pedido" },
          { texto: "Promo de hoy",       ir: "promo" },
          { texto: "Reservar mesa",      ir: "reservaPersonas" },
          { texto: "Horario y ubicación", ir: "horario" }
        ]
      },
      pedido: {
        mensajes: [
          "¡Va! Lo más rápido es armarlo en el menú: eliges, ajustas cantidades y me llega todo junto aquí.",
          "Hoy lo que más sale es el pastor y las enchiladas mineras 🔥"
        ],
        opciones: [
          { texto: "Abrir el menú", url: "#menu" },
          { texto: "Ver la promo de hoy", ir: "promo" }
        ]
      },
      promo: {
        mensajes: ["Hoy tenemos: {promoHoy} 🎉"],
        opciones: [
          { texto: "Quiero pedir", url: "#menu" },
          { texto: "Reservar mesa", ir: "reservaPersonas" },
          { texto: "Otra cosa", ir: "inicio" }
        ]
      },
      reservaPersonas: {
        mensajes: ["Con gusto te apartamos mesa. ¿Para cuántas personas?"],
        opciones: [
          { texto: "2",      ir: "reservaDia", guardar: "personas" },
          { texto: "3 a 4",  ir: "reservaDia", guardar: "personas" },
          { texto: "5 a 8",  ir: "reservaDia", guardar: "personas" },
          { texto: "Más de 8", ir: "reservaDia", guardar: "personas" }
        ]
      },
      reservaDia: {
        mensajes: ["¿Para cuándo?"],
        opciones: [
          { texto: "Hoy",            ir: "reservaHora", guardar: "dia", valor: "hoy" },
          { texto: "Mañana",         ir: "reservaHora", guardar: "dia", valor: "mañana" },
          { texto: "Este fin de semana", ir: "reservaHora", guardar: "dia", valor: "este fin de semana" }
        ]
      },
      reservaHora: {
        mensajes: ["¿A qué hora más o menos?"],
        opciones: [
          { texto: "Comida (1 a 4)", ir: "reservaNombre", guardar: "hora", valor: "comida" },
          { texto: "Cena (7 a 10)",  ir: "reservaNombre", guardar: "hora", valor: "cena" }
        ]
      },
      reservaNombre: {
        mensajes: ["¿A nombre de quién?"],
        entrada: { guardar: "nombre", placeholder: "Tu nombre", ir: "reservaCierre" }
      },
      reservaCierre: {
        mensajes: ["Listo, {nombre} 🙌 Mesa para {personas}, {dia} en la {hora}. Confírmala con el botón y te apartamos lugar."],
        final: {
          boton: "Confirmar reservación",
          mensaje: "Hola, soy {nombre}. Quiero reservar mesa para {personas} personas, {dia}, en horario de {hora}."
        }
      },
      horario: {
        mensajes: ["📍 {direccion}", "🕐 Hoy: {horarioHoy}."],
        opciones: [
          { texto: "Abrir en Google Maps", url: "{mapsUrl}" },
          { texto: "Hacer un pedido", ir: "pedido" },
          { texto: "Otra cosa", ir: "inicio" }
        ]
      }
    }
  }
};
