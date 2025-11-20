// 📄 src/App.jsx
import React, { useState, useEffect } from "react";
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
import NuestrosServicios from "./Pages/Paquetes.jsx";
import CrearPresupuesto from "./Pages/CrearPresupuesto";

// ✅ CORREGIDO: Importa solo la variable supabase
// En App.jsx - usa esta importación:
import { supabase } from "./data/supabaseClient.js"; // 👈 Agrega .js// 👈 Sin el "data/" si está en src/

// 👥 Rutas según tipo de usuario
import Login from "./Pages/Login";
import AdminPanel from "./Pages/AdminPanel";
import EmpleadoPanel from "./Pages/EmpleadoPanel";

import "./Styles/App.css";

function App() {
  // ================== PRUEBA SUPABASE
  //  ==================
  // ✅ Verificar conexión con Supabase al cargar
  useEffect(() => {
    const testSupabase = async () => {
      try {
        const { data, error } = await supabase
          .from("presupuestos")
          .select("*")
          .limit(1);
        if (error) throw error;
        console.log("✅ Conexión a Supabase exitosa");
      } catch (error) {
        console.error("❌ Error conectando a Supabase:", error.message);
      }
    };

    testSupabase();
  }, []);
  // ================== ESTADOS PRINCIPALES ==================
  const [usuario, setUsuario] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // ================== FUNCIONES DE SESIÓN ==================
  const handleLogin = (tipoUsuario) => {
    setUsuario({ tipo: tipoUsuario });
  };

  const handleLogout = () => {
    setUsuario(null);
  };

  // ================== VALIDACIÓN DE SESIÓN ==================
  if (!usuario) {
    return (
      <Router>
        <Routes>
          <Route path="*" element={<Login onLogin={handleLogin} />} />
        </Routes>
      </Router>
    );
  }

  // ================== APLICACIÓN PRINCIPAL ==================
  return (
    <Router>
      <div className="app">
        <Sidebar
          usuario={usuario}
          onLogout={handleLogout}
          onToggle={(collapsed) => setIsCollapsed(collapsed)}
        />

        <main className={`main-content ${isCollapsed ? "collapsed" : ""}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/Nuestros-Servicios" element={<NuestrosServicios />} />
            <Route path="/crear-presupuesto" element={<CrearPresupuesto />} />

            {usuario.tipo === "administrador" && (
              <Route path="/admin" element={<AdminPanel />} />
            )}

            {usuario.tipo === "empleado" && (
              <Route path="/empleado" element={<EmpleadoPanel />} />
            )}

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
