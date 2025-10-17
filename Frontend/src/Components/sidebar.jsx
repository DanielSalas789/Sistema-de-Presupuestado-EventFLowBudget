import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../Styles/sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [usuario, setUsuario] = useState({
    nombre: "Invitado",
    tipo: "usuario", // Valores posibles: "administrador", "usuario", "empleado"
  });

  // 🔹 Cargar datos de usuario desde localStorage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) setUsuario(userData);
  }, []);

  // 🔹 Alternar submenús
  const toggleSubmenu = (menuKey) => {
    setOpenSubmenu(openSubmenu === menuKey ? null : menuKey);
  };

  // 🔹 Colapsar sidebar
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // 🔹 Cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // 🔹 Determinar si una ruta está activa
  const isActive = (path) => {
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  // 🔹 Autoabrir submenú activo
  useEffect(() => {
    const activeSubmenu = menuItems.find(
      (item) =>
        item.type === "submenu" &&
        item.subItems?.some((subItem) => isActive(subItem.path))
    );
    if (activeSubmenu) setOpenSubmenu(activeSubmenu.key);
  }, [location.pathname]);

  // 🔹 Configuración dinámica del menú según tipo de usuario
  const baseMenu = [
    {
      type: "single",
      path: "/dashboard",
      icon: "fas fa-home",
      label: "Dashboard",
      description: "Panel principal",
    },
    {
      type: "single",
      path: "/crear-presupuesto",
      icon: "fas fa-plus-circle",
      label: "Crear Presupuesto",
      description: "Nuevo presupuesto",
    },
    {
      type: "single",
      path: "/presupuestos",
      icon: "fas fa-list",
      label: "Mis Presupuestos",
      description: "Lista de presupuestos",
    },
  ];

  const adminMenu = [
    {
      type: "submenu",
      key: "servicios",
      icon: "fas fa-concierge-bell",
      label: "Servicios",
      description: "Gestión de servicios",
      subItems: [
        {
          path: "/servicios/catering",
          icon: "fas fa-utensils",
          label: "Catering",
          description: "Servicio de alimentos",
        },
        {
          path: "/servicios/decoracion",
          icon: "fas fa-palette",
          label: "Decoración",
          description: "Ambientación y decor",
        },
        {
          path: "/servicios/audio-video",
          icon: "fas fa-music",
          label: "Audio & Video",
          description: "Sonido e iluminación",
        },
        {
          path: "/servicios/mobiliario",
          icon: "fas fa-chair",
          label: "Mobiliario",
          description: "Mesas, sillas, carpas",
        },
        {
          path: "/servicios/entretenimiento",
          icon: "fas fa-microphone",
          label: "Entretenimiento",
          description: "Artistas y shows",
        },
        {
          path: "/servicios/transporte",
          icon: "fas fa-bus",
          label: "Transporte",
          description: "Movilidad y logística",
        },
      ],
    },
    {
      type: "submenu",
      key: "clientes",
      icon: "fas fa-users",
      label: "Clientes",
      description: "Gestión de clientes",
      subItems: [
        {
          path: "/clientes/lista",
          icon: "fas fa-list",
          label: "Lista de Clientes",
          description: "Todos los clientes",
        },
        {
          path: "/clientes/nuevo",
          icon: "fas fa-user-plus",
          label: "Nuevo Cliente",
          description: "Agregar cliente",
        },
      ],
    },
    {
      type: "submenu",
      key: "proveedores",
      icon: "fas fa-truck",
      label: "Proveedores",
      description: "Gestión de proveedores",
      subItems: [
        {
          path: "/proveedores/lista",
          icon: "fas fa-list",
          label: "Lista de Proveedores",
          description: "Todos los proveedores",
        },
        {
          path: "/proveedores/categorias",
          icon: "fas fa-tags",
          label: "Categorías",
          description: "Tipos de proveedores",
        },
      ],
    },
    {
      type: "single",
      path: "/reportes",
      icon: "fas fa-chart-bar",
      label: "Reportes",
      description: "Estadísticas e informes",
    },
    {
      type: "single",
      path: "/configuracion",
      icon: "fas fa-cog",
      label: "Configuración",
      description: "Ajustes del sistema",
    },
  ];

  const empleadoMenu = [
    {
      type: "single",
      path: "/empleado/eventos",
      icon: "fas fa-calendar-check",
      label: "Mis Eventos",
      description: "Eventos asignados",
    },
    {
      type: "single",
      path: "/empleado/recursos",
      icon: "fas fa-boxes",
      label: "Recursos",
      description: "Material disponible",
    },
    {
      type: "single",
      path: "/empleado/incidencias",
      icon: "fas fa-exclamation-circle",
      label: "Incidencias",
      description: "Registrar problemas",
    },
  ];

  const usuarioMenu = [
    {
      type: "single",
      path: "/usuario/mis-eventos",
      icon: "fas fa-calendar-alt",
      label: "Mis Eventos",
      description: "Eventos contratados",
    },
    {
      type: "single",
      path: "/usuario/cotizaciones",
      icon: "fas fa-file-invoice-dollar",
      label: "Cotizaciones",
      description: "Mis cotizaciones",
    },
  ];

  // 🔹 Selección del menú según el tipo de usuario
  let menuItems = [...baseMenu];
  if (usuario.tipo === "administrador") menuItems.push(...adminMenu);
  else if (usuario.tipo === "empleado") menuItems.push(...empleadoMenu);
  else if (usuario.tipo === "usuario") menuItems.push(...usuarioMenu);

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      {/* --- HEADER --- */}
      <div className="sidebar-header">
        <div className="logo-container">
          <i className="fas fa-calendar-alt logo-icon"></i>
          {!isCollapsed && <h2 className="logo-text">EventFlow Budget</h2>}
        </div>
        <button
          className="toggle-btn"
          onClick={toggleSidebar}
          title={isCollapsed ? "Expandir menú" : "Contraer menú"}
        >
          <i
            className={`fas ${
              isCollapsed ? "fa-chevron-right" : "fa-chevron-left"
            }`}
          ></i>
        </button>
      </div>

      {/* --- MENÚ --- */}
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <React.Fragment key={item.key || item.path}>
              {item.type === "single" ? (
                <li
                  className={isActive(item.path) ? "active" : ""}
                  title={isCollapsed ? item.description : ""}
                >
                  <Link to={item.path}>
                    <i className={item.icon}></i>
                    {!isCollapsed && (
                      <span className="menu-label">{item.label}</span>
                    )}
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
                    <i className={item.icon}></i>
                    {!isCollapsed && (
                      <>
                        <span className="menu-label">{item.label}</span>
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
                              {!isCollapsed && (
                                <span className="submenu-label">
                                  {subItem.label}
                                </span>
                              )}
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

      {/* --- FOOTER --- */}
      <div className="sidebar-footer">
        <div className="user-info">
          {!isCollapsed && (
            <>
              <div className="user-avatar">
                <i className="fas fa-user-circle"></i>
              </div>
              <div className="user-details">
                <p className="user-name">{usuario.nombre}</p>
                <p className="user-role">
                  {usuario.tipo.charAt(0).toUpperCase() + usuario.tipo.slice(1)}
                </p>
              </div>
            </>
          )}
        </div>

        <button
          className="logout-btn"
          onClick={handleLogout}
          title="Cerrar sesión"
        >
          <i className="fas fa-sign-out-alt"></i>
          {!isCollapsed && <span>Cerrar sesión</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
