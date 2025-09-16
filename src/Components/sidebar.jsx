import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/sidebar.css";

function Sidebar({ logo }) {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <div className="sidebar">
      <img src={logo} alt="Logo" className="sidebar-logo" />

      <ul className="sidebar-menu">
        <li>
          <Link to="/">🏠 Inicio</Link>
        </li>

        <li>
          <button className="menu-btn" onClick={() => toggleMenu("presupuestos")}>
            📊 Presupuestos
          </button>
          {openMenu === "presupuestos" && (
            <ul className="submenu">
              <li>
                <Link to="/crear">➕ Crear Presupuesto</Link>
              </li>
              <li>
                <Link to="/presupuestos">📋 Ver Presupuestos</Link>
              </li>
            </ul>
          )}
        </li>

        <li>
          <button className="menu-btn" onClick={() => toggleMenu("configuracion")}>
            ⚙️ Configuración
          </button>
          {openMenu === "configuracion" && (
            <ul className="submenu">
              <li>
                <Link to="/perfil">👤 Perfil</Link>
              </li>
              <li>
                <Link to="/ajustes">🔧 Ajustes</Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
