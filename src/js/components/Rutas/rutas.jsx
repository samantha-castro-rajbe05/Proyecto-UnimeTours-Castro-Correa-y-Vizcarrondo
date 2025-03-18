import React from "react";


const Rutas = (imagen, tiempo, dificultad,altura, distancia, rutas) => {
  
            imagen= "image0.png";
            tiempo= "2-3 horas";
            dificultad= "moderada";
            altura= "1.500 m";
            distancia= "5-6 km";
            rutas= "Los Cujíes";
    
    
    

    return (
        <div>
            <section> {/* imagen superior avila + titulo */}
                <div className="font-serif relative h-[450px] bg-cover bg-center" style={{ backgroundImage: "url('/UnimeTours-landing-page.jpg')" }}>
                    <div className="relative z-10 flex justify-center items-center h-full pt-28">
                        <h2 className="text-7xl text-white font-bold font-serif montserrat">VER RUTAS</h2>
                    </div>
                </div>
            <section>
                <h2 className="text-5xl text-[#143A27] font-bold font-serif roboto pt-10 pb-10">Senderismo</h2>
            </section>
            
            </section>
                <div className="card bg-[#D4D9D8] shadow-md rounded-lg p-4 pl-30 pr-30">
                    <img className="image w-full h-40 object-cover rounded-t-lg" src={imagen} alt={rutas} />
                    <div className="body">
                        <div className="text">
                            <div className="text-2xl font-bold font-serif roboto-parrafos text-[#143A27] mb-2">{tiempo}</div>
                            <ul className="details-list font-light font-serif roboto-parrafos text-sm">
                                <li>Dificultad: {dificultad}</li>
                                <li>Altura: {altura}</li>
                                <li>Distancia: {distancia}</li>
                                <li>rutas: {rutas}</li>
                            </ul>
                            <div className="text-center mt-3">
                            <button className="bg-[#96A89C] text-white font-semibold py-2 px-6 rounded-lg hover:bg-[#143A27] transition duration-300" onClick={() => window.location.href = "/verruta"} >Más información</button>
                            </div>
                        </div>
                    </div>
                </div>
            <section>

            </section>
        </div>


    );


}
export default Rutas;