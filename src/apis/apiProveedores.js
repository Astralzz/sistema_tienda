import axios from "axios";
import { API_URL_PROVEEDORES } from "./variables";

// Obtener tabla
async function obtenerTablaProveedores(desde, asta) {
  //Ruta
  const url = API_URL_PROVEEDORES + `lista/${desde}/${asta}`;

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
        `- ERROR AL VALIDAR PROVEEDOR -\n ${er.response.data.error} \n -------------`
      );
      return undefined;
    });

  return res;
}

// Verificar key
async function verificarKeyAdmin(key) {
  //Ruta
  const url = API_URL_PROVEEDORES + `validar/key?key=${key}`;

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

// Crear proveedor
async function crearProveedor(proveedor) {
  //Ruta
  const url = API_URL_PROVEEDORES + "guardar";

  //Enviamos
  const res = await axios
    .post(url, proveedor)
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
async function buscarEmailProveedor(email) {
  //Ruta
  const url = API_URL_PROVEEDORES + `buscar/${email}`;

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
async function iniciarSesionProveedor(proveedor) {
  //Ruta
  const url = API_URL_PROVEEDORES + "validar";

  //Enviamos
  const res = await axios
    .post(url, proveedor)
    //Éxito
    .then(function(ex) {
      return ex.data.estado;
    })
    //Error
    .catch(function(er) {
      console.error(
        `- ERROR AL VALIDAR PROVEEDOR -\n ${er.response.data.error} \n -------------`
      );
      return undefined;
    });

  return res;
}

// Obtener proveedor
async function obtenerProveedor(email) {
  //Ruta
  const url = API_URL_PROVEEDORES + `obtener/${email}`;

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
        `- ERROR AL VALIDAR PROVEEDOR -\n ${er.response.data.error} \n -------------`
      );
      return undefined;
    });

  return res;
}

// Editar proveedor
async function editarProveedor(datos) {
  //Ruta
  const url = API_URL_PROVEEDORES + "modificar";

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
async function obtenerTablaProveedoresPorNombre(nombre, no = 10) {
  //Ruta
  const url = API_URL_PROVEEDORES + `buscar/nombre/${nombre}/${no}`;

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
        `- ERROR AL VALIDAR PROVEEDOR -\n ${er.response.data.error} \n -------------`
      );
      return undefined;
    });

  return res;
}

// Desactivar/activar proveedor
async function cambiarEstadoProveedor(email) {
  //Ruta
  const url = API_URL_PROVEEDORES + `desactivar/${email}`;

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
async function noDeFilasListaProveedor() {
  //Ruta
  const url = API_URL_PROVEEDORES + "buscar/no/filas";

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

// Eliminar producto
async function eliminarProveedorDeLaBD(id) {
  //Ruta
  const url = API_URL_PROVEEDORES + `eliminar/${id}`;

  //Enviamos
  const res = await axios
    .delete(url)
    //Error
    .catch(function(er) {
      console.error(
        `- ERROR AL ELIMINAR PROVEEDOR -\n ${er.response.data.error} \n -------------`
      );
      return undefined;
    });

  return res;
}

// Exportamos
export {
  verificarKeyAdmin,
  crearProveedor,
  buscarEmailProveedor,
  iniciarSesionProveedor,
  obtenerProveedor,
  editarProveedor,
  obtenerTablaProveedores,
  obtenerTablaProveedoresPorNombre,
  cambiarEstadoProveedor,
  noDeFilasListaProveedor,
  eliminarProveedorDeLaBD,
};
