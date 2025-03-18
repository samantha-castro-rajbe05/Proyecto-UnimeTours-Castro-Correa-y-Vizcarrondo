import React from "react";

const AllBlogs = ({ onBack }) => {
  const blogs = [
    {
      id: 1,
      title: "Explorando Sabas Nieves",
      description: "El día de hoy 09/03/2025 realicé la ruta de senderismo dictada por el guía Juan Pérez. Fue una experiencia increíble...",
      image: "blog1.jpg",
    },
    {
      id: 2,
      title: "Aventura en Pico el Ávila",
      description: "Una aventura inolvidable subiendo al Pico el Ávila. Conoce los detalles de esta ruta desafiante y emocionante...",
      image: "blog2.jpg",
    },
    {
      id: 3,
      title: "Descubriendo La Cascada",
      description: "Descubre la belleza de la ruta La Cascada, una experiencia única llena de paisajes impresionantes y naturaleza...",
      image: "blog3.jpg",
    },
  ];

  return (
    <div className="all-blogs-page px-10 py-10 bg-[#F5F5F5]">
      <h1 className="text-5xl font-bold text-[#143A27] text-center mb-10">Todos los Blogs</h1>
      <div className="blogs-container max-h-[600px] overflow-y-scroll bg-[#D4D9D8] p-5 rounded-lg shadow-lg border-4 border-[#143A27]">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="blog-item flex flex-col md:flex-row items-center bg-white rounded-lg shadow-md mb-5 p-5 border border-gray-300"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full md:w-[30%] h-40 object-cover rounded-lg mb-5 md:mb-0 md:mr-5"
            />
            <div className="text-content md:w-[70%]">
              <h2 className="text-2xl font-bold text-[#143A27] mb-2">{blog.title}</h2>
              <p className="text-sm font-light text-[#143A27]">{blog.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-5">
        <button
          className="bg-[#143A27] text-white font-semibold py-2 px-6 rounded-lg hover:bg-[#96A89C] transition duration-300"
          onClick={onBack}
        >
          Volver
        </button>
      </div>
    </div>
  );
};

export default AllBlogs;