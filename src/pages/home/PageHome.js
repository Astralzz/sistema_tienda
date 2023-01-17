import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { obtenerTablaVentas } from "../../apis/apiVentas";
import TablaVentas from "./TablaVentas";

//Rutas
const PageHome = ({ sesion }) => {
  //Tabla
  const [tablaVentas, setTablaVentas] = useState([]);
  const [paginas, setPaginas] = useState({
    desde: 0,
    asta: 40,
  });

  //Obtener datos
  const obtenerDatos = async () => {
    const res = await obtenerTablaVentas(paginas.desde, paginas.asta);

    // Error
    if (res === undefined) {
      //Damos respuesta
      // setErrorMensaje("Error, No se obtuvieron los datos");
      return;
    }

    setTablaVentas(res);
    // setErrorMensaje("");
    const filas = res.length > 0 ? res[0].filas_tabla : 0;
    // obtenerNoDeFilasTabla(filas);
  };

  useEffect(() => {
    if (sesion.isSesionIniciada) {
      obtenerDatos();
      // setErrorMensaje("");
    }
  }, []);
  useEffect(() => {
    if (sesion.isSesionIniciada) {
      obtenerDatos();
      // setErrorMensaje("");
    }
  }, [paginas]);

  return (
    <Container className="container">
      <div className="chartjs-size-monitor">
        <div className="chartjs-size-monitor-expand">
          <div className=""></div>
        </div>
        <div className="chartjs-size-monitor-shrink">
          <div className=""></div>
        </div>
      </div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Inicio</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
            <button type="button" className="btn btn-sm btn-outline-secondary">
              Guardar
            </button>
            <button type="button" className="btn btn-sm btn-outline-secondary">
              Exportar
            </button>
          </div>
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary dropdown-toggle"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke={"currentColor"}
              strokeWidth={2}
              strokeLinecap={"inherit"}
              strokeLinejoin={"round"}
              className="feather feather-calendar align-text-bottom"
              aria-hidden="true"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            Excel
          </button>
        </div>
      </div>

      <canvas
        className="my-4 w-100 chartjs-render-monitor"
        id="myChart"
        width="544"
        height="229"
        style={{
          border: "1px solid black",
          display: "block",
          height: "254px",
          width: "602px",
        }}
      ></canvas>

      <h2>Ventas totales</h2>
      <TablaVentas tablaVentas={tablaVentas} />
    </Container>
  );
};

export default PageHome;
