import HeroSlider from "../components/HeroSlider";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import { useData } from "../context/DataContext";

export default function Home() {
  const { categories, featuredProducts } = useData();

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Hero Banner */}
      <HeroSlider />

      {/* Categorías - Más compacto */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-light tracking-[0.15em] uppercase mb-2">
              Explora por Categoría
            </h2>
            <div className="w-16 h-0.5 bg-black mx-auto" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <CategoryCard
                key={cat.id}
                title={cat.nombre}
                image={cat.img}
                to={cat.to || `/${cat.nombre.toLowerCase()}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Nueva Colección - Productos Destacados */}
      <section id="nuevos-ingresos" className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-light tracking-[0.15em] uppercase mb-2">
              Nueva Colección
            </h2>
            <div className="w-16 h-0.5 bg-black mx-auto" />
            <p className="mt-3 text-sm text-gray-600 max-w-xl mx-auto">
              Descubre nuestras últimas incorporaciones seleccionadas especialmente para ti
            </p>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {featuredProducts.slice(0, 8).map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id || 0}
                  nombre={product.nombre}
                  precio={product.precio}
                  img={product.img}
                  category={product.category}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">
              No hay productos destacados disponibles
            </p>
          )}

          {featuredProducts.length > 8 && (
            <div className="text-center mt-8">
              <a
                href="/nueva-coleccion"
                className="inline-block px-8 py-3 bg-black text-white text-sm tracking-wider uppercase hover:bg-gray-800 transition-colors"
              >
                Ver Toda la Colección
              </a>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
