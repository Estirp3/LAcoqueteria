import { useEffect, useState } from "react";
import { useData } from "../context/DataContext";
import { useNavigate } from "react-router-dom";
import AdminColorManager from "../components/admin/AdminColorManager";
import AdminBannerManager from "../components/admin/AdminBannerManager";
import AdminCategoryManager from "../components/admin/AdminCategoryManager";
import AdminProductManager from "../components/admin/AdminProductManager";
import AdminFeaturedManager from "../components/admin/AdminFeaturedManager";
import AdminThemeManager from "../components/admin/AdminThemeManager";

export default function Admin() {
    const navigate = useNavigate();
    const {
        categories,
        updateCategory,
        addCategory,
        deleteCategory,
        allProducts,
        featuredProducts,
        banners,
        addBanner,
        updateBanner,
        deleteBanner,
        appSettings,
        addColor,
        removeColor,
        updateProduct,
        addProduct,
        deleteProduct,
        resetData
    } = useData();

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAuthChecking, setIsAuthChecking] = useState(true);

    useEffect(() => {
        const checkAuth = () => {
            const isLoggedIn = localStorage.getItem("isAdminLoggedIn");
            if (!isLoggedIn) {
                navigate("/login");
            } else {
                setIsAuthenticated(true);
            }
            setIsAuthChecking(false);
        };
        checkAuth();
    }, [navigate]);

    if (isAuthChecking) {
        return <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">Verificando acceso...</div>;
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen bg-[#FDFBF7] p-8 pt-32">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-4xl font-light tracking-widest text-gray-800">PANEL DE CONTROL</h1>
                    <button
                        onClick={() => {
                            if (window.confirm("¿Estás seguro de recargar los datos?")) {
                                resetData();
                            }
                        }}
                        className="text-red-500 underline text-sm hover:text-red-700"
                    >
                        Recargar Datos
                    </button>
                </div>

                <AdminThemeManager />

                <AdminColorManager
                    availableColors={appSettings.availableColors}
                    addColor={addColor}
                    removeColor={removeColor}
                />

                <AdminBannerManager
                    banners={banners}
                    addBanner={addBanner}
                    updateBanner={updateBanner}
                    deleteBanner={deleteBanner}
                />

                <AdminCategoryManager
                    categories={categories}
                    addCategory={addCategory}
                    updateCategory={updateCategory}
                    deleteCategory={deleteCategory}
                />

                <AdminProductManager
                    categories={categories}
                    allProducts={allProducts}
                    addProduct={addProduct}
                    updateProduct={updateProduct}
                    deleteProduct={deleteProduct}
                    availableColors={appSettings.availableColors}
                />

                <AdminFeaturedManager
                    allProducts={allProducts}
                    featuredProducts={featuredProducts}
                    updateProduct={updateProduct}
                />
            </div>
        </div>
    );
}
