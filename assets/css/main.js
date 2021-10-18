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
    var texto = '',
        bgnav = '#ffffe5';
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
        $("#cboxWrapper").before(`<nav id="navcolorbox" class="navbar navbar-expand-lg navbar-dark sites--navcol">
          <a class="navbar-brand btn-dfl--close close-cbox btn-theme--primary" id="cboxClose" title="Regresar al menú">
            <i class="fas fa-arrow-left mr-2"></i>Regresar al menú</a>
          </a>
          <div class="alert alert-pink my-1 col-sm-12 col-md-12 col-lg-7">
              <p id="modulo_texto">Compra los equipos y chips que requieres a través de nuestra tienda virtual y recíbelos en físico en tu tienda.</p>
          </div>
          <div class="alert-pink depositos-sald">
            <div class="action-btn">
              <a href="" class="btn action-btn--tut">Ver Tutorial</a>
              <a href="" id="doubcoll" class="btn action-btn--faq">Dudas o preguntas</a>
            </div>
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
        // console.log("Sesión creada");
        if (pagina === 'solicitudesExpress_nuevo' && id == 'tar') {
            texto = "Tarifario (Venta de planes Tarifarios)";
            bgnav = '#274696';
            $('#doubcoll').attr('href', 'coldds-11');
        } else if (pagina === 'mpayExpress' && id === 'venta_tae') {
            texto = "Venta TAE (Recarga tiempo aire electrónico)";
            bgnav = '#c63468';
            $('#doubcoll').attr('href', 'coldds-4');
            localStorage.setItem('modulo', id);

        } else if (pagina === 'mpayExpress' && id === 'pago_servicios') {
            texto = "Pago de Servicios: Cobra los servicios más solicitados por tus clientes y genera ganancias (Telmex, Totalplay, CFE, etc.)";
            bgnav = '#e9501a';
            $('#doubcoll').attr('href', 'coldds-5');
            localStorage.setItem('modulo', id);
            // } else if (pagina === 'payjoy') {
            //     texto = "";
        } else if (pagina === "solicitudesExpress" && id === 'taf') {
            texto = "Amigo Fácil (Venta en TAF)";
            bgnav = '#f9b030';
            $('#doubcoll').attr('href', 'coldds-12');
        } else if (pagina === 'tramitesExpress' && id == "tramites") {
            texto = "Trámites (Trámites básicos, cambio de chips con saldo)";
            bgnav = '#a55171';
        } else if (pagina === 'Control_Pedidos') {
            texto = "Pedidos (Pedidos en línea)";
            bgnav = '#41b0f0';
            $('#doubcoll').attr('href', 'coldds-10');
            localStorage.setItem("tipo", "MP");
            localStorage.setItem("esExpress", "EXP");
        } else if (pagina === 'tramitesExpress' && id == "chips") {
            texto = "Venta y reporte de Chips 50";
            bgnav = '#57509d';
            $('#doubcoll').attr('href', 'coldds-8');
        } else if (pagina === 'tramitesExpress' && id == "pago_payjoy") {
            texto = "Pago de PayJoy";
            bgnav = '#57509d';
            $('#subPayjoy').modal('hide');
            $('#doubcoll').attr('href', 'coldds-9');
        }
        $("#modulo_texto").html(texto);
        $('#navcolorbox').addClass('opt-col');
        $('#navcolorbox').css('backgroundColor', bgnav);

    }).fail(() => {
        $('#navcolorbox').removeClass('opt-col');
        $('#navcolorbox').css('backgroundColor', '#ffffe5');
        Swal.fire("Error", 'La red no esta disponible', 'error');

    });
}

function quitCredenciales(event) {
    const element = event.el;
    let pagina = element.getAttribute('href').split('/');
    // Obtenemos el elemento 4 para saber qué pagina se va a cargar
    // if (pagina[2].includes("micro-tec")) {
    pagina = pagina[4];
    let id = element.getAttribute('id')
    // } else if (pagina[2].includes("micropayments")) {
    //     pagina = "micropayments";
    // }

    $.ajax({
        url: 'models/sitios.php',
        type: 'POST',
        dataType: 'JSON',
        async: false,
        data: {
            function: 'quitarCredenciales',
            sitio: pagina,
            opcion: id
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

/**
 * Se selecciona entre dos opciones para cargar el iframe
 * @param {Event} ev Evento al llamar al Swal
 */
function cargarSwal(ev) {
    // console.log(ev.target.closest('div[class~="submenu"]'));
    let div = ev.target.closest('div[class~="submenu"]');
    let sitio = div.dataset.sitio,
        sitio2 = div.dataset.sitio2,
        href = div.dataset.href,
        href2 = div.dataset.href2,
        opcion = div.dataset.opcion,
        opcion2 = div.dataset.opcion2;

    // let $a = $("<a>");

    Swal.fire({
        title: 'Opciones',
        text: "¿A qué sitio desea ingresar?",
        icon: 'info',
        showCancelButton: true,
        showDenyButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: sitio,
        cancelButtonText: 'Cancelar',
        denyButtonText: sitio2,
    }).then((result) => {
        console.log(result);
        if (result.isConfirmed) {
            $('.asubmenu').attr('href', href);
            $('.asubmenu').attr('id', opcion);
            $('.asubmenu').click();

        } else if (result.isDenied) {
            $('.asubmenu').attr('href', href2);
            $('.asubmenu').attr('id', opcion2);
            $('.asubmenu').click();
        }
    })
}

function activarAdelantos() {
    Swal.fire({
        html: "<h5>Para usar este servicio debe solicitar su activación, posteriormente uno de nuestros asesores le dará atención a su petición, le enviara sus claves de acceso y le dará a conocer los detalles acerca del servicio. <br> Si tiene alguna duda por favor llame al numero: 221-521-1050</h5>",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Solicitar activación',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: 'models/sitios.php',
                type: 'POST',
                dataType: 'JSON',
                async: false,
                data: {
                    function: 'SolicitarActivacionAdelantos',
                }
            }).done((data) => {
                if (data.status === true) {
                    Swal.fire('Éxito', 'Se ha hecho su solicitud, muy pronto uno de nuestros asesores se pondra en contacto con usted para continuar con el proceso de activación', 'success');
                } else {
                    Swal.fire("Error", data.msg, 'error');
                }
            }).fail(() => {
                Swal.fire("Error", 'Error de conexión', 'error');
            });
        }
    })
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

(function () {
    var store = '';
    var localStore = {
        saveLocalStorage: function (numCollap) {
            localStorage.setItem('collapseItem', JSON.stringify(numCollap));
        },
        loadLocalStorage: function () {
            var store = JSON.parse(localStorage.getItem('collapseItem'));
            if (store) {
                return store;
            }
        },
        clearLocalStorage: function () {
            localStorage.removeItem('collapseItem');
        }
    };

    $(document).on('click', '#doubcoll', function (e) {
        e.preventDefault();
        let idCollapse = $(this).attr('href');
        localStore.saveLocalStorage(idCollapse)
        $.colorbox.close();
        console.log('idCollapse' + idCollapse);
    });
    $('#tour-duds').on('click', function () {
        localStore.clearLocalStorage();
    });
})();