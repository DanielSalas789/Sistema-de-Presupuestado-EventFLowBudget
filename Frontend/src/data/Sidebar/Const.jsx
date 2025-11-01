import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaHome, FaHouseUser, FaCalendarDay } from "react-icons/fa";
import { AiFillEdit, AiFillCalculator } from "react-icons/ai";

const useSidebarData = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [usuario, setUsuario] = useState({
    nombre: "Invitado",
    tipo: "usuario",
  });

  // Cargar usuario desde localStorage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) setUsuario(userData);
  }, []);

  // --- Funciones principales ---
  const toggleSidebar = () => setIsCollapsed((prev) => !prev);

  const handleToggleSidebar = () => {
    toggleSidebar();
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: isCollapsed ? "info" : "success",
      title: isCollapsed ? "Sidebar expandido" : "Sidebar colapsado",
      showConfirmButton: false,
      timer: 1000,
    });
  };

  const toggleSubmenu = (menuKey) => {
    setOpenSubmenu(openSubmenu === menuKey ? null : menuKey);
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "info",
      title: `Submenú "${menuKey}" ${
        openSubmenu === menuKey ? "cerrado" : "abierto"
      }`,
      showConfirmButton: false,
      timer: 1000,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/Login");
  };

  const isActive = (path) =>
    location.pathname === path ||
    location.pathname.startsWith(path + "/Frontend/src/Pages/Login.jsx");

  // --- Menús ---
  const baseMenu = [
    {
      type: "single",
      path: "/Home",
      icon: <FaHome />,
      label: "Inicio",
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

  // --- Menú dinámico según tipo ---
  let menuItems = [...baseMenu];
  if (usuario.tipo === "administrador") menuItems.push(...adminMenu);
  else if (usuario.tipo === "empleado") menuItems.push(...empleadoMenu);
  else menuItems.push(...usuarioMenu);

  // --- Autoabrir submenú activo ---
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
    toggleSidebar: handleToggleSidebar, // 🔄 usa la versión con SweetAlert
    toggleSubmenu,
    handleLogout,
    isActive,
  };
};

export default useSidebarData;
