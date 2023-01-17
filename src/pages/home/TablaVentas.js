import React from "react";

const TablaVentas = ({ tablaVentas }) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-sm">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">fecha</th>
            <th scope="col">producto</th>
            <th scope="col">usuario</th>
            <th scope="col">total</th>
          </tr>
        </thead>
        <tbody>
          {tablaVentas.map((dato, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{dato.fecha}</td>
                <td>{dato.detalles[0].producto.nombre}</td>
                <td>{dato.usuario.nombre + " " + dato.usuario.apellidos}</td>
                <td>{dato.total}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TablaVentas;
