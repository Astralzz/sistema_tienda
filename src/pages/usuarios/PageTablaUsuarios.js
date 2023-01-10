import React, { useEffect, useState } from "react";
import { Card, Table, Image, Button, Form, Pagination } from "react-bootstrap";
import {
  cambiarEstadoUsuario,
  obtenerTablaUsuarios,
  obtenerTablaUsuariosPorNombre,
  noDeFilasListaUsuario,
} from "../../apis/apiUsuario";
import { EyeFill, PersonCircle, CircleFill } from "react-bootstrap-icons";
import { API_URL } from "../../apis/variables";
import Swal from "sweetalert2";

// Tabla de usuarios
const PageTablaUsuarios = ({ titulo, sesion }) => {
  // Tabla
  const [tabla, setTabla] = useState([]);
  const [errorMensaje, setErrorMensaje] = useState("");
  const [empleadoABuscar, setEmpleadoABuscar] = useState("");
  const [noDePaginas, setNoDePaginas] = useState(1);
  const [paginaActiva, setPaginaActiva] = useState(1);
  const [empleado, setEmpleado] = useState({
    nombre: null,
    email: null,
    telefono: null,
    imagen: null,
    estado: false,
    isGerente: false,
  });
  const [paginas, setPaginas] = useState({
    desde: 0,
    asta: 10,
  });

  //Obtener datos
  const obtenerDatos = async () => {
    //Verificamos
    const res = await obtenerTablaUsuarios(paginas.desde, paginas.asta);

    // Error
    if (res == undefined) {
      //Damos respuesta
      setErrorMensaje("Error, No se obtuvieron los datos");
      return;
    }

    //Éxito
    setTabla(res);
    setErrorMensaje("");
    await obtenerNoDeFilasTabla();
  };

  //Buscar empleado
  const buscarEmpleados = async (e) => {
    const buscar = e;
    setEmpleadoABuscar(buscar);

    //Comprobamos
    let regex = /^[a-zA-Z]+( [a-zA-Z]+){0,3}$/;
    if (buscar === "") {
      await obtenerDatos();
      setErrorMensaje("");
      return;
    } else if (!regex.test(buscar)) {
      await obtenerDatos();
      setErrorMensaje("nombre invalido");
    }

    //Verificamos
    const res = await obtenerTablaUsuariosPorNombre(buscar, 10);

    // Error
    if (res == undefined) {
      //Damos respuesta
      setErrorMensaje("No se encontraron datos de " + buscar);
      return;
    }

    //Éxito
    setTabla(res);
    setErrorMensaje("");
  };

  //Obtener no de filas
  const obtenerNoDeFilasTabla = async () => {
    const filas = await noDeFilasListaUsuario();

    console.log(filas);

    setNoDePaginas(Math.ceil(filas / paginas.desde + paginas.asta));
  };

  // Pagination
  let items = [];
  for (let i = 1; i <= noDePaginas; i++) {
    items.push(
      <Pagination.Item key={i} active={i === paginaActiva}>
        {i}
      </Pagination.Item>
    );
  }

  // Desactivar empleado
  const desactivarEmpleado = (email) => {
    Swal.fire({
      title: `Seguro que deseas ${
        Boolean(empleado.estado) ? "desactivar" : "activar"
      } a ${empleado.nombre}`,
      text: `este empleado ${
        Boolean(empleado.estado) ? "no" : "ya"
      } podrá iniciar sesión ${
        Boolean(empleado.estado) ? "mientras este desactivado" : ""
      }!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `si, ${
        Boolean(empleado.estado) ? "desactivar" : "activar"
      } empleado!`,
      cancelButtonText: "cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        desactivar(email);
      }
    });
  };

  // Desactivar
  const desactivar = async (email) => {
    //Verificamos
    const res = await cambiarEstadoUsuario(email);

    // Error
    if (res == undefined) {
      //Damos respuesta
      Swal.fire(
        "Error!",
        "No se desactivo al empleado, intenta mas tarde",
        "error"
      );
      return;
    }

    Swal.fire(
      "Éxito!",
      `Se a ${
        Boolean(empleado.estado) ? "desactivado" : "activado"
      } correctamente al empleado.`,
      "success"
    );

    //Éxito
    setEmpleado({
      nombre: null,
      email: null,
      telefono: null,
      imagen: null,
      estado: false,
      isGerente: false,
    });
    obtenerDatos();
  };

  useEffect(() => {
    if (sesion.isSesionIniciada) {
      obtenerDatos();
    }
  }, []);
  useEffect(() => {
    if (sesion.isSesionIniciada) {
      obtenerDatos();
    }
  }, [paginas]);

  //Imágenes de la tabla
  const ImageAvatarTabla = ({ imagen }) => {
    return imagen !== null ? (
      <Image
        src={API_URL + imagen}
        alt="Admin"
        className="rounded-circle"
        height={20}
      />
    ) : (
      <PersonCircle
        alt="Admin"
        className="rounded-circle"
        // height={150}
        height={20}
      />
    );
  };

  //Imagen
  const ImageAvatar = () => {
    return empleado.imagen !== null ? (
      <Image
        src={API_URL + empleado.imagen}
        alt="Admin"
        className="rounded-circle"
        width={150}
      />
    ) : (
      <PersonCircle
        alt="Admin"
        className="rounded-circle"
        height={150}
        width={150}
      />
    );
  };

  return (
    <div className="container">
      <br />
      <div className="row gutters-sm">
        {/* PARTE DERECHA */}
        <div className="col-md-4 mb-3">
          {/* Parte del titulo */}
          <Card className="card">
            <Card.Body className="card-body">
              {/* Buscar empleado */}
              <Form.Group className="mt-3">
                <Form.Control
                  type="search"
                  className="form-control"
                  placeholder="buscar empleado por nombre"
                  maxLength={60}
                  value={empleadoABuscar}
                  onChange={(e) => buscarEmpleados(e.target.value)}
                />
              </Form.Group>
            </Card.Body>
          </Card>
          {/* Tarjeta de Historial */}
          <Card className="card mt-3">
            {/* Tarjeta */}
            <div className="d-flex flex-column align-items-center text-center">
              <br />
              {/* Imagen de perfil */}
              <ImageAvatar />
              <div className="mt-3">
                {/* Nombre */}
                <h4>
                  {empleado.nombre !== null
                    ? empleado.nombre
                    : "Selecciona un empleado"}
                </h4>
                {/* Email */}
                <p className="text-secondary mb-1">
                  {empleado.email !== null ? empleado.email : "......"}
                </p>
                {/* Cargo */}
                <p className="text-muted font-size-sm">
                  {empleado.telefono !== null ? empleado.telefono : "......"}
                </p>
                {/* Desactivar */}
                <p className="text-muted font-size-sm">
                  <Button
                    variant={Boolean(empleado.estado) ? "danger" : "success"}
                    disabled={
                      empleado.email === null || Boolean(empleado.isGerente)
                    }
                    onClick={() => desactivarEmpleado(empleado.email)}
                  >
                    {Boolean(empleado.estado)
                      ? "Desactivar empleado"
                      : "Activar empleado"}
                  </Button>
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* PARTE DE LA TABLA */}
        <div className="col-lg-8">
          <Card className="card">
            <Card.Body className="card-body">
              {/* Titulo */}
              <h4>{"tabla de los " + titulo}</h4>
              <h5 className="text-danger">{errorMensaje}</h5>
              {/* Tabla de empleados */}
              <Table striped bordered hover id="tableEmpleados">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>foto</th>
                    <th>nombre</th>
                    <th>Email</th>
                    <th>Telefono</th>
                    <th>Estado</th>
                    <th>ver</th>
                  </tr>
                </thead>
                <tbody>
                  {tabla.map((dato, i) => {
                    if (sesion.email === dato.email) {
                      return;
                    }

                    return (
                      <tr key={i}>
                        <td>{i}</td>
                        <td>
                          <ImageAvatarTabla imagen={dato.imagen} />
                        </td>
                        <td>{dato.nombre + " " + dato.apellidos}</td>
                        <td>{dato.email}</td>
                        <td>{dato.telefono}</td>
                        <td>
                          <div
                            className={
                              Boolean(dato.estado)
                                ? "text-success"
                                : "text-danger"
                            }
                          >
                            <p className="text-center">
                              <CircleFill
                                fill="currentColor"
                                className="bi bi-circle-fill"
                                viewBox="0 0 16 16"
                              >
                                <circle cx="8" cy="8" r="8" />
                              </CircleFill>
                            </p>
                          </div>
                        </td>
                        <td>
                          <Button
                            variant="dark"
                            onClick={() => {
                              setEmpleado({
                                nombre: dato.nombre + " " + dato.apellidos,
                                email: dato.email,
                                telefono: dato.telefono,
                                imagen: dato.imagen,
                                estado: dato.estado,
                                isGerente: dato.isGerente,
                              });
                            }}
                          >
                            <EyeFill />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <div className="text-dark">
                <Pagination
                  className="pagination-bg-dark"
                  style={{ color: "#333333" }}
                >
                  {items}
                </Pagination>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PageTablaUsuarios;
