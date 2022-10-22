//Funciones

let carritoArray = []

localStorage.getItem("carrito") ? carritoArray = JSON.parse(localStorage.getItem('carrito')) : carritoArray = []
let divProductos = document.getElementById("productos")

mostrarStock(catalogo)




//FUNCION MOSTRAR STOCK:

function mostrarStock(array) {
    divProductos.innerHTML = ""
    array.forEach((producto) => {
        let nuevoProducto = document.createElement("div")
        console.log("Me essta mostrando: " + producto.imagen)
        //console.log("Me essta mostrando: " + producto.nombre)
        nuevoProducto.innerHTML = `<div id="${producto.id}" class="card bg-secondary text-white btnComprar" style="width: 18rem;">
                                        <img src="img/${producto.imagen}" class="card-img-top border" alt="${producto.nombre}">
                                        <div class="card-body">
                                          <h5 class="card-title">${producto.nombre}</h5>
                                          <p class="card-text">Precio: $${producto.precio}</p>                                          
                                          <button id="btnComprar${producto.id}" class="btn btn-success btnComprar">Agregar al carrito</button>                                          
                                        </div>
                                    </div>`
        divProductos.append(nuevoProducto)

        //BOTON PARA AGREGAR PRODUCTOS AL CARRITO

        const btnComprar = document.getElementById(`btnComprar${producto.id}`)
        btnComprar.addEventListener("click", () => {
            agregarAlCarrito(producto)
        })
    })
}


//Esta funcion agregar productos al array carrito para despues mostrarlos en el modal del mismo.
function agregarAlCarrito(prod) {
    const repeat = carritoArray.some((productoRepeat) => productoRepeat.id === prod.id)
    if (repeat){
        carritoArray.map((p)=>{
            if(p.id == prod.id){
                p.cantidad++
            }
        })
        alertProductoAgregado()
    }
    else{
        carritoArray.push(prod)
    //Aca estamos acualizando el storage despues de que el carrito fuese pusheado
    localStorage.setItem('carrito', JSON.stringify(carritoArray))
    //Alerta de producto agregado al carrito
    alertProductoAgregado()
    }    
}

//FUNCION BUSCAR POR NOMBRE

const productoBuscado = document.getElementById("buscarProducto")

function buscarProducto() {
    let productoEncontrado = catalogo.filter((producto) => producto.nombre.toLowerCase().includes(productoBuscado.value.toLowerCase()))

    productoEncontrado.length == 0 ? (Swal.fire({
        icon: 'warning',
        title: 'Titulo no encontrado',
    }))(productoBuscado.value = "") : (divProductos.innerHTML = "")(mostrarStock(productoEncontrado), productoBuscado.value = "")

}

//BOTON MOSTRAR STOCK

const btnMostrarStock = document.getElementById("mostrarStock")
btnMostrarStock.addEventListener("click", (e) => {
    e.preventDefault()
    mostrarStock(catalogo)
})

//BOTON BUSCAR POR NOMBRE

const btnBuscarPorNombre = document.getElementById("btnBuscar")
btnBuscarPorNombre.addEventListener("click", (e) => {
    e.preventDefault()
    buscarProducto()
    productoBuscado.value = ""
})

//DOM CARRITO

const btnCarrito = document.getElementById("btnCar")
const modalBody = document.getElementById("modalBody")
const btnComprar = document.getElementById("btnBuy")
const parrafoCompra = document.getElementById("pay")
const btnVaciarCarrito = document.getElementById("btnVaciar")
let carritoEnJSON = []


btnCarrito.addEventListener("click", () => {
    localStorage.setItem('carrito', JSON.stringify(carritoArray))
    carritoEnJSON = JSON.parse(localStorage.getItem("carrito"))
    cargarCarrito(carritoEnJSON)
})

//FUNCION PARA CARGAR EL CARRITO DE COMPRAS MODAL

function cargarCarrito(array) {
    modalBody.innerHTML = ""
    array.forEach((productoCarrito) => {
        modalBody.innerHTML += `
                <div class="card" id="productoCarrito${productoCarrito.id}">
                    <div class="card-header">
                        Producto
                    </div>
                    <div class="card-body">                         
                        <h5 class="card-title">${productoCarrito.nombre}</h5>
                        <p class="card-text">Cantidad: ${productoCarrito.cantidad}</p>
                        <p class="card-text">Precio: $${productoCarrito.precio * productoCarrito.cantidad}</p>                        
                    </div>
                </div>
        `
    })    
    //CALCULAR TOTAL
    totalProductos(array)
}

function totalProductos(array) {
    let acumulador = 0
    acumulador = array.reduce((acumulador, carritoArray) => {
        return acumulador + (carritoArray.precio*carritoArray.cantidad)
    }, 0)

    // Con este operador ternario buscamos saber si hay o no productos en el carrito, si no hay, nos muestra la leyenda de que no hay producto, en cambio si hay productos, nos muestra el total de la compra.
    acumulador == 0 ? parrafoCompra.innerHTML = "No hay productos en el carrito" : parrafoCompra.innerHTML = `El total de su carrito es $${acumulador}`
}

//BOTON VACIAR CARRITO
btnVaciarCarrito.addEventListener('click', () => { vaciarCarrito() })
function vaciarCarrito() {
    if (carritoArray.length == 0) {
        alertNoHayProductosEnCarrito()
    }
    else {
        alertVaciarCarrito()
    }
}

//BOTON COMPRAR
btnComprar.addEventListener("click", () => { finalizarCompra() })
function finalizarCompra() {
    //Si el carrito esta vacío va a dar una alerta de que el carritio no tiene productos
    if (carritoArray.length == 0) {
        alertNoHayProductosEnCarrito()
    }
    //Si el carrito tiene productos, va a consultar primero si quiere realizar la compra
    else {
        alertComprarProductos()
    }
}


