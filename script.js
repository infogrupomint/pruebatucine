// Ejemplo de productos
const productos = [
    { id: 1, nombre: 'Balde Pop ', precio: 1000, imagen: 'baldepop.png' },
    { id: 2, nombre: 'Bolsa Pop', precio: 800, imagen: 'bolsapop.png' },
    { id: 3, nombre: 'Nachos Cheddar', precio: 1000, imagen: 'nachos.png' },
    { id: 4, nombre: 'Superpancho', precio: 800, imagen: 'pancho.png' },
    { id: 5, nombre: 'Nuggets', precio: 1000, imagen: 'nuggets.png' },
    { id: 6, nombre: 'Pizza', precio: 800, imagen: 'pizza.png' },

    { id: 7, nombre: 'Coca Cola ', precio: 1000, imagen: 'cocacola.png' },
    { id: 8, nombre: 'Sprite', precio: 800, imagen: 'sprite.png' },
    { id: 9, nombre: 'Fanta', precio: 1000, imagen: 'fanta.png' },

  // Agrega más productos según sea necesario
];

// Variables globales
let carrito = [];
let totalCarrito = 0;

// Función para mostrar productos en la página
function mostrarProductos() {
    const productosContainer = document.getElementById('productos');

    productos.forEach(producto => {
        const productoElement = document.createElement('div');
        productoElement.classList.add('producto');
        productoElement.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio.toFixed(2)}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>

                `;
        productosContainer.appendChild(productoElement);
    });
}

// Función para agregar productos al carrito
function agregarAlCarrito(productoId) {
    const producto = productos.find(p => p.id === productoId);

    if (producto) {
        carrito.push(producto);
        totalCarrito += producto.precio;

        // Actualizar el carrito y el total en la página
        actualizarCarrito();
    }
}

// Función para actualizar el carrito en la página
function actualizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    const totalCarritoElement = document.getElementById('totalCarrito');

    // Limpiar el carrito previo
    listaCarrito.innerHTML = '';

    // Agregar los nuevos elementos al carrito 
    carrito.forEach(producto => {
        const itemCarrito = document.createElement('li');
        itemCarrito.textContent = `${producto.nombre} - $${producto.precio.toFixed(2)}`;
        listaCarrito.appendChild(itemCarrito);
    });


    // Actualizar el total en el carrito
    totalCarritoElement.innerText = totalCarrito.toFixed(2);
}

// Funcion para el boton de refrescar o reiniciar carrito
document.getElementById('refreshButton').addEventListener('click', function() {
    location.reload(true);
});

// Función para realizar el pedido
function realizarPedido() {
    const salaSeleccionada = document.getElementById('sala').value;
    const ubicacion = document.getElementById('ubicacion').value;

    // Formar el mensaje del pedido
    let mensajePedido = `Pedido:\n`;
    carrito.forEach(producto => {
        mensajePedido += `${producto.nombre} - $${producto.precio.toFixed(2)}\n`;
    });
    mensajePedido += `\nTotal: $${totalCarrito.toFixed(2)}\nSala: ${salaSeleccionada}\nUbicación: ${ubicacion}`;

    // Enviar el pedido a través de WhatsApp
    const numeroWhatsApp = '2364265933'; // Reemplaza con tu número de WhatsApp
    const enlaceWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensajePedido)}`;

    // Abrir WhatsApp en una nueva pestaña
    window.open(enlaceWhatsApp, '_blank');

    // Limpiar el carrito y los campos
    carrito = [];
    totalCarrito = 0;
    document.getElementById('lista-carrito').innerHTML = '';
    document.getElementById('totalCarrito').innerText = totalCarrito;
    document.getElementById('sala').value = 'Sala 1';
    document.getElementById('ubicacion').value = '';
}

// Llamar a la función para mostrar productos al cargar la página
mostrarProductos();
