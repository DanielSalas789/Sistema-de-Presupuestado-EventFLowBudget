import { useState } from "react";
import "../styles/servicios.css"; // Crearemos este CSS después

function Servicios({ servicios, onEdit, onDelete }) {
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [busqueda, setBusqueda] = useState("");

  // Filtrar servicios por categoría y búsqueda
  const serviciosFiltrados = servicios.filter(servicio => {
    const coincideCategoria = filtroCategoria ? servicio.categoria === filtroCategoria : true;
    const coincideBusqueda = servicio.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                            servicio.descripcion.toLowerCase().includes(busqueda.toLowerCase());
    return coincideCategoria && coincideBusqueda;
  });

  // Obtener categorías únicas para el filtro
  const categoriasUnicas = [...new Set(servicios.map(servicio => servicio.categoria))];

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(precio);
  };

  return (
    <div className="servicios-container">
      <h2>Mis Servicios</h2>
      
      {/* Filtros y búsqueda */}
      <div className="filtros-busqueda">
        <input
          type="text"
          placeholder="Buscar servicios..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="busqueda-input"
        />
        
        <select
          value={filtroCategoria}
          onChange={(e) => setFiltroCategoria(e.target.value)}
          className="filtro-select"
        >
          <option value="">Todas las categorías</option>
          {categoriasUnicas.map(categoria => (
            <option key={categoria} value={categoria}>
              {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Contador de servicios */}
      <div className="contador-servicios">
        {serviciosFiltrados.length} de {servicios.length} servicios mostrados
      </div>

      {/* Lista de servicios */}
      <div className="servicios-grid">
        {serviciosFiltrados.length > 0 ? (
          serviciosFiltrados.map(servicio => (
            <div key={servicio.id} className="servicio-card">
              <div className="servicio-header">
                <h3 className="servicio-nombre">{servicio.nombre}</h3>
                <span className="servicio-categoria">{servicio.categoria}</span>
              </div>
              
              <div className="servicio-body">
                {servicio.descripcion && (
                  <p className="servicio-descripcion">{servicio.descripcion}</p>
                )}
                
                <div className="servicio-info">
                  <div className="servicio-precio">
                    <strong>Precio:</strong> {formatearPrecio(servicio.precio)}
                  </div>
                  
                  {servicio.duracion && (
                    <div className="servicio-duracion">
                      <strong>Duración:</strong> {servicio.duracion} horas
                    </div>
                  )}
                </div>
              </div>

              <div className="servicio-actions">
                <button 
                  onClick={() => onEdit(servicio)}
                  className="btn-editar"
                >
                  Editar
                </button>
                <button 
                  onClick={() => onDelete(servicio.id)}
                  className="btn-eliminar"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="sin-servicios">
            {servicios.length === 0 ? 
              "No tienes servicios creados aún" : 
              "No se encontraron servicios con los filtros aplicados"
            }
          </div>
        )}
      </div>
    </div>
  );
}

export default Servicios;