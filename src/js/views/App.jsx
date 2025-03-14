import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "/src/css/App.css";

export const App = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/");
    }, [navigate]);

    return (
        <div className="font-serif">
            <img src="/UnimeTours-landing-page.jpg" className="absolute -z-10 inset-0 w-full object-cover"/>
            <h2 className="text-7xl text-white">UnimeTours</h2>
        </div>
    );
};