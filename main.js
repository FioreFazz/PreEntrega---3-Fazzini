
const habitaciones = [
    
    {id: "Habitacion101", tipo: "Doble", imagen: "./img/hab/101.jpg", nombre: "Miró", precio: 2100},
    {id: "Habitacion102", tipo: "Doble", imagen: "./img/hab/102.jpg", nombre: "Picasso", precio: 2200},
    {id: "Habitacion103", tipo: "Doble", imagen: "./img/hab/103.jpg", nombre: "Kandinsky", precio: 2100},
    {id: "Habitacion201", tipo: "Triple", imagen: "./img/hab/201.jpg", nombre: "Warhol", precio: 3100},
    {id: "Habitacion202", tipo: "Triple", imagen: "./img/hab/202.jpg", nombre: "Van Gogh", precio: 3100},
    {id: "Habitacion301", tipo: "simple", imagen: "./img/hab/301.jpg", nombre: "Vilaró", precio: 1100},
]

//lo que llamamos del DOM
const contenedorHabitaciones = document.querySelector("#contenedor-habitaciones")
let botonesAgregar = document.querySelectorAll(".habitacion-agregar")
const numerito = document.querySelector("#numerito");
let habitacionesEnCarrito 
const carritoGuardado = JSON.parse (localStorage.getItem("habitaciones-en-carrito"))


const actualizarNumeroCarrito = () => {
    let nuevoNumero = habitacionesEnCarrito.reduce((acc, habitacion) => acc + habitacion.cantidad, 0)
    numerito.innerText = nuevoNumero 
}

if(carritoGuardado){
    habitacionesEnCarrito  = carritoGuardado
    actualizarNumeroCarrito()
}else{
    habitacionesEnCarrito  = []
}


const agregarAlCarrito = (e) => {
    const idBoton = e.currentTarget.id
    const productoAgregado = habitaciones.find(habitacion => habitacion.id === idBoton)

    if(habitacionesEnCarrito.some(habitacion => habitacion.id === idBoton)){
        const index = habitacionesEnCarrito.findIndex(habitacion => habitacion.id === idBoton)
        habitacionesEnCarrito[index].cantidad++
    } else {
        productoAgregado.cantidad = 1
        habitacionesEnCarrito.push(productoAgregado)
    }
    actualizarNumeroCarrito()
    
    localStorage.setItem("habitaciones-en-carrito", JSON.stringify(habitacionesEnCarrito))
}

const cargarBotonesAgregar = () => {
    botonesAgregar = document.querySelectorAll(".habitacion-agregar")

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito)
    })
}



//funcion cargar habitaciones
const cargarHabitaciones = () => {

    //me va a vaciar el contenedor primero
    contenedorHabitaciones.innerHTML = ""

    habitaciones.forEach(habitacion => {

        const div = document.createElement ("div")
        div.classList.add("habitacion")
        div.innerHTML = `
        <img class="habitacion-imagen" src="${habitacion.imagen}" alt="">
        <div class="habitacion-detalles">
            <h3 class="habitacion-titulo">${habitacion.nombre}</h3>
            <p class="habitacion-precio">${habitacion.precio}</p>

            <input id="" class="ingreso-dias" type="number">

            <button class="habitacion-agregar" id=${habitacion.id}>Agregar al Carrito</button>
        </div>
        `
        contenedorHabitaciones.append(div)

    })
    cargarBotonesAgregar ()
}

cargarHabitaciones()


console.log(habitacionesEnCarrito)


