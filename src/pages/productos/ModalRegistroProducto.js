import React, { useEffect, useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Image from "react-bootstrap/Image";
import FondoCaja from "../../img/iconoCaja.png";
import Swal from "sweetalert2";
import {
  CurrencyDollar,
  ListOl,
  SortNumericDown,
  Boxes,
} from "react-bootstrap-icons";
import {
  buscarEmailUsuario,
  crearUsuario,
  verificarKeyAdmin,
} from "../../apis/apiUsuario";
import { obtenerListaNombresCategorias } from "../../apis/apiCategorias";
import { crearProducto } from "../../apis/apiProductos";

let errorMensaje = null;

// Registro de un producto
const ModalRegistroProducto = ({ estadoModal, cerrarModal }) => {
  // Referencia
  const refFormularioProducto = useRef(null);

  // Variables
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState(0);
  const [precio, setPrecio] = useState(0);
  const [cantidad, setCantidad] = useState(0);
  const [rutaImagen, setRutaImagen] = useState(null);
  const [listaCategoria, setListaCategorias] = useState([]);

  // Error
  const setErrorMensaje = (e) => {
    errorMensaje = e;
  };

  // Referencia imagen
  const refImagenProducto = useRef(null);

  //Obtener datos
  const obtenerListaNombres = async () => {
    //Verificamos
    const res = await obtenerListaNombresCategorias();

    // Error
    if (res == undefined) {
      //Damos respuesta
      setErrorMensaje("Error, No se obtuvo la lista de las categorias");
      return;
    }

    // Éxito
    setListaCategorias(res);
  };

  // Limpiar
  const limpiarDatos = () => {
    setNombre("");
    setPrecio("");
    setCantidad("");
    setDescripcion("");
    setCategoria(0);
    setErrorMensaje(null);
    setRutaImagen(null);

    if (refImagenProducto.current) {
      refImagenProducto.current.value = "";
    }
  };

  // Registrar usuario
  const prepararRegistro = async (event) => {
    event.preventDefault();
    //Obtenemos datos
    const formData = new FormData(refFormularioProducto.current);

    //Imagen
    if (rutaImagen === null) {
      //Eliminamos campo img
      formData.delete("imagen");
    }

    await registrar(formData);
  };

  // Registrar
  const registrar = async (producto) => {
    //Verificamos
    const res = await crearProducto(producto);

    // Validamos
    if (res) {
      //Damos respuesta
      Swal.fire("Éxito!", "El producto se creo correctamente!", "success");
      cerrarModal();
      return;
    }

    //Fracaso
    Swal.fire({
      icon: "error",
      title: "Error...",
      text: "No se creo el producto!",
    });
  };

  // Validar imagen
  const validarImagen = (e) => {
    // Existe
    if (e.target.files[0]) {
      // Tine mas de 0
      if (e.target.files.length > 0) {
        // Obtenemos el archivo seleccionado
        const file = e.target.files[0];

        // Validamos el tipo de archivo (debe ser una imagen)
        if (!file.type.startsWith("image/")) {
          // Mostramos un mensaje de error
          setErrorMensaje("Por favor selecciona una imagen");
          setRutaImagen(null);
          return;
        }

        // Validamos el tamaño del archivo (debe ser menor a 2 MB)
        if (file.size > 2097152) {
          // Mostramos un mensaje de error
          setErrorMensaje("El tamaño de la imagen debe ser menor a 2 MB");
          setRutaImagen(null);
          return;
        }

        // Si el archivo cumple con los requisitos,
        setErrorMensaje(null);
        //Ponemos ruta
        setRutaImagen(URL.createObjectURL(file));
        return;
        //podemos hacer algo con él (por ejemplo, subirlo a un servidor)
      }
    }
    setRutaImagen(null);
  };

  // Validar usuario
  const validarDatos = () => {
    //Vacíos
    if (nombre.length === 0 && precio.length === 0 && cantidad.length === 0) {
      setErrorMensaje(null);
      return false;
    }

    //Nombre
    const nombreRegex = /^(?!\s)[A-Za-z0-9.\s]{2,130}(?<!\s)$/;
    if (!nombreRegex.test(nombre)) {
      setErrorMensaje("Nombre invalido");
      return false;
    }

    // Precio
    const precioRegex = /^(?!\.)[0-9.]{1,9}$/;
    if (!precioRegex.test(precio)) {
      setErrorMensaje("Precio inválido");
      return false;
    }

    // Cantidad
    const cantidadRegex = /^[0-9]{1,5}$/;
    if (!cantidadRegex.test(cantidad)) {
      setErrorMensaje("Cantidad inválida");
      return false;
    }

    // Categoria
    if (categoria === 0) {
      setErrorMensaje("Selecciona una categoria");
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
    obtenerListaNombres();
  }, [estadoModal]);

  return (
    <Modal show={estadoModal} onHide={cerrarModal}>
      {/* Encabezado */}
      <Modal.Header closeButton>
        {/* Titulo */}
        <Modal.Title>Registrar producto</Modal.Title>
      </Modal.Header>

      {/* Formulario */}
      <Form
        encType="multipart/form-data"
        method="post"
        ref={refFormularioProducto}
        onSubmit={prepararRegistro}
      >
        {/* Cuerpo */}
        <Modal.Body>
          {/* Nombre */}
          <InputGroup className="mb-3">
            <InputGroup.Text id="areaNombre">
              <Boxes />
            </InputGroup.Text>
            <Form.Control
              placeholder="nombre del producto"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              name="nombre"
              aria-label="nombre"
              aria-describedby="areaNombre"
              type="text"
              maxLength={120}
              minLength={3}
            />
          </InputGroup>
          {/* Precio y cantidad */}
          <InputGroup className="mb-3">
            {/* Precio */}
            <InputGroup.Text id="areaPrecio">
              <CurrencyDollar />
            </InputGroup.Text>
            <Form.Control
              placeholder="precio por pieza"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              maxLength={8}
              name="precio"
              type="number"
              aria-label="areaPrecio"
              aria-describedby="areaPrecio"
            />
            {/* Cantidad */}
            <InputGroup.Text id="areaCantidad">
              <SortNumericDown />
            </InputGroup.Text>
            <Form.Control
              placeholder="cantidad"
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              name="cantidad"
              maxLength={4}
              aria-label="cantidad"
              aria-describedby="areaCantidad"
            />
          </InputGroup>
          {/* Imagen */}
          <Form.Group controlId="formFile" className="mb-3">
            <InputGroup>
              <InputGroup.Text id="areaImagen">
                <Image
                  src={rutaImagen === null ? FondoCaja : rutaImagen}
                  roundedCircle
                  height={23}
                />
              </InputGroup.Text>
              <Form.Control
                name="imagen"
                type="file"
                accept="image/*"
                size={35}
                label="Seleccionar Imagen"
                aria-describedby="areaImagen"
                ref={refImagenProducto}
                onChange={validarImagen}
              />
            </InputGroup>
          </Form.Group>
          {/* Categoria */}
          <InputGroup className="mb-3">
            <InputGroup.Text id="areaPrecio">
              <ListOl />
            </InputGroup.Text>
            <Form.Select
              value={categoria}
              onChange={(e) => setCategoria(parseInt(e.target.value))}
              name="categoria"
              aria-label="Categoria"
            >
              <option value={0}>Selecciona una categoria</option>
              {listaCategoria.map((cat, i) => {
                return (
                  <option key={i} value={cat.id}>
                    {cat.nombre}
                  </option>
                );
              })}
            </Form.Select>
          </InputGroup>
          {/* Descripcion */}
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              as="textarea"
              placeholder="descripcion del producto"
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
            Registrar usuario
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ModalRegistroProducto;
