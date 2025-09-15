import "../styles/card.css";

function PresupuestoCard({ presupuesto }) {
  return (
    <div className="card">
      <h3>{presupuesto.cliente}</h3>
      <p><strong>Fecha:</strong> {presupuesto.fecha}</p>
      <p><strong>Invitados:</strong> {presupuesto.invitados}</p>
      <p><strong>Precio:</strong> ${presupuesto.precio}</p>
    </div>
  );
}

export default PresupuestoCard;

