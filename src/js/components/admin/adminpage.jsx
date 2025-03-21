import React from "react";


const AdminPage = () => {
  let [role, setRole] = useState("usuario");
  if (role === "admin") {
  return (
    <div className="min-h-screen bg-[#F5F5F5] px-10 py-10">
      <h1 className="text-4xl font-bold text-[#143A27] text-center mb-10">
        Panel de Administración
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Gestión de usuarios */}
        <div className="bg-[#D4D9D8] border-4 border-[#143A27] rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-[#143A27] mb-4">
            Gestión de Usuarios
          </h2>
          <p className="text-base font-light text-[#143A27] mb-4">
            Administra los usuarios registrados en la plataforma.
          </p>
          <button className="bg-[#143A27] text-white py-2 px-6 rounded-lg hover:bg-[#96A89C] transition duration-300">
            Ver Usuarios
          </button>
        </div>

        {/* Gestión de rutas */}
        <div className="bg-[#D4D9D8] border-4 border-[#143A27] rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-[#143A27] mb-4">
            Gestión de Rutas
          </h2>
          <p className="text-base font-light text-[#143A27] mb-4">
            Administra las rutas disponibles para los usuarios.
          </p>
          <button className="bg-[#143A27] text-white py-2 px-6 rounded-lg hover:bg-[#96A89C] transition duration-300">
            Ver Rutas
          </button>
        </div>

        {/* Gestión de blogs */}
        <div className="bg-[#D4D9D8] border-4 border-[#143A27] rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-[#143A27] mb-4">
            Gestión de Blogs
          </h2>
          <p className="text-base font-light text-[#143A27] mb-4">
            Administra las publicaciones de blogs realizadas por los usuarios.
          </p>
          <button className="bg-[#143A27] text-white py-2 px-6 rounded-lg hover:bg-[#96A89C] transition duration-300">
            Ver Blogs
          </button>
        </div>

        {/* Gestión de feedback */}
        <div className="bg-[#D4D9D8] border-4 border-[#143A27] rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-[#143A27] mb-4">
            Gestión de Feedback
          </h2>
          <p className="text-base font-light text-[#143A27] mb-4">
            Revisa y administra los comentarios y feedbacks de los usuarios.
          </p>
          <button className="bg-[#143A27] text-white py-2 px-6 rounded-lg hover:bg-[#96A89C] transition duration-300">
            Ver Feedback
          </button>
        </div>
      </div>
    </div>
  );
};
}

export default AdminPage;