// BotonPaypal.jsx
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar";
import Footer from "../footer"

const PaypalButtonComponent = () => {
    const navigate = useNavigate();

    // Obtener la ruta seleccionada desde localStorage
    const rutaSeleccionada = JSON.parse(localStorage.getItem("rutaSeleccionada"));

    // Si no hay ruta seleccionada, redirige o maneja el error
    if (!rutaSeleccionada) {
        navigate("/"); // Redirige a la página principal o maneja el error
        return null; // Evita que el componente se renderice
    }

    const initialOptions = {
        "client-id": "YOUR_CLIENT_ID",
        currency: "USD",
        intent: "capture",
    };

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: "5", // Puedes usar rutaSeleccionada.precio si tienes un precio
                    },
                    description: `Reserva de ruta: ${rutaSeleccionada.nombre}`, // Agrega una descripción
                },
            ],
        });
    };

    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
            const name = details.payer.name.given_name;
            console.log(name);
            console.log("");
            navigate("/exitosa");
            // Limpiar localStorage después del pago exitoso
            localStorage.removeItem("rutaSeleccionada");
        });
    };

    return (
        <div>
            <section>
                <Navbar/>
            </section>
                
            <section>
                <div className="font-serif relative h-[450px] bg-cover bg-center pb-10" style={{ backgroundImage: "url('/UnimeTours-landing-page.jpg')" }}>
                    <div className="relative z-10 flex justify-center items-center h-full pt-28">
                        <h2 className="text-7xl text-white font-bold font-serif montserrat">PAGO RUTAS</h2>
                    </div>
                </div>
            </section>


            <section> 
               
            <h2 className=" text-center text-5xl text-[#143A27] font-bold font-serif roboto pt-10 pb-10">Reserva tu ruta realizando el pago!!</h2>
           
                <div className="paypal-container">
                <PayPalScriptProvider options={initialOptions}>
                <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
                </PayPalScriptProvider>
                </div>
            </section>
            <section>
                <div className=" pt-10"></div>
                <Footer/>
            </section>
            
     
        </div>
    );
};

export default function BotonPaypal() {
    return <PaypalButtonComponent />;
}