import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { App } from "./views/App.jsx";
import injectContext from "./store/appContext.jsx";
import Navbar from "./components/navbar.jsx";
import Login from "./components/login-signup/login.jsx";
import Signup from "./components/login-signup/signup.jsx";
import Blog from "./components/blog/blog.jsx";
import Feedback from "./components/feedback/feedback.jsx"; // Importa el componente Feedback
import Naturaleza from "./components/naturaleza/naturaleza.jsx"; // Importa el componente Naturaleza
import Label from "./components/login-signup/label.jsx";
import Rutas from "./components/Rutas/rutas.jsx";
import { VerRutas } from "./components/Rutas/verruta.jsx";
import Footer from "./components/footer.jsx";
import Galeria from "./components/galeria/galeria.jsx"; // Importa el componente Galería
import Contactanos from "./components/contactanos/contactanos.jsx"; // Importa el componente Contactanos

const Layout = () => {
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
                            <Footer />
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
                            <Navbar />
                            <Rutas />
                            <Footer />
                        </>
                    }
                />
                <Route
                    path="/blog"
                    element={
                        <>
                            <Navbar />
                            <Blog />
                        </>
                    }
                />
                <Route
                    path="/verruta"
                    element={
                        <>
                            <Navbar />
                            <VerRutas />
                            <Footer />
                        </>
                    }
                />
                <Route
                    path="/feedback"
                    element={
                        <>
                            <Navbar />
                            <Feedback />
                        </>
                    }
                />
                <Route
                    path="/naturaleza"
                    element={
                        <>
                            <Navbar />
                            <Naturaleza />
                        </>
                    }
                />
                <Route
                    path="/galeria"
                    element={
                        <>
                            <Navbar />
                            <Galeria />
                            <Footer />
                        </>
                    }
                />
                <Route
                    path="/contactanos"
                    element={
                        <>
                            <Navbar />
                            <Contactanos />
                            <Footer />
                        </>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default injectContext(Layout);
