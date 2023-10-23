let contador = JSON.parse(localStorage.getItem("contador")) || 0;
let total = JSON.parse(localStorage.getItem("total")) || 0;

const arrayProductos = [];

const botonEnvio = document.querySelector("#botonEnvio");
botonEnvio.addEventListener("click", envio);
const botonFiltrar = document.querySelector("#botonFiltrar");
botonFiltrar.addEventListener("click", filtrarProductos);
const botonBorrar = document.querySelector("#botonBorrar");
botonBorrar.addEventListener("click", borrarCarrito);

const metodoCredito = document.querySelector("#botonCredito");
metodoCredito.addEventListener("click", () => pagar(1)); //Arrow para que no se ejecute al iniciar la ventana
const metodoDebito = document.querySelector("#botonDebito");
metodoDebito.addEventListener("click", () => pagar(2));

const unaCuota = document.querySelector("#botonUna");
unaCuota.addEventListener("click", () => dividir("1"));
const tresCuotas = document.querySelector("#botonTres");
tresCuotas.addEventListener("click", () => dividir("3"));
const seisCuotas = document.querySelector("#botonSeis");
seisCuotas.addEventListener("click", () => dividir("6"));

const botonPagar = document.querySelector("#pagar");
botonPagar.addEventListener("click", terminar);

const botonAtras = document.querySelector("#botonAtras");
botonAtras.addEventListener("click", irAtras);

// Realizar solicitud a la API
fetch("https://fakestoreapi.com/products")
  .then((response) => response.json())
  .then((data) => {
    arrayProductos.push(...data);
    console.log(arrayProductos);
    const resultadosDiv = document.getElementById("productos-container");
    data.forEach((item) => {
      const productoDiv = document.createElement("div");
      productoDiv.classList.add("card", "mb-2");
      productoDiv.innerHTML = `
                        <img src="${item.image}" class="card-img-top" alt="${item.title}">
                        <div class="card-body">
                            <h5 class="card-title">${item.title}</h5>
                            <p class="card-text">Precio: $${item.price}</p>
                            <button class="btn btn-primary" onclick="comprarProducto('${item.title}', ${item.price})">Comprar</button>
                        </div>
                    `;
      resultadosDiv.appendChild(productoDiv);
    });
  })
  .catch((error) => {
    console.error("Error al obtener los datos: " + error);
  });

//Muestra al abrir la ventana lo que hay en el localStorage
window.onload = function () {
  let carrito = document.querySelector("#productos_seleccionados");
  carrito.innerHTML = contador;
  let precioFinal = document.querySelector("#valor_total");
  precioFinal.innerHTML = "$" + total;
};

//Funcion de compra
function comprarProducto(productName, productPrecio) {
  contador++;
  Toastify({
    text: `"${productName}" fue agregado al carrito`,
    className: "info",
    style: {
      background: "linear-gradient(to right, #CA7DF9, #E83151)",
    },
  }).showToast();
  let carrito = document.getElementById("productos_seleccionados");
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

//funcion que calcula si el envío se cobra o no
function envio() {
  if (contador === 0) {
    Swal.fire({
      title: "Selecciona un libro",
      text: "Selecciona al menos un libro antes de continuar",
      icon: "warning",
      confirmButtonText: "Cool",
    });
  } else {
    document.getElementById("productContainer").style.display = "none";
    document.getElementById("verResultados").style.display = "none";
    document.getElementById("pago").style.display = "block";
    if (total < 300) {
      let valorEnvio = document.getElementById("valorEnvio");
      valorEnvio.innerHTML = "El envío cuesta $50.";
      total += 50;
      let precioFinal = document.getElementById("valor_total");
      precioFinal.innerHTML = "$" + total;
      document.getElementById("botonEnvio").disabled = true;
    } else {
      let valorEnvio = document.getElementById("valorEnvio");
      valorEnvio.innerHTML = "El envío es gratis.";
      document.getElementById("botonEnvio").disabled = true;
    }
  }
}

//funcion con los alerts de pago simulados
function pagar(boton) {
  switch (boton) {
    case 1:
      botonCredito.style.backgroundColor = "black";
      document.getElementById("cuotas").style.display = "flex";
      dividir();
      break;
    case 2:
      document.getElementById("pago").style.display = "none";
      Swal.fire({
        title: "Su compra fue realizada con éxito",
        text: "Llegará dentro de los próximos 10 días hábiles",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
      setTimeout(reinicio, 2000);
      break;
    default:
      Swal.fire({
        title: "Selecciona un método de pago",
        text: "Selecciona un método de pago para continuar",
        icon: "warning",
        showConfirmButton: false,
        timer: 2000,
      });
  }
}

//Switch de las cuotas disponibles
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

//deja la pantalla de confirmacion y los botones finales
function terminar() {
  document.getElementById("pago").style.display = "none";
  Swal.fire({
    title: "Su compra fue realizada con éxito",
    text: "Llegará dentro de los próximos 10 días hábiles",
    icon: "success",
    showConfirmButton: false,
    timer: 2000,
  });
  setTimeout(borrarSesion, 2000); //Espera al alert para hacer la funcion de reinicio
}

//Funcion que filtra los productos, trae los datos de la API y busca segun el criterio (precio máximo)
function filtrarProductos() {
  const precioMax =
    parseFloat(document.getElementById("precioMax").value) || Number.MAX_VALUE;

  // Realizar solicitud a la API de FakeStore
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
      // Filtrar productos de la API por precio máximo
      const productosFiltrados = data.filter((item) => item.price <= precioMax);
      console.log(productosFiltrados);

      // Mostrar los productos filtrados en la página
      mostrarResultados(productosFiltrados);
    })
    .catch((error) => {
      console.error("Error al obtener los datos: " + error);
    });
}

//función que muestra los resultados en el container
function mostrarResultados(productos) {
  const resultadosDiv = document.getElementById("verResultados");
  document.getElementById("verResultados").style.display = "flex";
  resultadosDiv.innerHTML = "";

  // Mostrar los productos filtrados
  productos.forEach((item) => {
    const productoDiv = document.createElement("div");
    productoDiv.classList.add("card", "mb-2");
    productoDiv.innerHTML = `
        <img src="${item.image}" class="card-img-top" alt="${item.title}">
        <div class="card-body">
          <h5 class="card-title">${item.title}</h5>
          <p class="card-text">Precio: $${item.price}</p>
          <button class="btn btn-primary" onclick="comprarProducto('${item.title}', ${item.price})">Comprar</button>
        </div>
      `;
    resultadosDiv.appendChild(productoDiv);
  });
  document.getElementById("productContainer").style.display = "none";

  // Si no se encuentran productos que cumplan el filtro
  if (productos.length === 0) {
    resultadosDiv.innerHTML =
      "<p>No se encontraron productos de ese valor.</p>";
    return;
  }
}

//Vuelve del carrito a los productos
function irAtras() {
  location.reload();
}

//Funcion que pregunta al usuario si quiere borrar el carrito y en caso de ser "si" lleva a borrarSesion()
function borrarCarrito() {
  Swal.fire({
    title: "¿Está seguro que desea borrar el carrito?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "No",
    confirmButtonText: "Si, borrar",
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.clear(); // Borra todo el contenido del Local Storage
      Swal.fire("Eliminado!", "tu carrito está vacío");
      setTimeout(borrarSesion, 1000);
    }
  });
}

//Funcion que borra el localStorage si se selecciona borrar carrito o si se realiza la compra
function borrarSesion() {
  localStorage.clear(); // Borra todo el contenido del Local Storage
  location.reload(); // Recarga la página
}
