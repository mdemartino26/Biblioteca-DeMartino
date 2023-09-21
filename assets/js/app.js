let contador = 0;
let total = 0;

const products = [
  {
    nombre: "Mujercitas",
    precio: 100000,
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
    nombre: "Producto 4",
    precio: 8.99,
    foto: "assets/img/libros.jpeg",
  },
  {
    nombre: "Producto 5",
    precio: 12.0,
    foto: "assets/img/libros.jpeg",
  },
  {
    nombre: "Producto 6",
    precio: 18.25,
    foto: "assets/img/libros.jpeg",
  },
];

// Función para crear una tarjeta Bootstrap
function createCard(product) {
  const card = document.createElement("div");
  card.className = "col-md-4 mt-4";

  card.innerHTML = `
    <div class="card">
      <img src="assets/img/libros.jpeg" class="card-img-top" alt="..."> 
      <div class="card-body">
        <h5 class="card-title">${product.nombre}</h5>
        <p class="card-text">Precio: $${product.precio}</p>
        <button class="btn btn-primary" onclick="buyProduct('${product.nombre}')">Comprar</button>
      </div>
    </div>
  `;

  return card;
}

// Función para agregar las tarjetas al contenedor en el HTML
function displayProducts() {
  const productContainer = document.getElementById("productContainer");
  productContainer.innerHTML = "";

  for (const product of products) {
    const card = createCard(product);
    productContainer.appendChild(card);
  }
}

// Función que se ejecuta al hacer clic en el botón "Comprar"
function buyProduct(productName) {
  alert(`Has comprado ${productName}`);
}

// Mostrar las tarjetas en la carga inicial
displayProducts();

function agregar(precio) {
  contador++;
  let carrito = document.getElementById("libros_seleccionados");
  carrito.innerHTML = contador;
  total = total + precio;
  let precioFinal = document.getElementById("valor_total");
  precioFinal.innerHTML = "$" + total;
}

function envio() {
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
