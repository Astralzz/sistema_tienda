import React, { useEffect, useState } from "react";
import { Card, Table, Image, Button, Form, Pagination } from "react-bootstrap";
import IconoCaja from "../../img/iconoCaja.png";
import {
  eliminarProductoDeLaBD,
  obtenerTablaProductos,
  obtenerTablaProductosPorNombre,
  noDeFilasListaProducto,
} from "../../apis/apiProductos";
import { EyeFill, BoxFill, CurrencyDollar } from "react-bootstrap-icons";
import { API_URL } from "../../apis/variables";
import Swal from "sweetalert2";
import PageRegistroVentas from "./PageRegistroVentas";

// Tabla de usuarios
const PageVentas = ({ titulo, sesion }) => {
  // Modal
  const [estadoModal, isEstadoModal] = useState(false);
  const cerrarModal = () => isEstadoModal(false);
  const abrirModal = () => isEstadoModal(true);

  // Tabla
  const [tabla, setTabla] = useState([]);
  const [errorMensaje, setErrorMensaje] = useState("");
  const [productoABuscar, setProductoABuscar] = useState("");
  const [noDePaginas, setNoDePaginas] = useState(1);
  const [paginaActiva, setPaginaActiva] = useState(0);
  const [producto, setProducto] = useState({
    id: null,
    id_categoria: null,
    nombre: null,
    precio: null,
    cantidad: null,
    imagen: null,
    descripcion: null,
    categoria: null,
  });
  const [paginas, setPaginas] = useState({
    desde: 0,
    asta: 10,
  });

  //Obtener datos
  const obtenerDatos = async () => {
    //Verificamos
    const res = await obtenerTablaProductos(paginas.desde, paginas.asta);

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

  //Buscar producto
  const buscarProductos = async (e) => {
    const buscar = e;
    setProductoABuscar(buscar);

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
    const res = await obtenerTablaProductosPorNombre(buscar, 10);

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
    const filas = await noDeFilasListaProducto();

    setNoDePaginas(Math.ceil(filas / 10));
  };

  // Pagination
  let items = [];
  for (let i = 1; i <= noDePaginas; i++) {
    items.push(
      <Pagination.Item
        className="text-dark"
        onClick={() => {
          if (i === 1) {
            setPaginaActiva(1);
            setPaginas({
              desde: 0,
              asta: 10,
            });
          }

          setPaginaActiva(i);
          setPaginas({
            desde: 10 * (i - 1),
            asta: 10 * i,
          });
        }}
        key={i}
        active={i === paginaActiva}
      >
        {i}
      </Pagination.Item>
    );
  }

  // Desactivar producto
  const eliminarProducto = (id) => {
    Swal.fire({
      title: `Seguro que deseas eliminar a ${producto.nombre}`,
      text: `los registros de este producto se eliminara igualmente!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `si, eliminar producto`,
      cancelButtonText: "cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminar(id);
      }
    });
  };

  // Desactivar
  const eliminar = async (id) => {
    //Verificamos
    const res = await eliminarProductoDeLaBD(id);

    // Error
    if (res == undefined) {
      //Damos respuesta
      Swal.fire(
        "Error!",
        "No se elimino el producto, intenta mas tarde",
        "error"
      );
      return;
    }

    Swal.fire("Éxito!", `Producto eliminado correctamente.`, "success");

    //Éxito
    setProducto({
      id: null,
      id_categoria: null,
      nombre: null,
      precio: null,
      cantidad: null,
      imagen: null,
      descripcion: null,
      categoria: null,
    });
    obtenerDatos();
  };

  useEffect(() => {
    if (sesion.isSesionIniciada) {
      obtenerDatos();
      setProductoABuscar("");
    }
  }, []);
  useEffect(() => {
    if (sesion.isSesionIniciada) {
      obtenerDatos();
      setProductoABuscar("");
    }
  }, [paginas]);
  useEffect(() => {
    if (sesion.isSesionIniciada) {
      obtenerDatos();
      setProductoABuscar("");
    }
  }, [estadoModal]);

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
      <Image
        src={IconoCaja}
        alt="Admin"
        className="rounded-circle"
        // height={150}
        height={20}
      />
    );
  };

  //Imagen
  const ImageAvatar = () => {
    return producto.imagen !== null ? (
      <Image
        src={API_URL + producto.imagen}
        alt="Admin"
        className="rounded-circle"
        width={150}
      />
    ) : (
      <Image
        src={IconoCaja}
        alt="Admin"
        className="rounded-circle"
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
          {/* Parte de venta */}
          <PageRegistroVentas sesion={sesion} />
          {/* Buscar venta */}
          <Card className="card">
            <Card.Body className="card-body">
              <Form.Group className="mt-3">
                <Form.Control
                  type="search"
                  className="form-control"
                  placeholder="buscar producto por nombre"
                  maxLength={60}
                  value={productoABuscar}
                  onChange={(e) => buscarProductos(e.target.value)}
                />
              </Form.Group>
            </Card.Body>
          </Card>
          {/* Parte de productos */}
          <Card className="card mt-3">
            {/* Tarjeta */}
            <div className="d-flex flex-column align-items-center text-center">
              <br />
              {/* Imagen de perfil */}
              <ImageAvatar />
              <div className="mt-3">
                {/* Nombre */}
                <h4>
                  {producto.nombre !== null
                    ? producto.nombre
                    : "Selecciona un producto"}
                </h4>
                {/* descripcion */}
                <p className="text-secondary mb-1">
                  {producto.descripcion !== null
                    ? producto.descripcion
                    : "......"}
                </p>
                {/* categoria */}
                <p className="text-muted font-size-sm">
                  {producto.categoria !== null ? producto.categoria : "......"}
                </p>
                {/* Tarjetas */}
                <ul className="list-group list-group-flush">
                  {/* precio */}
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">
                      <CurrencyDollar
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={"currentColor"}
                        strokeWidth={"2"}
                        strokeLinecap={"round"}
                        strokeLinejoin={"round"}
                        className="feather feather-globe mr-2 icon-inline"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                      </CurrencyDollar>
                      precio
                    </h6>
                    <span className="text-secondary">
                      {"$" + (producto.precio !== null ? producto.precio : "0")}
                    </span>
                  </li>
                  {/* cantidad */}
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">
                      <BoxFill
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={"currentColor"}
                        strokeWidth={"2"}
                        strokeLinecap={"round"}
                        strokeLinejoin={"round"}
                        className="feather feather-globe mr-2 icon-inline"
                      >
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </BoxFill>
                      Stock
                    </h6>
                    <span className="text-secondary">
                      {producto.cantidad !== null
                        ? producto.cantidad + " pz"
                        : "???"}
                    </span>
                  </li>
                </ul>
                {/* Eliminar y crear */}
                <p className="text-muted font-size-sm">
                  {/* Eliminar */}
                  <Button
                    variant="danger"
                    disabled={
                      producto.id === null || !Boolean(sesion.isGerente)
                    }
                    onClick={() => eliminarProducto(producto.id)}
                  >
                    Eliminar producto
                  </Button>
                  {/* Crear */}
                  <Button
                    variant="success"
                    disabled={!Boolean(sesion.isGerente)}
                    onClick={() => abrirModal()}
                  >
                    Agregar producto
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
              <h4>{"tabla de mis " + titulo}</h4>
              <h5 className="text-danger">{errorMensaje}</h5>
              {/* Tabla de productos */}
              <Table striped bordered hover id="tableProductos">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>foto</th>
                    <th>nombre</th>
                    <th>categoria</th>
                    <th>precio</th>
                    <th>stock</th>
                    <th>ver</th>
                  </tr>
                </thead>
                <tbody>
                  {tabla.map((dato, i) => {
                    return (
                      <tr key={i}>
                        <td>{i}</td>
                        <td>
                          <ImageAvatarTabla imagen={dato.imagen} />
                        </td>
                        <td>{dato.nombre}</td>
                        <td>{dato.categoria}</td>
                        <td>{dato.precio}</td>
                        <td>{dato.cantidad}</td>
                        <td>
                          {/* Boton de observar */}
                          <Button
                            variant="dark"
                            onClick={() => {
                              setProducto({
                                id: dato.id,
                                id_categoria: dato.id_categoria,
                                nombre: dato.nombre,
                                precio: dato.precio,
                                cantidad: dato.cantidad,
                                imagen: dato.imagen,
                                descripcion: dato.descripcion,
                                categoria: dato.categoria,
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
              {/* Pagination */}
              <div className="text-dark">
                <Pagination className="pagination-bg-dark">{items}</Pagination>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PageVentas;
