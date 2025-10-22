// 📄 App.jsx
import React, { useState } from "react";
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

import Login from "./Pages/Login";
import AdminPanel from "./Pages/AdminPanel";
import EmpleadoPanel from "./Pages/EmpleadoPanel";
import CrearPresupuesto from "./Pages/CrearPresupuesto";
import Presupuestos from "./Pages/Presupuestos";

function App() {
  const [usuario, setUsuario] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false); // 👈 nuevo estado

  const handleLogin = (tipoUsuario) => {
    setUsuario({ tipo: tipoUsuario });
  };

  const handleLogout = () => {
    setUsuario(null);
  };

  if (!usuario) {
    return (
      <Router>
        <Routes>
          <Route path="*" element={<Login onLogin={handleLogin} />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div className="app">
        <Sidebar
          usuario={usuario}
          onLogout={handleLogout}
          onToggle={(collapsed) => setIsCollapsed(collapsed)} // 👈 pasamos el estado
        />

        {/* Ajusta el margen dinámicamente */}
        <main className={`main-content ${isCollapsed ? "collapsed" : ""}`}>
          <Routes>
            <Route path="/" element={<Home />} />

            {usuario.tipo === "administrador" && (
              <Route path="/admin" element={<AdminPanel />} />
            )}

            {usuario.tipo === "empleado" && (
              <Route path="/empleado" element={<EmpleadoPanel />} />
            )}

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/crear-presupuesto" element={<CrearPresupuesto />} />
            <Route path="/presupuestos" element={<Presupuestos />} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
