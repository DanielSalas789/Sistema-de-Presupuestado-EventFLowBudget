// 📄 src/data/Sidebar/Const.jsx
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaAccessibleIcon,
  FaCircle,
  FaHome,
  FaHouseUser,
} from "react-icons/fa";
import { FaCalendarDay } from "react-icons/fa6";
import { AiFillEdit, AiFillCalculator } from "react-icons/ai";

const useSidebarData = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [usuario, setUsuario] = useState({
    nombre: "Invitado",
    tipo: "usuario", // "administrador" | "empleado" | "usuario"
  });

  // Cargar usuario desde localStorage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) setUsuario(userData);
  }, []);

  // --- Funciones ---
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const toggleSubmenu = (menuKey) =>
    setOpenSubmenu(openSubmenu === menuKey ? null : menuKey);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/Login");
  };

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  // --- Menús ---
  const baseMenu = [
    {
      type: "single",
      path: "/Home", // 👈 Nuevo ítem "Home"
      icon: <FaHome />,
      label: "Inicio", // 👈 Este texto es el que se mostrará
      description: "Ir al inicio",
    },
    {
      type: "single",
      path: "/Dashboard",
      icon: <FaHouseUser />,
      label: "Dashboard",
      description: "Panel principal",
    },
    {
      type: "single",
      path: "/crear-presupuesto",
      icon: <AiFillEdit />,
      label: "Crear Presupuesto",
      description: "Nuevo presupuesto",
    },
    {
      type: "single",
      path: "/presupuestos",
      icon: <AiFillCalculator />,
      label: "Mis Presupuestos",
      description: "Lista de presupuestos",
    },
  ];

  const adminMenu = [
    {
      type: "submenu",
      key: "servicios",
      icon: "<AiFillCalculator />",
      label: "Servicios",
      description: "Gestión de servicios",
      subItems: [
        {
          path: "/servicios/catering",
          icon: "fas fa-utensils",
          label: "Catering",
        },
        {
          path: "/servicios/decoracion",
          icon: "fas fa-palette",
          label: "Decoración",
        },
      ],
    },
    {
      type: "single",
      path: "/configuracion",
      icon: "fas fa-cog",
      label: "Configuración",
    },
  ];

  const empleadoMenu = [
    {
      type: "single",
      path: "/empleado/eventos",
      icon: <FaCalendarDay />,
      label: "Mis Eventos",
    },
  ];

  const usuarioMenu = [
    {
      type: "single",
      path: "/usuario/mis-eventos",
      icon: <FaCalendarDay />,
      label: "Mis Eventos",
    },
  ];

  // --- Lógica de menú dinámico ---
  let menuItems = [...baseMenu];
  if (usuario.tipo === "administrador") menuItems.push(...adminMenu);
  else if (usuario.tipo === "empleado") menuItems.push(...empleadoMenu);
  else if (usuario.tipo === "usuario") menuItems.push(...usuarioMenu);

  // Autoabrir submenú activo
  useEffect(() => {
    const activeSubmenu = menuItems.find(
      (item) =>
        item.type === "submenu" &&
        item.subItems?.some((subItem) => isActive(subItem.path))
    );
    if (activeSubmenu) setOpenSubmenu(activeSubmenu.key);
  }, [location.pathname]);

  return {
    isCollapsed,
    openSubmenu,
    usuario,
    menuItems,
    toggleSidebar,
    toggleSubmenu,
    handleLogout,
    isActive,
  };
};

export default useSidebarData;
