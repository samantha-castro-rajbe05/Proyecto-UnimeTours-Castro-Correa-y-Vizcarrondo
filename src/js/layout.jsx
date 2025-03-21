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
import VerRutas from "./components/Rutas/verruta.jsx";
import Footer from "./components/footer.jsx";
import Galeria from "./components/galeria/galeria.jsx"; // Importa el componente Galería
import Contactanos from "./components/contactanos/contactanos.jsx"; // Importa el componente Contactanos
import BotonPaypal from "./components/paypal/Botonpaypal.jsx";
import Exitosa from "./components/paypal/Exitosa.jsx"; // Ajusta la ruta si es necesario
import Rutas from "./components/Rutas/rutasprueba.jsx";
import NotFound from "./components/notfound/NotFound.jsx"; // Ajusta la ruta si es necesario
import EditProfile from "./components/editarPerfil/editarPerfil.jsx";

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

                <Route 
                    path="/rutas" 
                    element={
                        <>
                            <Navbar/>
                            <Rutas rol="cliente" />
                            <Footer/>
                        </>
                    } 
                />

                <Route 
                    path="/paypal" 
                    element={<BotonPaypal />} 
                    
                />
                <Route
                     path="/exitosa" 
                     element={<Exitosa />} 
                />

                <Route 
                    path = "/perfil"
                    element ={<EditProfile/>}

                />

                <Route path ="/noencontrado" element = {<NotFound/>}/>


            </Routes>
        </BrowserRouter>
    );
};

export default injectContext(Layout);
