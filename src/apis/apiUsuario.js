import axios from "axios";
import { API_URL_USUARIOS } from "./variables";

// Verificar key
async function verificarKeyAdmin(key) {
  //Ruta
  const url = API_URL_USUARIOS + `validar/key?key=${key}`;

  //Enviamos
  const res = await axios
    .get(url)
    //Éxito
    .then(function(ex) {
      return ex.data.estado;
    })
    //Error
    .catch(function(er) {
      console.error(
        `- ERROR AL VERIFICAR -\n ${er.response.data.error} \n -------------`
      );
      return undefined;
    });

  return res;
}

// Crear usuario
async function crearUsuario(usuario) {
  //Ruta
  const url = API_URL_USUARIOS + "guardar";

  console.log(usuario);

  //Enviamos
  const res = await axios
    .post(url, usuario)
    //Éxito
    .then(function() {
      return true;
    })
    //Error
    .catch(function(er) {
      console.error(
        `- ERROR AL VERIFICAR -\n ${er.response.data.error} \n -------------`
      );
      return false;
    });

  return res;
}

// Buscar email
async function buscarEmailUsuario(email) {
  //Ruta
  const url = API_URL_USUARIOS + `buscar/${email}`;

  //Enviamos
  const res = await axios
    .get(url)
    //Éxito
    .then(function(ex) {
      return ex.data.estado;
    })
    //Error
    .catch(function(er) {
      console.error(
        `- ERROR AL BUSCAR EMAIL -\n ${er.response.data.error} \n -------------`
      );
      return undefined;
    });

  return res;
}

// Iniciar sesión
async function iniciarSesionUsuario(usuario) {
  //Ruta
  const url = API_URL_USUARIOS + "validar";

  //Enviamos
  const res = await axios
    .post(url, usuario)
    //Éxito
    .then(function(ex) {
      return ex.data.estado;
    })
    //Error
    .catch(function(er) {
      console.error(
        `- ERROR AL VALIDAR USUARIO -\n ${er.response.data.error} \n -------------`
      );
      return undefined;
    });

  return res;
}

// Obtener usuario
async function obtenerUsuario(email) {
  //Ruta
  const url = API_URL_USUARIOS + `obtener/${email}`;

  //Enviamos
  const res = await axios
    .get(url)
    //Éxito
    .then(function(ex) {
      return ex.data;
    })
    //Error
    .catch(function(er) {
      console.error(
        `- ERROR AL VALIDAR USUARIO -\n ${er.response.data.error} \n -------------`
      );
      return undefined;
    });

  return res;
}

// Exportamos
export {
  verificarKeyAdmin,
  crearUsuario,
  buscarEmailUsuario,
  iniciarSesionUsuario,
  obtenerUsuario,
};
