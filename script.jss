class Libro {
  constructor(titulo, autor) {
    this.id = Date.now();
    this.titulo = titulo;
    this.autor = autor;
    this.disponible = true;
  }
}

class Usuario {
  constructor(nombre, email) {
    this.id = Date.now();
    this.nombre = nombre;
    this.email = email;
  }
}

class Prestamo {
  constructor(libro, usuario) {
    this.id = Date.now();
    this.libro = libro;
    this.usuario = usuario;
    this.fecha = new Date();
  }
}

const libros = [];
const usuarios = [];
const prestamos = [];

function agregarLibro() {
  const titulo = document.getElementById("titulo").value;
  const autor = document.getElementById("autor").value;
  if (!titulo || !autor) return alert("Completa los datos del libro");

  const libro = new Libro(titulo, autor);
  libros.push(libro);
  actualizarSelects();
  alert("Libro agregado");
}

function registrarUsuario() {
  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  if (!nombre || !email) return alert("Completa los datos del usuario");

  const usuario = new Usuario(nombre, email);
  usuarios.push(usuario);
  actualizarSelects();
  alert("Usuario registrado");
}

function prestarLibro() {
  const libroId = document.getElementById("selectLibro").value;
  const usuarioId = document.getElementById("selectUsuario").value;

  const libro = libros.find(l => l.id == libroId);
  const usuario = usuarios.find(u => u.id == usuarioId);

  if (!libro || !libro.disponible) return alert("El libro no está disponible");

  const prestamo = new Prestamo(libro, usuario);
  prestamos.push(prestamo);
  libro.disponible = false;
  mostrarPrestamos();
  actualizarSelects();
}

function actualizarSelects() {
  const selectLibro = document.getElementById("selectLibro");
  const selectUsuario = document.getElementById("selectUsuario");

  selectLibro.innerHTML = libros
    .filter(l => l.disponible)
    .map(l => `<option value="${l.id}">${l.titulo} - ${l.autor}</option>`)
    .join("");

  selectUsuario.innerHTML = usuarios
    .map(u => `<option value="${u.id}">${u.nombre}</option>`)
    .join("");
}

function mostrarPrestamos() {
  const lista = document.getElementById("listaPrestamos");
  lista.innerHTML = prestamos
    .map(
      p =>
        `<li>${p.libro.titulo} prestado a ${p.usuario.nombre} el ${p.fecha.toLocaleDateString()}</li>`
    )
    .join("");
}