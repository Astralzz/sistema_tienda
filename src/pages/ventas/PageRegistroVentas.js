import React, { useRef, useState } from "react";
import {
  Button,
  Card,
  Form,
  InputGroup,
  ListGroup,
  Table,
} from "react-bootstrap";
import { EyeFill, Search } from "react-bootstrap-icons";
import Swal from "sweetalert2";
import { crearCategoria } from "../../apis/apiCategorias";
import {
  obtenerListaProductosPorNombre,
  obtenerTablaProductosPorNombre,
} from "../../apis/apiProductos";

//Ventas
const PageRegistroVentas = ({ sesion }) => {
  //Formulario
  const refFormularioCategoria = useRef(null);

  //Variables
  const [producto, setProducto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [errorMensaje, setErrorMensaje] = useState("");
  const [errorMensajeBusqueda, setErrorMensajeBusqueda] = useState(null);
  const [listaProductos, setListaProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(0);
  const [validaciones, setValidaciones] = useState({
    producto: false,
  });

  // Verificar
  const verificarDatos = () => {
    //Nombre
    if (!validaciones.producto) {
      return false;
    }

    return true;
  };

  //Validar producto
  const validarProducto = (e) => {
    const producto = e;
    setProducto(producto);

    const productoRegex = /^[A-Za-z][A-Za-z\s]*$/;

    //Éxito
    if (productoRegex.test(producto) && producto.length > 2) {
      setValidaciones({
        ...validaciones,
        producto: true,
      });
      return;
    }

    setValidaciones({
      ...validaciones,
      producto: false,
    });
  };

  // Crear categoria
  const guardarCategoria = async (event) => {
    event.preventDefault();

    //Obtenemos datos
    const formData = new FormData(refFormularioCategoria.current);

    // //Verificamos
    // const res = await crearCategoria(formData);

    // // Validamos
    // if (res) {
    //   //Damos respuesta
    //   Swal.fire({
    //     icon: "success",
    //     title: "Éxito...",
    //     text: "LA categoria se creo correctamente!",
    //   });
    //   setProducto("");
    //   setDescripcion("");
    //   setValidaciones({
    //     ...validaciones,
    //     producto: false,
    //   });
    //   return;
    // }

    // //Fracaso
    // Swal.fire({
    //   icon: "error",
    //   title: "Error...",
    //   text: "No se creo la categoria",
    // });
  };

  // Buscar producto
  const buscarProducto = async () => {
    //Verificamos
    const res = await obtenerListaProductosPorNombre(producto);

    // Error
    if (res == undefined) {
      //Damos respuesta
      setErrorMensajeBusqueda("Error, No se obtuvo respuesta");
      return;
    }

    // Error
    if (res.length === 0) {
      //Damos respuesta
      setListaProductos(res);
      setErrorMensajeBusqueda("Sin resultados");
      return;
    }

    //Éxito
    setListaProductos(res);
    setErrorMensajeBusqueda(null);
  };

  //Lista de productos
  const ListaDeProductos = () => {
    return (
      <ListGroup className="mb-3">
        {errorMensajeBusqueda !== null ? (
          <p className="text-danger">{errorMensajeBusqueda}</p>
        ) : (
          listaProductos.map((p, i) => {
            return (
              <ListGroup.Item
                key={i}
                active={productoSeleccionado === i.id}
                action
                type="button"
                variant="dark"
                onClick={() => setProductoSeleccionado(i.id)}
              >
                {p.nombre}
              </ListGroup.Item>
            );
          })
        )}
      </ListGroup>
    );
  };

  return (
    <Card className="card mt-3">
      <Card.Body className="card-body">
        <div className="mt-3">
          <h3>Nueva venta</h3>
          <Form
            method="post"
            ref={refFormularioCategoria}
            onSubmit={guardarCategoria}
          >
            {/* Producto */}
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="buscar producto"
                value={producto}
                onChange={(e) => validarProducto(e.target.value)}
                name="producto"
                aria-label="Username"
                isValid={validaciones.producto && producto !== ""}
                isInvalid={!validaciones.producto && producto !== ""}
                type="text"
                maxLength={150}
                minLength={2}
              />
              <Button
                disabled={!validaciones.producto}
                variant="dark"
                onClick={() => buscarProducto()}
              >
                <Search />
              </Button>
            </InputGroup>
            {/* lista de producto */}
            <ListaDeProductos />
            {/* Descripcion */}
            <InputGroup className="mb-3">
              <Form.Control
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                disabled={!Boolean(sesion.isGerente)}
                placeholder="Descripcion"
                name="descripcion"
                aria-label="categoria"
                as={"textarea"}
                rows={3}
                maxLength={150}
                minLength={2}
              />
            </InputGroup>
            {/* Boton de crear */}
            <Button
              disabled={!verificarDatos()}
              variant="success"
              type="submit"
            >
              crear categoria
            </Button>
          </Form>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PageRegistroVentas;
