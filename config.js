/* =====================================================================
   VOLTBEAM · CONFIGURACIÓN DEL SITIO PRINCIPAL
   ---------------------------------------------------------------------
   Este es el ÚNICO archivo que necesitas editar para cambiar textos,
   colores, secciones, el número de WhatsApp o el guion del bot.

   Reglas rápidas:
   - Cambia solo lo que está entre comillas "..." o los true / false.
   - No borres comas ni llaves { } [ ]. Si algo se rompe, revisa comas.
   - activo: true  -> la sección se muestra
     activo: false -> la sección se oculta (el código sigue listo)
   - El orden de la página se define en "orden" (más abajo).

   OJO: el título y la imagen que aparecen al compartir el link en
   WhatsApp/Facebook están en index.html (<head>), porque esas apps
   no leen JavaScript. Ver GUIA-EDICION.md.
   ===================================================================== */

window.SITE_CONFIG = {

  /* ---------------------------------------------------------------
     1. MARCA
     --------------------------------------------------------------- */
  marca: {
    nombre: "VoltBeam",
    // El nombre se dibuja en dos colores igual que el logo:
    nombreParte1: "Volt",
    nombreParte2: "Beam",
    logo: "./assets/logo-mark.png",      // ruta RELATIVA, sin "/" al inicio
    firma: "Equipo VoltBeam",
    ciudad: "León, Guanajuato",

    // Colores en formato HEX. Se aplican a toda la página.
    colores: {
      fondo:      "#000000",  // fondo principal (negro del logo)
      superficie: "#111113",  // tarjetas y bloques
      linea:      "#2A2A2F",  // bordes y divisiones
      acento:     "#D79024",  // dorado del logo (botones, detalles)
      acentoSuave:"#F2B653",  // dorado claro (hover)
      texto:      "#F5F4F0",  // texto principal
      textoSuave: "#A3A3AB"   // texto secundario
    }
  },

  /* ---------------------------------------------------------------
     2. CONTACTO Y WHATSAPP
     whatsapp: código de país 52 + 10 dígitos, sin espacios ni "+".
     --------------------------------------------------------------- */
  contacto: {
    whatsapp: "524761900495",
    whatsappVisible: "476 190 0495",
    correo: "",            // vacío = no se muestra
    redes: {               // vacío = no se muestra
      facebook: "",
      instagram: "",
      tiktok: ""
    },
    // Mensajes prellenados que se abren en WhatsApp según el botón
    mensajes: {
      general:   "Hola VoltBeam, vi su página y quiero más información para mi negocio.",
      prueba:    "Hola VoltBeam, quiero pedir mi prueba gratis del asistente de WhatsApp para mi negocio.",
      cotizar:   "Hola VoltBeam, quiero cotizar: {servicio}.",
      demos:     "Hola VoltBeam, vi la demo de {demo} y me interesa algo así para mi negocio."
    }
  },

  /* ---------------------------------------------------------------
     3. ANALÍTICA (opcional)
     Pega tus IDs para activarlos. Vacío = desactivado.
     metaPixelId: solo números, ej. "123456789012345"
     googleAnalyticsId: ej. "G-XXXXXXXXXX"
     --------------------------------------------------------------- */
  analitica: {
    metaPixelId: "",
    googleAnalyticsId: ""
  },

  /* ---------------------------------------------------------------
     4. ORDEN DE LAS SECCIONES
     Mueve los nombres para cambiar el orden en la página.
     --------------------------------------------------------------- */
  orden: [
    "hero",
    "problema",
    "servicios",
    "demos",
    "calculadora",
    "proceso",
    "paquetes",
    "testimonios",
    "sobre",
    "faq",
    "contacto",
    "ctaFinal"
  ],

  /* ---------------------------------------------------------------
     5. SECCIONES
     --------------------------------------------------------------- */
  secciones: {

    /* ---------- MENÚ SUPERIOR ---------- */
    menu: {
      activo: true,
      links: [
        { texto: "Servicios",  ancla: "#servicios" },
        { texto: "Demos",      ancla: "#demos" },
        { texto: "Calculadora",ancla: "#calculadora" },
        { texto: "Contacto",   ancla: "#contacto" }
      ],
      boton: { texto: "Pide tu prueba", mensaje: "prueba" }
    },

    /* ---------- HERO (lo primero que se ve) ---------- */
    hero: {
      activo: true,
      etiqueta: "Webs y asistentes de IA para negocios de León",
      titulo: "Tu negocio contesta WhatsApp aunque tú estés dormido.",
      subtitulo: "Creamos tu página web y un asistente con inteligencia artificial que responde dudas, cotiza y agenda citas por WhatsApp, las 24 horas.",
      botonPrincipal:   { texto: "Pide tu prueba gratis", mensaje: "prueba" },
      botonSecundario:  { texto: "Ver demos", ancla: "#demos" },
      notaBajoBotones:  "Sin compromiso. Te respondemos por WhatsApp.",

      // Conversación de ejemplo que se reproduce en el teléfono del hero.
      // de: "cliente" o "bot". hora: lo que se ve en la burbuja.
      chatEjemplo: {
        nombreNegocio: "Tu negocio",
        estado: "en línea",
        mensajes: [
          { de: "cliente", texto: "Hola, ¿tienen lugar mañana?", hora: "2:14 a.m." },
          { de: "bot",     texto: "¡Hola! Sí 😊 Mañana tenemos 10:00 a.m. o 4:30 p.m. ¿Cuál te acomoda?", hora: "2:14 a.m." },
          { de: "cliente", texto: "4:30 porfa", hora: "2:15 a.m." },
          { de: "bot",     texto: "Listo, quedó apartada a las 4:30 p.m. ✅ Te mando recordatorio mañana a mediodía.", hora: "2:15 a.m." }
        ],
        // Texto que aparece debajo del teléfono
        pie: "Mientras dormías, una cita quedó agendada."
      }
    },

    /* ---------- PROBLEMA / SOLUCIÓN ---------- */
    problema: {
      activo: true,
      titulo: "Cada mensaje sin contestar es un cliente que se va con la competencia.",
      subtitulo: "Tus clientes escriben a cualquier hora y esperan respuesta en minutos, no al día siguiente.",
      columnaHoy: {
        titulo: "Hoy",
        puntos: [
          "Contestas tarde porque estás atendiendo",
          "Repites precios y horarios veinte veces al día",
          "Los mensajes de la noche se pierden",
          "No das seguimiento a quien preguntó y no compró"
        ]
      },
      columnaSolucion: {
        titulo: "Con VoltBeam",
        puntos: [
          "Respuesta en segundos, también fines de semana",
          "Dudas frecuentes resueltas sin que muevas un dedo",
          "Citas y cotizaciones listas cuando abres el teléfono",
          "Seguimiento automático a cada interesado"
        ]
      }
    },

    /* ---------- SERVICIOS ---------- */
    servicios: {
      activo: true,
      titulo: "Lo que hacemos",
      subtitulo: "Dos piezas que funcionan solas o juntas.",
      lista: [
        {
          icono: "globe",
          titulo: "Página web que vende",
          descripcion: "Una página rápida, pensada para celular, con tus servicios claros y botones que llevan directo a tu WhatsApp.",
          puntos: ["Lista en días, no meses", "Pensada para verse en el celular", "Lista para Google y Facebook"],
          boton: "Cotizar página web"
        },
        {
          icono: "bot",
          titulo: "Asistente de IA en WhatsApp",
          descripcion: "Un asistente entrenado con la información de tu negocio que responde, filtra curiosos de clientes reales y agenda.",
          puntos: ["Atiende 24/7", "Agenda citas y toma pedidos", "Te pasa la conversación cuando hace falta"],
          boton: "Cotizar asistente",
          destacado: true
        },
        {
          icono: "repeat",
          titulo: "Seguimiento y recordatorios",
          descripcion: "Mensajes automáticos para confirmar citas, recordar pagos y volver a contactar a quien no cerró.",
          puntos: ["Menos citas perdidas", "Recupera ventas olvidadas", "Sin hojas de Excel"],
          boton: "Cotizar seguimiento"
        }
      ]
    },

    /* ---------- DEMOS / PORTAFOLIO ---------- */
    demos: {
      activo: true,
      titulo: "Pruébalo antes de decidir",
      subtitulo: "Demos reales que puedes abrir en tu celular. Cada una trae su propio asistente.",
      botonBot: "Probar el asistente de VoltBeam",
      lista: [
        {
          activo: true,
          nombre: "Consultorio dental",
          descripcion: "Sitio + asistente que agenda valoraciones, atiende urgencias y responde precios.",
          url: "./demos/consultorio-dental/",
          icono: "smile",
          etiqueta: "Disponible"
        },
        {
          activo: true,
          nombre: "Restaurante",
          descripcion: "Menú, pedidos para llevar y reservaciones desde WhatsApp.",
          url: "",               // vacío = "Próximamente"
          icono: "utensils",
          etiqueta: "Próximamente"
        },
        {
          activo: true,
          nombre: "Taller mecánico",
          descripcion: "Cotizaciones de servicio y citas de diagnóstico sin llamadas.",
          url: "",
          icono: "wrench",
          etiqueta: "Próximamente"
        }
      ]
    },

    /* ---------- CALCULADORA DE VENTAS PERDIDAS ---------- */
    calculadora: {
      activo: true,
      titulo: "¿Cuánto te cuesta contestar tarde?",
      subtitulo: "Pon tus números. Es una estimación con tus propios datos, no una promesa.",
      // Valores iniciales de los controles
      valores: {
        mensajesDia: 20,       // mensajes nuevos al día
        perdidos: 30,          // % que contestas tarde o nunca
        cierre: 20,            // % de esos que habrían comprado
        ticket: 600            // venta promedio en pesos
      },
      diasMes: 30,
      textoResultado: "podrías estar dejando ir cada mes",
      boton: "Enviarme este cálculo por WhatsApp",
      mensaje: "Hola VoltBeam, hice el cálculo: recibo {mensajesDia} mensajes al día, pierdo como {perdidos}% y mi venta promedio es de ${ticket}. Estimo ${resultado} al mes. ¿Cómo me pueden ayudar?"
    },

    /* ---------- PROCESO ---------- */
    proceso: {
      activo: true,
      titulo: "Cómo trabajamos",
      pasos: [
        { titulo: "Platicamos por WhatsApp", descripcion: "Nos cuentas cómo atiendes hoy y qué te preguntan más tus clientes." },
        { titulo: "Te mandamos una demo",    descripcion: "Armamos una prueba con el nombre y los servicios de tu negocio para que la veas funcionando." },
        { titulo: "Lanzamos y ajustamos",    descripcion: "Publicamos, revisamos las conversaciones reales y afinamos las respuestas contigo." }
      ]
    },

    /* ---------- PAQUETES (sin precios públicos) ---------- */
    paquetes: {
      activo: true,
      titulo: "Elige por dónde empezar",
      subtitulo: "Cada negocio es distinto. Cotizamos según lo que de verdad necesitas.",
      mostrarPrecios: false,   // true = muestra el campo "precio" de cada paquete
      lista: [
        {
          nombre: "Presencia",
          precio: "",
          para: "Para que te encuentren y te escriban.",
          incluye: ["Página web de una sección", "Botón directo a WhatsApp", "Ubicación y horarios", "Lista para compartir en Facebook"],
          boton: "Cotizar Presencia"
        },
        {
          nombre: "Atención 24/7",
          precio: "",
          para: "Para no perder ni un mensaje.",
          incluye: ["Asistente de IA en WhatsApp", "Respuestas con la info de tu negocio", "Agenda o toma de pedidos", "Aviso cuando un cliente necesita a una persona"],
          boton: "Cotizar Atención 24/7",
          destacado: true,
          etiquetaDestacado: "El más pedido"
        },
        {
          nombre: "Crecimiento",
          precio: "",
          para: "Página + asistente + seguimiento.",
          incluye: ["Todo lo de Presencia y Atención 24/7", "Recordatorios y seguimiento automático", "Reporte mensual de conversaciones", "Ajustes continuos"],
          boton: "Cotizar Crecimiento"
        }
      ],
      botonPrueba: "O pide tu prueba gratis"
    },

    /* ---------- TESTIMONIOS (apagado hasta tener reales) ---------- */
    testimonios: {
      activo: false,
      titulo: "Lo que dicen nuestros clientes",
      lista: [
        // Rellena con testimonios REALES y con permiso del cliente.
        { nombre: "Nombre del cliente", negocio: "Negocio, colonia", texto: "Testimonio real del cliente." }
      ]
    },

    /* ---------- SOBRE NOSOTROS ---------- */
    sobre: {
      activo: true,
      titulo: "Hechos en León, para negocios de León",
      texto: "Somos un equipo local de tecnología. Conocemos cómo se vende aquí: por WhatsApp, por recomendación y con atención rápida. Por eso no vendemos plantillas genéricas; armamos cada página y cada asistente con la forma de hablar y de trabajar de tu negocio.",
      puntos: [
        { icono: "map-pin",     texto: "Atención en León" },
        { icono: "message-circle", texto: "Trato directo por WhatsApp" },
        { icono: "shield-check",   texto: "Tú apruebas cada respuesta del asistente" }
      ]
    },

    /* ---------- PREGUNTAS FRECUENTES (apagado por ahora) ---------- */
    faq: {
      activo: false,
      titulo: "Preguntas frecuentes",
      lista: [
        { pregunta: "¿Necesito saber de tecnología?", respuesta: "No. Nosotros configuramos todo y te enseñamos lo básico en una llamada corta." },
        { pregunta: "¿El asistente puede equivocarse?", respuesta: "Puede pasar, por eso lo entrenamos solo con tu información, revisamos conversaciones y hacemos que te pase el chat cuando no sabe algo." },
        { pregunta: "¿Uso mi mismo número de WhatsApp?", respuesta: "Depende de tu caso. Lo revisamos contigo antes de empezar para no afectar tu operación." },
        { pregunta: "¿Cuánto tarda?", respuesta: "Una página sencilla puede quedar en pocos días. El asistente depende de cuánta información tenga tu negocio." }
      ]
    },

    /* ---------- FORMULARIO QUE ABRE WHATSAPP ---------- */
    contacto: {
      activo: true,
      titulo: "Cuéntanos de tu negocio",
      subtitulo: "Llena esto en 30 segundos y te abrimos WhatsApp con tu mensaje listo.",
      giros: ["Clínica o consultorio", "Taller", "Restaurante o comida", "Tienda o comercio", "Servicios profesionales", "Otro"],
      necesidades: ["Página web", "Asistente de WhatsApp", "Las dos", "Todavía no sé"],
      boton: "Abrir WhatsApp con mi mensaje",
      mensaje: "Hola VoltBeam, soy {nombre} de {negocio} ({giro}). Me interesa: {necesidad}. {comentario}"
    },

    /* ---------- LLAMADA FINAL ---------- */
    ctaFinal: {
      activo: true,
      titulo: "Tu próximo cliente ya te está escribiendo.",
      subtitulo: "Pide tu prueba y ve el asistente funcionando con el nombre de tu negocio.",
      boton: { texto: "Pide tu prueba gratis", mensaje: "prueba" }
    },

    /* ---------- PIE DE PÁGINA ---------- */
    footer: {
      activo: true,
      texto: "Páginas web y asistentes de IA para negocios locales."
    }
  },

  /* ---------------------------------------------------------------
     6. SIMULADOR DEL BOT DE WHATSAPP
     ---------------------------------------------------------------
     Cómo funciona el guion:
     - Cada "paso" tiene un id, mensajes del bot y opciones.
     - opciones: { texto, ir: "id del siguiente paso", guardar: "variable" }
       Si pones guardar, el texto de la opción se guarda en esa variable
       y puedes usarla después escribiendo {variable} en un mensaje.
     - entrada: pide que la persona escriba (ej. su nombre).
     - final: muestra el botón para mandar el resumen por WhatsApp REAL.
     - url en una opción: abre esa página en vez de seguir el chat.
     --------------------------------------------------------------- */
  bot: {
    activo: true,
    nombre: "Asistente VoltBeam",
    estado: "en línea",
    avatar: "./assets/logo-mark.png",
    textoBoton: "Prueba el asistente",
    aviso: "Simulación: así respondería un asistente de VoltBeam.",
    abrirSolo: false,          // true = se abre solo al entrar (no recomendado)
    pasoInicial: "inicio",
    pasos: {
      inicio: {
        mensajes: [
          "¡Hola! 👋 Soy el asistente de VoltBeam.",
          "Así contestaría un asistente en tu negocio. Para empezar, ¿qué tipo de negocio tienes?"
        ],
        opciones: [
          { texto: "Clínica o consultorio", ir: "dolor", guardar: "giro" },
          { texto: "Taller",                ir: "dolor", guardar: "giro" },
          { texto: "Restaurante o comida",  ir: "dolor", guardar: "giro" },
          { texto: "Tienda o comercio",     ir: "dolor", guardar: "giro" },
          { texto: "Otro",                  ir: "dolor", guardar: "giro" }
        ]
      },
      dolor: {
        mensajes: ["Va. ¿Qué es lo que más te quita ventas hoy?"],
        opciones: [
          { texto: "Contesto tarde",                 ir: "volumen", guardar: "problema" },
          { texto: "Me preguntan lo mismo todo el día", ir: "volumen", guardar: "problema" },
          { texto: "Se me olvida dar seguimiento",   ir: "volumen", guardar: "problema" },
          { texto: "No tengo página web",            ir: "volumen", guardar: "problema" }
        ]
      },
      volumen: {
        mensajes: ["¿Cuántos mensajes nuevos te llegan al día, más o menos?"],
        opciones: [
          { texto: "Menos de 10", ir: "propuesta", guardar: "volumen" },
          { texto: "10 a 30",     ir: "propuesta", guardar: "volumen" },
          { texto: "30 a 100",    ir: "propuesta", guardar: "volumen" },
          { texto: "Más de 100",  ir: "propuesta", guardar: "volumen" }
        ]
      },
      propuesta: {
        mensajes: [
          "Entendido: {giro}, {volumen} mensajes al día y el reto es «{problema}».",
          "Eso lo resuelve un asistente que conteste al instante, aparte lo que necesitas saber y te deje la cita o el pedido listo.",
          "¿Qué te gustaría hacer?"
        ],
        opciones: [
          { texto: "Quiero mi prueba gratis", ir: "nombre", guardar: "interes" },
          { texto: "Quiero una cotización",  ir: "nombre", guardar: "interes" },
          { texto: "Solo estoy viendo",      ir: "viendo" }
        ]
      },
      viendo: {
        mensajes: [
          "Va, sin presión 🙂",
          "Si quieres ver un caso completo, abre la demo del consultorio dental: trae su propio asistente para agendar citas."
        ],
        opciones: [
          { texto: "Abrir demo dental", url: "./demos/consultorio-dental/" },
          { texto: "Mejor sí quiero mi prueba", ir: "nombre", guardar: "interes", valor: "Quiero mi prueba gratis" }
        ]
      },
      nombre: {
        mensajes: ["¡Perfecto! ¿Cómo te llamas?"],
        entrada: { guardar: "nombre", placeholder: "Tu nombre", ir: "negocio" }
      },
      negocio: {
        mensajes: ["Mucho gusto, {nombre}. ¿Cómo se llama tu negocio?"],
        entrada: { guardar: "negocio", placeholder: "Ej. Estética Laura", ir: "cierre" }
      },
      cierre: {
        mensajes: [
          "Gracias. Ya tengo todo lo de {negocio} 🙌",
          "Toca el botón y te abro WhatsApp con tu resumen. Ahí te atiende una persona del equipo."
        ],
        final: {
          boton: "Enviar resumen por WhatsApp",
          mensaje: "Hola VoltBeam, soy {nombre} de {negocio} (giro: {giro}). Recibo {volumen} mensajes al día y mi reto es: {problema}. {interes}."
        }
      }
    }
  }
};
