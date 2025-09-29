// App.jsx - Solo UN Router aquí
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import CrearPresupuesto from "./pages/CrearPresupuesto";
import Dashboard from "./pages/Dashboard";
import Presupuestos from "./Pages/VerPresupuestos";
import "./Styles/App.css";

function App() {
  return (
    // Configuración principal del enrutador de la aplicación
    // SOLO existe un Router en toda la app (mejor práctica)
    <Router>
      {/* Contenedor principal de la aplicación */}
      <div className="app">
        {/* Componente de barra lateral que se muestra en todas las páginas */}
        <Sidebar />

        {/* Contenedor del contenido principal */}
        <main className="main-content">
          {/* Sistema de rutas de la aplicación */}
          <Routes>
            {/* Ruta para la página de inicio (dashboard) */}
            <Route path="/" element={<Dashboard />} />

            {/* Ruta alternativa para el dashboard */}
            <Route Component={Dashboard} path="/dashboard" />

            {/* Ruta para la creación de nuevos presupuestos */}
            <Route path="/crear-presupuesto" element={<CrearPresupuesto />} />

            {/* Ruta para visualizar el listado de presupuestos */}
            <Route path="/presupuestos" element={<Presupuestos />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
