import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Login.css";

export default function Login({ onLogin }) {
  const navigate = useNavigate();

  const doLogin = (tipo) => {
    onLogin(tipo);
    navigate("/Frontend/src/Pages/Home.jsx"); // redirige a Home después de iniciar sesión
  };

  return (
    <div className="login-container">
      <h1>💼 EventFlow Budget</h1>
      <p>Inicia sesión para acceder al sistema</p>

      <div className="login-buttons">
        <button className="btn-admin" onClick={() => doLogin("administrador")}>
          Ingresar como Administrador
        </button>

        <button className="btn-usuario" onClick={() => doLogin("usuario")}>
          Ingresar como Usuario
        </button>

        <button className="btn-empleado" onClick={() => doLogin("empleado")}>
          Ingresar como Empleado de Salón
        </button>
      </div>
    </div>
  );
}
