import { Link } from "react-router-dom";
import "../styles/navbar.css";
import logo from "./assets/Images/EventFlowBudget.png";

function Navbar() {
  return (
    <nav className="navbar">
      <h1>
        <img src={logo} alt="Logo" />
      </h1>
      <ul>
        <li className="active">
          <a href="/">
            <span>Inicio</span>
          </a>
        </li>
        <li>
          <Link to="/crear">
            <a href="/crear"></a>
            <span>Crear Presupuesto</span>
          </Link>
        </li>
        <li>
          <Link to="/ver">
            <a href="/ver"></a>
            <span>Ver Presupuestos</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
