import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h1>
        logo={<img src={EventFlowLogo} alt="EventFlow Logo" />}
        </h1>
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/crear">Crear Presupuesto</Link></li>
        <li><Link to="/presupuestos">Ver Presupuestos</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
