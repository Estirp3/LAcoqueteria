import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ¡Ojo con mayúsculas! Debe coincidir EXACTO con el nombre del repo
export default defineConfig({
  base: "/LAcoqueteria/",
  plugins: [react()],
});
