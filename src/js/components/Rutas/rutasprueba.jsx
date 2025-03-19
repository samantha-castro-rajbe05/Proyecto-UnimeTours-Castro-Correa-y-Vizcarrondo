import React, { useState } from "react";

// Componente para la vista del cliente
const RutasCliente = ({ rutas, reservarRuta }) => {
    return (
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
                            </ul>
                            <div className="text-center mt-3">
                                <button className="bg-[#96A89C] text-white font-semibold py-2 px-6 rounded-lg hover:bg-[#143A27] transition duration-300 mr-2" onClick={() => (window.location.href = "/verruta")}>
                                    Más información
                                </button>
                                <button className="bg-[#96A89C] text-white font-semibold py-2 px-6 rounded-lg hover:bg-[#143A27] transition duration-300" onClick={() => reservarRuta(index)}>
                                    Reservar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

// Componente para la vista del administrador
const RutasAdministrador = ({ rutas, agregarRuta, eliminarRuta, nuevaRuta, handleChange }) => {
    return (
        <div>
            {/* Formulario para agregar nuevas rutas */}
            <div className="mb-4">
                <input type="text" name="imagen" placeholder="URL de la imagen" value={nuevaRuta.imagen} onChange={handleChange} className="border p-2 mr-2" />
                <input type="text" name="tiempo" placeholder="Tiempo" value={nuevaRuta.tiempo} onChange={handleChange} className="border p-2 mr-2" />
                <input type="text" name="dificultad" placeholder="Dificultad" value={nuevaRuta.dificultad} onChange={handleChange} className="border p-2 mr-2" />
                <input type="text" name="altura" placeholder="Altura" value={nuevaRuta.altura} onChange={handleChange} className="border p-2 mr-2" />
                <input type="text" name="distancia" placeholder="Distancia" value={nuevaRuta.distancia} onChange={handleChange} className="border p-2 mr-2" />
                <input type="text" name="nombre" placeholder="Nombre de la ruta" value={nuevaRuta.nombre} onChange={handleChange} className="border p-2 mr-2" />
                <button onClick={agregarRuta} className="bg-[#96A89C] text-white font-semibold py-2 px-6 rounded-lg hover:bg-[#143A27] transition duration-300">
                    Agregar Ruta
                </button>
            </div>

            {/* Mapeo de las rutas para mostrar las tarjetas y el botón de eliminar */}
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
                                </ul>
                                <div className="text-center mt-3">
                                    <button className="bg-red-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-red-700 transition duration-300" onClick={() => eliminarRuta(index)}>
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Componente principal Rutas
const Rutas = ({ rol }) => {
    // Estado inicial para las rutas
    const [rutas, setRutas] = useState([
        {
            imagen: "image0.png",
            tiempo: "2-3 horas",
            dificultad: "moderada",
            altura: "1.500 m",
            distancia: "5-6 km",
            nombre: "Los Cujíes",
        },
    ]);

    // Estado para el formulario de nueva ruta
    const [nuevaRuta, setNuevaRuta] = useState({
        imagen: "",
        tiempo: "",
        dificultad: "",
        altura: "",
        distancia: "",
        nombre: "",
    });

    // Función para manejar cambios en el formulario
    const handleChange = (e) => {
        setNuevaRuta({ ...nuevaRuta, [e.target.name]: e.target.value });
    };

    // Función para agregar una nueva ruta
    const agregarRuta = () => {
        setRutas([...rutas, nuevaRuta]);
        setNuevaRuta({
            nombre: "",
            imagen: "",
            tiempo: "",
            dificultad: "",
            altura: "",
            distancia: "",
            decripcion:"",
        }); // Limpiar el formulario
    };

    // Función para eliminar una ruta
    const eliminarRuta = (index) => {
        const nuevasRutas = rutas.filter((_, i) => i !== index);
        setRutas(nuevasRutas);
    };

    // Función para simular la reserva de una ruta
    const reservarRuta = (index) => {
        alert(`Ruta "${rutas[index].nombre}" reservada.`);
        // Aquí iría la lógica para manejar la reserva (por ejemplo, una llamada a una API)
    };

    // Renderizar la vista correspondiente según el rol del usuario
    if (rol === "cliente") {
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
                    <h3 className="text-3xl font-bold mb-4">Vista del Cliente</h3>
                    <RutasCliente rutas={rutas} reservarRuta={reservarRuta} />
                </section>
            </div>
        );
    } else if (rol === "administrador") {
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
                    <h3 className="text-3xl font-bold mb-4">Vista del Admin</h3>
                    <RutasAdministrador rutas={rutas}
                    agregarRuta={agregarRuta}
                    eliminarRuta={eliminarRuta}
                    nuevaRuta={nuevaRuta}
                    handleChange={handleChange} />
                </section>
            </div>
        )
    }
}