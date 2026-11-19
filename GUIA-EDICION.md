# Guía de edición · VoltBeam

Todo funciona sin instalar nada: HTML + Tailwind (CDN) + Lucide (CDN) + JavaScript puro.
GitHub Pages publica automáticamente cada cambio que subes a `main` (tarda 1–2 minutos).

```
voltbeam-demos/
├── index.html          ← sitio VoltBeam (solo editar el <head> para la vista previa)
├── config.js           ← TODO el contenido de VoltBeam
├── app.js              ← diseño de las secciones (no hace falta tocarlo)
├── bot.js              ← simulador de WhatsApp, analítica, utilidades (no tocar)
├── assets/             ← logo, favicon, imágenes para compartir
└── demos/
    └── consultorio-dental/   ← plantilla autocontenida (se copia completa)
        ├── index.html
        ├── config.js
        ├── app.js
        └── bot.js
```

---

## 1. Crear un cliente nuevo en menos de 15 minutos

1. **Duplica la carpeta** `demos/consultorio-dental/` y renómbrala, por ejemplo `demos/dental-sonrisa-leon/`.
   Usa minúsculas, sin acentos ni espacios (eso será la URL).
   - En GitHub web: no se pueden copiar carpetas. Lo más fácil es desde tu computadora (GitHub Desktop o VS Code), o pídeme a mí que lo haga.
2. **Abre `config.js` de la nueva carpeta** y cambia, en este orden:
   - `negocio`: nombre, dirección, link de Google Maps, horario.
   - `contacto.whatsapp`: el número del cliente (52 + 10 dígitos). En las demos de prospección déjalo con el tuyo para que los mensajes te lleguen a ti.
   - `colores`: los del cliente (formato `#RRGGBB`).
   - `secciones`: textos, tratamientos y precios. Apaga lo que no aplique con `activo: false`.
   - `bot.pasos`: ajusta el guion del asistente (nombre, opciones, precios).
3. **Abre `index.html` de la nueva carpeta** y cambia las líneas del `<head>`: `title`, `description`, `og:title`, `og:description`, `og:url` y `og:image`.
   WhatsApp y Facebook solo leen esas líneas para la vista previa del link; no leen `config.js`.
4. **Sube los cambios** a `main`. La página quedará en:
   `https://abebm7-lab.github.io/voltbeam-demos/demos/NOMBRE-DE-LA-CARPETA/`
5. **Agrégala al portafolio** (opcional): en el `config.js` de la raíz, dentro de `secciones.demos.lista`, añade un bloque con `url: "./demos/NOMBRE-DE-LA-CARPETA/"`.

### Al entregar al cliente (ya no es demo)
- `modoDemo: false` en su `config.js`. Eso oculta la barra "Demo creada por VoltBeam" y la etiqueta "Ejemplo" de los testimonios.
- Borra la línea `<meta name="robots" content="noindex">` de su `index.html` para que Google sí la indexe.
- Sustituye los **testimonios y precios de ejemplo** por los reales, o apágalos. No publiques testimonios inventados para un negocio real.
- Si el cliente tendrá su propio dominio, copia la carpeta a un repositorio nuevo: es autocontenida y funciona igual.

---

## 2. Cosas que se editan seguido

| Quiero…                              | Dónde                                                       |
|--------------------------------------|-------------------------------------------------------------|
| Cambiar un texto                     | `config.js`, busca el texto con Ctrl+F                      |
| Ocultar/mostrar una sección          | `config.js` → `secciones.NOMBRE.activo: true/false`         |
| Cambiar el orden de las secciones    | `config.js` → lista `orden`                                 |
| Cambiar colores                      | `config.js` → `marca.colores` (raíz) o `colores` (plantilla)|
| Cambiar el número de WhatsApp        | `config.js` → `contacto.whatsapp`                           |
| Cambiar mensajes prellenados         | `config.js` → `contacto.mensajes`                           |
| Mostrar precios en VoltBeam          | `config.js` → `secciones.paquetes.mostrarPrecios: true` y llena `precio` |
| Activar Meta Pixel / Google Analytics| `config.js` → `analitica.metaPixelId` / `googleAnalyticsId` |
| Cambiar la vista previa al compartir | `index.html` → etiquetas `og:` del `<head>`                 |

Los íconos se escriben por su nombre de [lucide.dev/icons](https://lucide.dev/icons) (ej. `"calendar-check"`).

---

## 3. Cómo editar el guion del bot

Cada paso del guion vive en `bot.pasos` y tiene esta forma:

```js
nombreDelPaso: {
  mensajes: ["Lo que dice el bot", "Puede decir varias cosas"],
  opciones: [
    { texto: "Botón que ve la persona", ir: "siguientePaso", guardar: "variable" },
    { texto: "Abrir algo", url: "https://..." }
  ]
}
```

- `guardar: "dia"` guarda el texto del botón; después lo usas como `{dia}` en cualquier mensaje.
- `valor: "..."` guarda otra cosa en lugar del texto del botón.
- `entrada: { guardar: "nombre", placeholder: "Tu nombre", ir: "cierre" }` pide que la persona escriba.
- `final: { boton: "...", mensaje: "..." }` muestra el botón que abre el WhatsApp **real** con el resumen.
- En la plantilla puedes usar `{negocio}`, `{direccion}`, `{horario}` y `{mapsUrl}` sin definirlos: se llenan solos.

Prueba siempre el recorrido completo después de editar. Si un botón no hace nada, el `ir` apunta a un paso que no existe (revisa mayúsculas).

---

## 4. Reglas para que nada se rompa

- **Rutas siempre relativas**: `./archivo.js`, `./assets/logo.png`, `../../`. Nunca empieces una ruta con `/`, porque el sitio vive en `/voltbeam-demos/`.
  Excepción: `og:image` y `og:url` en el `<head>` sí van con la URL completa `https://...`, porque así lo exige WhatsApp/Facebook.
- En `config.js` cambia solo lo que está entre comillas y los `true`/`false`. Si la página sale en blanco, casi siempre falta o sobra una coma o comilla. Abre la consola del navegador (F12) y ahí dice la línea.
- `bot.js` es el mismo archivo en la raíz y en cada plantilla. Si lo mejoras, cópialo a todas las carpetas.
- Después de subir, GitHub tarda 1–2 minutos en publicar y el navegador puede seguir mostrando los `.js` anteriores hasta 10 minutos. Para revisar al momento, ábrelo en una pestaña de incógnito.

---

## 5. Notas honestas sobre el stack

- **Tailwind por CDN** es ideal para moverse rápido. La consola muestra un aviso de que no es para producción: es normal. Si un cliente llega a mucho tráfico, conviene compilar el CSS (te ayudo cuando llegue el momento).
- El contenido se dibuja con JavaScript. Google lo indexa bien, pero la vista previa al compartir depende solo del `<head>` (paso 3 de la sección 1).
- El simulador es un **guion fijo**: sirve para demostrar y para calificar prospectos. No es la IA real. El asistente de IA real en WhatsApp de cada cliente es un servicio aparte (WhatsApp Business API + modelo de IA).
