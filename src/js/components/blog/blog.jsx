import React, { useState } from "react";
import AllBlogs from "./all-blogs.jsx";
import AddBlog from "./add-blog.jsx";
import Footer from "../footer.jsx";

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
      {/* Contenido principal */}
      <div className="flex-grow px-4 py-12">
        {view === "allBlogs" && <AllBlogs onBack={() => setView("main")} />}
        {view === "addBlog" && <AddBlog onBack={() => setView("main")} />}

        {/* Vista principal */}
        {view === "main" && (
          <div className="max-w-5xl mx-auto">
            {/* Vista previa de los blogs */}
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="flex flex-col md:flex-row items-center bg-[#D4D9D8] border-2 border-[#143A27] rounded-xl shadow-lg overflow-hidden mb-8"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full md:w-[40%] h-64 object-cover"
                />
                <div className="p-6 md:w-[60%]">
                  <h2 className="text-2xl md:text-3xl font-bold text-[#143A27] mb-4">
                    {blog.title}
                  </h2>
                  <p className="text-base md:text-lg font-light text-[#143A27] mb-4">
                    {blog.description.length > 150
                      ? `${blog.description.substring(0, 150)}...`
                      : blog.description}
                  </p>
                </div>
              </div>
            ))}

            {/* Botones para ver más y añadir entrada */}
            <div className="flex justify-center gap-6 mt-8">
              <button
                className="bg-[#143A27] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#96A89C] transition duration-300 w-[45%] md:w-auto"
                onClick={() => setView("allBlogs")}
              >
                Ver más
              </button>
              <button
                className="bg-[#143A27] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#96A89C] transition duration-300 w-[45%] md:w-auto"
                onClick={() => setView("addBlog")}
              >
                Añadir entrada
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Blog;

