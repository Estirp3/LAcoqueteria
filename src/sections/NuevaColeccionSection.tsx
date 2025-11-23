import ProductCard from "../components/ProductCard";
import { useData } from "../context/DataContext";

export default function NuevaColeccionSection() {
    const { featuredProducts } = useData();

    // Mostrar solo los primeros 4 productos destacados en la home
    const displayProducts = featuredProducts.slice(0, 4);

    return (
        <section id="nuevos-ingresos" className="py-20 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-light tracking-[0.2em] mb-4">
                        NUEVOS INGRESOS
                    </h2>
                    <div className="w-24 h-0.5 bg-black mx-auto" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {displayProducts.map((product) => (
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
            </div>
        </section>
    );
}
