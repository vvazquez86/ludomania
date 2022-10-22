function alertProductoAgregado(){
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 750,
        timerProgressBar: false,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    Toast.fire({
        icon: 'success',
        title: 'Agregado al carrito'
    })
}
function alertNoHayProductosEnCarrito(){
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: false,
    })
    Toast.fire({
        icon: 'warning',
        title: 'No nay productos en el carrito'
    })
}
function alertComprarProductos(){
    swal.fire({
        title: "Quiere realizar la siguiente compra",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        confirmButtonColor: "green",
        cancelButtonColor: "red"
    }).then((respuesta) => {
        //Si la respuesta es afirmativa va a resetear el carrito y finalizar la compra
        if (respuesta.isConfirmed) {
            //Resetaer el carrito cuando se finaliza la compra
            carritoArray = []
            localStorage.removeItem('carrito')
            //Alerta de compra realizada
            swal.fire({
                title: 'Compra realizada',
                icon: 'success',
                confirmButtonColor: 'green',
                text: 'Gracias por elegirnos',
            })
        }
        //Si no realiza la compra el carrito va a quedar como esta y se le va a notificar por alerta
        else {
            swal.fire({
                title: 'Compra no realizaa',
                icon: 'error',
                confirmButtonColor: 'green',
                text: 'Los productos siguen en el carrito'
            })
        }
    })
}
function alertVaciarCarrito(){
    swal.fire({
        title: "Quiere eliminar todos los productos de carrito",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        confirmButtonColor: "green",
        cancelButtonColor: "red"
    }).then((respuesta) => {
        //Si la respuesta es afirmativa va a resetear el carrito
        if (respuesta.isConfirmed) {
            carritoArray = []
            localStorage.removeItem('carrito')
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: false,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            Toast.fire({
                icon: 'success',
                title: 'Se eliminaron todos los productos',
            })                
            cantCarrito.style.display = "none";
        } else {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: false,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            Toast.fire({
                icon: 'warning',
                title: 'Accion Cancelada',
                timer: '1500'
            })
        }
    })
}

