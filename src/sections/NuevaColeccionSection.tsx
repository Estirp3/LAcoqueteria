import bannerT from "../assets/Banner/bannerT.png";
import { Link } from "react-router-dom";

interface Props {
    withId?: boolean;
}

export default function NuevaColeccionSection({ withId = false }: Props) {
    return (
        <section
            id={withId ? "nueva-coleccion" : undefined}
            className="relative h-[70vh] sm:h-[80vh] flex flex-col items-center justify-center text-center text-white px-6 overflow-hidden"
            style={{
                backgroundImage: `url(${bannerT})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Overlay semitransparente para mejorar legibilidad */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Contenido */}
            <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl tracking-[0.2em] font-light mb-4">
                    NUEVA COLECCIÓN
                </h2>
                <p className="text-lg mb-6">Descubre nuestras nuevas prendas</p>
                <a>
                    <Link
                        to="/nueva-coleccion"
                        className="border border-sand px-8 py-3 uppercase tracking-[0.2em] text-sm hover:bg-sand hover:text-white transition"
                    >
                        Ver Colección
                    </Link>
                </a>
            </div>
        </section>
    );
}
