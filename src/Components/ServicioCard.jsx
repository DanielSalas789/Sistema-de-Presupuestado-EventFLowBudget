

function ServicioCard({ servicio, onSelect }) {
  return (
    <motion.div
      className="servicio-card"
      // Animación al entrar
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      // Animación en hover / click
      whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0,0,0,0.3)" }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onSelect(servicio)}
    >
      <img src={servicio.img} alt={servicio.nombre} />
      <h3>{servicio.nombre}</h3>
      <p>{servicio.descripcion}</p>
      <span className="precio">${servicio.precio}</span>
    </motion.div>
  );
}

export default ServicioCard;
