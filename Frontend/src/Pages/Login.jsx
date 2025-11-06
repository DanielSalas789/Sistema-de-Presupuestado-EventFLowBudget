import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "../Styles/Login.css";

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const doLogin = async (e) => {
    e.preventDefault();

    // Iniciar sesión con Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email: correo,
      password,
    });

    if (error) {
      alert("❌ Usuario o contraseña incorrectos");
      return;
    }

    // Buscar el rol del usuario
    const { data: perfil } = await supabase
      .from("usuarios")
      .select("rol")
      .eq("id", data.user.id)
      .single();

    // Guardamos rol en estado global
    onLogin(perfil.rol);

    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <h1>Iniciar Sesión</h1>
      <form onSubmit={doLogin}>
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Ingresar</button>
      </form>

      <button onClick={() => navigate("/registro")}>Crear usuario</button>

      <button onClick={() => navigate("/presupuesto-invitado")}>
        Presupuesto rápido (sin registrarse)
      </button>
    </div>
  );
}
