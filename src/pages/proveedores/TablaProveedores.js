import React, { useState } from "react";
import { Button, Card, Form, Pagination, Table } from "react-bootstrap";
import { BoxFill, EyeFill } from "react-bootstrap-icons";
import { obtenerTablaProveedoresPorNombre } from "../../apis/apiProveedores";

//Tabla de proveedores
const TablaProveedores = ({
  tablaProveedores,
  itemsProveedor,
  setTablaProveedores,
  setErrorMensaje,
  obtenerDatos,
  errorMensaje,
  setProveedor,
}) => {
  //Variables
  const [proveedorABuscar, setProveedorABuscar] = useState("");

  //Buscar producto
  const buscarProveedor = async (e) => {
    const buscar = e;
    setProveedorABuscar(buscar);

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
    const res = await obtenerTablaProveedoresPorNombre(buscar, 10);

    // Error
    if (res == undefined) {
      //Damos respuesta
      setErrorMensaje("No se encontraron datos de " + buscar);
      return;
    }

    //Éxito
    setTablaProveedores(res);
    setErrorMensaje("");
  };

  return (
    <Card.Body className="card-body">
      <h5 className="text-danger">{errorMensaje}</h5>
      {/* Buscar proveedor */}
      <Form.Group className="mt-3">
        <Form.Control
          type="search"
          className="form-control"
          placeholder="buscar proveedor por nombre"
          maxLength={60}
          value={proveedorABuscar}
          onChange={(e) => buscarProveedor(e.target.value)}
        />
      </Form.Group>
      <hr />
      {/* Tabla de productos */}
      <Table striped bordered hover id="tableProductos">
        <thead>
          <tr>
            <th>#</th>
            <th>nombre</th>
            <th>email</th>
            <th>telefono</th>
            <th>empresa</th>
            <th>pedido</th>
          </tr>
        </thead>
        <tbody>
          {tablaProveedores.map((dato, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{dato.nombre}</td>
                <td>{dato.email}</td>
                <td>{dato.telefono}</td>
                <td>{dato.empresa}</td>
                <td>
                  {/* Boton de observar */}
                  <Button
                    variant="dark"
                    onClick={() => {
                      setProveedor({
                        id: dato.id,
                        nombre: dato.nombre,
                        email: dato.email,
                        telefono: dato.telefono,
                        direccion: dato.direccion,
                        empresa: dato.empresa,
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
        <Pagination className="pagination-bg-dark">{itemsProveedor}</Pagination>
      </div>
    </Card.Body>
  );
};

export default TablaProveedores;
