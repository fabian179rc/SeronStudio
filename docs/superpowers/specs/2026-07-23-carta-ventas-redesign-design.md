# SeronStudio — Adaptación de la carta de ventas (rama `redesign`)

**Fecha:** 2026-07-23
**Estado:** Aprobado por usuario (Opción A), pendiente de plan de implementación
**Rama:** `redesign` (no afecta `main`)

## Contexto

El usuario entregó una carta de ventas completa para SeronStudio (mercado: dueños de negocio en Argentina, canal outbound WhatsApp/email, la web como respaldo de autoridad). Se construyeron dos mockups visuales (Artifacts) reutilizando el sistema de diseño real del sitio (`src/styles/tokens.css`, ver [[2026-07-16-seronstudio-redesign-design]]) para comparar dos formatos:

- **Opción A — long-form**: sigue casi punto por punto la estructura narrativa de la carta.
- **Opción B — resumen adaptado**: versión condensada sobre las secciones actuales.

El usuario eligió **Opción A**. Opción B queda publicada como artifact aparte para tomar ideas puntuales de copy, pero no es la base de esta implementación.

## Alcance

Reescribir el contenido y ampliar la estructura de secciones del sitio existente (React + Vite) en la rama `redesign`, sin tocar `main`. Se mantiene el sistema de diseño actual (paleta, tipografías, patrones de componente: `section-title`, `.reveal` / `useScrollReveal`, `.btn`, tarjetas con `border-subtle`). No es un rediseño visual desde cero — es contenido y estructura nuevos sobre la identidad visual ya validada.

## Estructura de secciones (orden final)

1. **Nav** — sin cambios de estructura.
2. **Hero** — copy nuevo:
   - Eyebrow: "Aceptando proyectos — 2026" (sin cambios)
   - H1: "Dejá de explicar lo mismo veinte veces." / "Que tu página lo haga por vos."
   - Subtítulo: "Una página que explica, genera confianza y lleva al cliente a tu WhatsApp ya decidido. Diseño y desarrollo web a medida para negocios en Argentina."
   - CTAs sin cambios ("Ver Portfolio →" / "WhatsApp Directo →")
3. **Ticker** — nuevos items rotando 4 one-liners de la carta (ver lista de "Ticker" abajo).
4. **Métricas** — sin cambios (400+ Proyectos, 13 Industrias, 100% A Medida, 1:1 Atención Directa ya coinciden con la carta).
5. **El Problema** *(sección nueva)* — id `#problema`, agregado al nav. Versión corta (tomada de la Opción B), sin pull-quote separado:
   - Título: "Todos los días perdés consultas que nunca vas a ver."
   - Párrafo único: "No es culpa del mercado ni del rubro. Es que tu presencia digital no está haciendo el trabajo que debería hacer. Alguien busca lo que ofrecés, no lo encuentra en tu web y en tres segundos decide irse a la competencia."
   - Debajo, fila de 4 "pills" (mismo estilo que el mockup B — `border-subtle`, `border-radius: 999px`): "Instagram no alcanza" · "Las plantillas no convierten" · "\"El sobrino\" no da soporte" · "Las agencias grandes son impersonales".
   - Reemplaza la sección "Por qué fallan las soluciones actuales" del plan original (esos 5 puntos de la carta quedan condensados en los pills, no como sección aparte).
6. **Servicios** — se actualiza `src/data/servicios.js`: pasa de 5 ítems solo-nombre a 5 ítems con descripción "ideal para" (ver tabla abajo). Requiere ampliar `Servicios.jsx` para renderizar la descripción.
7. **Qué incluye cada proyecto** *(sección nueva)* — grid de 8 ítems (checklist).
8. **Cómo trabajamos** *(sección nueva)* — 3 pasos (Diagnóstico / Diseño y desarrollo / Lanzamiento y soporte).
9. **Filosofía** — se reescribe el texto principal ("La estrategia va primero") y se agrega el bloque "Para quién es / no es" (2 columnas) dentro de la misma sección, reemplazando la lista actual de diferenciales. Cumple el rol de "Para quién es SeronStudio" del mockup.
10. **Portfolio** *(reubicado)* — el mockup de Opción A lo ubica como "Ejemplos reales" cerca del final, no pegado a Métricas. Sin cambios de datos/estructura del componente, solo de posición: va después de Filosofía, antes de FAQ.
11. **FAQ** *(sección nueva)* — acordeón (`<details>`) con las 7 objeciones de la carta.
12. **Inversión** *(sección nueva, bloque `bg-secondary`, componente `Inversion.jsx`)* — "Invertí en tu web. Hacé crecer tu negocio." + el párrafo "La pregunta real..." de la carta (costo de oportunidad de no tener una web que funcione). Reemplaza la idea original de "Sin riesgo" (reassurance de "sin compromiso") por un enfoque de inversión/crecimiento, a pedido del usuario tras ver la primera versión.
13. **Contacto** — se actualiza el copy del CTA ("¿Le damos forma a tu presencia online?"), se agrega el mensaje de WhatsApp pre-cargado ("Hola, vi SeronStudio y me gustaría consultar por una web para mi negocio.") al link de WhatsApp vía query param `?text=`.
14. **Footer** — tagline nuevo: "La página que trabaja antes que vos."

**Recorte pedido por el usuario (2026-07-23, después de la primera implementación completa):** la página se sentía muy larga y repetitiva. Se sacaron **Mecanismo Único** y **Lo que pasa cuando funciona** — ambas repetían la misma promesa que ya está en el subtítulo del Hero, sin agregar información nueva. Se evaluó sacar también Qué incluye, Cómo trabajamos y Sin riesgo, pero el usuario eligió mantenerlas por aportar información útil aunque alarguen la página. Los componentes `Mecanismo.jsx` y `ComoFunciona.jsx` se eliminaron del repo (no se dejaron sin usar).

## Datos y componentes a tocar

- `src/data/servicios.js` — reescribir los 5 ítems con `descripcion`:
  | # | Nombre | Descripción |
  |---|---|---|
  | 01 | Landing de Captación | Ideal para profesionales independientes, servicios de urgencia y consultorios que dependen de consultas iniciales. |
  | 02 | Sitio Institucional Completo | Ideal para estudios jurídicos, clínicas, inmobiliarias y servicios profesionales que necesitan mostrar profundidad. |
  | 03 | Sitio de Marca | Ideal para marcas de alimentos, belleza, moda y gastronomía con identidad propia para transmitir. |
  | 04 | E-commerce | Para negocios que quieren vender online o sumar un canal digital propio a lo presencial. |
  | 05 | Rediseño y Optimización | Para negocios que ya tienen algo, pero no convierte, se ve viejo o no funciona bien en celular. |
- `src/components/Servicios.jsx` — renderizar `descripcion` debajo del nombre.
- `src/components/Hero.jsx` — nuevo H1/subtítulo.
- `src/components/Ticker.jsx` — nuevos `TICKER_ITEMS`.
- `src/components/Filosofia.jsx` — nuevo texto + bloque "para quién es/no es" (reemplaza `DIFERENCIALES`).
- `src/components/Contacto.jsx` — copy de CTA + WhatsApp con mensaje pre-cargado.
- `src/components/Footer.jsx` — tagline nuevo.
- `src/App.jsx` — insertar los componentes nuevos en el orden de la sección "Estructura".
- **Componentes nuevos**: `Problema.jsx` (título + párrafo + pills), `Mecanismo.jsx`, `ComoFunciona.jsx` (narrativa), `QueIncluye.jsx`, `Proceso.jsx`, `Faq.jsx`, `SinRiesgo.jsx`. Cada uno sigue el patrón existente: `useScrollReveal` + `revealClass`, `<section className="...">`, contenido dentro de `.container`.
- `src/styles/global.css` — nuevas clases para las secciones nuevas, reutilizando tokens existentes (sin agregar colores nuevos). Basarse en los estilos ya probados en los mockups (Artifacts Opción A/B) para pills, bloque destacado, checklist y acordeón FAQ.
- `Nav.jsx` y `Footer.jsx` — agregar el link "El Problema" (`#problema`) a la lista existente, quedando: Portafolio, El Problema, Servicios, Filosofía, Consulta.

## Fuera de alcance

- No se toca `main`.
- No se cambia el sistema de diseño (paleta/tipografía) — ya fue validado en el rediseño del 2026-07-16.
- No se implementa la Opción B — queda solo como referencia visual (artifact ya publicado).
- No se tocan `PortfolioCard.jsx` / `PortfolioPreviewModal.jsx` / datos de `portfolio.js`.

## Testing

- `npm run dev` en la rama `redesign`, revisión visual manual de todas las secciones (desktop + mobile breakpoint ~768px) antes de dar por terminado.
- Verificar que el link de WhatsApp con `?text=` abre correctamente con el mensaje pre-cargado.
