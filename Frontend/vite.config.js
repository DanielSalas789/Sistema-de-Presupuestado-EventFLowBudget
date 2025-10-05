// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/Sistema-de-Presupuestado-EventFLowBudget/", // Usa el nombre exacto de tu repo
  plugins: [react()],
});
