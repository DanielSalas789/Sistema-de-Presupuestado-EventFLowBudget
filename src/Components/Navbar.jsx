import "../styles/navbar.css";
import { Link } from "react-router-dom";

function Navbar({ logo }) {
  return (
    <nav className="navbar">
      <img src={logo} alt="EventFlow Budget Logo" />
      <div>
        <Link to="/">Inicio</Link>
        <Link to="/crear">Crear Presupuesto</Link>
        <Link to="/presupuestos">Ver Presupuestos</Link>
      </div>
    </nav>
  );
}

export default Navbar;
