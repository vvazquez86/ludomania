//Constructor
class Producto {
    constructor(id, nombre, tipo, precio, img) {
        //propiedades o atributos de nuestra clase
        this.id = id,
            this.nombre = nombre,
            this.tipo = tipo,
            this.precio = precio,
            this.img = img
    }
    //Mostrar los productos
    mostrarData() {
        console.log(`El productor ${this.nombre}, del tipo ${this.tipo} tiene el precio de ${this.precio} pesos`)
    }
}
//Instanciación de objetos -- respetamos orden y cantidad de atributos

const producto1 = new Producto(1, "Cartas de Poker", "Cartas", 1200, "cartaspokerr.jpg")

const producto2 = new Producto(2, "Cartas Españolas", "Cartas", 350, "cartasespaniolas.jpg")

const producto3 = new Producto(3, "Maletin de 500 fichas", "Fichas", 15000, "maletin500.jpg")

const producto4 = new Producto(4, "Maletin de 200 fichas", "Fichas", 9000, "maletin200.jpg")

const producto5 = new Producto(5, "Monopolis", "Juego de mesa", 5500, "monopoli.jpg")

const producto6 = new Producto(6, "Estanciero", "Juego de mesa", 6000, "estanciero.jpg")

const producto7 = new Producto(7, "Batalla Naval", "Juego de mesa", 8500, "batallanaval.jpg")

//Array que contiene todos los productos

const listaProductos = [producto1, producto2, producto3, producto4, producto5, producto6, producto7]


//Funciones:

//FUNCION MOSTRAR STOCK:
let carritoArray = []
if (localStorage.getItem('carrito')){
    console.log("a ver que pasa papa")
    carritoArray = JSON.parse(localStorage.getItem('carrito'))
}

let divProductos = document.getElementById("productos")

function mostrarStock(array) {
    divProductos.innerHTML = ""
    array.forEach((producto) => {
        let nuevoProducto = document.createElement("div")
        nuevoProducto.innerHTML = `<div id="${producto.id}" class="card bg-secondary text-white btnComprar" style="width: 18rem;">
                                        <img src="img/${producto.img}" class="card-img-top border" alt="${producto.nombre}">
                                        <div class="card-body">
                                          <h5 class="card-title">${producto.nombre}</h5>
                                          <p class="card-text">Tipo: ${producto.tipo}</p>
                                          <p class="card-text">Precio: $${producto.precio}</p>
                                          <button id="btnComprar${producto.id}" class="btn btn-success btnComprar">Agregar al carrito</button>
                                        </div>
                                    </div>`
        divProductos.append(nuevoProducto)
        //Boton para agregar producto al carrito
        let btnComprar = document.getElementById(`btnComprar${producto.id}`)
        btnComprar.addEventListener("click", () => {
            agregarAlCarrito(producto)
            alert("Producto agregado al carrito")
        })        
    })
}
function agregarAlCarrito(prod) {        
    carritoArray.push(prod)
    //Aca estamos acualizando el storage despues de que el carrito fuese pusheado
    localStorage.setItem('carrito', JSON.stringify(carritoArray))                  
}

localStorage.setItem('carrito', JSON.stringify(carritoArray)) 

//<script src="https://cdn.jsdelivr.net/npm/luxon@2.3.0/build/global/luxon.min.js"></script>

//FUNCION BUSCAR POR NOMBRE

let productoBuscado = document.getElementById("buscarProducto")

function buscarProducto() {
    let productoEncontrado = listaProductos.filter((producto) => producto.nombre.toLowerCase().includes(productoBuscado.value.toLowerCase()))
    if (productoEncontrado.length == 0) {
        alert("Producto no encontrado")
        productoBuscado.value = ""
    } else {
        divProductos.innerHTML = ""
        mostrarStock(productoEncontrado)
    }
}

//FUNCION FILTRAR POR TIPO
let filtrarTipo = document.getElementById("filtrarTipo")
function filtrarPorTipo() {
    let tipoEncontrado = listaProductos.filter((tipo) => tipo.tipo.toLowerCase() == filtrarTipo.value.toLowerCase())
    if (tipoEncontrado.length == 0) {
        alert("No hay productos de ese tipo")
    } else {
        divProductos.innerHTML = ""
        mostrarStock(tipoEncontrado)
    }
}

//BOTON MOSTRAR STOCK
let btnMostrarStock = document.getElementById("mostrarStock")
btnMostrarStock.addEventListener("click", () => {
    mostrarStock(listaProductos)
})

//BOTON BUSCAR POR NOMBRE
let btnBuscarPorNombre = document.getElementById("btnBuscar")
btnBuscarPorNombre.addEventListener("click", () => {
    buscarProducto()
    productoBuscado.value = ""
})

//BOTON FILTRA POR TIPO
let btnFiltrarPorTipo = document.getElementById("btnFiltrar")
btnFiltrarPorTipo.addEventListener("click", () => {
    filtrarPorTipo()
    filtrarTipo.value = ""
})

//DOM CARRITO

let btnCarrito = document.getElementById("btnCar")
let modalBody = document.getElementById("modalBody")
let btnComprar = document.getElementById("btnBuy")
let parrafoCompra = document.getElementById("pay")
let carritoEnJSON =[]

btnCarrito.addEventListener("click", ()=>{        
    localStorage.setItem('carrito', JSON.stringify(carritoArray)) 
    carritoEnJSON = JSON.parse(localStorage.getItem('carrito')) 
    cargarCarrito(carritoEnJSON)     
})

function cargarCarrito(array) {
    modalBody.innerHTML = ""
    array.forEach((productoCarrito) => {
        modalBody.innerHTML += `
                <div class="card">
                    <div class="card-header">
                        Producto
                    </div>
                    <div class="card-body">
                         <h5 class="card-title">${productoCarrito.nombre}</h5>
                         <p id="pay" class="card-text">Precio $${productoCarrito.precio}</p>
                         <a href="#" class="btn btn-danger">Eliminar</a>
                    </div>
                </div>
        `
    })
    //localStorage.setItem('carrito', JSON.stringify(array))
    //Calcular el total
    totalProductos(array)
}

function totalProductos (array){
    let acumulador = 0
    acumulador = array.reduce((acumulador, carritoArray)=>{
        return acumulador + carritoArray.precio
    },0)
    //console.log(`El total hasta ahora es: $${acumulador}`)
    if(acumulador == 0){
        parrafoCompra.innerHTML = "No hay productos en el carrito"
    }else{
        parrafoCompra.innerHTML = `El total de su carrito es $${acumulador}`
    }    
}