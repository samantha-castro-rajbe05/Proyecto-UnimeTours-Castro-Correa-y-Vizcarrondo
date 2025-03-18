import React from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";

import { App } from "./views/App.jsx";
import injectContext from "./store/appContext.jsx";
import Navbar from "./components/navbar.jsx";
import Login from "./components/login-signup/login.jsx";
import Signup from "./components/login-signup/signup.jsx";



import Label from "./components/login-signup/label.jsx";
import Rutas from "./components/Rutas/rutas.jsx";
import { VerRutas } from "./components/Rutas/verruta.jsx";
import Footer from "./components/footer.jsx";


const Layout = () => {
    // the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    // const basename = process.env.BASENAME || "";
    const basename = import.meta.env.VITE_BASENAME || "";
    return (
        <BrowserRouter basename={basename}>
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <Navbar />
                            <App />
                            <Footer/>
                            
                        </>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <>
                            <Login />
                        </>
                    }
                />

                <Route
                    path="/signup"
                    element={
                        <>
                            <Signup />
                            
                        </>
                    }
                />





























































                <Route
                    path="/rutas"
                    element={
                        <>
                            <Navbar/>
                            <Rutas />
                            <Footer/>
                            
                        </>
                    }
                />
                <Route
                    path = "/verruta"
                    element= {

                        <>
                            <Navbar/>
                            <VerRutas/>
                            <Footer/>

                        </>
                    }
                />

                
            </Routes>
            
        </BrowserRouter>
    );
};

export default injectContext(Layout);
