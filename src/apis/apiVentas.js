import axios from "axios";
import { API_URL_VENTAS } from "./variables";

// Obtener tabla de mis ventas
async function obtenerTablaMisVentas(id, desde, asta) {
  //Ruta
  const url = API_URL_VENTAS + `mis_ventas/${id}/${desde}/${asta}`;

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

// Eliminar venta
async function eliminarVentasDeLaBD(id) {
  //Ruta
  const url = API_URL_VENTAS + `eliminar/${id}`;

  //Enviamos
  const res = await axios
    .delete(url)
    //Error
    .catch(function(er) {
      console.error(
        `- ERROR AL ELIMINAR VENTA -\n ${er.response.data.error} \n -------------`
      );
      return undefined;
    });

  return res;
}

// Crear venta
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

// buscar lista por fecha
async function obtenerTablaVentasPorFecha(fecha, no = 10) {
  //Ruta
  const url = API_URL_VENTAS + `buscar/fecha/${fecha}/${no}`;

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

// Obtener tabla
async function obtenerTablaVentas(desde, asta) {
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
        `- ERROR AL VALIDAR PEDIDO -\n ${er.response.data.error} \n -------------`
      );
      return undefined;
    });

  return res;
}

// Exportamos
export {
  obtenerTablaMisVentas,
  eliminarVentasDeLaBD,
  crearVenta,
  obtenerTablaVentasPorFecha,
  obtenerTablaVentas,
};
