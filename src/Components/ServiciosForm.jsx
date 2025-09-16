import { useState } from "react";
import "../styles/form.css";

function ServiciosForm({ onAdd }) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [precio, setPrecio] = useState("");
  const [duracion, setDuracion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre || !categoria || !precio) return;

    const nuevoServicio = {
      id: Date.now(),
      nombre,
      descripcion,
      categoria,
      precio: parseFloat(precio),
      duracion: duracion || null
    };
    onAdd(nuevoServicio);

    // Resetear formulario
    setNombre("");
    setDescripcion("");
    setCategoria("");
    setPrecio("");
    setDuracion("");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre del servicio"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      
      <textarea
        placeholder="Descripción del servicio"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        rows={3}
      />
      
      <select
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
        required
      >
        <option value="">Selecciona una categoría</option>
        <option value="catering">Catering</option>
        <option value="decoracion">Decoración</option>
        <option value="musica">Música</option>
        <option value="fotografia">Fotografía</option>
        <option value="coordinacion">Coordinación</option>
        <option value="otros">Otros</option>
      </select>
      
      <input
        type="number"
        placeholder="Precio del servicio"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
        min="0"
        step="0.01"
        required
      />
      
      <input
        type="number"
        placeholder="Duración en horas (opcional)"
        value={duracion}
        onChange={(e) => setDuracion(e.target.value)}
        min="0"
        step="0.5"
      />
      
      <button type="submit">Guardar Servicio</button>
    </form>
  );
}

export default ServiciosForm;