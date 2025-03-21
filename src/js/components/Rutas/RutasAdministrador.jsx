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
  user
}) => {
  const [previewImage, setPreviewImage] = useState("");

  const handleAddImage = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setPreviewImage(previewUrl);

    try {
      const publicUrl = await uploadImage(file, "unimetours-fotos", "rutas");
      if (!publicUrl) throw new Error("No se pudo obtener la URL pública de la imagen.");
      
      handleChange({ target: { name: "imagen", value: publicUrl } });
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    }
  };

  const handleAgregarRutaClick = () => {
    agregarRuta();
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-6 space-y-8">
        {/* Título principal */}
        <h1 className="text-center text-3xl font-bold mb-6">Administrar Rutas</h1>

        {/* Formulario */}
        <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg border-4 border-[#143A27]">
          {/* Área para añadir imagen (ocupa dos columnas) */}
          <div className="mb-6">
            <div className="w-full">
              <div className="flex items-center justify-center bg-gray-300 border-4 border-[#143A27] rounded-lg shadow-md h-40 cursor-pointer">
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

          {/* Formulario dividido en dos columnas */}
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </form>

          {/* Botón de agregar ruta */}
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={handleAgregarRutaClick}
              className="bg-[#143A27] text-white font-semibold py-2 px-6 rounded-lg hover:bg-[#96A89C] transition duration-300"
            >
              Agregar Ruta
            </button>
          </div>
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
