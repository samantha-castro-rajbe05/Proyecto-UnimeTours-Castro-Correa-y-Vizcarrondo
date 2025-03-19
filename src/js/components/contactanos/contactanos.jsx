import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa"; 

const Contactanos = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
    alert("¡Gracias por contactarnos! Nos pondremos en contacto contigo pronto.");
    setFormData({ nombre: "", apellido: "", correo: "", mensaje: "" });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F5F5] px-4 py-12">
      <h1 className="text-4xl font-bold text-[#143A27] text-center mb-12">
        Contáctanos
      </h1>

      <div className="flex flex-wrap lg:flex-nowrap gap-12 max-w-5xl mx-auto">
        {/* Sección izquierda */}
        <div className="w-full lg:w-1/2 flex flex-col gap-8">
          {/* Cuadro de contacto */}
          <div className="bg-[#D4D9D8] border-2 border-[#143A27] rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-[#143A27] mb-6">
              Información de Contacto
            </h2>
            <div className="flex items-center gap-4 mb-4">
              <FaPhoneAlt className="text-xl text-[#143A27]" />
              <span className="text-lg text-[#143A27]">
                +58 424-123-4567
              </span>
            </div>
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-xl text-[#143A27]" />
              <span className="text-lg text-[#143A27]">
                unimettours@gmail.com
              </span>
            </div>
          </div>

          {/* Imagen del Ávila */}
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/3a/El_%C3%81vila_desde_Caracas.jpg"
              alt="El Ávila"
              className="w-full h-64 object-cover"
            />
          </div>
        </div>

        {/* Sección derecha */}
        <div className="w-full lg:w-1/2 bg-[#D4D9D8] border-2 border-[#143A27] rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#143A27] mb-6">
            Envíanos un mensaje
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row gap-6">
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full sm:w-1/2 p-3 border-2 border-[#143A27] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#96A89C]"
                required
              />
              <input
                type="text"
                name="apellido"
                placeholder="Apellido"
                value={formData.apellido}
                onChange={handleChange}
                className="w-full sm:w-1/2 p-3 border-2 border-[#143A27] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#96A89C]"
                required
              />
            </div>
            <input
              type="email"
              name="correo"
              placeholder="Correo electrónico"
              value={formData.correo}
              onChange={handleChange}
              className="w-full p-3 border-2 border-[#143A27] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#96A89C]"
              required
            />
            <textarea
              name="mensaje"
              placeholder="Escribe tu mensaje aquí..."
              value={formData.mensaje}
              onChange={handleChange}
              className="w-full p-3 border-2 border-[#143A27] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#96A89C]"
              rows="5"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-[#143A27] text-white font-semibold py-3 px-8 rounded-lg hover:bg-[#96A89C] transition duration-300"
            >
              Enviar mensaje
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contactanos;
