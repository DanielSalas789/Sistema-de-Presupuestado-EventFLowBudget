import React from "react";
import "../Styles/Servicios.css"; // Importamos los estilos

const Servicios = () => {
  // Lista de servicios que ofrece el salón de eventos
  const serviciosSalon = [
    {
      titulo: "Renta del Salón",
      descripcion:
        "Espacio amplio y climatizado con capacidad de hasta 250 personas, ideal para bodas, XV años, cumpleaños y eventos empresariales.",
    },
    {
      titulo: "Banquetes y Catering",
      descripcion:
        "Ofrecemos menús personalizados con servicio de meseros, vajilla y bebidas incluidas según las preferencias del cliente.",
    },
    {
      titulo: "Decoración Temática",
      descripcion:
        "Contamos con opciones de decoración clásica, moderna o temática, adaptadas al tipo de evento y colores preferidos.",
    },
    {
      titulo: "Música y Entretenimiento",
      descripcion:
        "Disponemos de DJ, grupos musicales y equipo de sonido profesional para animar cualquier tipo de celebración.",
    },
    {
      titulo: "Fotografía y Video",
      descripcion:
        "Servicio profesional para capturar los mejores momentos del evento con entrega digital y álbum físico.",
    },
    {
      titulo: "Seguridad y Estacionamiento",
      descripcion:
        "Seguridad privada durante todo el evento y estacionamiento con capacidad para más de 60 vehículos.",
    },
  ];

  return (
    <section className="servicios-section" id="servicios">
      <div className="servicios-container">
        {/* === Título principal === */}
        <h2 className="servicios-titulo">Servicios que Ofrecemos</h2>

        {/* === Listado de servicios principales === */}
        <div className="servicios-grid">
          {serviciosSalon.map((servicio, index) => (
            <div className="servicio-card" key={index}>
              <h3>{servicio.titulo}</h3>
              <p>{servicio.descripcion}</p>
            </div>
          ))}
        </div>

        {/* === Aside de ayuda o información del sistema === */}
        <aside className="servicios-aside">
          <h3>💡 Sobre el Sistema de Cotización</h3>
          <ul>
            <li>
              ✅ Puedes generar una cotización rápida seleccionando los
              servicios que desees incluir (decoración, banquete, música, etc.).
            </li>
            <li>
              ⚙️ El sistema calcula automáticamente el costo total según el
              número de invitados y fecha del evento.
            </li>
            <li>
              📅 Solo puedes cotizar fechas disponibles; las reservadas aparecen
              bloqueadas en el calendario.
            </li>
            <li>
              💰 No se realizan pagos en línea, solo genera la cotización. Los
              pagos se concretan directamente en el salón.
            </li>
            <li>
              📑 Puedes guardar o imprimir tu cotización para presentarla al
              momento de la reserva.
            </li>
          </ul>
        </aside>
      </div>
    </section>
  );
};

export default Servicios;
