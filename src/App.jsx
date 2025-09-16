import { Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar.jsx";
import Home from "./Pages/Home";
import CrearPresupuesto from "./Pages/CrearPresupuesto";
import VerPresupuestos from "./Pages/VerPresupuestos";
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
        </Routes>
      </div>
    </div>
  );
}

export default App;
