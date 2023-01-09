import React, { useState } from "react";
import { Card, Form, Image, Button, InputGroup } from "react-bootstrap";
import { API_URL } from "../../apis/variables";
import {
  PersonCircle,
  CurrencyDollar,
  BoxFill,
  PiggyBankFill,
  EyeFill,
} from "react-bootstrap-icons";

//Rutas
const PageUsuarios = ({ sesion, setSesion }) => {
  //Variables
  const [nombre, setNombre] = useState(sesion.nombre);
  const [apellidos, setApellidos] = useState(sesion.apellidos);
  const [email, setEmail] = useState(sesion.email);
  const [telefono, setTelefono] = useState(sesion.telefono);
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [oldPassword, setOldPassword] = useState("");

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
          <div className="card">
            {/* Formulario */}
            <Form>
              <Card className="card-body">
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
                      onChange={(e) => setNombre(e.target.value)}
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
                      onChange={(e) => setApellidos(e.target.value)}
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
                      onChange={(e) => setEmail(e.target.value)}
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
                      onChange={(e) => setTelefono(e.target.value)}
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
                        type={"password"}
                        className="form-control"
                        placeholder="nueva contraseña"
                        minLength={6}
                        maxLength={18}
                        name="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <Button variant="dark" type="button">
                        <EyeFill />
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
                    <Form.Control
                      type={"file"}
                      className="form-control"
                      placeholder="imagen de perfil"
                      name="imagen"
                    />
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
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                    {/* Boton Aceptar */}
                    <Button
                      variant="dark"
                      type="submit"
                      // disabled={!validarDatos()}
                    >
                      Guardar
                    </Button>
                  </InputGroup>
                </div>
              </Card>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageUsuarios;
