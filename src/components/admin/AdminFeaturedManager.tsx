import { useState } from "react";
import type { Product } from "../../context/DataContext";

interface AdminFeaturedManagerProps {
    allProducts: Product[];
    featuredProducts: Product[];
    updateProduct: (id: number, product: Product) => Promise<void>;
}

export default function AdminFeaturedManager({ allProducts, featuredProducts, updateProduct }: AdminFeaturedManagerProps) {
    const [selectedFeaturedId, setSelectedFeaturedId] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleAddToFeatured = async (productIdStr: string) => {
        const productId = parseInt(productIdStr);
        const product = allProducts.find(p => p.id === productId);
        if (product && product.id) {
            setIsLoading(true);
            try {
                await updateProduct(product.id, { ...product, isFeatured: true });
                setSelectedFeaturedId("");
                alert("✅ Producto agregado a destacados");
            } catch (error) {
                alert("❌ Error al agregar a destacados");
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleRemoveFromFeatured = (productId: number) => {
        const product = allProducts.find(p => p.id === productId);
        if (product && product.id) {
            updateProduct(product.id, { ...product, isFeatured: false });
        }
    };

    return (
        <section className="mb-16">
            <h2 className="text-2xl font-medium mb-6 border-b border-gray-300 pb-2">Nuevos Ingresos (Destacados)</h2>
            <p className="text-sm text-gray-600 mb-6">
                Los productos destacados aparecen en la portada (top 5) y en la página "Nueva Colección" (todos).
            </p>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
                <h3 className="font-medium mb-4">Agregar Producto a Destacados</h3>
                <div className="flex gap-4">
                    <select
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-3"
                        value={selectedFeaturedId}
                        onChange={(e) => {
                            setSelectedFeaturedId(e.target.value);
                            if (e.target.value) {
                                handleAddToFeatured(e.target.value);
                            }
                        }}
                        disabled={isLoading}
                    >
                        <option value="">Selecciona un producto...</option>
                        {allProducts
                            .filter(p => !p.isFeatured)
                            .map(p => (
                                <option key={p.id} value={p.id}>
                                    {p.nombre} - ${p.precio.toLocaleString("es-CL")} ({p.category})
                                </option>
                            ))}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProducts.map((product) => (
                    <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative">
                        <div className="aspect-[3/4] bg-gray-100">
                            <img src={product.img} alt={product.nombre} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-4">
                            <h3 className="font-medium mb-1">{product.nombre}</h3>
                            <p className="text-gray-600 mb-2">${product.precio.toLocaleString("es-CL")}</p>
                            <p className="text-xs text-gray-500 mb-3">{product.category}</p>
                            <button
                                onClick={() => product.id && handleRemoveFromFeatured(product.id)}
                                className="w-full border border-red-500 text-red-500 py-2 rounded text-sm hover:bg-red-50"
                            >
                                Quitar de Destacados
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {featuredProducts.length === 0 && (
                <div className="text-center py-10 text-gray-400">
                    No hay productos destacados. Agrega algunos usando el selector de arriba.
                </div>
            )}
        </section>
    );
}
