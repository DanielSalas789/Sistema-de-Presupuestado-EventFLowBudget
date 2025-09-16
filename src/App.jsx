import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Inicio from './Pages/Home';
import CrearServicio from './Pages/CrearServicio';
import VerServicios from './Pages/VerServicios';
import CrearPresupuesto from './Pages/CrearPresupuesto';
import VerPresupuestos from './Pages/VerPresupuestos';
// import Perfil from './Pages/Perfil';
// import Ajustes from './Pages/Ajustes';
    import './Styles/App.css';

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
