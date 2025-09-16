import { useState } from "react";

function CrearServicio() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí deberías guardar el servicio en tu estado global, backend, etc.
    alert(`Servicio creado: ${nombre}`);
    setNombre("");
    setDescripcion("");
    setPrecio("");
  };

  return (
    <div className="page">
      <h2>Crear Servicio</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label>Nombre</label>
        <input value={nombre} onChange={e => setNombre(e.target.value)} required />
        <label>Descripción</label>
        <input value={descripcion} onChange={e => setDescripcion(e.target.value)} required />
        <label>Precio</label>
        <input type="number" value={precio} onChange={e => setPrecio(e.target.value)} required />
        <button type="submit">Crear</button>
      </form>
    </div>
  );
}

export default CrearServicio;