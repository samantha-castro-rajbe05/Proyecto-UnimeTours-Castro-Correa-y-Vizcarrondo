import React from "react";


export const RutasAdministrador = ({ rutas, agregarRuta, eliminarRuta, nuevaRuta, handleChange, guias }) => {
    return (
        <div>
            {/* Formulario para agregar nuevas rutas */}
            <div>
                <form>
                    <input type="text" name="nombre" value={nuevaRuta.nombre} onChange={handleChange} placeholder="Nombre" />
                    <input type="text" name="imagen" value={nuevaRuta.imagen} onChange={handleChange} placeholder="Imagen" />
                    <input type="text" name="tiempo" value={nuevaRuta.tiempo} onChange={handleChange} placeholder="Tiempo" />
                    <input type="text" name="dificultad" value={nuevaRuta.dificultad} onChange={handleChange} placeholder="Dificultad" />
                    <input type="text" name="altura" value={nuevaRuta.altura} onChange={handleChange} placeholder="Altura" />
                    <input type="text" name="distancia" value={nuevaRuta.distancia} onChange={handleChange} placeholder="Distancia" />
                    <input type="text" name="descripcion" value={nuevaRuta.descripcion} onChange={handleChange} placeholder="Descripción" />
                    <input type="text" name="monto" value={nuevaRuta.monto} onChange={handleChange} placeholder="Monto" />
                    <input type="date" name="fecha" value={nuevaRuta.fecha} onChange={handleChange} placeholder="Fecha" />
                    <select name="guia" value={nuevaRuta.guia} onChange={handleChange}>
                        <option value="">Seleccionar guía</option>
                        {guias.map((guia, index) => (
                            <option key={index} value={guia.nombre}>{guia.nombre}</option>
                        ))}
                    </select>
                    <button type="button" onClick={agregarRuta} className="bg-[#143A27]  text-white font-semibold py-2 px-6 rounded-lg hover:bg-[#96A89C] transition duration-300 mt-4">Agregar Ruta</button>
                </form>
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