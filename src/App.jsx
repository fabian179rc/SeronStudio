import React, { useState } from "react";
import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import Metricas from "./components/Metricas";
import Portfolio from "./components/Portfolio";
import Servicios from "./components/Servicios";
import Filosofia from "./components/Filosofia";
import megaPackImg from "./assets/products/mega-pack.webp";
import capacitacionesImg from "./assets/products/capacitaciones.webp";
import auditoriasImg from "./assets/products/auditorias.webp";
import inspeccionesImg from "./assets/products/inspecciones.webp";
import programasSeguridadImg from "./assets/products/programas-seguridad.webp";
import emergenciasImg from "./assets/products/emergencias.webp";

export default function CatalogoProductosProfesional() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    {
      id: 1,
      title: "Sistema Maestro Higiene y Seguridad Blindada",
      category: "Premium",
      description:
        "Todo lo que un profesional de Higiene y Seguridad necesita para gestionar inspecciones, auditorías, informes, protocolos y documentación preventiva de forma rápida, ordenada y profesional.",
      fullDescription:
        "El bundle ultimate. Todos los sistemas integrados + actualizaciones legales anuales + acceso a comunidad de profesionales + webinars de perfeccionamiento. Una inversión única para convertirte en referente de tu industria.",
      url: "https://sistemamaestrohys.tupuntodigital.shop/",
      mockupGradient: "linear-gradient(135deg, #0d7fbf 0%, #0a5f99 100%)",
      icon: "👑",
      image: megaPackImg,
    },
    {
      id: 2,
      title: "SISTEMA MAESTRO DE CAPACITACIONES",
      category: "Capacitación",
      description:
        "Sistema práctico para planificar, dictar y documentar capacitaciones de Higiene y Seguridad con temarios, registros, evaluaciones y checklists para ahorrar tiempo y demostrar gestión preventiva.",
      fullDescription:
        "Todo el material de capacitación que necesitás, listo para dictar. +120 capacitaciones (trabajo en altura, EPP, prevención de incendios, primeros auxiliares, riesgo eléctrico, sustancias químicas y más), presentaciones en diapositivas, certificados editables y planillas de registro.",
      url: "#",
      mockupGradient: "linear-gradient(135deg, #2c3e50 0%, #1a252f 100%)",
      icon: "🎓",
      image: capacitacionesImg,
    },
    {
      id: 3,
      title: "Sistema Maestro de Auditorías",
      category: "Auditorías",
      description:
        "Un sistema completo para transformar recorridas preventivas en auditorías claras, trazables y defendibles ante clientes, ART, SRT e inspecciones.",
      fullDescription:
        "Metodología de auditoría con rigor y autoridad. Planificación de auditorías, matriz de auditoría integrada, redacción de hallazgos técnicos vs. mediocres, plan de acciones correctivas y trazabilidad de cierre.",
      url: "https://maestrodeauditor.tupuntodigital.shop",
      mockupGradient: "linear-gradient(135deg, #ff9a56 0%, #ff6a88 100%)",
      icon: "✓",
      image: auditoriasImg,
    },
    {
      id: 4,
      title: "Sistema Maestro de Inspecciones",
      category: "Control de Campo",
      description:
        "Inspecciones más ordenadas, documentadas y profesionales con checklists, informes y guías listas para aplicar en campo.",
      fullDescription:
        "De patrullas informales a inspecciones sistemáticas. Diseño de checklist por riesgo, entrenamiento de inspectores, redacción profesional de desvíos con fotoevidencia, seguimiento de acciones y reportes para la gerencia.",
      url: "https://maestrodeinspecciones.tupuntodigital.shop",
      mockupGradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      icon: "🔎",
      image: inspeccionesImg,
    },
    {
      id: 5,
      title: "Sistema Maestro de Programas de Seguridad",
      category: "Documentación",
      description:
        "Método de ingeniería documental para redactar programas de seguridad que resisten una inspección de la SRT/ART. Diagnóstico de obra, matriz de riesgo integrada y banco de +300 medidas preventivas.",
      fullDescription:
        "Un programa copiado de internet te deja expuesto legalmente. Este sistema te da el método completo para relevar la obra, redactar con rigor técnico, vincular cada riesgo con su medida preventiva y cerrar con el protocolo de firmas que blinda tu matrícula ante una inspección o un juicio.",
      url: "https://programasdeseguridad.tupuntodigital.shop",
      mockupGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      icon: "📋",
      image: programasSeguridadImg,
    },
    {
      id: 6,
      title: "Sistema Maestro de Emergencias",
      category: "Planes de Acción",
      description:
        "Convierte tu plan de evacuación en un sistema operativo real, no en una carpeta que nadie abre. Roles de brigada definidos, simulacros auditables y evidencia legal ante una inspección.",
      fullDescription:
        "Un plan copiado no salva a nadie: si falla en una tragedia, el profesional queda penalmente expuesto. Este sistema te da el método para diseñar medidas de protección, definir roles de brigada, ejecutar simulacros reales y documentar cada práctica como evidencia ante la SRT.",
      url: "https://maestrodeemergencias.tupuntodigital.shop",
      mockupGradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      icon: "🚨",
      image: emergenciasImg,
    },
    {
      id: 7,
      title: "Sistema maestro Investigacion de Accidentes",
      category: "Investigacion",
      description:
        "Deja de buscar culpables y empezá a encontrar causas raíz reales. Protocolo de respuesta inmediata, entrevistas profesionales y un informe técnico que resiste un juicio o una inspección de la ART.",
      fullDescription:
        "Un informe que termina en 'error humano' no investiga, busca un culpable, y el riesgo sigue ahí. Este sistema te da el protocolo de los primeros 60 minutos, el método forense de recolección de evidencia, el análisis de causa raíz (5 Porqués, Árbol de Causas) y la redacción técnica que blinda tu informe ante una demanda.",
      url: "https://investigaciondeaccidentes.tupuntodigital.shop",
      mockupGradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      icon: "🔍",
      comingSoon: true,
    },
    {
      id: 8,
      title: "Sistema maestro de Matrices",
      category: "Datos & Control",
      description:
        "Dejá de bucear en 100 archivos: el cerebro inteligente de tu gestión. Matrices interconectadas de IPER, EPP, capacitación y requisitos legales, auditables en minutos.",
      fullDescription:
        "Lo que no está en la matriz, no existe para la empresa hasta que ocurre el accidente. Este sistema te da matrices automatizadas en Excel con fórmulas e interconexiones lógicas, un banco de +150 peligros/riesgos, un selector inteligente de EPP por norma y un dashboard para demostrar tu gestión en minutos.",
      url: "https://maestrodematrices.tupuntodigital.shop",
      mockupGradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      icon: "📊",
      comingSoon: true,
    },
    {
      id: 9,
      title: "Sistema maestro de Consultores",
      category: "Negocio & Escalado",
      description:
        "Dejá de vender firmas por dos mangos. Sistema de negocio para cobrar por sistemas, no por horas: propuestas high-ticket, onboarding y gestión de clientes eficiente.",
      fullDescription:
        "Cobrar barato para no perder al cliente termina en burnout y cero rentabilidad. Este sistema te da el posicionamiento de nicho, la arquitectura de propuestas que cierran, el onboarding profesional, un CRM de clientes y el cálculo de honorarios para escalar tu consultora sin clonarte.",
      url: "https://maestroconsultores.tupuntodigital.shop",
      mockupGradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      icon: "💼",
      comingSoon: true,
    },
    {
      id: 10,
      title: "Sistema maestro Operativo",
      category: "All-In-One",
      description:
        "Dejá de gestionar con archivos sueltos. La integración completa de los 9 sistemas anteriores en una sola central de mando, blindada e interconectada.",
      fullDescription:
        "El Windows de la Higiene y Seguridad: instalás el sistema y tenés todas las herramientas integradas. Incluye carpeta maestra de estructura digital, master-dashboard de KPIs, protocolo de onboarding para nuevas empresas, kit de supervivencia ante auditorías y acceso a actualizaciones legales anuales. Cero papel innecesario, 100% evidencia legal.",
      url: "https://operativohys.tupuntodigital.shop",
      mockupGradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      icon: "⚙️",
      comingSoon: true,
    },
  ];

  if (selectedProduct) {
    const product = products.find((p) => p.id === selectedProduct);
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #efe6d3 0%, #e9dfc7 100%)",
        }}
      >
        <div
          style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 2rem" }}
        >
          <button
            onClick={() => setSelectedProduct(null)}
            style={{
              background: "#fbf6ea",
              border: "1px solid #d6c7a4",
              padding: "0.75rem 1.5rem",
              borderRadius: "6px",
              cursor: "pointer",
              color: "#1e2b36",
              marginBottom: "2rem",
              fontSize: "14px",
              fontWeight: 500,
              transition: "all 0.2s ease",
              boxShadow: "0 1px 3px rgba(30,43,54,0.08)",
            }}
            onMouseOver={(e) => {
              e.target.style.background = "#efe6d3";
              e.target.style.borderColor = "#a5321f";
              e.target.style.color = "#a5321f";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "#fbf6ea";
              e.target.style.borderColor = "#d6c7a4";
              e.target.style.color = "#1e2b36";
            }}
          >
            ← Volver al catálogo
          </button>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "3rem",
              alignItems: "start",
            }}
          >
            {/* Mockup del Producto */}
            <div>
              <div
                style={{
                  background: product.image
                    ? "#e6dac0"
                    : product.mockupGradient,
                  borderRadius: "12px",
                  height: "560px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  marginBottom: "1.5rem",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
                  animation: "fadeIn 0.5s ease-out",
                  position: "relative",
                  overflow: "visible",
                  padding: product.image ? "0.5rem" : "2rem",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "12px",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.title}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                      }}
                    />
                  ) : (
                    <>
                      <div
                        style={{
                          fontSize: "80px",
                          marginBottom: "1rem",
                          opacity: 0.9,
                        }}
                      >
                        {product.icon}
                      </div>
                      <h2
                        style={{
                          fontSize: "24px",
                          fontWeight: 700,
                          textAlign: "center",
                          margin: "0 0 1rem",
                          lineHeight: "1.3",
                          textTransform: "uppercase",
                        }}
                      >
                        {product.title}
                      </h2>
                      <p
                        style={{
                          fontSize: "14px",
                          opacity: 0.95,
                          textAlign: "center",
                          marginBottom: 0,
                          maxWidth: "80%",
                        }}
                      >
                        Sistema Profesional Integrado
                      </p>

                      <div
                        style={{
                          position: "absolute",
                          bottom: "20px",
                          left: "20px",
                          opacity: 0.2,
                          fontSize: "60px",
                        }}
                      >
                        📋
                      </div>
                    </>
                  )}

                  {product.comingSoon && (
                    <div
                      style={{
                        position: "absolute",
                        top: "34px",
                        left: "-58px",
                        width: "230px",
                        transform: "rotate(-45deg)",
                        background: "#a5321f",
                        color: "#f8f2e4",
                        textAlign: "center",
                        fontSize: "16px",
                        fontWeight: 700,
                        letterSpacing: "1.5px",
                        textTransform: "uppercase",
                        padding: "8px 0",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
                        zIndex: 2,
                      }}
                    >
                      Próximamente
                    </div>
                  )}
                </div>

                <span
                  style={{
                    position: "absolute",
                    top: "-10px",
                    right: "16px",
                    background: "#fbf6ea",
                    color: "#a5321f",
                    fontSize: "12px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    padding: "6px 14px",
                    borderRadius: "20px",
                    border: "1px solid #a5321f",
                    boxShadow: "0 4px 12px rgba(30,43,54,0.18)",
                  }}
                >
                  {product.category}
                </span>
              </div>
            </div>

            {/* Información */}
            <div>
              <div style={{ marginBottom: "2rem" }}>
                <p
                  style={{
                    color: "#a5321f",
                    fontSize: "13px",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    margin: "0 0 0.5rem",
                    fontWeight: 600,
                  }}
                >
                  Producto Profesional
                </p>
                <h1
                  style={{
                    fontFamily: "'Lora', Georgia, serif",
                    fontSize: "32px",
                    fontWeight: 700,
                    margin: "0 0 1rem",
                    color: "#1e2b36",
                    lineHeight: "1.3",
                    textTransform: "uppercase",
                  }}
                >
                  {product.title}
                </h1>
                <p
                  style={{
                    color: "#3d4f4c",
                    lineHeight: "1.8",
                    marginBottom: "2rem",
                    fontSize: "16px",
                  }}
                >
                  {product.fullDescription}
                </p>
              </div>

              <div
                style={{
                  marginBottom: "2rem",
                  padding: "1.5rem",
                  background: "#f5ecda",
                  borderRadius: "8px",
                }}
              >
                <h3
                  style={{
                    color: "#a5321f",
                    fontSize: "14px",
                    fontWeight: 600,
                    margin: "0 0 1rem",
                    textTransform: "uppercase",
                  }}
                >
                  Qué incluye
                </h3>
                <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                  <li
                    style={{
                      color: "#3d4f4c",
                      fontSize: "14px",
                      margin: "0 0 0.75rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span style={{ color: "#a5321f", fontWeight: 700 }}>✓</span>{" "}
                    100+ páginas de contenido técnico
                  </li>
                  <li
                    style={{
                      color: "#3d4f4c",
                      fontSize: "14px",
                      margin: "0 0 0.75rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span style={{ color: "#a5321f", fontWeight: 700 }}>✓</span>{" "}
                    Plantillas y bonos operativos
                  </li>
                  <li
                    style={{
                      color: "#3d4f4c",
                      fontSize: "14px",
                      margin: "0 0 0.75rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span style={{ color: "#a5321f", fontWeight: 700 }}>✓</span>{" "}
                    Ejemplos prácticos y casos de estudio
                  </li>
                  <li
                    style={{
                      color: "#3d4f4c",
                      fontSize: "14px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span style={{ color: "#a5321f", fontWeight: 700 }}>✓</span>{" "}
                    Actualizaciones anuales incluidas
                  </li>
                </ul>
              </div>

              <div style={{ display: "grid", gap: "12px" }}>
                <a
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background:
                      "linear-gradient(135deg, #a5321f 0%, #7d2517 100%)",
                    color: "#f8f2e4",
                    padding: "1rem",
                    borderRadius: "6px",
                    textAlign: "center",
                    textDecoration: "none",
                    fontSize: "16px",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    border: "none",
                    display: "block",
                    boxShadow: "0 4px 12px rgba(165, 50, 31, 0.3)",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow =
                      "0 6px 16px rgba(165, 50, 31, 0.4)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow =
                      "0 4px 12px rgba(165, 50, 31, 0.3)";
                  }}
                >
                  Acceder al Producto →
                </a>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #efe6d3 0%, #e9dfc7 100%)",
      }}
    >
      <Cursor />
      <Nav />
      <Hero />
      <Ticker />
      <Metricas />
      <Portfolio />
      <Servicios />
      <Filosofia />
      <div
        style={{
          background: "#efe6d3",
          borderBottom: "1px solid #c9bd9c",
          boxShadow: "0 1px 3px rgba(30,43,54,0.08)",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "3rem 2rem",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontFamily: "'Lora', Georgia, serif",
              fontSize: "46px",
              fontWeight: 700,
              margin: 0,
              letterSpacing: "-0.5px",
              lineHeight: 1.15,
              background:
                "linear-gradient(135deg, #1e2b36 0%, #5c8a94 55%, #a5321f 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Ecosistema de Sistemas
          </h1>
          <p
            style={{
              color: "#5b6a72",
              margin: "0.75rem auto 0",
              maxWidth: "560px",
              fontSize: "16px",
              fontWeight: 400,
              letterSpacing: "0.2px",
              lineHeight: 1.5,
            }}
          >
            Soluciones profesionales e integradas para Higiene y Seguridad
            Ocupacional
          </p>
        </div>
      </div>

      <div
        style={{ maxWidth: "1400px", margin: "0 auto", padding: "3rem 2rem" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2.5rem",
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => setSelectedProduct(product.id)}
              style={{
                cursor: "pointer",
                background: "#fbf6ea",
                borderRadius: "12px",
                overflow: "visible",
                animation: `slideUp 0.5s ease-out ${product.id * 40}ms both`,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  background: product.image
                    ? "#e6dac0"
                    : product.mockupGradient,
                  height: "280px",
                  borderRadius: "12px 12px 0 0",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "visible",
                }}
              >
                <div
                  className="product-card-media"
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "12px 12px 0 0",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.title}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                        padding: "0.35rem",
                      }}
                    />
                  ) : (
                    <>
                      <div
                        style={{
                          fontSize: "60px",
                          marginBottom: "0.5rem",
                          opacity: 0.95,
                        }}
                      >
                        {product.icon}
                      </div>
                      <p
                        style={{
                          fontSize: "12px",
                          color: "rgba(255,255,255,0.9)",
                          margin: 0,
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Sistema Profesional
                      </p>

                      <div
                        style={{
                          position: "absolute",
                          bottom: "10px",
                          right: "10px",
                          fontSize: "40px",
                          opacity: 0.15,
                        }}
                      >
                        {product.icon}
                      </div>
                    </>
                  )}

                  {product.comingSoon && (
                    <div
                      style={{
                        position: "absolute",
                        top: "22px",
                        left: "-42px",
                        width: "170px",
                        transform: "rotate(-45deg)",
                        background: "#a5321f",
                        color: "#f8f2e4",
                        textAlign: "center",
                        fontSize: "12px",
                        fontWeight: 700,
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                        padding: "6px 0",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
                        zIndex: 2,
                      }}
                    >
                      Próximamente
                    </div>
                  )}

                  <div className="product-card-shine" />
                </div>

                <span
                  style={{
                    position: "absolute",
                    top: "-10px",
                    right: "16px",
                    background: "#fbf6ea",
                    color: "#a5321f",
                    fontSize: "11px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    padding: "5px 12px",
                    borderRadius: "20px",
                    border: "1px solid #a5321f",
                    boxShadow: "0 4px 12px rgba(30,43,54,0.18)",
                    zIndex: 1,
                  }}
                >
                  {product.category}
                </span>
              </div>

              <div
                style={{
                  padding: "1.75rem",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Lora', Georgia, serif",
                    fontSize: "18px",
                    fontWeight: 700,
                    margin: "0 0 1rem",
                    color: "#1e2b36",
                    lineHeight: "1.4",
                    textTransform: "uppercase",
                  }}
                >
                  {product.title}
                </h3>

                <p
                  style={{
                    fontSize: "14px",
                    color: "#5b6a72",
                    margin: "0 0 1.5rem",
                    lineHeight: "1.6",
                    flex: 1,
                  }}
                >
                  {product.description}
                </p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: "1rem",
                    borderTop: "1px solid #d6c7a4",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#7c8a90",
                      textTransform: "uppercase",
                      fontWeight: 600,
                    }}
                  >
                    Ver detalles
                  </span>
                  <span
                    style={{
                      fontSize: "18px",
                      transition: "transform 0.2s",
                      color: "#a5321f",
                    }}
                  >
                    →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          background: "#efe6d3",
          borderTop: "1px solid #c9bd9c",
          marginTop: "3rem",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "3rem 2rem",
            textAlign: "center",
          }}
        >
          <p style={{ color: "#1e2b36", margin: "0 0 0.5rem" }}>
            © 2026 Sistema Maestro HyS. Todos los derechos reservados.
          </p>
          <p style={{ color: "#5b6a72", fontSize: "14px", margin: 0 }}>
            Soluciones profesionales en Higiene y Seguridad Ocupacional
          </p>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        * {
          box-sizing: border-box;
        }

        .product-card {
          position: relative;
          border: 1px solid #d6c7a4;
          box-shadow: 0 2px 8px rgba(30, 43, 54, 0.08);
          transform: translateY(0) scale(1);
          will-change: transform;
        }

        .product-card:hover {
          transform: translateY(-10px) scale(1.015);
          border-color: #a5321f;
          box-shadow: 0 24px 48px rgba(165, 50, 31, 0.22),
            0 0 0 1px rgba(165, 50, 31, 0.12);
          transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1),
            box-shadow 0.45s ease, border-color 0.45s ease;
        }

        .product-card:hover .product-card-media img {
          transform: scale(1.08);
          transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .product-card-shine {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            115deg,
            transparent 35%,
            rgba(255, 255, 255, 0.55) 50%,
            transparent 65%
          );
          transform: translateX(-130%);
          pointer-events: none;
          z-index: 3;
        }

        .product-card:hover .product-card-shine {
          transform: translateX(130%);
          transition: transform 0.85s ease;
        }
      `}</style>
    </div>
  );
}
