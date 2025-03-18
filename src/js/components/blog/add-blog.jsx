import React, { useState } from "react";

const AddBlog = ({ onBack }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null); // Estado para almacenar la imagen seleccionada

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío del formulario, como guardar el blog en una base de datos o actualizar el estado
    alert(`Nuevo blog añadido:\nTítulo: ${title}\nDescripción: ${description}\nImagen: ${image ? image.name : "No seleccionada"}`);
    onBack(); // Vuelve a la vista principal después de añadir el blog
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Almacena la imagen seleccionada en el estado
  };

  return (
    <div className="add-blog-page px-10 py-10 bg-[#F5F5F5]">
      <h1 className="text-4xl font-bold text-[#143A27] text-center mb-10">Añadir Nuevo Blog</h1>
      <form onSubmit={handleSubmit} className="bg-[#D4D9D8] p-8 rounded-lg shadow-lg border-4 border-[#143A27]">
        <div className="mb-6">
          <label className="block text-[#143A27] font-bold mb-2">Título</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Escribe el título del blog"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-[#143A27] font-bold mb-2">Descripción</label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Escribe la descripción del blog"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-6">
          <label className="block text-[#143A27] font-bold mb-2">Imagen</label>
          <input
            type="file"
            accept="image/*"
            className="w-full p-3 border border-gray-300 rounded-lg"
            onChange={handleImageChange}
          />
          {image && (
            <p className="text-sm text-[#143A27] mt-2">Imagen seleccionada: {image.name}</p>
          )}
        </div>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition duration-300"
            onClick={onBack}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-[#143A27] text-white py-2 px-6 rounded-lg hover:bg-[#96A89C] transition duration-300"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;

