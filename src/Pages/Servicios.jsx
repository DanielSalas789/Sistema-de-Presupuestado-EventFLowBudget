import { useState } from "react";
import "../styles/Servicios.css";
import ServicioCard from "../Components/ServicioCard";

function Servicios() {
  const [servicios, setServicios] = useState([
    {
      nombre: "Servicio 1",
      descripcion: "Descripción del servicio 1",
      precio: 100,
      img: "https://via.placeholder.com/150",
    },
    {
      id: 1,
      nombre: "Decoración",
      descripcion: "Arreglos florales, iluminación y ambientación temática.",
      precio: 500,
      img: "https://via.placeholder.com/200x120?text=Decoración",
    },
    {
      id: 2,
      nombre: "Banquete",
      descripcion: "Menú gourmet con opciones personalizadas.",
      precio: 1500,
      img: "https://via.placeholder.com/200x120?text=Banquete",
    },
    {
      id: 3,
      nombre: "Música",
      descripcion: "DJ o grupo musical en vivo para tu evento.",
      precio: 800,
      img: "https://via.placeholder.com/200x120?text=Música",
    },
  ]);

  return (
    <div>
      <h2>Servicios para tu Evento</h2>
      <div className="servicios-grid">
        {servicios.map((s, index) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            <ServicioCard servicio={s} onSelect={() => {}} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Servicios;
