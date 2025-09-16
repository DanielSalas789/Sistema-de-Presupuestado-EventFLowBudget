import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../Styles/Sidebar.css'; // Asegúrate de tener este archivo CSS

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    {
      path: '/dashboard',
      icon: 'fas fa-home',
      label: 'Dashboard',
      description: 'Panel principal'
    },
    {
      path: '/crear-presupuesto',
      icon: 'fas fa-plus-circle',
      label: 'Crear Presupuesto',
      description: 'Nuevo presupuesto'
    },
    {
      path: '/presupuestos',
      icon: 'fas fa-list',
      label: 'Mis Presupuestos',
      description: 'Lista de presupuestos'
    },
    {
      path: '/clientes',
      icon: 'fas fa-users',
      label: 'Clientes',
      description: 'Gestión de clientes'
    },
    {
      path: '/proveedores',
      icon: 'fas fa-truck',
      label: 'Proveedores',
      description: 'Gestión de proveedores'
    },
    {
      path: '/reportes',
      icon: 'fas fa-chart-bar',
      label: 'Reportes',
      description: 'Estadísticas e informes'
    },
    {
      path: '/configuracion',
      icon: 'fas fa-cog',
      label: 'Configuración',
      description: 'Ajustes del sistema'
    }
  ];

  const handleLogout = () => {
    // Lógica para cerrar sesión
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

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
            <li 
              key={item.path}
              className={location.pathname === item.path ? 'active' : ''}
              title={isCollapsed ? item.description : ''}
            >
              <Link to={item.path}>
                <i className={item.icon}></i>
                {!isCollapsed && (
                  <span className="menu-label">{item.label}</span>
                )}
              </Link>
            </li>
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