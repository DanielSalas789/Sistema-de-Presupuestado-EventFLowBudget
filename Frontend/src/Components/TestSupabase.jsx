// 📄 src/TestSupabase.jsx
import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient.js";

const TestSupabase = () => {
  const [mensajes, setMensajes] = useState([]);
  const [nuevoMensaje, setNuevoMensaje] = useState("");

  // 🔹 Cargar mensajes desde la tabla "mensajes"
  const fetchMensajes = async () => {
    const { data, error } = await supabase.from("Mensajes").select("*");
    if (error) console.error("Error al obtener mensajes:", error);
    else setMensajes(data);
  };

  // 🔹 Insertar nuevo mensaje
  const agregarMensaje = async () => {
    if (!nuevoMensaje.trim()) return;
    const { error } = await supabase
      .from("mensajes")
      .insert([{ contenido: nuevoMensaje }]);
    if (error) console.error("Error al insertar:", error);
    else {
      setNuevoMensaje("");
      fetchMensajes();
    }
  };

  useEffect(() => {
    fetchMensajes();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🧪 Prueba de conexión con Supabase</h1>

      <div>
        <input
          type="text"
          placeholder="Nuevo mensaje..."
          value={nuevoMensaje}
          onChange={(e) => setNuevoMensaje(e.target.value)}
        />
        <button onClick={agregarMensaje}>Agregar</button>
      </div>

      <h2>📋 Mensajes:</h2>
      <ul>
        {mensajes.map((msg) => (
          <li key={msg.id}>{msg.contenido}</li>
        ))}
      </ul>
    </div>
  );
};

export default TestSupabase;
