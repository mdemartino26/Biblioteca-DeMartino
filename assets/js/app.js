let contador = parseInt(localStorage.getItem("contador")) || 0;
let total = parseInt(localStorage.getItem("total")) || 0;

const botonEnvio = document.querySelector("#botonEnvio");
botonEnvio.addEventListener("click", envio);
/* const botonPagar = document.querySelector("#botonPagar");
botonPagar.addEventListener("click", pagar); */
const botonFiltrar = document.querySelector("#botonFiltrar");
botonFiltrar.addEventListener("click", filtrarProductos);
const botonBorrar = document.querySelector("#botonBorrar");
botonBorrar.addEventListener("click", borrarCarrito);
const metodoCredito = document.querySelector("#botonCredito");
metodoCredito.addEventListener("click", () => pagar(1));

const metodoDebito = document.querySelector("#botonDebito");
metodoDebito.addEventListener("click", () => pagar(2));

const unaCuota = document.querySelector("#botonUna");
unaCuota.addEventListener("click", () => dividir("1"));
const tresCuotas = document.querySelector("#botonTres");
tresCuotas.addEventListener("click", () => dividir("3"));
const seisCuotas = document.querySelector("#botonSeis");
seisCuotas.addEventListener("click", () => dividir("6"));

const botonVolver = document.querySelector("#botonVolver");
botonVolver.addEventListener("click", borrarSesion);

const botonPagar = document.querySelector("#pagar");
botonPagar.addEventListener("click", terminar);

const botonAtras = document.querySelector("#botonAtras");
botonAtras.addEventListener("click", irAtras);

//Array de libros (objetos)
const libros = [
  {
    nombre: "Mujercitas",
    precio: 10000,
    foto: "assets/img/libros.jpeg",
  },
  {
    nombre: "Hamlet",
    precio: 11000,
    foto: "assets/img/libros.jpeg",
  },
  {
    nombre: "Yo, el gato",
    precio: 10500,
    foto: "assets/img/libros.jpeg",
  },
  {
    nombre: "Pet Sematary",
    precio: 9000,
    foto: "assets/img/libros.jpeg",
  },
  {
    nombre: "Universo Marvel",
    precio: 15000,
    foto: "assets/img/libros.jpeg",
  },
  {
    nombre: "Don Quojite",
    precio: "20000",
    foto: "assets/img/libros.jpeg",
  },
];

//Muestra al abrir la ventana lo que hay en el localStorage
window.onload = function () {
  let carrito = document.querySelector("#libros_seleccionados");
  carrito.innerHTML = contador;
  let precioFinal = document.querySelector("#valor_total");
  precioFinal.innerHTML = "$" + total;
};

// Función para crear las tarjetas de los libros
function createCard(product) {
  const card = document.createElement("div");
  card.className = "col-md-4 mt-4";

  //crea la card
  card.innerHTML = `
    <div class="card">
      <img src="${product.foto}" class="card-img-top" alt="..."> 
      <div class="card-body">
        <h5 class="card-title">${product.nombre}</h5>
        <p class="card-text">Precio: ${product.precio}</p>
        <button class="btn btn-primary" onclick="comprarProducto('${product.nombre}', ${product.precio})">Comprar</button>
      </div>
    </div>
  `;

  return card;
}

// Función para agregar las tarjetas al contenedor en el HTML
function mostrarProductos() {
  const productContainer = document.getElementById("productContainer");
  productContainer.innerHTML = "";

  for (const producto of libros) {
    const card = createCard(producto);
    productContainer.appendChild(card);
  }
}

//Funcion de compra
function comprarProducto(productName, productPrecio) {
  contador++;
  let carrito = document.getElementById("libros_seleccionados");
  carrito.innerHTML = contador;

  total = total + productPrecio;
  let precioFinal = document.getElementById("valor_total");
  precioFinal.innerHTML = "$" + total;

  // Guardar el contador en el Local Storage
  localStorage.setItem("contador", JSON.stringify(contador));

  //Guardar el total en el Local Storage
  localStorage.setItem("total", JSON.stringify(total));

  // Guardar el nombre del producto en el Local Storage
  let productosEnCarrito =
    JSON.parse(localStorage.getItem("productosEnCarrito")) || [];
  productosEnCarrito.push(productName);
  localStorage.setItem(
    "productosEnCarrito",
    JSON.stringify(productosEnCarrito)
  );
}

// Mostrar las tarjetas en la carga inicial
mostrarProductos();

//funcion que calcula si el envío se cobra o no
function envio() {
  if (contador === 0) {
    alert("Selecciona al menos un libro antes de continuar.");
  } else {
    document.getElementById("productContainer").style.display = "none";
    document.getElementById("pago").style.display = "block";
    if (total < 20000) {
      let valorEnvio = document.getElementById("valorEnvio");
      valorEnvio.innerHTML = "El envío cuesta $100.";
      total += 100;
      let precioFinal = document.getElementById("valor_total");
      precioFinal.innerHTML = "$" + total;
      document.getElementById("botonEnvio").disabled = true;
      document.getElementById("botonPagar").disabled = false;
    } else {
      let valorEnvio = document.getElementById("valorEnvio");
      valorEnvio.innerHTML = "El envío es gratis.";
      document.getElementById("botonEnvio").disabled = true;
      document.getElementById("botonPagar").disabled = false;
    }
  }
}

//funcion con los alerts de pago simulados
function pagar(boton) {
  switch (boton) {
    case 1:
      botonCredito.style.backgroundColor = "black";
      document.getElementById("cuotas").style.display = "block";
      dividir();
      break;
    case 2:
      document.getElementById("pago").style.display = "none";
      document.getElementById("llegara").style.display = "block";
      break;
    default:
      alert("selecciona un metodo de pago");
  }
}

function dividir(boton) {
  switch (boton) {
    case "1":
      valorCuota = document.getElementById("valorCuota");
      valorCuota.innerHTML = "Una cuota de $" + total;
      document.getElementById("pagar").style.display = "block";
      break;
    case "3":
      valorCuota = document.getElementById("valorCuota");
      valorCuota.innerHTML = "Tres cuotas de $" + total / 3;
      document.getElementById("pagar").style.display = "block";
      break;
    case "6":
      valorCuota = document.getElementById("valorCuota");
      valorCuota.innerHTML = "Seis cuotas de $" + total / 6;
      document.getElementById("pagar").style.display = "block";
      break;
    default:
      break;
  }
}

function terminar() {
  document.getElementById("pago").style.display = "none";
  document.getElementById("llegara").style.display = "block";
}

//funcion que filtra los productos por precio maximo, reemplaza el conteiner de libros por los resultados
function filtrarProductos() {
  document.getElementById("verResultados").className = "resultados";

  const precioMax =
    parseFloat(document.getElementById("precioMax").value) || Number.MAX_VALUE; //convierte el valor a decimal o toma el valor maximo posible
  const productosFiltrados = libros.filter((producto) => {
    const precioProducto = producto.precio; //Busca el precio del producto y lo crea en una const
    return precioProducto <= precioMax; // devuelve el producto que sea menos al precio max
  });

  mostrarResultados(productosFiltrados);
}

//funcion que muestra los resultados en el container
function mostrarResultados(productos) {
  const resultadosDiv = document.getElementById("verResultados");
  resultadosDiv.innerHTML = "";
  document.getElementById("productContainer").style.display = "none";

  //si se ingresa un valor y no encuentra productos que valgan menos que el precio ingresado
  if (productos.length === 0) {
    resultadosDiv.innerHTML = "<p>No se encontró un libro más barato.</p>";
    return;
  }

  //
  productos.forEach((producto) => {
    const productoDiv = document.createElement("div");
    productoDiv.classList.add("card", "mb-2");
    productoDiv.innerHTML = `
      <img src="${producto.foto}" class="card-img-top" alt="..."> 
      <div class="card-body">
        <h5 class="card-title">${producto.nombre}</h5>
        <p class="card-text">Precio: ${producto.precio}</p>
        <button class="btn btn-primary" onclick="comprarProducto('${producto.nombre}', ${producto.precio})">Comprar</button>
      </div>
    </div>
  `;
    resultadosDiv.appendChild(productoDiv);
  });
}

function irAtras() {
  location.reload();
}

function borrarCarrito() {
  localStorage.clear(); // Borra todo el contenido del Local Storage
  location.reload(); // Recarga la página
}

function borrarSesion() {
  localStorage.clear(); // Borra todo el contenido del Local Storage
  location.reload(); // Recarga la página
}
