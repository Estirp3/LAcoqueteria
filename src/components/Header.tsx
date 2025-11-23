import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import logoUrl from "../assets/images/la-coqueteria-logo.svg";
import { useData } from "../context/DataContext";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { categories } = useData();

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      setScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY]);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goNuevaColeccion = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === "/") {
      scrollToId("nuevos-ingresos");
    } else {
      navigate("/nueva-coleccion");
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled || open ? "bg-white shadow-sm py-1" : "bg-transparent py-2"
        } ${visible ? "translate-y-0" : "-translate-y-full"
        } bg-white/95 backdrop-blur border-b border-line`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-[65px] flex items-center justify-between">
          <Link to="/" aria-label="Ir a inicio" onClick={() => setOpen(false)}>
            <img src={logoUrl} alt="La Coquetería" className="w-[130px] sm:w-[150px] h-auto" />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-6 text-[11px] tracking-[0.15em]">
              {!categories.some(c => c.nombre.toUpperCase() === "NUEVA COLECCIÓN") && (
                <li>
                  <a
                    href={location.pathname === "/" ? "#nuevos-ingresos" : "/nueva-coleccion"}
                    onClick={goNuevaColeccion}
                    className="hover:text-accent transition-colors cursor-pointer font-medium"
                  >
                    NUEVA COLECCIÓN
                  </a>
                </li>
              )}

              {categories.map((cat) => (
                <li key={cat.id}>
                  <NavLink
                    to={cat.to || `/${cat.nombre.toLowerCase()}`}
                    className="hover:text-accent transition-colors uppercase font-medium"
                  >
                    {cat.nombre}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-ink"
            aria-label="Menú"
          >
            <div className="space-y-1.5">
              <span className={`block w-5 h-0.5 bg-current transition-transform ${open ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-5 h-0.5 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-0.5 bg-current transition-transform ${open ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-line shadow-lg transition-all duration-300 overflow-hidden ${open ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <ul className="flex flex-col p-5 gap-3 text-sm tracking-[0.15em] text-center">
          {!categories.some(c => c.nombre.toUpperCase() === "NUEVA COLECCIÓN") && (
            <li>
              <a
                href={location.pathname === "/" ? "#nuevos-ingresos" : "/nueva-coleccion"}
                onClick={(e) => {
                  goNuevaColeccion(e);
                  setOpen(false);
                }}
                className="block py-2 hover:text-accent font-medium"
              >
                NUEVA COLECCIÓN
              </a>
            </li>
          )}

          {categories.map((cat) => (
            <li key={cat.id}>
              <NavLink
                to={cat.to || `/${cat.nombre.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className="block py-2 hover:text-accent uppercase font-medium"
              >
                {cat.nombre}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
