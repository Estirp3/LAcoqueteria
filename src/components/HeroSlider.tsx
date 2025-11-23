import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../context/DataContext";

export default function HeroSlider() {
    const { banners } = useData();
    const [current, setCurrent] = useState(0);
    const navigate = useNavigate();

    // Auto-play
    useEffect(() => {
        if (banners.length <= 1) return;
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % banners.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [banners.length]);

    if (banners.length === 0) {
        return <div className="h-[80vh] bg-gray-100 flex items-center justify-center">Cargando banner...</div>;
    }

    const banner = banners[current];

    return (
        <section className="relative h-[80vh] md:h-[90vh] overflow-hidden bg-black">
            {banners.map((b, index) => (
                <div
                    key={b.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? "opacity-100" : "opacity-0"
                        }`}
                >
                    {/* Imagen de fondo con efecto zoom suave */}
                    <div
                        className={`absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] ease-linear ${index === current ? "scale-110" : "scale-100"
                            }`}
                        style={{ backgroundImage: `url(${b.image})` }}
                    />
                    {/* Overlay oscuro */}
                    <div className="absolute inset-0 bg-black/30" />
                </div>
            ))}

            {/* Contenido */}
            <div className="absolute inset-0 flex items-center justify-center text-center px-4 z-10">
                <div className="max-w-4xl animate-fade-in-up">
                    <h2 className="text-white text-lg md:text-2xl tracking-[0.3em] uppercase mb-4 drop-shadow-md">
                        {banner.subtitle}
                    </h2>
                    <h1 className="text-white text-5xl md:text-7xl font-light tracking-widest mb-8 drop-shadow-lg">
                        {banner.title}
                    </h1>
                    <button
                        onClick={() => navigate(banner.link)}
                        className="bg-white text-black px-10 py-4 text-sm tracking-[0.2em] hover:bg-black hover:text-white transition-all duration-300 uppercase border border-white"
                    >
                        {banner.buttonText}
                    </button>
                </div>
            </div>

            {/* Indicadores (puntos) */}
            {banners.length > 1 && (
                <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-20">
                    {banners.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrent(idx)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === current ? "bg-white w-8" : "bg-white/50 hover:bg-white/80"
                                }`}
                            aria-label={`Ir a diapositiva ${idx + 1}`}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}
