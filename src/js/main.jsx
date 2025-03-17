import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import Layout from "./layout.jsx";

function App() {

    return (
        <React.StrictMode>
                <Layout />
        </React.StrictMode>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

