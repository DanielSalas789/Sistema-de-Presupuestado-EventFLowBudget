// 📄 src/data/Sidebar/useSidebarData.jsx

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaHome, FaHouseUser, FaCalendarDay } from "react-icons/fa";
import { AiFillEdit, AiFillCalculator } from "react-icons/ai";
import { MdOutlineRoomService } from "react-icons/md";
/* 
===========================================
🧩 Hook personalizado: useSidebarData
-------------------------------------------
Este hook gestiona la lógica de:
- Colapso y expansión del sidebar
- Submenús activos
- Datos del usuario
- Navegación y cierre de sesión
- Construcción dinámica del menú según rol
===========================================
*/

const useSidebarData = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // --- Estados principales ---
  const [isCollapsed, setIsCollapsed] = useState(false); // Controla si el sidebar está colapsado
  const [openSubmenu, setOpenSubmenu] = useState(null); // Guarda qué submenú está abierto
  const [usuario, setUsuario] = useState({
    nombre: "Invitado",
    tipo: "usuario",
  }); // Info del usuario actual

  // === Cargar usuario desde localStorage ===
  // === Cargar usuario desde localStorage (con confirmación automática) ===
  useEffect(() => {
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData) {
        setUsuario(userData);

        // ✅ Confirmación automática al detectar sesión activa
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: `Bienvenido de nuevo, ${userData.nombre}`,
          showConfirmButton: false,
          timer: 1200,
        });
      }
    } catch (error) {
      console.error("❌ Error al leer usuario desde localStorage:", error);

      // ✅ Mensaje si hay error
      Swal.fire({
        icon: "error",
        title: "Error al cargar datos",
        text: "No se pudo recuperar la sesión.",
      });
    }
  }, []);

  // === Alternar colapso del sidebar ===
  const handleToggleSidebar = () => {
    const newState = !isCollapsed; // Usamos el nuevo estado antes de aplicarlo
    setIsCollapsed(newState);

    Swal.fire({
      toast: true,
      position: "top-end",
      icon: newState ? "info" : "success",
      title: newState ? "Sidebar colapsado" : "Sidebar expandido",
      showConfirmButton: false,
      timer: 1000,
    });
  };

  // === Alternar apertura de submenús ===
  const toggleSubmenu = (menuKey) => {
    const isClosing = openSubmenu === menuKey;
    setOpenSubmenu(isClosing ? null : menuKey);

    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "info",
      title: `Submenú "${menuKey}" ${isClosing ? "cerrado" : "abierto"}`,
      showConfirmButton: false,
      timer: 1000,
    });
  };

  // === Cerrar sesión ===
  const handleLogout = () => {
    Swal.fire({
      title: "¿Cerrar sesión?",
      text: "Tu sesión se cerrará y volverás al inicio de sesión.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, salir",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        navigate("/Login");
      }
    });
  };

  // === Verificar ruta activa ===
  const isActive = (path) => location.pathname.startsWith(path);

  // --- Menús base (se pueden mover a un archivo separado si crecen más) ---
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
      path: "/Nuestros-Servicios",
      icon: <MdOutlineRoomService />,
      label: "Nuestros Servicios",
      description: "Ver servicios",
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
      path: "/usuario/Calendario",
      icon: <FaCalendarDay />,
      label: "Calendario",
    },
  ];
  // ⚠️ Si no hay usuario cargado, evitar romper la app
  if (!usuario || !usuario.tipo) {
    console.warn("⚠️ Usuario no disponible, usando menú base");
    return {
      isCollapsed,
      openSubmenu,
      usuario,
      menuItems: baseMenu,
      toggleSidebar: handleToggleSidebar,
      toggleSubmenu,
      handleLogout,
      isActive,
    };
  }

  // --- Construcción dinámica del menú según rol ---
  let menuItems = [...baseMenu];
  if (usuario.tipo === "administrador") menuItems.push(...adminMenu);
  else if (usuario.tipo === "empleado") menuItems.push(...empleadoMenu);
  else menuItems.push(...usuarioMenu);

  // === Autoabrir submenú activo ===
  useEffect(() => {
    const activeSubmenu = menuItems.find(
      (item) =>
        item.type === "submenu" &&
        item.subItems?.some((subItem) => isActive(subItem.path))
    );
    if (activeSubmenu) setOpenSubmenu(activeSubmenu.key);
  }, [location.pathname]);

  // === Retornar funciones y estados útiles al componente que usa este hook ===
  return {
    isCollapsed,
    openSubmenu,
    usuario,
    menuItems,
    toggleSidebar: handleToggleSidebar,
    toggleSubmenu,
    handleLogout,
    isActive,
  };
};

export default useSidebarData;
