import { useState, useEffect } from "react";

interface ColorPalette {
    name: string;
    bgPrimary: string;
    bgSecondary: string;
    textPrimary: string;
    textSecondary: string;
    accent: string;
    border: string;
    buttonBg: string; // Nuevo: Color específico para botones
    buttonText: string; // Nuevo: Color texto botones
    description: string;
}

const COLOR_PALETTES: ColorPalette[] = [
    {
        name: "Original La Coquetería",
        bgPrimary: "#FDFBF7",
        bgSecondary: "#FFFFFF",
        textPrimary: "#1A1A1A",
        textSecondary: "#4A4A4A",
        accent: "#D4AF37",
        border: "#E5E5E5",
        buttonBg: "#1A1A1A", // Botones negros clásicos
        buttonText: "#FFFFFF",
        description: "El diseño original. Sobrio, elegante y atemporal."
    },
    {
        name: "Modo Oscuro Elegante",
        bgPrimary: "#0F0F0F",
        bgSecondary: "#1A1A1A",
        textPrimary: "#FFFFFF",
        textSecondary: "#A0A0A0",
        accent: "#D4AF37",
        border: "#333333",
        buttonBg: "#D4AF37", // Botones dorados para resaltar
        buttonText: "#000000",
        description: "Fondo negro profundo con acentos dorados de lujo."
    },
    {
        name: "Rosa Coquette",
        bgPrimary: "#FFF0F5",
        bgSecondary: "#FFFFFF",
        textPrimary: "#5D4037", // Marrón chocolate
        textSecondary: "#8D6E63",
        accent: "#DB7093",
        border: "#F8BBD0",
        buttonBg: "#DB7093", // ¡Botones ROSAS! (Ya no negros)
        buttonText: "#FFFFFF",
        description: "Dulce y femenino. Botones rosa fuerte y textos chocolate."
    },
    {
        name: "Azul Medianoche",
        bgPrimary: "#0B1026",
        bgSecondary: "#151B3B",
        textPrimary: "#E2E8F0",
        textSecondary: "#94A3B8",
        accent: "#38BDF8",
        border: "#1E293B",
        buttonBg: "#38BDF8", // Botones celestes
        buttonText: "#0B1026",
        description: "Elegancia nocturna con botones vibrantes."
    },
    {
        name: "Salvia Fresco",
        bgPrimary: "#F1F8F6",
        bgSecondary: "#FFFFFF",
        textPrimary: "#1B4D3E",
        textSecondary: "#4A7c6E",
        accent: "#2D6A4F",
        border: "#D8ECE5",
        buttonBg: "#2D6A4F", // Botones verde esmeralda
        buttonText: "#FFFFFF",
        description: "Frescura natural con tonos verdes relajantes."
    }
];

export default function AdminThemeManager() {
    const [selectedPalette, setSelectedPalette] = useState<ColorPalette>(COLOR_PALETTES[0]);
    const [applying, setApplying] = useState(false);
    const [justApplied, setJustApplied] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('theme-palette-v2');
        if (saved) {
            try {
                const palette = JSON.parse(saved);
                const found = COLOR_PALETTES.find(p => p.name === palette.name);
                if (found) {
                    setSelectedPalette(found);
                    applyPaletteToDOM(found);
                } else {
                    setSelectedPalette(COLOR_PALETTES[0]);
                    applyPaletteToDOM(COLOR_PALETTES[0]);
                }
            } catch (e) {
                console.error('Error loading saved theme:', e);
            }
        }
    }, []);

    const applyPaletteToDOM = (palette: ColorPalette) => {
        const root = document.documentElement;

        root.style.setProperty('--color-bg-primary', palette.bgPrimary);
        root.style.setProperty('--color-bg-secondary', palette.bgSecondary);
        root.style.setProperty('--color-text-primary', palette.textPrimary);
        root.style.setProperty('--color-text-secondary', palette.textSecondary);
        root.style.setProperty('--color-accent', palette.accent);
        root.style.setProperty('--color-border', palette.border);

        // Nuevas variables para botones
        root.style.setProperty('--color-button-bg', palette.buttonBg);
        root.style.setProperty('--color-button-text', palette.buttonText);

        document.body.style.backgroundColor = palette.bgPrimary;
        document.body.style.color = palette.textPrimary;
    };

    const applyPalette = (palette: ColorPalette) => {
        setApplying(true);
        setJustApplied(false);

        applyPaletteToDOM(palette);
        localStorage.setItem('theme-palette-v2', JSON.stringify(palette));
        setSelectedPalette(palette);

        setTimeout(() => {
            setApplying(false);
            setJustApplied(true);
            setTimeout(() => setJustApplied(false), 2000);
        }, 300);
    };

    return (
        <section className="mb-16">
            {justApplied && (
                <div className="fixed top-24 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
                    ✅ Tema aplicado: {selectedPalette.name}
                </div>
            )}

            <div className="mb-8">
                <h2 className="text-2xl font-light tracking-wide mb-2">
                    Personalización de Estilo
                </h2>
                <p className="text-gray-600 text-sm">
                    Elige el estilo de tu tienda. Los botones y colores se adaptarán automáticamente.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {COLOR_PALETTES.map((palette, index) => (
                    <div
                        key={index}
                        className={`group relative rounded-xl shadow-sm border-2 transition-all duration-300 cursor-pointer hover:shadow-xl overflow-hidden ${selectedPalette.name === palette.name
                            ? 'border-black ring-1 ring-black transform scale-[1.02]'
                            : 'border-gray-100 hover:border-gray-300'
                            }`}
                        onClick={() => applyPalette(palette)}
                    >
                        {/* Preview Visual */}
                        <div className="h-32 w-full flex flex-col relative p-4" style={{ backgroundColor: palette.bgPrimary }}>
                            <div className="flex justify-between items-center mb-2">
                                <span style={{ color: palette.textPrimary }} className="font-serif text-xl">Aa</span>
                                <div className="h-6 w-6 rounded-full" style={{ backgroundColor: palette.accent }}></div>
                            </div>

                            {/* Preview del Botón */}
                            <div className="mt-auto self-center px-6 py-2 rounded text-xs font-medium shadow-sm"
                                style={{ backgroundColor: palette.buttonBg, color: palette.buttonText }}>
                                Ver Producto
                            </div>
                        </div>

                        <div className="p-5 bg-white">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-medium text-gray-900">{palette.name}</h4>
                                {selectedPalette.name === palette.name && (
                                    <span className="bg-green-100 text-green-800 text-[10px] px-2 py-1 rounded-full font-bold uppercase">
                                        Activo
                                    </span>
                                )}
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed">
                                {palette.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
