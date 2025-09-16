import { useState } from "react";
import { NavLink } from "react-router-dom";
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
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            🏠 Inicio
          </NavLink>
        </li>

        <li>
          <button
            className={`menu-btn ${openMenu === "presupuestos" ? "open" : ""}`}
            onClick={() => toggleMenu("presupuestos")}
          >
            📊 Presupuestos
          </button>
          <ul className={`submenu ${openMenu === "presupuestos" ? "show" : ""}`}>
            <li>
              <NavLink to="/crear" className={({ isActive }) => (isActive ? "active" : "")}>
                ➕ Crear Presupuesto
              </NavLink>
            </li>
            <li>
              <NavLink to="/presupuestos" className={({ isActive }) => (isActive ? "active" : "")}>
                📋 Ver Presupuestos
              </NavLink>
            </li>
          </ul>
        </li>

        <li>
          <button
            className={`menu-btn ${openMenu === "configuracion" ? "open" : ""}`}
            onClick={() => toggleMenu("configuracion")}
          >
            ⚙️ Configuración
          </button>
          <ul className={`submenu ${openMenu === "configuracion" ? "show" : ""}`}>
            <li>
              <NavLink to="/perfil" className={({ isActive }) => (isActive ? "active" : "")}>
                👤 Perfil
              </NavLink>
            </li>
            <li>
              <NavLink to="/ajustes" className={({ isActive }) => (isActive ? "active" : "")}>
                🔧 Ajustes
              </NavLink>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
