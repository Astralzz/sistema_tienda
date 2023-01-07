import React, { useRef, useState } from "react";
import { Form, InputGroup, Button, Container } from "react-bootstrap";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import axios from "axios";
import "./Login.css";
import fondoLogin from "../../img/fondoLogin.jpg";

//Rutas
const PageLogin = () => {
  //Referencia
  const refFormulario = useRef(null);

  const [passOculta, setPassOculta] = useState(true);
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");

  const constIniciarSesion = () => {};

  //Icono
  const IconoEye = () => {
    return passOculta ? <EyeSlash /> : <Eye />;
  };

  return (
    <Container className="h-100 w-100 d-flex contenedor-login">
      <div className="container py-5 h-100">
        <div className="Auth-form-container">
          <div className="col col-xl-10">
            <div
              className="card"
              style={{ borderRadius: "1rem", borderColor: "transparent" }}
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
                    <Form ref={refFormulario} onSubmit={constIniciarSesion}>
                      <div className="Auth-form-content">
                        {/* Titulo */}
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <span className="h1 fw-bold mb-0">{"Login"}</span>
                        </div>

                        {/* Nombre de usuario */}
                        <div className="form-group mt-3">
                          <Form.Group controlId="formUsername">
                            <Form.Label>Correo electrónico</Form.Label>
                            <Form.Control
                              type="email"
                              name="correo"
                              value={nombre}
                              onChange={(e) => setNombre(e.target.value)}
                              required
                              minLength={4}
                              maxLength={16}
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
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                minLength={4}
                                maxLength={12}
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
                            disabled={false}
                          >
                            Acceder
                          </Button>
                        </div>

                        {/* Boton de Registro */}
                        <p className="mb-5 pb-lg-2" style={{ colo: "#393f81" }}>
                          No estas registrado?
                          <button
                            type="button"
                            onClick={() => {
                              setPassOculta(true);
                              setNombre("");
                              setPassword("");
                            }}
                            style={{
                              backgroundColor: "transparent",
                              color: "#393f81",
                              textDecoration: "underline",
                              cursor: "pointer",
                              border: "none",
                            }}
                          >
                            Registro
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
  );
};

export default PageLogin;
