import Servicios from '../components/Servicios';

function VerServicios({ servicios, onEdit, onDelete }) {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Mis Servicios</h1>
        <p>Gestiona y organiza todos tus servicios personalizados</p>
      </div>
      
      <Servicios 
        servicios={servicios} 
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
}

export default VerServicios;