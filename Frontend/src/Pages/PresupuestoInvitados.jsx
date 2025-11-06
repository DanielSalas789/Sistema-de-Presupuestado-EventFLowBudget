import { useState } from "react";
import { supabase } from "../data/supabaseClient";

export default function PresupuestoInvitado() {
  const [nombre, setNombre] = useState("");
  const [evento, setEvento] = useState("");

  const guardarInvitado = async () => {
    await supabase.from("usuarios").insert([
      {
        nombre,
        correo: `${nombre}_${Date.now()}@invitado.com`,
        rol: "invitado",
      },
    ]);

    alert("Presupuesto guardado ✅");
  };

  return (
    <div>
      <h2>Presupuesto Rápido</h2>
      <input
        placeholder="Tu nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        placeholder="Tipo de evento"
        value={evento}
        onChange={(e) => setEvento(e.target.value)}
      />
      <button onClick={guardarInvitado}>Guardar Presupuesto</button>
    </div>
  );
}
