import React from "react";
import reservarRuta from "./rutasprueba";

const VerRutas = ({
    imagen,
    titulo,
    altura,
    distancia,
    dificultad,
    duracion,
    descripcion,
    monto,
     
}) => {
    return (
        <div>
            <section>
                <div className="font-serif relative h-[450px] bg-cover bg-center" style={{ backgroundImage: "url('/UnimeTours-landing-page.jpg')" }}>
                    <div className="relative z-10 flex justify-center items-center h-full pt-28">
                        <h2 className="text-7xl text-white font-bold font-serif montserrat">RUTA</h2>
                    </div>
                </div>
            </section>

            <section>
                <div className="info-ruta">
                    <div className="group-27" style={{ display: "flex", alignItems: "center" }}>
                        <div style={{ flex: "1", textAlign: "center" }}>
                            <img
                                className="cujies pl-50"
                                src={imagen}
                                alt={titulo}
                                style={{ maxWidth: "100%", height: "auto" }}
                            />
                        </div>

                        <div style={{ flex: "2", padding: "20px" }}>
                            <img src={imagen} alt={titulo}/>
                            <h2 className="ruta-de-los-cujies text-heading text-5x1 font-serif font-bold roboto-subtitulos text-[#143A27] ">{titulo}</h2>
                            <div className="info">
                                <p>
                                    <strong>Altura:</strong> {altura} (aproximadamente)
                                </p>
                                <p>
                                    <strong>Distancia:</strong> {distancia}
                                </p>
                                <p>
                                    <strong>Dificultad:</strong> {dificultad}
                                </p>
                                <p>
                                    <strong>Duración:</strong> {duracion}
                                </p>
                                <p>
                                    <strong>Descripción:</strong> {descripcion}
                                </p>
                                <p>
                                    <strong>Monto:</strong>$ {monto}
                                </p>
                            </div>
                            <button className="bg-[#143A27] text-white font-semibold py-2 px-6 rounded-lg hover:bg-[#96A89C] transition duration-300" onClick={() => reservarRuta(index)}>
                                Reservar
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
export default VerRutas;