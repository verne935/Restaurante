
const body = document.querySelector('body'),
      sidebar = body.querySelector('nav'),
      toggle = body.querySelector(".toggle"),
      modeSwitch = body.querySelector(".toggle-switch"),
      modeText = body.querySelector(".mode-text"),
      pedidosLink = document.getElementById('pedidosLink');

// Evento para alternar la visibilidad de la barra lateral
toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
});

// Función para cambiar entre modos claro y oscuro
function toggleDarkMode() {
    body.classList.toggle("dark");
    updateModeText();
}

// Actualizar el texto del modo claro/oscuro
function updateModeText() {
    if (body.classList.contains("dark")) {
        modeText.innerHTML = '<span class="underline">M</span>odo Oscuro';
    } else {
        modeText.innerHTML = '<span class="underline">M</span>odo Claro';
    }
}

// Evento para cambiar entre modos claro y oscuro
modeSwitch.addEventListener("click", () => {
    toggleDarkMode();
});

// Evento para cambiar modo con Control + M
document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 'm') {
        event.preventDefault();
        toggleDarkMode();
    }
});

// Evento para redirigir a la página de pedidos con Control + P
document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 'p') {
        event.preventDefault();  // Evita que se guarde la página
        window.location.href = pedidosLink.href;
    }
});

// Inicializar el texto del modo al cargar la página
updateModeText();





// Detectar pérdida de conexión a Internet y mostrar error 404
window.addEventListener('offline', function() {
    // Redirigir a la página 404 cuando se pierde la conexión
    window.location.href = '404.html';
});
// Detectar reconexión a Internet y redirigir a la interfaz de pedidos sin recargar
window.addEventListener('online', function() {
    // Redirigir a la interfaz de pedidos al reconectarse
    window.location.href = 'index.html'; // Cambia esta ruta a la URL que deseas en caso de reconexión
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js').then(() => {
        console.log('Service Worker registrado con éxito.');
    }).catch((error) => {
        console.log('Error al registrar el Service Worker:', error);
    });
}
