let contador = 0;
let total = 0;

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
