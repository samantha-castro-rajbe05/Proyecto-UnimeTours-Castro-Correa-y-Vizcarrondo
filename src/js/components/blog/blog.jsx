import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";
import { db, auth } from "../../firebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";
import AllBlogs from "./all-blogs.jsx";
import AddBlog from "./add-blog.jsx";
import Footer from "../footer.jsx";
import { uploadImage } from "../../supabaseConfig"; 

const Blog = () => {
  const [view, setView] = useState("main");
  const [blogs, setBlogs] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

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
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  
    const fetchBlogs = async () => {
      try {
        const blogsCollection = collection(db, "blogs");
        // Crea la consulta con ordenamiento
        const q = query(blogsCollection, orderBy("createdAt", "desc")); // <-- Usa las funciones importadas
        
        const blogsSnapshot = await getDocs(q);
        const blogsList = blogsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(blogsList);
      } catch (error) {
        console.error("Error cargando blogs:", error);
      }
    };
  
    fetchBlogs();
  
    return () => unsubscribe();
  }, [view]); // Agrega [view] como dependencia

  const handleAddBlog = async (blog) => {
    if (!currentUser) {
      alert("Debes estar autenticado para añadir un blog.");
      return;
    }

    try {
      // Subir imagen a Supabase
      let imageUrl = "";

        // Subir imagen primero si existe
        if (blog.image) {
          imageUrl = await uploadImage(
            blog.image, 
            "unimetours-fotos", 
            `public/users/${currentUser.uid}/blog-images` // Estructura de carpetas más organizada
          );
          if (!imageUrl) throw new Error("Error al subir la imagen");
        }

        const blogData = {
          title: blog.title,
          description: blog.description,
          image: imageUrl,
          userId: currentUser.uid,
          createdAt: new Date() // Añade timestamp
        };

      // Añadir blog a Firestore
    //   const docRef = await addDoc(collection(db, "blogs"), {
    //     ...blog,
    //     image: imageUrl,
    //     userId: currentUser.uid,
    //   });
    //   setBlogs([{ id: docRef.id, ...blog, image: imageUrl }, ...blogs]);
    //   setView("main");
    // } catch (error) {
    //   console.error("Error al añadir blog:", error);
    // }
    const docRef = await addDoc(collection(db, "blogs"), blogData);
    
    //actualizamos estado
    setBlogs(prev => [{ 
      id: docRef.id, 
      ...blogData 
    }, ...prev]);

    setView("Blog");

  } catch (error) {
    console.error("Error detallado:", error);
    alert(`Error al guardar: ${error.message}`);
  }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F5F5]">
      {/* Contenido principal */}
      <div className="flex-grow px-4 py-12">
        {view === "allBlogs" && <AllBlogs blogs={blogs} onBack={() => setView("main")} />}
        {view === "addBlog" && <AddBlog onBack={() => setView("main")} onAddBlog={handleAddBlog} />}

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
              {currentUser && (
              <button
                className="bg-[#143A27] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#96A89C] transition duration-300 w-[45%] md:w-auto"
                onClick={() => setView("addBlog")}
              >
                Añadir entrada
              </button>
              )}
            </div>
          </div>
        )}
      </div>

      
    </div>
  );
};

export default Blog;

