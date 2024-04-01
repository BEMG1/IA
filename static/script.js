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

    var idioma = localStorage.getItem('Languaje');


    $.post('/consultar_respuesta', { pregunta: pregunta, idioma: idioma }, function (respuesta) {
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

function cambiarIdioma() {
    var selectIdiom = document.getElementById("select-idioma");
    var idiomaselect = selectIdiom.value;
    console.log("idioma seleccionado: ", idiomaselect);

    if (idiomaselect) {
        localStorage.setItem('Languaje', idiomaselect);
        actualizarTraducciones(idiomaselect);
    } else {
        console.error("el idioma seleccionado es invalido: ", idiomaselect);
    }
}

function actualizarTraducciones(idioma) {
    var Locale = "";
    if (idioma === 'es') {
        Locale = '/static/es-traduccion.json';
    } else if ( idioma === 'en') {
        Locale = '/static/en-traduccion.json';
    } else {
        console.error("idioma no reconocido: ", idioma);
        return;
    }

    fetch(Locale)
        .then(response => response.json())
        .then(data => {
            if (data.hasOwnProperty(idioma)){
                var traducciones = data[idioma];
                for (var key in traducciones){
                    if (traducciones.hasOwnProperty(key)) {
                        var element = document.getElementById(key);
                        if(element) {

                            if (element.tagName.toLowerCase() === 'textarea') {
                                element.setAttribute('placeholder', traducciones[key]);
                            } else {
                            
                            element.innerHTML = traducciones[key];
                            }
                        }
                    }
                }
            } else {
                console.error('no hay traducciones');
            }
        })
        .catch(error => {
            console.error('Error al cargar las traducciones'. error);
        })
}



function inicializarIdioma() {
    var selectElement = document.getElementById("select-idioma");
    var idiomaGuardado = localStorage.getItem('Languaje');
    console.log("idioma guardada: ", idiomaGuardado);

    actualizarTraducciones(idiomaGuardado);

    for (var i = 0; i < selectElement.options.length; i++) {
        if (selectElement.options[i].value === idiomaGuardado) {
            selectElement.options[i].selected = true;
            break;  
        }
    }
    
}

window.addEventListener('load', inicializarIdioma);



function guardarModo() {
    var modo = document.getElementById('selector-modo').value;
    localStorage.setItem('Modo', modo);
    }


function aplicarModo() {
    var modoActual = localStorage.getItem('Modo');
    var selector = document.getElementById("selector-modo");
    if (modoActual === 'oscuro') {
        document.body.classList.add('modo-oscuro');

    } else {
        document.body.classList.remove('modo-oscuro');
    }


    for (var i = 0; i < selector.options.length; i++) {
        if (selector.options[i].value === modoActual) {
            selector.options[i].selected = true;
            break;  
        }
    }
}

function guardar(){

    cambiarIdioma();
    guardarModo();
    aplicarModo();

}

document.addEventListener('DOMContentLoaded', function () {
    aplicarModo();

});


