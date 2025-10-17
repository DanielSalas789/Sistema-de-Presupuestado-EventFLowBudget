// App.jsx - Solo UN Router aquí
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from "./Components/Sidebar";

import Dashboard from "./Pages/Dashboard";

import Home from "./Pages/Home";
import "./Styles/App.css";

// NUEVOS COMPONENTES
import Login from "./Pages/Login"; // Página de inicio de sesión

function App() {
  // Estado para el usuario autenticado
  const [usuario, setUsuario] = useState(null);

  // Cargar productos del backend

  // Función para manejar inicio de sesión simulado
  const handleLogin = (tipoUsuario) => {
    // Simulamos un inicio de sesión exitoso
    setUsuario({ tipo: tipoUsuario });
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    setUsuario(null);
  };

  // Si NO hay usuario logueado, mostramos la página de inicio de sesión
  if (!usuario) {
    return (
      <Router>
        <Routes>
          <Route path="*" element={<Login onLogin={handleLogin} />} />
        </Routes>
      </Router>
    );
  }

  // Si hay usuario logueado, mostramos la interfaz principal
  return (
    <Router>
      <div className="app">
        {/* Sidebar visible solo si hay sesión */}
        <Sidebar usuario={usuario} onLogout={handleLogout} />

        <main className="main-content">
          <Routes>
            {/* Home general */}
            <Route path="/" element={<Home />} />

            {/* Paneles según tipo de usuario */}
            {usuario.tipo === "administrador" && (
              <Route path="/admin" element={<AdminPanel />} />
            )}

            {usuario.tipo === "empleado" && (
              <Route path="/empleado" element={<EmpleadoPanel />} />
            )}

            {/* Rutas comunes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/crear-presupuesto" element={<CrearPresupuesto />} />
            <Route path="/presupuestos" element={<Presupuestos />} />

            {/* Redirección general */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
