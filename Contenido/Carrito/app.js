// Variable que mantiene el estado visible del carrito
var carritoVisible = false;

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    // Agregar funcionalidad a los botones del carrito
    var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for (var i = 0; i < botonesEliminarItem.length; i++) {
        var button = botonesEliminarItem[i];
        button.addEventListener('click', eliminarItemCarrito);
    }

    var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for (var i = 0; i < botonesSumarCantidad.length; i++) {
        var button = botonesSumarCantidad[i];
        button.addEventListener('click', sumarCantidad);
    }

    var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for (var i = 0; i < botonesRestarCantidad.length; i++) {
        var button = botonesRestarCantidad[i];
        button.addEventListener('click', restarCantidad);
    }

    var botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for (var i = 0; i < botonesAgregarAlCarrito.length; i++) {
        var button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarritoClicked);
    }

    actualizarTotalCarrito(); // Inicializar el total del carrito
}

function agregarAlCarritoClicked(event) {
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    var precio = item.getElementsByClassName('precio-item')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;

    agregarItemAlCarrito(titulo, precio, imagenSrc);
    hacerVisibleCarrito();
}

function hacerVisibleCarrito() {
    carritoVisible = true;
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    var items = document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '60%';
}

function agregarItemAlCarrito(titulo, precio, imagenSrc) {
    var item = document.createElement('div');
    item.classList.add('item');
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for (var i = 0; i < nombresItemsCarrito.length; i++) {
        if (nombresItemsCarrito[i].innerText === titulo) {
            alert("El item ya se encuentra en el carrito");
            return;
        }
    }

    var itemCarritoContenido = `
        <div class="carrito-item">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">${precio}</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `;
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

    item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);
    item.getElementsByClassName('restar-cantidad')[0].addEventListener('click', restarCantidad);
    item.getElementsByClassName('sumar-cantidad')[0].addEventListener('click', sumarCantidad);

    actualizarTotalCarrito();
}

function sumarCantidad(event) {
    var selector = event.target.parentElement;
    var cantidadActual = parseInt(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual + 1;
    actualizarTotalCarrito();
}

function restarCantidad(event) {
    var selector = event.target.parentElement;
    var cantidadActual = parseInt(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    if (cantidadActual > 1) {
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual - 1;
        actualizarTotalCarrito();
    }
}

function eliminarItemCarrito(event) {
    event.target.parentElement.parentElement.remove();
    actualizarTotalCarrito();
    ocultarCarrito();
}

function ocultarCarrito() {
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    if (carritoItems.childElementCount === 0) {
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;

        var items = document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '100%';
    }
}

function actualizarTotalCarrito() {
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    var total = 0;

    for (let i = 0; i < carritoItems.length; i++) {
        var item = carritoItems[i];
        var precio = parseFloat(item.getElementsByClassName('carrito-item-precio')[0].innerText.replace('$', '').replace(',', ''));
        var cantidad = parseInt(item.getElementsByClassName('carrito-item-cantidad')[0].value);
        total += precio * cantidad;
    }

    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$' + total.toLocaleString("es") + ",00";

    // Actualizar el monto en el formulario de PayPal
    document.getElementById('paypal-amount').value = total;
}
// Mostrar el popup al cargar la página
window.addEventListener('load', function() {
    const popup = document.getElementById('popup');
    popup.style.opacity = '1';
    popup.style.visibility = 'visible';
});

// Función para cerrar el popup
function cerrarPopup() {
    const popup = document.getElementById('popup');
    popup.style.opacity = '0';
    popup.style.visibility = 'hidden';
}


// Función para verificar la conexión a Internet
        function verificarConexion() {
            if (!navigator.onLine) {
                // Redirige a la página de error 404 personalizada
                window.location.href = '404.html';
            }
        }

        // Llama a la función para verificar la conexión cuando se carga la página
        verificarConexion();

        // Opción: Puedes hacer una verificación periódica cada cierto tiempo
        setInterval(verificarConexion, 1000); // Cada 1 segundos









// Lista de productos
const productos = [
    { nombre: 'Queso Oaxaca', precio: '$40', img: 'img/Empanadas/e1.png' },
    { nombre: 'Jamon con Queso', precio: '$40', img: 'img/Empanadas/e2.png' },
    { nombre: 'Queso Doble Crema C/Azúcar', precio: '$40', img: 'img/Empanadas/e3.png' },
    { nombre: 'Carne', precio: '$40', img: 'img/Empanadas/e4.png' },
    { nombre: 'Carne con Queso', precio: '$40', img: 'img/Empanadas/e5.png' },
    { nombre: 'Carne con Frijol', precio: '$40', img: 'img/Empanadas/e6.png' },
    { nombre: 'Carne con Frijol y Queso', precio: '$40', img: 'img/Empanadas/e7.png' },
    { nombre: 'Frijol con Queso', precio: '$40', img: 'img/Empanadas/e8.png' },
    { nombre: 'Camaron', precio: '$45', img: 'img/Empanadas/e9.png' },
    { nombre: 'Camaron con Queso', precio: '$50', img: 'img/Empanadas/e10.png' },
    { nombre: 'Camaron al Mojo de Ajo', precio: '$45', img: 'img/Empanadas/e11.png' },
    { nombre: 'Camaron al Mojo de Ajo con Queso', precio: '$50', img: 'img/Empanadas/e12.png' },
    { nombre: 'Camaron con Chuleta y Queso', precio: '$55', img: 'img/Empanadas/e13.png' },
    { nombre: 'Chuleta Ahumada con Queso', precio: '$40', img: 'img/Empanadas/e14.png' },
    { nombre: 'Cuatro Quesos', precio: '$40', img: 'img/Empanadas/e15.png' },
    { nombre: 'Suprema', precio: '$40', img: 'img/Empanadas/e16.png' },
    { nombre: 'Hawaiana', precio: '$40', img: 'img/Empanadas/e17.png' },
    { nombre: 'Espinaca con Queso', precio: '$40', img: 'img/Empanadas/e18.png' },
    { nombre: 'Champiñon con Queso', precio: '$40', img: 'img/Empanadas/e19.png' },
    { nombre: 'Champiñon con Espinaca y Queso', precio: '$45', img: 'img/Empanadas/e20.png' },
    { nombre: 'Champiñon con Frijol', precio: '$40', img: 'img/Empanadas/e21.png' },
    { nombre: 'Champiñon con Frijol y Queso', precio: '$45', img: 'img/Empanadas/e22.png' },
    { nombre: 'Mixta de Camaron', precio: '$55', img: 'img/Empanadas/e23.png' },
    { nombre: 'Mixta de Champiñon', precio: '$45', img: 'img/Empanadas/e24.png' },
    { nombre: 'Mixta de Carne', precio: '$45', img: 'img/Empanadas/e25.png' },
    { nombre: 'Norteña', precio: '$40', img: 'img/Empanadas/e26.png' },
    { nombre: 'Camaron al Chiltepin', precio: '$55', img: 'img/Empanadas/e27.png' },
    { nombre: 'Ingrediente Extra: Jamón', precio: '$10', img: 'img/Ingredientes/i1.png' },
    { nombre: 'Ingrediente Extra: Queso', precio: '$10', img: 'img/Ingredientes/i2.png' },
    { nombre: 'Ingrediente Extra: Champiñon', precio: '$10', img: 'img/Ingredientes/i3.png' },
    { nombre: 'Ingrediente Extra: Espinaca', precio: '$10', img: 'img/Ingredientes/i4.png' },
    { nombre: 'Ingrediente Extra: Piña', precio: '$10', img: 'img/Ingredientes/i5.png' },
    { nombre: 'Ingrediente Extra: Frijol', precio: '$10', img: 'img/Ingredientes/i6.png' },
    { nombre: 'Ingrediente Extra: Carne', precio: '$10', img: 'img/Ingredientes/i7.png' },
    { nombre: 'Ingrediente Extra: Chuleta', precio: '$10', img: 'img/Ingredientes/i8.png' },
    { nombre: 'Tacos de Birria', precio: '$16', img: 'img/Extras/ta.png' },
    { nombre: 'Consome de Birria', precio: '$85', img: 'img/Extras/co.png' },
    { nombre: 'Empanabirria', precio: '$50', img: 'img/Extras/eb.png' },
    { nombre: 'Coca Cola', precio: '$25', img: 'img/Extras/ca.png' },
    { nombre: 'Jamaica 1/2Lt', precio: '$20', img: 'img/Extras/2t.png' },
    { nombre: 'Jamaica 1Lt', precio: '$30', img: 'img/Extras/1t.png' },
    { nombre: 'Maracuya 1/2Lt', precio: '$20', img: 'img/Extras/m1.png' },
    { nombre: 'Maracuya 1Lt', precio: '$30', img: 'img/Extras/m2.png' }
];

function filtrarProductos() {
    const busqueda = document.getElementById('busqueda').value.toLowerCase();
    const lista = document.getElementById('listaFiltrada');
    lista.innerHTML = ''; // Limpiar la lista
    const productosFiltrados = productos.filter(producto => producto.nombre.toLowerCase().includes(busqueda));
    productosFiltrados.forEach(producto => {
        const item = document.createElement('div');
        item.classList.add('item');
        item.innerHTML = `
            <span class="titulo-item">${producto.nombre}</span>
            <img src="${producto.img}" alt="" class="img-item">
            <span class="precio-item">${producto.precio}</span>
            <button class="boton-item">Agregar al Carrito</button>
        `;
        lista.appendChild(item);

        // Agregar el evento click al botón "Agregar al Carrito"
        const botonAgregar = item.getElementsByClassName('boton-item')[0];
        botonAgregar.addEventListener('click', agregarAlCarritoClicked);
    });
}




// Función para redirigir a la sección del carrito
function scrollToSection() {
  document.getElementById("carrito").scrollIntoView({
    behavior: "smooth"
  });
}

// Función para mostrar u ocultar el botón flotante del carrito
function actualizarBotonFlotante() {
  const carritoItems = document.querySelector('.carrito-items');
  const floatingCartButton = document.getElementById('floating-cart');

  if (carritoItems && carritoItems.children.length > 0) {
    floatingCartButton.style.display = 'flex'; // Muestra el botón si hay elementos en el carrito
  } else {
    floatingCartButton.style.display = 'none'; // Oculta el botón si el carrito está vacío
  }
}

// Habilita arrastrar el botón flotante
const floatingCart = document.getElementById("floating-cart");

let offsetX, offsetY;

// Manejador de inicio de arrastre
floatingCart.addEventListener("mousedown", (e) => {
  offsetX = e.clientX - floatingCart.getBoundingClientRect().left;
  offsetY = e.clientY - floatingCart.getBoundingClientRect().top;
  document.addEventListener("mousemove", moveFloatingCart);
  document.addEventListener("mouseup", stopMovingFloatingCart);
});

// Función para mover el botón al arrastrar
function moveFloatingCart(e) {
  floatingCart.style.left = `${e.clientX - offsetX}px`;
  floatingCart.style.top = `${e.clientY - offsetY}px`;
  floatingCart.style.right = "auto"; // Quita la posición inicial de right
  floatingCart.style.bottom = "auto"; // Quita la posición inicial de bottom
}

// Función para detener el movimiento
function stopMovingFloatingCart() {
  document.removeEventListener("mousemove", moveFloatingCart);
  document.removeEventListener("mouseup", stopMovingFloatingCart);
}

// Actualización del botón flotante después de agregar o eliminar elementos
function agregarAlCarritoClicked(event) {
  // Lógica para agregar el artículo al carrito (ya existente en tu código)
  // ... código para agregar el elemento al carrito ...

  // Llama a actualizarBotonFlotante para mostrar el botón si es necesario
  actualizarBotonFlotante();
}

function eliminarItemCarrito(event) {
  // Lógica para eliminar el artículo del carrito (ya existente en tu código)
  event.target.parentElement.parentElement.remove();

  // Llama a actualizarBotonFlotante para ocultar el botón si el carrito queda vacío
  actualizarBotonFlotante();
}

// Verificar el estado del botón flotante al cargar la página
document.addEventListener('DOMContentLoaded', actualizarBotonFlotante);

