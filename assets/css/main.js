// <---------------------- FUNCIONES -------------------------->
var unloadEvent = function (e) {
    var confirmationMessage = "Warning: Leaving this page will result in any unsaved data being lost. Are you sure you wish to continue?";
    (e || window.event).returnValue = confirmationMessage; //Gecko + IE
    cerrar_sesion();
    return confirmationMessage; //Webkit, Safari, Chrome etc.
};

/**
 * Cerrar sesión
 */
function cerrar_sesion() {
    $.ajax({
        url: 'models/cerrarSesion.php',
        type: 'POST',
        dataType: 'json',
        beforeSend: () => {
            Swal.fire({
                title: 'Cerrando sesión',
                onOpen: () => {
                    Swal.showLoading()
                },
                allowOutsideClick: false,
                allowEscapeKey: false
            });
        },
    }).done((data) => {
        if (data.status) {
            location.reload();
        } else {
            Swal.fire("Error", 'Error cerrando sesión intente nuevamente', 'error')
                .then(() => {
                    location.reload();
                });
        }
    }).fail(() => {
        Swal.fire("Error", 'La Red no esta disponible', 'error');
    });
};

function setCredenciales(event) {
    // console.log(event);
    var texto = '';
    const element = event.el;
    let pagina = element.getAttribute('href').split('/');
    let id = element.getAttribute('id')
    // Obtenemos el elemento 4 para saber qué pagina se va a cargar
    // if (pagina[2].includes("micro-tec")) {
        pagina = pagina[4];
    // } else if (pagina[2].includes("micropayments")) {
    //     pagina = "micropayments";
    // }

    $('body').addClass('sidebar-icon-only');
    // tour.end();
    if ($("#navcolorbox").length < 1) {
        $("#cboxWrapper").before('');
        $("#cboxWrapper").before(`<nav id="navcolorbox" class="navbar navbar-expand-lg navbar-dark bg-primary sites--navcol">
                    <a class="navbar-brand close-cbox btn-dfl--close" id="cboxClose" title="Regresar al menú"><i class="fas fa-arrow-left mr-2"></i>Regresar al menú</a>
                    <div class="alert alert-warning mx-3 my-1 col-sm-7 col-md-10">
                        <p id="modulo_texto"></p>
                    </div>
                    <button class="navbar-toggler d-none" type="button" data-toggle="collapse" data-target="#navbaTiendaExpress" aria-controls="navbaTiendaExpress" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbaTiendaExpress">
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item active d-none">
                                <a class="nav-link" href="#">Inicio <span class="sr-only">(current)</span></a>
                            </li>
                            <li class="nav-item">

                            </li>
                        </ul>
                    </div>
                </nav>`);
    }

    $.ajax({
        url: 'models/sitios.php',
        type: 'POST',
        dataType: 'JSON',
        async: false,
        data: {
            function: 'crearCredenciales',
            sitio: pagina,
            opcion: id
        }
    }).done((data) => {
        console.log("Sesión creada");
        if (pagina === 'tar') {
            texto = "Tarifario (Venta de planes Tarifarios)";
        } else if (pagina === 'mpayExpress' && id === 'venta_tae') {
            texto = "Venta TAE (Recarga tiempo aire electrónico)";
            localStorage.setItem('modulo', id);
        } else if (pagina === 'mpayExpress' && id === 'pago_servicios') {
            texto = "Pago de Servicios (Paga tu recibo CFE, Telmex, Dish y más...)";
            localStorage.setItem('modulo', id);
        // } else if (pagina === 'payjoy') {
        //     texto = "";
        } else if (pagina === 'taf') {
            texto = "Amigo Fácil (Venta en TAF)";
        } else if (pagina === 'tramitesExpress') {
            texto = "Trámites (Trámites básicos, cambio de chips con saldo)";
        } else if (pagina === 'Control_Pedidos') {
            texto = "Pedidos (Pedidos en línea)";
            localStorage.setItem("tipo", "MP");
            localStorage.setItem("esExpress", "EXP");
        } else if (pagina === 'chipsExpress') {
            texto = "Venta y reporte de Chips 50";
        }
        $("#modulo_texto").html(texto);
    }).fail(() => {
        Swal.fire("Error", 'La red no esta disponible', 'error');
    });
}

function quitCredenciales(event) {
    const element = event.el;
    let pagina = element.getAttribute('href').split('/');
    // Obtenemos el elemento 4 para saber qué pagina se va a cargar
    if (pagina[2].includes("micro-tec")) {
        pagina = pagina[4];
    } else if (pagina[2].includes("micropayments")) {
        pagina = "micropayments";
    }

    $.ajax({
        url: 'models/sitios.php',
        type: 'POST',
        dataType: 'JSON',
        async: false,
        data: {
            function: 'quitarCredenciales',
            sitio: pagina
        }
    }).done((data) => {
        console.log("Sesión finalizada");
        if (pagina === 'Control_Pedidos') {
            // texto = "Pedidos (Pedidos en línea)";
            localStorage.removeItem("tipo");
            localStorage.removeItem("esExpress");
        }
    }).fail(() => {
        Swal.fire("Error", 'La red no esta disponible', 'error');
    });
}

function consultar_saldo() {
    $.ajax({
        url: 'models/sitios.php',
        type: 'POST',
        dataType: 'JSON',
        async: false,
        data: {
            function: 'consultarSaldo',
        }
    }).done((data) => {
        data = JSON.parse(data);
        if (data.status === 1) {
            $("#saldo_actual").html(`Saldo actual: $${parseFloat(data.saldo).toFixed(2)}`);
        } else {
            Swal.fire("Error", data.msg, 'error');
        }
    }).fail(() => {
        Swal.fire("Error", 'La red no esta disponible', 'error');
    });
}

function set_saldo() {
    $.ajax({
        url: 'models/sitios.php',
        type: 'POST',
        dataType: 'JSON',
        async: false,
        data: {
            function: 'consultarSaldo',
        }
    }).done((data) => {
        data = JSON.parse(data);
        if (data.status === 1) {
            $("#sactual .saldoActual").text(`${parseFloat(data.saldo).toFixed(2)}`);
            console.log(`El saldo: ${parseFloat(data.saldo).toFixed(2)}`)
        } else {
            Swal.fire("Error", data.msg, 'error');
        }
    }).fail(() => {
        Swal.fire("Error", 'La red no esta disponible', 'error');
    });
}

function showloader() {
    if ($('#preloder').hasClass('d-none')) {
        $('#preloder').removeClass('d-none');
    }
}

function removerLoader(event) {
    $('#preloder').addClass('d-none');

    const element = event.el;
    let pagina = element.getAttribute('href').split('/');
    let parmsR = element.getAttribute('href').indexOf('rec');
    let parmsS = element.getAttribute('href').indexOf('serv');
    // Obtenemos el elemento 4 para saber qué pagina se va a cargar

    pagina = pagina[4];

    if (parmsR > 0) {
        setTimeout("createSc('loadmodule')", 2900);
    } else
    if (parmsS > 0) {
        setTimeout("createSc('loadmodule-s')", 2900);
    }

}

function createSc(filename) {
    var script = document.createElement('script');
    console.log(filename + ' filename');
    script.onload = function () {
        // alert("Script loaded and ready");
    };
    script.src = "https://www.micro-tec.com.mx/pagina/tiendaExpress/assets/js/" + filename + ".js";
    frames[0].document.body.appendChild(script);
}

function cargarSwal(option) {
    let opc1, opc2, href1, href2;
    switch (option) {
        case 1:
            opc1 = "Venta de planes";
            href1 = "https://www.micro-tec.com.mx/pagina/tar/";
            opc2 = "Renovaciones";
            href2 = "https://www.micro-tec.com.mx/pagina/ass/ass";
            break;
        case 2:
            opc1 = "Cambio de compañia";
            opc2 = "Portabilidad";
            break;
        default:
            // statements_def
            break;
    }
}

// <---------------------- EVENTOS -------------------------->

// window.addEventListener("beforeunload", unloadEvent);

$(document).on('click', '.close-cbox', function () {
    $.colorbox.close();
});

// https://www.jacklmoore.com/colorbox/
// Iniciamos la librería
$('.colorbox').colorbox({
    iframe: true,
    width: "100%",
    height: "100%",
    transition: "fade",
    onOpen: setCredenciales,
    html: "<p>Hello</p>",
    onCleanup: quitCredenciales,
    onLoad: showloader,
    onComplete: removerLoader
});

set_saldo();

$(document).on('ready', function () {

    if ($("#colorbox").length > 0) {
        cosole.log('ya existe el menu');
    } else {
        $("#cboxWrapper").before(`<nav class="navbar navbar-expand-lg navbar-dark bg-primary sites--navcol">
                    <a class="navbar-brand close-cbox btn-dfl--close" id="cboxClose" title="Regresar"><i class="fas fa-arrow-left mr-2"></i>Regresar al menú</a>
                    <div class="alert alert-warning mx-3 my-1 col-sm-7 col-md-10">
                        <p>Lorem ipsum dolor, sit amet, consectetur adipisicing elit. Ducimus corrupti saepe ex dignissimos nemo eaque.</p>
                    </div>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbaTiendaExpress" aria-controls="navbaTiendaExpress" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbaTiendaExpress">
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item active d-none">
                                <a class="nav-link" href="#">Inicio <span class="sr-only">(current)</span></a>
                            </li>
                            <li class="nav-item">

                            </li>
                        </ul>
                    </div>
                </nav>`);
    }
});