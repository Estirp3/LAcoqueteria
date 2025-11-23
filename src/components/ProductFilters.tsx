import { useState } from "react";

interface ProductFiltersProps {
    onSearch: (query: string) => void;
    onFilterColor: (color: string) => void;
    onFilterSize: (size: string) => void;
    availableColors: string[];
    selectedColor: string;
    selectedSize: string;
}

const SIZES = ["XS", "S", "M", "L", "XL"];

export default function ProductFilters({
    onSearch,
    onFilterColor,
    onFilterSize,
    availableColors,
    selectedColor,
    selectedSize,
}: ProductFiltersProps) {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        onSearch(e.target.value);
    };

    const clearFilters = () => {
        setSearchQuery("");
        onSearch("");
        onFilterColor("");
        onFilterSize("");
    };

    return (
        <aside className="w-full lg:w-60 bg-white p-4 rounded-lg shadow-sm border border-gray-100 lg:sticky lg:top-20 h-fit mb-6 lg:mb-0">
            <h2 className="text-base font-medium mb-4 tracking-wide uppercase">Filtros</h2>

            {/* Buscador */}
            <div className="mb-5">
                <label className="block text-xs font-medium text-gray-700 mb-2 uppercase">
                    Buscar
                </label>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Ej: lino, midi, negro..."
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                />
                <p className="text-xs text-gray-500 mt-1">
                    Busca por nombre, material, estilo...
                </p>
            </div>

            {/* Colores */}
            <div className="mb-5">
                <label className="block text-xs font-medium text-gray-700 mb-2 uppercase">
                    Color
                </label>
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => onFilterColor("")}
                        className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${selectedColor === ""
                            ? "bg-black text-white border-black"
                            : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                            }`}
                    >
                        Todos
                    </button>
                    {availableColors.map((color) => (
                        <button
                            key={color}
                            onClick={() => onFilterColor(color)}
                            className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${selectedColor === color
                                ? "bg-black text-white border-black"
                                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                                }`}
                        >
                            {color}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tallas */}
            <div className="mb-5">
                <label className="block text-xs font-medium text-gray-700 mb-2 uppercase">
                    Talla
                </label>
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => onFilterSize("")}
                        className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${selectedSize === ""
                            ? "bg-black text-white border-black"
                            : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                            }`}
                    >
                        Todas
                    </button>
                    {SIZES.map((size) => (
                        <button
                            key={size}
                            onClick={() => onFilterSize(size)}
                            className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${selectedSize === size
                                ? "bg-black text-white border-black"
                                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                                }`}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            {/* Botón limpiar filtros */}
            <button
                onClick={clearFilters}
                className="w-full mt-4 py-2 text-xs text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors uppercase tracking-wide"
            >
                Limpiar Filtros
            </button>
        </aside>
    );
}
