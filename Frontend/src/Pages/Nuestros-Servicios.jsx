import { useEffect, useState } from "react";
import { supabase } from "../data/supabaseClient";
import "../Styles/Servicios.css";

export default function Servicios() {
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    const fetchServicios = async () => {
      const { data, error } = await supabase.from("servicios").select("*");
      if (!error && data) setServicios(data);
    };
    fetchServicios();
  }, []);

  return (
    <div className="servicios-container">
      <h1>Nuestros Servicios</h1>
      <p className="sub-text">
        Estas son las opciones disponibles para cotizar tu evento.
      </p>

      <div className="servicios-grid">
        {servicios.map((s) => (
          <div key={s.id} className="servicio-card">
            <img src={s.imagen_url} alt={s.nombre} className="servicio-img" />
            <h3>{s.nombre}</h3>
            <p className="desc">{s.descripcion}</p>
            <p className="precio">${s.precio} MXN</p>
          </div>
        ))}
      </div>
    </div>
  );
}
