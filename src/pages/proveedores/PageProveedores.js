import React, { useEffect, useState } from "react";
import {
  Card,
  Table,
  Image,
  Button,
  Form,
  Pagination,
  Tabs,
  Tab,
} from "react-bootstrap";
import IconoCaja from "../../img/iconoCaja.png";
import {
  eliminarProductoDeLaBD,
  obtenerTablaProductos,
  obtenerTablaProductosPorNombre,
  noDeFilasListaProducto,
} from "../../apis/apiProductos";
import {
  EyeFill,
  BoxFill,
  CurrencyDollar,
  SortNumericUp,
  ListColumns,
  PencilFill,
} from "react-bootstrap-icons";
import { API_URL } from "../../apis/variables";
import Swal from "sweetalert2";
import PageRegistroProveedor from "./PageRegistroProveedor";
import TablaProveedores from "./TablaProveedores";
import {
  eliminarProveedorDeLaBD,
  noDeFilasListaProveedor,
  obtenerTablaProveedores,
} from "../../apis/apiProveedores";
import PageRegistroPedidos from "./PageRegistroPedidos";
import {
  eliminarPedidosDeLaBD,
  noDeFilasListaPedido,
  obtenerTablaPedidos,
  ponerPedidoComoCompletado,
} from "../../apis/apiPedidos";
import TablaPedidos from "./TablaPedidos";

// Tabla de usuarios
const PageProveedores = ({ titulo, sesion }) => {
  // Modal
  const [estadoModal, isEstadoModal] = useState(false);
  const cerrarModal = () => isEstadoModal(false);
  const abrirModal = () => isEstadoModal(true);
  // Tabla
  const [tablaProveedores, setTablaProveedores] = useState([]);
  const [tablaPedidos, setTablaPedidos] = useState([]);
  const [errorMensaje, setErrorMensaje] = useState("");
  const [noDePaginasProveedores, setNoDePaginasProveedores] = useState(1);
  const [noDePaginasPedidos, setNoDePaginasPedidos] = useState(1);
  const [paginaActivaProveedores, setPaginaActivaProveedores] = useState(0);
  const [paginaActivaPedidos, setPaginaActivaPedidos] = useState(0);
  const [proveedor, setProveedor] = useState({
    id: null,
    nombre: null,
    email: null,
    telefono: null,
    direccion: null,
    empresa: null,
  });
  const [pedido, setPedido] = useState({
    id: null,
    fecha: null,
    id_proveedor: null,
    id_usuario: null,
    estado: null,
    total: null,
    proveedor: null,
    usuario: null,
    detalles: [],
  });
  const [detallePedido, setDetallePedido] = useState({
    id_producto: null,
    cantidad: null,
  });
  const [paginas, setPaginas] = useState({
    desdeProveedor: 0,
    astaProveedor: 10,
    desdePedido: 0,
    astaPedido: 10,
  });

  //Obtener datos
  const obtenerDatos = async () => {
    //Verificamos
    const res = await obtenerTablaProveedores(
      paginas.desdeProveedor,
      paginas.astaProveedor
    );

    const res2 = await obtenerTablaPedidos(
      paginas.desdeProveedor,
      paginas.astaProveedor
    );

    // Error
    if (res === undefined || res2 === undefined) {
      //Damos respuesta
      setErrorMensaje("Error, No se obtuvieron los datos");
      return;
    }

    //Éxito
    setTablaProveedores(res);
    setTablaPedidos(res2);
    setErrorMensaje("");
    await obtenerNoDeFilasTabla();
  };

  //Obtener no de filas
  const obtenerNoDeFilasTabla = async () => {
    const filas = await noDeFilasListaProveedor();
    const filas2 = await noDeFilasListaPedido();

    setNoDePaginasProveedores(Math.ceil(filas / 10));
    setNoDePaginasPedidos(Math.ceil(filas2 / 10));
  };

  // Pagination de proveedores
  let itemsProveedor = [];
  for (let i = 1; i <= noDePaginasProveedores; i++) {
    itemsProveedor.push(
      <Pagination.Item
        className="text-dark"
        onClick={() => {
          if (i === 1) {
            setPaginaActivaProveedores(1);
            setPaginas({
              ...paginas,
              desdeProveedor: 0,
              astaProveedor: 10,
            });
          }

          setPaginaActivaProveedores(i);
          setPaginas({
            ...paginas,
            desdeProveedor: 10 * (i - 1),
            astaProveedor: 10 * i,
          });
        }}
        key={i}
        active={i === paginaActivaProveedores}
      >
        {i}
      </Pagination.Item>
    );
  }

  // Pagination de pedidos
  let itemsPedido = [];
  for (let i = 1; i <= noDePaginasPedidos; i++) {
    itemsPedido.push(
      <Pagination.Item
        className="text-dark"
        onClick={() => {
          if (i === 1) {
            setPaginaActivaPedidos(1);
            setPaginas({
              ...paginas,
              desdePedido: 0,
              astaPedido: 10,
            });
          }

          setPaginaActivaPedidos(i);
          setPaginas({
            ...paginas,
            desdePedido: 10 * (i - 1),
            astaPedido: 10 * i,
          });
        }}
        key={i}
        active={i === paginaActivaPedidos}
      >
        {i}
      </Pagination.Item>
    );
  }

  // eliminar producto
  const eliminarProveedor = (id) => {
    Swal.fire({
      title: `Seguro que deseas eliminar a ${proveedor.nombre}`,
      text: `los registros de este proveedor se eliminaran igualmente!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `si, eliminar proveedor`,
      cancelButtonText: "cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminar(id);
      }
    });
  };

  // eliminar producto
  const eliminarPedido = (id) => {
    Swal.fire({
      title: `Seguro que deseas eliminar este pedido?`,
      text: `los registros de este pedido se eliminaran para siempre!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `si, eliminar pedido`,
      cancelButtonText: "cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminar2(id);
      }
    });
  };

  // eliminar
  const eliminar = async (id) => {
    //Verificamos
    const res = await eliminarProveedorDeLaBD(id);

    // Error
    if (res == undefined) {
      //Damos respuesta
      Swal.fire(
        "Error!",
        "No se elimino el proveedor, intenta mas tarde",
        "error"
      );
      return;
    }

    Swal.fire("Éxito!", `Proveedor eliminado correctamente.`, "success");

    //Éxito
    setProveedor({
      id: null,
      nombre: null,
      email: null,
      telefono: null,
      direccion: null,
      empresa: null,
    });
    obtenerDatos();
  };
  const eliminar2 = async (id) => {
    //Verificamos
    const res = await eliminarPedidosDeLaBD(id);

    // Error
    if (res == undefined) {
      //Damos respuesta
      Swal.fire(
        "Error!",
        "No se elimino el pedido, intenta mas tarde",
        "error"
      );
      return;
    }

    Swal.fire("Éxito!", `Pedido eliminado correctamente.`, "success");

    //Éxito
    setPedido({
      id: null,
      fecha: null,
      id_proveedor: null,
      id_usuario: null,
      estado: null,
      total: null,
      proveedor: null,
      usuario: null,
      detalles: [],
    });
    obtenerDatos();
  };

  // eliminar producto
  const completarPedido = (id, id_producto, cantidad) => {
    Swal.fire({
      title: `Seguro que deseas completar este pedido?`,
      text: `Esta acción no se podrá cambiar!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `si, completar pedido`,
      cancelButtonText: "cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        completar(id, id_producto, cantidad);
      }
    });
  };

  // completar
  const completar = async (id, id_producto, cantidad) => {
    //Verificamos
    const res = await ponerPedidoComoCompletado(id, id_producto, cantidad);

    // Error
    if (res == undefined) {
      //Damos respuesta
      Swal.fire(
        "Error!",
        "No se completo el pedido, intenta mas tarde",
        "error"
      );
      return;
    }

    Swal.fire("Éxito!", `Pedido completado correctamente.`, "success");

    //Éxito
    setPedido({
      id: null,
      fecha: null,
      id_proveedor: null,
      id_usuario: null,
      estado: null,
      total: null,
      proveedor: null,
      usuario: null,
      detalles: [],
    });
    obtenerDatos();
  };

  useEffect(() => {
    if (sesion.isSesionIniciada) {
      obtenerDatos();
      setErrorMensaje("");
    }
  }, []);
  useEffect(() => {
    if (sesion.isSesionIniciada) {
      obtenerDatos();
      setErrorMensaje("");
    }
  }, [paginas]);
  useEffect(() => {
    if (sesion.isSesionIniciada) {
      obtenerDatos();
      setErrorMensaje("");
    }
  }, [estadoModal]);

  // Limpiar
  const limpiar = () => {
    // obtenerDatos();
    setErrorMensaje("");
  };

  return (
    <>
      <div className="container">
        <br />
        <div className="row gutters-sm">
          {/* PARTE DERECHA */}
          <div className="col-md-4 mb-3">
            {/* Parte del pedido */}
            <Card className="card mt-3">
              {/* Tarjeta */}
              <div className="d-flex flex-column align-items-center text-center">
                <br />
                <div className="mt-3">
                  {/* Nombre */}
                  <h4>
                    {pedido.id !== null ? pedido.fecha : "Selecciona un pedido"}
                  </h4>
                  {/* email */}
                  <p className="text-secondary mb-1">
                    {pedido.estado !== null ? pedido.estado : "......"}
                  </p>
                  {/* categoria */}
                  <p className="text-muted font-size-sm">
                    {pedido.total !== null ? pedido.total : "......"}
                  </p>
                  {/* empresa */}
                  <p className="text-secondary mb-1">
                    {pedido.proveedor !== null ? pedido.proveedor : "......"}
                  </p>
                  {/* direccion */}
                  <p className="text-muted font-size-sm">
                    {pedido.usuario !== null ? pedido.usuario : "......"}
                  </p>

                  {/* Detalles */}
                  <div className="text-muted font-size-sm">
                    {pedido.detalles.map((detalle, i) => {
                      return (
                        <ul key={i} className="list-group list-group-flush">
                          {/* producto */}
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
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="2" y1="12" x2="22" y2="12"></line>
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                              </BoxFill>
                            </h6>
                            <span className="text-secondary">
                              {detalle.producto.nombre !== null
                                ? detalle.producto.nombre
                                : "......"}
                            </span>
                          </li>
                          {/* cantidad */}
                          <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                            <h6 className="mb-0">
                              <ListColumns
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
                              </ListColumns>
                            </h6>
                            <span className="text-secondary">
                              {detalle.cantidad !== null
                                ? detalle.cantidad + " pz"
                                : "......"}
                            </span>
                          </li>
                          {/* descripcion */}
                          <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                            <h6 className="mb-0">
                              <PencilFill
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
                              </PencilFill>
                            </h6>
                            <span className="text-secondary">
                              {detalle.descripcion !== null
                                ? detalle.descripcion
                                : "......"}
                            </span>
                          </li>
                        </ul>
                      );
                    })}
                  </div>

                  {/* Eliminar y completar */}
                  <p className="text-muted font-size-sm">
                    {/* Eliminar */}
                    <Button
                      variant="danger"
                      disabled={
                        pedido.id === null ||
                        !Boolean(sesion.isGerente) ||
                        pedido.estado !== "completado"
                      }
                      onClick={() => eliminarPedido(pedido.id)}
                    >
                      Eliminar pedido
                    </Button>
                    {/* Completar */}
                    <Button
                      variant="success"
                      disabled={
                        pedido.id === null || pedido.estado === "completado"
                      }
                      onClick={() =>
                        completarPedido(
                          pedido.id,
                          detallePedido.id_producto,
                          detallePedido.cantidad
                        )
                      }
                    >
                      {pedido.estado === "completado"
                        ? "completado"
                        : "marcar como completado"}
                    </Button>
                  </p>
                </div>
              </div>
            </Card>
            {/* Parte de proveedor */}
            <Card className="card mt-3">
              {/* Tarjeta */}
              <div className="d-flex flex-column align-items-center text-center">
                <br />
                <div className="mt-3">
                  {/* Nombre */}
                  <h4>
                    {proveedor.nombre !== null
                      ? proveedor.nombre
                      : "Selecciona un proveedor"}
                  </h4>
                  {/* email */}
                  <p className="text-secondary mb-1">
                    {proveedor.email !== null ? proveedor.email : "......"}
                  </p>
                  {/* categoria */}
                  <p className="text-muted font-size-sm">
                    {proveedor.telefono !== null
                      ? proveedor.telefono
                      : "......"}
                  </p>
                  {/* empresa */}
                  <p className="text-secondary mb-1">
                    {proveedor.empresa !== null ? proveedor.empresa : "......"}
                  </p>
                  {/* direccion */}
                  <p className="text-muted font-size-sm">
                    {proveedor.direccion !== null
                      ? proveedor.direccion
                      : "......"}
                  </p>

                  {/* Eliminar y crear */}
                  <p className="text-muted font-size-sm">
                    {/* Eliminar */}
                    <Button
                      variant="danger"
                      disabled={
                        proveedor.id === null || !Boolean(sesion.isGerente)
                      }
                      onClick={() => eliminarProveedor(proveedor.id)}
                    >
                      Eliminar proveedor
                    </Button>
                    {/* Crear */}
                    <Button
                      variant="success"
                      disabled={proveedor.id === null}
                      onClick={() => abrirModal()}
                    >
                      Crear pedido
                    </Button>
                  </p>
                </div>
              </div>
            </Card>
            {/* Parte de registro de proveedor */}
            <PageRegistroProveedor
              sesion={sesion}
              obtenerDatos={obtenerDatos}
            />
          </div>

          {/* PARTE DE LA TABLA */}
          <div className="col-lg-8">
            <Card className="card">
              <Tabs
                defaultActiveKey="Proveedores"
                onSelect={limpiar}
                // id="uncontrolled-tab-example"
              >
                {/* Tabla de Proveedores */}
                <Tab eventKey={"Proveedores"} title="Proveedores">
                  <TablaProveedores
                    tablaProveedores={tablaProveedores}
                    itemsProveedor={itemsProveedor}
                    obtenerDatos={obtenerDatos}
                    setErrorMensaje={setErrorMensaje}
                    setTablaProveedores={setTablaProveedores}
                    errorMensaje={errorMensaje}
                    setProveedor={setProveedor}
                  />
                </Tab>
                {/* Tabla de Pedidos */}
                <Tab eventKey={"Pedidos"} title="Pedidos">
                  <TablaPedidos
                    tablaPedidos={tablaPedidos}
                    itemsPedido={itemsPedido}
                    obtenerDatos={obtenerDatos}
                    setErrorMensaje={setErrorMensaje}
                    setTablaPedidos={setTablaPedidos}
                    errorMensaje={errorMensaje}
                    setPedido={setPedido}
                    setDetallePedido={setDetallePedido}
                  />
                </Tab>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
      <PageRegistroPedidos
        cerrarModal={cerrarModal}
        estadoModal={estadoModal}
        id_proveedor={proveedor.id}
        id_usuario={sesion.id}
      />
    </>
  );
};

export default PageProveedores;
