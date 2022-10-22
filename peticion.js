//Constructor
class Producto {
    constructor(id, nombre, precio, imagen, cantidad) {
        //propiedades o atributos de nuestra clase
        this.id = id,
            this.nombre = nombre,            
            this.precio = precio,
            this.imagen = imagen,
            this.cantidad = cantidad           
    }   
    
}

let catalogo = []
const cargarCatalogo = async() =>{
    const respuesta = await fetch("productos.json")
    const data = await respuesta.json()    
    for (let producto of data){
        let productoNuevo = new Producto(producto.id, producto.nombre, producto.precio, producto.imagen, producto.cantidad)
        catalogo.push(productoNuevo)
    }
    localStorage.setItem("catalogo", JSON.stringify(catalogo))
}

if(localStorage.getItem("catalogo")){
    catalogo = JSON.parse(localStorage.getItem("catalogo"))
}
else{    
    cargarCatalogo()
}
