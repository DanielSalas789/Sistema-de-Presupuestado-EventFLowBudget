// 📄 src/Components/TestSupabase.jsx
import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient"; // 🧩 Importa la instancia configurada de Supabase

const TestSupabase = () => {
  // 🧠 Estado para almacenar los mensajes obtenidos desde la base de datos
  const [mensajes, setMensajes] = useState([]);

  // ✍️ Estado para manejar el texto del nuevo mensaje a insertar
  const [nuevoMensaje, setNuevoMensaje] = useState("");

  // 🔁 useEffect: se ejecuta al montar el componente para cargar los mensajes iniciales
  useEffect(() => {
    const obtenerMensajes = async () => {
      // 📥 Solicita todos los registros de la tabla "mensajes"
      const { data, error } = await supabase.from("mensajes").select("*");

      if (error) {
        // ⚠️ Muestra error si la consulta falla
        console.error("Error al cargar mensajes:", error);
      } else {
        // ✅ Guarda los datos obtenidos en el estado
        setMensajes(data);
      }
    };

    // 🚀 Llama a la función cuando el componente se monta
    obtenerMensajes();
  }, []); // 🔄 [] indica que solo se ejecuta una vez al renderizar el componente

  // ➕ Función para agregar un nuevo mensaje a la base de datos
  const agregarMensaje = async () => {
    // 🚫 Si el campo está vacío o solo tiene espacios, no hace nada
    if (!nuevoMensaje.trim()) return;

    // 📤 Inserta un nuevo registro en la tabla "mensajes"
    const { error } = await supabase
      .from("mensajes")
      .insert([{ contenido: nuevoMensaje }]); // La columna debe coincidir con tu tabla

    if (error) {
      // ⚠️ Muestra error si no se pudo insertar
      console.error("Error al insertar:", error);
    } else {
      // ✅ Actualiza la lista de mensajes localmente para mostrar el nuevo
      setMensajes([...mensajes, { contenido: nuevoMensaje }]);
      // 🧹 Limpia el campo de entrada
      setNuevoMensaje("");
    }
  };

  return (
    // 💡 Estructura visual del componente con algo de estilo inline
    <div
      style={{ background: "#f9f9f9", padding: "20px", borderRadius: "12px" }}
    >
      <h3>🧠 Prueba Supabase</h3>
      <p>Lee e inserta datos desde tu base Supabase.</p>

      {/* 🔹 Campo para escribir un nuevo mensaje */}
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Escribe un mensaje..."
          value={nuevoMensaje} // Enlazado al estado
          onChange={(e) => setNuevoMensaje(e.target.value)} // Actualiza el estado con lo que el usuario escribe
          style={{ padding: "8px", marginRight: "8px", width: "70%" }}
        />
        {/* 🔘 Botón para agregar el mensaje */}
        <button onClick={agregarMensaje}>Agregar</button>
      </div>

      {/* 📋 Lista que muestra los mensajes obtenidos de Supabase */}
      <ul>
        {mensajes.map((m, index) => (
          <li key={index}>{m.contenido}</li>
        ))}
      </ul>
    </div>
  );
};

export default TestSupabase;
