// BuscarRuta.jsx
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig.js";
import { useNavigate } from "react-router-dom";

const BuscarRuta = () => {
  const navigate = useNavigate();

  // Estado para el input de búsqueda
  const [searchQuery, setSearchQuery] = useState("");
  // Estado para guardar todas las rutas de Firestore
  const [routes, setRoutes] = useState([]);
  // Estado de carga para la consulta de rutas
  const [loading, setLoading] = useState(false);

  // Cargar todas las rutas desde Firestore al montar el componentea
  useEffect(() => {
    const fetchRoutes = async () => {
      setLoading(true);
      try {
        const rutasCollection = collection(db, "rutas");
        const rutasSnapshot = await getDocs(rutasCollection);
        const rutasList = rutasSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRoutes(rutasList);
      } catch (error) {
        console.error("Error al obtener las rutas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, []);

  // Filtrar rutas cuyo nombre contenga el texto buscado (sin distinguir mayúsculas)
  const filteredRoutes = routes.filter((ruta) =>
    ruta.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Al hacer click se navega a la página /rutas pasando la consulta (query string)
  const handleRouteClick = () => {
    navigate(`/rutas?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="relative pt-15">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="buscar ruta"
        className="bg-[#143A27] text-white p-2 rounded w-64 placeholder-[#cdcdcd] "
      />
      {searchQuery.trim() !== "" && !loading && (
        // El menú se posiciona justo debajo del input
        <div className="absolute top-full mt-2 w-full z-50">
          {filteredRoutes.length > 0 ? (
            <ul className="bg-white rounded shadow-lg max-h-60 overflow-y-auto">
              {filteredRoutes.map((ruta) => (
                <li
                  key={ruta.id}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleRouteClick()}
                >
                  {ruta.nombre}
                </li>
              ))}
            </ul>
          ) : (
            <div className="bg-white rounded shadow-lg p-2">
              No se encontraron rutas que contengan "{searchQuery}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BuscarRuta;
