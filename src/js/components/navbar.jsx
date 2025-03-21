import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebaseConfig"; // Ajusta la ruta según tu estructura

export const Navbar = () => {
  // Hooks que se llaman siempre
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuClicked, setMenuClicked] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, loadingAuth] = useAuthState(auth);

  // Hook para obtener el rol desde Firestore (se ejecuta siempre que user o loadingAuth cambien)
  useEffect(() => {
    async function getUserRole() {
      try {
        if (!user) {
          console.log("No hay usuario autenticado.");
          setRole("usuario");
          setLoading(false);
          return;
        }
        const uid = user.uid;
        console.log("UID obtenido:", uid);
        const q = query(collection(db, "users"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          console.log("Datos del usuario:", userData);
          setRole(userData.role || "usuario");
        } else {
          console.log("No se encontró el usuario con ese uid.");
          setRole("usuario");
        }
      } catch (error) {
        console.error("Error fetching user role: ", error);
        setRole("usuario");
      }
      setLoading(false);
    }
    if (!loadingAuth) {
      getUserRole();
    }
  }, [user, loadingAuth]);

  // Hook para la suscripción a los cambios en la autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Si la carga está en proceso, siempre retorna lo mismo (sin hook condicional)
  if (loading || loadingAuth) {
    return <div>Cargando...</div>;
  }

  // Handlers (estos se definen siempre)
  const handleMouseEnter = () => setMenuVisible(true);
  const handleMouseLeave = () => {
    if (!menuClicked) setMenuVisible(false);
  };
  const handleClick = () => {
    setMenuClicked(!menuClicked);
    setMenuVisible(!menuClicked);
  };
  const handleLoginClick = () => navigate('/login');
  const handleSignupClick = () => navigate('/signup');
  const handleEditProfileClick = () => navigate('/perfil');
  const handleLogoutClick = async () => {
    await signOut(auth);
    navigate('/');
  };

  // RETORNO ÚNICO: La estructura base (la etiqueta <nav>) se retorna siempre y, en su interior,
  // se renderizan condicionalmente las partes que dependen del rol.
  return (
    <nav className="bg-[#143A27] p-4 rounded-[20px] h-10 mt-4 mx-4 z-10">
      <div className="container mx-auto flex justify-between items-center h-full">
        {/* Sección izquierda: enlaces */}
        <div className="flex space-x-4 text-sm">
          {role === "admin" ? (
            <>
              <a
                href="#rutas"
                className="text-[#D4D9D8] hover:text-gray-400"
                onClick={() => navigate("/rutas")}
              >
                Administrar rutas
              </a>
              <a
                href="#galeria"
                className="text-[#D4D9D8] hover:text-gray-400"
                onClick={() => navigate("/galeria")}
              >
                Galeria
              </a>
              <a
                href="#feedback"
                className="text-[#D4D9D8] hover:text-gray-400"
                onClick={() => navigate("/feedback")}
              >
                Feedback
              </a>
              <a
                href="#blog"
                className="text-[#D4D9D8] hover:text-gray-400"
                onClick={() => navigate("/blog")}
              >
                Blog
              </a>
            </>
          ) : (
            <>
              <a
                href="#rutas"
                className="text-[#D4D9D8] hover:text-gray-400"
                onClick={() => navigate("/rutas")}
              >
                Rutas
              </a>
              <a
                href="#galeria"
                className="text-[#D4D9D8] hover:text-gray-400"
                onClick={() => navigate("/galeria")}
              >
                Galeria
              </a>
              <a
                href="#feedback"
                className="text-[#D4D9D8] hover:text-gray-400"
                onClick={() => navigate("/feedback")}
              >
                Feedback
              </a>
              <a
                href="#blog"
                className="text-[#D4D9D8] hover:text-gray-400"
                onClick={() => navigate("/blog")}
              >
                Blog
              </a>
            </>
          )}
        </div>
        {/* Sección central: Logo */}
        <div className="flex justify-center items-center">
          <img
            src="unimetours-logo.png"
            alt="UnimeTours Logo"
            className="h-10 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>
        {/* Sección derecha: Enlaces adicionales y menú de perfil */}
        <div className="flex items-center space-x-4 text-sm">
          {role === "admin" ? (
            <>
              <a
                href="#naturaleza"
                className="text-[#D4D9D8] hover:text-gray-400"
                onClick={() => navigate("/naturaleza")}
              >
                Naturaleza
              </a>
              <a
                href="#blog"
                className="text-[#D4D9D8] hover:text-gray-400"
                onClick={() => navigate("/cambiar-role")}
              >
                Administrar guías
              </a>
            </>
          ) : (
            <>
              <a
                href="#naturaleza"
                className="text-[#D4D9D8] hover:text-gray-400"
                onClick={() => navigate("/naturaleza")}
              >
                Naturaleza
              </a>
              <a
                href="#contacto"
                className="text-[#D4D9D8] hover:text-gray-400"
                onClick={() => navigate("/contactanos")}
              >
                Contáctanos
              </a>
            </>
          )}
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src="Group 1.png"
              alt="Icono perfil"
              className="h-8 cursor-pointer"
              onClick={handleClick}
            />
            {menuVisible && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
                {currentUser ? (
                  <>
                    <button
                      onClick={handleEditProfileClick}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                    >
                      Editar perfil
                    </button>
                    <button
                      onClick={handleLogoutClick}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                    >
                      Cerrar sesión
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleLoginClick}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                    >
                      Iniciar sesión
                    </button>
                    <button
                      onClick={handleSignupClick}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                    >
                      Registrarse
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
