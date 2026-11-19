/* =====================================================================
   PLANTILLA: CONSULTORIO DENTAL · CONFIGURACIÓN
   ---------------------------------------------------------------------
   Para crear un cliente nuevo: copia esta carpeta completa, cambia lo
   que está entre comillas y los true/false. Ver GUIA-EDICION.md.

   - activo: true / false  -> muestra u oculta la sección
   - "orden"               -> cambia el orden de la página
   - modoDemo: true        -> muestra la barra "Demo de VoltBeam" y
                              marca testimonios como ejemplo.
                              PONLO EN false AL ENTREGAR AL CLIENTE.
   ===================================================================== */

window.SITE_CONFIG = {

  modoDemo: true,

  /* ---------------------------------------------------------------
     1. DATOS DEL NEGOCIO
     --------------------------------------------------------------- */
  negocio: {
    nombre: "Clínica Dental Alba",
    nombreCorto: "Dental Alba",
    giro: "Odontología general y estética",
    ciudad: "León, Gto.",
    direccion: "Col. Jardines del Moral, León, Gto.",
    // Link de Google Maps del negocio (búscalo en Maps > Compartir > Copiar enlace)
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Jardines+del+Moral+Le%C3%B3n+Guanajuato",
    horario: [
      { dias: "Lunes a viernes", horas: "9:00 a.m. a 8:00 p.m." },
      { dias: "Sábado",          horas: "9:00 a.m. a 2:00 p.m." }
    ],
    horarioCorto: "lunes a viernes de 9 a 8, sábados de 9 a 2",
    // Ícono que se usa como logo si no hay imagen (nombres en lucide.dev)
    logo: "",              // ej. "./logo.png"  (vacío = usa el ícono)
    logoIcono: "smile"
  },

  /* ---------------------------------------------------------------
     2. COLORES (HEX)
     --------------------------------------------------------------- */
  colores: {
    fondo:       "#F5F8F8",  // fondo general
    superficie:  "#FFFFFF",  // tarjetas
    linea:       "#DCE6E6",  // bordes
    acento:      "#0F7C7A",  // color principal (botones)
    acentoSuave: "#E2F1EF",  // fondos suaves del color principal
    texto:       "#0E2A2E",  // texto principal
    textoSuave:  "#55707A"   // texto secundario
  },

  /* ---------------------------------------------------------------
     3. WHATSAPP
     En la demo apunta a VoltBeam para recibir a los prospectos.
     AL ENTREGAR: pon el número del cliente.
     --------------------------------------------------------------- */
  contacto: {
    whatsapp: "524761900495",
    whatsappVisible: "476 190 0495",
    telefono: "",              // opcional, para el botón "Llamar"
    mensajes: {
      general: "Hola, quiero información sobre sus tratamientos.",
      cita:    "Hola, quiero agendar una cita de {tratamiento} para {dia}, en la {turno}.",
      tratamiento: "Hola, quiero información sobre {tratamiento}.",
      urgencia: "Hola, tengo una urgencia dental y necesito cita hoy."
    }
  },

  analitica: {
    metaPixelId: "",
    googleAnalyticsId: ""
  },

  /* ---------------------------------------------------------------
     4. ORDEN DE LAS SECCIONES
     --------------------------------------------------------------- */
  orden: [
    "hero",
    "confianza",
    "tratamientos",
    "porque",
    "doctora",
    "proceso",
    "testimonios",
    "faq",
    "ubicacion",
    "ctaFinal"
  ],

  secciones: {

    avisoDemo: {
      numero: "524761900495",   // WhatsApp de VoltBeam (no cambia)
      texto: "Esta es una demo creada por VoltBeam.",
      enlaceTexto: "Quiero una así",
      mensaje: "Hola VoltBeam, vi la demo del consultorio dental y quiero algo así para mi negocio."
    },

    menu: {
      activo: true,
      links: [
        { texto: "Tratamientos", ancla: "#tratamientos" },
        { texto: "Nosotros",     ancla: "#doctora" },
        { texto: "Ubicación",    ancla: "#ubicacion" }
      ],
      boton: "Agendar cita"
    },

    /* ---------- HERO con mini agenda ---------- */
    hero: {
      activo: true,
      titulo: "Una sonrisa sana, sin esperas ni sorpresas.",
      subtitulo: "Agenda tu valoración en un minuto por WhatsApp. Te decimos el costo antes de empezar cualquier tratamiento.",
      // Tarjeta de agenda: el paciente elige y se abre WhatsApp con su cita
      agenda: {
        titulo: "Agenda tu cita",
        tratamientos: ["Valoración general", "Limpieza dental", "Blanqueamiento", "Ortodoncia", "Resinas", "Otro"],
        dias: ["Hoy", "Mañana", "Esta semana", "Sábado"],
        turnos: ["Mañana", "Tarde"],
        boton: "Pedir cita por WhatsApp",
        nota: "Te confirmamos la hora exacta por WhatsApp."
      },
      botonUrgencia: "¿Dolor fuerte? Atención el mismo día"
    },

    /* ---------- FRANJA DE CONFIANZA ---------- */
    confianza: {
      activo: true,
      puntos: [
        { icono: "clock",        texto: "Urgencias el mismo día" },
        { icono: "credit-card",  texto: "Tarjeta y meses sin intereses" },
        { icono: "receipt-text", texto: "Presupuesto claro antes de empezar" },
        { icono: "car",          texto: "Estacionamiento" }
      ]
    },

    /* ---------- TRATAMIENTOS ---------- */
    tratamientos: {
      activo: true,
      titulo: "Tratamientos",
      subtitulo: "Precios de referencia. El costo final se confirma en tu valoración.",
      mostrarPrecios: true,    // false = oculta precios y muestra solo "Pedir informes"
      lista: [
        // PRECIOS DE EJEMPLO: cámbialos por los del cliente
        { icono: "sparkles",      nombre: "Limpieza dental",   descripcion: "Retiro de sarro y pulido. Recomendada cada 6 meses.", precio: "Desde $600" },
        { icono: "sun",           nombre: "Blanqueamiento",    descripcion: "Hasta varios tonos más claro en una sesión en consultorio.", precio: "Desde $2,800" },
        { icono: "layers",        nombre: "Resinas",           descripcion: "Curaciones del color de tu diente, sin amalgamas.", precio: "Desde $700" },
        { icono: "align-center",  nombre: "Ortodoncia",        descripcion: "Brackets metálicos, estéticos o alineadores.", precio: "Desde $1,200 al mes" },
        { icono: "shield-plus",   nombre: "Endodoncia",        descripcion: "Tratamiento de conductos para salvar tu diente.", precio: "Desde $3,500" },
        { icono: "baby",          nombre: "Odontopediatría",   descripcion: "Atención paciente y sin miedo para niñas y niños.", precio: "Desde $500" }
      ]
    },

    /* ---------- POR QUÉ NOSOTROS ---------- */
    porque: {
      activo: true,
      titulo: "Lo que nuestros pacientes valoran",
      lista: [
        { titulo: "Sabes cuánto vas a pagar", texto: "Te damos un presupuesto por escrito antes de empezar. Sin cargos extra a mitad del tratamiento." },
        { titulo: "Citas que sí se respetan", texto: "Llegas a tu hora y te atendemos. Te mandamos recordatorio un día antes por WhatsApp." },
        { titulo: "Sin dolor y sin regaños",  texto: "Anestesia cuidadosa y un trato amable, aunque tengas años sin ir al dentista." }
      ]
    },

    /* ---------- DOCTORA / EQUIPO ---------- */
    doctora: {
      activo: true,
      titulo: "Te atiende",
      nombre: "Dra. Mariana Alba",
      especialidad: "Cirujana dentista · Odontología estética",
      cedula: "",              // ej. "Cédula profesional 1234567" (solo si es real)
      foto: "",                // ej. "./doctora.jpg" (vacío = ilustración)
      texto: "Más de diez años cuidando sonrisas en León. Me gusta explicar cada paso para que decidas con calma y sin presión.",
      puntos: ["Atención personalizada", "Equipo esterilizado en cada cita", "Seguimiento por WhatsApp"]
    },

    /* ---------- CÓMO AGENDAR ---------- */
    proceso: {
      activo: true,
      titulo: "Agendar es así de fácil",
      pasos: [
        { titulo: "Escríbenos por WhatsApp",    texto: "Nuestro asistente te responde al momento, de día o de noche." },
        { titulo: "Elige día y horario",        texto: "Te ofrecemos los espacios disponibles y apartamos tu cita." },
        { titulo: "Recibe tu recordatorio",     texto: "Un día antes te llega la confirmación con la ubicación." }
      ]
    },

    /* ---------- TESTIMONIOS ---------- */
    testimonios: {
      activo: true,
      titulo: "Pacientes contentos",
      // En modoDemo se marcan como "Ejemplo". Al entregar, usa testimonios
      // REALES del cliente (o pon activo: false).
      lista: [
        { nombre: "Paciente de ejemplo", detalle: "Limpieza y resinas", texto: "Me explicaron todo antes de empezar y el precio fue el mismo que me dijeron. Agendé por WhatsApp a las 11 de la noche." },
        { nombre: "Paciente de ejemplo", detalle: "Ortodoncia",         texto: "Los recordatorios me salvaron, antes siempre se me olvidaban las citas." },
        { nombre: "Paciente de ejemplo", detalle: "Urgencia",           texto: "Me dolía muchísimo una muela y me dieron cita ese mismo día." }
      ]
    },

    /* ---------- PREGUNTAS FRECUENTES ---------- */
    faq: {
      activo: true,
      titulo: "Preguntas frecuentes",
      lista: [
        { pregunta: "¿Cuánto cuesta la valoración?", respuesta: "La valoración incluye revisión y plan de tratamiento con presupuesto por escrito. Pregunta el costo vigente por WhatsApp." },
        { pregunta: "¿Atienden urgencias?", respuesta: "Sí. Si tienes dolor fuerte, inflamación o un diente roto, escríbenos y te damos prioridad el mismo día." },
        { pregunta: "¿Aceptan tarjeta?", respuesta: "Sí, aceptamos tarjetas de débito y crédito, y meses sin intereses en tratamientos seleccionados." },
        { pregunta: "¿Atienden a niños?", respuesta: "Sí, tenemos atención para niñas y niños con un trato paciente para que pierdan el miedo." }
      ]
    },

    /* ---------- UBICACIÓN Y HORARIO ---------- */
    ubicacion: {
      activo: true,
      titulo: "Visítanos",
      botonMaps: "Cómo llegar"
    },

    /* ---------- LLAMADA FINAL ---------- */
    ctaFinal: {
      activo: true,
      titulo: "Tu próxima cita está a un mensaje.",
      subtitulo: "Respondemos al momento, también fuera de horario.",
      boton: "Agendar por WhatsApp"
    }
  },

  /* ---------------------------------------------------------------
     5. SIMULADOR DEL ASISTENTE (WhatsApp)
     Puedes usar {negocio}, {direccion}, {horario} y {mapsUrl} en los mensajes:
     se llenan solos con los datos de arriba.
     --------------------------------------------------------------- */
  bot: {
    activo: true,
    tema: "claro",                 // "claro" u "oscuro"
    nombre: "Sofi · Dental Alba",
    estado: "en línea",
    avatar: "",                    // vacío = usa el ícono
    avatarIcono: "smile",
    textoBoton: "Agenda por chat",
    aviso: "Demo: así respondería el asistente de tu consultorio.",
    pasoInicial: "inicio",
    pasos: {
      inicio: {
        mensajes: [
          "¡Hola! 👋 Soy Sofi, la asistente de {negocio}.",
          "¿En qué te puedo ayudar?"
        ],
        opciones: [
          { texto: "Agendar una cita",    ir: "tratamiento" },
          { texto: "Tengo una urgencia",  ir: "urgencia" },
          { texto: "Precios",             ir: "precios" },
          { texto: "Horario y ubicación", ir: "horario" }
        ]
      },
      tratamiento: {
        mensajes: ["Con gusto. ¿Qué tratamiento te interesa?"],
        opciones: [
          { texto: "Valoración general", ir: "primeraVez", guardar: "tratamiento" },
          { texto: "Limpieza dental",    ir: "primeraVez", guardar: "tratamiento" },
          { texto: "Blanqueamiento",     ir: "primeraVez", guardar: "tratamiento" },
          { texto: "Ortodoncia",         ir: "primeraVez", guardar: "tratamiento" },
          { texto: "Otro",               ir: "primeraVez", guardar: "tratamiento", valor: "Valoración general" }
        ]
      },
      primeraVez: {
        mensajes: ["¿Es tu primera vez con nosotros?"],
        opciones: [
          { texto: "Sí, primera vez",       ir: "dia", guardar: "paciente", valor: "paciente nuevo" },
          { texto: "Ya soy paciente",       ir: "dia", guardar: "paciente", valor: "paciente registrado" }
        ]
      },
      dia: {
        mensajes: ["Perfecto. ¿Qué día te acomoda?"],
        opciones: [
          { texto: "Hoy",         ir: "turno", guardar: "dia" },
          { texto: "Mañana",      ir: "turno", guardar: "dia" },
          { texto: "Esta semana", ir: "turno", guardar: "dia" },
          { texto: "Sábado",      ir: "turno", guardar: "dia" }
        ]
      },
      turno: {
        mensajes: ["¿Prefieres en la mañana o en la tarde?"],
        opciones: [
          { texto: "Mañana (9 a 1)", ir: "nombre", guardar: "turno", valor: "mañana" },
          { texto: "Tarde (4 a 8)",  ir: "nombre", guardar: "turno", valor: "tarde" }
        ]
      },
      nombre: {
        mensajes: ["Ya casi. ¿A nombre de quién apartamos la cita?"],
        entrada: { guardar: "nombre", placeholder: "Nombre y apellido", ir: "cierre" }
      },
      cierre: {
        mensajes: [
          "Listo, {nombre} ✅",
          "Pre-agendé tu {tratamiento} para {dia} en la {turno}. Toca el botón y una recepcionista te confirma la hora exacta."
        ],
        final: {
          boton: "Confirmar cita por WhatsApp",
          mensaje: "Hola, soy {nombre} ({paciente}). Quiero agendar {tratamiento} para {dia} en la {turno}."
        }
      },
      urgencia: {
        mensajes: ["Siento mucho la molestia 😟 ¿Qué es lo que tienes?"],
        opciones: [
          { texto: "Dolor fuerte",          ir: "urgenciaDatos", guardar: "urgencia" },
          { texto: "Se me rompió un diente", ir: "urgenciaDatos", guardar: "urgencia" },
          { texto: "Inflamación",           ir: "urgenciaDatos", guardar: "urgencia" },
          { texto: "Otra cosa",             ir: "urgenciaDatos", guardar: "urgencia" }
        ]
      },
      urgenciaDatos: {
        mensajes: [
          "Te damos prioridad hoy mismo.",
          "Importante: si tienes fiebre alta o la inflamación te dificulta respirar o tragar, acude de inmediato a urgencias de un hospital.",
          "¿Cuál es tu nombre?"
        ],
        entrada: { guardar: "nombre", placeholder: "Tu nombre", ir: "urgenciaCierre" }
      },
      urgenciaCierre: {
        mensajes: ["Gracias, {nombre}. Avísanos por WhatsApp y te damos el primer espacio disponible de hoy."],
        final: {
          boton: "Pedir cita de urgencia",
          mensaje: "Hola, soy {nombre}. Tengo una urgencia dental ({urgencia}) y necesito cita hoy."
        }
      },
      precios: {
        mensajes: [
          "Estos son precios de referencia:\n• Limpieza desde $600\n• Resinas desde $700\n• Blanqueamiento desde $2,800\n• Ortodoncia desde $1,200 al mes",
          "El costo final te lo damos por escrito en tu valoración, antes de empezar."
        ],
        opciones: [
          { texto: "Agendar valoración", ir: "primeraVez", guardar: "tratamiento", valor: "Valoración general" },
          { texto: "Ver otra cosa",      ir: "inicio" }
        ]
      },
      horario: {
        mensajes: ["📍 Estamos en {direccion}", "🕘 Atendemos {horario}."],
        opciones: [
          { texto: "Abrir en Google Maps", url: "{mapsUrl}" },
          { texto: "Agendar una cita",     ir: "tratamiento" },
          { texto: "Ver otra cosa",        ir: "inicio" }
        ]
      }
    }
  }
};
