import React, { useState } from "react";
import { FaCamera } from "react-icons/fa"; // Importa el ícono de cámara
import { uploadImage } from "../../supabaseConfig"; 

const Galeria = () => {
  const [images, setImages] = useState([]); // Estado para almacenar las imágenes

  
  const handleAddImage = async (event) => {
    const file = event.target.files[0];
    if (file) {
    try {
      // Llama a la función de Supabase para subir la imagen
      const publicUrl = await uploadImage(file, "unimetours-fotos", "galeria-images");
      
      // Actualiza el estado con la URL pública de la imagen subida
      const reader = new FileReader();
       reader.onload = (e) => {
      setImages([...images, publicUrl]);
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    }}
    // const file = event.target.files[0];
    // if (file) {
    //   const reader = new FileReader();
    //   reader.onload = (e) => {
    //     setImages([...images, e.target.result]); // Añade la nueva imagen al estado
    //   };
    //   reader.readAsDataURL(file);
   }   // }
  
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F5F5] px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-[#143A27] text-center mb-10">Galería</h1>

      {/* Contenedor de la galería responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* Cuadro para añadir imágenes */}
        <div className="flex items-center justify-center bg-gray-300 border-4 border-[#143A27] rounded-lg shadow-md h-40 cursor-pointer">
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

        {/* Cuadros para las imágenes */}
        {images.map((image, index) => (
          <div
            key={index}
            className="bg-[#D4D9D8] border-4 border-[#143A27] rounded-lg shadow-md h-40 overflow-hidden"
          >
            <img src={image} alt={`Imagen ${index + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}

        {/* Relleno para mantener la cuadrícula 3x3 */}
        {Array.from({ length: Math.max(0, 9 - images.length - 1) }).map((_, index) => (
          <div
            key={`placeholder-${index}`}
            className="bg-[#D4D9D8] border-4 border-[#143A27] rounded-lg shadow-md h-40"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Galeria;
