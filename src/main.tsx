import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/globals.css";
import Home from "./pages/Home";
import Vestidos from "./pages/Vestidos";
import Layout from "./pages/Layout";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/vestidos" element={<Vestidos />} />
          {/* Agregaremos más páginas después: /pantalones, /tops, etc. */}
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
