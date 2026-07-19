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
    >
      <div
        className="portfolio-card__media"
        style={{
          background: caso.gradient,
          aspectRatio: caso.aspectRatio || "16 / 9",
        }}
      >
        {caso.image && (
          <img
            className="portfolio-card__image"
            src={caso.image}
            alt={caso.nombre}
          />
        )}
      </div>
      <div className="portfolio-card__body">
        <span className="portfolio-card__industria">{caso.industria}</span>
        <h3 className="portfolio-card__nombre">{caso.nombre}</h3>
        <p className="portfolio-card__descripcion">{caso.descripcion}</p>
        <span className="portfolio-card__link">Ver Proyecto →</span>
      </div>
    </a>
  );
}
