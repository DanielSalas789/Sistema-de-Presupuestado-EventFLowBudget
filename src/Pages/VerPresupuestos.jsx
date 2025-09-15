import { useState } from "react";
import PresupuestoCard from "../components/PresupuestoCard";

function VerPresupuestos() {
  // Más adelante puedes traerlos de una API o base de datos
  const [presupuestos] = useState([]);

  return (
    <div>
      <h2>Listado de Presupuestos</h2>
      {presupuestos.length === 0 ? (
        <p>No hay presupuestos guardados.</p>
      ) : (
        presupuestos.map((p) => (
          <PresupuestoCard key={p.id} presupuesto={p} />
        ))
      )}
    </div>
  );
}

export default VerPresupuestos;
