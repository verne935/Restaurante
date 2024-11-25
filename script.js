// Selección de elementos principales del DOM
const body = document.querySelector('body'); // Obtiene el cuerpo del documento
const bannerContenedor = document.getElementById('banner-contenedor'); // Contenedor del banner
const modeSwitch = document.querySelector(".toggle-switch"); // Selector del interruptor de modo claro/oscuro
const toggleButton = document.querySelector('.toggle'); // Botón para alternar la barra lateral
const pedidosLink = document.getElementById('pedidosLink'); // Enlace para pedidos
let currentIndex = 0; // Índice actual del carrusel
let images = []; // Almacena las imágenes cargadas
let carouselInterval; // Intervalo para el carrusel

// ==================== CONFIGURACIÓN DE IMÁGENES ====================
const bannerImages = {
    pc: { // Imágenes para PC
        light: ['img/error404.jpg', 'img/blanco2.webp', 'img/blanco3.webp'], // Modo claro
        dark: ['img/oscuro1.webp', 'img/oscuro2.webp', 'img/oscuro3.webp'] // Modo oscuro
    },
    mobile: { // Imágenes para móviles
        light: ['img/mobil1.webp', 'img/mobil2.webp', 'img/mobil3.webp'], // Modo claro
        dark: ['img/mobile1.webp', 'img/mobile2.webp', 'img/mobile3.webp'] // Modo oscuro
    }
};

// ==================== DETECTAR DISPOSITIVO ====================
// Determina si el dispositivo es móvil
function isMobile() {
    return window.innerWidth <= 768; // True si el ancho de la ventana es menor o igual a 768px
}

// ==================== FUNCIONES PARA EL BANNER ====================
// Carga las imágenes dependiendo del dispositivo (PC o móvil) y modo (claro/oscuro)
function loadBannerImages() {
    const mode = body.classList.contains("dark") ? 'dark' : 'light'; // Verifica el modo actual
    const deviceType = isMobile() ? 'mobile' : 'pc'; // Determina el dispositivo
    bannerContenedor.innerHTML = ''; // Limpia el contenedor del banner

    // Carga las imágenes correspondientes
    images = bannerImages[deviceType][mode].map(src => {
        const img = document.createElement('img'); // Crea un elemento img
        img.src = src; // Establece la fuente de la imagen
        img.classList.add('banner-imagen'); // Agrega la clase CSS
        bannerContenedor.appendChild(img); // Añade la imagen al contenedor
        return img; // Devuelve la imagen
    });

    currentIndex = 0; // Reinicia el índice
    if (images.length > 0) {
        images[0].classList.add('active'); // Activa la primera imagen
    }
}

// Inicia el carrusel de imágenes
function startCarousel() {
    stopCarousel(); // Detiene cualquier carrusel activo
    carouselInterval = setInterval(() => {
        images[currentIndex].classList.remove('active'); // Desactiva la imagen actual
        currentIndex = (currentIndex + 1) % images.length; // Pasa a la siguiente imagen
        images[currentIndex].classList.add('active'); // Activa la nueva imagen
    }, 2500); // Cambia cada 2.5 segundos
}

// Detiene el carrusel de imágenes
function stopCarousel() {
    clearInterval(carouselInterval); // Limpia el intervalo
}

// ==================== FUNCIONES EXISTENTES ====================
// Cambiar entre modo claro y oscuro
function toggleDarkMode() {
    body.classList.toggle("dark"); // Alterna la clase 'dark' en el cuerpo
    loadBannerImages();  // Recarga las imágenes del banner según el modo
    startCarousel();     // Reinicia el carrusel
}

// ==================== DETECCIÓN DE ERROR 404 ====================
// Detecta pérdida de conexión a Internet
window.addEventListener('offline', function () {
    window.location.href = '404.html'; // Redirige a la página 404
});

// Detecta reconexión a Internet
window.addEventListener('online', function () {
    window.location.href = 'index.html'; // Redirige a la página principal
});

// ==================== COMANDOS ====================
// Comando para alternar modo claro/oscuro con Ctrl + M
document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 'm') { // Detecta Ctrl + M
        event.preventDefault();
        toggleDarkMode(); // Cambia el modo
    }
});

// Comando para redirigir a la página de pedidos con Ctrl + P
document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 'p') { // Detecta Ctrl + P
        event.preventDefault();
        if (pedidosLink) {
            window.location.href = pedidosLink.href; // Redirige al enlace de pedidos
        }
    }
});

// ==================== EVENTOS ====================
// Detecta redimensionamiento de la pantalla
window.addEventListener('resize', () => {
    loadBannerImages(); // Recarga las imágenes para el tamaño nuevo
    startCarousel();    // Reinicia el carrusel
});

// Alterna la barra lateral
toggleButton.addEventListener("click", () => {
    const sidebar = document.querySelector('.sidebar'); // Obtiene la barra lateral
    sidebar.classList.toggle("close"); // Alterna la clase 'close'
});

// Cambia entre modo claro y oscuro al hacer clic en el interruptor
modeSwitch.addEventListener("click", () => {
    toggleDarkMode(); // Llama a la función de modo oscuro
});

// ==================== REGISTRO DE SERVICE WORKER ====================
// Registra un Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js').then(() => {
        console.log('Service Worker registrado con éxito.');
    }).catch((error) => {
        console.log('Error al registrar el Service Worker:', error);
    });
}

// ==================== INICIALIZACIÓN ====================
// Inicializa el banner y el carrusel al cargar la página
loadBannerImages(); // Carga las imágenes iniciales
startCarousel();    // Inicia el carrusel
