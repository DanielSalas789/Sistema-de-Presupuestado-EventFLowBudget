import React from "react";
import "../Styles/Loading.css";

export default function Loading() {
  return (
    <div className="loading-container">
      {/* Spinner principal */}
      <div className="loading-spinner">
        <div className="spinner-circle">
          <div className="spinner-inner"></div>
        </div>

        {/* Partículas flotantes */}
        <div className="floating-particles">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div>
        </div>
      </div>

      {/* Texto de carga */}
      <div className="loading-content">
        <h3 className="loading-title">Cargando Paquetes</h3>
        <p className="loading-subtitle">
          Preparando la mejor experiencia para ti
        </p>

        {/* Barra de progreso */}
        <div className="progress-bar">
          <div className="progress-fill"></div>
        </div>
      </div>

      {/* Efectos de fondo */}
      <div className="loading-background">
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>
        <div className="bg-shape shape-3"></div>
      </div>
    </div>
  );
}

// Versión simplificada para espacios pequeños
export function LoadingSmall() {
  return (
    <div className="loading-small">
      <div className="spinner-simple"></div>
      <span>Cargando...</span>
    </div>
  );
}
