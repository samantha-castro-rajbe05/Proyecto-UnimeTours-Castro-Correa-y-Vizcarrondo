import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig"; // Ajusta la ruta según tu proyecto

const RutaInfo = () => {
  const { id } = useParams(); // Se espera que la URL tenga el formato: /ruta/:id
  const [ruta, setRuta] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRuta = async () => {
      try {
        const rutaRef = doc(db, "rutas", id);
        const rutaSnap = await getDoc(rutaRef);
        if (rutaSnap.exists()) {
          setRuta(rutaSnap.data());
        } else {
          console.error("No se encontró la ruta con el id:", id);
        }
      } catch (error) {
        console.error("Error al obtener la ruta:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRuta();
  }, [id]);

  if (loading) return <div className="p-6 text-center">Cargando...</div>;
  if (!ruta) return <div className="p-6 text-center">Ruta no encontrada.</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
        {/* Imagen de la ruta en la parte izquierda */}
        <div className="md:w-1/2">
          <img
            src={ruta.imagen}
            alt={ruta.nombre}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Información completa en la parte derecha */}
        <div className="md:w-1/2 p-6 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-[#143A27] mb-4">
            {ruta.nombre}
          </h1>
          <p className="mb-2">
            <strong>Dificultad:</strong> {ruta.dificultad}
          </p>
          <p className="mb-2">
            <strong>Altura:</strong> {ruta.altura}
          </p>
          <p className="mb-2">
            <strong>Tiempo:</strong> {ruta.tiempo}
          </p>
          <p className="mb-2">
            <strong>Descripción:</strong> {ruta.descripcion}
          </p>
          <p className="mb-2">
            <strong>Monto:</strong> ${ruta.monto}
          </p>
          <p className="mb-2">
            <strong>Fecha:</strong> {ruta.fecha}
          </p>
          <p className="mb-2">
            <strong>Guía:</strong> {ruta.guia}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RutaInfo;
