import React from "react";

const Home = ({ productos }) => {
  return (
    <div className="page">
      <h1>Bienvenido a EventFlow Budget</h1>
      <p>Gestiona tus presupuestos de eventos fácilmente.</p>

      <h2>Lista de Productos</h2>
      <ul>
        {productos.map((p) => (
          <li key={p.id_producto}>
            {p.nombre} - ${p.precio}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
