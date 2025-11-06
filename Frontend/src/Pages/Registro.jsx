import React, { useState } from "react";
import { supabase } from "../supabaseClient";

export default function Registro() {
  const [correo, setCorreo] = useState("");
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email: correo,
      password,
    });

    if (error) {
      alert("Error al registrarse");
      return;
    }

    await supabase
      .from("usuarios")
      .insert([{ id: data.user.id, correo, nombre, rol: "usuario" }]);

    alert("Cuenta creada ✅ Revisa tu correo para confirmar.");
  };

  return (
    <form onSubmit={registerUser}>
      <input
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre"
      />
      <input
        type="email"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        placeholder="Correo"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
      />
      <button type="submit">Crear cuenta</button>
    </form>
  );
}
