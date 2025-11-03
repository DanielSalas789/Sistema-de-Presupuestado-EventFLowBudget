import React, { useEffect, useState } from "react";
import { supabase } from "./Frontend/supabaseClient";

const TestSupabase = () => {
  const [mensajes, setMensajes] = useState([]);
  const [nuevoMensaje, setNuevoMensaje] = useState("");

  // ✅ Leer datos al montar el componente
  useEffect(() => {
    const fetchMensajes = async () => {
      const { data, error } = await supabase.from("mensajes").select("*");
      if (error) console.error("Error al obtener mensajes:", error);
      else setMensajes(data);
    };

    fetchMensajes();
  }, []);

  // ✅ Insertar un nuevo mensaje
  const agregarMensaje = async () => {
    const { error } = await supabase
      .from("mensajes")
      .insert([{ contenido: nuevoMensaje }]);
    if (error) alert("Error al insertar mensaje");
    else {
      alert("Mensaje agregado!");
      setMensajes([...mensajes, { contenido: nuevoMensaje }]);
      setNuevoMensaje("");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>🚀 Prueba de conexión con Supabase</h2>
      <input
        type="text"
        value={nuevoMensaje}
        onChange={(e) => setNuevoMensaje(e.target.value)}
        placeholder="Escribe un mensaje"
        style={{ marginRight: "1rem", padding: "0.5rem" }}
      />
      <button onClick={agregarMensaje}>Agregar</button>

      <ul>
        {mensajes.map((m, i) => (
          <li key={i}>{m.contenido}</li>
        ))}
      </ul>
    </div>
  );
};

export default TestSupabase;
