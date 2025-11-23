import React, { createContext, useContext, useState, useEffect } from "react";

export interface Category {
    id?: number;
    nombre: string;
    img: string;
    to?: string;
}

export interface Product {
    id?: number;
    nombre: string;
    precio: number;
    img: string;
    category: string;
    colores?: string[];
    tallas?: string[];
    description?: string;
    isFeatured?: boolean;
}

export interface AppSettings {
    availableColors: string[];
    availableSizes: string[];
}

const DEFAULT_SETTINGS: AppSettings = {
    availableColors: ["NEGRO", "BLANCO", "ARENA", "VERDE", "ROJO", "AZUL"],
    availableSizes: ["XS", "S", "M", "L", "XL"]
};

export interface Banner {
    id?: number;
    title: string;
    subtitle: string;
    image: string;
    link: string;
    buttonText: string;
}

interface DataContextType {
    categories: Category[];
    featuredProducts: Product[];
    allProducts: Product[];
    banners: Banner[];
    appSettings: AppSettings;
    updateCategory: (id: number, category: Category) => Promise<void>;
    updateProduct: (id: number, product: Product) => Promise<void>;
    updateBanner: (id: number, banner: Banner) => Promise<void>;
    addCategory: (category: Omit<Category, "id">) => Promise<void>;
    addProduct: (product: Product) => Promise<void>;
    addBanner: (banner: Omit<Banner, "id">) => Promise<void>;
    deleteCategory: (id: number) => Promise<void>;
    deleteProduct: (id: number) => Promise<void>;
    deleteBanner: (id: number) => Promise<void>;
    addColor: (color: string) => void;
    removeColor: (color: string) => void;
    resetData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// URL del Backend
const API_URL = "http://localhost:8080/api";

export function DataProvider({ children }: { children: React.ReactNode }) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [banners, setBanners] = useState<Banner[]>([]);
    const [appSettings, setAppSettings] = useState<AppSettings>(DEFAULT_SETTINGS);

    // Cargar datos iniciales
    const fetchData = async () => {
        try {
            const [catRes, prodRes, banRes] = await Promise.all([
                fetch(`${API_URL}/categories`),
                fetch(`${API_URL}/products`),
                fetch(`${API_URL}/banners`)
            ]);

            if (catRes.ok) setCategories(await catRes.json());
            if (prodRes.ok) setAllProducts(await prodRes.json());
            if (banRes.ok) setBanners(await banRes.json());
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const featuredProducts = allProducts.filter(p => p.isFeatured);

    // --- CATEGORIES ---
    const addCategory = async (category: Omit<Category, "id">) => {
        try {
            const res = await fetch(`${API_URL}/categories`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(category)
            });
            if (res.ok) fetchData();
        } catch (error) {
            console.error("Error adding category:", error);
        }
    };

    const updateCategory = async (id: number, category: Category) => {
        try {
            const res = await fetch(`${API_URL}/categories/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(category)
            });
            if (res.ok) fetchData();
        } catch (error) {
            console.error("Error updating category:", error);
        }
    };

    const deleteCategory = async (id: number) => {
        try {
            await fetch(`${API_URL}/categories/${id}`, { method: "DELETE" });
            fetchData();
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    // --- PRODUCTS ---
    const addProduct = async (product: Product) => {
        try {
            const res = await fetch(`${API_URL}/products`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(product)
            });
            if (res.ok) fetchData();
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    const updateProduct = async (id: number, product: Product) => {
        try {
            const res = await fetch(`${API_URL}/products/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(product)
            });
            if (res.ok) fetchData();
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const deleteProduct = async (id: number) => {
        try {
            await fetch(`${API_URL}/products/${id}`, { method: "DELETE" });
            fetchData();
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    // --- BANNERS ---
    const addBanner = async (banner: Omit<Banner, "id">) => {
        try {
            const res = await fetch(`${API_URL}/banners`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(banner)
            });
            if (res.ok) fetchData();
        } catch (error) {
            console.error("Error adding banner:", error);
        }
    };

    const updateBanner = async (id: number, banner: Banner) => {
        try {
            const res = await fetch(`${API_URL}/banners/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(banner)
            });
            if (res.ok) fetchData();
        } catch (error) {
            console.error("Error updating banner:", error);
        }
    };

    const deleteBanner = async (id: number) => {
        try {
            await fetch(`${API_URL}/banners/${id}`, { method: "DELETE" });
            fetchData();
        } catch (error) {
            console.error("Error deleting banner:", error);
        }
    };

    // --- SETTINGS (Local por ahora) ---
    const addColor = (color: string) => {
        if (!appSettings.availableColors.includes(color)) {
            setAppSettings(prev => ({
                ...prev,
                availableColors: [...prev.availableColors, color]
            }));
        }
    };

    const removeColor = (color: string) => {
        setAppSettings(prev => ({
            ...prev,
            availableColors: prev.availableColors.filter(c => c !== color)
        }));
    };

    const resetData = () => {
        fetchData();
    };

    return (
        <DataContext.Provider value={{
            categories,
            featuredProducts,
            allProducts,
            banners,
            appSettings,
            updateCategory,
            updateProduct,
            updateBanner,
            addCategory,
            addProduct,
            addBanner,
            deleteCategory,
            deleteProduct,
            deleteBanner,
            addColor,
            removeColor,
            resetData
        }}>
            {children}
        </DataContext.Provider>
    );
}

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error("useData must be used within a DataProvider");
    }
    return context;
};
