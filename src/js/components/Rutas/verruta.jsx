import React from "react";


export const VerRutas = ({imagen, titulo, tipoRuta, altura, distancia, dificultad, duracion, puntoInteres, queLlevar}) => {

    
        imagen= "image0.png";
        titulo= "Ruta los Cujies";
        tipoRuta= "Senderismo";
        altura= "1,500 m";
        distancia= "5-6 km";

    return (

        <div> 
            <section>
                <div className= " font-serif relative h-[450px] bg-cover bg-center" style = {{backgroundImage: "url('/UnimeTours-landing-page.jpg')"}}>
                    <div className= "relative z-10 flex justify-center items-center h-full pt-28">
                        <h2 className= "text-7xl text-white font-bold font-serif montserrat">RUTA</h2>
                    </div>
                </div>
            </section>

            <section> 

                <div className="info-ruta">
                    <div className="group-27" style={{ display: "flex", alignItems: "center" }}>
                    {/* Imagen */}
                    <div style={{ flex: "1", textAlign: "center" }}>
                        <img
                        className="cujies pl-50"
                        src={imagen}
                        alt={titulo}
                        style={{ maxWidth: "100%", height: "auto" }}
                        />
                    </div>

                    {/* Información */}
                    <div style={{ flex: "2", padding: "20px" }}>
                        <h2 className="ruta-de-los-cujies text-heading text-5x1 font-serif font-bold roboto-subtitulos text-[#143A27] ">{titulo}</h2>
                        <div className="info">
                        <p>
                            <strong>Tipo de ruta:</strong> {tipoRuta}
                        </p>
                        <p>
                            <strong>Altura:</strong>{altura} (aproximadamente)
                        </p>
                        <p>
                            <strong>Distancia:</strong> {distancia}
                        </p>
                        <p>
                            <strong>Dificultad:</strong> {dificultad}
                        </p>
                        <p>
                            <strong>Duración:</strong>{duracion}
                        </p>
                        <p>
                            <strong>Puntos de interés:</strong>
                            <ul> {puntoInteres}</ul>
                        </p>
                        <p>
                            <strong>Qué llevar:</strong>
                            <ul> {queLlevar}
                            </ul>
                        </p>
                        </div>
                    </div>
                    </div>
                </div>
            </section>

        </div>
    );


};