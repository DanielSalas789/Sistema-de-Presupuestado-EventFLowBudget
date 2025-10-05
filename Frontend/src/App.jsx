// App.jsx - Solo UN Router aquí
import React, { use, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import CrearPresupuesto from "./pages/CrearPresupuesto";
import Dashboard from "./pages/Dashboard";
import Presupuestos from "./Pages/VerPresupuestos";
import Home from "./Pages/Home";
import "./Styles/App.css";

function App() {
  // Estado para almacenar los productos obtenidos del backend
  const [productos, setProductos] = useState([]);
  const fetchProductos = async () => {
    try {
      const response = await fetch("http://localhost:5000/productos");
      if (!response.ok) {
        throw new Error("Error en la respuesta de la red");
      }
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  useEffect(() => {
    fetch("http://localhost:5000/productos")
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) =>
        console.error("Error al obtener los productos:", error)
      );
  }, []);

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
            <Route path="/" element={<Home productos={productos} />} />{" "}
            {/* 👈 Paso productos al Home */}
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
