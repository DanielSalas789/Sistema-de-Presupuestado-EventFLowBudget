import { useState } from "react";
import "../styles/form.css";

function PresupuestoForm({ onAdd }) {
  const [cliente, setCliente] = useState("");
  const [fecha, setFecha] = useState("");
  const [invitados, setInvitados] = useState("");
  const [precio, setPrecio] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cliente || !fecha || !invitados || !precio) return;

    const nuevo = {
      id: Date.now(),
      cliente,
      fecha,
      invitados,
      precio
    };
    onAdd(nuevo);

    setCliente("");
    setFecha("");
    setInvitados("");
    setPrecio("");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre del cliente"
        value={cliente}
        onChange={(e) => setCliente(e.target.value)}
      />
      <input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
      />
      <input
        type="number"
        placeholder="Cantidad de invitados"
        value={invitados}
        onChange={(e) => setInvitados(e.target.value)}
      />
      <input
        type="number"
        placeholder="Precio total"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
      />
      <button type="submit">Guardar Presupuesto</button>
    </form>
  );
}

export default PresupuestoForm;
