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
import { crearProveedor } from "../../apis/apiProveedores";

//Ventas
const PageRegistroProveedor = ({ sesion }) => {
  //Formulario
  const refFormularioProveedor = useRef(null);

  //Variables
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [validaciones, setValidaciones] = useState({
    nombre: false,
    email: false,
    telefono: false,
  });

  // Verificar
  const verificarDatos = () => {
    //Nombre
    if (!validaciones.nombre) {
      return false;
    }

    //Email
    if (!validaciones.email) {
      return false;
    }

    //Telefono
    if (!validaciones.telefono) {
      return false;
    }

    return true;
  };

  //Validar nombre
  const validarNombre = (e) => {
    const nombre = e;
    setNombre(nombre);

    const nombreRegex = /^[A-Za-z][A-Za-z\s]*$/;

    //Éxito
    if (nombreRegex.test(nombre) && nombre.length > 2) {
      setValidaciones({
        ...validaciones,
        nombre: true,
      });
      return;
    }

    setValidaciones({
      ...validaciones,
      nombre: false,
    });
  };

  //Validar email
  const validarEmail = (e) => {
    const email = e;
    setEmail(email);

    const emailRegex = /^[\w\.\+\-]+@[\w]+\.[a-z]{2,3}$/;

    //Éxito
    if (emailRegex.test(email) && email.length > 2) {
      setValidaciones({
        ...validaciones,
        email: true,
      });
      return;
    }

    setValidaciones({
      ...validaciones,
      email: false,
    });
  };

  //Validar telefono
  const validarTelefono = (e) => {
    const telefono = e;
    setTelefono(telefono);

    const telefonoRegex = /^\d{10}$/;

    //Éxito
    if (telefonoRegex.test(telefono) && telefono.length > 2) {
      setValidaciones({
        ...validaciones,
        telefono: true,
      });
      return;
    }

    setValidaciones({
      ...validaciones,
      telefono: false,
    });
  };

  // Crear categoria
  const guardarProveedor = async (event) => {
    event.preventDefault();

    //Obtenemos datos
    const formData = new FormData(refFormularioProveedor.current);

    //Verificamos
    const res = await crearProveedor(formData);

    // Validamos
    if (res) {
      //Damos respuesta
      Swal.fire({
        icon: "success",
        title: "Éxito...",
        text: "El proveedor se creo correctamente!",
      });
      setNombre("");
      setEmail("");
      setTelefono("");
      setDireccion("");
      setEmpresa("");
      setValidaciones({
        ...validaciones,
        nombre: false,
      });
      return;
    }

    //Fracaso
    Swal.fire({
      icon: "error",
      title: "Error...",
      text: "No se creo el proveedor",
    });
  };

  return (
    <Card className="card mt-3">
      <Card.Body className="card-body">
        <div className="mt-3">
          <h3>Nuevo Proveedor</h3>
          <Form
            method="post"
            ref={refFormularioProveedor}
            onSubmit={guardarProveedor}
          >
            {/* Nombre */}
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => validarNombre(e.target.value)}
                name="nombre"
                aria-label="Username"
                isValid={validaciones.nombre && nombre !== ""}
                isInvalid={!validaciones.nombre && nombre !== ""}
                type="text"
                maxLength={150}
                minLength={2}
              />
            </InputGroup>
            {/* Email */}
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Email"
                value={email}
                onChange={(e) => validarEmail(e.target.value)}
                name="email"
                aria-label="Telefono"
                isValid={validaciones.email && email !== ""}
                isInvalid={!validaciones.email && email !== ""}
                type="email"
                maxLength={60}
                minLength={2}
              />
            </InputGroup>
            {/* Telefono */}
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Telefono"
                value={telefono}
                onChange={(e) => validarTelefono(e.target.value)}
                name="telefono"
                aria-label="Telefono"
                isValid={validaciones.telefono && telefono !== ""}
                isInvalid={!validaciones.telefono && telefono !== ""}
                type="number"
                maxLength={10}
                minLength={2}
              />
            </InputGroup>
            {/* Direccion */}
            <InputGroup className="mb-3">
              <Form.Control
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                placeholder="Direccion"
                name="direccion"
                aria-label="categoria"
                as={"textarea"}
                rows={2}
                maxLength={150}
                minLength={2}
              />
            </InputGroup>
            {/* Empresa */}
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Empresa"
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
                name="empresa"
                aria-label="Empresa"
                type="text"
                maxLength={120}
                minLength={2}
              />
            </InputGroup>
            {/* Boton de crear */}
            <Button
              disabled={!verificarDatos()}
              variant="success"
              type="submit"
            >
              crear proveedor
            </Button>
          </Form>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PageRegistroProveedor;
