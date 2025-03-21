import React, { useState } from "react";
import { FaCamera } from "react-icons/fa";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebaseConfig.js";
import { supabase, uploadImage, deleteImage } from "../../supabaseConfig.js";

export const RutasAdministrador = ({
  rutas,
  agregarRuta,
  eliminarRuta,
  nuevaRuta,
  handleChange,
  guias,
  user // Asegúrate de pasar el objeto usuario al componente
}) => {
  // Estado para almacenar la URL de vista previa de la imagen seleccionada
  const [previewImage, setPreviewImage] = useState("");

  // Función para manejar la selección y subida de la imagen
  const handleAddImage = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Genera una URL local de vista previa
    const previewUrl = URL.createObjectURL(file);
    setPreviewImage(previewUrl);
    console.log("Vista previa generada:", previewUrl);

    try {
      // Sube la imagen usando la función uploadImage (de tu supabaseConfig.js)
      // Se guarda en el bucket "unimetours-fotos" y en la carpeta "rutas"
      const publicUrl = await uploadImage(file, "unimetours-fotos", "rutas");
      console.log("URL pública obtenida:", publicUrl);
      if (!publicUrl)
        throw new Error("No se pudo obtener la URL pública de la imagen.");
      
      // Actualiza el campo "imagen" en el objeto de la ruta.
      // Usamos handleChange para simular un input change.
      // Si detectas que esto no actualiza el estado, considera usar directamente el setter de estado.
      handleChange({ target: { name: "imagen", value: publicUrl } });
      console.log("Se llamó a handleChange para actualizar imagen en nuevaRuta");

      // Para verificar, muestra el nuevo valor. (Recuerda que la actualización es asíncrona)
      console.log("Estado actual de nuevaRuta (antes de re-render):", {
        ...nuevaRuta,
        imagen: publicUrl,
      });

      // Opcional: Guarda la imagen en la colección "galeria" de Firestore
      await addDoc(collection(db, "galeria"), {
        imageUrl: publicUrl,
        uploadedAt: new Date(),
        userId: user?.uid || "defaultUser",
      });

      console.log("Imagen subida y guardada en Firestore con éxito:", publicUrl);
    } catch (error) {
      console.error("Error al subir la imagen o guardar en Firestore:", error);
    }
  };

  // Función para manejar el clic en "Agregar Ruta"
  const handleAgregarRutaClick = () => {
    console.log("Click en Agregar Ruta. Datos:", nuevaRuta);
    agregarRuta();
  };

  return (
    <div className="min-h-screen ">
        <div className="container mx-auto p-6 space-y-8">
      {/* Título */}
      <h1 className="text-center text-3xl font-bold mb-6">Administrar Rutas</h1>

      {/* Sección del formulario */}
      <div className="max-w-md mx-auto p-6 bg-white shadow rounded-lg">
        {/* Bloque para añadir imagen */}
        <div className="mb-4">
          <div className="w-full max-w-[300px] mx-auto">
            <div className="flex items-center justify-center bg-gray-300 border-4 border-[#143A27] rounded-lg shadow-md h-32 cursor-pointer">
              <label
                htmlFor="addImage"
                className="flex flex-col items-center justify-center cursor-pointer w-full h-full"
              >
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Imagen seleccionada"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <>
                    <FaCamera className="text-4xl text-[#143A27] mb-1" />
                    <span className="text-[#143A27] font-semibold">
                      Añadir Imagen
                    </span>
                  </>
                )}
              </label>
              <input
                id="addImage"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAddImage}
              />
            </div>
          </div>
        </div>

        {/* Formulario de datos */}
        <form className="flex flex-col space-y-4">
          <input
            className="border rounded px-3 py-2"
            type="text"
            name="nombre"
            value={nuevaRuta.nombre || ""}
            onChange={handleChange}
            placeholder="Nombre"
          />
          <input
            className="border rounded px-3 py-2"
            type="text"
            name="tiempo"
            value={nuevaRuta.tiempo || ""}
            onChange={handleChange}
            placeholder="Tiempo"
          />
          <input
            className="border rounded px-3 py-2"
            type="text"
            name="dificultad"
            value={nuevaRuta.dificultad || ""}
            onChange={handleChange}
            placeholder="Dificultad"
          />
          <input
            className="border rounded px-3 py-2"
            type="text"
            name="altura"
            value={nuevaRuta.altura || ""}
            onChange={handleChange}
            placeholder="Altura"
          />
          <input
            className="border rounded px-3 py-2"
            type="text"
            name="distancia"
            value={nuevaRuta.distancia || ""}
            onChange={handleChange}
            placeholder="Distancia"
          />
          <input
            className="border rounded px-3 py-2"
            type="text"
            name="descripcion"
            value={nuevaRuta.descripcion || ""}
            onChange={handleChange}
            placeholder="Descripción"
          />
          <input
            className="border rounded px-3 py-2"
            type="text"
            name="monto"
            value={nuevaRuta.monto || ""}
            onChange={handleChange}
            placeholder="Monto"
          />
          <input
            className="border rounded px-3 py-2"
            type="date"
            name="fecha"
            value={nuevaRuta.fecha || ""}
            onChange={handleChange}
          />
          <select
            className="border rounded px-3 py-2"
            name="guia"
            value={nuevaRuta.guia || ""}
            onChange={handleChange}
          >
            <option value="">Seleccionar guía</option>
            {guias.map((guia, index) => (
              <option key={index} value={guia.nombre}>
                {guia.nombre}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={handleAgregarRutaClick}
            className="bg-[#143A27] text-white font-semibold py-2 px-6 rounded-lg hover:bg-[#96A89C] transition duration-300 mx-auto"
          >
            Agregar Ruta
          </button>
        </form>
      </div>

      {/* Listado de rutas */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rutas.map((ruta, index) => (
          <div key={index} className="bg-[#D4D9D8] shadow-md rounded-lg p-4">
            {ruta.imagen ? (
              <img
                className="w-full h-40 object-cover rounded-t-lg"
                src={ruta.imagen}
                alt={ruta.nombre}
              />
            ) : (
              <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-t-lg">
                <span className="text-gray-500">Sin imagen</span>
              </div>
            )}
            <div className="p-2">
              <div className="text-xl font-bold text-[#143A27] mb-2">
                {ruta.tiempo}
              </div>
              <ul className="text-sm mb-2">
                <li>Dificultad: {ruta.dificultad}</li>
                <li>Altura: {ruta.altura}</li>
                <li>Distancia: {ruta.distancia}</li>
                <li>Ruta: {ruta.nombre}</li>
              </ul>
              <div className="text-center">
                <button
                  className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
                  onClick={() => eliminarRuta(index)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};
