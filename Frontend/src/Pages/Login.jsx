import React from "react";
import "../Styles/Login.css";
// SweetAlert2
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Login = ({ setRolUsuario }) => {
  const [registrando, setRegistrarse] = React.useState(false);
  const navigate = useNavigate();

  const functionAutenticacion = async (e) => {
    e.preventDefault();

    const Correo = e.target.email.value.trim();
    const Contraseña = e.target.password.value.trim();

    if (!Correo || !Contraseña) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor completa ambos campos antes de continuar",
      });
      return;
    }

    try {
      if (registrando) {
        // 🔹 Registro nuevo
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          Correo,
          Contraseña
        );
        const user = userCredential.user;

        // Enviar datos a tu backend con rol "usuario" por defecto
        await fetch("http://localhost:4000/api/usuarios", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            uid: user.uid,
            correo: Correo,
            rol: "Usuario",
          }),
        });

        Swal.fire("Registro exitoso", "Ahora puedes iniciar sesión", "success");
        setRegistrarse(false);
      } else {
        // 🔹 Inicio de sesión
        const userCredential = await signInWithEmailAndPassword(
          auth,
          Correo,
          Contraseña
        );
        const user = userCredential.user;
        const token = await user.getIdToken();

        // Consultar el rol desde el backend (MySQL)
        const response = await fetch(
          `http://localhost:5000/api/usuarios/${user.uid}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await response.json();

        if (response.ok) {
          const rol = data.rol;
          setRolUsuario(rol);

          Swal.fire("Bienvenido", `Sesión iniciada como ${rol}`, "success");

          if (rol === "admin") {
            navigate("/panel-admin");
          } else {
            navigate("/panel-empleado");
          }
        } else {
          Swal.fire("Error", "No se pudo obtener el rol del usuario", "error");
        }
      }
    } catch (error) {
      console.error("Error:", error.message);
      let mensaje = "Ocurrió un error inesperado.";

      switch (error.code) {
        case "auth/invalid-email":
          mensaje = "El correo no es válido.";
          break;
        case "auth/wrong-password":
          mensaje = "Contraseña incorrecta.";
          break;
        case "auth/user-not-found":
          mensaje = "Usuario no encontrado.";
          break;
        case "auth/email-already-in-use":
          mensaje = "Este correo ya está registrado.";
          break;
      }

      Swal.fire("Error de autenticación", mensaje, "error");
    }
  };

  function Login({ onLogin }) {
    return (
      <div className="login-container">
        <h1>💼 EventFlow Budget</h1>
        <p>Inicia sesión para acceder al sistema</p>

        <div className="login-buttons">
          <button
            className="btn-admin"
            onClick={() => onLogin("administrador")}
          >
            Ingresar como Administrador
          </button>

          <button className="btn-usuario" onClick={() => onLogin("usuario")}>
            Ingresar como Usuario
          </button>

          <button className="btn-empleado" onClick={() => onLogin("empleado")}>
            Ingresar como Empleado de Salón
          </button>
        </div>
      </div>
    );
  }
};
export default Login;
