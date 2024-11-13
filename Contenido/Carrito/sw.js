// sw.js
self.addEventListener('install', function(event) {
    // Precarga la página de error offline
    event.waitUntil(
        caches.open('offline-cache').then(function(cache) {
            return cache.addAll([
                '/offline.html', // La ruta a tu página de error personalizada
                '/img/error404.jpg' // Incluye cualquier recurso adicional
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        fetch(event.request).catch(function() {
            // Si la solicitud falla, muestra la página offline desde el caché
            return caches.match('/offline.html');
        })
    );
});
