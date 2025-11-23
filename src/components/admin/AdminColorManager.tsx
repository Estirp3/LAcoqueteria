import { useState } from "react";

interface AdminColorManagerProps {
    availableColors: string[];
    addColor: (color: string) => void;
    removeColor: (color: string) => void;
}

export default function AdminColorManager({ availableColors, addColor, removeColor }: AdminColorManagerProps) {
    const [newColorName, setNewColorName] = useState("");

    const handleAddColor = () => {
        if (newColorName.trim() && !availableColors.includes(newColorName.toUpperCase())) {
            addColor(newColorName.toUpperCase());
            setNewColorName("");
        }
    };

    return (
        <section className="mb-16">
            <h2 className="text-2xl font-medium mb-6 border-b border-gray-300 pb-2">Gestión de Colores</h2>
            <p className="text-sm text-gray-600 mb-4">Estos colores estarán disponibles para asignar a los productos.</p>

            <div className="flex flex-wrap gap-3 mb-6">
                {availableColors.map(color => (
                    <div key={color} className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200">
                        <span className="font-medium">{color}</span>
                        <button
                            onClick={() => {
                                if (window.confirm(`¿Eliminar el color ${color}?`)) {
                                    removeColor(color);
                                }
                            }}
                            className="text-red-500 hover:text-red-700 text-sm"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>

            <div className="flex gap-2 max-w-md">
                <input
                    type="text"
                    value={newColorName}
                    onChange={(e) => setNewColorName(e.target.value)}
                    placeholder="Nuevo color (ej: ROJO)"
                    className="flex-1 border border-gray-300 rounded px-4 py-2"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddColor()}
                />
                <button
                    onClick={handleAddColor}
                    className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
                >
                    Agregar Color
                </button>
            </div>
        </section>
    );
}
