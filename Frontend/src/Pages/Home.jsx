import React from "react";
import Servicios from "../Components/Servicios";
import "../Styles/Home.css"; // Importamos los estilos

function Home({ productos }) {
  return (
    <div className="home-page">
      {/* === Banner principal con imagen de fondo === */}
      <section className="home-banner">
        <div className="banner-overlay">
          <h1>🎉 Bienvenido a Nuestro Salón de Eventos</h1>
          <p>
            Gestiona, cotiza y organiza tus celebraciones de manera fácil y
            rápida.
          </p>
        </div>
      </section>

      {/* === Contenido principal debajo del banner === */}
      <section className="home-content">
        <h2>Servicios Disponibles para Todo Tipo de Evento</h2>
        <p>
          Descubre todo lo que ofrecemos para hacer de tu evento una experiencia
          inolvidable.
        </p>

        {/* Componente de servicios */}
        <Servicios />
      </section>
    </div>
  );
}

export default Home;
