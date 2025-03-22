import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const Exitosa = () => {
    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate("/");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
                <FaCheckCircle className="text-green-500 text-6xl mb-4" />
                <h1 className="text-3xl font-bold mb-4">Pago Exitoso</h1>
                <p className="text-lg mb-6">¡Tu pago se ha procesado correctamente!</p>
                <button
                    onClick={handleBackToHome}
                    className="bg-[#143A27] text-white font-semibold py-2 px-4 rounded hover:bg-[#96A89C] transition duration-300"
                >
                    Volver al Inicio
                </button>
            </div>
        </div>
    );
};

export default Exitosa;
