import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// Ajuste ruta a archivo CSS con mayúscula
import "../Styles/Sidebar.css";

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

          {/* <li className="active">
            <Link to="/dashboard">
              <i className="fas fa-home"></i>
              <span className="menu-label">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/crear-presupuesto">
              <i className="fas fa-plus-circle"></i>
              <span className="menu-label">Crear Presupuesto</span>
            </Link>
          </li>
          <li>
            <Link to="/presupuestos">
              <i className="fas fa-list"></i>
              <span className="menu-label">Mis Presupuestos</span>
            </Link>
          </li>
          <li className="submenu-item">
            <div className="submenu-header">
              <i className="fas fa-concierge-bell"></i>
              <span className="menu-label">Servicios</span>
              <i className="fas fa-chevron-down submenu-arrow"></i>
            </div>
            <div className="submenu-content">
              <ul>
                <li>
                  <Link to="/servicios/catering">
                    <i className="fas fa-utensils"></i>
                    <span className="submenu-label">Catering</span>
                  </Link>
                </li>
                <li>
                  <Link to="/servicios/decoracion">
                    <i className="fas fa-palette"></i>
                    <span className="submenu-label">Decoración</span>
                  </Link>
                </li>
                <li>
                  <Link to="/servicios/audio-video">
                    <i className="fas fa-music"></i>
                    <span className="submenu-label">Audio & Video</span>
                  </Link>
                </li>
                <li>
                  <Link to="/servicios/mobiliario">
                    <i className="fas fa-chair"></i>
                    <span className="submenu-label">Mobiliario</span>
                  </Link>
                </li>
                <li>
                  <Link to="/servicios/entretenimiento">
                    <i className="fas fa-microphone"></i>
                    <span className="submenu-label">Entretenimiento</span>
                  </Link>
                </li>
                <li>
                  <Link to="/servicios/transporte">
                    <i className="fas fa-bus"></i>
                    <span className="submenu-label">Transporte</span>
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          <li className="submenu-item">
            <div className="submenu-header">
              <i className="fas fa-users"></i>
              <span className="menu-label">Clientes</span>
              <i className="fas fa-chevron-down submenu-arrow"></i>
            </div>
            <div className="submenu-content">
              <ul>
                <li>
                  <Link to="/clientes/lista">
                    <i className="fas fa-list"></i>
                    <span className="submenu-label">Lista de Clientes</span>
                  </Link>
                </li>
                <li>
                  <Link to="/clientes/nuevo">
                    <i className="fas fa-user-plus"></i>
                    <span className="submenu-label">Nuevo Cliente</span>
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          <li className="submenu-item">
            <div className="submenu-header">
              <i className="fas fa-truck"></i>
              <span className="menu-label">Proveedores</span>
              <i className="fas fa-chevron-down submenu-arrow"></i>
            </div>
            <div className="submenu-content">
              <ul>
                <li>
                  <Link to="/proveedores/lista">
                    <i className="fas fa-list"></i>
                    <span className="submenu-label">Lista de Proveedores</span>
                  </Link>
                </li>
                <li>
                  <Link to="/proveedores/categorias">
                    <i className="fas fa-tags"></i>
                    <span className="submenu-label">Categorías</span>
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <Link to="/reportes">
              <i className="fas fa-chart-bar"></i>
              <span className="menu-label">Reportes</span>
            </Link>
          </li>
          <li>
            <Link to="/configuracion">
              <i className="fas fa-cog"></i>
              <span className="menu-label">Configuración</span>
            </Link>
          </li> */}
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
