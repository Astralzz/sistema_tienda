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
import { EyeFill, BoxFill, CurrencyDollar } from "react-bootstrap-icons";
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

// Tabla de usuarios
const PageProveedores = ({ titulo, sesion }) => {
  // Modal
  const [estadoModal, isEstadoModal] = useState(false);
  const cerrarModal = () => isEstadoModal(false);
  const abrirModal = () => isEstadoModal(true);
  // Tabla
  const [tablaProveedores, setTablaProveedores] = useState([]);
  const [errorMensaje, setErrorMensaje] = useState("");
  const [noDePaginasProveedores, setNoDePaginasProveedores] = useState(1);
  const [paginaActivaProveedores, setPaginaActivaProveedores] = useState(0);
  const [proveedor, setProveedor] = useState({
    id: null,
    nombre: null,
    email: null,
    telefono: null,
    direccion: null,
    empresa: null,
  });
  const [paginas, setPaginas] = useState({
    desdeProveedor: 0,
    astaProveedor: 10,
  });

  //Obtener datos
  const obtenerDatos = async () => {
    //Verificamos
    const res = await obtenerTablaProveedores(
      paginas.desdeProveedor,
      paginas.astaProveedor
    );

    // Error
    if (res == undefined) {
      //Damos respuesta
      setErrorMensaje("Error, No se obtuvieron los datos");
      return;
    }

    //Éxito
    setTablaProveedores(res);
    setErrorMensaje("");
    await obtenerNoDeFilasTabla();
  };

  //Obtener no de filas
  const obtenerNoDeFilasTabla = async () => {
    const filas = await noDeFilasListaProveedor();

    setNoDePaginasProveedores(Math.ceil(filas / 10));
  };

  // Pagination
  let itemsProveedor = [];
  for (let i = 1; i <= noDePaginasProveedores; i++) {
    itemsProveedor.push(
      <Pagination.Item
        className="text-dark"
        onClick={() => {
          if (i === 1) {
            setPaginaActivaProveedores(1);
            setPaginas({
              desdeProveedor: 0,
              astaProveedor: 10,
            });
          }

          setPaginaActivaProveedores(i);
          setPaginas({
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

  // Desactivar producto
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

  // Desactivar
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
            <PageRegistroProveedor sesion={sesion} />
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
