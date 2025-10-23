import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import "./styles/globals.css";

import { Layout, Home, Vestidos, Pantalones, Tops, Faldas, NuevaColeccion } from "./pages";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/vestidos" element={<Vestidos />} />
          <Route path="/pantalones" element={<Pantalones />} />
          <Route path="/tops" element={<Tops />} />
          <Route path="/faldas" element={<Faldas />} />
          <Route path="/nueva-coleccion" element={<NuevaColeccion />} />
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
