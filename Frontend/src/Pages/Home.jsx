import React from "react";
import Servicios from "../Components/Servicios";
function Home({ productos }) {
  return (
    <div className="home-page">
      <h2>
        🏠 Bienvenido a Nuestro Sistema de gestion de control y Cotización de
        Eventos
      </h2>
      <p>Consulta Nuestros servicios disponibles para todo evento:</p>
      <Servicios />
      <ul></ul>
    </div>
  );
}

export default Home;
