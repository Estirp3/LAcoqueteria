import React, { useState } from "react";
import type { Category, Product } from "../../context/DataContext";

interface AdminProductManagerProps {
    categories: Category[];
    allProducts: Product[];
    addProduct: (product: Product) => Promise<void>;
    updateProduct: (id: number, product: Product) => Promise<void>;
    deleteProduct: (id: number) => Promise<void>;
    availableColors: string[];
}

export default function AdminProductManager({ categories, allProducts, addProduct, updateProduct, deleteProduct, availableColors }: AdminProductManagerProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>("VESTIDOS");
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [isProductFormOpen, setIsProductFormOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Form States
    const [prodName, setProdName] = useState("");
    const [prodPrice, setProdPrice] = useState("");
    const [prodImg, setProdImg] = useState("");
    const [prodDesc, setProdDesc] = useState("");
    const [prodColores, setProdColores] = useState<string[]>([]);
    const [prodTallas, setProdTallas] = useState<string[]>([]);

    const filteredProducts = allProducts.filter(p => p.category === selectedCategory);

    const handleEditProduct = (product: Product) => {
        setEditingProduct(product);
        setProdName(product.nombre);
        setProdPrice(product.precio.toString());
        setProdImg(product.img);
        setProdDesc(product.description || "");
        setProdColores(product.colores || []);
        setProdTallas(product.tallas || []);
        setIsProductFormOpen(true);
    };

    const handleNewProduct = () => {
        setEditingProduct(null);
        setProdName("");
        setProdPrice("");
        setProdImg("");
        setProdDesc("");
        setProdColores([]);
        setProdTallas([]);
        setIsProductFormOpen(true);
    };

    const handleSaveProduct = async () => {
        if (!prodName || !prodPrice || !prodImg) {
            alert("Por favor completa los campos obligatorios: Nombre, Precio e Imagen.");
            return;
        }

        setIsLoading(true);
        try {
            const productData: Product = {
                id: editingProduct ? editingProduct.id : undefined,
                nombre: prodName,
                precio: parseInt(prodPrice),
                img: prodImg,
                category: selectedCategory,
                description: prodDesc,
                colores: prodColores.length > 0 ? prodColores : undefined,
                tallas: prodTallas.length > 0 ? prodTallas : undefined,
                isFeatured: editingProduct?.isFeatured || false
            };

            if (editingProduct && editingProduct.id) {
                await updateProduct(editingProduct.id, productData);
            } else {
                await addProduct(productData);
            }
            setIsProductFormOpen(false);
            alert("✅ Producto guardado exitosamente");
        } catch (error) {
            alert("❌ Error al guardar el producto");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleProductImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProdImg(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const toggleColor = (color: string) => {
        if (prodColores.includes(color)) {
            setProdColores(prodColores.filter(c => c !== color));
        } else {
            setProdColores([...prodColores, color]);
        }
    };

    const toggleTalla = (talla: string) => {
        if (prodTallas.includes(talla)) {
            setProdTallas(prodTallas.filter(t => t !== talla));
        } else {
            setProdTallas([...prodTallas, talla]);
        }
    };

    return (
        <section className="mb-16">
            <h2 className="text-2xl font-medium mb-6 border-b border-gray-300 pb-2">Gestión de Productos</h2>

            {/* Tabs de categorías */}
            <div className="flex gap-2 mb-6 flex-wrap">
                {categories.map((cat) => (
                    <button
                        key={cat.nombre}
                        onClick={() => setSelectedCategory(cat.nombre)}
                        className={`px-6 py-2 rounded-full transition-colors ${selectedCategory === cat.nombre
                            ? "bg-black text-white"
                            : "bg-white border border-gray-300 hover:border-black"
                            }`}
                    >
                        {cat.nombre}
                    </button>
                ))}
            </div>

            {/* Botón agregar producto */}
            <button
                onClick={handleNewProduct}
                className="mb-6 border-2 border-dashed border-gray-300 rounded-xl p-6 w-full hover:border-black transition-colors flex items-center justify-center gap-2"
            >
                <span className="text-4xl text-gray-400">+</span>
                <span className="text-gray-600">Agregar Producto</span>
            </button>

            {/* Lista de productos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="aspect-[3/4] bg-gray-100 relative">
                            <img src={product.img} alt={product.nombre} className="w-full h-full object-cover" />
                            {product.isFeatured && (
                                <span className="absolute top-2 right-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-medium">
                                    ⭐ Destacado
                                </span>
                            )}
                        </div>
                        <div className="p-4">
                            <h3 className="font-medium mb-1">{product.nombre}</h3>
                            <p className="text-gray-600 mb-3">${product.precio.toLocaleString("es-CL")}</p>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEditProduct(product)}
                                    className="flex-1 bg-black text-white py-2 rounded text-sm hover:bg-gray-800"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => {
                                        if (window.confirm(`¿Eliminar ${product.nombre}?`)) {
                                            product.id && deleteProduct(product.id);
                                        }
                                    }}
                                    className="px-4 border border-red-500 text-red-500 rounded text-sm hover:bg-red-50"
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal de edición de producto */}
            {isProductFormOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <div className="bg-white rounded-2xl max-w-2xl w-full my-8">
                        <div className="p-8">
                            <h2 className="text-2xl font-medium mb-6">
                                {editingProduct ? "Editar Producto" : "Nuevo Producto"}
                            </h2>

                            <div className="space-y-6">
                                {/* Nombre */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nombre <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={prodName}
                                        onChange={(e) => setProdName(e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3"
                                        placeholder="Ej: Vestido Lino Arena"
                                    />
                                </div>

                                {/* Precio */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Precio <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        value={prodPrice}
                                        onChange={(e) => setProdPrice(e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3"
                                        placeholder="Ej: 45990"
                                    />
                                </div>

                                {/* Imagen */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Imagen <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex gap-4 items-start">
                                        <div className="flex-1">
                                            <input
                                                type="text"
                                                value={prodImg}
                                                onChange={(e) => setProdImg(e.target.value)}
                                                className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-2"
                                                placeholder="URL de la imagen"
                                            />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleProductImageUpload}
                                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800"
                                            />
                                        </div>
                                        {prodImg && (
                                            <div className="w-24 h-32 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                                                <img src={prodImg} alt="Preview" className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Descripción */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                                    <textarea
                                        value={prodDesc}
                                        onChange={(e) => setProdDesc(e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 h-32"
                                        placeholder="Descripción del producto..."
                                    />
                                </div>

                                {/* Tallas */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Tallas Disponibles</label>
                                    <div className="flex gap-2 flex-wrap">
                                        {["XS", "S", "M", "L", "XL"].map(t => (
                                            <button
                                                key={t}
                                                onClick={() => toggleTalla(t)}
                                                className={`w-10 h-10 rounded-full border flex items-center justify-center text-sm font-medium transition-colors ${prodTallas.includes(t)
                                                    ? "bg-black text-white border-black"
                                                    : "bg-white text-gray-600 border-gray-300 hover:border-black"
                                                    }`}
                                            >
                                                {t}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Colores */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Colores Disponibles</label>
                                    <div className="flex gap-2 flex-wrap">
                                        {availableColors.map(c => (
                                            <button
                                                key={c}
                                                onClick={() => toggleColor(c)}
                                                className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${prodColores.includes(c)
                                                    ? "bg-black text-white border-black"
                                                    : "bg-white text-gray-600 border-gray-300 hover:border-black"
                                                    }`}
                                            >
                                                {c}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Botones de acción */}
                                <div className="flex gap-4 pt-4 border-t border-gray-100">
                                    <button
                                        onClick={() => setIsProductFormOpen(false)}
                                        className="flex-1 border border-gray-300 text-gray-600 py-3 rounded-lg hover:bg-gray-50"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={handleSaveProduct}
                                        disabled={isLoading}
                                        className={`flex-1 bg-black text-white py-3 rounded-lg hover:bg-gray-800 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                                    >
                                        {isLoading ? "Guardando..." : "Guardar Producto"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
