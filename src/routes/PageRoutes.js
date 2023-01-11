import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ContenedorPaginas from "../components/ContenedorPaginas";
import PageLogin from "../pages/login/PageLogin";

//Rutas
const PageRoutes = () => {
  //Sesion
  const [sesion, setSesion] = useState({
    id: null,
    nombre: null,
    apellidos: null,
    telefono: null,
    email: null,
    isSesionIniciada: false,
    isGerente: null,
    imagen: null,
  });

  //Retornamos
  return (
    <BrowserRouter>
      {/* Rutas */}
      <Routes>
        {/* Por defecto */}
        <Route path="/" element={<Navigate to="/inicio" />} />
        {/* Rutas */}
        <Route
          path="/:titulo"
          element={<ContenedorPaginas sesion={sesion} setSesion={setSesion} />}
        />
        {/* {Acceder} */}
        <Route path="/acceder" element={<PageLogin setSesion={setSesion} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PageRoutes;
