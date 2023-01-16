import axios from "axios";
import { API_URL_PEDIDOS } from "./variables";

// Obtener tabla
async function obtenerTablaPedidos(desde, asta) {
  //Ruta
  const url = API_URL_PEDIDOS + `lista/${desde}/${asta}`;

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
        `- ERROR AL VALIDAR PEDIDO -\n ${er.response.data.error} \n -------------`
      );
      return undefined;
    });

  return res;
}

// Verificar key
async function verificarKeyAdmin(key) {
  //Ruta
  const url = API_URL_PEDIDOS + `validar/key?key=${key}`;

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

// Crear pedido
async function crearPedido(pedido) {
  //Ruta
  const url = API_URL_PEDIDOS + "guardar";

  pedido.forEach((el, i) => {
    console.log(i + ":" + el);
  });

  //Enviamos
  const res = await axios
    .post(url, pedido)
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
async function buscarEmailPedido(email) {
  //Ruta
  const url = API_URL_PEDIDOS + `buscar/${email}`;

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
async function iniciarSesionPedido(pedido) {
  //Ruta
  const url = API_URL_PEDIDOS + "validar";

  //Enviamos
  const res = await axios
    .post(url, pedido)
    //Éxito
    .then(function(ex) {
      return ex.data.estado;
    })
    //Error
    .catch(function(er) {
      console.error(
        `- ERROR AL VALIDAR PEDIDO -\n ${er.response.data.error} \n -------------`
      );
      return undefined;
    });

  return res;
}

// Obtener pedido
async function obtenerPedido(email) {
  //Ruta
  const url = API_URL_PEDIDOS + `obtener/${email}`;

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
        `- ERROR AL VALIDAR PEDIDO -\n ${er.response.data.error} \n -------------`
      );
      return undefined;
    });

  return res;
}

// Editar pedido
async function editarPedido(datos) {
  //Ruta
  const url = API_URL_PEDIDOS + "modificar";

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
async function obtenerTablaPedidosPorNombre(nombre, no = 10) {
  //Ruta
  const url = API_URL_PEDIDOS + `buscar/nombre/${nombre}/${no}`;

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
        `- ERROR AL VALIDAR PEDIDO -\n ${er.response.data.error} \n -------------`
      );
      return undefined;
    });

  return res;
}

// Desactivar/activar pedido
async function cambiarEstadoPedido(email) {
  //Ruta
  const url = API_URL_PEDIDOS + `desactivar/${email}`;

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
async function noDeFilasListaPedido() {
  //Ruta
  const url = API_URL_PEDIDOS + "buscar/no/filas";

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
  crearPedido,
  buscarEmailPedido,
  iniciarSesionPedido,
  obtenerPedido,
  editarPedido,
  obtenerTablaPedidos,
  obtenerTablaPedidosPorNombre,
  cambiarEstadoPedido,
  noDeFilasListaPedido,
};
