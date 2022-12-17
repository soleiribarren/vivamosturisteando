const productos = [
    { 
        id: 1, 
        nombre: "AGENDA DE VIAJE", 
        categoria: "Producto", 
        precio: 1000,
        imgUrl: "../img/agenda.jpg"
    },{ 
        id: 2, 
        nombre: "CALENDARIO DE FOTOS", 
        categoria: "Producto", 
        precio: 1500,
        imgUrl: "../img/calendario.jpg",
    },{
        id: 3,
        nombre: "SERVICIO DE COMMUNITY MANAGER",
        categoria: "Servicio",
        precio: 2000,
        imgUrl: "../img/community.jpg",
    },{
        id: 4,
        nombre: "SERVICIO DE DRONE Y FOTOGRAFIA",
        categoria: "Servicio",
        precio: 3000,
        imgUrl: "../img/drone.jpg",
    }
];

let botonComprar = document.getElementById("comprar")
botonComprar.onclick= () => {
   localStorage.clear()
   carrito.innerHTML = ""
}

let contenedorProductos = document.getElementById("contenedorProductos")
let carrito = document.getElementById("carrito")
let arrayCarrito = []


if(localStorage.getItem("carrito")) {
    arrayCarrito = JSON.parse(localStorage.getItem("carrito"))
}

renderizarCarrito()
renderizarProductos(productos)

function renderizarProductos(arrayProductos) {
    contenedorProductos.innerHTML = ""
    for (const producto of arrayProductos) {
        let tarjetaProducto = document.createElement("div");

        
        tarjetaProducto.className = "producto"
        
        tarjetaProducto.innerHTML = `<h3> ${producto.nombre}</h3>
                                    <p>  Categoria: ${producto.categoria}</p>
                                    <img src=${producto.imgUrl}>
                                    <p> $ ${producto.precio}</p>
                                    <button class="botonProducto" id=${producto.id}>Agregar al carrito</button>`

        contenedorProductos.append(tarjetaProducto);

    }

    let botones = document.getElementsByClassName("botonProducto")
    for (const boton of botones) {
        boton.addEventListener("click", agregarAlCarrito)
    }

}

let input = document.getElementById("input")
input.addEventListener("input", fnInput)

function fnInput() {
    console.log(input.value)
    let productosFiltrados = productos.filter(producto => producto.nombre.includes(input.value))
    renderizarProductos(productosFiltrados)
}

function agregarAlCarrito(e) {
    let productoBuscado = productos.find(producto => producto.id == e.target.id)
    let posicionProducto = arrayCarrito.findIndex(producto => producto.id == e.target.id)
  
    if (posicionProducto != -1) {
      arrayCarrito[posicionProducto] = {
        id: arrayCarrito[posicionProducto].id, nombre: arrayCarrito[posicionProducto].nombre, precio: arrayCarrito[posicionProducto].precio, unidades: arrayCarrito[posicionProducto].unidades + 1, subtotal: arrayCarrito[posicionProducto].precio * (arrayCarrito[posicionProducto].unidades + 1)
      }
    } else {
      arrayCarrito.push({
        id: productoBuscado.id, nombre: productoBuscado.nombre, precio: productoBuscado.precio, unidades: 1, subtotal: productoBuscado.precio
      })
    }
  
    let carritoJSON = JSON.stringify(arrayCarrito)
    localStorage.setItem("carrito", carritoJSON)

    renderizarCarrito()
  }
  
  function renderizarCarrito() {
    carrito.innerHTML = ""
    for (const itemCarrito of arrayCarrito) {
      carrito.innerHTML += `
        <div class="itemCarrito">
          <h3>${itemCarrito.nombre}</h3>
          <h3>${itemCarrito.unidades}</h3>
          <h3>${itemCarrito.subtotal}</h3>
        </div>
      `
    }
  }