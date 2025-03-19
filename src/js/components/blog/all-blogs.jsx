import React from "react";
import Blog from "./blog.jsx";
import AddBlog from "./add-blog.jsx";

const AllBlogs = ({ blogs, onBack }) => {
  
  // const blogs = [
  //   {
  //     id: 1,
  //     title: "Explorando Sabas Nieves",
  //     description:
  //       "El día de hoy 09/03/2025 realicé la ruta de senderismo dictada por el guía Juan Pérez. Fue una experiencia increíble...",
  //     image: "blog1.jpg",
  //   },
  //   {
  //     id: 2,
  //     title: "Aventura en Pico el Ávila",
  //     description:
  //       "Una aventura inolvidable subiendo al Pico el Ávila. Conoce los detalles de esta ruta desafiante y emocionante...",
  //     image: "blog2.jpg",
  //   },
  //   {
  //     id: 3,
  //     title: "Descubriendo La Cascada",
  //     description:
  //       "Descubre la belleza de la ruta La Cascada, una experiencia única llena de paisajes impresionantes y naturaleza...",
  //     image: "blog3.jpg",
  //   },
  // ];

  return (
    <div className="all-blogs-page px-4 py-10 bg-[#F5F5F5]">
      <h1 className="text-3xl md:text-5xl font-bold text-[#143A27] text-center mb-8">
        Todos los Blogs
      </h1>
      
      <div className="blogs-container max-w-5xl mx-auto bg-[#D4D9D8] p-5 rounded-xl shadow-lg border-4 border-[#143A27]">
        {blogs.length === 0 ? (
          <p className="text-center text-[#143A27]">No hay blogs añadidos.</p>
        ) : (
          blogs.map((blog) => (
            <div
              key={blog.id}
              className="blog-item flex flex-col md:flex-row items-center bg-white rounded-xl shadow-md mb-6 p-5 border border-gray-300 transition duration-300 hover:shadow-xl"
            >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full md:w-[40%] h-48 object-cover rounded-lg mb-4 md:mb-0 md:mr-6"
            />
            <div className="text-content md:w-[60%]">
              <h2 className="text-xl md:text-2xl font-bold text-[#143A27] mb-2">
                {blog.title}
              </h2>
              <p className="text-sm md:text-base font-light text-[#143A27] leading-relaxed">
                {blog.description.length > 150
                  ? `${blog.description.substring(0, 150)}...`
                  : blog.description}
              </p>
            </div>
          </div>
          ))
        )}
      </div>

      {/* Botón de volver */}
      <div className="flex justify-center mt-10">
        <button
          className="bg-[#143A27] text-white font-semibold py-3 px-8 rounded-lg hover:bg-[#96A89C] transition duration-300 w-full md:w-auto"
          onClick={onBack}
        >
          Volver
        </button>
      </div>
    </div>
  );
};

export default AllBlogs;
