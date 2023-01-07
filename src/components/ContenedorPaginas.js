import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router";
import { Navigate } from "react-router-dom";
import PageVentas from "../pages/ventas/PageVentas";
import PieDePagina from "../components/PieDePagina";
import BarraSuperior from "../components/BarraSuperior";
import PageLogin from "../pages/login/PageLogin";

// Obtener pagina
const PaginaEscogida = ({ titulo, sesion, setSesion }) => {
  // Escogemos
  switch (titulo) {
    // Inicio
    case "inicio":
      return <h1>{titulo}</h1>;

    // Articulos
    case "articulos":
      return <h1>{titulo}</h1>;

    // Clientes
    case "clientes":
      return <h1>{titulo}</h1>;

    // Proveedores
    case "proveedores":
      return <h1>{titulo}</h1>;

    // Ventas
    case "ventas":
      return <PageVentas />;

    // Empleados
    case "empleados":
      return <h1>{titulo}</h1>;

    // Otro
    default:
      return <Navigate to="/inicio" />;
  }
};

// Contenedor
const ContenedorPaginas = ({ sesion, setSesion }) => {
  // Obtenemos titulo
  let { titulo } = useParams();

  // Devolvemos
  return (
    <>
      {/* Barra Superior */}
      <BarraSuperior titulo={titulo} sesion={sesion} setSesion={setSesion} />
      {/* Contenedor */}
      <Container className="container">
        {/* Pagina */}
        <PaginaEscogida titulo={titulo} sesion={sesion} setSesion={setSesion} />
      </Container>
      {/* Pie de pagina */}
      <PieDePagina />
    </>
  );
};

export default ContenedorPaginas;
