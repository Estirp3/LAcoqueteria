import React, { useState, useRef } from "react";
import type { Category } from "../../context/DataContext";

interface AdminCategoryManagerProps {
    categories: Category[];
    addCategory: (category: Omit<Category, "id">) => Promise<void>;
    updateCategory: (id: number, category: Category) => Promise<void>;
    deleteCategory: (id: number) => Promise<void>;
}

export default function AdminCategoryManager({ categories, addCategory, updateCategory, deleteCategory }: AdminCategoryManagerProps) {
    const [newCatName, setNewCatName] = useState("");
    const [newCatImg, setNewCatImg] = useState("");
    const [newCatPath, setNewCatPath] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setImg: (s: string) => void) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImg(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddCategory = async () => {
        if (!newCatName) {
            alert("Por favor ingresa un nombre para la categoría");
            return;
        }

        setIsLoading(true);
        try {
            await addCategory({
                nombre: newCatName,
                img: newCatImg || "https://via.placeholder.com/300",
                to: newCatPath || `/${newCatName.toLowerCase().replace(/\s+/g, '-')}`,
            });
            setNewCatName("");
            setNewCatImg("");
            setNewCatPath("");
            alert("✅ Categoría creada exitosamente");
        } catch (error) {
            alert("❌ Error al crear la categoría");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCatImageChange = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const cat = categories.find(c => c.id === id);
                if (cat) {
                    updateCategory(id, { ...cat, img: reader.result as string });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <section className="mb-16">
            <h2 className="text-2xl font-medium mb-6 border-b border-gray-300 pb-2">Categorías (Portada)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {categories.map((cat) => (
                    <div key={cat.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex gap-6 items-start">
                        <div className="w-20 h-20 shrink-0 relative group cursor-pointer bg-gray-100 rounded-lg overflow-hidden">
                            <img src={cat.img} alt={cat.nombre} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-white text-xs">Cambiar Foto</span>
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => cat.id && handleCatImageChange(cat.id, e)}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                        </div>

                        <div className="flex-1 space-y-3">
                            <div>
                                <label className="text-xs text-gray-500">Nombre</label>
                                <input
                                    type="text"
                                    value={cat.nombre}
                                    onChange={(e) => cat.id && updateCategory(cat.id, { ...cat, nombre: e.target.value })}
                                    className="w-full border-b border-gray-200 py-1 focus:border-black outline-none"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500">Ruta</label>
                                <input
                                    type="text"
                                    value={cat.to || ""}
                                    onChange={(e) => cat.id && updateCategory(cat.id, { ...cat, to: e.target.value })}
                                    className="w-full border-b border-gray-200 py-1 focus:border-black outline-none text-sm"
                                />
                            </div>
                            <button
                                onClick={() => {
                                    if (window.confirm(`¿Eliminar categoría ${cat.nombre}?`)) {
                                        cat.id && deleteCategory(cat.id);
                                    }
                                }}
                                className="text-red-500 text-sm hover:underline"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Formulario para agregar nueva categoría */}
            <div className="mt-8 bg-gray-50 p-6 rounded-xl border-2 border-dashed border-gray-300">
                <h3 className="font-medium mb-4">Agregar Nueva Categoría</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Nombre *</label>
                        <input
                            type="text"
                            value={newCatName}
                            onChange={(e) => setNewCatName(e.target.value.toUpperCase())}
                            placeholder="Ej: ACCESORIOS"
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Ruta (opcional)</label>
                        <input
                            type="text"
                            value={newCatPath}
                            onChange={(e) => setNewCatPath(e.target.value)}
                            placeholder="Ej: /accesorios"
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Imagen (opcional)</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newCatImg}
                                onChange={(e) => setNewCatImg(e.target.value)}
                                placeholder="URL de imagen"
                                className="flex-1 border border-gray-300 rounded px-3 py-2"
                            />
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, setNewCatImg)}
                                className="hidden"
                            />
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                            >
                                📤
                            </button>
                        </div>
                    </div>
                </div>
                <button
                    onClick={handleAddCategory}
                    disabled={isLoading}
                    className={`mt-4 px-6 py-2 rounded transition-colors ${isLoading
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-black text-white hover:bg-gray-800"
                        }`}
                >
                    {isLoading ? "Creando..." : "Crear Categoría"}
                </button>
            </div>
        </section>
    );
}
