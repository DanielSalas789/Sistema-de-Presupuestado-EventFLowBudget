import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../Styles/sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  // Función para toggle submenús (cierra los demás al abrir uno)
  const toggleSubmenu = (menuKey) => {
    if (openSubmenu === menuKey) {
      setOpenSubmenu(null); // Cierra si ya está abierto
    } else {
      setOpenSubmenu(menuKey); // Abre y cierra los demás
    }
  };

  // Cierra todos los submenús al colapsar la sidebar
  React.useEffect(() => {
    if (isCollapsed) {
      setOpenSubmenu(null);
    }
  }, [isCollapsed]);

  const menuItems = [
    {
      type: 'single',
      path: '/dashboard',
      icon: 'fas fa-home',
      label: 'Dashboard',
      description: 'Panel principal'
    },
    {
      type: 'submenu',
      key: 'servicios',
      icon: 'fas fa-concierge-bell',
      label: 'Servicios',
      description: 'Gestión de servicios',
      subItems: [
        {
          path: '/servicios/catering',
          icon: 'fas fa-utensils',
          label: 'Catering',
          description: 'Servicio de alimentos'
        },
        {
          path: '/servicios/decoracion',
          icon: 'fas fa-palette',
          label: 'Decoración',
          description: 'Ambientación y decor'
        },
        {
          path: '/servicios/audio-video',
          icon: 'fas fa-music',
          label: 'Audio & Video',
          description: 'Sonido e iluminación'
        },
        {
          path: '/servicios/mobiliario',
          icon: 'fas fa-chair',
          label: 'Mobiliario',
          description: 'Mesas, sillas, carpas'
        },
        {
          path: '/servicios/entretenimiento',
          icon: 'fas fa-microphone',
          label: 'Entretenimiento',
          description: 'Artistas y shows'
        },
        {
          path: '/servicios/transporte',
          icon: 'fas fa-bus',
          label: 'Transporte',
          description: 'Movilidad y logística'
        }
      ]
    },
    {
      type: 'single',
      path: '/crear-presupuesto',
      icon: 'fas fa-plus-circle',
      label: 'Crear Presupuesto',
      description: 'Nuevo presupuesto'
    },
    {
      type: 'single',
      path: '/presupuestos',
      icon: 'fas fa-list',
      label: 'Mis Presupuestos',
      description: 'Lista de presupuestos'
    },
    {
      type: 'submenu',
      key: 'clientes',
      icon: 'fas fa-users',
      label: 'Clientes',
      description: 'Gestión de clientes',
      subItems: [
        {
          path: '/clientes/lista',
          icon: 'fas fa-list',
          label: 'Lista de Clientes',
          description: 'Todos los clientes'
        },
        {
          path: '/clientes/nuevo',
          icon: 'fas fa-user-plus',
          label: 'Nuevo Cliente',
          description: 'Agregar cliente'
        }
      ]
    },
    {
      type: 'submenu',
      key: 'proveedores',
      icon: 'fas fa-truck',
      label: 'Proveedores',
      description: 'Gestión de proveedores',
      subItems: [
        {
          path: '/proveedores/lista',
          icon: 'fas fa-list',
          label: 'Lista de Proveedores',
          description: 'Todos los proveedores'
        },
        {
          path: '/proveedores/categorias',
          icon: 'fas fa-tags',
          label: 'Categorías',
          description: 'Tipos de proveedores'
        }
      ]
    },
    {
      type: 'single',
      path: '/reportes',
      icon: 'fas fa-chart-bar',
      label: 'Reportes',
      description: 'Estadísticas e informes'
    },
    {
      type: 'single',
      path: '/configuracion',
      icon: 'fas fa-cog',
      label: 'Configuración',
      description: 'Ajustes del sistema'
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Función para verificar si una ruta está activa (incluyendo subrutas)
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  // Auto-abrir el submenú si alguna de sus rutas está activa
  React.useEffect(() => {
    const activeSubmenu = menuItems.find(item => 
      item.type === 'submenu' && 
      item.subItems.some(subItem => isActive(subItem.path))
    );
    
    if (activeSubmenu) {
      setOpenSubmenu(activeSubmenu.key);
    }
  }, [location.pathname]);

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Header del Sidebar */}
      <div className="sidebar-header">
        <div className="logo-container">
          <i className="fas fa-calendar-alt logo-icon"></i>
          {!isCollapsed && (
            <h2 className="logo-text">EventFlow Budget</h2>
          )}
        </div>
        <button 
          className="toggle-btn"
          onClick={toggleSidebar}
          title={isCollapsed ? 'Expandir menú' : 'Contraer menú'}
        >
          <i className={`fas ${isCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'}`}></i>
        </button>
      </div>

      {/* Menú de navegación */}
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <React.Fragment key={item.key || item.path}>
              {item.type === 'single' ? (
                <li 
                  className={isActive(item.path) ? 'active' : ''}
                  title={isCollapsed ? item.description : ''}
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
                    className={`submenu-header ${openSubmenu === item.key ? 'open' : ''}`}
                    onClick={() => toggleSubmenu(item.key)}
                    title={isCollapsed ? item.description : ''}
                  >
                    <i className={item.icon}></i>
                    {!isCollapsed && (
                      <>
                        <span className="menu-label">{item.label}</span>
                        <i className={`fas fa-chevron-${openSubmenu === item.key ? 'up' : 'down'} submenu-arrow`}></i>
                      </>
                    )}
                  </div>
                  
                  {openSubmenu === item.key && (
                    <div className="submenu-content open">
                      <ul>
                        {item.subItems.map((subItem) => (
                          <li 
                            key={subItem.path}
                            className={isActive(subItem.path) ? 'active' : ''}
                            title={isCollapsed ? subItem.description : ''}
                          >
                            <Link to={subItem.path} onClick={() => {
                              // Cierra el sidebar en móviles al hacer clic en un subitem
                              if (window.innerWidth <= 768) {
                                setIsCollapsed(true);
                              }
                            }}>
                              <i className={subItem.icon}></i>
                              {!isCollapsed && (
                                <span className="submenu-label">{subItem.label}</span>
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

      {/* Footer del Sidebar */}
      <div className="sidebar-footer">
        <div className="user-info">
          {!isCollapsed && (
            <>
              <div className="user-avatar">
                <i className="fas fa-user-circle"></i>
              </div>
              <div className="user-details">
                <p className="user-name">Usuario</p>
                <p className="user-role">Administrador</p>
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