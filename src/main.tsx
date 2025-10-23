import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/globals.css";

import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Vestidos from "./pages/Vestidos";

function Pantalones() { return <section className="px-6 py-16 text-center">PANTALONES</section>; }
function Tops() { return <section className="px-6 py-16 text-center">TOPS</section>; }
function Faldas() { return <section className="px-6 py-16 text-center">FALDAS</section>; }

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/vestidos" element={<Vestidos />} />
          <Route path="/pantalones" element={<Pantalones />} />
          <Route path="/tops" element={<Tops />} />
          <Route path="/faldas" element={<Faldas />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
