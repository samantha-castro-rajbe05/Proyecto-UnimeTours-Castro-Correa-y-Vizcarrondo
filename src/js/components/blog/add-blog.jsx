import React, { useState } from "react";

const AddBlog = ({ onBack, onAddBlog }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState({ file: null, url: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("Texto vacío no permitido");
      return;
    }

    try {
      await onAddBlog({ title, description, image: image.file });
      setTitle("");
      setDescription("");
      setImage({ file: null, url: "" });
      onBack();
    } catch (error) {
      console.error("Error en formulario:", error);
      alert("Error al guardar el blog. Por favor, inténtalo de nuevo.");
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  return (
    <div className="add-blog-page px-10 py-10 bg-[#F5F5F5]">
      <h1 className="text-4xl font-bold text-[#143A27] text-center mb-10">
        Añadir Nuevo Blog
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-[#D4D9D8] p-8 rounded-lg shadow-lg border-4 border-[#143A27]"
      >
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
          <label className="block text-[#143A27] font-bold mb-2">
            Descripción
          </label>
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
            accept="image/png, image/jpg, image/jpeg"
            className="w-full p-3 border border-gray-300 rounded-lg"
            onChange={handleImageChange}
          />
          {image.file && (
            <p className="text-sm text-[#143A27] mt-2">
              Imagen seleccionada: {image.file.name}
            </p>
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