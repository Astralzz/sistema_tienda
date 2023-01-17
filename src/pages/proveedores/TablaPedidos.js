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
import { obtenerTablaPedidosPorNombre } from "../../apis/apiPedidos";

//Tabla de pedidos
const TablaPedidos = ({
  tablaPedidos,
  itemsPedido,
  setTablaPedidos,
  setErrorMensaje,
  obtenerDatos,
  errorMensaje,
  setPedido,
  setDetallePedido,
}) => {
  //Variables
  const [pedidoABuscar, setPedidoABuscar] = useState(new Date());

  //Buscar pedido
  const buscarPedido = async (e) => {
    const buscar = e.toISOString().substr(0, 10);
    setPedidoABuscar(buscar);

    //Verificamos
    const res = await obtenerTablaPedidosPorNombre(buscar, 10);

    // Error
    if (res == undefined) {
      //Damos respuesta
      setErrorMensaje("No se encontraron datos de " + buscar);
      return;
    }

    //Éxito
    setTablaPedidos(res);
    setErrorMensaje("");
  };

  return (
    <Card.Body className="card-body">
      <h5 className="text-danger">{errorMensaje}</h5>
      {/* Buscar pedido */}
      <Form.Group className="mt-3">
        <InputGroup>
          <Form.Control
            type="date"
            className="form-control"
            placeholder="buscar pedido por fecha"
            maxLength={60}
            value={pedidoABuscar}
            onChange={(e) => buscarPedido(new Date(e.target.value))}
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
      {/* Tabla de pedidos */}
      <Table striped bordered hover id="tablePedidos">
        <thead>
          <tr>
            <th>#</th>
            <th>fecha</th>
            <th>proveedor</th>
            <th>usuario</th>
            <th>estado</th>
            <th>ver</th>
          </tr>
        </thead>
        <tbody>
          {tablaPedidos.map((dato, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{dato.fecha}</td>
                <td>{dato.proveedor.nombre}</td>
                <td>{dato.usuario.nombre + " " + dato.usuario.apellidos}</td>
                <td>{dato.estado}</td>
                <td>
                  {/* Boton de observar */}
                  <Button
                    variant="dark"
                    onClick={() => {
                      setPedido({
                        id: dato.id,
                        fecha: dato.fecha,
                        id_proveedor: dato.id_proveedor,
                        id_usuario: dato.id_usuario,
                        estado: dato.estado,
                        total: dato.total,
                        proveedor: dato.proveedor.nombre,
                        usuario:
                          dato.usuario.nombre + " " + dato.usuario.apellidos,
                        detalles: dato.detalles,
                      });
                      setDetallePedido({
                        id_producto: dato.detalles[0].id_producto,
                        cantidad: dato.detalles[0].cantidad,
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
        <Pagination className="pagination-bg-dark">{itemsPedido}</Pagination>
      </div>
    </Card.Body>
  );
};

export default TablaPedidos;
