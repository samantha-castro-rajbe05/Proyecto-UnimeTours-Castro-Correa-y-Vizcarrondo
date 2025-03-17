import React from "react";

const Blog = () => {
  return (
    <div className="blog-page px-10 py-10 bg-[#F5F5F5]">
      <h1 className="text-5xl font-bold text-[#143A27] text-center mb-10">Blog</h1>
      
      {/* First Blog Preview */}
      <div className="blog-preview flex flex-col md:flex-row items-center bg-[#D4D9D8] rounded-lg shadow-md mb-10 p-5">
        <img
          src="blog1.jpg"
          alt="Blog 1"
          className="w-full md:w-1/3 h-40 object-cover rounded-lg mb-5 md:mb-0 md:mr-5"
        />
        <div className="text-content md:w-2/3">
          <h2 className="text-2xl font-bold text-[#143A27] mb-2">Explorando Sabas Nieves</h2>
          <p className="text-sm font-light text-[#143A27] mb-2">Por Juan Pérez</p>
          <p className="text-sm font-light text-[#143A27]">
            El día de hoy 09/03/2025 realicé la ruta de senderismo dictada por el guía Juan Pérez. Fue una experiencia increíble...
          </p>
        </div>
      </div>

      {/* Second Blog Preview */}
      <div className="blog-preview flex flex-col md:flex-row-reverse items-center bg-[#D4D9D8] rounded-lg shadow-md mb-10 p-5">
        <img
          src="blog2.jpg"
          alt="Blog 2"
          className="w-full md:w-1/3 h-40 object-cover rounded-lg mb-5 md:mb-0 md:ml-5"
        />
        <div className="text-content md:w-2/3">
          <h2 className="text-2xl font-bold text-[#143A27] mb-2">Aventura en Pico el Ávila</h2>
          <p className="text-sm font-light text-[#143A27] mb-2">Por María López</p>
          <p className="text-sm font-light text-[#143A27]">
            Una aventura inolvidable subiendo al Pico el Ávila. Conoce los detalles de esta ruta desafiante y emocionante...
          </p>
        </div>
      </div>

      {/* Third Blog Preview */}
      <div className="blog-preview flex flex-col md:flex-row items-center bg-[#D4D9D8] rounded-lg shadow-md mb-10 p-5">
        <img
          src="blog3.jpg"
          alt="Blog 3"
          className="w-full md:w-1/3 h-40 object-cover rounded-lg mb-5 md:mb-0 md:mr-5"
        />
        <div className="text-content md:w-2/3">
          <h2 className="text-2xl font-bold text-[#143A27] mb-2">Descubriendo La Cascada</h2>
          <p className="text-sm font-light text-[#143A27] mb-2">Por Carlos García</p>
          <p className="text-sm font-light text-[#143A27]">
            Descubre la belleza de la ruta La Cascada, una experiencia única llena de paisajes impresionantes y naturaleza...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Blog;