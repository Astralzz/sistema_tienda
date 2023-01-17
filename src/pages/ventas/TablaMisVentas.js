import React, { useState } from "react";
import {
  Button,
  Card,
  Form,
  InputGroup,
  Pagination,
  Table,
} from "react-bootstrap";
import { BoxFill, EyeFill, XLg } from "react-bootstrap-icons";
import { obtenerTablaVentasPorFecha } from "../../apis/apiVentas";

//Tabla de ventas
const TablaMisVentas = ({
  tablaVentas,
  itemsVenta,
  setTablaVentas,
  setErrorMensaje,
  obtenerDatos,
  errorMensaje,
  setVenta,
}) => {
  //Variables
  const [ventaABuscar, setVentaABuscar] = useState(new Date());

  //Buscar venta
  const buscarVenta = async (e) => {
    const buscar = e.toISOString().substr(0, 10);
    setVentaABuscar(buscar);

    //Verificamos
    const res = await obtenerTablaVentasPorFecha(buscar, 10);

    // Error
    if (res == undefined) {
      //Damos respuesta
      setErrorMensaje("No se encontraron datos de " + buscar);
      return;
    }

    //Éxito
    setTablaVentas(res);
    setErrorMensaje("");
  };

  return (
    <Card.Body className="card-body">
      <h5 hidden={errorMensaje === ""} className="text-danger">
        {errorMensaje}
      </h5>
      {/* Buscar venta */}
      <Form.Group className="mt-3">
        <InputGroup>
          <Form.Control
            type="date"
            className="form-control"
            placeholder="buscar venta por fecha"
            maxLength={60}
            value={ventaABuscar}
            onChange={(e) => buscarVenta(new Date(e.target.value))}
          />
          <Button
            variant="dark"
            onClick={() => {
              obtenerDatos();
              setErrorMensaje("");
            }}
          >
            <XLg />
          </Button>
        </InputGroup>
      </Form.Group>
      <hr />
      {/* Tabla de ventas */}
      <Table striped bordered hover id="tableVentas">
        <thead>
          <tr>
            <th>#</th>
            <th>fecha</th>
            <th>producto</th>
            <th>usuario</th>
            <th>total</th>
            <th>ver</th>
          </tr>
        </thead>
        <tbody>
          {tablaVentas.map((dato, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{dato.fecha}</td>
                <td>{dato.detalles[0].producto.nombre}</td>
                <td>{dato.usuario.nombre + " " + dato.usuario.apellidos}</td>
                <td>{dato.total}</td>
                <td>
                  {/* Boton de observar */}
                  <Button
                    variant="dark"
                    onClick={() => {
                      setVenta({
                        id: dato.id,
                        fecha: dato.fecha,
                        id_usuario: dato.id_usuario,
                        total: dato.total,
                        usuario:
                          dato.usuario.nombre + " " + dato.usuario.apellidos,
                        detalles: dato.detalles,
                      });
                    }}
                  >
                    <BoxFill />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {/* Pagination */}
      <div className="text-dark">
        <Pagination className="pagination-bg-dark">{itemsVenta}</Pagination>
      </div>
    </Card.Body>
  );
};

export default TablaMisVentas;
