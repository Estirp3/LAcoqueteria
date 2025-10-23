import CategoryCard from "../components/CategoryCard";
import NuevaColeccionSection from "../sections/NuevaColeccionSection";

const categorias = [
  { nombre: "VESTIDOS", img: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop", to: "/vestidos" },
  { nombre: "PANTALONES", img: "https://images.unsplash.com/photo-1592878904946-b3cd69765f44?q=80&w=1200&auto=format&fit=crop", to: "/pantalones" },
  { nombre: "TOPS", img: "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop", to: "/tops" },
  { nombre: "FALDAS", img: "https://images.unsplash.com/photo-1520974651290-5cbf956ae2fd?q=80&w=1200&auto=format&fit=crop", to: "/faldas" },
];

const destacados = [
  { nombre: "Vestido Minimalista", precio: "$29.990", img: "https://picsum.photos/id/1011/800/1000" },
  { nombre: "Pantalón Fluido", precio: "$24.990", img: "https://picsum.photos/id/1005/800/1000" },
  { nombre: "Top Elegante", precio: "$19.990", img: "https://picsum.photos/id/1015/800/1000" },
  { nombre: "Falda Midi", precio: "$22.990", img: "https://picsum.photos/id/1027/800/1000" },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero (como sección reutilizable) */}
      <NuevaColeccionSection withId />

      {/* Categorías */}
      <section id="categorias" className="py-16 px-6">
        <h2 className="text-center text-2xl tracking-[0.3em] font-light mb-10">CATEGORÍAS</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categorias.map((c) => (
            <CategoryCard key={c.nombre} title={c.nombre} image={c.img} to={c.to} />
          ))}
        </div>
      </section>

      {/* Destacados */}
      <section id="destacados" className="py-16 px-6 bg-white">
        <h2 className="text-center text-2xl tracking-[0.3em] font-light mb-10">NUEVOS INGRESOS</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {destacados.map((p) => (
            <div key={p.nombre} className="text-center group">
              <div className="img-wrap h-80 mb-4 overflow-hidden rounded-2xl">
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
      <section id="filosofia" className="py-16 px-6 bg-bone text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl tracking-[0.3em] font-light mb-6">NUESTRA FILOSOFÍA</h2>
          <p className="text-base leading-8">
            En La Coquetería mezclamos prendas nuevas y recicladas para crear looks en tendencia.
            No sólo vendemos ropa, sino que también compramos tu ropa para darle una segunda vida.
          </p>
        </div>
      </section>
    </div>
  );
}
