import React, { useState, useRef } from "react";
import { Card, Form, Image, Button, InputGroup } from "react-bootstrap";
import { API_URL } from "../../apis/variables";
import FondoAvatar from "../../img/avatarUser.png";
import Swal from "sweetalert2";
import {
  PersonCircle,
  CurrencyDollar,
  BoxFill,
  PiggyBankFill,
  EyeFill,
  EyeSlashFill,
} from "react-bootstrap-icons";
import { editarUsuario, iniciarSesionUsuario } from "../../apis/apiUsuario";

let errorMensaje = null;

//Rutas
const PageUsuarios = ({ sesion, setSesion }) => {
  //Referencias
  const refImagenRegistro = useRef(null);
  const refFormularioEditar = useRef(null);

  //Variables
  const [nombre, setNombre] = useState(sesion.nombre);
  const [apellidos, setApellidos] = useState(sesion.apellidos);
  const [email, setEmail] = useState(sesion.email);
  const [telefono, setTelefono] = useState(sesion.telefono);
  const [newPassword, setNewPassword] = useState("");
  const [validaciones, setValidaciones] = useState({
    nombre: true,
    apellidos: true,
    email: true,
    telefono: true,
    password: true,
    oldPassword: true,
  });
  const [oldPassword, setOldPassword] = useState("");
  const [rutaImagen, setRutaImagen] = useState(null);

  //Ocultar la contraseña
  const [passOculta, setPassOculta] = useState(true);

  // Error
  const setErrorMensaje = (e) => {
    errorMensaje = e;
  };

  // Registrar usuario
  const prepararRegistro = async (event) => {
    event.preventDefault();
    //Obtenemos datos
    const formData = new FormData(refFormularioEditar.current);

    //Imagen
    if (rutaImagen === null) {
      //Eliminamos campo img
      formData.delete("imagen");
    }

    //Contraseña
    if (newPassword === "") {
      //Eliminamos campo img
      formData.delete("password");
    }

    await validarPassEnLaBD(formData);
  };

  // validar pass usuario
  const validarPassEnLaBD = async (datos) => {
    //Verificamos
    const res = await iniciarSesionUsuario({
      password: oldPassword,
      email: sesion.email,
    });

    // Validamos
    if (res) {
      //Damos respuesta
      await editarUsuarioEnLaBd(datos);
      return;
    }

    //Fracaso
    Swal.fire({
      icon: "error",
      title: "Error...",
      text: "Contraseña incorrecta!",
    });
  };

  // Editar usuario
  const editarUsuarioEnLaBd = async (datos) => {
    //Agregamos email
    datos.append("oldEmail", sesion.email);

    //Verificamos
    const res = await editarUsuario(datos);

    // Validamos
    if (res) {
      //Damos respuesta
      Swal.fire({
        icon: "success",
        title: "Éxito...",
        text: "El usuario se edito correctamente!",
      });
      return;
    }

    //Fracaso
    Swal.fire({
      icon: "error",
      title: "Error...",
      text: "No se edito el usuario",
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
      }
    }
    setRutaImagen(null);
  };

  //Validar nombre
  const validarNombre = (e) => {
    const nombre = e;
    setNombre(nombre);

    const nombreRegex = /^[a-zA-Z]{2,15}(\s[a-zA-Z]{2,15})?$/;

    //Éxito
    if (nombreRegex.test(nombre)) {
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

  //Validar apellidos
  const validarApellidos = (e) => {
    const apellidos = e;
    setApellidos(apellidos);

    const apellidosRegex = /^[a-zA-Z]{2,18}(\s[a-zA-Z]{2,18})?$/;

    //Éxito
    if (apellidosRegex.test(apellidos)) {
      setValidaciones({
        ...validaciones,
        apellidos: true,
      });
      return;
    }

    setValidaciones({
      ...validaciones,
      apellidos: false,
    });
  };

  //Validar email
  const validarEmail = (e) => {
    const email = e;
    setEmail(email);

    const emailRegex = /^[\w\.\+\-]+@[\w]+\.[a-z]{2,3}$/;

    //Éxito
    if (emailRegex.test(email)) {
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
    if (telefonoRegex.test(telefono)) {
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

  //Validar password
  const validarPassword = (e) => {
    const password = e;
    setNewPassword(password);

    const passRegex = /^\S{6,18}$/;

    //Éxito
    if (passRegex.test(password)) {
      setValidaciones({
        ...validaciones,
        password: true,
      });
      return;
    }

    setValidaciones({
      ...validaciones,
      password: false,
    });
  };

  //Validar old password
  const validarOldPassword = (e) => {
    const oldPassword = e;
    setOldPassword(oldPassword);

    const passRegex = /^\S{6,18}$/;

    //Éxito
    if (passRegex.test(oldPassword)) {
      setValidaciones({
        ...validaciones,
        oldPassword: true,
      });
      return;
    }

    setValidaciones({
      ...validaciones,
      oldPassword: false,
    });
  };

  //Imagen
  const ImageAvatar = () => {
    return sesion.isSesionIniciada && sesion.imagen !== null ? (
      <Image
        src={API_URL + sesion.imagen}
        alt="Admin"
        className="rounded-circle"
        width="150"
      />
    ) : (
      <PersonCircle
        alt="Admin"
        className="rounded-circle"
        height={150}
        width={150}
      />
    );
  };

  // Validar datos
  const validarDatos = () => {
    //Nombre
    if (!validaciones.nombre) {
      return false;
    }

    //Apellidos
    if (!validaciones.apellidos) {
      return false;
    }

    //email
    if (!validaciones.email) {
      return false;
    }

    // telefono
    if (!validaciones.telefono) {
      return false;
    }

    // password
    const passRegex = /^\S{6,18}$/;
    if (!passRegex.test(newPassword) && newPassword !== "") {
      return false;
    }

    // old password
    if (!passRegex.test(oldPassword)) {
      return false;
    }

    //Éxito
    setErrorMensaje(null);
    return true;
  };

  //Icono
  const IconoEye = () => {
    return passOculta ? <EyeSlashFill /> : <EyeFill />;
  };

  return (
    <div className="container">
      <br />
      <div className="row gutters-sm">
        {/* PARTE DERECHA */}
        <div className="col-md-4 mb-3">
          {/* Parte de imag */}
          <Card className="card">
            <Card.Body className="card-body">
              {/* Tarjeta */}
              <div className="d-flex flex-column align-items-center text-center">
                {/* Imagen de perfil */}
                <ImageAvatar />
                <div className="mt-3">
                  {/* Nombre */}
                  <h4>{sesion.nombre + " " + sesion.apellidos}</h4>
                  {/* Email */}
                  <p className="text-secondary mb-1">{sesion.email}</p>
                  {/* Cargo */}
                  <p className="text-muted font-size-sm">
                    {(sesion.isGerente ? "Gerente" : "Cajero") + " Inovatech"}
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>
          {/* Tarjeta de Historial */}
          <Card className="card mt-3">
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                <h6 className="mb-0">
                  {/* Ventas */}
                  <CurrencyDollar
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={"currentColor"}
                    strokeWidth={"2"}
                    strokeLinecap={"round"}
                    strokeLinejoin={"round"}
                    className="feather feather-globe mr-2 icon-inline"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </CurrencyDollar>
                  Ventas
                </h6>
                <span className="text-secondary">52</span>
              </li>
              {/* Pedidos */}
              <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                <h6 className="mb-0">
                  <BoxFill
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={"currentColor"}
                    strokeWidth={"2"}
                    strokeLinecap={"round"}
                    strokeLinejoin={"round"}
                    className="feather feather-globe mr-2 icon-inline"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </BoxFill>
                  Pedidos
                </h6>
                <span className="text-secondary">11</span>
              </li>
              {/* Dinero ganado */}
              <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                <h6 className="mb-0">
                  <PiggyBankFill
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={"currentColor"}
                    strokeWidth={"2"}
                    strokeLinecap={"round"}
                    strokeLinejoin={"round"}
                    className="feather feather-globe mr-2 icon-inline"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </PiggyBankFill>
                  Ingresos
                </h6>
                <span className="text-secondary">$4258.00</span>
              </li>
            </ul>
          </Card>
        </div>

        {/* PARTE DE EDICIÓN */}
        <div className="col-lg-8">
          <Card className="card">
            {/* Formulario */}
            <Form
              encType="multipart/form-data"
              method="put"
              ref={refFormularioEditar}
              onSubmit={prepararRegistro}
            >
              <Card.Body className="card-body">
                {/* Nombre */}
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Nombre</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    <Form.Control
                      type={"text"}
                      className="form-control"
                      placeholder={sesion.nombre}
                      maxLength={28}
                      minLength={2}
                      value={nombre}
                      name="nombre"
                      isValid={validaciones.nombre && nombre !== sesion.nombre}
                      isInvalid={!validaciones.nombre}
                      onChange={(e) => validarNombre(e.target.value)}
                    />
                  </div>
                </div>
                {/* Apellidos */}
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Apellidos</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    <Form.Control
                      type={"text"}
                      className="form-control"
                      value={apellidos}
                      placeholder={sesion.apellidos}
                      maxLength={60}
                      minLength={5}
                      name="apellidos"
                      isValid={
                        validaciones.apellidos && apellidos !== sesion.apellidos
                      }
                      isInvalid={!validaciones.apellidos}
                      onChange={(e) => validarApellidos(e.target.value)}
                    />
                  </div>
                </div>
                {/* Email */}
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Email</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    <Form.Control
                      type={"email"}
                      className="form-control"
                      value={email}
                      placeholder={sesion.email}
                      maxLength={35}
                      minLength={5}
                      name="email"
                      isValid={validaciones.email && email !== sesion.email}
                      isInvalid={!validaciones.email}
                      onChange={(e) => validarEmail(e.target.value)}
                    />
                  </div>
                </div>
                {/* Telefono */}
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Telefono</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    <Form.Control
                      type={"number"}
                      className="form-control"
                      placeholder={sesion.telefono}
                      maxLength={10}
                      name="telefono"
                      value={telefono}
                      isValid={
                        validaciones.telefono && telefono !== sesion.telefono
                      }
                      isInvalid={!validaciones.telefono}
                      onChange={(e) => validarTelefono(e.target.value)}
                    />
                  </div>
                </div>
                {/* Nueva contraseña */}
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Contraseña</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    <InputGroup>
                      <Form.Control
                        type={passOculta ? "password" : "text"}
                        className="form-control"
                        placeholder="nueva contraseña"
                        minLength={6}
                        maxLength={18}
                        name="password"
                        value={newPassword}
                        isValid={validaciones.password && newPassword !== ""}
                        isInvalid={!validaciones.password && newPassword !== ""}
                        onChange={(e) => validarPassword(e.target.value)}
                      />
                      <Button
                        variant="dark"
                        type="button"
                        onClick={() => setPassOculta(!passOculta)}
                      >
                        <IconoEye />
                      </Button>
                    </InputGroup>
                  </div>
                </div>
                {/* Imagen */}
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Imagen</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    <InputGroup>
                      <InputGroup.Text id="areaImagen">
                        <Image
                          src={rutaImagen === null ? FondoAvatar : rutaImagen}
                          roundedCircle
                          height={23}
                        />
                      </InputGroup.Text>
                      <Form.Control
                        type={"file"}
                        className="form-control"
                        placeholder="imagen de perfil"
                        name="imagen"
                        ref={refImagenRegistro}
                        onChange={validarImagen}
                      />
                    </InputGroup>
                  </div>
                </div>
                <br />
                {/* Contraseña y Boton */}
                <div className="row mb-3">
                  <InputGroup className="col-sm-9 text-secondary">
                    <Form.Control
                      type={"password"}
                      className="form-control"
                      placeholder="ingresa tu contraseña"
                      minLength={6}
                      maxLength={18}
                      value={oldPassword}
                      isValid={validaciones.oldPassword && oldPassword !== ""}
                      isInvalid={
                        !validaciones.oldPassword && oldPassword !== ""
                      }
                      onChange={(e) => validarOldPassword(e.target.value)}
                    />
                    {/* Boton Aceptar */}
                    <Button
                      variant="dark"
                      type="submit"
                      disabled={!validarDatos()}
                    >
                      Guardar
                    </Button>
                  </InputGroup>
                </div>
              </Card.Body>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PageUsuarios;
