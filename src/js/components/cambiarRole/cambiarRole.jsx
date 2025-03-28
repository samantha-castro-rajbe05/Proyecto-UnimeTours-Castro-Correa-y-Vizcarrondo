import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; // Ajusta la ruta según tu proyecto
import { useNavigate } from 'react-router-dom';

const RoleSwitcher = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Función para obtener todos los usuarios de la colección "users"
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersData = querySnapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));
        console.log("Usuarios obtenidos:", usersData);
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  // Función para alternar el rol del usuario
  const toggleUserRole = async (userId, currentRole) => {
    const userDocRef = doc(db, "users", userId);
    // Forzamos la comparación a minúsculas para evitar inconvenientes
    const roleLower = currentRole.toLowerCase();
    const newRole = roleLower === "usuario" ? "guia" : "usuario";
    try {
      // Actualiza el campo "role" en Firestore
      await updateDoc(userDocRef, { role: newRole });
      console.log(`Usuario ${userId} actualizado a rol: ${newRole}`);
      // Actualiza también el estado local para reflejar el cambio (lo que mueve al usuario de columna)
      setUsers(prevUsers =>
        prevUsers.map(u =>
          u.id === userId ? { ...u, role: newRole } : u
        )
      );
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  if (loading) {
    return <div className="text-center mt-4">Cargando usuarios...</div>;
  }

  // Se filtran los usuarios según su rol (usando toLowerCase() para que coincida sin importar mayúsculas)
  const usuarios = users.filter((u) => u.role && u.role.toLowerCase() === "usuario");
  const guias = users.filter((u) => u.role && u.role.toLowerCase() === "guia");

  return (
    <div className="w-full min-h-screen p-4 bg-[#aac1b2]">
      <h2 className="text-7xl font-bold mb-20 mt-10 font-serif montserrat text-center text-[#143A27]">Usuarios y Guías</h2>
      <div className="flex gap-8">
        {/* Columna para Usuarios */}
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-4 text-center">Usuarios</h3>
          <div className="space-y-4 bg-">
            {usuarios.map((userData) => (
              <div
                key={userData.id}
                className="p-4 border rounded shadow flex justify-between items-center bg-[#c8d9cd]"
              >
                <div>
                  <p className="font-semibold">
                    {userData.nombre} {userData.apellido}
                  </p>
                  <p className="text-sm text-gray-600">{userData.email}</p>
                </div>
                <button
                  onClick={() => toggleUserRole(userData.id, userData.role)}
                  className="bg-[#143A27] hover:bg-[#4b835a] text-white font-bold py-1 px-3 rounded transition duration-300"
                >
                  Ascender a guía
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Columna para Guías */}
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-4 text-center">Guías</h3>
          <div className="space-y-4">
            {guias.map((userData) => (
              <div
                key={userData.id}
                className="p-4 border rounded shadow flex justify-between items-center bg-[#c8d9cd]"
              >
                <div>
                  <p className="font-semibold">
                    {userData.nombre} {userData.apellido}
                  </p>
                  <p className="text-sm text-gray-600">{userData.email}</p>
                </div>
                <button
                  onClick={() => toggleUserRole(userData.id, userData.role)}
                  className="bg-[#143A27] hover:bg-[#4b835a] text-white font-bold py-1 px-3 rounded transition duration-300"
                >
                  Devolver a cliente
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='w-full p-20 flex items-center justify-center' >
        <button 
        className='bg-[#143A27] hover:bg-[#4b835a] text-white font-bold py-1 px-3 rounded transition duration-300'
        onClick={() => navigate("/")}
        > 
            Volver a página principal
        </button>
      </div>
    </div>
  );
};

export default RoleSwitcher;
