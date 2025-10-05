import ServiciosForm from '../components/ServiciosForm';

function CrearServicio({ onAdd, servicios }) {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Crear Nuevo Servicio</h1>
        <p>Gestiona los servicios personalizados para tus eventos</p>
      </div>
      
      <div className="form-section">
        <ServiciosForm onAdd={onAdd} />
      </div>

      {servicios.length > 0 && (
        <div className="quick-stats">
          <h3>Resumen de Servicios</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-number">{servicios.length}</span>
              <span className="stat-label">Total Servicios</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">
                {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' })
                  .format(servicios.reduce((sum, s) => sum + s.precio, 0))}
              </span>
              <span className="stat-label">Valor Total</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CrearServicio;