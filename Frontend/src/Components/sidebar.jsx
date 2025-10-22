// 📄 Sidebar.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../Styles/Sidebar.css";
import EventFlowLogo from "../assets/Images/EventFlowBudget.png";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import useSidebarData from "../data/Sidebar/Const.jsx";

const Sidebar = ({ onToggle }) => {
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

  // 🔔 Notifica al padre cada vez que cambia el estado del sidebar
  useEffect(() => {
    if (onToggle) onToggle(isCollapsed);
  }, [isCollapsed, onToggle]);

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
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

      {/* MENU */}
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
        <button className="logout-btn" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i>
          {!isCollapsed && <span>Cerrar sesión</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
