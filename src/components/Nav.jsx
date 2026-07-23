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
          <img src="/assets/logo.jpeg" alt="Seron Studio" className="nav__logo-img" />
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
