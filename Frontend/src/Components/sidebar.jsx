import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Sidebar.css";
import EventFlowLogo from "../assets/Images/EventFlowBudget.png";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import useSidebarData from "../data/Sidebar/Const.jsx";
import Swal from "sweetalert2";

const Sidebar = ({ onToggle }) => {
  const navigate = useNavigate();

  // ✅ Importa variables y funciones desde el hook personalizado "useSidebarData"
  // Este hook centraliza el estado del Sidebar (colapsado, menús, usuario, etc.)
  const {
    isCollapsed, // Indica si el sidebar está colapsado o expandido
    openSubmenu, // Guarda cuál submenú está actualmente abierto
    usuario, // Contiene la información del usuario actual (nombre, tipo)
    menuItems, // Lista de elementos del menú principal (y sus submenús)
    toggleSidebar, // Función para expandir/colapsar el sidebar
    toggleSubmenu, // Función para abrir/cerrar submenús
    handleLogout, // Lógica para cerrar sesión (limpia sesión y estado)
    isActive, // Función que marca la ruta activa (para resaltar en menú)
  } = useSidebarData();

  // 🌀 Efecto que notifica al componente padre cuando cambia el estado del sidebar
  // Se usa para ajustar dinámicamente el layout principal según si el sidebar está colapsado
  useEffect(() => {
    if (onToggle) onToggle(isCollapsed);
  }, [isCollapsed, onToggle]);

  // 🔐 Función que muestra alerta de confirmación al cerrar sesión
  // Si el usuario confirma, limpia sesión y redirige al Login
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
        handleLogout(); // Limpia datos de sesión

        Swal.fire({
          title: "Sesión cerrada",
          text: "Has cerrado sesión correctamente.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
          willClose: () => {
            // 👇 Redirige al login una vez que se cierra el SweetAlert
            navigate("/Login");
          },
        });
      }
    });
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      {/* === 🧱 ENCABEZADO DEL SIDEBAR === */}
      <div className="sidebar-header">
        {/* Logo + texto */}
        <div className="logo-container">
          <img
            src={EventFlowLogo}
            className="logo-icon-placeholder"
            alt="EventFlow"
          />
          {/* Muestra el texto del logo solo si el sidebar no está colapsado */}
          {!isCollapsed && <h2 className="logo-text">EventFlow Budget</h2>}
        </div>

        {/* Botón para expandir o colapsar el sidebar */}
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>

      {/* === 📋 SECCIÓN DE MENÚ PRINCIPAL === */}
      <nav className="sidebar-nav">
        <ul>
          {/* Mapeo dinámico de los elementos del menú (traídos desde Const.jsx) */}
          {menuItems.map((item) => (
            <React.Fragment key={item.key || item.path}>
              {/* 🔸 Elementos simples (sin submenú) */}
              {item.type === "single" ? (
                <li className={isActive(item.path) ? "active" : ""}>
                  <Link to={item.path}>
                    <span className="menu-icon">{item.icon}</span>
                    {/* Oculta el texto si el sidebar está colapsado */}
                    {!isCollapsed && <span>{item.label}</span>}
                  </Link>
                </li>
              ) : (
                /* 🔹 Elementos con submenú */
                <li className="submenu-item">
                  {/* Cabecera del submenú (al hacer clic, se despliega) */}
                  <div
                    className={`submenu-header ${
                      openSubmenu === item.key ? "open" : ""
                    }`}
                    onClick={() => toggleSubmenu(item.key)}
                  >
                    {!isCollapsed && (
                      <>
                        <span>{item.label}</span>
                        {/* Flecha indicadora de submenú */}
                        <i
                          className={`fas fa-chevron-${
                            openSubmenu === item.key ? "up" : "down"
                          } submenu-arrow`}
                        ></i>
                      </>
                    )}
                  </div>

                  {/* Contenido del submenú (se muestra solo si está abierto) */}
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

      {/* === 👤 PIE DEL SIDEBAR === */}
      <div className="sidebar-footer">
        {/* Información del usuario (solo visible cuando no está colapsado) */}
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
            // ⚠️ Al presionar "Cerrar sesión", muestra una alerta de confirmación
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
                handleLogout(); // Limpia token, usuario y sesión
                Swal.fire({
                  title: "Sesión cerrada",
                  text: "Has cerrado sesión correctamente.",
                  icon: "success",
                  timer: 1500,
                  showConfirmButton: false,
                  willClose: () => {
                    // 👇 Redirige al login cuando se cierre la alerta
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
