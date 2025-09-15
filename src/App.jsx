import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar.jsx";
import Home from "./Pages/Home";
import CrearPresupuesto from "./Pages/CrearPresupuesto";
import VerPresupuestos from "./Pages/VerPresupuestos";


function App() {
  return (
    <div>
      <Navbar logo/>
      
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crear" element={<CrearPresupuesto />} />
          <Route path="/presupuestos" element={<VerPresupuestos />} />
          <Route path="*" element={<div>Página no encontrada</div>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
