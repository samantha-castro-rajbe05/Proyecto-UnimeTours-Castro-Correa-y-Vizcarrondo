import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuClicked, setMenuClicked] = useState(false);
  const navigate = useNavigate();

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

  return (
    <nav className="bg-[#143A27] p-4 rounded-[20px] h-10 mt-4 mx-4 abosolute z-10">
      <div className="container mx-auto flex justify-between items-center h-full">
        <div className="flex space-x-4 text-sm">
          <a href="#rutas" className="text-[#D4D9D8] hover:text-gray-400" onClick ={ () => navigate("/rutas")}>Rutas</a>
          <a href="#galeria" className="text-[#D4D9D8] hover:text-gray-400">Galería</a>
          <a href="#feedback" className="text-[#D4D9D8] hover:text-gray-400">Feedback</a>
          <a href="#blog" className="text-[#D4D9D8] hover:text-gray-400">Blog</a>
        </div>
        
        <div className="flex justify-center items-center">
          <img src="unimetours-logo.png" alt="UnimeTours Logo" className="h-10" onClick ={() => navigate("/")} />
        </div>
        
        <div className="flex items-center space-x-4 text-sm">
          <a href="#naturaleza" className="text-[#D4D9D8] hover:text-gray-400">Naturaleza</a>
          <a href="#contacto" className="text-[#D4D9D8] hover:text-gray-400">Contáctanos</a>
          <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <img src="Group 1.png" alt="Icono perfil" className="h-8 cursor-pointer" onClick={handleClick}/>
          {menuVisible && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
                <button onClick={handleLoginClick} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">Iniciar sesión</button>
                <button onClick={handleSignupClick} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">Registrarse</button>
              </div>
            )}
        </div>
        </div> 
        </div>
    </nav>
  );
};

export default Navbar;