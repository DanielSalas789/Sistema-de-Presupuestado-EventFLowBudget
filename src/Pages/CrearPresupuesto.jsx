import { useState } from "react";
import PresupuestoForm from "../Components/PresupuestoForm";
import PresupuestoCard from "../Components/PresupuestoCard";

function CrearPresupuesto() {
  const [presupuestos, setPresupuestos] = useState([]);

  const handleAdd = (nuevo) => {
    setPresupuestos([...presupuestos, nuevo]);
  };

  return (
    <div>
      <h2>Crear Presupuesto</h2>
      <PresupuestoForm onAdd={handleAdd} />
      <div>
        {presupuestos.map((p) => (
          <PresupuestoCard key={p.id} presupuesto={p} />
        ))}
      </div>
    </div>
  );
}

export default CrearPresupuesto;
