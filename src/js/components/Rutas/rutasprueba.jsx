import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"; // Importa useSearchParams
import { db, auth } from "../../firebaseConfig.js";
import {
  doc,
  getDocs,
  addDoc,
  collection,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import RutaInfo from "./ruta.jsx"; 
import { RutasAdministrador } from "./RutasAdministrador.jsx";
import BuscarRuta from "../buscarRutas/buscar-rutas.jsx";

const Rutas = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  // Leemos el query parameter "q". Si no existe, se usa cadena vacía.
  const queryParam = searchParams.get("q") || "";

  const [user, loadingAuth] = useAuthState(auth);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [rutas, setRutas] = useState([]);

  // Estado para el formulario de nueva ruta (se conserva sin cambios)
  const [nuevaRuta, setNuevaRuta] = useState({
    imagen: "",
    tiempo: "",
    dificultad: "",
    altura: "",
    distancia: "",
    nombre: "",
    monto: "",
    descripcion: "",
  });

  const [guias, setGuias] = useState([]);

  // Función para manejar los cambios en el formulario
  const handleChange = (e) => {
    setNuevaRuta({ ...nuevaRuta, [e.target.name]: e.target.value });
  };

  // Función para agregar una nueva ruta
  async function agregarRuta() {
    const docRef = await addDoc(collection(db, "rutas"), {
      nombre: nuevaRuta.nombre,
      imagen: nuevaRuta.imagen,
      tiempo: nuevaRuta.tiempo,
      dificultad: nuevaRuta.dificultad,
      altura: nuevaRuta.distancia, // Notar que en Firestore la propiedad "altura" viene en este caso de "nuevaRuta.distancia"
      descripcion: nuevaRuta.descripcion,
      monto: nuevaRuta.monto,
      fecha: nuevaRuta.fecha,
      guia: nuevaRuta.guia,
    });
    setRutas([...rutas, { ...nuevaRuta, docId: docRef.id }]);
    setNuevaRuta({
      nombre: "",
      imagen: "",
      tiempo: "",
      dificultad: "",
      altura: "",
      distancia: "",
      descripcion: "",
      monto: "",
      fecha: "",
      guia: "",
    }); // Limpiar el formulario
  }

  // Función para eliminar una ruta
  const eliminarRuta = async (index) => {
    const ruta = rutas[index];
    if (ruta.docId) {
      await deleteDoc(doc(db, "rutas", ruta.docId));
      const nuevasRutas = rutas.filter((_, i) => i !== index);
      setRutas(nuevasRutas);
    }
  };

  // Función para simular la reserva de una ruta
  const reservarRuta = (index, e) => {
    // Evitamos que el onClick de la tarjeta se dispare cuando se presiona el botón
    e.stopPropagation();
    if (rutas && rutas[index]) {
      const rutaSeleccionada = rutas[index];
      localStorage.setItem("rutaSeleccionada", JSON.stringify(rutaSeleccionada));
      navigate("/paypal");
    } else {
      console.error("Error: Ruta no encontrada.");
    }
  };

  /* Función para obtener las rutas asignadas si el usuario es guía. Se filtra por el nombre del guía */
  const fetchRutasParaGuia = async (nombreGuia) => {
    try {
      const rutasRef = collection(db, "rutas");
      const q = query(rutasRef, where("guia", "==", nombreGuia));
      const querySnapshot = await getDocs(q);
      const rutasFiltradas = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        docId: doc.id,
      }));
      setRutas(rutasFiltradas);
    } catch (error) {
      console.error("Error al obtener las rutas del guía:", error);
    }
  };

  // Función para obtener todas las rutas (para admin y usuario)
  const fetchRutas = async () => {
    const rutasCollection = collection(db, "rutas");
    const rutasSnapshot = await getDocs(rutasCollection);
    const rutasList = rutasSnapshot.docs.map((doc) => ({
      ...doc.data(),
      docId: doc.id,
    }));
    setRutas(rutasList);
  };

  // Función para obtener los guías desde Firestore
  const fetchGuias = async () => {
    const usersCollection = collection(db, "users");
    const usersSnapshot = await getDocs(usersCollection);
    const guiasList = usersSnapshot.docs
      .map((doc) => doc.data())
      .filter((user) => user.role === "guia");
    setGuias(guiasList);
  };

  // Función para obtener el rol del usuario desde Firestore
  const fetchUserRole = async (uid) => {
    const q = query(collection(db, "users"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
      setRole(userData.role || "usuario");

      if (userData.role === "guia") {
        fetchRutasParaGuia(userData.nombre);
      } else {
        fetchRutas();
      }
    } else {
      setRole("usuario");
      fetchRutas();
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      fetchUserRole(user.uid);
    } else {
      setLoading(false);
    }
    fetchGuias();
  }, [user]);

  if (loading || loadingAuth) {
    return <div>Cargando...</div>;
  }

  // Renderizado para el rol "usuario"
  if (role === "usuario") {
    return (
      <div>
        <section>
          <div
            className="font-serif relative h-[450px] bg-cover bg-center "
            style={{ backgroundImage: "url('/UnimeTours-landing-page.jpg')" }} 
          >
            <div className="absolute top-10 left-10 z-50">
              <BuscarRuta />
            </div>
            <div className="relative z-10 flex justify-center items-center h-full pt-28">
              <h2 className="text-7xl text-white font-bold font-serif montserrat">
                VER RUTAS
              </h2>
            </div>
          </div>
          <section>
            <h2 className="text-5xl text-[#143A27] font-bold font-serif roboto pt-10 pb-10 text-center">
              Senderismo
            </h2>
          </section>
        </section>
        <section>
          <div className="flex flex-wrap gap-4 justify-center pb-20">
            {rutas.map((ruta, index) => {
              // Se determina si la ruta debe resaltarse según el queryParam
              const highlight =
                queryParam &&
                ruta.nombre.toLowerCase().includes(queryParam.toLowerCase());
              return (
                <div
                  key={ruta.docId}
                  className={`card bg-[#D4D9D8] shadow-md rounded-lg p-4 w-80 transform transition-all duration-300 hover:scale-105 cursor-pointer ${
                    highlight ? "border-4 border-[#143A27]" : ""
                  }`}
                  
                >
                  <img
                    className="image w-full h-40 object-cover rounded-t-lg"
                    src={ruta.imagen}
                    alt={ruta.nombre}
                  />
                  <div className="body p-4">
                    <div className="text">
                      <h3 className="text-2xl font-bold font-serif roboto-parrafos text-[#143A27] mb-2">
                        {ruta.nombre}
                      </h3>
                      <ul className="details-list font-light font-serif roboto-parrafos text-sm text-[#143A27] mb-4">
                        <li>Dificultad: {ruta.dificultad}</li>
                        <li>Altura: {ruta.altura}</li>
                        <li>Distancia: {ruta.distancia}</li>
                        <li>Tiempo: {ruta.tiempo}</li>
                        <li>Descripción: {ruta.descripcion}</li>
                        <li>Monto: ${ruta.monto}</li>
                        <li>Fecha: {ruta.fecha}</li>
                      </ul>
                      <div className="text-center mt-3">
                        <button
                          className="bg-[#96A89C] text-white font-semibold py-2 px-6 rounded-lg hover:bg-[#143A27] transition duration-300"
                          onClick={(e) => reservarRuta(index, e)}
                        >
                          Reservar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
  })}
          </div>
        </section>
      </div>
    );
  } else if (role === "admin") {
    return (
      <div>
        <section>
          <div
            className="font-serif relative h-[450px] bg-cover bg-center"
            style={{ backgroundImage: "url('/UnimeTours-landing-page.jpg')" }}
          >
            <div className="relative z-10 flex justify-center items-center h-full pt-28">
              <h2 className="text-7xl text-white font-bold font-serif montserrat">
                CREAR RUTAS
              </h2>
            </div>
          </div>
          <section>
            <h2 className="text-5xl text-[#143A27] font-bold font-serif roboto pt-10 pb-10">
              Senderismo
            </h2>
          </section>
        </section>
        <section>
          <RutasAdministrador
            rutas={rutas}
            agregarRuta={agregarRuta}
            eliminarRuta={eliminarRuta}
            nuevaRuta={nuevaRuta}
            handleChange={handleChange}
            guias={guias}
          />
        </section>
      </div>
    );
  } else if (role === "guia") {
    // Agregado: Bloque de renderizado para el rol "guia". Aquí se muestran solo
    // las rutas asignadas al guía (filtradas en fetchRutasParaGuia).
    return (
      <div >
        <section>
          <div
            className="font-serif relative h-[450px] bg-cover bg-center"
            style={{ backgroundImage: "url('/UnimeTours-landing-page.jpg')" }}
          >
            <div className="absolute top-10 left-10 z-50">
                        <BuscarRuta />
            </div>
            <div className="relative z-10 flex justify-center items-center h-full pt-28">
              <h2 className="text-7xl text-white font-bold font-serif montserrat">
                TUS RUTAS ASIGNADAS
              </h2>
            </div>
          </div>
          <section className="text-center">
            <h2 className="text-5xl text-[#143A27] font-bold font-serif roboto pt-10 pb-10">
              Ruta de Guía
            </h2>
          </section>
        </section>
        <section className="p-20">
          <h3 className="text-3xl font-bold mb-4">Lista de Rutas</h3>
          <div className="flex flex-wrap gap-4 pb-20">
            {rutas.map((ruta, index) => {
              const highlight =
              queryParam &&
              ruta.nombre.toLowerCase().includes(queryParam.toLowerCase());
            return (
                
              <div key={index} className={`card bg-[#D4D9D8] shadow-md rounded-lg p-4 w-80 transform transition-all duration-300 hover:scale-105 cursor-pointer ${
                highlight ? "border-4 border-[#143A27]" : ""
              }`}>
                <img
                  className="image w-full h-40 object-cover rounded-t-lg" 
                  
                  src={ruta.imagen}
                  alt={ruta.nombre}
                />
                <div className="body">
                  <div className="text">
                    <h3 className="text-2xl font-bold font-serif roboto-parrafos text-[#143A27] mb-2">
                      {ruta.nombre}
                    </h3>
                    <ul className="details-list font-light font-serif roboto-parrafos text-sm">
                      <li>Dificultad: {ruta.dificultad}</li>
                      <li>Altura: {ruta.altura}</li>
                      <li>Distancia: {ruta.distancia}</li>
                      <li>Tiempo: {ruta.tiempo}</li>
                      <li>Descripción: {ruta.descripcion}</li>
                      <li>Monto: ${ruta.monto}</li>
                      <li>Fecha: {ruta.fecha}</li>
                    </ul>
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        </section>
      </div>
    );
}
};

export default Rutas;
