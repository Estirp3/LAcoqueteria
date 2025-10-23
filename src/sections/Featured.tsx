import ProductCard from "../components/ProductCard";
import { destacados } from "../data/catalog";

export default function Featured() {
  return (
    <section id="destacados" className="py-16 px-6 bg-white">
      <h2 className="text-center text-2xl tracking-[0.3em] font-light mb-10">NUEVOS INGRESOS</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {destacados.map((p) => (
          <ProductCard key={p.nombre} name={p.nombre} price={p.precio} image={p.img} />
        ))}
      </div>
    </section>
  );
}
