import axios from "axios";
import { API_URL_CATEGORIAS } from "./variables";

// Obtener lista de nombre lllll
async function obtenerListaNombresCategorias() {
  //Ruta
  const url = API_URL_CATEGORIAS + "lista/nombres";

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
        `- ERROR AL VALIDAR CATEGORIAS -\n ${er.response.data.error} \n -------------`
      );
      return undefined;
    });

  return res;
}

// Verificar key
async function verificarKeyAdmin(key) {
  //Ruta
  const url = API_URL_CATEGORIAS + `validar/key?key=${key}`;

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

// Crear usuario llllllllll
async function crearCategoria(categoria) {
  //Ruta
  const url = API_URL_CATEGORIAS + "guardar";

  //Enviamos
  const res = await axios
    .post(url, categoria)
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
async function buscarEmailCategoria(email) {
  //Ruta
  const url = API_URL_CATEGORIAS + `buscar/${email}`;

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
async function iniciarSesionCategoria(usuario) {
  //Ruta
  const url = API_URL_CATEGORIAS + "validar";

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
        `- ERROR AL VALIDAR CATEGORIAS -\n ${er.response.data.error} \n -------------`
      );
      return undefined;
    });

  return res;
}

// Obtener usuario
async function obtenerCategoria(email) {
  //Ruta
  const url = API_URL_CATEGORIAS + `obtener/${email}`;

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
        `- ERROR AL VALIDAR CATEGORIAS -\n ${er.response.data.error} \n -------------`
      );
      return undefined;
    });

  return res;
}

// Editar usuario
async function editarCategoria(datos) {
  //Ruta
  const url = API_URL_CATEGORIAS + "modificar";

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
async function obtenerTablaCategoriasPorNombre(nombre, no = 10) {
  //Ruta
  const url = API_URL_CATEGORIAS + `buscar/nombre/${nombre}/${no}`;

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
        `- ERROR AL VALIDAR CATEGORIAS -\n ${er.response.data.error} \n -------------`
      );
      return undefined;
    });

  return res;
}

// Desactivar/activar usuario
async function cambiarEstadoCategoria(email) {
  //Ruta
  const url = API_URL_CATEGORIAS + `desactivar/${email}`;

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
async function noDeFilasListaCategoria() {
  //Ruta
  const url = API_URL_CATEGORIAS + "buscar/no/filas";

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
  crearCategoria,
  buscarEmailCategoria,
  iniciarSesionCategoria,
  obtenerCategoria,
  editarCategoria,
  obtenerListaNombresCategorias,
  obtenerTablaCategoriasPorNombre,
  cambiarEstadoCategoria,
  noDeFilasListaCategoria,
};
