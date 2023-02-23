let displayValorAnterior = document.getElementById('valor-anterior');
let displayValorActual = document.getElementById('valor-actual')
let btnsNumeros = document.querySelectorAll('.numero');
let btnsOperadores = document.querySelectorAll('.operador');
let btnUser = document.getElementById("user");

let nombre = prompt("Ingrese usuario");
let titulo = document.getElementById("titulo");

titulo.innerHTML = `Bienvenido ${nombre} a tu calculadora!`;

let index = 1252;

let display = new Display(displayValorAnterior, displayValorActual);

btnsNumeros.forEach(boton => {
    boton.addEventListener('click', () => display.agregarNumero(boton.innerHTML));
});

btnsOperadores.forEach(boton => {
    boton.addEventListener('click', () => display.computar(boton.value));
});

let btn = document.getElementById("user");
btn.addEventListener("click", respuestaClick);
function respuestaClick(){

    (async () => {

const { value: usuario } = await Swal.fire({
  title: 'Ingrese usuario',
  input: 'text',
  inputPlaceholder: 'Juan CoderHouse',
  inputAttributes: {
    autocapitalize: 'off',
    autocorrect: 'off'
  }
})

if (usuario) {
  Swal.fire(`Bienvenido: ${usuario}`)
  let nombre = usuario;
  index++;
  localStorage.setItem("Usuario", nombre);
  let lclstr = localStorage.getItem("Usuario")
  titulo.innerHTML = `Bienvenido ${nombre} a tu calculadora!`;
  console.log(lclstr);

  fetch('https://api.fabianjanuszewski.com/34165/item', {
    method: 'POST',
    body: JSON.stringify({
        itemId: `${index}`,
        student: `${nombre}`,
        operacion: `${Memoria.operacion}`,
        resultado: `${Memoria.resultado}`,
    })
})
    .then((response) => response.json())
    .then((data) => console.log(data))

  fetch(`https://api.fabianjanuszewski.com/34165/item/${index}`)
    .then((response) => response.json())
    .then((data) => console.log(data))



  }
})()
}
