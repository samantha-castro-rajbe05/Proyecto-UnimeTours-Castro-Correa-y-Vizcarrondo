import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export const Navbar = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogoutClick = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <nav className="bg-[#143A27] p-4 rounded-[20px] h-14 w-full mt-4 fixed z-10">
      <div className="container mx-auto flex justify-between items-center h-full">
        {/* Links principales */}
        <div className="flex space-x-4 text-sm">
          <button
            className="text-[#D4D9D8] hover:text-gray-400"
            onClick={() => navigate("/rutas")}
          >
            Rutas
          </button>
          <button
            className="text-[#D4D9D8] hover:text-gray-400"
            onClick={() => navigate("/galeria")}
          >
            Galería
          </button>
          <button
            className="text-[#D4D9D8] hover:text-gray-400"
            onClick={() => navigate("/feedback")}
          >
            Feedback
          </button>
          <button
            className="text-[#D4D9D8] hover:text-gray-400"
            onClick={() => navigate("/blog")}
          >
            Blog
          </button>
        </div>

        {/* Logo */}
        <div className="flex justify-center items-center">
          <img 
            src="unimetours-logo.png" 
            alt="UnimeTours Logo" 
            className="h-10 cursor-pointer" 
            onClick={() => navigate("/")} 
          />
        </div>

        {/* Links adicionales */}
        <div className="flex items-center space-x-4 text-sm">
          <button
            className="text-[#D4D9D8] hover:text-gray-400"
            onClick={() => navigate("/naturaleza")}
          >
            Naturaleza
          </button>
          <button
            className="text-[#D4D9D8] hover:text-gray-400"
            onClick={() => navigate("/contactanos")}
          >
            Contáctanos
          </button>
          <div
            className="relative"
            onMouseEnter={() => setMenuVisible(true)}
            onMouseLeave={() => setMenuVisible(false)}
          >
            <img 
              src="Group 1.png" 
              alt="Icono perfil" 
              className="h-8 cursor-pointer" 
            />
            {menuVisible && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
                {currentUser ? (
                  <>
                    <button
                      onClick={() => navigate("/perfil")}
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
                      onClick={() => navigate("/login")}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                    >
                      Iniciar sesión
                    </button>
                    <button
                      onClick={() => navigate("/signup")}
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
