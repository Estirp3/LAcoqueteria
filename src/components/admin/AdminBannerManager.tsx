import React, { useState, useRef } from "react";
import type { Banner } from "../../context/DataContext";

interface AdminBannerManagerProps {
    banners: Banner[];
    addBanner: (banner: Omit<Banner, "id">) => Promise<void>;
    updateBanner: (id: number, banner: Banner) => Promise<void>;
    deleteBanner: (id: number) => Promise<void>;
}

export default function AdminBannerManager({ banners, addBanner, updateBanner, deleteBanner }: AdminBannerManagerProps) {
    const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [bannerTitle, setBannerTitle] = useState("");
    const [bannerSubtitle, setBannerSubtitle] = useState("");
    const [bannerImage, setBannerImage] = useState("");
    const [bannerLink, setBannerLink] = useState("");
    const [bannerButtonText, setBannerButtonText] = useState("");
    const bannerFileInputRef = useRef<HTMLInputElement>(null);

    const handleEditBanner = (banner: Banner) => {
        setEditingBanner(banner);
        setIsCreating(false);
        setBannerTitle(banner.title);
        setBannerSubtitle(banner.subtitle);
        setBannerImage(banner.image);
        setBannerLink(banner.link);
        setBannerButtonText(banner.buttonText);
    };

    const handleNewBanner = () => {
        setEditingBanner(null);
        setIsCreating(true);
        setBannerTitle("");
        setBannerSubtitle("");
        setBannerImage("");
        setBannerLink("");
        setBannerButtonText("");
    };

    const handleSaveBanner = async () => {
        if (!bannerTitle || !bannerImage || !bannerLink || !bannerButtonText) {
            alert("Por favor completa todos los campos del banner.");
            return;
        }

        const bannerData = {
            title: bannerTitle,
            subtitle: bannerSubtitle,
            image: bannerImage,
            link: bannerLink,
            buttonText: bannerButtonText
        };

        try {
            if (isCreating) {
                await addBanner(bannerData);
                alert("✅ Banner creado exitosamente");
            } else if (editingBanner && editingBanner.id) {
                await updateBanner(editingBanner.id, { ...editingBanner, ...bannerData });
                alert("✅ Banner actualizado exitosamente");
            }
            handleCloseModal();
        } catch (error) {
            alert("❌ Error al guardar el banner");
            console.error(error);
        }
    };

    const handleCloseModal = () => {
        setEditingBanner(null);
        setIsCreating(false);
        setBannerTitle("");
        setBannerSubtitle("");
        setBannerImage("");
        setBannerLink("");
        setBannerButtonText("");
    };

    const handleBannerImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setBannerImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeleteBanner = async (id: number, title: string) => {
        if (window.confirm(`¿Estás seguro de eliminar el banner "${title}"?`)) {
            try {
                await deleteBanner(id);
                alert("✅ Banner eliminado exitosamente");
            } catch (error) {
                alert("❌ Error al eliminar el banner");
                console.error(error);
            }
        }
    };

    return (
        <section className="mb-16">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-medium border-b border-gray-300 pb-2">Gestión de Banners (Portada Principal)</h2>
                    <p className="text-sm text-gray-600 mt-2">Edita los banners que aparecen en la portada principal del sitio.</p>
                </div>
                <button
                    onClick={handleNewBanner}
                    className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                    + Agregar Banner
                </button>
            </div>

            <div className="space-y-6">
                {banners.map((banner) => (
                    <div key={banner.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex gap-6">
                            <div className="w-32 h-20 shrink-0 relative rounded-lg overflow-hidden bg-gray-100">
                                <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-medium mb-2">{banner.title}</h3>
                                <p className="text-sm text-gray-600 mb-2">{banner.subtitle}</p>
                                <p className="text-xs text-gray-500 mb-1">Enlace: <span className="font-mono">{banner.link}</span></p>
                                <p className="text-xs text-gray-500">Botón: "{banner.buttonText}"</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEditBanner(banner)}
                                    className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 h-fit"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => banner.id && handleDeleteBanner(banner.id, banner.title)}
                                    className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 h-fit"
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {(editingBanner || isCreating) && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-8">
                            <h2 className="text-2xl font-medium mb-6">
                                {isCreating ? "Nuevo Banner" : "Editar Banner"}
                            </h2>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Título</label>
                                    <input
                                        type="text"
                                        value={bannerTitle}
                                        onChange={(e) => setBannerTitle(e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3"
                                        placeholder="Ej: NUEVA COLECCIÓN"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Subtítulo</label>
                                    <input
                                        type="text"
                                        value={bannerSubtitle}
                                        onChange={(e) => setBannerSubtitle(e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3"
                                        placeholder="Ej: Descubre nuestras nuevas prendas"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Imagen del Banner</label>
                                    <div className="flex gap-4 items-start">
                                        <div className="flex-1">
                                            <input
                                                type="text"
                                                value={bannerImage}
                                                onChange={(e) => setBannerImage(e.target.value)}
                                                className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-2"
                                                placeholder="URL de la imagen"
                                            />
                                            <input
                                                ref={bannerFileInputRef}
                                                type="file"
                                                accept="image/*"
                                                onChange={handleBannerImageUpload}
                                                className="hidden"
                                            />
                                            <button
                                                onClick={() => bannerFileInputRef.current?.click()}
                                                className="text-sm text-blue-600 hover:underline"
                                            >
                                                📤 Subir desde tu computadora
                                            </button>
                                        </div>
                                        {bannerImage && (
                                            <div className="w-32 h-20 rounded-lg overflow-hidden bg-gray-100">
                                                <img src={bannerImage} alt="Preview" className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Enlace (Ruta)</label>
                                    <input
                                        type="text"
                                        value={bannerLink}
                                        onChange={(e) => setBannerLink(e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3"
                                        placeholder="Ej: /nueva-coleccion"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Texto del Botón</label>
                                    <input
                                        type="text"
                                        value={bannerButtonText}
                                        onChange={(e) => setBannerButtonText(e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3"
                                        placeholder="Ej: VER COLECCIÓN"
                                    />
                                </div>
                                <div className="flex gap-4 pt-4">
                                    <button
                                        onClick={handleCloseModal}
                                        className="flex-1 border border-gray-300 text-gray-600 py-3 rounded-lg hover:bg-gray-50"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={handleSaveBanner}
                                        className="flex-1 bg-black text-white py-3 rounded-lg hover:bg-gray-800"
                                    >
                                        {isCreating ? "Crear Banner" : "Guardar Cambios"}
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
