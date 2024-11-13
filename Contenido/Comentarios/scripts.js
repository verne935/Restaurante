
function enviarComentario() {

    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var correo = document.getElementById("correo").value;
    var comentario = document.getElementById("comentario").value;

    var formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('apellido', apellido);
    formData.append('correo', correo);
    formData.append('comentario', comentario);

    fetch('https://formspree.io/f/mzbnoopy', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Hubo un problema al enviar el formulario.');
        }
        alert('¡Gracias por tu comentario!');
        document.getElementById("nombre").value = "";
        document.getElementById("apellido").value = "";
        document.getElementById("correo").value = "";
        document.getElementById("comentario").value = "";
    })
    .catch(error => {
        console.error('Error:', error);
    });
}