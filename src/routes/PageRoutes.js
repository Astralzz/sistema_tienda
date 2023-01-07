import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ContenedorPaginas from "../components/ContenedorPaginas";
import PageLogin from "../pages/login/PageLogin";

//Rutas
const PageRoutes = () => {
  //Sesion
  const [sesion, setSesion] = useState({
    nombre: null,
    correo: null,
    isSesionIniciada: false,
    isAdmin: false,
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
