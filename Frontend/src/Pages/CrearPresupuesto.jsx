import { useState, useEffect } from "react";
import { supabase } from "../data/supabaseClient";
import "../Styles/CrearPresupuesto.css";

export default function CrearPresupuesto() {
  const [cliente, setCliente] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [servicios, setServicios] = useState([]);
  const [seleccionados, setSeleccionados] = useState([]);

  useEffect(() => {
    const obtenerServicios = async () => {
      const { data, error } = await supabase.from("servicios").select("*");
      if (!error && data) setServicios(data);
    };
    obtenerServicios();
  }, []);

  const agregarServicio = (servicio) => {
    const existe = seleccionados.find((s) => s.id === servicio.id);
    if (existe) return;
    setSeleccionados([...seleccionados, { ...servicio, cantidad: 1 }]);
  };

  const actualizarCantidad = (id, cantidad) => {
    setSeleccionados(
      seleccionados.map((s) =>
        s.id === id ? { ...s, cantidad: parseInt(cantidad) } : s
      )
    );
  };

  const total = seleccionados.reduce(
    (acc, s) => acc + s.precio * s.cantidad,
    0
  );

  const guardarPresupuesto = async () => {
    if (!cliente) return alert("Ingresa el nombre del cliente");

    const { data: presupuesto } = await supabase
      .from("presupuestos")
      .insert({ cliente, descripcion, total })
      .select()
      .single();

    for (const s of seleccionados) {
      await supabase.from("detalle_presupuesto").insert({
        presupuesto_id: presupuesto.id,
        servicio_id: s.id,
        cantidad: s.cantidad,
        subtotal: s.cantidad * s.precio,
      });
    }

    alert("✅ Presupuesto guardado");
    setCliente("");
    setDescripcion("");
    setSeleccionados([]);
  };

  return (
    <div className="presupuesto-container">
      <h1>Crear Presupuesto</h1>

      <div className="form-section">
        <input
          type="text"
          placeholder="Nombre del cliente"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
        />

        <textarea
          placeholder="Descripción (opcional)"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div>

      <h2>Servicios Disponibles</h2>
      <div className="servicios-grid">
        {servicios.map((s) => (
          <div key={s.id} className="servicio-card">
            <img src={s.imagen_url} />
            <h3>{s.nombre}</h3>
            <p>${s.precio} MXN</p>
            <button onClick={() => agregarServicio(s)}>Agregar</button>
          </div>
        ))}
      </div>

      <h2>Servicios Seleccionados</h2>
      {seleccionados.length === 0 ? (
        <p className="vacio">No has agregado servicios aún.</p>
      ) : (
        <table className="tabla-detalle">
          <thead>
            <tr>
              <th>Servicio</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {seleccionados.map((s) => (
              <tr key={s.id}>
                <td>{s.nombre}</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    value={s.cantidad}
                    onChange={(e) => actualizarCantidad(s.id, e.target.value)}
                  />
                </td>
                <td>${(s.cantidad * s.precio).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="total">
        <strong>Total: ${total.toFixed(2)} MXN</strong>
      </div>

      <button className="guardar-btn" onClick={guardarPresupuesto}>
        Guardar Presupuesto
      </button>
    </div>
  );
}
