import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
//import EditProfile from './editarPerfil/editarPerfil';

export const Navbar = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuClicked, setMenuClicked] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleMouseEnter = () => {
    setMenuVisible(true);
  };

  const handleMouseLeave = () => {
    if (!menuClicked) {
      setMenuVisible(false);
    }
  };

  const handleClick = () => {
    setMenuClicked(!menuClicked);
    setMenuVisible(!menuClicked);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  const handleEditProfileClick = () => {
    navigate('/perfil');
  };

  const handleLogoutClick = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <nav className="bg-[#143A27] p-4 rounded-[20px] h-10 mt-4 mx-4 abosolute z-10">
      <div className="container mx-auto flex justify-between items-center h-full">
        <div className="flex space-x-4 text-sm">
          <a href="#rutas" className="text-[#D4D9D8] hover:text-gray-400" onClick ={ () => navigate("/rutas")}>Rutas</a>
          <a href="#galeria" className="text-[#D4D9D8] hover:text-gray-400" onClick ={ () => navigate ("/galeria")}>Galeria</a>
          <a href="#feedback" className="text-[#D4D9D8] hover:text-gray-400" onClick = { () => navigate ("/feedback")}>Feedback</a>
          <a href="#blog" className="text-[#D4D9D8] hover:text-gray-400" onClick = { () => navigate ("/blog")}>Blog</a>
        </div>
        
        <div className="flex justify-center items-center">
          <img src="unimetours-logo.png" alt="UnimeTours Logo" className="h-10" onClick ={() => navigate("/")} />
        </div>
        
        <div className="flex items-center space-x-4 text-sm">
          <a href="#naturaleza" className="text-[#D4D9D8] hover:text-gray-400" onClick = { () => navigate ("/naturaleza")}>Naturaleza </a>
          <a href="#contacto" className="text-[#D4D9D8] hover:text-gray-400" onClick = { () => navigate ("/contactanos")}>Contáctanos</a>
          <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <img src="Group 1.png" alt="Icono perfil" className="h-8 cursor-pointer" onClick={handleClick}/>
          {menuVisible && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
                {currentUser ? (
                  <>
                    <button onClick={handleEditProfileClick} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200" /*onClick= {()=> navigate ("/perfil")*/>Editar perfil</button>
                    <button onClick={handleLogoutClick} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">Cerrar sesión</button>
                  </>
                ) : (
                  <>
                    <button onClick={handleLoginClick} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">Iniciar sesión</button>
                    <button onClick={handleSignupClick} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">Registrarse</button>
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