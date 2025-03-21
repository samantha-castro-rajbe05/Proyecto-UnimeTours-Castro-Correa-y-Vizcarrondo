import React, { useState, useEffect } from "react"; 
import { collection, addDoc, deleteDoc, doc, query, orderBy, onSnapshot } from "firebase/firestore";
import { db, auth } from "../../firebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";
import AddBlog from "./add-blog.jsx";
import { uploadImage } from "../../supabaseConfig";
import { X } from "lucide-react"; // Ícono para el botón de eliminar

const Blog = () => {
  const [view, setView] = useState("main");
  const [blogs, setBlogs] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [expandedBlog, setExpandedBlog] = useState(null); // Controlar texto expandido

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
    const unsubscribeFirestore = onSnapshot(q, (snapshot) => {
      const blogsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogs(blogsData);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeFirestore();
    };
  }, []);

  const handleAddBlog = async (blog) => {
    if (!currentUser) {
      alert("Debes estar autenticado para añadir un blog.");
      return;
    }

    try {
      let imageUrl = "";
      if (blog.image) {
        imageUrl = await uploadImage(
          blog.image,
          "unimetours-fotos",
          `blog-images/${currentUser.uid}`
        );
      }

      const blogData = {
        title: blog.title,
        description: blog.description,
        image: imageUrl,
        userId: currentUser.uid,
        createdAt: new Date(),
      };

      await addDoc(collection(db, "blogs"), blogData);
      setView("main");
    } catch (error) {
      console.error("Error:", error);
      alert(`Error al guardar: ${error.message}`);
    }
  };

  const handleDeleteBlog = async (blogId) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este blog?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "blogs", blogId));
    } catch (error) {
      console.error("Error eliminando el blog:", error);
      alert("Error al eliminar el blog.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F5F5]">
      <div className="flex-grow px-4 py-12">
        {view === "addBlog" && <AddBlog onBack={() => setView("main")} onAddBlog={handleAddBlog} />}

        {view === "main" && (
          <div className="max-w-5xl mx-auto">
            {blogs?.length > 0 ? (
              blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="relative flex flex-col md:flex-row items-center bg-[#D4D9D8] border-2 border-[#143A27] rounded-xl shadow-lg overflow-hidden mb-8 transition-all duration-300"
                >
                  {/* Botón eliminar en la esquina superior derecha */}
                  {currentUser && currentUser.uid === blog.userId && (
                    <button
                      className="absolute top-3 right-3 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition duration-300"
                      onClick={() => handleDeleteBlog(blog.id)}
                    >
                      <X size={20} />
                    </button>
                  )}

                  {blog.isUploading ? (
                    <div className="w-full md:w-[40%] h-48 bg-gray-200 animate-pulse"></div>
                  ) : (
                    <img
                      src={blog.image || "/placeholder-image.jpg"}
                      alt={blog.title}
                      className="w-full md:w-[40%] h-48 object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                      }}
                    />
                  )}

                  <div className="p-6 md:w-[60%]">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#143A27] mb-4">
                      {blog.title}
                    </h2>
                    <p className="text-base md:text-lg font-light text-[#143A27] mb-4">
                      {expandedBlog === blog.id
                        ? blog.description
                        : `${blog.description.substring(0, 150)}...`}
                    </p>
                    <button
                      className="text-[#143A27] font-semibold underline hover:text-gray-600"
                      onClick={() =>
                        setExpandedBlog(expandedBlog === blog.id ? null : blog.id)
                      }
                    >
                      {expandedBlog === blog.id ? "Ver menos" : "Ver más"}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-[#143A27] text-xl">No hay blogs disponibles</p>
              </div>
            )}

            <div className="flex justify-center gap-6 mt-8">
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
