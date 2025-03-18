import React, { useState } from "react";
import AllBlogs from "./all-blogs.jsx"; // Importa el componente para ver todos los blogs
import AddBlog from "./add-blog.jsx"; // Importa el componente para añadir un blog
import Footer from "../footer.jsx"; // Importa el componente Footer

const Blog = () => {
  const [view, setView] = useState("main");

  const blogs = [
    {
      id: 1,
      title: "Explorando Sabas Nieves",
      description:
        "El día de hoy 09/03/2025 realicé la ruta de senderismo dictada por el guía Juan Pérez. Fue una experiencia increíble...",
      image: "blog1.jpg",
    },
    {
      id: 2,
      title: "Aventura en Pico el Ávila",
      description:
        "Una aventura inolvidable subiendo al Pico el Ávila. Conoce los detalles de esta ruta desafiante y emocionante...",
      image: "blog2.jpg",
    },
    {
      id: 3,
      title: "Descubriendo La Cascada",
      description:
        "Descubre la belleza de la ruta La Cascada, una experiencia única llena de paisajes impresionantes y naturaleza...",
      image: "blog3.jpg",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F5F5]">
      {/* Contenido principal con flex-grow para que el footer quede abajo */}
      <div className="flex-grow px-10 py-10">
        {/* Renderiza la vista según el estado */}
        {view === "allBlogs" && <AllBlogs onBack={() => setView("main")} />}
        {view === "addBlog" && <AddBlog onBack={() => setView("main")} />}
        {view === "main" && (
          <>
            {/* Vista previa de los blogs */}
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="blog-preview flex flex-col md:flex-row items-center bg-[#D4D9D8] border-4 border-[#143A27] rounded-lg shadow-md mb-10 p-10"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full md:w-[45%] h-80 object-cover rounded-lg mb-5 md:mb-0 md:mr-8"
                />
                <div className="text-content md:w-[55%]">
                  <h2 className="text-4xl font-bold text-[#143A27] mb-4">
                    {blog.title}
                  </h2>
                  <p className="text-base font-light text-[#143A27] mb-4">
                    {blog.description.length > 150
                      ? `${blog.description.substring(0, 150)}...`
                      : blog.description}
                  </p>
                </div>
              </div>
            ))}

            {/* Botones para ver más y añadir entrada */}
            <div className="flex justify-center gap-4 mt-10">
              <button
                className="bg-[#143A27] text-white font-semibold py-3 px-8 rounded-lg hover:bg-[#96A89C] transition duration-300"
                onClick={() => setView("allBlogs")}
              >
                Ver más
              </button>
              <button
                className="bg-[#143A27] text-white font-semibold py-3 px-8 rounded-lg hover:bg-[#96A89C] transition duration-300"
                onClick={() => setView("addBlog")}
              >
                Añadir entrada
              </button>
            </div>
          </>
        )}
      </div>

      {/* Footer fijo abajo */}
      <Footer />
    </div>
  );
};

export default Blog;
