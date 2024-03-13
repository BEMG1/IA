document.write('<script src="https://code.jquery.com/jquery-3.6.4.min.js"><\/script>');

function controlBoton() {
    var usuario = document.getElementById('input-pregunta');
    var btnpregunta = document.getElementById('btnpreguntar');

    if (usuario.value.trim() !== '') {
        btnpregunta.disabled = false;
        btnpregunta.style.opacity = '1';
        btnpregunta.style.cursor = 'pointer';
    } else {
        btnpregunta.disabled = true;
        btnpregunta.style.opacity = '0.5';
        btnpregunta.style.cursor = 'default';
    }
}

function controlLimpiar() {
    var btnlimpiar = document.getElementById('btnlimpiar');
    var contenedor = document.getElementById('chat');

    if (contenedor.children.length > 0 ) {
        btnlimpiar.disabled = false;
        btnlimpiar.style.opacity = '1';
        btnlimpiar.style.cursor = 'pointer';
    } else {
        btnlimpiar.disabled = true;
        btnlimpiar.style.opacity = '0.5';
        btnlimpiar.style.cursor = 'default';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    controlBoton();
    controlLimpiar();
});

function validarCampo() {
    controlBoton();
}

function consultarRespuesta() {
    var inputUsuario = document.getElementById('input-pregunta');
    var pregunta = inputUsuario.value.trim();
    var chatConten = document.getElementById('chat');
    var parrafo = document.createElement('p');
    var icono = document.createElement('img');
    icono.src = '../static/img/usuario.png';
    icono.classList.add('icono-usuario');
    parrafo.innerHTML = pregunta + ' :';
    parrafo.appendChild(icono);
    chatConten.appendChild(parrafo);

    var separador = document.createElement('hr');
    separador.classList.add('hr-difuminado');
    chatConten.appendChild(separador);

    parrafo.classList.add('derecha');
    inputUsuario.disabled = true;

    $.post('/consultar_respuesta', { pregunta: pregunta }, function (respuesta) {
        var chatContenido = document.getElementById('chat');
        var nRespuesta = document.createElement('p');
        nRespuesta.innerHTML = 'bIA: ';
        chatContenido.appendChild(nRespuesta);

        respuesta.split('').forEach(function (letra, index) {

            setTimeout( function () {
                nRespuesta.innerHTML += letra;
                chatContenido.scrollTop = chatContenido.scrollHeight;

            }, index * 20);
        });
        setTimeout(function() {
            inputUsuario.disabled = false;
        }, respuesta.length * 20);

        setTimeout(function() {
            inputUsuario.disabled = false; 
            inputUsuario.focus(); 
        }, respuesta.length * 20);

    });
    inputUsuario.value = '';

    controlBoton();
    controlLimpiar();
}

var verificar;
document.addEventListener('DOMContentLoaded', function () {

    var chatContainer = document.getElementById('chat');
    var btnScroll = document.getElementById('BtnScroll');

    function btnToScroll() {

        chatContainer.scrollTop = chatContainer.scrollHeight;
        btnScroll.style.display = 'none';
    }

    btnScroll.addEventListener('click', btnToScroll);

    verificar = function () {
        var siverificar = chatContainer.scrollHeight - chatContainer.scrollTop - chatContainer.clientHeight <= 1;

        if (siverificar) {
            btnScroll.style.display = 'none';
        } else {

            btnScroll.style.display = 'block';
        }
    }
    verificar();

    chatContainer.addEventListener('scroll', verificar);
    window.addEventListener('load', verificar);
    window.addEventListener('resize', verificar);

});

function enviarEnter(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        consultarRespuesta();
    }

}

function limpiarChat() {
    document.getElementById('chat').innerHTML = '';

    controlLimpiar();

    setTimeout( function () {
        verificar();
    }, 0);
}
