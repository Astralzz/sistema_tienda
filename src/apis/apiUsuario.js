import axios from "axios";
import { API_URL_USUARIOS } from "./variables";

// Obtener tabla
async function obtenerTablaUsuarios(desde, asta) {
  //Ruta
  const url = API_URL_USUARIOS + `lista/${desde}/${asta}`;

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

// Editar usuario
async function editarUsuario(datos) {
  //Ruta
  const url = API_URL_USUARIOS + "modificar";

  datos.forEach((dato, key) => {
    console.log(key + ": " + dato);
  });
  console.log(datos);

  //Enviamos
  const res = await axios
    .put(url, datos)
    //Éxito
    .then(function() {
      return true;
    })
    //Error
    .catch(function(er) {
      console.error(
        `- ERROR AL EDITAR -\n ${er.response.data.error} \n -------------`
      );
      return false;
    });

  return res;
}

// buscar lista por nombre
async function obtenerTablaUsuariosPorNombre(nombre, no = 10) {
  //Ruta
  const url = API_URL_USUARIOS + `buscar/nombre/${nombre}/${no}`;

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

// Desactivar/activar usuario
async function cambiarEstadoUsuario(email) {
  //Ruta
  const url = API_URL_USUARIOS + `desactivar/${email}`;

  //Enviamos
  const res = await axios
    .put(url)
    //Error
    .catch(function(er) {
      console.error(
        `- ERROR AL BUSCAR EMAIL -\n ${er.response.data.error} \n -------------`
      );
      return undefined;
    });

  return res;
}

// Numero de filas
async function noDeFilasListaUsuario() {
  //Ruta
  const url = API_URL_USUARIOS + "buscar/filas";

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
        `- ERROR AL BUSCAR FILAS -\n ${er.response.data.error} \n -------------`
      );
      return 0;
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
  editarUsuario,
  obtenerTablaUsuarios,
  obtenerTablaUsuariosPorNombre,
  cambiarEstadoUsuario,
  noDeFilasListaUsuario,
};
