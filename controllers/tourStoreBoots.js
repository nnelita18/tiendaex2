(function ($) {
    var startBtnId = 'startTourBtn';
    // Instance the tour
    var tour = new Tour({
        steps: [{
                element: "#banner-title",
                title: "¡Bienvenido!",
                content: "Tienda Express es la plataforma mediante la cual harás crecer tu negocio. Los trámites y servicios más solicitados por tus clientes los podrás realizar aquí.",
                template: "<div class='popover tour'><div class='arrow'></div><h3 class='popover-header popover-title'></h3><div class='popover-body'>Content modified of my step</div><div class='popover-navigation'> <button class='btn btn-primary' data-role='prev'>« Atrás</button> <span data-role='separator'></span> <button class='btn btn-primary' data-role='next'>Siguiente »</button> <button class='btn btn-success' data-role='end'>Cerrar</button></div></div>"
            },
            {
                element: "#sec-saldo",
                title: "Saldo Actual",
                content: "Ten siempre visible la cantidad de saldo que tienes disponible para realizar recargas, pago de servicios, etc.",
                template: "<div class='popover tour'><div class='arrow'></div><h3 class='popover-header popover-title'></h3><div class='popover-body'>Content modified of my step</div><div class='popover-navigation'> <button class='btn btn-primary' data-role='prev'>« Atrás</button> <span data-role='separator'></span> <button class='btn btn-primary' data-role='next'>Siguiente »</button> <button class='btn btn-success' data-role='end'>Cerrar</button></div></div>"
                // reflex: true
            },
            {
                element: "#services",
                title: "Servicios",
                content: "En nuestro menú interactivo tendrás el acceso a los trámites y/o servicios que desees ofrecer a tus clientes.",
                template: "<div class='popover tour'><div class='arrow'></div><h3 class='popover-header popover-title'></h3><div class='popover-body'>Content modified of my step</div><div class='popover-navigation'> <button class='btn btn-primary' data-role='prev'>« Atrás</button> <span data-role='separator'></span> <button class='btn btn-primary' data-role='next'>Siguiente »</button> <button class='btn btn-success' data-role='end'>Cerrar</button></div></div>",
                placement: "top"
                // reflex: true
            },
            {
                element: "#hmb",
                title: "Menú de Funciones Administrativas",
                content: "Al dar clic en este ícono se va a  mostrar/ocultar el menú de funciones administrativas donde revisarás temas como son tu saldo y ganancias.",
                template: "<div class='popover tour'><div class='arrow'></div><h3 class='popover-header popover-title'></h3><div class='popover-body'>Content modified of my step</div><div class='popover-navigation'> <button class='btn btn-primary' data-role='prev'>« Atrás</button> <span data-role='separator'></span> <button class='btn btn-primary' data-role='next'>Siguiente »</button> <button class='btn btn-success' data-role='end'>Cerrar</button></div></div>",
                placement: "top"
                // reflex: true
            },
            {
                element: "#startTourBtn",
                title: "Conoce la Plataforma",
                content: "En esta opción puedes acceder al recorrido para conocer la plataforma de Tienda Express.",
                template: "<div class='popover tour'><div class='arrow'></div><h3 class='popover-header popover-title'></h3><div class='popover-body'>Content modified of my step</div><div class='popover-navigation'> <button class='btn btn-primary' data-role='prev'>« Atrás</button> <span data-role='separator'></span> <button class='btn btn-primary' data-role='next'>Siguiente »</button> <button class='btn btn-success' data-role='end'>Cerrar</button></div></div>"
                // reflex: true
            },
            {
                element: "#tour-dep",
                title: "Depósito de saldo",
                content: "Desde aquí revisaras todas las cuestiones relacionadas con tu saldo (cuentas para depositar, registro de abono, etc.)",
                template: "<div class='popover tour'><div class='arrow'></div><h3 class='popover-header popover-title'></h3><div class='popover-body'>Content modified of my step</div><div class='popover-navigation'> <button class='btn btn-primary' data-role='prev'>« Atrás</button> <span data-role='separator'></span> <button class='btn btn-primary' data-role='next'>Siguiente »</button> <button class='btn btn-success' data-role='end'>Cerrar</button></div></div>"
                // reflex: true
            },
            {
                element: "#tour-movsal",
                title: "Movimientos de saldo",
                content: "Ingresa para revisar todos los movimientos en los que has consumido saldo.",
                template: "<div class='popover tour'><div class='arrow'></div><h3 class='popover-header popover-title'></h3><div class='popover-body'>Content modified of my step</div><div class='popover-navigation'> <button class='btn btn-primary' data-role='prev'>« Atrás</button> <span data-role='separator'></span> <button class='btn btn-primary' data-role='next'>Siguiente »</button> <button class='btn btn-success' data-role='end'>Cerrar</button></div></div>"
                // reflex: true
            },
            {
                element: "#tour-ganan",
                title: "Mis ganancias",
                content: "Revisa las ganancias obtenidas por las ventas de Payjoy, planes Telcel, celulares a crédito con Telcel y cambios de compañía.",
                template: "<div class='popover tour'><div class='arrow'></div><h3 class='popover-header popover-title'></h3><div class='popover-body'>Content modified of my step</div><div class='popover-navigation'> <button class='btn btn-primary' data-role='prev'>« Atrás</button> <span data-role='separator'></span> <button class='btn btn-primary' data-role='next'>Siguiente »</button> <button class='btn btn-success' data-role='end'>Cerrar</button></div></div>"
                // reflex: true
            },
            {
                element: "#tour-duds",
                title: "Dudas o preguntas",
                content: "Ingresa aquí para tener respuesta de las dudas que tengas con respecto a la plataforma o algún tramite/servicio.",
                template: "<div class='popover tour'><div class='arrow'></div><h3 class='popover-header popover-title'></h3><div class='popover-body'>Content modified of my step</div><div class='popover-navigation'> <button class='btn btn-primary' data-role='prev'>« Atrás</button> <span data-role='separator'></span> <button class='btn btn-primary' data-role='next'>Siguiente »</button> <button class='btn btn-success' data-role='end'>Cerrar</button></div></div>"
                // reflex: true
            },
            {
                element: "#tour-exit",
                title: "SALIR",
                content: "Cierra sesión cada vez que no utilices la plataforma.",
                template: "<div class='popover tour'><div class='arrow'></div><h3 class='popover-header popover-title'></h3><div class='popover-body'>Content modified of my step</div><div class='popover-navigation'> <button class='btn btn-primary' data-role='prev'>« Atrás</button> <span data-role='separator'></span> <button class='btn btn-primary' data-role='next'>Siguiente »</button> <button class='btn btn-success' data-role='end'>Cerrar</button></div></div>"
                // reflex: true
            }
        ],
        animation: true,
        backdrop: true,
        storage: false
    });

    // Initialize the tour

    // Start the tour
    // tour.start();
    tour.init();
    document.getElementById(startBtnId).addEventListener('click', function () {
        console.log('here btn');

        // tour.restart();
        tour.start();
    });

})(jQuery);