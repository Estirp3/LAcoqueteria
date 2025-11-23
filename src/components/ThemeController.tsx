import { useEffect } from "react";

export default function ThemeController() {
    useEffect(() => {
        // Función para aplicar el tema
        const loadTheme = () => {
            const saved = localStorage.getItem('theme-palette-v2');
            if (saved) {
                try {
                    const palette = JSON.parse(saved);
                    const root = document.documentElement;

                    // Aplicar variables CSS
                    root.style.setProperty('--color-bg-primary', palette.bgPrimary);
                    root.style.setProperty('--color-bg-secondary', palette.bgSecondary);
                    root.style.setProperty('--color-text-primary', palette.textPrimary);
                    root.style.setProperty('--color-text-secondary', palette.textSecondary);
                    root.style.setProperty('--color-accent', palette.accent);
                    root.style.setProperty('--color-border', palette.border);

                    // Variables de botones (si existen en el tema guardado)
                    if (palette.buttonBg) root.style.setProperty('--color-button-bg', palette.buttonBg);
                    if (palette.buttonText) root.style.setProperty('--color-button-text', palette.buttonText);

                    // Aplicar al body
                    document.body.style.backgroundColor = palette.bgPrimary;
                    document.body.style.color = palette.textPrimary;
                } catch (e) {
                    console.error('Error applying theme:', e);
                }
            }
        };

        // Cargar al inicio
        loadTheme();

        // Escuchar cambios en localStorage (para sincronizar pestañas)
        window.addEventListener('storage', loadTheme);

        return () => window.removeEventListener('storage', loadTheme);
    }, []);

    return null; // Este componente no renderiza nada visual
}
