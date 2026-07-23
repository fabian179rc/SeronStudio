import { servicios } from "../data/servicios";
import { useScrollReveal, revealClass } from "../hooks/useScrollReveal";

export default function Servicios() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section id="servicios" className="servicios" ref={ref}>
      <div className={`container ${revealClass(isVisible)}`}>
        <h2 className="section-title">Lo que construimos</h2>
        <ul className="servicios__lista">
          {servicios.map((servicio) => (
            <li key={servicio.numero} className="servicios__item">
              <span className="servicios__numero">{servicio.numero}</span>
              <div className="servicios__texto">
                <span className="servicios__nombre">{servicio.nombre}</span>
                <p className="servicios__descripcion">{servicio.descripcion}</p>
              </div>
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
