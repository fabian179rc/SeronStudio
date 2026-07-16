# SeronStudio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current HyS catalog SPA with the SeronStudio agency portfolio site, per `docs/superpowers/specs/2026-07-16-seronstudio-redesign-design.md`.

**Architecture:** React + Vite (existing base), rebuilt as one component per section under `src/components/`, two shared hooks (`useScrollReveal`, `useCounter`) under `src/hooks/`, static content under `src/data/`, and two stylesheets (`tokens.css`, `global.css`) under `src/styles/`. No new dependencies.

**Tech Stack:** React 18, Vite 4 (already installed — no version changes). Vanilla CSS (custom properties, `@keyframes`, `:has()`). No animation libraries. Web3Forms for the contact form (plain `fetch`, no SDK).

## Global Constraints

- Color tokens (exact values): `--bg-primary: #0a0a0a`, `--text-primary: #f5f5f0`, `--accent: #c9a84c`, `--bg-secondary: #1a1a1a`, `--border-subtle: #2a2a2a`.
- Fonts: `Playfair Display` for all headings/titles, `DM Sans` for body text — both loaded from Google Fonts in `index.html`.
- Contact data (exact values): email `soporte.seronstudio@gmail.com`, WhatsApp `+5493412665657`, WhatsApp link `https://wa.me/5493412665657`.
- No animation libraries (no Framer Motion, no GSAP). All motion is CSS transitions/keyframes + `IntersectionObserver` + `requestAnimationFrame`.
- Cursor personalizado must be disabled on touch devices via `@media (hover: hover) and (pointer: fine)` — never render it when that query doesn't match.
- The project has no automated test runner today, and the spec explicitly excludes adding one. Every task's "verify" step is a manual check via `npm run dev` in the browser, not an automated test. The final task additionally runs `npm run build`.
- The old HyS catalog content (`src/App.jsx` body, product copy) is fully removed. The image assets in `src/assets/products/` are left on disk untouched (recoverable via git history) but no longer imported anywhere.
- Web3Forms `access_key` is not yet known — it ships as an obvious placeholder string in `src/data/config.js` that the user must replace before the form can send real email.

---

### Task 1: Design tokens, base styles, and app shell wiring

**Files:**
- Create: `src/styles/tokens.css`
- Create: `src/styles/global.css`
- Modify: `index.html`
- Modify: `src/main.jsx`

**Interfaces:**
- Produces: CSS custom properties (`--bg-primary`, `--text-primary`, `--accent`, `--bg-secondary`, `--border-subtle`, `--font-serif`, `--font-sans`) available globally. Shared utility classes `.container`, `.reveal`/`.is-visible`, `.section-title`, `.section-subtitle`, `.btn`, `.btn--primary`, `.btn--ghost` available to every later component.

- [ ] **Step 1: Create the token stylesheet**

`src/styles/tokens.css`:
```css
:root {
  --bg-primary: #0a0a0a;
  --text-primary: #f5f5f0;
  --accent: #c9a84c;
  --bg-secondary: #1a1a1a;
  --border-subtle: #2a2a2a;

  --font-serif: 'Playfair Display', Georgia, serif;
  --font-sans: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

- [ ] **Step 2: Create the base global stylesheet**

`src/styles/global.css`:
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#root {
  min-height: 100vh;
  overflow-x: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.section-title {
  font-family: var(--font-serif);
  font-size: 2.5rem;
  color: var(--text-primary);
  margin: 0 0 0.5rem;
}

.section-subtitle {
  color: var(--text-primary);
  opacity: 0.65;
  margin: 0 0 3rem;
}

.btn {
  display: inline-block;
  padding: 0.85rem 1.75rem;
  border-radius: 2px;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease,
    border-color 0.2s ease;
}

.btn--primary {
  background: var(--accent);
  color: var(--bg-primary);
  border: 1px solid var(--accent);
}

.btn--primary:hover {
  transform: translateY(-2px);
}

.btn--ghost {
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border-subtle);
}

.btn--ghost:hover {
  border-color: var(--accent);
  color: var(--accent);
}

@media (max-width: 768px) {
  .container {
    padding: 0 1.25rem;
  }
}
```

- [ ] **Step 3: Update `index.html`** — replace the whole file with:

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SeronStudio — Sitios web a medida</title>
    <meta
      name="description"
      content="Estudio de diseño y desarrollo web a medida en Argentina. Sitios que convierten, hechos a mano."
    />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=DM+Sans:wght@400;500;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 4: Wire the stylesheets into the app** — modify `src/main.jsx`:

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/tokens.css'
import './styles/global.css'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

- [ ] **Step 5: Verify**

Run: `npm run dev`
Expected: Vite starts with no errors in the terminal, and no errors in the browser console at `http://localhost:5173`. The page still shows the old HyS catalog (not yet replaced) — that's expected at this point, since `App.jsx` is untouched until Task 13. This step only confirms the new stylesheets and fonts load without breaking the build.

- [ ] **Step 6: Commit**

```bash
git add index.html src/main.jsx src/styles/tokens.css src/styles/global.css
git commit -m "feat: add SeronStudio design tokens and base styles"
```

---

### Task 2: Static content data layer

**Files:**
- Create: `src/data/config.js`
- Create: `src/data/portfolio.js`
- Create: `src/data/servicios.js`

**Interfaces:**
- Produces: `CONTACT` object (`{ email, whatsappNumber, whatsappUrl }`), `WEB3FORMS_ACCESS_KEY` string, `portfolio` array (each item: `{ numero, industria, nombre, descripcion, gradient, url }`), `servicios` array (each item: `{ numero, nombre }`). Later components (Hero, Portfolio, Servicios, Contacto, Footer) import from these exact paths and names.

- [ ] **Step 1: Create `src/data/config.js`**

```js
export const CONTACT = {
  email: "soporte.seronstudio@gmail.com",
  whatsappNumber: "5493412665657",
  whatsappUrl: "https://wa.me/5493412665657",
};

// TODO(user): replace with your real Web3Forms access key from
// https://web3forms.com before the contact form can send real email.
export const WEB3FORMS_ACCESS_KEY = "REPLACE_WITH_YOUR_WEB3FORMS_ACCESS_KEY";
```

- [ ] **Step 2: Create `src/data/portfolio.js`**

```js
export const portfolio = [
  {
    numero: "01",
    industria: "Gastronomía",
    nombre: "El Rincón del Sabor",
    descripcion:
      "Una carta digital con reservas online y una identidad visual que transmite calidez de barrio y prolijidad profesional.",
    gradient: "linear-gradient(135deg, #3a2317 0%, #1a1008 100%)",
    url: "#",
  },
  {
    numero: "02",
    industria: "Legal",
    nombre: "El Consejo de Confianza",
    descripcion:
      "Un sitio institucional sobrio que posiciona al estudio como referente de confianza antes del primer contacto.",
    gradient: "linear-gradient(135deg, #1f2937 0%, #0b0f14 100%)",
    url: "#",
  },
  {
    numero: "03",
    industria: "Salud",
    nombre: "La Clínica Familiar",
    descripcion:
      "Turnos online y una experiencia clara para pacientes de todas las edades, sin fricción ni tecnicismos.",
    gradient: "linear-gradient(135deg, #234035 0%, #0e1a15 100%)",
    url: "#",
  },
  {
    numero: "04",
    industria: "Inmobiliaria",
    nombre: "La Dirección Exclusiva",
    descripcion:
      "Fichas de propiedades en formato editorial que hacen que cada inmueble se sienta una oportunidad única.",
    gradient: "linear-gradient(135deg, #3d2f1a 0%, #1a130a 100%)",
    url: "#",
  },
  {
    numero: "05",
    industria: "Fitness",
    nombre: "El Atelier de la Fuerza",
    descripcion:
      "Una landing de alto impacto visual pensada para convertir seguidores de redes en socios del estudio.",
    gradient: "linear-gradient(135deg, #331a1a 0%, #140a0a 100%)",
    url: "#",
  },
  {
    numero: "06",
    industria: "Servicios",
    nombre: "La Mano Confiable",
    descripcion:
      "Un sitio simple y directo que convierte visitas en llamadas para un negocio de servicios técnicos a domicilio.",
    gradient: "linear-gradient(135deg, #1a2a33 0%, #0a1216 100%)",
    url: "#",
  },
];
```

- [ ] **Step 3: Create `src/data/servicios.js`**

```js
export const servicios = [
  { numero: "01", nombre: "Sitio de Marca Completo" },
  { numero: "02", nombre: "Landing Page de Captación" },
  { numero: "03", nombre: "E-commerce" },
  { numero: "04", nombre: "Rediseño y Optimización" },
  { numero: "05", nombre: "Mantenimiento y Soporte" },
];
```

- [ ] **Step 4: Verify**

Run: `node -e "console.log(require('esm')); "` is unnecessary — instead just confirm no syntax errors by starting the dev server:
Run: `npm run dev`
Expected: still starts clean (these files aren't imported by anything yet, so this only guards against a typo breaking Vite's file watcher).

- [ ] **Step 5: Commit**

```bash
git add src/data/config.js src/data/portfolio.js src/data/servicios.js
git commit -m "feat: add SeronStudio static content data"
```

---

### Task 3: Custom cursor

**Files:**
- Create: `src/components/Cursor.jsx`
- Modify: `src/styles/global.css` (append cursor styles)

**Interfaces:**
- Produces: default export `Cursor` (no props). Later consumed by `App.jsx` in Task 13.

- [ ] **Step 1: Create `src/components/Cursor.jsx`**

```jsx
import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dotRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(
      window.matchMedia("(hover: hover) and (pointer: fine)").matches
    );
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;

    function handleMove(event) {
      dot.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
    }

    function handleOver(event) {
      if (event.target.closest("a, button, [data-cursor-hover]")) {
        dot.classList.add("cursor-dot--active");
      }
    }

    function handleOut(event) {
      if (event.target.closest("a, button, [data-cursor-hover]")) {
        dot.classList.remove("cursor-dot--active");
      }
    }

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mouseout", handleOut);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mouseout", handleOut);
    };
  }, [enabled]);

  if (!enabled) return null;

  return <div ref={dotRef} className="cursor-dot" aria-hidden="true" />;
}
```

- [ ] **Step 2: Append cursor styles to `src/styles/global.css`**

```css

/* Cursor */
body:has(.cursor-dot),
body:has(.cursor-dot) a,
body:has(.cursor-dot) button {
  cursor: none;
}

.cursor-dot {
  position: fixed;
  top: 0;
  left: 0;
  width: 12px;
  height: 12px;
  margin-left: -6px;
  margin-top: -6px;
  border-radius: 50%;
  background: var(--accent);
  pointer-events: none;
  z-index: 9999;
  transition: width 0.2s ease, height 0.2s ease, margin 0.2s ease,
    background 0.2s ease, border 0.2s ease;
  will-change: transform;
}

.cursor-dot--active {
  width: 36px;
  height: 36px;
  margin-left: -18px;
  margin-top: -18px;
  background: transparent;
  border: 1.5px solid var(--accent);
}
```

- [ ] **Step 3: Temporarily mount it to verify** — in `src/App.jsx`, add `import Cursor from "./components/Cursor";` at the top and render `<Cursor />` as the very first child of the returned JSX (above the existing catalog markup). This is temporary wiring just to visually confirm the component works before Task 13 replaces the whole file.

- [ ] **Step 4: Verify**

Run: `npm run dev`, open `http://localhost:5173` in a desktop browser (mouse, not touch).
Expected: the default OS cursor disappears and a small gold dot follows the mouse. Hovering any link/button in the old catalog makes the dot expand into a ring. On a touch/mobile emulation (DevTools device toolbar), the dot never appears and the normal cursor/touch behavior is untouched.

- [ ] **Step 5: Commit**

```bash
git add src/components/Cursor.jsx src/styles/global.css src/App.jsx
git commit -m "feat: add custom cursor component"
```

---

### Task 4: Navigation bar

**Files:**
- Create: `src/components/Nav.jsx`
- Modify: `src/styles/global.css` (append nav styles)

**Interfaces:**
- Produces: default export `Nav` (no props). Anchors to `#top`, `#portfolio`, `#servicios`, `#filosofia`, `#consulta` — these IDs are produced by Hero (Task 5), Portfolio (Task 8), Servicios (Task 9), Filosofia (Task 10), Contacto (Task 11) respectively.

- [ ] **Step 1: Create `src/components/Nav.jsx`**

```jsx
import { useEffect, useState } from "react";

const LINKS = [
  { href: "#portfolio", label: "Portafolio" },
  { href: "#servicios", label: "Servicios" },
  { href: "#filosofia", label: "Filosofía" },
  { href: "#consulta", label: "Consulta" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 40);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`nav${scrolled ? " nav--scrolled" : ""}`}>
      <div className="container nav__inner">
        <a href="#top" className="nav__logo">
          SeronStudio
        </a>
        <nav className="nav__links">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <a href="#consulta" className="nav__cta">
          Iniciar Proyecto →
        </a>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Append nav styles to `src/styles/global.css`**

```css

/* Nav */
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: transparent;
  border-bottom: 1px solid transparent;
  transition: background 0.4s ease, border-color 0.4s ease,
    backdrop-filter 0.4s ease;
}

.nav--scrolled {
  background: rgba(10, 10, 10, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-subtle);
}

.nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
}

.nav__logo {
  font-family: var(--font-serif);
  font-size: 1.25rem;
  color: var(--text-primary);
  text-decoration: none;
}

.nav__links {
  display: flex;
  gap: 2rem;
}

.nav__links a {
  color: var(--text-primary);
  text-decoration: none;
  font-size: 0.9rem;
  opacity: 0.85;
  transition: opacity 0.2s ease, color 0.2s ease;
}

.nav__links a:hover {
  opacity: 1;
  color: var(--accent);
}

.nav__cta {
  border: 1px solid var(--accent);
  color: var(--accent);
  padding: 0.6rem 1.25rem;
  border-radius: 2px;
  text-decoration: none;
  font-size: 0.85rem;
  transition: background 0.2s ease, color 0.2s ease;
}

.nav__cta:hover {
  background: var(--accent);
  color: var(--bg-primary);
}

@media (max-width: 768px) {
  .nav__links {
    display: none;
  }
}
```

- [ ] **Step 3: Temporarily mount it to verify** — in `src/App.jsx`, add `import Nav from "./components/Nav";` and render `<Nav />` right after `<Cursor />`.

- [ ] **Step 4: Verify**

Run: `npm run dev`, open the page.
Expected: a sticky bar with "SeronStudio" (serif) on the left, four nav links in the middle, and a gold-bordered "Iniciar Proyecto →" button on the right. Scrolling down past ~40px gives the bar a blurred dark background and a visible bottom border. Below 768px width (DevTools responsive mode), the middle links disappear, leaving logo + CTA only. Clicking a link doesn't need to scroll anywhere correctly yet (targets don't exist until later tasks) — just confirm no console errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/Nav.jsx src/styles/global.css src/App.jsx
git commit -m "feat: add sticky nav bar"
```

---

### Task 5: Scroll-reveal hook + Hero section

**Files:**
- Create: `src/hooks/useScrollReveal.js`
- Create: `src/components/Hero.jsx`
- Modify: `src/styles/global.css` (append hero styles)

**Interfaces:**
- Produces: `useScrollReveal(options)` returning `[ref, isVisible]` (from `src/hooks/useScrollReveal.js`), and `revealClass(isVisible, extra)` returning a className string. Both are imported by every later section component (Metricas, Portfolio, Servicios, Filosofia, Contacto).
- Produces: default export `Hero` (no props), rendering `<section id="top">`.
- Consumes: `CONTACT.whatsappUrl` from `src/data/config.js` (Task 2).

- [ ] **Step 1: Create `src/hooks/useScrollReveal.js`**

```js
import { useEffect, useRef, useState } from "react";

export function useScrollReveal({ threshold = 0.15, rootMargin = "0px 0px -60px 0px" } = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, isVisible];
}

export function revealClass(isVisible, extra = "") {
  return `reveal${isVisible ? " is-visible" : ""}${extra ? ` ${extra}` : ""}`;
}
```

- [ ] **Step 2: Create `src/components/Hero.jsx`**

```jsx
import { CONTACT } from "../data/config";
import { useScrollReveal, revealClass } from "../hooks/useScrollReveal";

export default function Hero() {
  const [ref, isVisible] = useScrollReveal({ threshold: 0 });

  return (
    <section id="top" className="hero" ref={ref}>
      <div className="container hero__inner">
        <p className={revealClass(isVisible)}>Aceptando proyectos — 2025</p>
        <h1 className="hero__title">
          <span
            className={revealClass(isVisible, "hero__line")}
            style={{ transitionDelay: "0.1s" }}
          >
            Sitios web
          </span>
          <span
            className={revealClass(isVisible, "hero__line")}
            style={{ transitionDelay: "0.25s" }}
          >
            que convierten.
          </span>
          <span
            className={revealClass(isVisible, "hero__line")}
            style={{ transitionDelay: "0.4s" }}
          >
            Hechos a mano.
          </span>
        </h1>
        <p
          className={revealClass(isVisible, "hero__subtitle")}
          style={{ transitionDelay: "0.55s" }}
        >
          Un estudio privado que diseña y desarrolla experiencias digitales a
          medida para negocios en Argentina y Latinoamérica. Sin plantillas.
          Sin intermediarios.
        </p>
        <div
          className={revealClass(isVisible, "hero__ctas")}
          style={{ transitionDelay: "0.7s" }}
        >
          <a href="#portfolio" className="btn btn--primary">
            Ver Portfolio →
          </a>
          <a
            href={CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--ghost"
          >
            WhatsApp Directo →
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Append hero styles to `src/styles/global.css`**

```css

/* Hero */
.hero {
  padding: 8rem 0 6rem;
}

.hero__title {
  display: flex;
  flex-direction: column;
  font-family: var(--font-serif);
  font-size: clamp(2.75rem, 7vw, 5.5rem);
  line-height: 1.05;
  margin: 1rem 0 2rem;
}

.hero__subtitle {
  max-width: 46ch;
  color: var(--text-primary);
  opacity: 0.75;
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 2.5rem;
}

.hero__ctas {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}
```

- [ ] **Step 4: Temporarily mount it to verify** — in `src/App.jsx`, add `import Hero from "./components/Hero";` and render `<Hero />` right after `<Nav />`.

- [ ] **Step 5: Verify**

Run: `npm run dev`, open the page, refresh.
Expected: on load, the "Aceptando proyectos — 2025" tag, then the three title lines, then the subtitle, then the two CTA buttons animate in with a staggered fade+slide-up (each ~150ms after the previous). "WhatsApp Directo →" opens `https://wa.me/5493412665657` in a new tab. "Ver Portfolio →" points to `#portfolio` (target doesn't exist yet — fine for now).

- [ ] **Step 6: Commit**

```bash
git add src/hooks/useScrollReveal.js src/components/Hero.jsx src/styles/global.css src/App.jsx
git commit -m "feat: add scroll-reveal hook and hero section"
```

---

### Task 6: Ticker

**Files:**
- Create: `src/components/Ticker.jsx`
- Modify: `src/styles/global.css` (append ticker styles)

**Interfaces:**
- Produces: default export `Ticker` (no props).

- [ ] **Step 1: Create `src/components/Ticker.jsx`**

```jsx
const TICKER_ITEMS = [
  "Diseño a Medida",
  "Desarrollo Web",
  "SEO",
  "Mobile-First",
  "Sin Plantillas",
  "Resultados Medibles",
];

export default function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="ticker">
      <div className="ticker__track">
        {items.map((item, index) => (
          <span key={`${item}-${index}`} className="ticker__item">
            {item} <span className="ticker__dot">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Append ticker styles to `src/styles/global.css`**

```css

/* Ticker */
.ticker {
  background: var(--accent);
  overflow: hidden;
  padding: 0.85rem 0;
}

.ticker__track {
  display: flex;
  width: max-content;
  animation: marquee 22s linear infinite;
}

.ticker:hover .ticker__track {
  animation-play-state: paused;
}

.ticker__item {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--bg-primary);
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 0 1rem;
  white-space: nowrap;
}

.ticker__dot {
  opacity: 0.5;
}

@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
```

- [ ] **Step 3: Temporarily mount it to verify** — in `src/App.jsx`, add `import Ticker from "./components/Ticker";` and render `<Ticker />` right after `<Hero />`.

- [ ] **Step 4: Verify**

Run: `npm run dev`, open the page.
Expected: a gold band with black uppercase text scrolling left continuously with no visible seam/jump at the loop point. Hovering over the band pauses the scroll; moving the mouse away resumes it.

- [ ] **Step 5: Commit**

```bash
git add src/components/Ticker.jsx src/styles/global.css src/App.jsx
git commit -m "feat: add infinite ticker band"
```

---

### Task 7: Counter hook + Métricas section

**Files:**
- Create: `src/hooks/useCounter.js`
- Create: `src/components/Metricas.jsx`
- Modify: `src/styles/global.css` (append métricas styles)

**Interfaces:**
- Produces: `useCounter(target, { duration, startWhen })` returning a number, from `src/hooks/useCounter.js`.
- Produces: default export `Metricas` (no props).
- Consumes: `useScrollReveal`/`revealClass` from Task 5.

- [ ] **Step 1: Create `src/hooks/useCounter.js`**

```js
import { useEffect, useRef, useState } from "react";

export function useCounter(target, { duration = 1200, startWhen = true } = {}) {
  const [value, setValue] = useState(0);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!startWhen) return undefined;

    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    }

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, duration, startWhen]);

  return value;
}
```

- [ ] **Step 2: Create `src/components/Metricas.jsx`**

```jsx
import { useScrollReveal, revealClass } from "../hooks/useScrollReveal";
import { useCounter } from "../hooks/useCounter";

const METRICAS = [
  { target: 12, suffix: "+", label: "Proyectos" },
  { target: 8, suffix: "", label: "Industrias" },
  { target: 100, suffix: "%", label: "A Medida" },
  { target: 1, suffix: ":1", label: "Atención Directa" },
];

function Metrica({ target, suffix, label, startWhen }) {
  const value = useCounter(target, { startWhen });
  return (
    <div className="metrica">
      <span className="metrica__valor">
        {value}
        {suffix}
      </span>
      <span className="metrica__label">{label}</span>
    </div>
  );
}

export default function Metricas() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section className="metricas" ref={ref}>
      <div className={`container metricas__grid ${revealClass(isVisible)}`}>
        {METRICAS.map((metrica) => (
          <Metrica key={metrica.label} {...metrica} startWhen={isVisible} />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Append métricas styles to `src/styles/global.css`**

```css

/* Metricas */
.metricas {
  padding: 4rem 0;
  border-bottom: 1px solid var(--border-subtle);
}

.metricas__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.metrica {
  position: relative;
  text-align: center;
  padding: 1.5rem;
}

.metrica::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.5rem;
  bottom: 0.5rem;
  width: 1px;
  background: var(--border-subtle);
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.6s ease;
}

.metrica:first-child::before {
  display: none;
}

.metricas__grid.is-visible .metrica::before {
  transform: scaleY(1);
}

.metrica__valor {
  display: block;
  font-family: var(--font-serif);
  font-size: 2.75rem;
  color: var(--accent);
}

.metrica__label {
  display: block;
  margin-top: 0.5rem;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-primary);
  opacity: 0.75;
}

@media (max-width: 768px) {
  .metricas__grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .metrica:nth-child(2)::before {
    display: none;
  }
}
```

- [ ] **Step 4: Temporarily mount it to verify** — in `src/App.jsx`, add `import Metricas from "./components/Metricas";` and render `<Metricas />` right after `<Ticker />`.

- [ ] **Step 5: Verify**

Run: `npm run dev`, open the page, scroll down to the métricas section.
Expected: the four numbers count up from 0 to their targets (12+, 8, 100%, 1:1) over about a second when the section enters the viewport, and the thin divider lines between columns animate in (grow from top to bottom). Resize to mobile width: layout becomes 2×2.

- [ ] **Step 6: Commit**

```bash
git add src/hooks/useCounter.js src/components/Metricas.jsx src/styles/global.css src/App.jsx
git commit -m "feat: add counter hook and metricas section"
```

---

### Task 8: Portfolio grid

**Files:**
- Create: `src/components/PortfolioCard.jsx`
- Create: `src/components/Portfolio.jsx`
- Modify: `src/styles/global.css` (append portfolio styles)

**Interfaces:**
- Produces: default export `PortfolioCard` (prop: `caso` — one item shape from `src/data/portfolio.js`). Default export `Portfolio` (no props), rendering `<section id="portfolio">`.
- Consumes: `portfolio` from `src/data/portfolio.js` (Task 2), `useScrollReveal`/`revealClass` from Task 5.

- [ ] **Step 1: Create `src/components/PortfolioCard.jsx`**

```jsx
import { useScrollReveal, revealClass } from "../hooks/useScrollReveal";

export default function PortfolioCard({ caso }) {
  const [ref, isVisible] = useScrollReveal();
  const isExternal = caso.url.startsWith("http");

  return (
    <a
      ref={ref}
      href={caso.url}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={revealClass(isVisible, "portfolio-card")}
      style={{ background: caso.gradient }}
    >
      <span className="portfolio-card__numero" aria-hidden="true">
        {caso.numero}
      </span>
      <div className="portfolio-card__body">
        <span className="portfolio-card__industria">{caso.industria}</span>
        <h3 className="portfolio-card__nombre">{caso.nombre}</h3>
        <p className="portfolio-card__descripcion">{caso.descripcion}</p>
        <span className="portfolio-card__link">Ver Proyecto →</span>
      </div>
    </a>
  );
}
```

- [ ] **Step 2: Create `src/components/Portfolio.jsx`**

```jsx
import { portfolio } from "../data/portfolio";
import { useScrollReveal, revealClass } from "../hooks/useScrollReveal";
import PortfolioCard from "./PortfolioCard";

export default function Portfolio() {
  const [headingRef, headingVisible] = useScrollReveal();

  return (
    <section id="portfolio" className="portfolio">
      <div className="container">
        <div ref={headingRef} className={revealClass(headingVisible)}>
          <h2 className="section-title">El Portfolio</h2>
          <p className="section-subtitle">
            Una selección de trabajos recientes.
          </p>
        </div>
        <div className="portfolio__grid">
          {portfolio.map((caso) => (
            <PortfolioCard key={caso.numero} caso={caso} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Append portfolio styles to `src/styles/global.css`**

```css

/* Portfolio */
.portfolio {
  padding: 6rem 0;
}

.portfolio__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.portfolio-card {
  position: relative;
  display: block;
  aspect-ratio: 16 / 9;
  border-radius: 4px;
  overflow: hidden;
  text-decoration: none;
  border: 1px solid var(--border-subtle);
  transition: border-color 0.4s ease;
}

.portfolio-card::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.75) 0%,
    rgba(0, 0, 0, 0.2) 60%,
    rgba(0, 0, 0, 0.4) 100%
  );
  transition: opacity 0.4s ease;
}

.portfolio-card__numero {
  position: absolute;
  top: -0.5rem;
  right: 1rem;
  font-family: var(--font-serif);
  font-size: 8rem;
  color: var(--text-primary);
  opacity: 0.05;
  z-index: 1;
  line-height: 1;
}

.portfolio-card__body {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 2rem;
}

.portfolio-card__industria {
  color: var(--accent);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
}

.portfolio-card__nombre {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  color: var(--text-primary);
  margin: 0 0 0.5rem;
}

.portfolio-card__descripcion {
  color: var(--text-primary);
  opacity: 0.8;
  font-size: 0.9rem;
  max-width: 32ch;
  margin: 0 0 1rem;
}

.portfolio-card__link {
  color: var(--accent);
  font-size: 0.85rem;
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.portfolio-card:hover {
  border-color: var(--accent);
}

.portfolio-card:hover .portfolio-card__link {
  opacity: 1;
  transform: translateY(0);
}

.portfolio-card:hover::after {
  opacity: 0.6;
}

@media (max-width: 900px) {
  .portfolio__grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 4: Temporarily mount it to verify** — in `src/App.jsx`, add `import Portfolio from "./components/Portfolio";` and render `<Portfolio />` right after `<Metricas />`.

- [ ] **Step 5: Verify**

Run: `npm run dev`, open the page, scroll to "El Portfolio".
Expected: 6 cards in a 2-column grid (1 column under 900px), each with a large faint number in the top-right corner, a colored gradient background, industry label, serif project name, 2-line description. Hovering a card brightens the border to gold and reveals "Ver Proyecto →". Clicking `#portfolio` from the nav now actually scrolls here.

- [ ] **Step 6: Commit**

```bash
git add src/components/PortfolioCard.jsx src/components/Portfolio.jsx src/styles/global.css src/App.jsx
git commit -m "feat: add portfolio grid section"
```

---

### Task 9: Servicios section

**Files:**
- Create: `src/components/Servicios.jsx`
- Modify: `src/styles/global.css` (append servicios styles)

**Interfaces:**
- Produces: default export `Servicios` (no props), rendering `<section id="servicios">`.
- Consumes: `servicios` from `src/data/servicios.js` (Task 2), `useScrollReveal`/`revealClass` from Task 5.

- [ ] **Step 1: Create `src/components/Servicios.jsx`**

```jsx
import { servicios } from "../data/servicios";
import { useScrollReveal, revealClass } from "../hooks/useScrollReveal";

export default function Servicios() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section id="servicios" className="servicios" ref={ref}>
      <div className={`container ${revealClass(isVisible)}`}>
        <h2 className="section-title">Lo que construyo</h2>
        <ul className="servicios__lista">
          {servicios.map((servicio) => (
            <li key={servicio.numero} className="servicios__item">
              <span className="servicios__numero">{servicio.numero}</span>
              <span className="servicios__nombre">{servicio.nombre}</span>
              <span className="servicios__flecha" aria-hidden="true">
                →
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Append servicios styles to `src/styles/global.css`**

```css

/* Servicios */
.servicios {
  padding: 6rem 0;
  border-top: 1px solid var(--border-subtle);
}

.servicios__lista {
  list-style: none;
  margin: 3rem 0 0;
  padding: 0;
}

.servicios__item {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.75rem 0;
  border-bottom: 1px solid var(--border-subtle);
  font-family: var(--font-serif);
  font-size: 1.75rem;
  color: var(--text-primary);
  transition: color 0.3s ease;
}

.servicios__numero {
  font-family: var(--font-sans);
  font-size: 0.9rem;
  color: var(--accent);
}

.servicios__nombre {
  flex: 1;
}

.servicios__flecha {
  color: var(--accent);
  font-family: var(--font-sans);
  opacity: 0;
  transform: translateX(-8px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.servicios__item:hover {
  color: var(--accent);
}

.servicios__item:hover .servicios__flecha {
  opacity: 1;
  transform: translateX(0);
}

@media (max-width: 768px) {
  .servicios__item {
    font-size: 1.25rem;
  }
}
```

- [ ] **Step 3: Temporarily mount it to verify** — in `src/App.jsx`, add `import Servicios from "./components/Servicios";` and render `<Servicios />` right after `<Portfolio />`.

- [ ] **Step 4: Verify**

Run: `npm run dev`, open the page, scroll to "Lo que construyo".
Expected: 5 numbered rows separated by thin lines. Hovering a row turns its text gold and slides a "→" in from the left.

- [ ] **Step 5: Commit**

```bash
git add src/components/Servicios.jsx src/styles/global.css src/App.jsx
git commit -m "feat: add servicios list section"
```

---

### Task 10: Filosofía section

**Files:**
- Create: `src/components/Filosofia.jsx`
- Modify: `src/styles/global.css` (append filosofía styles)

**Interfaces:**
- Produces: default export `Filosofia` (no props), rendering `<section id="filosofia">`.
- Consumes: `useScrollReveal`/`revealClass` from Task 5.

- [ ] **Step 1: Create `src/components/Filosofia.jsx`**

```jsx
import { useScrollReveal, revealClass } from "../hooks/useScrollReveal";

const DIFERENCIALES = [
  "Sin plantillas descargadas",
  "Código limpio y escalable",
  "Entrega en tiempo acordado",
  "Soporte post-lanzamiento",
  "Un cliente a la vez",
];

export default function Filosofia() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section id="filosofia" className="filosofia" ref={ref}>
      <div className={`container filosofia__grid ${revealClass(isVisible)}`}>
        <div className="filosofia__texto">
          <h2 className="section-title">El estándar es el trabajo mismo.</h2>
          <p>
            Trabajo directamente con cada cliente — sin capas, sin
            intermediarios. Cada proyecto comienza con una pregunta: ¿qué
            merece sentir esta marca? La respuesta da forma a cada pixel,
            cada línea de código y cada conversión.
          </p>
        </div>
        <ul className="filosofia__lista">
          {DIFERENCIALES.map((item) => (
            <li key={item}>
              <span className="filosofia__punto" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Append filosofía styles to `src/styles/global.css`**

```css

/* Filosofia */
.filosofia {
  padding: 6rem 0;
  border-top: 1px solid var(--border-subtle);
}

.filosofia__grid {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 4rem;
  align-items: start;
}

.filosofia__texto p {
  color: var(--text-primary);
  opacity: 0.8;
  line-height: 1.8;
  font-size: 1.1rem;
  margin-top: 1.5rem;
}

.filosofia__lista {
  list-style: none;
  margin: 0;
  padding: 0;
}

.filosofia__lista li {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 0.9rem 0;
  border-bottom: 1px solid var(--border-subtle);
  color: var(--text-primary);
  opacity: 0.85;
}

.filosofia__punto {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  flex-shrink: 0;
}

@media (max-width: 900px) {
  .filosofia__grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 3: Temporarily mount it to verify** — in `src/App.jsx`, add `import Filosofia from "./components/Filosofia";` and render `<Filosofia />` right after `<Servicios />`.

- [ ] **Step 4: Verify**

Run: `npm run dev`, open the page, scroll to "El estándar es el trabajo mismo."
Expected: two-column layout (text left, bullet list right) on desktop, stacked on narrow screens (below 900px). Each bullet has a small gold dot.

- [ ] **Step 5: Commit**

```bash
git add src/components/Filosofia.jsx src/styles/global.css src/App.jsx
git commit -m "feat: add filosofia section"
```

---

### Task 11: Contact section with Web3Forms

**Files:**
- Create: `src/components/Contacto.jsx`
- Modify: `src/styles/global.css` (append contacto styles)

**Interfaces:**
- Produces: default export `Contacto` (no props), rendering `<section id="consulta">`.
- Consumes: `CONTACT`, `WEB3FORMS_ACCESS_KEY` from `src/data/config.js` (Task 2), `useScrollReveal`/`revealClass` from Task 5.

- [ ] **Step 1: Create `src/components/Contacto.jsx`**

```jsx
import { useState } from "react";
import { CONTACT, WEB3FORMS_ACCESS_KEY } from "../data/config";
import { useScrollReveal, revealClass } from "../hooks/useScrollReveal";

const TIPOS_PROYECTO = [
  "Sitio de Marca Completo",
  "Landing Page de Captación",
  "E-commerce",
  "Rediseño y Optimización",
  "Mantenimiento y Soporte",
];

export default function Contacto() {
  const [ref, isVisible] = useScrollReveal();
  const [status, setStatus] = useState("idle");

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("sending");

    const formData = new FormData(event.target);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (result.success) {
        setStatus("success");
        event.target.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="consulta" className="contacto" ref={ref}>
      <div className={`container contacto__grid ${revealClass(isVisible)}`}>
        <div className="contacto__intro">
          <h2 className="section-title">Hablemos.</h2>
          <p className="section-subtitle">
            Cada proyecto merece una conversación real.
          </p>

          <form className="contacto__form" onSubmit={handleSubmit}>
            <label className="contacto__campo">
              <span>01 · Nombre</span>
              <input type="text" name="name" required />
            </label>

            <label className="contacto__campo">
              <span>02 · Email</span>
              <input type="email" name="email" required />
            </label>

            <label className="contacto__campo">
              <span>03 · Tipo de Proyecto</span>
              <select name="tipo_proyecto" required defaultValue="">
                <option value="" disabled>
                  Elegí una opción
                </option>
                {TIPOS_PROYECTO.map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {tipo}
                  </option>
                ))}
              </select>
            </label>

            <label className="contacto__campo">
              <span>04 · Contame sobre tu negocio</span>
              <textarea name="mensaje" rows="4" required />
            </label>

            <button
              type="submit"
              className="btn btn--primary"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Enviando…" : "Enviar Consulta →"}
            </button>

            {status === "success" && (
              <p className="contacto__estado contacto__estado--ok">
                Recibido. Te respondo en menos de 24hs.
              </p>
            )}
            {status === "error" && (
              <p className="contacto__estado contacto__estado--error">
                Algo falló. Escribime directo a {CONTACT.email}.
              </p>
            )}
          </form>
        </div>

        <div className="contacto__aside">
          <a
            href={CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--ghost"
          >
            WhatsApp Directo →
          </a>
          <p className="contacto__nota">
            Respuesta personal en menos de 24hs.
          </p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Append contacto styles to `src/styles/global.css`**

```css

/* Contacto */
.contacto {
  padding: 6rem 0;
  border-top: 1px solid var(--border-subtle);
}

.contacto__grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 4rem;
}

.contacto__form {
  margin-top: 2rem;
  display: grid;
  gap: 1.5rem;
}

.contacto__campo {
  display: grid;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--text-primary);
  opacity: 0.85;
}

.contacto__campo input,
.contacto__campo select,
.contacto__campo textarea {
  background: var(--bg-secondary);
  border: 1px solid var(--border-subtle);
  color: var(--text-primary);
  padding: 0.75rem;
  font-family: var(--font-sans);
  font-size: 0.95rem;
  border-radius: 2px;
}

.contacto__campo input:focus,
.contacto__campo select:focus,
.contacto__campo textarea:focus {
  outline: none;
  border-color: var(--accent);
}

.contacto__estado {
  font-size: 0.85rem;
}

.contacto__estado--ok {
  color: var(--accent);
}

.contacto__estado--error {
  color: #e07a5f;
}

.contacto__aside {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  padding-top: 3.5rem;
}

.contacto__nota {
  color: var(--text-primary);
  opacity: 0.6;
  font-size: 0.85rem;
}

@media (max-width: 900px) {
  .contacto__grid {
    grid-template-columns: 1fr;
  }
  .contacto__aside {
    padding-top: 0;
  }
}
```

- [ ] **Step 3: Temporarily mount it to verify** — in `src/App.jsx`, add `import Contacto from "./components/Contacto";` and render `<Contacto />` right after `<Filosofia />`.

- [ ] **Step 4: Verify**

Run: `npm run dev`, open the page, scroll to "Hablemos."
Expected: numbered form fields render correctly, required-field validation blocks submit when empty, and clicking submit with the placeholder access key shows the button go to "Enviando…" then the error state ("Algo falló. Escribime directo a soporte.seronstudio@gmail.com.") since `WEB3FORMS_ACCESS_KEY` is still a placeholder — that error path is the expected behavior until Task 2's `TODO` is resolved with a real key. "WhatsApp Directo →" opens the real wa.me link.

- [ ] **Step 5: Commit**

```bash
git add src/components/Contacto.jsx src/styles/global.css src/App.jsx
git commit -m "feat: add contact section with Web3Forms integration"
```

---

### Task 12: Footer

**Files:**
- Create: `src/components/Footer.jsx`
- Modify: `src/styles/global.css` (append footer styles)

**Interfaces:**
- Produces: default export `Footer` (no props).

- [ ] **Step 1: Create `src/components/Footer.jsx`**

```jsx
const FOOTER_LINKS = [
  { href: "#portfolio", label: "Portafolio" },
  { href: "#servicios", label: "Servicios" },
  { href: "#filosofia", label: "Filosofía" },
  { href: "#consulta", label: "Consulta" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <p className="footer__logo">SeronStudio</p>
          <p className="footer__tagline">Estudio Digital a Medida</p>
        </div>
        <nav className="footer__links">
          {FOOTER_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="footer__legal">
          <p>© 2025 SeronStudio. Todos los derechos reservados.</p>
          <p>Por cita únicamente.</p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Append footer styles to `src/styles/global.css`**

```css

/* Footer */
.footer {
  padding: 3rem 0;
  border-top: 1px solid var(--border-subtle);
}

.footer__inner {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 2rem;
}

.footer__logo {
  font-family: var(--font-serif);
  font-size: 1.1rem;
  color: var(--text-primary);
  margin: 0;
}

.footer__tagline {
  color: var(--text-primary);
  opacity: 0.6;
  font-size: 0.85rem;
  margin: 0.25rem 0 0;
}

.footer__links {
  display: flex;
  gap: 1.5rem;
}

.footer__links a {
  color: var(--text-primary);
  opacity: 0.75;
  text-decoration: none;
  font-size: 0.85rem;
}

.footer__links a:hover {
  opacity: 1;
  color: var(--accent);
}

.footer__legal {
  text-align: right;
  color: var(--text-primary);
  opacity: 0.5;
  font-size: 0.8rem;
}

@media (max-width: 640px) {
  .footer__legal {
    text-align: left;
  }
}
```

- [ ] **Step 3: Temporarily mount it to verify** — in `src/App.jsx`, add `import Footer from "./components/Footer";` and render `<Footer />` right after `<Contacto />`.

- [ ] **Step 4: Verify**

Run: `npm run dev`, open the page, scroll to the bottom.
Expected: logo + tagline, nav links, copyright + "Por cita únicamente." aligned right on desktop, left on narrow screens.

- [ ] **Step 5: Commit**

```bash
git add src/components/Footer.jsx src/styles/global.css src/App.jsx
git commit -m "feat: add footer section"
```

---

### Task 13: Replace App.jsx with the final SeronStudio assembly

By this point `src/App.jsx` has been incrementally patched with temporary imports/renders on top of the old HyS catalog body. This task deletes all of that leftover catalog code and leaves only the clean SeronStudio assembly.

**Files:**
- Modify: `src/App.jsx` (full rewrite)

**Interfaces:**
- Consumes: every component from Tasks 3–12 (`Cursor`, `Nav`, `Hero`, `Ticker`, `Metricas`, `Portfolio`, `Servicios`, `Filosofia`, `Contacto`, `Footer`).

- [ ] **Step 1: Replace the entire contents of `src/App.jsx`**

```jsx
import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import Metricas from "./components/Metricas";
import Portfolio from "./components/Portfolio";
import Servicios from "./components/Servicios";
import Filosofia from "./components/Filosofia";
import Contacto from "./components/Contacto";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Cursor />
      <Nav />
      <Hero />
      <Ticker />
      <Metricas />
      <Portfolio />
      <Servicios />
      <Filosofia />
      <Contacto />
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Remove the now-unused product images import path check** — confirm nothing else in `src/` imports from `src/assets/products/`:

Run: `grep -r "assets/products" src --include="*.jsx" --include="*.js"`
Expected: no output (no remaining references). The image files themselves stay on disk per the spec (not deleted).

- [ ] **Step 3: Verify**

Run: `npm run dev`, open `http://localhost:5173`.
Expected: the full SeronStudio page renders top to bottom exactly as verified in Tasks 3–12, with zero leftover HyS catalog markup, zero console errors/warnings. Click every nav link and confirm smooth-scroll to the matching section (`#top`, `#portfolio`, `#servicios`, `#filosofia`, `#consulta`).

- [ ] **Step 4: Commit**

```bash
git add src/App.jsx
git commit -m "feat: assemble final SeronStudio page, remove HyS catalog"
```

---

### Task 14: Build verification and responsive pass

**Files:** none (verification only).

- [ ] **Step 1: Production build**

Run: `npm run build`
Expected: build completes with no errors. Note any warnings about chunk size — expected to be small for this project; no action needed unless the build actually fails.

- [ ] **Step 2: Preview the production build**

Run: `npm run preview`
Expected: server starts (typically `http://localhost:4173`); open it and spot-check the page loads identically to `npm run dev`.

- [ ] **Step 3: Responsive pass**

In the browser DevTools device toolbar, check the page at 375px (mobile), 768px (tablet), and 1440px (desktop) widths. Confirm: nav collapses to logo+CTA under 768px, métricas grid becomes 2×2 under 768px, portfolio grid becomes 1 column under 900px, filosofía and contacto grids stack under 900px, no horizontal scrollbar appears at any width, custom cursor is absent when touch emulation is active.

- [ ] **Step 4: Stop the preview server**

Press `Ctrl+C` in the terminal running `npm run preview`.

- [ ] **Step 5: Final commit (only if the responsive pass required fixes)**

If Step 3 surfaced any layout bug, fix it directly in the relevant component/CSS block from its originating task, then:

```bash
git add -A
git commit -m "fix: responsive adjustments after full-site QA pass"
```

If no fixes were needed, skip this step — there is nothing to commit.

---

## Post-plan follow-up (not part of this plan's tasks)

- The user must generate a real Web3Forms `access_key` at web3forms.com using `soporte.seronstudio@gmail.com` and replace the placeholder in `src/data/config.js`.
- Real portfolio case studies (images, names, links) can replace the placeholders in `src/data/portfolio.js` whenever the user has them.
