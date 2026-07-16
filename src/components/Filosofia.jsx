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
