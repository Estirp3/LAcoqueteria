import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logoUrl from "../assets/images/la-coqueteria-logo.svg";

const MENU = [
  { label: "NUEVA COLECCIÓN", href: "#nueva-coleccion", type: "anchor" },
  { label: "VESTIDOS", to: "/vestidos", type: "route" },
  { label: "PANTALONES", to: "/pantalones", type: "route" },
  { label: "TOPS", to: "/tops", type: "route" },
  { label: "FALDAS", to: "/faldas", type: "route" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastY.current && y > 80);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onClickAnchor = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-transform duration-300 ${hidden ? "-translate-y-full" : "translate-y-0"} bg-white/90 backdrop-blur border-b border-line`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="h-[72px] flex items-center justify-between">
          <Link to="/" aria-label="Ir a inicio">
            <img src={logoUrl} alt="La Coquetería" className="w-[160px] sm:w-[200px] h-auto" />
          </Link>

          <nav className="hidden md:block">
            <ul className="flex items-center gap-6 text-[12px] tracking-[0.2em]">
              {MENU.map(item => (
                <li key={item.label}>
                  {item.type === "route" ? (
                    <NavLink to={item.to!} className="hover:text-accent transition-colors">
                      {item.label}
                    </NavLink>
                  ) : (
                    <a href={`/#${item.href!.replace('#','')}`} onClick={onClickAnchor(item.href!.replace('#',''))} className="hover:text-accent transition-colors">
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <button className="md:hidden p-2" onClick={() => setOpen(v => !v)} aria-label="Abrir menú">
            <div className={`w-6 h-[2px] bg-ink mb-1 transition ${open ? "rotate-45 translate-y-1" : ""}`} />
            <div className={`w-6 h-[2px] bg-ink mb-1 transition ${open ? "opacity-0" : ""}`} />
            <div className={`w-6 h-[2px] bg-ink transition ${open ? "-rotate-45 -translate-y-1" : ""}`} />
          </button>
        </div>

        <div className={`md:hidden overflow-hidden transition-[max-height] duration-300 ${open ? "max-h-96" : "max-h-0"}`}>
          <ul className="pb-4 flex flex-col gap-3 text-[12px] tracking-[0.2em]">
            {MENU.map(item => (
              <li key={item.label}>
                {item.type === "route" ? (
                  <NavLink to={item.to!} onClick={() => setOpen(false)} className="block py-2 hover:text-accent">
                    {item.label}
                  </NavLink>
                ) : (
                  <a href={`/#${item.href!.replace('#','')}`} onClick={onClickAnchor(item.href!.replace('#',''))} className="block py-2 hover:text-accent">
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
