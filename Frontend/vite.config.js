// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
  base: mode === "production"
    ? "/Sistema-de-Presupuestado-EventFLowBudget/" // ✅ solo nombre del repo
    : "/", // ✅ para desarrollo local
  plugins: [react()],
  server: {
    port: 5173, // Puerto específico para el frontend
    open: true, // Abre el navegador automáticamente
    host: true, // Permite acceso desde la red}
    cors: true, // Habilita CORS
  },
  optimizeDeps: {include: ["@supabase/supabase-js", "react","ReactDOM"]},
   
}));
