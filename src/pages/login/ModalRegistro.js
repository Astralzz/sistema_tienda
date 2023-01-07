import React, { useEffect, useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { EyeFill } from "react-bootstrap-icons";

// Registro
const ModalRegistro = ({ estadoModal, cerrarModal }) => {
  // Referencia
  const refFormularioRegistro = useRef(null);

  // Variables
  const [nombre, setNombre] = useState("");
  const [apellidoMa, setApellidoMa] = useState("");
  const [apellidoPa, setApellidoPa] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");

  // Error
  const [error, setError] = useState("");

  // Limpiar
  const limpiarDatos = () => {
    setNombre("");
    setApellidoPa("");
    setApellidoMa("");
    setEmail("");
    setTelefono("");
  };

  // Registrar usuario
  const registrarUsuario = () => {
    alert("Exito");
  };

  // Validar imagen
  const validarImagen = (e) => {
    // Obtenemos el archivo seleccionado
    const file = e.target.files[0];

    // Validamos el tipo de archivo (debe ser una imagen)
    if (!file.type.startsWith("image/")) {
      // Mostramos un mensaje de error
      setError("Por favor selecciona una imagen");
      return;
    }

    // Validamos el tamaño del archivo (debe ser menor a 2 MB)
    if (file.size > 2097152) {
      // Mostramos un mensaje de error
      setError("El tamaño de la imagen debe ser menor a 2 MB");
      return;
    }

    // Si el archivo cumple con los requisitos,
    //podemos hacer algo con él (por ejemplo, subirlo a un servidor)
  };

  // Vemos estado
  useEffect(() => {
    limpiarDatos();
  }, [estadoModal]);

  return (
    <Modal show={estadoModal} onHide={cerrarModal}>
      {/* Encabezado */}
      <Modal.Header closeButton>
        {/* Titulo */}
        <Modal.Title>Registro</Modal.Title>
      </Modal.Header>

      {/* Formulario */}
      <Form ref={refFormularioRegistro} onSubmit={registrarUsuario}>
        {/* Cuerpo */}
        <Modal.Body>
          {/* Nombre y apellidos */}
          <InputGroup className="mb-3">
            <InputGroup.Text id="areaNombre">@</InputGroup.Text>
            <Form.Control
              placeholder="nombre(s)"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              name="nombre"
              aria-label="Username"
              aria-describedby="areaNombre"
            />
            <Form.Control
              placeholder="apellido paterno"
              value={apellidoPa}
              onChange={(e) => setApellidoPa(e.target.value)}
              name="apellido_pa"
              aria-label="Username"
              aria-describedby="areaNombre"
            />
            <Form.Control
              placeholder="apellido materno"
              value={apellidoMa}
              onChange={(e) => setApellidoMa(e.target.value)}
              name="apellido_ma"
              aria-label="Username"
              aria-describedby="areaNombre"
            />
          </InputGroup>
          {/* Email y telefono */}
          <InputGroup className="mb-3">
            {/* Email */}
            <InputGroup.Text id="areaEmail">@</InputGroup.Text>
            <Form.Control
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              type="email"
              minLength={5}
              maxLength={35}
              aria-label="email"
              aria-describedby="areaEmail"
            />
            {/* Telefono */}
            <InputGroup.Text id="areaTelefono">
              <EyeFill/>
            </InputGroup.Text>
            <Form.Control
              placeholder="telefono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              name="telefono"
              type="number"
              minLength={10}
              maxLength={10}
              aria-label="telefono"
              aria-describedby="areaTelefono"
            />
          </InputGroup>
          {/* Imagen */}
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Control
              name="imagen"
              type="file"
              accept="image/*"
              size={2097152}
              label="Seleccionar Imagen"
              onChange={validarImagen}
            />
          </Form.Group>
        </Modal.Body>

        {/* Pie de pagina */}
        <Modal.Footer>
          {/* Boton cerrar */}
          <Button variant="secondary" type="button" onClick={cerrarModal}>
            Cancelar
          </Button>
          {/* Boton Aceptar */}
          <Button variant="dark" type="submit">
            Registrar usuario
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ModalRegistro;
