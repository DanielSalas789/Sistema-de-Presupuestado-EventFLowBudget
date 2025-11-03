// 📄 src/Pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Dashboard.css";

// ✅ Componentes de funcionalidad
// import TestSupabase from "../Components/TestSupabase";  Prueba de conexión con Supabase
// Lista de presupuestos desde Supabase

const Dashboard = () => {
  const navigate = useNavigate();

  // 🔢 Estado para estadísticas principales del Dashboard
  const [stats, setStats] = useState({
    totalPresupuestos: 0,
    presupuestosActivos: 0,
    ingresosTotales: 0,
    clientesActivos: 0,
  });

  // 🔄 Simulación inicial: podrías reemplazarla luego con datos reales desde Supabase
  useEffect(() => {
    setStats({
      totalPresupuestos: 0,
      presupuestosActivos: 0,
      ingresosTotales: 0,
      clientesActivos: 0,
    });
  }, []);

  // 📅 Datos de ejemplo de actividad reciente
  const recentActivities = [
    {
      id: 1,
      type: "presupuesto",
      action: "creado",
      title: "Boda María y José",
      amount: 2500,
      date: "2024-01-15",
      time: "14:30",
    },
    {
      id: 2,
      type: "cliente",
      action: "agregado",
      title: "Nuevo cliente: Restaurante La Parrilla",
      amount: null,
      date: "2024-01-15",
      time: "10:15",
    },
  ];

  return (
    <div className="dashboard">
      {/* ================== ENCABEZADO ================== */}
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Resumen general de tu negocio</p>
      </div>

      <div className="dashboard-content">
        {/* ================== ACTIVIDAD RECIENTE ================== */}
        <div className="recent-activity">
          <h2>Actividad Reciente</h2>
          <div className="activity-list">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon">
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
                {activity.amount && (
                  <div className="activity-amount">${activity.amount}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ================== ACCIONES RÁPIDAS ================== */}
        <div className="quick-actions">
          <h2>Acciones Rápidas</h2>
          <div className="actions-grid">
            {/* ⚡ Puedes conectar estos botones con tus rutas o modales */}
            <button
              className="action-btn"
              onClick={() => navigate("/crear-presupuesto")}
            >
              <i className="fas fa-plus"></i>
              <span>Nuevo Presupuesto</span>
            </button>

            <button
              className="action-btn"
              onClick={() => navigate("/presupuestos")}
            >
              <i className="fas fa-list"></i>
              <span>Ver Presupuestos</span>
            </button>

            <button
              className="action-btn"
              onClick={() => navigate("/empleado")}
            >
              <i className="fas fa-user-plus"></i>
              <span>Agregar Cliente</span>
            </button>

            <button className="action-btn" onClick={() => navigate("/admin")}>
              <i className="fas fa-cog"></i>
              <span>Configuración</span>
            </button>
          </div>
        </div>

        {/* ================== ESTADÍSTICAS ================== */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ background: "#3498db" }}>
              <i className="fas fa-file-invoice-dollar"></i>
            </div>
            <div className="stat-info">
              <h3>{stats.totalPresupuestos}</h3>
              <p>Total Presupuestos</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: "#2ecc71" }}>
              <i className="fas fa-check-circle"></i>
            </div>
            <div className="stat-info">
              <h3>{stats.presupuestosActivos}</h3>
              <p>Activos</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: "#f39c12" }}>
              <i className="fas fa-money-bill-wave"></i>
            </div>
            <div className="stat-info">
              <h3>${stats.ingresosTotales.toLocaleString()}</h3>
              <p>Ingresos Totales</p>
            </div>
          </div>

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
