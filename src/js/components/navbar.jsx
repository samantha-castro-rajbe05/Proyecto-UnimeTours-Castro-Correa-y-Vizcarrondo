import React from 'react';
import './Navbar.css'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <a href="#rutas">Rutas</a>
        <a href="#galeria">Galería</a>
        <a href="#feedback">Feedback</a>
        <a href="#blog">Blog</a>
      </div>
      
      <div className="nav-center">
        <a href="#home" className="logo">UNIMETOURS</a>
      </div>
      
      <div className="nav-right">
        <a href="#naturaleza">Naturalera</a>
        <a href="#contacto">Contácctanos</a>
      </div>
    </nav>
  );
};

export default Navbar;