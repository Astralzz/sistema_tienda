import React, { useEffect, useState } from "react";
import { Card, Button, Pagination, Tabs, Tab } from "react-bootstrap";
import {
  EyeFill,
  BoxFill,
  ListColumns,
  PencilFill,
} from "react-bootstrap-icons";
import Swal from "sweetalert2";
import PageRegistroVentas from "./PageRegistroVentas";
import {
  eliminarVentasDeLaBD,
  obtenerTablaMisVentas,
} from "../../apis/apiVentas";
import TablaMisVentas from "./TablaMisVentas";

// Tabla de usuarios
const PageProveedores = ({ titulo, sesion }) => {
  // Modal
  const [estadoModal, isEstadoModal] = useState(false);
  const cerrarModal = () => isEstadoModal(false);
  const abrirModal = () => isEstadoModal(true);
  // Tabla

  const [tablaVentas, setTablaVentas] = useState([]);
  const [errorMensaje, setErrorMensaje] = useState("");
  const [noDePaginasVentas, setNoDePaginasVentas] = useState(1);
  const [paginaActivaVentas, setPaginaActivaVentas] = useState(0);
  const [venta, setVenta] = useState({
    id: null,
    fecha: null,
    id_usuario: null,
    total: null,
    usuario: null,
    detalles: [],
  });
  const [paginas, setPaginas] = useState({
    desdeVenta: 0,
    astaVenta: 10,
  });

  //Obtener datos
  const obtenerDatos = async () => {
    const res = await obtenerTablaMisVentas(
      sesion.id,
      paginas.desdeVenta,
      paginas.astaVenta
    );

    // Error
    if (res === undefined) {
      //Damos respuesta
      setErrorMensaje("Error, No se obtuvieron los datos");
      return;
    }

    setTablaVentas(res);
    setErrorMensaje("");
    const filas = res.length > 0 ? res[0].filas_tabla : 0;
    obtenerNoDeFilasTabla(filas);
  };

  //Obtener no de filas
  const obtenerNoDeFilasTabla = (filas) => {
    setNoDePaginasVentas(Math.ceil(filas / 10));
  };

  // Pagination de ventas
  let itemsVenta = [];
  for (let i = 1; i <= noDePaginasVentas; i++) {
    itemsVenta.push(
      <Pagination.Item
        className="text-dark"
        onClick={() => {
          if (i === 1) {
            setPaginaActivaVentas(1);
            setPaginas({
              ...paginas,
              desdeVenta: 0,
              astaVenta: 10,
            });
          }

          setPaginaActivaVentas(i);
          setPaginas({
            ...paginas,
            desdeVenta: 10 * (i - 1),
            astaVenta: 10 * i,
          });
        }}
        key={i}
        active={i === paginaActivaVentas}
      >
        {i}
      </Pagination.Item>
    );
  }

  // eliminar producto
  const eliminarVenta = (id) => {
    Swal.fire({
      title: `Seguro que deseas eliminar esta venta?`,
      text: `los registros de esta venta se eliminaran para siempre!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `si, eliminar venta`,
      cancelButtonText: "cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminar(id);
      }
    });
  };

  const eliminar = async (id) => {
    //Verificamos
    const res = await eliminarVentasDeLaBD(id);

    // Error
    if (res == undefined) {
      //Damos respuesta
      Swal.fire("Error!", "No se elimino el venta, intenta mas tarde", "error");
      return;
    }

    Swal.fire("Éxito!", `Venta eliminado correctamente.`, "success");

    //Éxito
    setVenta({
      id: null,
      fecha: null,
      id_usuario: null,
      total: null,
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

  return (
    <>
      <div className="container">
        <br />
        <div className="row gutters-sm">
          {/* PARTE DERECHA */}
          <div className="col-md-4 mb-3">
            {/* Parte del venta */}
            <Card className="card mt-3">
              {/* Tarjeta */}
              <div className="d-flex flex-column align-items-center text-center">
                <br />
                <div className="mt-3">
                  {/* fecha */}
                  <h4>
                    {venta.id !== null ? venta.fecha : "Selecciona un venta"}
                  </h4>
                  {/* total */}
                  <p className="text-muted font-size-sm">
                    {venta.total !== null ? "total: $" + venta.total : "......"}
                  </p>
                  {/* usuario */}
                  <p className="text-muted font-size-sm">
                    {venta.usuario !== null ? venta.usuario : "......"}
                  </p>

                  {/* Detalles */}
                  <div className="text-muted font-size-sm">
                    {venta.detalles.map((detalle, i) => {
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

                  {/* Eliminar y crear */}
                  <p className="text-muted font-size-sm">
                    {/* Eliminar */}
                    <Button
                      variant="danger"
                      disabled={venta.id === null || !Boolean(sesion.isGerente)}
                      onClick={() => eliminarVenta(venta.id)}
                    >
                      Eliminar venta
                    </Button>
                    {/* Crear */}
                    <Button variant="success" onClick={() => abrirModal()}>
                      Crear Venta
                    </Button>
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* PARTE DE LA TABLA */}
          <div className="col-lg-8">
            <Card className="card">
              {/* Titulo */}
              <br />
              <h4>{"Mis " + titulo}</h4>
              <TablaMisVentas
                tablaVentas={tablaVentas}
                itemsVenta={itemsVenta}
                obtenerDatos={obtenerDatos}
                setErrorMensaje={setErrorMensaje}
                setTablaVentas={setTablaVentas}
                errorMensaje={errorMensaje}
                setVenta={setVenta}
              />
            </Card>
          </div>
        </div>
      </div>
      <PageRegistroVentas
        cerrarModal={cerrarModal}
        estadoModal={estadoModal}
        id_usuario={sesion.id}
      />
    </>
  );
};

export default PageProveedores;
