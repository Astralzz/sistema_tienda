import React, { useEffect, useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Swal from "sweetalert2";
import {
  CurrencyDollar,
  ListOl,
  SortNumericDown,
  Boxes,
  Calendar,
  CalendarFill,
  CalendarDate,
  BoxFill,
  Search,
} from "react-bootstrap-icons";
import { obtenerListaProductosPorNombre } from "../../apis/apiProductos";
import { ListGroup } from "react-bootstrap";
import { crearPedido } from "../../apis/apiPedidos";

let errorMensaje = null;

// Registro de un pedido
const PageRegistroPedidos = ({
  estadoModal,
  cerrarModal,
  id_usuario,
  id_proveedor,
}) => {
  // Referencia
  const refFormularioPedido = useRef(null);

  // Variables
  const [descripcion, setDescripcion] = useState("");
  const [productoBuscar, setProductoBuscar] = useState("");
  const [fecha, setFecha] = useState(new Date());
  const [cantidad, setCantidad] = useState(0);
  const [total, setTotal] = useState(0);
  const [listaProductos, setListaProductos] = useState([]);
  const [errorMensajeBusqueda, setErrorMensajeBusqueda] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState(0);
  const [precioSeleccionado, setPrecioSeleccionado] = useState(0);
  const [validaciones, setValidaciones] = useState({
    producto: false,
  });

  // Error
  const setErrorMensaje = (e) => {
    errorMensaje = e;
  };

  // Limpiar
  const limpiarDatos = () => {
    setCantidad(0);
    setTotal(0);
    setDescripcion("");
    setProductoBuscar("");
    setFecha(new Date());
    setErrorMensaje(null);
    setProductoSeleccionado(0);
    setErrorMensajeBusqueda(null);
    setListaProductos([]);
    setValidaciones({ producto: false });
  };

  // Registrar usuario
  const prepararRegistro = async (event) => {
    event.preventDefault();
    //Obtenemos datos
    const formData = new FormData(refFormularioPedido.current);

    formData.append("id_usuario", id_usuario);
    formData.append("id_proveedor", id_proveedor);
    formData.append("id_producto", productoSeleccionado);
    formData.append("total", total);

    await registrar(formData);
  };

  // Registrar
  const registrar = async (data) => {
    //Verificamos
    const res = await crearPedido(data);
    // Validamos
    if (res) {
      //Damos respuesta
      Swal.fire("Éxito!", "El pedido se creo correctamente!", "success");
      cerrarModal();
      return;
    }
    //Fracaso
    Swal.fire({
      icon: "error",
      title: "Error...",
      text: "No se creo el pedido!",
    });
  };

  // Validar usuario
  const validarDatos = () => {
    //Seleccionado
    if (productoSeleccionado === 0) {
      return false;
    }

    //Seleccionado
    if (cantidad === 0) {
      return false;
    }

    //Seleccionado
    if (total === 0) {
      return false;
    }

    //Descripcion
    if (descripcion.length !== 0) {
      const descripcionRegex = /^(?!\s)[\u0020-\u00FFA-Za-z0-9.\s]{2,130}(?<!\s)$/;
      if (!descripcionRegex.test(descripcion)) {
        setErrorMensaje("Descripcion invalida");
        return false;
      }
    }

    //Éxito
    setErrorMensaje(null);
    return true;
  };

  // Vemos estado
  useEffect(() => {
    limpiarDatos();
  }, [estadoModal]);

  //Validar producto
  const validarProducto = (e) => {
    const producto = e;
    setProductoBuscar(producto);

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
    setErrorMensajeBusqueda(null);
  };

  // Buscar producto
  const buscarProducto = async () => {
    //Verificamos
    const res = await obtenerListaProductosPorNombre(productoBuscar);

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
                active={productoSeleccionado === p.id}
                action
                type="button"
                variant="dark"
                onClick={() => {
                  setProductoSeleccionado(p.id);
                  setPrecioSeleccionado(parseFloat(p.precio));
                  setCantidad(0);
                  setTotal(0);
                }}
              >
                {p.nombre}
              </ListGroup.Item>
            );
          })
        )}
      </ListGroup>
    );
  };

  //Actualizar precio
  const actualizarPrecio = (e) => {
    setCantidad(e);

    //verificamos
    if (precioSeleccionado === 0 || e === 0) {
      return;
    }

    //Actualizamos
    const total = ((e * precioSeleccionado) / 10) * 9;
    setTotal(total);
  };

  return (
    <Modal show={estadoModal} onHide={cerrarModal}>
      {/* Encabezado */}
      <Modal.Header closeButton>
        {/* Titulo */}
        <Modal.Title>Nuevo pedido</Modal.Title>
      </Modal.Header>

      {/* Formulario */}
      <Form method="post" ref={refFormularioPedido} onSubmit={prepararRegistro}>
        {/* Cuerpo */}
        <Modal.Body>
          {/*  buscar */}
          <InputGroup className="mb-3">
            {/* buscar */}
            <InputGroup.Text id="areaBuscar">
              <BoxFill />
            </InputGroup.Text>
            <Form.Control
              placeholder="buscar producto"
              value={productoBuscar}
              onChange={(e) => validarProducto(e.target.value)}
              maxLength={80}
              type="search"
              aria-label="areaBuscar"
              aria-describedby="areaBuscar"
              onClick={() => {
                setListaProductos([]);
                setErrorMensajeBusqueda(null);
                setProductoSeleccionado(0);
                setCantidad(0);
                setTotal(0);
              }}
            />
            <Button
              type="button"
              disabled={!validaciones.producto}
              variant="dark"
              onClick={() => buscarProducto()}
            >
              <Search />
            </Button>
          </InputGroup>
          {/* Lista */}
          <InputGroup
            hidden={
              listaProductos.length === 0 && errorMensajeBusqueda === null
            }
            className="mb-3"
          >
            {/* lista de producto */}
            <ListaDeProductos />
          </InputGroup>
          {/* Cantidad, fecha y cantidad */}
          <InputGroup className="mb-3">
            {/* Cantidad */}
            <InputGroup.Text id="areaCantidad">
              <SortNumericDown />
            </InputGroup.Text>
            <Form.Control
              placeholder="cantidad"
              disabled={productoSeleccionado === 0}
              value={cantidad}
              onChange={(e) => actualizarPrecio(e.target.value)}
              maxLength={8}
              name="cantidad"
              type="number"
              aria-label="areaCantidad"
              aria-describedby="areaCantidad"
            />
            {/* Fecha */}
            <InputGroup.Text id="areaFecha">
              <CalendarDate />
            </InputGroup.Text>
            <Form.Control
              placeholder="fecha"
              type="date"
              value={fecha.toISOString().substr(0, 10)}
              onChange={(e) => setFecha(new Date(e.target.value))}
              name="fecha"
              aria-label="fecha"
              aria-describedby="areaFecha"
            />
            {/* Total */}
            <InputGroup.Text id="areaTotal">
              <CurrencyDollar />
            </InputGroup.Text>
            <Form.Control
              placeholder="total"
              disabled
              type="number"
              value={total}
              aria-label="total"
              aria-describedby="areaTotal"
            />
          </InputGroup>
          {/* Descripcion */}
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              as="textarea"
              placeholder="descripcion de pedido"
              name="descripcion"
              rows={4}
            />
          </Form.Group>
        </Modal.Body>

        {/* Pie de pagina */}
        <Modal.Footer>
          {/* Texto de error */}
          <p hidden={errorMensaje === null} className="text-danger">
            {errorMensaje + "    "}
          </p>

          {/* Boton cerrar */}
          <Button variant="secondary" type="button" onClick={cerrarModal}>
            Cancelar
          </Button>
          {/* Boton Aceptar */}
          <Button variant="dark" type="submit" disabled={!validarDatos()}>
            Realizar pedido
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default PageRegistroPedidos;
