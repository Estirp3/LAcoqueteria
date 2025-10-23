import CategoryCard from "../components/CategoryCard";
import { categorias } from "../data/catalog";
import { CATEGORY_ROUTES } from "../config/routes";

export default function Categories() {
  return (
    <section id="categorias" className="py-16 px-6">
      <h2 className="text-center text-2xl tracking-[0.3em] font-light mb-10">CATEGORÍAS</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {categorias.map((c) => (
          <CategoryCard key={c.nombre} title={c.nombre} image={c.img} to={CATEGORY_ROUTES[c.nombre] || "/"} />
        ))}
      </div>
    </section>
  );
}
