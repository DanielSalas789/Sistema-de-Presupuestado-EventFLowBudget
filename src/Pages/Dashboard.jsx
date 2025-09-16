import React, { useState, useEffect } from 'react';
import '../Styles/Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPresupuestos: 0,
    presupuestosActivos: 0,
    ingresosTotales: 0,
    clientesActivos: 0
  });

  // Datos de ejemplo (luego los reemplazas con datos reales)
  useEffect(() => {
    setStats({
      totalPresupuestos: 24,
      presupuestosActivos: 12,
      ingresosTotales: 15420,
      clientesActivos: 8
    });
  }, []);

  const recentActivities = [
    {
      id: 1,
      type: 'presupuesto',
      action: 'creado',
      title: 'Boda María y José',
      amount: 2500,
      date: '2024-01-15',
      time: '14:30'
    },
    {
      id: 2,
      type: 'cliente',
      action: 'agregado',
      title: 'Nuevo cliente: Restaurante La Parrilla',
      amount: null,
      date: '2024-01-15',
      time: '10:15'
    },
    {
      id: 3,
      type: 'presupuesto',
      action: 'actualizado',
      title: 'Fiesta de 15 años Sofia',
      amount: 1800,
      date: '2024-01-14',
      time: '16:45'
    }
  ];

  return (
    <div className="dashboard">
      {/* Header del Dashboard */}
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Resumen general de tu negocio</p>
      </div>

      {/* Estadísticas */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#3498db' }}>
            <i className="fas fa-file-invoice-dollar"></i>
          </div>
          <div className="stat-info">
            <h3>{stats.totalPresupuestos}</h3>
            <p>Total Presupuestos</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#2ecc71' }}>
            <i className="fas fa-check-circle"></i>
          </div>
          <div className="stat-info">
            <h3>{stats.presupuestosActivos}</h3>
            <p>Activos</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#f39c12' }}>
            <i className="fas fa-money-bill-wave"></i>
          </div>
          <div className="stat-info">
            <h3>${stats.ingresosTotales.toLocaleString()}</h3>
            <p>Ingresos Totales</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#e74c3c' }}>
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-info">
            <h3>{stats.clientesActivos}</h3>
            <p>Clientes Activos</p>
          </div>
        </div>
      </div>

      {/* Gráficos y contenido principal */}
      <div className="dashboard-content">
        {/* Actividad Reciente */}
        <div className="recent-activity">
          <h2>Actividad Reciente</h2>
          <div className="activity-list">
            {recentActivities.map(activity => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon">
                  <i className={`fas fa-${activity.type === 'presupuesto' ? 'file-invoice' : 'user'}`}></i>
                </div>
                <div className="activity-details">
                  <h4>{activity.title}</h4>
                  <p>{activity.action} - {activity.date} {activity.time}</p>
                </div>
                {activity.amount && (
                  <div className="activity-amount">
                    ${activity.amount}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h2>Acciones Rápidas</h2>
          <div className="actions-grid">
            <button className="action-btn">
              <i className="fas fa-plus"></i>
              <span>Nuevo Presupuesto</span>
            </button>
            <button className="action-btn">
              <i className="fas fa-user-plus"></i>
              <span>Agregar Cliente</span>
            </button>
            <button className="action-btn">
              <i className="fas fa-chart-bar"></i>
              <span>Ver Reportes</span>
            </button>
            <button className="action-btn">
              <i className="fas fa-cog"></i>
              <span>Configuración</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;