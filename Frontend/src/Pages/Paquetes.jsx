import { useEffect, useState } from "react";
import { supabase } from "../data/supabaseClient";
import "../Styles/Paquetes.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Loading from "../Components/Loading";

export default function Paquetes() {
  const [paquetes, setPaquetes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaquetes = async () => {
      try {
        setLoading(true);
        setError(null);

        // ✅ Intentar primero con la tabla 'servicios'
        let { data, error } = await supabase.from("servicios").select("*");

        if (error) {
          console.log("Tabla 'paquetes' no disponible, usando 'servicios'");
          // Fallback a servicios
          const result = await supabase.from("servicios").select("*");
          data = result.data;
          error = result.error;
        }

        if (error) {
          setError("Error cargando los paquetes");
          console.error("Error fetching packages:", error);
          // Usar datos mock como último recurso
          setPaquetes(getPaquetesMock());
        } else {
          setPaquetes(data || []);
        }
      } catch (err) {
        setError("Error inesperado al cargar los paquetes");
        console.error("Unexpected error:", err);
        setPaquetes(getPaquetesMock());
      } finally {
        setLoading(false);
      }
    };

    fetchPaquetes();
  }, []);

  const handleCotizar = (paquete) => {
    navigate("/Frontend/src/Pages/CrearPresupuesto.jsx", {
      // ✅ CORREGIDO: ruta correcta
      state: {
        paqueteSeleccionado: paquete,
        tipo: "paquete",
      },
    });
  };

  // ✅ Mostrar loading mientras carga
  if (loading) {
    return <Loading />;
  }

  // ✅ Mostrar error si hay problema
  if (error && paquetes.length === 0) {
    return (
      <div className="paquetes-container">
        <div className="error-state">
          <h2>😕 Ocurrió un error</h2>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn-cotizar"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="paquetes-container">
      <h1>Paquetes Prearmados</h1>
      <p className="sub-text">Elige un paquete para comenzar tu presupuesto.</p>

      {/* ✅ Mostrar advertencia si estamos usando datos mock */}
      {error && (
        <div className="warning-banner">⚠️ Mostrando datos de demostración</div>
      )}

      <div className="paquetes-grid">
        {paquetes.map((paquete, index) => (
          <motion.div
            key={paquete.id}
            className="paquete-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="img-wrapper">
              <img
                src={paquete.imagen_url || paquete.imagen}
                alt={paquete.nombre}
                className="paquete-img"
                onError={(e) => {
                  // ✅ Fallback para imágenes rotas
                  e.target.src =
                    "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop";
                }}
              />
            </div>

            <h3>{paquete.nombre}</h3>
            <p className="desc">{paquete.descripcion}</p>
            <p className="precio">${paquete.precio} MXN</p>

            <button
              className="btn-cotizar"
              onClick={() => handleCotizar(paquete)}
            >
              Cotizar
            </button>
          </motion.div>
        ))}
      </div>

      {/* ✅ Mensaje si no hay paquetes */}
      {paquetes.length === 0 && !loading && (
        <div className="empty-state">
          <h3>No hay paquetes disponibles</h3>
          <p>Por favor, intenta más tarde</p>
        </div>
      )}
    </div>
  );
}
