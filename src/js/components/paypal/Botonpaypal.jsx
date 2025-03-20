// BotonPaypal.jsx
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";

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
        "client-id": "AW-skK7b2hAy711svYZX_jm5R8zmCCjyDPacselnigxq6bYJV05L06amx0P8V6rH0uukDyG-HhCQ_JW5",
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
        <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
        </PayPalScriptProvider>
    );
};

export default function BotonPaypal() {
    return <PaypalButtonComponent />;
}