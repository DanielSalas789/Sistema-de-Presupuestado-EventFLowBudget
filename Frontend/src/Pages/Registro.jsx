import React, { useState } from "react";
import { supabase } from "../data/supabaseClient";
import { useNavigate } from "react-router-dom";
import "../Styles/Login.css"; // reutilizamos estilos del login

export default function Registro() {
  const navigate = useNavigate();

  const [correo, setCorreo] = useState("");
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleMostrarPassword = () => setMostrarPassword((v) => !v);

  const registerUser = async (e) => {
    e.preventDefault();
    if (!correo || !password || !nombre) {
      return alert("⚠️ Por favor completa todos los campos.");
    }

    try {
      setLoading(true);

      // Normalizar correo
      const emailNorm = correo.trim().toLowerCase();

      // 1️⃣ Crear usuario en Auth
      const { data, error } = await supabase.auth.signUp({
        email: emailNorm,
        password: password,
      });

      if (error) {
        setLoading(false);
        return alert(`❌ Error al registrarse: ${error.message}`);
      }

      // 2️⃣ Guardar en tabla usuarios
      await supabase.from("usuarios").insert({
        id: data.user.id,
        correo: emailNorm,
        nombre,
        rol: "usuario", // se puede cambiar más adelante
        contrasenia: password, // luego lo cambiamos por hash bcrypt
      });

      alert("✅ Cuenta creada. Ahora inicia sesión.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("❌ Error inesperado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registro-container login-container">
      <h1>Crear Cuenta</h1>
      <p>Regístrate para comenzar a usar el sistema.</p>

      <form
        onSubmit={registerUser}
        className="login-box"
        style={{ maxWidth: 420 }}
      >
        <input
          className="login-input"
          placeholder="Nombre completo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          className="login-input"
          type="email"
          placeholder="Correo electrónico"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />

        <div className="password-wrapper">
          <input
            className="login-input password-input"
            type={mostrarPassword ? "text" : "password"}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="eye-btn"
            onClick={toggleMostrarPassword}
          >
            {mostrarPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? "Creando cuenta..." : "Crear cuenta"}
        </button>

        <button
          type="button"
          className="login-btn secondary-btn"
          onClick={() => navigate("/login")}
        >
          Volver al login
        </button>
      </form>
    </div>
  );
}
