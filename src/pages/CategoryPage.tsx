import { useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import ProductFilters from "../components/ProductFilters";
import { useData } from "../context/DataContext";

export default function CategoryPage() {
    const { categoryName } = useParams<{ categoryName: string }>();
    const { allProducts, appSettings } = useData();

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSize, setSelectedSize] = useState("");

    const currentCategoryName = categoryName?.toUpperCase().replace(/-/g, " ");

    const filteredProducts = useMemo(() => {
        let filtered = allProducts.filter(
            (p) => p.category.toUpperCase() === currentCategoryName
        );

        // Búsqueda mejorada por palabras clave
        if (searchQuery.trim()) {
            const keywords = searchQuery.toLowerCase().split(" ").filter(k => k.length > 0);
            filtered = filtered.filter((p) => {
                const productText = p.nombre.toLowerCase();
                // El producto debe contener TODAS las palabras clave
                return keywords.every(keyword => productText.includes(keyword));
            });
        }

        if (selectedColor) {
            filtered = filtered.filter((p) =>
                p.colores?.includes(selectedColor)
            );
        }

        if (selectedSize) {
            filtered = filtered.filter((p) =>
                p.tallas?.includes(selectedSize)
            );
        }

        // Los productos se muestran en el orden que fueron creados (sin ordenamiento)
        return filtered;
    }, [allProducts, currentCategoryName, searchQuery, selectedColor, selectedSize]);

    return (
        <div className="pt-20 pb-16 px-3 min-h-screen bg-[#FDFBF7]">
            <div className="max-w-full mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-2xl sm:text-3xl font-light tracking-[0.15em] mb-2 uppercase">
                        {currentCategoryName || "CATEGORÍA"}
                    </h1>
                    <div className="w-20 h-0.5 bg-black mx-auto" />
                </div>

                <div className="flex flex-col lg:flex-row gap-5">
                    <ProductFilters
                        onSearch={setSearchQuery}
                        onFilterColor={setSelectedColor}
                        onFilterSize={setSelectedSize}
                        availableColors={appSettings.availableColors}
                        selectedColor={selectedColor}
                        selectedSize={selectedSize}
                    />

                    <div className="flex-1">
                        {filteredProducts.length > 0 ? (
                            <>
                                <p className="text-xs text-gray-600 mb-5">
                                    {filteredProducts.length} producto{filteredProducts.length !== 1 ? "s" : ""}
                                </p>
                                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                    {filteredProducts.map((product) => (
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
                            </>
                        ) : (
                            <div className="text-center py-16 text-gray-500">
                                <p className="text-base mb-1">No se encontraron productos</p>
                                <p className="text-sm">Intenta ajustar los filtros o buscar otra palabra clave</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
