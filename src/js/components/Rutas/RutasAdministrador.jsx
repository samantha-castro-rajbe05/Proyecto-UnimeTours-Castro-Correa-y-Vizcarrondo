import React, { useState } from "react";
import { FaCamera } from "react-icons/fa";
import { createClient } from "@supabase/supabase-js";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebaseConfig.js";

// Configuración del cliente de Supabase
const supabaseUrl = "https://your-project.supabase.co";
const supabaseAnonKey = "YOUR_SUPABASE_ANON_KEY";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Función auxiliar para subir una imagen a Supabase Storage.
 *
 * @param {File} file – El archivo de imagen a subir.
 * @param {string} bucket – El bucket en Supabase (en este caso, "unimetours-fotos").
 * @param {string} folder – La carpeta dentro del bucket (ahora "rutas").
 * @returns {string|null} – La URL pública de la imagen o null en caso de error.
 */
async function uploadImage(file, bucket, folder) {
  const fileExt = file.name.split(".").pop();
  const fileName = `${folder}/${Date.now()}.${fileExt}`;
  const { data, error } = await supabase.storage.from(bucket).upload(fileName, file);
  if (error) {
    console.error("Error al subir imagen:", error);
    return null;
  }
  const { publicURL, error: publicUrlError } = supabase.storage.from(bucket).getPublicUrl(data.path);
  if (publicUrlError) {
    console.error("Error al obtener la URL pública:", publicUrlError);
    return null;
  }
  return publicURL;
}

export const RutasAdministrador = ({
  rutas,
  agregarRuta,
  eliminarRuta,
  nuevaRuta,
  handleChange,
  guias,
  user // Asegúrate de pasar el objeto de usuario (user) al componente
}) => {
  // Estado para almacenar la URL de vista previa de la imagen seleccionada
  const [previewImage, setPreviewImage] = useState(null);

  // Función para manejar la selección y subida de la imagen
  const handleAddImage = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Crear una URL de vista previa para mostrar la imagen inmediatamente
    const previewUrl = URL.createObjectURL(file);
    setPreviewImage(previewUrl);

    try {
      // Subir la imagen a Supabase: se usa el bucket "unimetours-fotos" y la carpeta "rutas"
      const publicUrl = await uploadImage(file, "unimetours-fotos", "rutas");
      if (!publicUrl) 
        throw new Error("No se pudo obtener la URL pública de la imagen.");

      // Actualiza el campo "imagen" en el formulario.
      // Se simula un evento al llamar a handleChange.
      handleChange({ target: { name: "imagen", value: publicUrl } });

      // Opcional: Guardar la imagen en Firestore en la colección "galeria"
      await addDoc(collection(db, "galeria"), {
        imageUrl: publicUrl,
        uploadedAt: new Date(),
        userId: user?.uid || "defaultUser", // Asegúrate de tener definido el usuario
      });

      console.log("Imagen subida con éxito:", publicUrl);
    } catch (error) {
      console.error("Error al subir la imagen o guardar en Firestore:", error);
    }
  };

  // Función para manejar la acción de "Agregar Ruta"
  const handleAgregarRutaClick = () => {
    console.log("Click en Agregar Ruta. Datos:", nuevaRuta);
    agregarRuta();
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Título de la página */}
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
            value={nuevaRuta.nombre}
            onChange={handleChange}
            placeholder="Nombre"
          />
          <input
            className="border rounded px-3 py-2"
            type="text"
            name="tiempo"
            value={nuevaRuta.tiempo}
            onChange={handleChange}
            placeholder="Tiempo"
          />
          <input
            className="border rounded px-3 py-2"
            type="text"
            name="dificultad"
            value={nuevaRuta.dificultad}
            onChange={handleChange}
            placeholder="Dificultad"
          />
          <input
            className="border rounded px-3 py-2"
            type="text"
            name="altura"
            value={nuevaRuta.altura}
            onChange={handleChange}
            placeholder="Altura"
          />
          <input
            className="border rounded px-3 py-2"
            type="text"
            name="distancia"
            value={nuevaRuta.distancia}
            onChange={handleChange}
            placeholder="Distancia"
          />
          <input
            className="border rounded px-3 py-2"
            type="text"
            name="descripcion"
            value={nuevaRuta.descripcion}
            onChange={handleChange}
            placeholder="Descripción"
          />
          <input
            className="border rounded px-3 py-2"
            type="text"
            name="monto"
            value={nuevaRuta.monto}
            onChange={handleChange}
            placeholder="Monto"
          />
          <input
            className="border rounded px-3 py-2"
            type="date"
            name="fecha"
            value={nuevaRuta.fecha}
            onChange={handleChange}
          />
          <select
            className="border rounded px-3 py-2"
            name="guia"
            value={nuevaRuta.guia}
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

      {/* Sección de listado de rutas */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rutas.map((ruta, index) => (
          <div key={index} className="bg-[#D4D9D8] shadow-md rounded-lg p-4">
            <img
              className="w-full h-40 object-cover rounded-t-lg"
              src={ruta.imagen}
              alt={ruta.nombre}
            />
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
  );
};
