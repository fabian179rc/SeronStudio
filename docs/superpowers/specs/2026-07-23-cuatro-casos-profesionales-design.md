# Cuatro casos de portfolio — Abogados, Inmobiliaria, Veterinaria, Psicólogos

**Fecha:** 2026-07-23
**Estado:** Aprobado por usuario, pendiente de plan de implementación

## Contexto

El portfolio (`src/data/portfolio.js`) tiene 6 casos (01-06), el último recién agregado ("Chispa & Caño 24hs", caso 06). El usuario pidió agregar 4 casos nuevos (07-10) apuntando a rubros con alta demanda de sitios web en Argentina, elegidos junto con Claude en la conversación: Abogados, Inmobiliaria, Veterinaria y Psicólogos. Son marcas ficticias, igual que los casos de Servicios y el original "La Mano Confiable".

Los 4 casos comparten exactamente el mismo patrón técnico que los 5 casos ya construidos a mano (Helados Panda, Chispa & Caño 24hs): página estática autocontenida en `public/casos/<slug>/index.html`, referenciada desde `portfolio.js` vía el campo `preview`, mostrada en `<iframe>` por `PortfolioCard.jsx` / `PortfolioPreviewModal.jsx` (sin cambios en esos componentes). Por eso este spec cubre los 4 en un solo documento en vez de 4 documentos separados — el "cómo" es idéntico, solo cambia el contenido y la paleta de cada uno.

## Decisión de alcance

Se **agregan** 4 casos nuevos al final del array (`numero: "07"` a `"10"`). No se modifica ningún caso existente (01-06).

## Los 4 casos

### 07 — Abogados: "Bianchi & Asociados"
- **Industria:** Servicios Legales
- **Ángulo:** confianza y trayectoria, no urgencia. Consulta inicial sin cargo, especialización en laboral / familia / accidentes de tránsito, casos ganados como prueba social.
- **CTA principal:** WhatsApp + formulario de consulta (no "llamar ahora" — el usuario busca privacidad, no resolución instantánea).
- **Paleta:** azul marino oscuro + dorado (`--navy: #0d1b2e`, `--gold: #c9a24b`).
- **Secciones:** header con logo + WhatsApp, hero (titular de confianza + CTA de consulta gratuita), áreas de práctica (3-4 especialidades en tarjetas), por qué elegirnos (años de trayectoria, casos resueltos, primera consulta sin cargo, respuesta rápida), testimonios (3), equipo breve (1-2 abogados con foto placeholder/iniciales), CTA final, footer con matrícula (Tomo/Folio ficticio).

### 08 — Inmobiliaria: "Horizonte Propiedades"
- **Industria:** Inmobiliaria
- **Ángulo:** catálogo de propiedades destacadas + tasación gratuita.
- **CTA principal:** WhatsApp + botón "Tasá tu propiedad gratis".
- **Paleta:** grafito oscuro + terracota/cobre (`--graphite: #1c1815`, `--terracotta: #c4693a`).
- **Secciones:** header con logo + WhatsApp, hero (titular + buscador simulado de propiedades, deshabilitado), propiedades destacadas (grid de 3-4 tarjetas con gradiente como imagen placeholder, precio, ambientes, ubicación), servicios (venta, alquiler, tasaciones, inversión), por qué elegirnos, testimonios, CTA de tasación gratis, footer.

### 09 — Veterinaria: "Vitalpet"
- **Industria:** Veterinaria
- **Ángulo:** turnos online + atención de urgencias, cercanía y cuidado del vínculo con la mascota.
- **CTA principal:** WhatsApp para turnos + botón de llamada para emergencias.
- **Paleta:** verde azulado / teal + durazno suave (`--teal: #0f3d3e`, `--peach: #f2a679`).
- **Secciones:** header con logo + WhatsApp, hero (titular cálido + doble CTA turno/emergencia), servicios (consultas, vacunación, cirugías, internación, peluquería), por qué elegirnos, testimonios con nombre de mascota, franja de emergencias 24hs, CTA final, footer con matrícula veterinaria ficticia.

### 10 — Psicólogos: "Espacio Psicológico"
- **Industria:** Salud Mental
- **Ángulo:** primera consulta, calidez y confidencialidad. Tono bajo, sin CTAs agresivos ni urgencia.
- **CTA principal:** WhatsApp discreto / formulario de contacto ("Escribime" en vez de "Llamar ahora").
- **Paleta:** verde salvia + beige cálido (`--sage: #4a5a45`, `--cream: #ece3d3`), fondo más claro que el resto del portfolio (los otros casos usan fondo oscuro; acá un fondo claro/cálido refuerza la calidez terapéutica — es una excepción intencional al patrón oscuro del resto del muestrario).
- **Secciones:** header simple (nombre + "Escribime"), hero (titular cálido, subtítulo sobre modalidad online/presencial, CTA suave), enfoque/modalidades (terapia individual, online, presencial, primera consulta), por qué elegir este espacio (confidencialidad, escucha, flexibilidad horaria), testimonios anónimos (iniciales, no nombres completos, coherente con confidencialidad), FAQ corta (¿cómo es la primera sesión?, ¿es online?, ¿es confidencial?), CTA final suave, footer con matrícula profesional ficticia.

## Sistema de diseño compartido

Mismo enfoque técnico que "Chispa & Caño 24hs": HTML autocontenido, CSS inline con custom properties por caso, Google Fonts, sin JS más allá de detalles menores de interacción, y el mismo script de bloqueo de clicks/submits al final del `<body>` para que el `<iframe>` de preview no navegue.

## Implementación técnica

Para cada uno de los 4 casos:
- Crear `public/casos/<slug>/index.html` (slugs: `abogados`, `inmobiliaria`, `veterinaria`, `psicologos`).
- Agregar entrada al final de `src/data/portfolio.js` con `numero` correlativo ("07" a "10"), `industria`, `nombre`, `descripcion`, `gradient` (coherente con la paleta de cada caso), `aspectRatio: "3 / 2"` como valor de partida (mismo criterio que en Chispa & Caño: se ajusta si el hero se corta al verlo en el navegador), `preview: "/casos/<slug>/index.html"`.

## Fuera de alcance

- No se modifican los casos 01-06 existentes.
- No hay backend real ni envío de formularios/WhatsApp funcional (son landings de portfolio, no sitios en producción).
- No se usa React/Vite para estas páginas — HTML estático autocontenido, igual que el resto de los casos "hechos a mano".
- No se generan imágenes/fotos reales — se usan gradientes CSS e iconografía emoji/CSS, igual que los casos anteriores.
