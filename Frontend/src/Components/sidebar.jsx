import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Sidebar.css";
import EventFlowLogo from "../assets/Images/EventFlowBudget.png";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import useSidebarData from "../data/Sidebar/Const.jsx";
import Swal from "sweetalert2";

const Sidebar = ({ onToggle }) => {
  const navigate = useNavigate();

  const {
    isCollapsed,
    openSubmenu,
    usuario,
    menuItems,
    toggleSidebar,
    toggleSubmenu,
    handleLogout,
    isActive,
  } = useSidebarData();

  // 🔔 Notifica al componente padre cuando cambia el estado del sidebar
  useEffect(() => {
    if (onToggle) onToggle(isCollapsed);
  }, [isCollapsed, onToggle]);

  // 🔐 Función para cerrar sesión con alerta y redirección
  const confirmLogout = () => {
    Swal.fire({
      title: "¿Cerrar sesión?",
      text: "Tu sesión actual se cerrará.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Primero elimina los datos de sesión
        handleLogout();

        // Muestra una alerta de confirmación
        Swal.fire({
          title: "Sesión cerrada",
          text: "Has cerrado sesión correctamente.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
          willClose: () => {
            // 👇 Redirige al Login después de cerrar la alerta
            navigate("/Login");
          },
        });
      }
    });
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      {/* === ENCABEZADO === */}
      <div className="sidebar-header">
        <div className="logo-container">
          <img
            src={EventFlowLogo}
            className="logo-icon-placeholder"
            alt="EventFlow"
          />
          {!isCollapsed && <h2 className="logo-text">EventFlow Budget</h2>}
        </div>
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>

      {/* === MENÚ === */}
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <React.Fragment key={item.key || item.path}>
              {item.type === "single" ? (
                <li className={isActive(item.path) ? "active" : ""}>
                  <Link to={item.path}>
                    <span className="menu-icon">{item.icon}</span>
                    {!isCollapsed && <span>{item.label}</span>}
                  </Link>
                </li>
              ) : (
                <li className="submenu-item">
                  <div
                    className={`submenu-header ${
                      openSubmenu === item.key ? "open" : ""
                    }`}
                    onClick={() => toggleSubmenu(item.key)}
                  >
                    {!isCollapsed && (
                      <>
                        <span>{item.label}</span>
                        <i
                          className={`fas fa-chevron-${
                            openSubmenu === item.key ? "up" : "down"
                          } submenu-arrow`}
                        ></i>
                      </>
                    )}
                  </div>

                  {openSubmenu === item.key && (
                    <div className="submenu-content open">
                      <ul>
                        {item.subItems.map((subItem) => (
                          <li
                            key={subItem.path}
                            className={isActive(subItem.path) ? "active" : ""}
                          >
                            <Link to={subItem.path}>
                              <i className={subItem.icon}></i>
                              {!isCollapsed && <span>{subItem.label}</span>}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              )}
            </React.Fragment>
          ))}
        </ul>
      </nav>

      {/* === PIE DEL SIDEBAR === */}
      <div className="sidebar-footer">
        {!isCollapsed && (
          <div className="user-info">
            <div className="user-avatar">
              <i className="fas fa-user-circle"></i>
            </div>
            <div className="user-details">
              <p className="user-name">{usuario.nombre}</p>
              <p className="user-role">
                {usuario.tipo.charAt(0).toUpperCase() + usuario.tipo.slice(1)}
              </p>
            </div>
          </div>
        )}

        {/* === BOTÓN DE CERRAR SESIÓN === */}
        <button
          className="logout-btn"
          onClick={() => {
            Swal.fire({
              title: "¿Cerrar sesión?",
              text: "Tu sesión actual se cerrará.",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Sí, cerrar sesión",
              cancelButtonText: "Cancelar",
            }).then((result) => {
              if (result.isConfirmed) {
                handleLogout(); // elimina token, user y prepara navegación
                Swal.fire({
                  title: "Sesión cerrada",
                  text: "Has cerrado sesión correctamente.",
                  icon: "success",
                  timer: 1500,
                  showConfirmButton: false,
                  willClose: () => {
                    // 👇 redirige después de que se cierra el SweetAlert
                    window.location.href = "/Login";
                  },
                });
              }
            });
          }}
        >
          <i className="fas fa-sign-out-alt"></i>
          {!isCollapsed && <span>Cerrar sesión</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
