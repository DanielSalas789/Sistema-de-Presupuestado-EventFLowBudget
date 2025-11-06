import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { supabase } from "../data/supabaseClient";
import "../Styles/CrearPresupuesto.css";

/* 
==============================================
🎉 Componente: CrearPresupuesto
----------------------------------------------
Formulario para generar presupuestos dinámicos
para eventos, mostrando un resumen lateral 
(aside) con el costo en tiempo real.
==============================================
*/

const CrearPresupuesto = () => {
  // --- Estado principal del formulario ---
  const [formData, setFormData] = useState({
    tipoEvento: "",
    personas: "",
    servicios: [],
    fecha: "",
  });

  // --- Estado de precios ---
  const [precioTotal, setPrecioTotal] = useState(0);
  const [detallesPrecio, setDetallesPrecio] = useState({
    base: 0,
    personasExtra: 0,
    servicios: 0,
  });

  // --- Datos configurables ---
  const tiposDeEvento = [
    { tipo: "Boda", base: 5000 },
    { tipo: "Cumpleaños", base: 2500 },
    { tipo: "Conferencia", base: 4000 },
    { tipo: "Graduación", base: 3500 },
  ];

  const serviciosOpcionales = [
    { nombre: "Catering", costo: 1000 },
    { nombre: "Decoración", costo: 800 },
    { nombre: "DJ o música", costo: 1200 },
    { nombre: "Fotografía", costo: 700 },
  ];

  // --- Cálculo dinámico de precios ---
  useEffect(() => {
    const tipoSeleccionado = tiposDeEvento.find(
      (t) => t.tipo === formData.tipoEvento
    );
    if (!tipoSeleccionado) {
      setPrecioTotal(0);
      return;
    }

    let base = tipoSeleccionado.base;
    let personasExtra = formData.personas
      ? parseInt(formData.personas) * 50
      : 0;

    let serviciosCosto = 0;
    formData.servicios.forEach((serv) => {
      const s = serviciosOpcionales.find((x) => x.nombre === serv);
      if (s) serviciosCosto += s.costo;
    });

    const total = base + personasExtra + serviciosCosto;
    setPrecioTotal(total);
    setDetallesPrecio({ base, personasExtra, servicios: serviciosCosto });
  }, [formData]);

  // --- Manejadores de cambio ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleServicioChange = (e) => {
    const { value, checked } = e.target;
    const nuevosServicios = checked
      ? [...formData.servicios, value]
      : formData.servicios.filter((s) => s !== value);
    setFormData({ ...formData, servicios: nuevosServicios });
  };

  // --- Envío del presupuesto ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.tipoEvento || !formData.personas || !formData.fecha) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor llena todos los campos antes de continuar.",
      });
      return;
    }

    const { data: existente } = await supabase
      .from("presupuestos")
      .select("fecha")
      .eq("fecha", formData.fecha)
      .maybeSingle();

    if (existente) {
      Swal.fire({
        icon: "error",
        title: "Fecha no disponible",
        text: "Ya existe un evento programado para esa fecha.",
      });
      return;
    }

    const { error } = await supabase.from("presupuestos").insert([
      {
        tipo_evento: formData.tipoEvento,
        personas: formData.personas,
        servicios: formData.servicios,
        fecha: formData.fecha,
        precio: precioTotal,
        creado_en: new Date().toISOString(),
      },
    ]);

    if (error) {
      Swal.fire("Error", "No se pudo guardar el presupuesto.", "error");
    } else {
      Swal.fire({
        icon: "success",
        title: "Presupuesto creado correctamente",
        text: `Precio final: $${precioTotal}`,
      });
      setFormData({
        tipoEvento: "",
        personas: "",
        servicios: [],
        fecha: "",
      });
      setPrecioTotal(0);
    }
  };

  return (
    <div className="crear-presupuesto-contenedor">
      {/* 🧾 FORMULARIO PRINCIPAL */}
      <div className="crear-presupuesto">
        <h2>Crear Presupuesto</h2>

        <form onSubmit={handleSubmit} className="presupuesto-form">
          <label>
            Tipo de evento:
            <select
              name="tipoEvento"
              value={formData.tipoEvento}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona un tipo</option>
              {tiposDeEvento.map((e, i) => (
                <option key={i} value={e.tipo}>
                  {e.tipo}
                </option>
              ))}
            </select>
          </label>

          <label>
            Número de personas:
            <input
              type="number"
              name="personas"
              value={formData.personas}
              onChange={handleChange}
              required
              min="1"
            />
          </label>

          <fieldset>
            <legend>Servicios adicionales:</legend>
            {serviciosOpcionales.map((serv, i) => (
              <label key={i} className="checkbox">
                <input
                  type="checkbox"
                  value={serv.nombre}
                  checked={formData.servicios.includes(serv.nombre)}
                  onChange={handleServicioChange}
                />
                {serv.nombre} (+${serv.costo})
              </label>
            ))}
          </fieldset>

          <label>
            Fecha del evento:
            <input
              type="date"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit">Guardar Presupuesto</button>
        </form>
      </div>

      {/* 💸 ASIDE CON EL RESUMEN */}
      <aside className="aside-resumen">
        <h3>Resumen del presupuesto</h3>
        {formData.tipoEvento ? (
          <>
            <p>
              <strong>Evento:</strong> {formData.tipoEvento}
            </p>
            <p>
              <strong>Personas:</strong> {formData.personas || 0} ( $
              {detallesPrecio.personasExtra})
            </p>
            <p>
              <strong>Servicios:</strong>{" "}
              {formData.servicios.length > 0
                ? formData.servicios.join(", ")
                : "Ninguno"}
            </p>
            <p>
              <strong>Fecha:</strong>{" "}
              {formData.fecha ? formData.fecha : "No seleccionada"}
            </p>
            <hr />
            <p>💰 Base: ${detallesPrecio.base}</p>
            <p>👥 Personas extra: ${detallesPrecio.personasExtra}</p>
            <p>🎉 Servicios: ${detallesPrecio.servicios}</p>
            <hr />
            <h2>Total: ${precioTotal}</h2>
            {precioTotal > 0 && (
              <div className="pago-opciones">
                <h4>Selecciona un método de pago:</h4>

                <button
                  className="btn-tarjeta"
                  onClick={() =>
                    Swal.fire(
                      "Pago con Tarjeta",
                      "Aquí irá Stripe Checkout.",
                      "info"
                    )
                  }
                  type="button"
                >
                  💳 Pagar con Tarjeta
                </button>

                <button
                  className="btn-transferencia"
                  onClick={() =>
                    Swal.fire(
                      "Pago por Transferencia",
                      "Aquí se mostrarán los datos bancarios.",
                      "info"
                    )
                  }
                  type="button"
                >
                  💸 Pago por Transferencia
                </button>
              </div>
            )}
          </>
        ) : (
          <p>Selecciona un tipo de evento para comenzar</p>
        )}
      </aside>
    </div>
  );
};

export default CrearPresupuesto;
