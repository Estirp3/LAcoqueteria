import { Link } from "react-router-dom";

const categorias = [
    { nombre: "VESTIDOS", img: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop" },
    { nombre: "PANTALONES", img: "https://images.unsplash.com/photo-1592878904946-b3cd69765f44?q=80&w=1200&auto=format&fit=crop" },
    { nombre: "TOPS", img: "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop" },
    { nombre: "FALDAS", img: "https://images.unsplash.com/photo-1520974651290-5cbf956ae2fd?q=80&w=1200&auto=format&fit=crop" },
];

const destacados = [
    { nombre: "Vestido Minimalista", precio: "$29.990", img: "https://picsum.photos/id/1011/800/1000" },
    { nombre: "Pantalón Fluido", precio: "$24.990", img: "https://picsum.photos/id/1005/800/1000" },
    { nombre: "Top Elegante", precio: "$19.990", img: "https://picsum.photos/id/1015/800/1000" },
    { nombre: "Falda Midi", precio: "$22.990", img: "https://picsum.photos/id/1027/800/1000" },
];

const CATEGORY_ROUTES: Record<string, string> = {
    VESTIDOS: "/vestidos",
    PANTALONES: "/pantalones",
    TOPS: "/tops",
    FALDAS: "/faldas",
};

export default function Home() {
    return (
        <div className="min-h-screen">
            {/* Hero */}
            <section
                id="nueva-coleccion"
                className="h-[70vh] sm:h-[80vh] flex flex-col items-center justify-center text-center bg-bone px-6"
            >
                <h2 className="text-3xl tracking-[0.2em] font-light mb-4">
                    NUEVA COLECCIÓN
                </h2>
                <p className="text-lg mb-6">Descubre nuestras nuevas prendas</p>
                <a
                    href="#destacados"
                    className="border border-ink px-8 py-3 uppercase tracking-[0.2em] text-sm hover:bg-ink hover:text-white transition"
                >
                    Ver Colección
                </a>
            </section>

            {/* Categorías */}
            <section id="categorias" className="py-16 px-6">
                <h2 className="text-center text-2xl tracking-[0.3em] font-light mb-10">
                    CATEGORÍAS
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {categorias.map((cat) => (
                        <Link
                            key={cat.nombre}
                            to={CATEGORY_ROUTES[cat.nombre] || "/"}
                            className="group text-center border border-line bg-bone p-6 hover:shadow-md transition-transform duration-300 hover:-translate-y-1 rounded-2xl"
                        >
                            <div className="img-wrap h-64 mb-4 overflow-hidden rounded-xl">
                                <div
                                    className="img-zoom h-full w-full bg-center bg-cover transform group-hover:scale-105 transition-transform duration-500"
                                    style={{ backgroundImage: `url(${cat.img})` }}
                                />
                            </div>
                            <h3 className="text-lg tracking-[0.2em] font-normal mb-2">
                                {cat.nombre}
                            </h3>
                            <span className="underline text-sm">Ver colección</span>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Destacados */}
            <section id="destacados" className="py-16 px-6 bg-white">
                <h2 className="text-center text-2xl tracking-[0.3em] font-light mb-10">
                    NUEVOS INGRESOS
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {destacados.map((p) => (
                        <div key={p.nombre} className="text-center group">
                            <div className="img-wrap h-80 mb-4 overflow-hidden rounded-xl">
                                <div
                                    className="img-zoom h-full w-full bg-center bg-cover transform group-hover:scale-105 transition-transform duration-500"
                                    style={{ backgroundImage: `url(${p.img})` }}
                                />
                            </div>
                            <h4 className="font-medium text-base mb-1">{p.nombre}</h4>
                            <p className="text-sm text-gray-600">{p.precio}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Filosofía */}
            <section
                id="filosofia"
                className="py-16 px-6 bg-bone text-center rounded-t-2xl"
            >
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-2xl tracking-[0.3em] font-light mb-6">
                        NUESTRA FILOSOFÍA
                    </h2>
                    <p className="text-base leading-8">
                        En La Coquetería mezclamos prendas nuevas y recicladas para crear
                        looks en tendencia. No sólo vendemos ropa, sino que también
                        compramos tu ropa para darle una segunda vida.
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-line py-12 px-6 text-sm">
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 mb-8">
                    <div>
                        <h3 className="tracking-[0.2em] font-medium mb-2">LA COQUETERÍA</h3>
                        <p>Moda minimalista y sostenible</p>
                    </div>
                    <div>
                        <h3 className="tracking-[0.2em] font-medium mb-2">CONTACTO</h3>
                        <p>Email: info@lacoqueteria.com</p>
                        <p>Teléfono: +56 9 1234 5678</p>
                    </div>
                    <div>
                        <h3 className="tracking-[0.2em] font-medium mb-2">SÍGUENOS</h3>
                        <div className="flex flex-col space-y-2">
                            <a
                                href="https://www.instagram.com/la_coqueteria_boutique/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                            >
                                Instagram
                            </a>
                            <a href="#" className="hover:underline">
                                Facebook
                            </a>
                        </div>
                    </div>
                </div>
                <p className="text-center text-xs text-gray-500">
                    © {new Date().getFullYear()} La Coquetería. Todos los derechos
                    reservados.
                </p>
            </footer>
        </div>
    );
}