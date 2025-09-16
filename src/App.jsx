// App.jsx - Solo UN Router aquí
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import CrearPresupuesto from './pages/CrearPresupuesto';
import Dashboard from './pages/Dashboard';
import Presupuestos from './Pages/VerPresupuestos';
import './Styles/App.css';
function App() {
  return (
    // SOLO UN Router en toda la app
    <Router>
      <div className="app">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/crear-presupuesto" element={<CrearPresupuesto />} />
            <Route path="/presupuestos" element={<Presupuestos />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;