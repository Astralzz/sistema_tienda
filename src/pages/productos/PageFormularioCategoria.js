import React, { useRef, useState } from "react";
import { Button, Card, Form, InputGroup } from "react-bootstrap";
import Swal from "sweetalert2";
import { crearCategoria } from "../../apis/apiCategorias";

//Categorias
const PageFormularioCategoria = ({ sesion }) => {
  //Formulario
  const refFormularioCategoria = useRef(null);

  //Variables
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [validaciones, setValidaciones] = useState({
    nombre: false,
  });

  // Verificar
  const verificarDatos = () => {
    //Nombre
    if (!validaciones.nombre) {
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

  // Crear categoria
  const guardarCategoria = async (event) => {
    event.preventDefault();

    //Obtenemos datos
    const formData = new FormData(refFormularioCategoria.current);

    //Verificamos
    const res = await crearCategoria(formData);

    // Validamos
    if (res) {
      //Damos respuesta
      Swal.fire({
        icon: "success",
        title: "Éxito...",
        text: "LA categoria se creo correctamente!",
      });
      setNombre("");
      setDescripcion("");
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
      text: "No se creo la categoria",
    });
  };

  return (
    <Card className="card mt-3">
      <Card.Body className="card-body">
        <div className="mt-3">
          <h5>Crear categoria</h5>
          <Form
            method="post"
            ref={refFormularioCategoria}
            onSubmit={guardarCategoria}
          >
            {/* Nombre */}
            <InputGroup className="mb-3">
              <InputGroup.Text id="areaNombre">nombre</InputGroup.Text>
              <Form.Control
                placeholder="nombre"
                disabled={!Boolean(sesion.isGerente)}
                value={nombre}
                onChange={(e) => validarNombre(e.target.value)}
                name="nombre"
                aria-label="Username"
                aria-describedby="areaNombre"
                isValid={validaciones.nombre && nombre !== ""}
                isInvalid={!validaciones.nombre && nombre !== ""}
                type="text"
                maxLength={150}
                minLength={2}
              />
            </InputGroup>
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

export default PageFormularioCategoria;
