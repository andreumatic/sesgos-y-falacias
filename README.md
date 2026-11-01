# Sesgos y falacias

Guía interactiva de sesgos cognitivos y falacias lógicas con evidencia académica citada (DOI), detector de manipulación en 60 segundos y tres tests. **Bilingüe: castellano y valenciano (normativo AVL).**

Sitio estático sin build ni dependencias: se sirve tal cual desde Cloudflare Pages.

- Producción: <https://sesgosyfalacias.andreumatic.com>
- Segunda página: <https://sesgosyfalacias.andreumatic.com/mas-alla-de-los-sesgos>

## Estructura

```
index.html                  Guía principal (HTML + JS de datos y render embebido)
mas-alla-de-los-sesgos.html Constelaciones temáticas (20 temas)
css/estilos.css             Estilos, tokens de marca y tipografías
assets/                     Logo, favicon, og:image e iconos PWA
assets/fonts/               Space Mono y Work Sans autoalojadas (woff2)
js/extra.js                 Enlaces por concepto, ?q=, progreso en localStorage, copiar enlace, formulario
js/va-datos.js              Valenciano: 19 sesgos, 16 falacias, 10 conexiones
js/va-datos2.js             Valenciano: detector, 12 preguntas, analizador, tests
js/va-mas.js                Valenciano: constelaciones, temas, glosario y referencias
js/i18n.js                  Diccionario ES→VA + traductor del DOM (guía)
js/i18n-mas.js              Diccionario ES→VA + traductor del DOM (segunda página)
functions/api/contacto.js   Pages Function del formulario (Turnstile + Resend)
sw.js, manifest.webmanifest PWA
```

## Idiomas

El idioma se guarda en `localStorage['sf:lang']` y también se puede fijar por URL con `?lang=va`. El selector `ES | VAL` está en la cabecera de las dos páginas y la elección se conserva al navegar entre ellas.

Cómo funciona:

1. Los arrays de contenido de `index.html` se declaran con `let` y, si el idioma es `va`, se sustituyen al arrancar por los de `js/va-datos*.js`.
2. El texto estático se traduce con los diccionarios de `js/i18n*.js`: se recorren los nodos de texto y los atributos `placeholder`, `aria-label`, `title` y `alt`.
3. Un `MutationObserver` traduce también el contenido generado por JavaScript (contadores, resultado del test, botón de copiar enlace, navegación entre secciones).
4. `document.title`, la descripción y las etiquetas Open Graph/Twitter se reescriben según el idioma.

Para añadir una cadena nueva: añádela al diccionario de `js/i18n.js` (clave = texto en castellano, valor = valenciano). Si es dinámica y lleva números, añade una regla en `RULES`.

### Revisión del valenciano

El corrector oficial de la Generalitat (`salt.gva.es`) usa LanguageTool y se puede llamar directamente:

```bash
curl -s https://saltusupro.gva.es/v2/check \
  -d "text=Els biaixos cognitius no són defectes de caràcter" \
  -d "language=ca-ES-valencia" -d "enabledOnly=false"
```

Devuelve JSON con `matches` (mensaje, regla y sugerencias). Lo que sigue marcando son nombres propios, latín y anglicismos (*Ad Populum*, *modus ponens*, *Kahneman*, *Cherry Picking*), que son correctos tal cual.

## Formulario de contacto

`functions/api/contacto.js` valida la longitud del mensaje, descarta el honeypot `empresa`, verifica el token de **Cloudflare Turnstile** con `TURNSTILE_SECRET` y envía el correo por **Resend** con `RESEND_API_KEY`.

Variables de entorno del proyecto Pages `sesgos-y-falacias`:

| Variable | Tipo | Valor |
|---|---|---|
| `TURNSTILE_SECRET` | secreto | secreto del widget «sesgos-falacias-contacto» |
| `RESEND_API_KEY` | secreto | clave de Resend (dominio `andreumatic.com` verificado) |
| `CONTACT_FROM` | texto | `web@andreumatic.com` |
| `CONTACT_TO` | texto | `info@andreumatic.com` |

Sin `RESEND_API_KEY` la función responde `no-provider` y la web muestra el correo directo. **Cambiar variables en Pages no surte efecto hasta que hay un despliegue nuevo**: hay que hacer un commit (aunque sea vacío) y push.

## Desarrollo local

```bash
python -m http.server 8099
```

Abrir `http://127.0.0.1:8099/`. La Pages Function no se ejecuta con `http.server`; para probarla hace falta `npx wrangler pages dev` con un `.dev.vars`.

## Contenido

Guía: 19 sesgos · 16 falacias · 10 conexiones · detector de 35 conceptos · 12 preguntas guiadas · analizador de 10 señales · 3 tests · 14 fuentes académicas.
Segunda página: 5 constelaciones · 20 temas con evidencia y conexiones · glosario de 12 términos · 18 referencias.

Contenido educativo; no sustituye asesoramiento profesional.

## Notas de mantenimiento

- Editar los ficheros siempre en UTF-8 (en Windows, con Python `io.open(..., encoding='utf-8', newline='')`; `Set-Content` de PowerShell 5.1 corrompe los acentos).
- Al cambiar el CSS hay que subir el parámetro de versión (`css/estilos.css?v=N`) en ambas páginas.
- Cada `git push` a `main` despliega automáticamente en Cloudflare Pages (~20 s).

---

© 2026 [AndreuMatic](https://andreumatic.com) · info@andreumatic.com
