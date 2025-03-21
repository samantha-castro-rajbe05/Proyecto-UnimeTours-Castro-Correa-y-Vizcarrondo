import React from "react";

export const RutasAdministrador = ({ rutas, agregarRuta, eliminarRuta, nuevaRuta, handleChange }) => {
    return (
        <div>
            {/* Formulario para agregar nuevas rutas */}
            <div className="mb-4 pl-7 pr-7">
                <input type="text" name="imagen" placeholder="URL de la imagen" value={nuevaRuta.imagen} onChange={handleChange} className="border p-2 mr-2" />
                <input type="text" name="tiempo" placeholder="Tiempo" value={nuevaRuta.tiempo} onChange={handleChange} className="border p-2 mr-2" />
                <input type="text" name="dificultad" placeholder="Dificultad" value={nuevaRuta.dificultad} onChange={handleChange} className="border p-2 mr-2" />
                <input type="text" name="altura" placeholder="Altura" value={nuevaRuta.altura} onChange={handleChange} className="border p-2 mr-2" />
                <input type="text" name="distancia" placeholder="Distancia" value={nuevaRuta.distancia} onChange={handleChange} className="border p-2 mr-2" />
                <input type="text" name="nombre" placeholder="Nombre de la ruta" value={nuevaRuta.nombre} onChange={handleChange} className="border p-2 mr-2" />
                <input type="text" name="descripcion" placeholder="Descripcion de la ruta" value={nuevaRuta.descripcion} onChange={handleChange} className="border p-2 mr-2" />
                <input type="text" name="monto" placeholder="Monto de la ruta" value={nuevaRuta.monto} onChange={handleChange} className="border p-2 mr-2" />
                <button onClick={agregarRuta} className="bg-[#96A89C] text-white font-semibold py-2 px-6 rounded-lg hover:bg-[#143A27] transition duration-300">
                    Agregar Ruta
                </button>
            </div>

            {/* Mapeo de las rutas para mostrar las tarjetas y el botón de eliminar */}
            <div className="flex flex-wrap gap-4 pl-15">
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