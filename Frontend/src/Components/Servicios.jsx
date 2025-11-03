import React from "react";
import { motion } from "framer-motion";
import {
  FaBuilding,
  FaUtensils,
  FaPaintBrush,
  FaMusic,
  FaCameraRetro,
  FaShieldAlt,
} from "react-icons/fa";
import "../Styles/Servicios.css";

const Servicios = () => {
  // Lista de servicios con íconos
  const serviciosSalon = [
    {
      icono: <FaBuilding />,
      titulo: "Renta del Salón",
      descripcion:
        "Espacio amplio y climatizado con capacidad de hasta 250 personas, ideal para bodas, XV años, cumpleaños y eventos empresariales.",
    },
    {
      icono: <FaUtensils />,
      titulo: "Banquetes y Catering",
      descripcion:
        "Ofrecemos menús personalizados con servicio de meseros, vajilla y bebidas incluidas según las preferencias del cliente.",
    },
    {
      icono: <FaPaintBrush />,
      titulo: "Decoración Temática",
      descripcion:
        "Contamos con opciones de decoración clásica, moderna o temática, adaptadas al tipo de evento y colores preferidos.",
    },
    {
      icono: <FaMusic />,
      titulo: "Música y Entretenimiento",
      descripcion:
        "Disponemos de DJ, grupos musicales y equipo de sonido profesional para animar cualquier tipo de celebración.",
    },
    {
      icono: <FaCameraRetro />,
      titulo: "Fotografía y Video",
      descripcion:
        "Servicio profesional para capturar los mejores momentos del evento con entrega digital y álbum físico.",
    },
    {
      icono: <FaShieldAlt />,
      titulo: "Seguridad y Estacionamiento",
      descripcion:
        "Seguridad privada durante todo el evento y estacionamiento con capacidad para más de 60 vehículos.",
    },
  ];

  return (
    <section className="servicios-section" id="servicios">
      <div className="servicios-container">
        {/* === Título principal === */}
        <motion.h2
          className="servicios-titulo"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Servicios que Ofrecemos
        </motion.h2>

        {/* === Grid de servicios === */}
        <motion.div
          className="servicios-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {serviciosSalon.map((servicio, index) => (
            <motion.div
              className="servicio-card"
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="icono-servicio">{servicio.icono}</div>
              <h3>{servicio.titulo}</h3>
              <p>{servicio.descripcion}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* === Aside informativo === */}
        <motion.aside
          className="servicios-aside"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3>💡 Sobre el Sistema de Cotización</h3>
          <ul>
            <li>
              ✅ Genera cotizaciones rápidas seleccionando los servicios que
              desees incluir.
            </li>
            <li>
              ⚙️ Calcula automáticamente el costo total según invitados y fecha.
            </li>
            <li>
              📅 Solo muestra fechas disponibles; las reservadas están
              bloqueadas.
            </li>
            <li>
              💰 No se realizan pagos en línea, solo generación de cotizaciones.
            </li>
            <li>📑 Guarda o imprime tu cotización fácilmente.</li>
          </ul>
        </motion.aside>
      </div>
    </section>
  );
};

export default Servicios;
