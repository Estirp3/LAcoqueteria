import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import NuevaColeccion from "./pages/NuevaColeccion";
import CategoryPage from "./pages/CategoryPage";
import { DataProvider } from "./context/DataContext";

import ThemeController from "./components/ThemeController";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DataProvider>
      <ThemeController />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="nueva-coleccion" element={<NuevaColeccion />} />
            <Route path="login" element={<Login />} />
            <Route path="admin" element={<Admin />} />
            {/* Ruta dinámica para categorías (ej: /vestidos, /pantalones) */}
            <Route path=":categoryName" element={<CategoryPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DataProvider>
  </React.StrictMode>
);
