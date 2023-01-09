import React, { useRef, useState } from "react";
import { Form, InputGroup, Button, Container } from "react-bootstrap";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import fondoLogin from "../../img/fondoLogin.jpg";
import ModalRegistro from "./ModalRegistro";
import { iniciarSesionUsuario, obtenerUsuario } from "../../apis/apiUsuario";

//Rutas
const PageLogin = ({ setSesion }) => {
  // Referencia
  const refFormularioSesion = useRef(null);

  //Ruta
  const navigate = useNavigate();

  // Modal
  const [estadoModal, isEstadoModal] = useState(false);
  const cerrarModal = () => isEstadoModal(false);
  const abrirModal = () => isEstadoModal(true);

  // Variables
  const [passOculta, setPassOculta] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Obtener datos
  const obtenerDatos = async (email) => {
    //Verificamos
    const res = await obtenerUsuario(email);

    // Error
    if (res === undefined || res === []) {
      //Fracaso
      Swal.fire({
        icon: "error",
        title: "Error...",
        text: "Error desconocido, intenta mas tarde",
      });
      return;
    }

    //Iniciamos sesion
    setSesion({
      nombre: res.nombre,
      apellidos: res.apellidos,
      telefono: res.telefono,
      email: res.email,
      isSesionIniciada: true,
      isGerente: res.isGerente === 1,
      imagen: res.imagen,
    });

    //Limpiamos
    setEmail("");
    setPassword("");
    setPassOculta(true);

    //Cambiamos ruta
    navigate("/");
  };

  // Iniciar sesión
  const iniciarSesion = async (event) => {
    event.preventDefault();
    //Obtenemos datos
    const formData = new FormData(refFormularioSesion.current);

    // formData.forEach((element, key) => {
    //   console.log(key + " -> " + element);
    // });

    //Verificamos
    const res = await iniciarSesionUsuario(formData);

    // Validamos
    if (res) {
      //Damos respuesta
      await obtenerDatos(email);
      return;
    }

    //Fracaso
    Swal.fire({
      icon: "error",
      title: "Error...",
      text: "Datos incorrectos!",
    });
  };

  // Verificar datos
  const verificarDatos = () => {
    // Email
    const emailRegex = /^[\w\.\+\-]+@[\w]+\.[a-z]{2,3}$/;
    if (!emailRegex.test(email)) {
      return true;
    }

    // Contraseña
    const passwordRegex = /^\S{6,18}$/;
    if (!passwordRegex.test(password)) {
      return true;
    }

    // Bloquear
    return false;
  };

  //Icono
  const IconoEye = () => {
    return passOculta ? <EyeSlash /> : <Eye />;
  };

  return (
    <>
      {/* Pagina */}
      <Container className="h-100 w-100 d-flex contenedor-login">
        <div className="container py-5 h-100">
          <div className="Auth-form-container">
            <div className="col col-xl-10">
              <div
                className="card"
                style={{
                  borderRadius: "1rem",
                  backgroundColor: "#D4C1E2",
                  borderColor: "transparent",
                }}
              >
                <div className="row g-0">
                  {/* Parte de ka imagen */}
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src={fondoLogin}
                      alt="login form"
                      className="img-fluid"
                      style={{ borderRadius: "1rem 0 0 1rem" }}
                    />
                  </div>

                  {/* Parte del formulario */}
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      {/* Formulario */}
                      <Form ref={refFormularioSesion} onSubmit={iniciarSesion}>
                        <div className="Auth-form-content">
                          {/* Titulo */}
                          <div className="d-flex align-items-center mb-3 pb-1">
                            <span className="h1 fw-bold mb-0">Acceder</span>
                          </div>

                          {/* Email del usuario */}
                          <div className="form-group mt-3">
                            <Form.Group controlId="formUsername">
                              <Form.Label>Correo electrónico</Form.Label>
                              <Form.Control
                                type="email"
                                placeholder="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                name="email"
                                minLength={5}
                                maxLength={35}
                              />
                            </Form.Group>
                          </div>

                          {/* Contraseña */}
                          <div className="form-group mt-3">
                            <Form.Group controlId="formPassword">
                              <Form.Label>Contraseña</Form.Label>
                              <InputGroup>
                                <Form.Control
                                  type={passOculta ? "password" : "text"}
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  placeholder="contraseña"
                                  name="password"
                                  aria-describedby="areaPass"
                                  minLength={6}
                                  maxLength={18}
                                  required
                                />
                                <Button
                                  className="btn btn-dark"
                                  onClick={() => setPassOculta(!passOculta)}
                                >
                                  <IconoEye />
                                </Button>
                              </InputGroup>
                            </Form.Group>
                          </div>

                          {/* Boton de crear */}
                          <div className="d-grid gap-2 mt-3">
                            <Button
                              type="submit"
                              className="btn btn-dark btn-lg btn-block"
                              disabled={verificarDatos()}
                            >
                              Acceder
                            </Button>
                          </div>

                          {/* Boton de Registro */}
                          <p
                            className="mb-5 pb-lg-2"
                            style={{ colo: "#393f81" }}
                          >
                            No estas registrado?
                            <button
                              type="button"
                              onClick={() => abrirModal()}
                              style={{
                                backgroundColor: "transparent",
                                color: "#393f81",
                                textDecoration: "underline",
                                cursor: "pointer",
                                border: "none",
                              }}
                            >
                              Regístrate
                            </button>
                          </p>
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      {/* Modal */}
      <ModalRegistro cerrarModal={cerrarModal} estadoModal={estadoModal} />
    </>
  );
};

export default PageLogin;
