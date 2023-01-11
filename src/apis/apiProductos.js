import axios from "axios";
import { API_URL_PRODUCTOS } from "./variables";

// Obtener tabla llllllll
async function obtenerTablaProductos(desde, asta) {
  //Ruta
  const url = API_URL_PRODUCTOS + `lista/${desde}/${asta}`;

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
        `- ERROR AL VALIDAR PRODUCTOS -\n ${er.response.data.error} \n -------------`
      );
      return undefined;
    });

  return res;
}

// Verificar key
async function verificarKeyAdmin(key) {
  //Ruta
  const url = API_URL_PRODUCTOS + `validar/key?key=${key}`;

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

// Crear producto lllllllll
async function crearProducto(producto) {
  //Ruta
  const url = API_URL_PRODUCTOS + "guardar";

  //Enviamos
  const res = await axios
    .post(url, producto)
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
async function buscarEmailProducto(email) {
  //Ruta
  const url = API_URL_PRODUCTOS + `buscar/${email}`;

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
async function iniciarSesionProducto(usuario) {
  //Ruta
  const url = API_URL_PRODUCTOS + "validar";

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
        `- ERROR AL VALIDAR PRODUCTOS -\n ${er.response.data.error} \n -------------`
      );
      return undefined;
    });

  return res;
}

// Obtener usuario
async function obtenerProducto(email) {
  //Ruta
  const url = API_URL_PRODUCTOS + `obtener/${email}`;

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
        `- ERROR AL VALIDAR PRODUCTOS -\n ${er.response.data.error} \n -------------`
      );
      return undefined;
    });

  return res;
}

// Editar usuario
async function editarProducto(datos) {
  //Ruta
  const url = API_URL_PRODUCTOS + "modificar";

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

// buscar lista por nombre  lllllll
async function obtenerTablaProductosPorNombre(nombre, no = 10) {
  //Ruta
  const url = API_URL_PRODUCTOS + `buscar/nombre/${nombre}/${no}`;

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
        `- ERROR AL VALIDAR PRODUCTOS -\n ${er.response.data.error} \n -------------`
      );
      return undefined;
    });

  return res;
}

// buscar lista por nombre 2 lllllll
async function obtenerListaProductosPorNombre(nombre, no = 4) {
  //Ruta
  const url = API_URL_PRODUCTOS + `buscar/lista/nombre/${nombre}/${no}`;

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
        `- ERROR AL VALIDAR PRODUCTOS -\n ${er.response.data.error} \n -------------`
      );
      return undefined;
    });

  return res;
}

// Eliminar producto
async function eliminarProductoDeLaBD(id) {
  //Ruta
  const url = API_URL_PRODUCTOS + `eliminar/${id}`;

  console.log(id);

  //Enviamos
  const res = await axios
    .delete(url)
    //Error
    .catch(function(er) {
      console.error(
        `- ERROR AL ELIMINAR PRODUCTO -\n ${er.response.data.error} \n -------------`
      );
      return undefined;
    });

  return res;
}

// Numero de filas lllllll
async function noDeFilasListaProducto() {
  //Ruta
  const url = API_URL_PRODUCTOS + "buscar/no/filas";

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
  crearProducto,
  buscarEmailProducto,
  iniciarSesionProducto,
  obtenerProducto,
  editarProducto,
  obtenerTablaProductos,
  obtenerTablaProductosPorNombre,
  noDeFilasListaProducto,
  eliminarProductoDeLaBD,
  obtenerListaProductosPorNombre,
};
