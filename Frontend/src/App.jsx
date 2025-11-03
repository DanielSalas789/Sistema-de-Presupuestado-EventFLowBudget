// 📄 src/App.jsx
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// 🧩 Componentes principales
import Sidebar from "./Components/sidebar";
import Dashboard from "./Pages/Dashboard";
import Home from "./Pages/Home";

// ✅ Componente de prueba de Supabase

// 👥 Rutas según tipo de usuario
import Login from "./Pages/Login";
import AdminPanel from "./Pages/AdminPanel";
import EmpleadoPanel from "./Pages/EmpleadoPanel";

import "./Styles/App.css";

function App() {
  // ================== ESTADOS PRINCIPALES ==================
  const [usuario, setUsuario] = useState(null); // Guarda el usuario actual y su rol
  const [isCollapsed, setIsCollapsed] = useState(false); // Controla el colapso del sidebar

  // ================== FUNCIONES DE SESIÓN ==================
  // 🔹 Cuando el usuario inicia sesión, guardamos su tipo (admin o empleado)
  const handleLogin = (tipoUsuario) => {
    setUsuario({ tipo: tipoUsuario });
  };

  // 🔹 Cierra sesión (borra usuario)
  const handleLogout = () => {
    setUsuario(null);
  };

  // ================== VALIDACIÓN DE SESIÓN ==================
  // Si el usuario NO ha iniciado sesión, se muestra solo el Login
  if (!usuario) {
    return (
      <Router>
        <Routes>
          {/* El wildcard (*) asegura que cualquier ruta redirige al login */}
          <Route path="*" element={<Login onLogin={handleLogin} />} />
        </Routes>
      </Router>
    );
  }

  // ================== APLICACIÓN PRINCIPAL ==================
  // Si el usuario SÍ ha iniciado sesión, mostramos todo el sistema
  return (
    <Router>
      <div className="app">
        {/* 📌 Sidebar con control de sesión y colapso */}
        <Sidebar
          usuario={usuario}
          onLogout={handleLogout}
          onToggle={(collapsed) => setIsCollapsed(collapsed)}
        />

        {/* ================== ÁREA CENTRAL ================== */}
        <main className={`main-content ${isCollapsed ? "collapsed" : ""}`}>
          <Routes>
            {/* Página principal */}
            <Route path="/" element={<Home />} />

            {/* Panel general con resumen, estadísticas y Supabase */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Crear y listar presupuestos */}

            {/* ================== RUTAS POR TIPO DE USUARIO ================== */}
            {usuario.tipo === "administrador" && (
              <Route path="/admin" element={<AdminPanel />} />
            )}

            {usuario.tipo === "empleado" && (
              <Route path="/empleado" element={<EmpleadoPanel />} />
            )}

            {/* Cualquier ruta no válida redirige a inicio */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
