import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, query, orderBy,onSnapshot } from "firebase/firestore";
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
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      console.log('Usuario actual:', user);
      setCurrentUser(user);
    });
    
    const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
    const unsubscribeFirestore = onSnapshot(q, (snapshot) => {
      const blogsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log('Blogs desde Firestore:', blogsData); // ← Añadir esto
      setBlogs(blogsData);
    });
  
    return () => {
      unsubscribeAuth();
      unsubscribeFirestore();
    };
  }, []);
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setCurrentUser(user);
//     });
  
  
//     const fetchBlogs = async () => {
//       const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
//     const snapshot = await getDocs(q);
//     setBlogs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
//   };

//   fetchBlogs();
//   return () => unsubscribe();
// }, []);

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

          
            // Subir imagen a Supabase
            imageUrl = await uploadImage(
              blog.image,
              "unimetours-fotos",
              // `blog-images/${currentUser.uid}/${Date.now()}` // Mejor estructura de carpetas
              `blog-images/${currentUser.uid}`
            )};

            const blogData = {
              title: blog.title,
              description: blog.description,
              image: imageUrl,
              userId: currentUser.uid,
              createdAt: new Date() // Añade timestamp
            };
      
            // Añadir blog a Firestore
            const docRef = await addDoc(collection(db, "blogs"), blogData);
            
            // Actualizar estado
            setBlogs(prev => [{ 
              id: docRef.id, 
              ...blogData 
            }, ...prev]);
      
            setView("main");
      
          } catch (error) {
            console.error("Error:", error);
            alert(`Error al guardar: ${error.message}`);
          }
        };
            
            // Verificar URL
            // if (!imageUrl.startsWith('https://')) {
            //   throw new Error('URL de imagen inválida');
            // }
      //     } catch (error) {
      //       console.error('Error subiendo imagen:', error);
      //       alert('Error al subir la imagen: ' + error.message);
      //       return;
      //     }
      //     }


      // await setDoc(doc(db, "blogs", user.uid), {
      //   //const blogData = {
      //     title: blog.title,
      //     description: blog.description,
      //     image: imageUrl ,
      //     userId: userCredential.user.uid,
      //     createdAt: new Date() ,// Añade timestamp
      //     imageUrl: imageUrl || "",
      //   });

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

  //   const tempId = `temp-${Date.now()}`;
  //   setBlogs(prev => [{
  //     id: tempId,
  //     ...blogData,
  //     isUploading: true // Bandera para estado de carga
  //   }, ...prev]);

  //   const docRef = await addDoc(collection(db, "blogs"), blogData);
    
  //   // //actualizamos estado
  //   // setBlogs(prev => [{ 
  //   //   id: docRef.id, 
  //   //   ...blogData 
  //   // }, ...prev]);
  //   setBlogs(prev => prev.map(item => 
  //     item.id === tempId ? { ...item, id: docRef.id, isUploading: false } : item
  //   ));
  // } catch (error) {
  //   // Revertir en caso de error
  //   setBlogs(prev => prev.filter(item => item.id !== tempId));
  // }
  //   setView("main"); //Blog

  // //   } catch (error) {
  // //   console.error("Error:", error);
  // //   alert(`Error al guardar: ${error.message}`);
  // // }
  // };

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F5F5]">
      {/* Contenido principal */}
      <div className="flex-grow px-4 py-12">
        {view === "allBlogs" && <AllBlogs blogs={blogs} onBack={() => setView("main")} />}
        {view === "addBlog" && <AddBlog onBack={() => setView("main")} onAddBlog={handleAddBlog} />}

        {/* Vista principal */}
        {view === "main" && (
          <div className="max-w-5xl mx-auto">
            {blogs?.length > 0 ? (
              blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="flex flex-col md:flex-row items-center bg-[#D4D9D8] border-2 border-[#143A27] rounded-xl shadow-lg overflow-hidden mb-8 transition-all duration-300"
                >
                  {blog.isUploading ? (
                    <div className="w-full md:w-[40%] h-48 bg-gray-200 animate-pulse"></div>
                  ) : (
                    <img
                      src={blog.image || '/placeholder-image.jpg'}
                      alt={blog.title}
                      className="w-full md:w-[40%] h-48 object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        //e.target.src = 'https://via.placeholder.com/150'; // Proporciona una URL válida para la imagen de error
                      }}
                    />
                  )}
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
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-[#143A27] text-xl">No hay blogs disponibles</p>
              </div>
            )}
 

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

