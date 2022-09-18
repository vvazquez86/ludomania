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

let divProductos = document.getElementById("productos")

function mostrarStock(array) {
    divProductos.innerHTML = ""
    array.forEach((producto) => {
        let nuevoProducto = document.createElement("div")
        nuevoProducto.innerHTML = `<div id="${producto.id}" class="card bg-secondary text-white" style="width: 18rem;">
                                        <img src="img/${producto.img}" class="card-img-top border" alt="${producto.nombre}">
                                        <div class="card-body">
                                          <h5 class="card-title">${producto.nombre}</h5>
                                          <p class="card-text">Tipo: ${producto.tipo}</p>
                                          <p class="card-text">Precio: $${producto.precio}</p>
                                          <a href="#" class="btn btn-success">Comprar</a>
                                        </div>
                                    </div>`
        divProductos.append(nuevoProducto)
    })
    let btnCompra = document.getElementsByClassName("btnComprar")
    for (let compra of btnCompra) {
        compra.addEventListener("click", () => {
            alert("El producto ha sido comprado")
        })
    }
}

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
    productoBuscado.value=""    
})

//BOTON FILTRA POR TIPO
let btnFiltrarPorTipo = document.getElementById("btnFiltrar")
btnFiltrarPorTipo.addEventListener("click", ()=>{
    filtrarPorTipo()
    filtrarTipo.value = ""
})


