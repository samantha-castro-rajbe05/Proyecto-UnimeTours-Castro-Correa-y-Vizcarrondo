import React, { useState, useEffect } from "react";
import { FaCamera } from "react-icons/fa";
import { uploadImage, deleteImage } from "../../supabaseConfig"; // Importar la función para eliminar
import { db } from "../../firebaseConfig";
import { collection, addDoc, onSnapshot, doc, deleteDoc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebaseConfig";

const Galeria = () => {
  const [images, setImages] = useState([]); // Estado para almacenar las imágenes
  const [user] = useAuthState(auth); // Obtener el usuario autenticado
  const [role, setRole] = useState(""); // Estado para almacenar el rol del usuario
  
  // Obtener el rol del usuario (administrador o no)
  useEffect(() => {
    const fetchUserRole = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setRole(userDoc.data().role); // Asignar el rol al estado
        }
      }
    };
    fetchUserRole();
  }, [user]);

  // Cargar imágenes en tiempo real desde Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "galeria"), (snapshot) => {
      const imageList = snapshot.docs.map((doc) => ({ 
        id: doc.id, // Agregar el id del documento para poder eliminarlo
        ...doc.data() 
      }));
      setImages(imageList);
    });

    return () => unsubscribe();
  }, []);

  // Manejar la subida de imágenes
  const handleAddImage = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      // Subir imagen a Supabase y obtener la URL pública
      const publicUrl = await uploadImage(file, "unimetours-fotos", "galeria-images");
      if (!publicUrl) throw new Error("No se pudo obtener la URL pública de la imagen.");

      // Guardar la URL pública en Firestore en la colección "galeria"
      await addDoc(collection(db, "galeria"), {
        imageUrl: publicUrl,
        uploadedAt: new Date(),
        userId: user.uid,  // Almacenar el ID del usuario que sube la imagen
      });

      console.log("Imagen subida con éxito:", publicUrl);
    } catch (error) {
      console.error("Error al subir la imagen o guardar en Firestore:", error);
    }
  };

  // Eliminar imagen
  const handleDeleteImage = async (imageId, imageUserId, imageUrl) => {
    if (role === "admin" || user.uid === imageUserId) {
      try {
        // Obtener la ruta de la imagen en Supabase (la que se subió)
        const imagePath = imageUrl.split("unimetours-fotos")[1];

        // Eliminar imagen de Supabase
        await deleteImage(imagePath);

        // Eliminar imagen de Firestore
        await deleteDoc(doc(db, "galeria", imageId));

        console.log("Imagen eliminada con éxito");
      } catch (error) {
        console.error("Error al eliminar la imagen:", error);
      }
    } else {
      console.log("No tienes permiso para eliminar esta imagen");
    }
  };

  // Mostrar la galería para administradores o usuarios
  return (
    <div className="flex flex-col min-h-screen bg-[#F5F5F5] px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-[#143A27] text-center mb-10">Galería</h1>

      {/* Contenedor de la galería */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* Mostrar el botón de añadir imagen solo si no es administrador */}
        {role !== "admin" && (
          <div className="flex items-center justify-center bg-gray-300 border-4 border-[#143A27] rounded-lg shadow-md h-100 cursor-pointer">
            <label htmlFor="addImage" className="flex flex-col items-center justify-center cursor-pointer">
              <FaCamera className="text-4xl text-[#143A27] mb-2" />
              <span className="text-[#143A27] font-semibold">Añadir Imagen</span>
            </label>
            <input
              id="addImage"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAddImage}
            />
          </div>
        )}

        {/* Mostrar imágenes de Firestore */}
        {images.map((image, index) => (
          <div key={image.id} className="relative bg-[#D4D9D8] border-4 border-[#143A27] rounded-lg shadow-md h-100 overflow-hidden">
            <img src={image.imageUrl} alt={`Imagen ${index + 1}`} className="w-full h-full object-cover" />

            {/* Mostrar el botón de eliminar solo si es el propietario o el administrador */}
            {(role === "admin" || image.userId === user.uid) && (
              <button
                className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full"
                onClick={() => handleDeleteImage(image.id, image.userId, image.imageUrl)}
              >
                Eliminar
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Galeria;



// import React, { useState } from "react";
// import { FaCamera } from "react-icons/fa"; // Importa el ícono de cámara
// import { uploadImage } from "../../supabaseConfig"; 
// import { db } from "../../firebaseConfig"; // Importa Firestore
// import { collection, addDoc } from "firebase/firestore";

// const Galeria = () => {
//   const [images, setImages] = useState([]); // Estado para almacenar las imágenes

  
//   const handleAddImage = async (event) => {
//     const file = event.target.files[0]; // Obtenemos el archivo cargado por el usuario
//     if (file) {
//       try {
//         // Subir imagen a Supabase y obtener la URL pública
//         const publicUrl = await uploadImage(file, "unimetours-fotos", "galeria-images");
//         if (!publicUrl) {
//           throw new Error("No se pudo obtener la URL pública de la imagen.");
//         }

//         // Guardar la URL pública en Firestore en la colección "galeria"
//         await addDoc(collection(db, "galeria"), {
//           imageUrl: publicUrl, // URL pública de la imagen
//           uploadedAt: new Date(), // Timestamp del momento de la subida
//         });

//         // Actualizar el estado local con la nueva imagen
//         setImages((prevImages) => [...prevImages, publicUrl]);
//       } catch (error) {
//         console.error("Error al subir la imagen o guardar en Firestore:", error);
//       }
//     }
//   };

  
//     // const file = event.target.files[0];
//     // if (file) {
//     //   const reader = new FileReader();
//     //   reader.onload = (e) => {
//     //     setImages([...images, e.target.result]); // Añade la nueva imagen al estado
//     //   };
//     //   reader.readAsDataURL(file);
//     // }
  
  

//   return (
//     <div className="flex flex-col min-h-screen bg-[#F5F5F5] px-4 py-10">
//       <h1 className="text-3xl md:text-4xl font-bold text-[#143A27] text-center mb-10">Galería</h1>

//       {/* Contenedor de la galería responsive */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//         {/* Cuadro para añadir imágenes */}
//         <div className="flex items-center justify-center bg-gray-300 border-4 border-[#143A27] rounded-lg shadow-md h-40 cursor-pointer">
//           <label htmlFor="addImage" className="flex flex-col items-center justify-center cursor-pointer">
//             <FaCamera className="text-4xl text-[#143A27] mb-2" />
//             <span className="text-[#143A27] font-semibold">Añadir Imagen</span>
//           </label>
//           <input
//             id="addImage"
//             type="file"
//             accept="image/*"
//             className="hidden"
//             onChange={handleAddImage}
//           />
//         </div>

//         {/* Cuadros para las imágenes */}
//         {images.map((image, index) => (
//           <div
//             key={index}
//             className="bg-[#D4D9D8] border-4 border-[#143A27] rounded-lg shadow-md h-40 overflow-hidden"
//           >
//             <img src={image} alt={`Imagen ${index + 1}`} className="w-full h-full object-cover" />
//           </div>
//         ))}

//         {/* Relleno para mantener la cuadrícula 3x3 */}
//         {Array.from({ length: Math.max(0, 9 - images.length - 1) }).map((_, index) => (
//           <div
//             key={`placeholder-${index}`}
//             className="bg-[#D4D9D8] border-4 border-[#143A27] rounded-lg shadow-md h-40"
//           ></div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Galeria;
