import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "/src/css/App.css";

export const App = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/");
    }, [navigate]);

    return (
        <div>
            <section> {/* imagen superior avila + titulo */}
                <div className="font-serif relative h-[450px] bg-cover bg-center" style={{ backgroundImage: "url('/UnimeTours-landing-page.jpg')" }}>
                    <div className="relative z-10 flex justify-center items-center h-full pt-28">
                        <h2 className="text-7xl text-white font-bold font-serif montserrat">UnimeTours</h2>
                    </div>
                </div>
            </section>
            <section>
                <div className="flex w-full">
                    <div>
                        <img src="/unimetours-logo-landing-page.png" className="w-full pl-10 py-15" alt="UnimeTours Logo"/>
                    </div>
                    <div className="w-1/2">
                        <h2 className="text-5xl font-semibold font-serif roboto-subtitulos text-[#143A27] px-15 pt-10 pb-5">Conócenos</h2>
                        <p className="font-light font-serif roboto-parrafos px-15 ">Somos UnimeTours, una página hecha por estudiantes de la Universidad Metropolitana que te permite seguir tu espíritu aventurero y facilitarte el reservar paseos de senderismo en el Parque Nacional Waraira Repano, mejor conocido como Cerro el Ávila, que se encuentra en Caracas, Venezuela.</p>
                        <p>wodjcdwcoiw</p>
                    </div>
                </div>
            </section>
        </div>
    );
};