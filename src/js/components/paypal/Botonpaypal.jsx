import {PaypalScriptProvider, PaypalButtons} from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";



const PaypalButtonComponent =() => {

    const navigate = useNavigate()

    const initialOptions = {

        "client/id": "AW-skK7b2hAy711svYZX_jm5R8zmCCjyDPacselnigxq6bYJV05L06amx0P8V6rH0uukDyG-HhCQ_JW5",
        currency: "USD",
        intent: "capture",
    }


    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: "5",
                    },
                },
            ],
        })
    }

    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details){
            const name = details.payer.name.given_name 

            console.log(name)
            console.log("")
            navigate("/exitosa")
        })
    }

    return(
        <PaypalScriptProvider options = {initialOptions}>
            <PaypalButtons createOrder={createOrder} onApprove = {onApprove}/>
        </PaypalScriptProvider>
    )
}



export default function BotonPaypal() {

    return (
        <PaypalButtonComponent/>
    )
}