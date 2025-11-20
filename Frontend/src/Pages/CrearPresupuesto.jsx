import { useState, useEffect } from "react";
import { supabase } from "../data/supabaseClient";
import { useLocation } from "react-router-dom";
import "../Styles/CrearPresupuesto.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Loading from "../Components/Loading";

export default function CrearPresupuesto() {
  const location = useLocation();
  const paqueteSeleccionado = location.state?.paqueteSeleccionado || null;

  const [cliente, setCliente] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [servicios, setServicios] = useState([]);
  const [paquetes, setPaquetes] = useState([]);
  const [seleccionados, setSeleccionados] = useState([]);
  const [paqueteActivo, setPaqueteActivo] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [paqueteOpcionesSelected, setPaqueteOpcionesSelected] = useState([]);

  // ✅ Si viene un paquete desde el componente anterior, lo agregamos al estado
  useEffect(() => {
    if (paqueteSeleccionado) {
      setSeleccionados([
        {
          id: `paquete-${paqueteSeleccionado.id}`,
          nombre: paqueteSeleccionado.nombre,
          precio: paqueteSeleccionado.precio || 0,
          cantidad: 1,
        },
      ]);
    }
  }, [paqueteSeleccionado]);

  const generarPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Presupuesto EventFlow Budget", 14, 20);

    doc.setFontSize(12);
    doc.text(`Cliente: ${cliente}`, 14, 30);
    if (descripcion) doc.text(`Descripción: ${descripcion}`, 14, 36);

    // preparar datos de la tabla incluyendo opciones si las hay
    const tablaDatos = seleccionados.map((s) => {
      const opcionesText =
        (s.opciones || [])
          .map((o) => `${o.nombre} (+$${o.precio})`)
          .join("; ") || "-";
      const subtotal = calcularSubtotal(s);
      return [
        s.nombre + (opcionesText !== "-" ? `\nOpciones: ${opcionesText}` : ""),
        `$${s.precio.toFixed(2)}`,
        s.cantidad,
        `$${subtotal.toFixed(2)}`,
      ];
    });

    doc.autoTable({
      head: [["Servicio", "Precio", "Cant.", "Subtotal"]],
      body: tablaDatos,
      startY: 45,
    });

    let y = doc.lastAutoTable.finalY + 10;
    doc.text(`Total: $${total.toFixed(2)}`, 14, y);

    doc.save(`Presupuesto-${cliente}.pdf`);
  };

  // ✅ Cargar catálogo desde Supabase
  useEffect(() => {
    const fetchData = async () => {
      const { data: serviciosData } = await supabase
        .from("servicios")
        .select("*");
      const { data: paquetesData } = await supabase
        .from("paquetes")
        .select("*");

      setServicios(serviciosData || []);
      setPaquetes(paquetesData || []);
      setCargando(false);
    };

    fetchData();
  }, []);

  // ✅ Funciones existentes
  const agregarServicio = (servicio) => {
    setSeleccionados((prev) => {
      const existe = prev.find((s) => s.id === servicio.id);
      if (existe) {
        return prev.map((s) =>
          s.id === servicio.id ? { ...s, cantidad: s.cantidad + 1 } : s
        );
      }
      return [...prev, { ...servicio, cantidad: 1 }];
    });
  };

  const agregarPaquete = (paquete) => {
    // Abrir modal para seleccionar opciones adicionales al paquete
    setPaqueteOpcionesSelected([]);
    setPaqueteActivo(paquete);
  };

  const confirmarAgregarPaquete = (paquete) => {
    const opciones = paqueteOpcionesSelected
      .map((opId) => {
        const svc = servicios.find((s) => s.id === opId);
        return svc
          ? { id: svc.id, nombre: svc.nombre, precio: Number(svc.precio) || 0 }
          : null;
      })
      .filter(Boolean);

    setSeleccionados((prev) => [
      ...prev,
      {
        id: `paquete-${paquete.id}-${Date.now()}`,
        nombre: paquete.nombre,
        precio: Number(paquete.precio) || 0,
        cantidad: 1,
        opciones,
      },
    ]);

    setPaqueteActivo(null);
    setPaqueteOpcionesSelected([]);
  };

  const actualizarCantidad = (id, value) => {
    setSeleccionados((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, cantidad: Math.max(1, Number(value)) } : s
      )
    );
  };

  const eliminarServicio = (id) => {
    setSeleccionados((prev) => prev.filter((s) => s.id !== id));
  };

  const calcularSubtotal = (item) => {
    const base = (Number(item.precio) || 0) * (Number(item.cantidad) || 0);
    const opcionesSum = (item.opciones || []).reduce(
      (acc, op) =>
        acc + (Number(op.precio) || 0) * (Number(item.cantidad) || 0),
      0
    );
    return base + opcionesSum;
  };

  const total = seleccionados.reduce((s, it) => s + calcularSubtotal(it), 0);

  const guardarPresupuesto = async () => {
    if (!cliente.trim()) return alert("Completa el nombre del cliente");
    if (seleccionados.length === 0) return alert("Agrega al menos un servicio");

    const nuevo = {
      cliente,
      descripcion,
      items: JSON.stringify(seleccionados),
      total,
      creado_en: new Date().toISOString(),
    };

    await supabase.from("presupuestos").insert([nuevo]);
    alert("✅ Presupuesto guardado");
  };

  const guardarYDescargar = async () => {
    try {
      await guardarPresupuesto();
      generarPDF();
    } catch (err) {
      console.error("Error en guardarYDescargar:", err);
    }
  };

  if (cargando) return <Loading message="Cargando..." />;

  return (
    <div className="presupuesto-layout">
      {/* IZQUIERDA */}
      <div className="presupuesto-container">
        <h1>Crear Presupuesto</h1>

        <input
          type="text"
          placeholder="Nombre del cliente *"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
        />

        <textarea
          placeholder="Descripción (opcional)"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />

        <h2>Servicios</h2>
        <div className="servicios-grid">
          {servicios.map((servicio) => (
            <div key={servicio.id} className="servicio-card">
              <h4>{servicio.nombre}</h4>
              <p>${servicio.precio} MXN</p>
              <button onClick={() => agregarServicio(servicio)}>Agregar</button>
            </div>
          ))}
        </div>

        <h2>Paquetes</h2>
        <div className="paquetes-grid">
          {paquetes.map((p) => (
            <div
              key={p.id}
              className="paquete-card"
              onClick={() => agregarPaquete(p)}
            >
              <img src={p.imagen_url} alt={p.nombre} />
              <h3>{p.nombre}</h3>
              <p>${p.precio} MXN</p>
            </div>
          ))}
        </div>

        {/* Modal para seleccionar opciones al agregar paquete */}
        {paqueteActivo && (
          <div className="modal-paquete">
            <div className="modal-content">
              <h2>Opciones para: {paqueteActivo.nombre}</h2>
              <p>{paqueteActivo.descripcion}</p>

              <div style={{ maxHeight: 260, overflowY: "auto", marginTop: 12 }}>
                <h4>Servicios adicionales</h4>
                {servicios.map((s) => (
                  <label
                    key={s.id}
                    style={{ display: "block", margin: "6px 0" }}
                  >
                    <input
                      type="checkbox"
                      checked={paqueteOpcionesSelected.includes(s.id)}
                      onChange={(e) => {
                        if (e.target.checked)
                          setPaqueteOpcionesSelected((p) => [...p, s.id]);
                        else
                          setPaqueteOpcionesSelected((p) =>
                            p.filter((id) => id !== s.id)
                          );
                      }}
                    />{" "}
                    {s.nombre} (+${s.precio})
                  </label>
                ))}
              </div>

              <div className="modal-buttons">
                <button
                  className="agregar-paquete"
                  onClick={() => confirmarAgregarPaquete(paqueteActivo)}
                >
                  Añadir paquete
                </button>
                <button
                  className="cerrar-modal"
                  onClick={() => setPaqueteActivo(null)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* DERECHA - ASIDE */}
      <aside className="resumen-aside">
        <h3>Resumen del Presupuesto</h3>

        <p>
          <strong>Cliente:</strong> {cliente || "Sin asignar"}
        </p>

        <ul>
          {seleccionados.map((item) => (
            <li key={item.id}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ flex: 1 }}>
                  <strong>{item.nombre}</strong>
                  {(item.opciones || []).length > 0 && (
                    <div style={{ fontSize: 12, color: "#555" }}>
                      Opciones:{" "}
                      {(item.opciones || []).map((o) => o.nombre).join(", ")}
                    </div>
                  )}
                </div>
                <div>
                  <input
                    type="number"
                    min="1"
                    value={item.cantidad}
                    onChange={(e) =>
                      actualizarCantidad(item.id, e.target.value)
                    }
                    style={{ width: 60 }}
                  />
                </div>
                <div style={{ width: 90, textAlign: "right" }}>
                  ${calcularSubtotal(item).toFixed(2)}
                </div>
                <div>
                  <button onClick={() => eliminarServicio(item.id)}>✕</button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <h2>Total: ${total.toFixed(2)} MXN</h2>

        <div style={{ display: "flex", gap: 8, flexDirection: "column" }}>
          <button className="guardar-btn" onClick={guardarPresupuesto}>
            Guardar Presupuesto
          </button>

          <button
            className="guardar-btn"
            onClick={guardarYDescargar}
            style={{ background: "#10b981" }}
          >
            Finalizar y descargar PDF
          </button>
        </div>
      </aside>
    </div>
  );
}
