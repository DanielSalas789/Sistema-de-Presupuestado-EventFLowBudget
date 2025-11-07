// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { supabase } from "../data/supabaseClient";
// import "../Styles/Login.css";

// export default function Login() {
//   const [isRegistering, setIsRegistering] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [nombre, setNombre] = useState("");
//   const [rol, setRol] = useState("usuario");

//   // ✅ CREAR CUENTA
//   const register = async () => {
//     if (!email || !password || !nombre) {
//       return alert("Completa todos los campos.");
//     }

//     const emailNorm = email.trim().toLowerCase();

//     // Crear usuario en Supabase Auth
//     const { data, error } = await supabase.auth.signUp({
//       email: emailNorm,
//       password,
//     });

//     if (error) return alert(`❌ Error: ${error.message}`);

//     // Guardarlo en tabla "usuarios"
//     const { error: insertError } = await supabase.from("usuarios").insert({
//       id: data.user.id,
//       correo: emailNorm,
//       nombre,
//       rol,
//     });

//     if (insertError) {
//       console.error(insertError);
//       return alert("⚠ Error guardando en la tabla usuarios.");
//     }

//     alert(
//       "✅ Cuenta creada correctamente.\nSi la confirmación de correo está activada, revisa tu bandeja."
//     );
//     setIsRegistering(false);
//   };

//   // 🔐 LOGIN
//   const login = async () => {
//     const emailNorm = email.trim().toLowerCase();

//     const { data, error } = await supabase.auth.signInWithPassword({
//       email: emailNorm,
//       password,
//     });

//     if (error) {
//       if (error.message.includes("Email not confirmed")) {
//         return alert("⚠ Debes confirmar tu correo. Revisa SPAM.");
//       }
//       return alert(`❌ ${error.message}`);
//     }

//     // Obtener datos de tabla usuarios
//     const { data: usuario, error: userError } = await supabase
//       .from("usuarios")
//       .select("*")
//       .eq("id", data.user.id)
//       .single(); // 👈 Aquí se evita usuario null

//     if (userError || !usuario) {
//       return alert(
//         "⚠ Tu cuenta existe pero no está registrada en la tabla 'usuarios'. Vuelve a registrarte."
//       );
//     }

//     // Guardar sesión en localStorage
//     localStorage.setItem(
//       "user",
//       JSON.stringify({
//         id: data.user.id,
//         email: usuario.correo,
//         nombre: usuario.nombre,
//         tipo: usuario.rol,
//       })
//     );

//     // Redirección por rol
//     if (usuario.rol === "admin") navigate("/admin");
//     else if (usuario.rol === "empleado") navigate("/empleado");
//     else navigate("/dashboard");
//   };

//   // ⭐ LOGIN INVITADO
//   const loginGuest = async () => {
//     const randomEmail = `guest_${Date.now()}@temp.com`;
//     const randomPass = crypto.randomUUID();

//     const { data } = await supabase.auth.signUp({
//       email: randomEmail,
//       password: randomPass,
//     });

//     await supabase.from("usuarios").insert({
//       id: data.user.id,
//       correo: randomEmail,
//       nombre: "Invitado",
//       rol: "invitado",
//     });

//     localStorage.setItem(
//       "user",
//       JSON.stringify({
//         id: data.user.id,
//         email: randomEmail,
//         nombre: "Invitado",
//         tipo: "invitado",
//       })
//     );

//     navigate("/dashboard");
//   };

//   return (
//     <div className="login-wrapper">
//       <h1>EventFlow Budget</h1>

//       <div className="switch">
//         <button
//           className={!isRegistering ? "active" : ""}
//           onClick={() => setIsRegistering(false)}
//         >
//           Iniciar Sesión
//         </button>
//         <button
//           className={isRegistering ? "active" : ""}
//           onClick={() => setIsRegistering(true)}
//         >
//           Crear Cuenta
//         </button>
//       </div>

//       {isRegistering && (
//         <input
//           type="text"
//           placeholder="Nombre completo"
//           value={nombre}
//           onChange={(e) => setNombre(e.target.value)}
//         />
//       )}

//       <input
//         type="email"
//         placeholder="Correo electrónico"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />

//       <div className="password-field">
//         <input
//           type={showPassword ? "text" : "password"}
//           placeholder="Contraseña"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <span onClick={() => setShowPassword(!showPassword)}>
//           {showPassword ? "👁‍🗨" : "👁"}
//         </span>
//       </div>

//       {isRegistering && (
//         <select value={rol} onChange={(e) => setRol(e.target.value)}>
//           <option value="usuario">Usuario</option>
//           <option value="empleado">Empleado</option>
//           <option value="admin">Administrador</option>
//         </select>
//       )}

//       <button onClick={isRegistering ? register : login}>
//         {isRegistering ? "Registrarse" : "Iniciar Sesión"}
//       </button>

//       <button className="guest-button" onClick={loginGuest}>
//         Presupuesto rápido (Entrar como invitado)
//       </button>
//     </div>
//   );
// }
