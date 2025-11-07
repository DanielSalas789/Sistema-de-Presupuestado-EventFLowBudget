// src/Pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Login.css";
import Registro from "./Registro";

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);

  const handleQuickLogin = (role) => {
    // Simulación de login exitoso
    console.log(`✅ Login rápido como: ${role}`);

    // Llamar a la función de login del App.jsx
    onLogin(role);

    // Redirigir según el rol
    switch (role) {
      case "admin":
        navigate("/admin");
        break;
      case "empleado":
        navigate("/empleado");
        break;
      case "invitado":
        navigate("/presupuesto-invitado");
        break;
      default:
        navigate("/dashboard");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>🚀 Login de Prueba</h1>
        <p className="login-subtitle">
          Selecciona un rol para entrar rápidamente
        </p>

        <div className="button-group">
          <button
            className={`login-btn admin-btn ${
              selectedRole === "admin" ? "selected" : ""
            }`}
            onClick={() => handleQuickLogin("admin")}
          >
            👨‍💼 Administrador
          </button>

          <button
            className={`login-btn user-btn ${
              selectedRole === "empleado" ? "selected" : ""
            }`}
            onClick={() => handleQuickLogin("empleado")}
          >
            👤 Empleado
          </button>

          <button
            className={`login-btn guest-btn ${
              selectedRole === "invitado" ? "selected" : ""
            }`}
            onClick={() => handleQuickLogin("invitado")}
          >
            🎯 Invitado
          </button>
        </div>

        {/* Opción para ir al registro si aún lo necesitas */}
        <button className="secondary-btn" onClick={() => navigate("/registro")}>
          📝 Ir al Registro (Formulario completo)
        </button>
      </div>
    </div>
  );
}
