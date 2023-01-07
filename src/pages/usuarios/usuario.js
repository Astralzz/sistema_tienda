// Usuario
class usuario {
  // Constructor
  constructor(nombre, apellidos, email, telefono, admin, id) {
    // Variables
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.email = email;
    this.telefono = telefono;
    this.admin = admin;
    this.id = id;
  }

  // Nombre
  setNombre(nombre) {
    this.nombre = nombre;
  }

  getNombre() {
    return this.nombre;
  }

  // Apellidos
  setApellidos(apellidos) {
    this.apellidos = apellidos;
  }

  getApellidos() {
    return this.apellidos;
  }

  // Email
  setEmail(email) {
    this.email = email;
  }

  getEmail() {
    return this.email;
  }

  // Telefono
  setTelefono(telefono) {
    this.telefono = telefono;
  }

  getTelefono() {
    return this.telefono;
  }

  // id
  getId() {
    return this.id;
  }

  // is admin
  isAdmin() {
    return this.admin;
  }
}

export default usuario;
