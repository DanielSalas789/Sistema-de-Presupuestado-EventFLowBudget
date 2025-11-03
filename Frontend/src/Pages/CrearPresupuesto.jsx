import React, { useState } from "react";
import { crearPresupuesto } from "../data/Presupuestos/Presupuestos";

const CrearPresupuesto = () => {
  const [form, setForm] = useState({
    nombre: "",
    cliente: "",
    monto: "",
    descripcion: "",
  });

  const manejarCambio = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    try {
      await crearPresupuesto({
        nombre: form.nombre,
        cliente: form.cliente,
        monto: parseFloat(form.monto),
        descripcion: form.descripcion,
      });
      alert("✅ Presupuesto creado correctamente");
      setForm({ nombre: "", cliente: "", monto: "", descripcion: "" });
    } catch (error) {
      console.error("Error al crear presupuesto:", error);
    }
  };

  return (
    <div
      style={{ padding: "20px", background: "#f4f6f8", borderRadius: "10px" }}
    >
      <h2>🧾 Crear Presupuesto</h2>
      <form onSubmit={manejarEnvio}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del presupuesto"
          value={form.nombre}
          onChange={manejarCambio}
          required
        />
        <input
          type="text"
          name="cliente"
          placeholder="Cliente"
          value={form.cliente}
          onChange={manejarCambio}
        />
        <input
          type="number"
          name="monto"
          placeholder="Monto"
          value={form.monto}
          onChange={manejarCambio}
        />
        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={manejarCambio}
        />
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default CrearPresupuesto;
