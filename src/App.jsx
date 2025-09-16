import { Routes, Route } from "react-router-dom";
import Sidebar from "./Components/sidebar.jsx";
import Home from "./Pages/Home.jsx";
import CrearPresupuesto from "./Pages/CrearPresupuesto.jsx";
import VerPresupuestos from "./Pages/VerPresupuestos.jsx";
import CrearServicio from "./Pages/CrearServicio";
import Servicios from "./Pages/Servicios.jsx";
import logo from "./assets/Images/EventFlowBudget.png";


function App() {
  return (
    <div>
      <Sidebar logo={logo} />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crear" element={<CrearPresupuesto />} />
          <Route path="/presupuestos" element={<VerPresupuestos />} />
          <Route path="/crear-servicio" element={<CrearServicio />} />
          <Route path="/servicios" element={<Servicios />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
