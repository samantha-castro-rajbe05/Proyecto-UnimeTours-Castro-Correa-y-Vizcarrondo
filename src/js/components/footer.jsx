import React from "react";

const Footer = () => {
  return (
    <div
        className="barra-abajo"
        style={{
            background: '#96A89C',
            borderRadius: '0px',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            padding: '20px',
            position: 'relative', // Para facilitar el posicionamiento absoluto
        }}
        >
        {/* Sección superior */}
        <div
            style={{
            display: 'flex',
            justifyContent: 'space-between', // Espaciado uniforme entre los elementos
            alignItems: 'center',
            marginBottom: '20px',
            }}
        >
            <div className="unime-tours-com text-2x0.5 font-bold font-serif roboto-parrafos text-[#D4D9D8] mb-2 pl-15">UnimeTours.com</div>
            <div className="inicio text-2x0.5 font-bold font-serif roboto-parrafos text-[#D4D9D8] mb-2" onClick= {() => window.location.href = "/"}>Inicio</div>
            <div className="cont-ctanos text-2x0.5 font-bold font-serif roboto-parrafos text-[#D4D9D8] mb-2">Contáctanos</div>
            <div className="unimetours-gmail-com text-2x0.5 font-bold font-serif roboto-parrafos text-[#D4D9D8] mb-2 pr-15">unimettours@gmail.com</div>
        </div>

        {/* Línea divisoria */}
        <hr style={{ border: '3px solid #D4D9D8', margin: 'pl-15 pr-15 ' }} />

        {/* Sección inferior */}
        <div
            style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between', // Para manejar las esquinas
            position: 'relative',
            }}
        >
            {/* Esquina inferior izquierda */}
            <div style={{ display: 'flex', gap: '5px' }}>
            <img className="facebook pl-15" src="facebook.png" alt="Facebook Logo" />
            <img className="phone-call" src="phonecall0.png" alt="Phone Call Icon" />
            </div>

            {/* Elemento central */}
            <img
            className="rectangle-54 pr-20"
            src="rectangle-540.png"
            alt="Rectangle Graphic"
            style={{
                margin: '0 auto', // Centrado
                maxWidth: '300px',
            }}
            />

            {/* Esquina inferior derecha */}
            <img
            className="captura-de-pantalla-2025-03-09-123734-removebg-preview-1-picaai pr-15"
            src="captura-de-pantalla-2025-03-09-123734-removebg-preview-1-picaai0.png"
            alt="Preview"
            style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                maxWidth: '200px',
            }}
            />
        </div>
    </div>
  );
};

export default Footer;
