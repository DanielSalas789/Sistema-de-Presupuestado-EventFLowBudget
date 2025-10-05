import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../Styles/Dashboard.css";

const Dashboard = () => {
  // Estado para almacenar las estadísticas del dashboard
  const [stats, setStats] = useState({
    totalPresupuestos: 0,
    presupuestosActivos: 0,
    ingresosTotales: 0,
    clientesActivos: 0,
  });

  // Efecto para simular la carga de datos (luego se reemplazará con datos reales)
  useEffect(() => {
    // Datos de ejemplo para demostración
    setStats({
      totalPresupuestos: 0,
      presupuestosActivos: 0,
      ingresosTotales: 0,
      clientesActivos: 0,
    });
  }, []); // Array de dependencias vacío = se ejecuta solo al montar el componente

  // Datos de ejemplo para actividades recientes
  const recentActivities = [
    {
      id: 1,
      type: "presupuesto", // Tipo de actividad
      action: "creado", // Acción realizada
      title: "Boda María y José", // Título descriptivo
      amount: 2500, // Monto si aplica
      date: "2024-01-15", // Fecha de la actividad
      time: "14:30", // Hora de la actividad
    },
    {
      id: 2,
      type: "cliente",
      action: "agregado",
      title: "Nuevo cliente: Restaurante La Parrilla",
      amount: null, // null cuando no hay monto
      date: "2024-01-15",
      time: "10:15",
    },
    {
      id: 3,
      type: "presupuesto",
      action: "actualizado",
      title: "Fiesta de 15 años Sofia",
      amount: 1800,
      date: "2024-01-14",
      time: "16:45",
    },
  ];

  return (
    <div className="dashboard">
      {/* Sección de cabecera del dashboard */}
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Resumen general de tu negocio</p>
      </div>

      {/* Contenido principal del dashboard */}
      <div className="dashboard-content">
        {/* Sección de Actividad Reciente */}
        <div className="recent-activity">
          <h2>Actividad Reciente</h2>
          <div className="activity-list">
            {/* Mapeo de actividades recientes para mostrar cada una */}
            {recentActivities.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon">
                  {/* Ícono dinámico según el tipo de actividad */}
                  <i
                    className={`fas fa-${
                      activity.type === "presupuesto" ? "file-invoice" : "user"
                    }`}
                  ></i>
                </div>
                <div className="activity-details">
                  <h4>{activity.title}</h4>
                  <p>
                    {activity.action} - {activity.date} {activity.time}
                  </p>
                </div>
                {/* Mostrar monto solo si existe */}
                {activity.amount && (
                  <div className="activity-amount">${activity.amount}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sección de Acciones Rápidas */}
        <div className="quick-actions">
          <h2>Acciones Rápidas</h2>
          <div className="actions-grid">
            {/* Botones de acceso rápido a funciones comunes */}
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

        {/* Grid de tarjetas de estadísticas */}
        <div className="stats-grid">
          {/* Tarjeta: Total de Presupuestos */}
          <div className="stat-card">
            <div className="stat-icon" style={{ background: "#3498db" }}>
              <i className="fas fa-file-invoice-dollar"></i>
            </div>
            <div className="stat-info">
              <h3>{stats.totalPresupuestos}</h3>
              <p>Total Presupuestos</p>
            </div>
          </div>

          {/* Tarjeta: Presupuestos Activos */}
          <div className="stat-card">
            <div className="stat-icon" style={{ background: "#2ecc71" }}>
              <i className="fas fa-check-circle"></i>
            </div>
            <div className="stat-info">
              <h3>{stats.presupuestosActivos}</h3>
              <p>Activos</p>
            </div>
          </div>

          {/* Tarjeta: Ingresos Totales */}
          <div className="stat-card">
            <div className="stat-icon" style={{ background: "#f39c12" }}>
              <i className="fas fa-money-bill-wave"></i>
            </div>
            <div className="stat-info">
              <h3>${stats.ingresosTotales.toLocaleString()}</h3>
              <p>Ingresos Totales</p>
            </div>
          </div>

          {/* Tarjeta: Clientes Activos */}
          <div className="stat-card">
            <div className="stat-icon" style={{ background: "#e74c3c" }}>
              <i className="fas fa-users"></i>
            </div>
            <div className="stat-info">
              <h3>{stats.clientesActivos}</h3>
              <p>Clientes Activos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
