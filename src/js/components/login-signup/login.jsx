import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebaseConfig.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Iniciar sesión con Firebase Auth
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // Verificar si el usuario es administrador
      if (
        email === "samantha.castro@correo.unimet.edu.ve" &&
        password === "123456"
      ) {
        // Asignar rol de administrador
        await getDoc(doc(db, "users", user.uid)).then((docSnapshot) => {
          if (docSnapshot.exists()) {
            const userData = docSnapshot.data();
            if (userData.role !== "admin") {
              userData.role = "admin"; // Actualizar el rol en la base de datos si es necesario
            }
          }
        });

        alert("Bienvenida, Administradora.");
        navigate("/admin"); // Redirigir a la página de administrador
      } else {
        // Verificar el rol del usuario en Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.role === "usuario" || userData.role === "guia") {
            alert("Inicio de sesión exitoso.");
            navigate("/"); // Redirigir a la página principal
          } else {
            throw new Error("No tienes permisos para acceder.");
          }
        }
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setErrMsg("Correo o contraseña incorrectos.");
    }
  };

  return (
    <div className="bg-[#96A89C] min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="max-w-md w-full bg-white p-8 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-[#143A27] text-center mb-6">
          Iniciar sesión
        </h2>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[#143A27]"
          >
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-[#143A27]"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>
        {errMsg && (
          <p className="text-red-500 text-sm text-center mb-4">{errMsg}</p>
        )}
        <button
          type="submit"
          className="w-full bg-[#143A27] text-white font-semibold py-3 px-8 rounded-lg hover:bg-[#96A89C] transition duration-300"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
