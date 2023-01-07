import { Link } from "react-router-dom";
import React from "react";
import {
  ListTask,
  HouseFill,
  Box2Fill,
  PersonVcardFill,
  PeopleFill,
  CartFill,
  PersonCircle,
} from "react-bootstrap-icons";
import { Dropdown } from "react-bootstrap";

// Clase
class enlace {
  // Constructor
  constructor(titulo, url, icono, ocultar = false) {
    this.titulo = titulo;
    this.url = url;
    this.icono = icono;
    this.ocultar = ocultar;
  }
}

// Acceder
const ParteDeSesion = ({ sesion, titulo }) => {
  //Sesión no iniciada
  if (!sesion.isSesionIniciada) {
    //Acceder
    const Sesion = new enlace("Acceder", "/acceder", PersonCircle);

    return (
      <li
        className={
          Sesion.url.replace(/^\//, "") === titulo
            ? "nav-link text-secondary"
            : "nav-link text-white"
        }
      >
        <Link
          to={Sesion.url}
          className={
            "d-flex align-items-center my-2 my-lg-0 me-lg-auto " +
            (Sesion.url.replace(/^\//, "") === titulo
              ? "text-secondary"
              : "text-white") +
            " text-decoration-none"
          }
        >
          {/* Icono */}
          <Sesion.icono
            className="bi d-block mx-auto mb-1"
            width="24"
            height="24"
          />
        </Link>
        {Sesion.titulo}
      </li>
    );
  }

  // li = nav-item dropdown

  //Sesion iniciada
  return (
    <Dropdown>
      <Dropdown.Toggle variant="dark" id="idPerfil">
        {/* Icono */}
        <PersonCircle
          className="bi d-block mx-auto mb-1"
          width="24"
          height="24"
        />
        {sesion.nombre !== null ? sesion.nombre : "????"}
      </Dropdown.Toggle>

      {/* Menu */}
      <Dropdown.Menu>
        {/* Perfil */}
        <Dropdown.Item>
          <Link className={"dropdown-item"} to={"/inicio"}>
            Perfil
          </Link>
        </Dropdown.Item>
        {/* Ajustes */}
        <Dropdown.Item>
          <Link className={"dropdown-item"} to={"/inicio"}>
            Ajustes
          </Link>
        </Dropdown.Item>
        <Dropdown.Divider></Dropdown.Divider>
        {/* Cerrar Sesión */}
        <Dropdown.Item>
          <Link className={"dropdown-item"} to={"/inicio"}>
            Cerrar Sesion
          </Link>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

// Barra
const BarraSuperior = ({ titulo, sesion }) => {
  // Enlaces
  const enlaces = [
    new enlace("Articulos", "/articulos", ListTask),
    new enlace("Clientes", "/clientes", PeopleFill),
    new enlace("Proveedores", "/proveedores", Box2Fill),
    new enlace("Ventas", "/ventas", CartFill),
    new enlace("Empleados", "/empleados", PersonVcardFill, !sesion.isAdmin),
  ];

  // Barra
  return (
    <header>
      {/* Barra superior */}
      <div className="px-3 py-2 text-bg-dark">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            {/* Parte del inicio */}
            <Link
              to={"/inicio"}
              className={
                "d-flex align-items-center my-2 my-lg-0 me-lg-auto " +
                (titulo === "inicio" ? "text-secondary" : "text-white") +
                " text-decoration-none"
              }
            >
              {/* Icono */}
              <HouseFill
                className="bi me-2"
                width="40"
                height="32"
                role={"img"}
              />
            </Link>

            {/* Lista de enlaces  */}
            <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
              {enlaces.map((elemento, i) => {
                //Oculto
                if (elemento.ocultar) {
                  return;
                }

                return (
                  <li
                    key={i}
                    className={
                      elemento.url.replace(/^\//, "") === titulo
                        ? "nav-link text-secondary"
                        : "nav-link text-white"
                    }
                  >
                    <Link
                      to={elemento.url}
                      className={
                        "d-flex align-items-center my-2 my-lg-0 me-lg-auto " +
                        (elemento.url.replace(/^\//, "") === titulo
                          ? "text-secondary"
                          : "text-white") +
                        " text-decoration-none"
                      }
                    >
                      {/* Icono */}
                      <elemento.icono
                        className="bi d-block mx-auto mb-1"
                        width="24"
                        height="24"
                      />
                    </Link>
                    {elemento.titulo}
                  </li>
                );
              })}
            </ul>

            {/* Parte del inicio de sesion */}
            <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
              <ParteDeSesion sesion={sesion} titulo={titulo} />
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default BarraSuperior;
