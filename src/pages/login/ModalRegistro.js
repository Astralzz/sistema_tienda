import React, { useEffect, useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Image from "react-bootstrap/Image";
import FondoAvatar from "../../img/avatarUser.png";
import Swal from "sweetalert2";
import {
  PersonFill,
  TelephoneFill,
  EnvelopeAtFill,
  EyeFill,
  EyeSlashFill,
} from "react-bootstrap-icons";
import { crearUsuario, verificarKeyAdmin } from "../../apis/apiUsuario";

let errorMensaje = null;

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
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [rutaImagen, setRutaImagen] = useState(null);
  const [img, setImg] = useState(null);
  const [gerente, isGerente] = useState(false);
  const [claveAdmin, setClaveAdmin] = useState("");

  //Ocultar la contraseña
  const [passOculta, setPassOculta] = useState(true);

  // Error
  const setErrorMensaje = (e) => {
    errorMensaje = e;
  };

  // Referencia imagen
  const refImagenRegistro = useRef(null);

  // Limpiar
  const limpiarDatos = () => {
    setNombre("");
    setApellidoPa("");
    setApellidoMa("");
    setEmail("");
    setTelefono("");
    setPassword("");
    setPassword2("");
    isGerente(false);
    setPassOculta(true);
    setErrorMensaje(null);
    setRutaImagen(null);
    setClaveAdmin("");

    if (refImagenRegistro.current) {
      refImagenRegistro.current.value = "";
    }
  };

  // Registrar usuario
  const prepararRegistro = async (event) => {
    event.preventDefault();
    //Obtenemos datos
    const formData = new FormData(refFormularioRegistro.current);

    //Cambiamos
    formData.set("isGerente", gerente);

    //Imagen
    if (rutaImagen === null) {
      //Eliminamos campo img
      formData.delete("imagen");
    }

    //Si es admin
    if (gerente) {
      await validarClave(claveAdmin, formData);
      return;
    }

    await registrar(formData);
  };

  // Validar clave
  const validarClave = async (key, usuario) => {
    //Verificamos
    const res = await verificarKeyAdmin(key);

    //Error
    if (res === undefined) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ocurrió un error desconocido!",
      });
      return;
    }

    // Validamos
    if (res) {
      //Eliminamos key
      usuario.delete("key");
      await registrar(usuario);
      return;
    }

    //Fracaso
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "La clave es incorrecta!",
    });
  };

  // Registrar
  const registrar = async (usuario) => {
    usuario.forEach((element, key) => {
      console.log(key + " -> " + element);
    });

    //Verificamos
    const res = await crearUsuario(usuario);

    // Validamos
    if (res) {
      //Damos respuesta
      Swal.fire("Éxito!", "El usuario se registro correctamente!", "success");
      return;
    }

    //Fracaso
    Swal.fire({
      icon: "error",
      title: "Error...",
      text: "No se registro el usuario!",
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
          setImg(null);
          return;
        }

        // Validamos el tamaño del archivo (debe ser menor a 2 MB)
        if (file.size > 2097152) {
          // Mostramos un mensaje de error
          setErrorMensaje("El tamaño de la imagen debe ser menor a 2 MB");
          setRutaImagen(null);
          setImg(null);
          return;
        }

        // Si el archivo cumple con los requisitos,
        setErrorMensaje(null);
        //Ponemos ruta
        setImg(file);
        setRutaImagen(URL.createObjectURL(file));
        return;
        //podemos hacer algo con él (por ejemplo, subirlo a un servidor)
      }
    }
    setRutaImagen(null);
  };

  // Validar usuario
  const validarDatos = () => {
    //Nombre
    const nombreRegex = /^[a-zA-Z]{2,15}(\s[a-zA-Z]{2,15})?$/;
    if (!nombreRegex.test(nombre)) {
      setErrorMensaje("Nombre invalido");
      return false;
    }

    //Apellido p
    const apellidoRegex = /^[a-zA-Z]{2,25}$/;
    if (!apellidoRegex.test(apellidoPa)) {
      setErrorMensaje("Apellido paterno inválido");
      return false;
    }

    //Apellido m
    if (!apellidoRegex.test(apellidoMa)) {
      setErrorMensaje("Apellido materno inválido");
      return false;
    }

    // Email
    const emailRegex = /^[\w\.\+\-]+@[\w]+\.[a-z]{2,3}$/;
    if (!emailRegex.test(email)) {
      setErrorMensaje("Email inválido");
      return false;
    }

    // Telefono
    const telefonoRegex = /^\d{10}$/;
    if (!telefonoRegex.test(telefono)) {
      setErrorMensaje("Numero de telefono inválido");
      return false;
    }

    // Contraseña
    const passwordRegex = /^\S{6,18}$/;
    if (!passwordRegex.test(password)) {
      setErrorMensaje("Contraseña inválida");
      return false;
    }

    // Contraseña 2
    if (password !== password2) {
      setErrorMensaje("Las contraseñas no coinciden");
      return false;
    }

    // Key
    if (gerente) {
      if (claveAdmin.length !== 12) {
        setErrorMensaje("Clave invalida");
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

  //Icono
  const IconoEye = () => {
    return passOculta ? <EyeSlashFill /> : <EyeFill />;
  };

  return (
    <Modal show={estadoModal} onHide={cerrarModal}>
      {/* Encabezado */}
      <Modal.Header closeButton>
        {/* Titulo */}
        <Modal.Title>Registro</Modal.Title>
      </Modal.Header>

      {/* Formulario */}
      <Form
        encType="multipart/form-data"
        method="post"
        ref={refFormularioRegistro}
        onSubmit={prepararRegistro}
      >
        {/* Cuerpo */}
        <Modal.Body>
          {/* Nombre y apellidos */}
          <InputGroup className="mb-3">
            <InputGroup.Text id="areaNombre">
              <PersonFill />
            </InputGroup.Text>
            <Form.Control
              placeholder="nombre(s)"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              name="nombre"
              aria-label="Username"
              aria-describedby="areaNombre"
              type="text"
              maxLength={28}
              minLength={2}
            />
            <Form.Control
              placeholder="apellido paterno"
              value={apellidoPa}
              onChange={(e) => setApellidoPa(e.target.value)}
              name="apellido_p"
              aria-label="apellido p"
              aria-describedby="areaNombre"
              type="text"
              maxLength={25}
              minLength={2}
            />
            <Form.Control
              placeholder="apellido materno"
              value={apellidoMa}
              onChange={(e) => setApellidoMa(e.target.value)}
              name="apellido_m"
              aria-label="apellido m"
              aria-describedby="areaNombre"
              type="text"
              maxLength={25}
              minLength={2}
            />
          </InputGroup>
          {/* Email y telefono */}
          <InputGroup className="mb-3">
            {/* Email */}
            <InputGroup.Text id="areaEmail">
              <EnvelopeAtFill />
            </InputGroup.Text>
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
              <TelephoneFill />
            </InputGroup.Text>
            <Form.Control
              placeholder="telefono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              name="telefono"
              type="number"
              maxLength={10}
              aria-label="telefono"
              aria-describedby="areaTelefono"
            />
          </InputGroup>
          {/* Imagen */}
          <Form.Group controlId="formFile" className="mb-3">
            <InputGroup>
              <InputGroup.Text id="areaImagen">
                <Image
                  src={rutaImagen === null ? FondoAvatar : rutaImagen}
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
                ref={refImagenRegistro}
                onChange={validarImagen}
              />
            </InputGroup>
          </Form.Group>

          {/* Contraseña */}
          <InputGroup className="mb-3">
            <InputGroup.Text
              type="button"
              onClick={() => setPassOculta(!passOculta)}
              id="areaPass"
            >
              <IconoEye />
            </InputGroup.Text>
            <Form.Control
              placeholder="contraseña"
              name="password"
              aria-describedby="areaPass"
              value={password}
              minLength={6}
              maxLength={18}
              type={passOculta ? "password" : "text"}
              onChange={(e) => setPassword(e.target.value)}
              aria-label="password"
            />
            <Form.Control
              placeholder="repetir"
              type="password"
              aria-describedby="areaPass"
              value={password2}
              minLength={6}
              maxLength={18}
              onChange={(e) => setPassword2(e.target.value)}
              aria-label="password2"
            />
          </InputGroup>

          {/* Es gerente */}
          <InputGroup className="mb-3">
            <InputGroup.Checkbox
              name="isGerente"
              id="areaAdministrador"
              aria-label="Checkbox for following text input"
              onChange={(e) => {
                setClaveAdmin("");
                isGerente(e.target.checked);
              }}
            />
            <Form.Control
              name="key"
              aria-label="es gerente"
              type="password"
              maxLength={12}
              placeholder={
                gerente
                  ? "Clave de administrador"
                  : "Marca si eres administrador"
              }
              aria-describedby="areaAdministrador"
              value={claveAdmin}
              onChange={(e) => setClaveAdmin(e.target.value)}
              disabled={!gerente}
            />
          </InputGroup>
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

export default ModalRegistro;
