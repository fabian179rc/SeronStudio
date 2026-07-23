import { useScrollReveal, revealClass } from "../hooks/useScrollReveal";

export default function Inversion() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section className="inversion" ref={ref}>
      <div className={`container inversion__inner ${revealClass(isVisible)}`}>
        <h2 className="section-title">Invertí en tu web. Hacé crecer tu negocio.</h2>
        <p>
          La pregunta real no es si necesitás una web — es cuánto te está
          costando no tenerla. Cada semana sin una presencia digital que
          trabaje bien, hay consultas que se van sin que te enteres. Una
          página bien construida empieza a trabajar desde el día uno: no
          tiene horarios, no se toma vacaciones, no necesita que vos
          expliques nada.
        </p>
      </div>
    </section>
  );
}
