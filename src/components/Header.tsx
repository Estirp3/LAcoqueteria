import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logoUrl from "../assets/images/la-coqueteria-logo.svg";

const MENU = [
    { label: "NUEVA COLECCIÓN", to: "/#nueva-coleccion", type: "anchor" },
    { label: "VESTIDOS", to: "/vestidos", type: "route" },
    { label: "PANTALONES", to: "/pantalones", type: "anchor" },
    { label: "TOPS", to: "/#tops", type: "anchor" },
    { label: "FALDAS", to: "/#faldas", type: "anchor" },
    { label: "BLUSAS", to: "/#blusas", type: "anchor" },
    { label: "ACCESORIOS", to: "/#accesorios", type: "anchor" },
    { label: "OFERTAS", to: "/#ofertas", type: "anchor" },
];

export default function Header() {
    const [open, setOpen] = useState(false);
    const [hidden, setHidden] = useState(false);
    const lastY = useRef(0);

    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY;
            const goingDown = y > lastY.current && y > 80;
            setHidden(goingDown);
            lastY.current = y;
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const onClickAnchor = (href: string) => (e: React.MouseEvent) => {
        // Navega dentro de la misma página a la ancla
        const hasHash = href.includes("#");
        if (hasHash) {
            e.preventDefault();
            const id = href.split("#")[1];
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            setOpen(false);
        }
    };

    return (
        <header
            className={`fixed top-0 inset-x-0 z-50 transition-transform duration-300 ${hidden ? "-translate-y-full" : "translate-y-0"
                } bg-white/90 backdrop-blur border-b border-line`}
        >
            <div className="max-w-6xl mx-auto px-4">
                <div className="h-[72px] flex items-center justify-between">
                    {/* Logo → Home */}
                    <Link to="/" className="inline-flex items-center">
                        <img
                            src={logoUrl}
                            alt="La Coquetería"
                            className="w-[160px] sm:w-[200px] h-auto"
                        />
                    </Link>

                    {/* Desktop menu */}
                    <nav className="hidden md:block">
                        <ul className="flex items-center gap-6 text-[12px] tracking-[0.2em]">
                            {MENU.map((item) =>
                                item.type === "route" ? (
                                    <li key={item.label}>
                                        <NavLink
                                            to={item.to}
                                            className="hover:text-accent transition-colors"
                                        >
                                            {item.label}
                                        </NavLink>
                                    </li>
                                ) : (
                                    <li key={item.label}>
                                        <a
                                            href={item.to}
                                            onClick={onClickAnchor(item.to)}
                                            className="hover:text-accent transition-colors"
                                        >
                                            {item.label}
                                        </a>
                                    </li>
                                )
                            )}
                        </ul>
                    </nav>

                    {/* Hamburger (mobile) */}
                    <button
                        aria-label="Abrir menú"
                        className="md:hidden inline-flex flex-col justify-center items-center gap-1 p-2"
                        onClick={() => setOpen((v) => !v)}
                    >
                        <span className={`block w-6 h-[2px] bg-ink transition ${open ? "rotate-45 translate-y-[5px]" : ""}`} />
                        <span className={`block w-6 h-[2px] bg-ink transition ${open ? "opacity-0" : ""}`} />
                        <span className={`block w-6 h-[2px] bg-ink transition ${open ? "-rotate-45 -translate-y-[5px]" : ""}`} />
                    </button>
                </div>

                {/* Mobile drawer */}
                <div className={`md:hidden overflow-hidden transition-[max-height] duration-300 ${open ? "max-h-96" : "max-h-0"}`}>
                    <ul className="pb-4 flex flex-col gap-3 text-[12px] tracking-[0.2em]">
                        {MENU.map((item) =>
                            item.type === "route" ? (
                                <li key={item.label}>
                                    <NavLink
                                        to={item.to}
                                        onClick={() => setOpen(false)}
                                        className="block py-2 hover:text-accent"
                                    >
                                        {item.label}
                                    </NavLink>
                                </li>
                            ) : (
                                <li key={item.label}>
                                    <a
                                        href={item.to}
                                        onClick={onClickAnchor(item.to)}
                                        className="block py-2 hover:text-accent"
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            )
                        )}
                        <li className="pt-2">
                            <a
                                href="https://www.instagram.com/la_coqueteria_boutique/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block py-2 hover:text-accent"
                            >
                                Instagram
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}
