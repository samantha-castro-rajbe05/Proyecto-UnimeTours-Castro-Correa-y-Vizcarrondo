import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { App } from "./views/App.jsx";
import injectContext from "./store/appContext.jsx";
import Navbar from "./components/navbar.jsx";



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
                        </>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default injectContext(Layout);
