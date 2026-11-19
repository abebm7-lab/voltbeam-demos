/* =====================================================================
   PLANTILLA: TALLER MECÁNICO · CONFIGURACIÓN
   ---------------------------------------------------------------------
   Todo lo editable está aquí. Ver GUIA-EDICION.md en la raíz.
   - activo: true/false  -> muestra u oculta la sección
   - "orden"             -> orden de la página
   - modoDemo: true      -> barra "Demo VoltBeam" visible y folios de
                            ejemplo en "Estado de tu auto".
                            PONLO EN false AL ENTREGAR AL CLIENTE.
   ===================================================================== */

window.SITE_CONFIG = {

  modoDemo: true,

  /* ---------------------------------------------------------------
     1. DATOS DEL TALLER
     --------------------------------------------------------------- */
  negocio: {
    nombre: "MotorLab",
    ciudad: "León",
    lema: "Servicio automotriz",
    direccion: "Blvd. Aeropuerto, León, Gto.",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Blvd+Aeropuerto+Le%C3%B3n+Guanajuato",
    telefono: "",                      // opcional, para "Llamar"
    horario: [
      { dias: "Lunes a viernes", horas: "8:30 a.m. a 7:00 p.m." },
      { dias: "Sábado",          horas: "9:00 a.m. a 2:00 p.m." }
    ],
    horarioCorto: "lunes a viernes de 8:30 a 7, sábados de 9 a 2"
  },

  /* ---------------------------------------------------------------
     2. COLORES (HEX)
     --------------------------------------------------------------- */
  colores: {
    fondo:       "#ECEEF0",  // gris concreto
    superficie:  "#FFFFFF",
    linea:       "#C9CED4",
    acento:      "#FF5B14",  // naranja de seguridad
    acentoSuave: "#FFE7DB",
    texto:       "#15181C",  // grafito
    textoSuave:  "#5B636C"
  },

  /* ---------------------------------------------------------------
     3. WHATSAPP (en la demo apunta a VoltBeam)
     --------------------------------------------------------------- */
  contacto: {
    whatsapp: "524761900495",
    mensajes: {
      general: "Hola, quiero información de servicio para mi auto.",
      grua: "Hola, necesito una grúa. Mi auto está en: (escribe tu ubicación)",
      cotizacion: "Hola, quiero cotizar servicio para mi {vehiculo}.\nServicios:\n{servicios}\nEstimado de la página: {rango}\n¿Qué día puedo llevarlo?",
      diagnostico: "Hola, mi {vehiculo} tiene este síntoma: {sintoma}. Quiero agendar un diagnóstico.",
      mantenimiento: "Hola, mi auto lleva {km} km y le toca servicio pronto. Quiero agendar cambio de aceite.",
      seguimiento: "Hola, quiero saber el estado de mi auto, folio {folio}."
    }
  },

  analitica: { metaPixelId: "", googleAnalyticsId: "" },

  orden: ["hero", "cotizador", "sintomas", "mantenimiento", "seguimiento", "servicios", "garantia", "ubicacion"],

  secciones: {

    avisoDemo: {
      numero: "524761900495",
      texto: "Esta es una demo creada por VoltBeam.",
      enlaceTexto: "Quiero una así",
      mensaje: "Hola VoltBeam, vi la demo del taller mecánico y quiero algo así para mi negocio."
    },

    hero: {
      activo: true,
      titulo: "Sabes cuánto cuesta antes de dejar tu auto.",
      subtitulo: "Cotiza en línea, revisa qué puede tener tu auto por el síntoma y sigue tu reparación desde el celular.",
      // Accesos rápidos (ancla = sección de la página)
      accesos: [
        { icono: "calculator",     titulo: "Cotizar servicio",        texto: "Precio estimado al momento",   ancla: "#cotizador" },
        { icono: "stethoscope",    titulo: "¿Qué tiene mi auto?",     texto: "Elige el síntoma",             ancla: "#sintomas" },
        { icono: "gauge",          titulo: "¿Cuándo toca servicio?",  texto: "Con tu kilometraje",           ancla: "#mantenimiento" },
        { icono: "clipboard-list", titulo: "Estado de mi auto",       texto: "Con tu número de folio",       ancla: "#seguimiento" }
      ],
      botonGrua: "Necesito grúa"
    },

    /* ---------- COTIZADOR ---------- */
    cotizador: {
      activo: true,
      titulo: "Cotizador",
      subtitulo: "Rangos de referencia en pesos, con mano de obra. El precio final se confirma al revisar el auto.",
      tipos: [
        // factor multiplica el precio base según el tamaño del vehículo
        { nombre: "Compacto o sedán", icono: "car",           factor: 1 },
        { nombre: "SUV o crossover",  icono: "car-front",     factor: 1.25 },
        { nombre: "Pickup o van",     icono: "truck",         factor: 1.4 }
      ],
      // PRECIOS DE EJEMPLO: cámbialos por los del taller (min y max por servicio)
      servicios: [
        { nombre: "Cambio de aceite y filtro",     min: 650,  max: 1100 },
        { nombre: "Afinación mayor",               min: 1400, max: 2600 },
        { nombre: "Frenos delanteros (balatas)",   min: 900,  max: 1700 },
        { nombre: "Alineación y balanceo",         min: 450,  max: 700  },
        { nombre: "Revisión de suspensión",        min: 350,  max: 600  },
        { nombre: "Carga de gas del aire acondicionado", min: 700, max: 1200 },
        { nombre: "Diagnóstico por computadora",   min: 350,  max: 500  }
      ],
      boton: "Mandar cotización y agendar"
    },

    /* ---------- DIAGNÓSTICO POR SÍNTOMA ---------- */
    sintomas: {
      activo: true,
      titulo: "¿Qué le pasa a tu auto?",
      subtitulo: "Elige lo que notas. Te decimos las causas más comunes y qué tan urgente es revisarlo.",
      aviso: "Orientación general, no sustituye la revisión de un mecánico.",
      // urgencia: "alta" | "media" | "baja"
      lista: [
        { icono: "disc",            nombre: "Rechina o vibra al frenar",  urgencia: "alta",  causas: ["Balatas gastadas", "Discos dañados o deformados", "Falta de líquido de frenos"], recomendacion: "Revisión de frenos lo antes posible. No dejes pasar los días." },
        { icono: "thermometer",     nombre: "Se calienta",                urgencia: "alta",  causas: ["Fuga o falta de anticongelante", "Termostato atorado", "Falla del ventilador o la bomba de agua"], recomendacion: "Detente en un lugar seguro y apaga el motor. Seguir manejando caliente puede dañar el motor; pide grúa si sube la temperatura." },
        { icono: "triangle-alert",  nombre: "Se prendió el check engine", urgencia: "media", causas: ["Sensor de oxígeno o de flujo de aire", "Tapón de gasolina mal cerrado", "Falla de bujías o bobinas"], recomendacion: "Diagnóstico por computadora para leer el código. Si la luz parpadea, reduce la velocidad y llévalo cuanto antes." },
        { icono: "activity",        nombre: "Jalonea o pierde fuerza",    urgencia: "media", causas: ["Bujías o cables desgastados", "Inyectores sucios", "Filtro de gasolina tapado"], recomendacion: "Afinación y diagnóstico. Suele resolverse sin piezas caras si se atiende pronto." },
        { icono: "volume-2",        nombre: "Ruido en la suspensión",     urgencia: "media", causas: ["Bujes o rótulas gastadas", "Amortiguadores vencidos", "Tornillería floja"], recomendacion: "Revisión de suspensión. Afecta el frenado y el desgaste de llantas." },
        { icono: "snowflake",       nombre: "El clima no enfría",         urgencia: "baja",  causas: ["Falta de gas refrigerante", "Fuga en mangueras", "Falla del compresor"], recomendacion: "Revisión de aire acondicionado con prueba de fugas." }
      ],
      boton: "Agendar diagnóstico"
    },

    /* ---------- MANTENIMIENTO ---------- */
    mantenimiento: {
      activo: true,
      titulo: "¿Cuándo te toca servicio?",
      subtitulo: "Pon tu kilometraje y te decimos cuánto falta para el cambio de aceite.",
      aceites: [
        { nombre: "Convencional", intervalo: 5000 },
        { nombre: "Sintético",    intervalo: 10000 }
      ],
      boton: "Agendar mi servicio"
    },

    /* ---------- SEGUIMIENTO DE ORDEN ---------- */
    seguimiento: {
      activo: true,
      titulo: "Estado de tu auto",
      subtitulo: "Escribe el folio de tu orden de servicio.",
      etapas: ["Recibido", "En diagnóstico", "En reparación", "Listo para entrega"],
      // Folios de ejemplo para la demo (en un cliente real esto se conecta
      // a su sistema; mientras tanto, apaga la sección con activo: false).
      ejemplos: [
        { folio: "ML-1024", vehiculo: "Nissan Versa 2019", etapa: 2, nota: "Cambio de balatas delanteras. Entrega estimada hoy 6:00 p.m." },
        { folio: "ML-1025", vehiculo: "Chevrolet Aveo 2017", etapa: 3, nota: "Afinación lista. Puedes pasar por tu auto." }
      ],
      boton: "Preguntar por WhatsApp"
    },

    /* ---------- TABLA DE SERVICIOS ---------- */
    servicios: {
      activo: true,
      titulo: "Servicios",
      lista: [
        { nombre: "Cambio de aceite",        tiempo: "45 min" },
        { nombre: "Afinación mayor",         tiempo: "3 a 4 h" },
        { nombre: "Frenos",                  tiempo: "2 a 3 h" },
        { nombre: "Alineación y balanceo",   tiempo: "1 h" },
        { nombre: "Suspensión",              tiempo: "Según revisión" },
        { nombre: "Aire acondicionado",      tiempo: "1 a 2 h" },
        { nombre: "Diagnóstico por computadora", tiempo: "30 min" },
        { nombre: "Sistema eléctrico",       tiempo: "Según revisión" }
      ]
    },

    /* ---------- GARANTÍA / CONFIANZA ---------- */
    garantia: {
      activo: true,
      titulo: "Cómo trabajamos",
      puntos: [
        { icono: "camera",         titulo: "Te mandamos fotos",           texto: "Ves por WhatsApp la pieza dañada antes de autorizar cualquier reparación." },
        { icono: "file-check",     titulo: "Nada sin tu autorización",    texto: "Si aparece algo extra, te avisamos y tú decides." },
        { icono: "shield-check",   titulo: "Garantía por escrito",        texto: "Cada reparación sale con su garantía en la orden de servicio." },
        { icono: "recycle",        titulo: "Te devolvemos las piezas",    texto: "Si quieres, te entregamos las piezas que cambiamos." }
      ]
    },

    ubicacion: {
      activo: true,
      titulo: "Ven al taller",
      botonMaps: "Cómo llegar"
    }
  },

  /* ---------------------------------------------------------------
     4. ASISTENTE DE WHATSAPP (simulador)
     Variables automáticas: {negocio}, {direccion}, {horario}, {mapsUrl}
     --------------------------------------------------------------- */
  bot: {
    activo: true,
    tema: "oscuro",
    nombre: "MotorLab León",
    estado: "en línea",
    avatar: "",
    avatarIcono: "wrench",
    textoBoton: "Chatea con el taller",
    aviso: "Demo: así respondería el asistente de tu taller.",
    pasoInicial: "inicio",
    pasos: {
      inicio: {
        mensajes: ["¡Hola! 🔧 Soy el asistente de {negocio}.", "¿Qué necesitas para tu auto?"],
        opciones: [
          { texto: "Cotizar un servicio",  ir: "vehiculo" },
          { texto: "Mi auto hace algo raro", ir: "raro" },
          { texto: "Necesito grúa 🚨",      ir: "grua" },
          { texto: "Horario y ubicación",  ir: "horario" }
        ]
      },
      vehiculo: {
        mensajes: ["Va. ¿Qué tipo de vehículo es?"],
        opciones: [
          { texto: "Compacto o sedán", ir: "servicio", guardar: "vehiculo" },
          { texto: "SUV",              ir: "servicio", guardar: "vehiculo" },
          { texto: "Pickup o van",     ir: "servicio", guardar: "vehiculo" }
        ]
      },
      servicio: {
        mensajes: ["¿Qué servicio buscas?"],
        opciones: [
          { texto: "Cambio de aceite", ir: "precio", guardar: "servicio", valor: "cambio de aceite" },
          { texto: "Frenos",           ir: "precio", guardar: "servicio", valor: "frenos" },
          { texto: "Afinación",        ir: "precio", guardar: "servicio", valor: "afinación" },
          { texto: "Otro",             ir: "precio", guardar: "servicio", valor: "revisión general" }
        ]
      },
      precio: {
        mensajes: [
          "Para {servicio} en {vehiculo} te puedo dar un estimado al momento en el cotizador de la página, o te agendo y lo confirmamos al ver el auto.",
          "La revisión no te compromete a nada: antes de cualquier trabajo te mandamos fotos y el precio."
        ],
        opciones: [
          { texto: "Abrir el cotizador", url: "#cotizador" },
          { texto: "Agendar revisión",   ir: "dia" }
        ]
      },
      raro: {
        mensajes: ["Cuéntame, ¿qué notas?"],
        opciones: [
          { texto: "Rechina al frenar", ir: "raroFrenos" },
          { texto: "Se calienta",       ir: "raroCalor" },
          { texto: "Check engine",      ir: "raroCheck" },
          { texto: "Otra cosa",         url: "#sintomas" }
        ]
      },
      raroFrenos: {
        mensajes: ["Eso suele ser balatas gastadas ⚠️ Conviene revisarlo pronto, porque si llega al disco la reparación sale más cara."],
        opciones: [{ texto: "Agendar revisión", ir: "dia", guardar: "servicio", valor: "revisión de frenos" }]
      },
      raroCalor: {
        mensajes: ["🚨 Si la aguja sube, orilla el auto en un lugar seguro y apaga el motor. Manejar caliente puede dañar el motor.", "¿Te mandamos grúa o puedes traerlo?"],
        opciones: [
          { texto: "Necesito grúa", ir: "grua" },
          { texto: "Puedo llevarlo", ir: "dia", guardar: "servicio", valor: "revisión de sobrecalentamiento" }
        ]
      },
      raroCheck: {
        mensajes: ["Lo primero es leer el código con escáner (unos 30 min). Si la luz parpadea, maneja despacio y tráelo cuanto antes."],
        opciones: [{ texto: "Agendar diagnóstico", ir: "dia", guardar: "servicio", valor: "diagnóstico por computadora" }]
      },
      dia: {
        mensajes: ["¿Qué día puedes traerlo?"],
        opciones: [
          { texto: "Hoy",         ir: "nombre", guardar: "dia", valor: "hoy" },
          { texto: "Mañana",      ir: "nombre", guardar: "dia", valor: "mañana" },
          { texto: "Esta semana", ir: "nombre", guardar: "dia", valor: "esta semana" },
          { texto: "Sábado",      ir: "nombre", guardar: "dia", valor: "el sábado" }
        ]
      },
      nombre: {
        mensajes: ["¿A nombre de quién y qué auto es? (marca, modelo y año)"],
        entrada: { guardar: "nombre", placeholder: "Ej. Carlos, Versa 2019", ir: "cierre" }
      },
      cierre: {
        mensajes: ["Listo ✅ Te esperamos {dia}. Confirma con el botón y te apartamos lugar en el taller."],
        final: {
          boton: "Confirmar por WhatsApp",
          mensaje: "Hola, soy {nombre}. Quiero agendar {servicio} para {dia}."
        }
      },
      grua: {
        mensajes: ["Te ayudamos 🚨 Mándanos tu ubicación por WhatsApp y te decimos en cuánto llega la grúa."],
        final: {
          boton: "Pedir grúa por WhatsApp",
          mensaje: "Hola, necesito una grúa. Te mando mi ubicación."
        }
      },
      horario: {
        mensajes: ["📍 {direccion}", "🕘 Atendemos {horario}."],
        opciones: [
          { texto: "Abrir en Google Maps", url: "{mapsUrl}" },
          { texto: "Agendar servicio", ir: "vehiculo" },
          { texto: "Otra cosa", ir: "inicio" }
        ]
      }
    }
  }
};
