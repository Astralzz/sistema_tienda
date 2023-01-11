import axios from "axios";
import { API_URL_VENTAS } from "./variables";

// Obtener tabla
async function obtenerTablaVenta(desde, asta) {
  //Ruta
  const url = API_URL_VENTAS + `lista/${desde}/${asta}`;

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
        `- ERROR AL VALIDAR VENTAS -\n ${er.response.data.error} \n -------------`
      );
      return undefined;
    });

  return res;
}

// Verificar key
async function verificarKeyAdmin(key) {
  //Ruta
  const url = API_URL_VENTAS + `validar/key?key=${key}`;

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
async function crearVenta(usuario) {
  //Ruta
  const url = API_URL_VENTAS + "guardar";

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
async function buscarEmailVenta(email) {
  //Ruta
  const url = API_URL_VENTAS + `buscar/${email}`;

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
async function iniciarSesionVenta(usuario) {
  //Ruta
  const url = API_URL_VENTAS + "validar";

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
        `- ERROR AL VALIDAR VENTAS -\n ${er.response.data.error} \n -------------`
      );
      return undefined;
    });

  return res;
}

// Obtener usuario
async function obtenerVenta(email) {
  //Ruta
  const url = API_URL_VENTAS + `obtener/${email}`;

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
        `- ERROR AL VALIDAR VENTAS -\n ${er.response.data.error} \n -------------`
      );
      return undefined;
    });

  return res;
}

// Editar usuario
async function editarVenta(datos) {
  //Ruta
  const url = API_URL_VENTAS + "modificar";

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
async function obtenerTablaVentaPorNombre(nombre, no = 10) {
  //Ruta
  const url = API_URL_VENTAS + `buscar/nombre/${nombre}/${no}`;

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
        `- ERROR AL VALIDAR VENTAS -\n ${er.response.data.error} \n -------------`
      );
      return undefined;
    });

  return res;
}

// Desactivar/activar usuario
async function cambiarEstadoVenta(email) {
  //Ruta
  const url = API_URL_VENTAS + `desactivar/${email}`;

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
async function noDeFilasListaVenta() {
  //Ruta
  const url = API_URL_VENTAS + "buscar/no/filas";

  //Enviamos
  const res = await axios
    .get(url)
    //Éxito
    .then(function(ex) {
      console.log(ex.data);
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
  crearVenta,
  buscarEmailVenta,
  iniciarSesionVenta,
  obtenerVenta,
  editarVenta,
  obtenerTablaVenta,
  obtenerTablaVentaPorNombre,
  cambiarEstadoVenta,
  noDeFilasListaVenta,
};
