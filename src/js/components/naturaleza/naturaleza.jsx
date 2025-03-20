import React from "react";
import Footer from "../footer.jsx"; // Importa el componente Footer

const Naturaleza = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#F5F5F5]">
      {/* Contenido principal con flex-grow para empujar el footer hacia abajo */}
      <div className="flex-grow px-10 py-10">
        <h1 className="text-4xl font-bold text-[#143A27] text-center mb-10">
          Naturaleza y Consejos
        </h1>

        {/* Contenedor de los cuadros */}
        <div className="flex flex-col gap-8">
          {/* Cuadro 1: Sabías que */}
          <div className="flex flex-col md:flex-row items-center bg-[#D4D9D8] border-4 border-[#143A27] rounded-lg shadow-md p-6">
            <div className="text-content md:w-full">
              <h2 className="text-2xl font-bold text-[#143A27] mb-4">
                Sabías que:
              </h2>
              <p className="text-base font-light text-[#143A27]">
                El Ávila alberga más de <strong>100 especies de orquídeas</strong> y{" "}
                <strong>200 especies de aves</strong>, como el colibrí pico espada (
                <em>Ensifera ensifera</em>) y el águila harpía. Entre los mamíferos
                destacan el venado caramerudo, el puma y el oso frontino (en peligro
                de extinción).
              </p>
            </div>
          </div>

          {/* Cuadro 2: Técnicas para terrenos difíciles */}
          <div className="flex flex-col md:flex-row items-center bg-[#D4D9D8] border-4 border-[#143A27] rounded-lg shadow-md p-6">
            <div className="text-content md:w-full">
              <h2 className="text-2xl font-bold text-[#143A27] mb-4">
                Técnicas para terrenos difíciles:
              </h2>
              <ul className="list-disc list-inside text-base font-light text-[#143A27]">
                <li>
                  <strong>Subidas pronunciadas:</strong> Camina en zigzag para
                  reducir el esfuerzo y apóyate en bastones de trekking.
                </li>
                <li>
                  <strong>Bajadas resbaladizas:</strong> Flexiona las rodillas,
                  mantén el centro de gravedad bajo y evita pisar hojas secas o
                  rocas sueltas.
                </li>
                <li>
                  <strong>Cruces de quebradas:</strong> Si el agua supera tus
                  rodillas, busca otro camino. La corriente puede arrastrarte incluso
                  en zonas poco profundas.
                </li>
              </ul>
            </div>
          </div>

          {/* Cuadro 3: Tips importantes */}
          <div className="flex flex-col md:flex-row items-center bg-[#D4D9D8] border-4 border-[#143A27] rounded-lg shadow-md p-6">
            <div className="text-content md:w-full">
              <h2 className="text-2xl font-bold text-[#143A27] mb-4">
                Tips importantes:
              </h2>
              <ul className="list-disc list-inside text-base font-light text-[#143A27]">
                <li>
                  <strong>Abejas africanizadas:</strong> Si te atacan, corre en línea
                  recta y cúbrete la cabeza. No te metas al agua (te seguirán).
                </li>
                <li>
                  <strong>Plantas urticantes:</strong> Evita el{" "}
                  <em>palo de picar</em> (<em>Dendrocnide moroides</em>) y la{" "}
                  <em>ortiga brava</em> (<em>Urera baccifera</em>). Lleva crema
                  antihistamínica.
                </li>
                <li>
                  <strong>Serpientes:</strong> La mayoría son tímidas, pero revisa
                  dónde pisas o te sientas. En caso de mordedura, inmoviliza la
                  extremidad y busca ayuda.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default Naturaleza;
