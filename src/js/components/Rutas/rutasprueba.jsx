import React, { useState, useEffect } from "react";
import { RutasAdministrador } from "./RutasAdministrador.jsx"; // Asegúrate de que la ruta sea correcta
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import {
    db,
  } from "../../firebaseConfig.js";
import { doc, setDoc, getDocs, addDoc, collection, deleteDoc} from "firebase/firestore";

const Rutas = ({ role }) => {
   const navigate = useNavigate(); // Inicializa useNavigate
    
    // Estado inicial para las rutas
    const [rutas, setRutas] = useState([   ]);

    // Estado para el formulario de nueva ruta
    const [nuevaRuta, setNuevaRuta] = useState({
        imagen: "",
        tiempo: "",
        dificultad: "",
        altura: "",
        distancia: "",
        nombre: "",
        monto:"",
        descripcion:"",

    });

    // Función para manejar cambios en el formulario
    const handleChange = (e) => {
        setNuevaRuta({ ...nuevaRuta, [e.target.name]: e.target.value });
    };

    // Función para agregar una nueva ruta
    async function agregarRuta() {
        
        const docRef =await addDoc(collection(db, "rutas"), {
            nombre: nuevaRuta.nombre,
            imagen: nuevaRuta.imagen,
            tiempo: nuevaRuta.tiempo,
            dificultad: nuevaRuta.dificultad,
            altura: nuevaRuta.distancia,
            descripcion: nuevaRuta.descripcion,
            monto: nuevaRuta.monto, // Guardar el rol seleccionado
          });
            setRutas([...rutas,{ ...nuevaRuta, docId: docRef.id}]);
            setNuevaRuta({
                nombre: "",
                imagen: "",
                tiempo: "",
                dificultad: "",
                altura: "",
                distancia: "",
                decripcion: "",
                monto:"",
        }); // Limpiar el formulario

        
    };

    

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
    const reservarRuta = (index) => {
        if (rutas && rutas[index]) {
            const rutaSeleccionada = rutas[index];
            // Almacena la ruta seleccionada en el estado o en el contexto (si usas Context API)
            // Para este ejemplo, usaremos localStorage para simplificar
            localStorage.setItem("rutaSeleccionada", JSON.stringify(rutaSeleccionada));
            navigate("/paypal"); // Navega al componente de PayPal
        } else {
            console.error("Error: Ruta no encontrada.");
        }
    };

    // Función para obtener las rutas desde Firestore
    const fetchRutas = async () => {
        const rutasCollection = collection(db, "rutas");
        const rutasSnapshot = await getDocs(rutasCollection);
        const rutasList = rutasSnapshot.docs.map(doc => ({ ...doc.data(), docId: doc.id}));
        setRutas(rutasList);
    };

    // useEffect para obtener las rutas cuando el componente se monta
    useEffect(() => {
        fetchRutas();
    }, []);

    // Renderizar la vista correspondiente según el rol del usuario

    if (role === "usuario") {

        return (
            <div>
                <section>
                    <div className="font-serif relative h-[450px] bg-cover bg-center" style={{ backgroundImage: "url('/UnimeTours-landing-page.jpg')" }}>
                        <div className="relative z-10 flex justify-center items-center h-full pt-28">
                            <h2 className="text-7xl text-white font-bold font-serif montserrat">VER RUTAS</h2>
                        </div>
                    </div>
                    <section>
                        <h2 className="text-5xl text-[#143A27] font-bold font-serif roboto pt-10 pb-10">Senderismo</h2>
                    </section>
                </section>
                <section>
                    <h3 className="text-3xl font-bold mb-4"></h3>
                    <div className="flex flex-wrap gap-4">
                        {rutas.map((ruta, index) => (
                            <div key={index} className="card bg-[#D4D9D8] shadow-md rounded-lg p-4 w-80">
                                <img className="image w-full h-40 object-cover rounded-t-lg" src={ruta.imagen} alt={ruta.nombre} />
                                <div className="body">
                                    <div className="text">
                                        <div className="text-2xl font-bold font-serif roboto-parrafos text-[#143A27] mb-2">{ruta.tiempo}</div>
                                        <ul className="details-list font-light font-serif roboto-parrafos text-sm">
                                            <li>Dificultad: {ruta.dificultad}</li>
                                            <li>Altura: {ruta.altura}</li>
                                            <li>Distancia: {ruta.distancia}</li>
                                            <li>Ruta: {ruta.nombre}</li>
                                            <li>Descripcion: {ruta.descripcion}</li>
                                            <li>Monto:$ {ruta.monto}</li>

                                        </ul>
                                        <div className="text-center mt-3">
                                          
                                            <button className="bg-[#96A89C] text-white font-semibold py-2 px-6 rounded-lg hover:bg-[#143A27] transition duration-300" onClick={() => reservarRuta(index)}>
                                                Reservar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        );
    } else if (role === "administrador") {
        return (
            <div>
                <section>
                    <div className="font-serif relative h-[450px] bg-cover bg-center" style={{ backgroundImage: "url('/UnimeTours-landing-page.jpg')" }}>
                        <div className="relative z-10 flex justify-center items-center h-full pt-28">
                            <h2 className="text-7xl text-white font-bold font-serif montserrat">CREAR RUTAS</h2>
                        </div>
                    </div>
                    <section>
                        <h2 className="text-5xl text-[#143A27] font-bold font-serif roboto pt-10 pb-10">Senderismo</h2>
                    </section>
                </section>
                <section>
                    <h3 className="text-3xl font-bold mb-4"></h3>
                    <RutasAdministrador
                        rutas={rutas}
                        agregarRuta={agregarRuta}
                        eliminarRuta={eliminarRuta}
                        nuevaRuta={nuevaRuta}
                        handleChange={handleChange}
                    />
                </section>
            </div>
        );
    }

};
export default Rutas;