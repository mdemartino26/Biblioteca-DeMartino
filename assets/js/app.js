let contador = 0;
let total = 0;

//Array de libros
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

// Función que se ejecuta al hacer clic en el botón "Comprar"
function comprarProducto(productName, productPrecio) {
  contador++;
  let carrito = document.getElementById("libros_seleccionados");
  carrito.innerHTML = contador;
  total = total + productPrecio;
  let precioFinal = document.getElementById("valor_total");
  precioFinal.innerHTML = "$" + total;
}

// Mostrar las tarjetas en la carga inicial
mostrarProductos();

//funcion que calcula si el envío se cobra o no
function envio(productName) {
  switch (contador) {
    case 0:
      alert("Selecciona al menos un libro antes de continuar.");
      break;
    default:
      if (total < 20000) {
        alert("El envío cuesta $100.");
        total += 100;
        let precioFinal = document.getElementById("valor_total");
        precioFinal.innerHTML = "$" + total;
        document.getElementById("botonEnvio").disabled = true;
        document.getElementById("botonPagar").disabled = false;
      } else {
        alert("El envío es gratis.");
        document.getElementById("botonEnvio").disabled = true;
        document.getElementById("botonPagar").disabled = false;
      }
  }
}

//funcion con los alerts de pago simulados
function pagar() {
  const metodoPago = prompt(
    "selecciona un metodo de pago:  1.credito  2. debito "
  );
  switch (metodoPago) {
    case "1":
      const cuotas = prompt(
        "selecciona cantidad de cuotas:",
        "1 cuota, 3 cuotas, 6 cuotas"
      );
      switch (cuotas) {
        case "1 cuota":
          alert("Una cuota de $" + total);
          alert(
            "su compra llegará en los proximos 10 días hábiles. Muchas gracias por comprar con nosotros!"
          );
          location.reload();
          break;
        case "3 cuotas":
          alert("Tres cuotas $" + total / 3);
          alert(
            "su compra llegará en los proximos 10 días hábiles. Muchas gracias por comprar con nosotros!"
          );
          location.reload();
          break;
        case "6 cuotas":
          alert("Seis cuotas $" + total / 6);
          alert(
            "su compra llegará en los proximos 10 días hábiles. Muchas gracias por comprar con nosotros!"
          );
          location.reload();
          break;
        default:
          alert("seleccione una opcion valida");
      }
      break;
    case "2":
      alert(
        "su compra llegará en los proximos 10 días hábiles. Muchas gracias por comprar con nosotros!"
      );
      location.reload();
      break;
  }
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
        <button class="btn btn-primary" onclick="buyProduct('${producto.nombre}', ${producto.precio})">Comprar</button>
      </div>
    </div>
  `;
    resultadosDiv.appendChild(productoDiv);
  });
}
