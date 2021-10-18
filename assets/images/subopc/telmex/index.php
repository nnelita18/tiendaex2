<?php
session_start();

if (!isset($_SESSION["tiendaExpress_user"])) {
    header("location: login.php");
}
if (empty($_SERVER['HTTPS']) || $_SERVER['HTTPS'] === "off") {
    $location = 'https://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
    header('HTTP/1.1 301 Moved Permanently');
    header('Location: ' . $location);
    exit;
}
?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Tienda Express</title>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
        integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link
        href="//fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" type="text/css"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons" />

    <link rel="stylesheet" href="./assets/css/colorbox.css">
    <link href="./assets/vendors/bootstrap-tour/css/bootstrap-tour.min.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="./assets/vendors/jquery-ui/jquery-ui.min.css" />
    <link rel="stylesheet" type="text/css" href="./assets/vendors/DataTables/datatables.min.css" />

    <!-- <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap" rel="stylesheet"> -->
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="./assets/vendors/mdi/css/materialdesignicons.min.css">
    <link rel="stylesheet" href="assets/css/style.css">

</head>

<body class="bg-home">
    <div id="preloder" class="d-none">
        <div class="loader"></div>
    </div>


    <div class="container-scroller d-flex">
        <!-- partial:./partials/_sidebar.html -->
        <nav class="sidebar sidebar-offcanvas" id="sidebar">
            <ul id="navmenu" class="nav">
                <li class="nav-item sidebar-category">
                    <a class="navbar-brand brand-logo m-1" href="#">
                        <img src="assets/images/home/logo-tienda.png" class="img-fluid" alt="TIENDA EXPRESS" />
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link py-2 justify-content-center shadow-sm bg-button">
                        <i class="mdi mdi-account-circle"></i>
                        <strong>¡BIENVENIDO!</strong>
                        <span
                            class="menu-title d-block w-100 ml-0 mt-2 font-weight-bold"><?php echo $_SESSION["tiendaExpress_nombre"]; ?></span>
                    </a>
                </li>
                <li class="nav-item active">
                    <a class="nav-link" href="#" onclick="location.reload();">
                        <span class="menu-title">Inicio</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link" id="startTourBtn">
                        <span class="menu-title">¡Conozcamos la plataforma!</span>
                    </a>
                </li>
                <li class="nav-item ">
                    <a id="tour-mdes" class="nav-link pageto" href="views/fns-admin/material.html">
                        <span class="menu-title">Material descargable</span>
                    </a>
                </li>
                <li class="nav-item ">
                    <a id="tour-dep" class="nav-link pageto" href="views/fns-admin/deposito-saldo.html">
                        <span class="menu-title">Depósito de saldo</span>
                    </a>
                </li>
                <li class="nav-item ">
                    <a id="tour-movsal" class="nav-link pageto" href="views/fns-admin/movimientos-saldo.php">
                        <span class="menu-title">Movimientos de saldo</span>
                    </a>
                </li>
                <?php if ($_SESSION["tiendaExpress_user"] == "cianca") { ?>
                <li class="nav-item ">
                    <a id="tour-ganan" class="nav-link pageto" href="views/fns-admin/mis-ganancias.html">
                        <span class="menu-title">Mis comisiones</span>
                    </a>
                </li>
                <?php } ?>
                <li class="nav-item ">
                    <a id="tour-duds" class="nav-link pageto" href="views/fns-admin/dudas.html">
                        <span class="menu-title">Ayuda</span>
                    </a>
                </li>
                <li class="nav-item ">
                    <a href="#" class="nav-link" data-toggle="modal" data-target="#change-psw">
                        <span class="menu-title">Cambiar contraseña</span>
                    </a>
                </li>
                <li class="nav-item ">
                    <a href="#" class="nav-link" data-toggle="modal" data-target="#modal-sorteo">
                        <span class="menu-title">Sorteo Agosto 2021</span>
                    </a>
                </li>
                <li class="nav-item" id="mostrar_configuracion_miniprinter" style="display: none">
                    <a href="#" class="nav-link" data-toggle="modal" data-target="#modal-miniprinter" onclick="recupera();">
                        <span class="menu-title">Configurar MiniPrinter</span>
                    </a>
                </li>
                <li class="nav-item ">
                    <a id="tour-exit" onclick="cerrar_sesion()" href="#" class="nav-link">
                        <span class="menu-title">Salir</span>
                    </a>
                </li>
                <hr>
                <li id="sec-saldo" class="nav-item justify-content-center">
                    <div id="sactual" class="bg-button wfix text-center p-1 mx-auto">
                        <span>Saldo actual</span>
                        <br>
                        <span class="fisixe">$</span><span class="fisixe saldoActual">$00,00</span>
                    </div>
                </li>

            </ul>
        </nav>
        <!-- partial -->
        <div class="container-fluid page-body-wrapper position-relative">
            <nav id="hmb" class="navbar col-lg-12 col-12 px-0 py-0 d-flex flex-row shadow-sm">
                <div class="navbar-menu-wrapper d-flex align-items-center justify-content-start">
                    <button class="navbar-toggler navbar-toggler align-self-center" type="button"
                        data-toggle="minimize">
                        <span class="mdi mdi-arrow-collapse-horizontal"></span>
                    </button>

                    <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button"
                        data-toggle="offcanvas">
                        <span class="mdi mdi-menu"></span>
                    </button>
                </div>

            </nav>
            <!-- partial -->
            <div class="main-panel" id="change-content">
                <nav class="navbar navbar-expand-lg navbar-dark bg-primary sites--navcol d-none">
                    <a class="navbar-brand close-cbox btn-dfl--close" id="cboxClose" title="Regresar">
                        <i class="fas fa-arrow-left mr-2"></i>Regresar al menú</a>
                    </a>
                    <div class="alert alert-pink mx-3 my-1 col-sm-10 col-md-10">
                        <p>Venta de Planes Tarifarios</p>
                        <div class="action-btn">
                            <a href="" class="btn btn-info action-btn--tut">Ver Tutorial</a>
                            <a href="" class="btn btn-success action-btn--faq">Preguntas Frecuentes</a>
                        </div>
                    </div>
                    <button class="navbar-toggler d-none" type="button" data-toggle="collapse"
                        data-target="#navbaTiendaExpress" aria-controls="navbaTiendaExpress" aria-expanded="false"
                        aria-label="Toggle navigation">
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
                </nav>

                <section class="container-fluid sites">
                    <div class="row justify-content-center">
                        <div class="col-lg-6 col-md-6 banner-info">
                            <div id="banner-title" class="sites__cardtitle ">
                                <span class="title">¡Bienvenido!</span>
                                <span class="f-white">Selecciona el trámite deseado…</span>
                            </div>
                        </div>
                    </div>
                    <div id="services" class="row">
                        <!-- tar -->
                        <?php if ($_SESSION['tiendaExpress_user'] == "nombreP355") {?>
                        <div class="col-xl-3 col-lg-3 col-md-4 col-6 submenu" onclick="cargarSwal(event);"
                            data-href="https://www.micro-tec.com.mx/pagina/solicitudesExpress_nuevo/"
                            data-sitio="Planes Telcel" data-opcion="tar" data-opcion2="ass"
                            data-href2="https://www.micro-tec.com.mx/pagina/solicitudesExpress"
                            data-sitio2="Renovaciones">
                            <a href="#" class="sites--option option--blue shadow-lg" data-toggle="tooltip"
                                data-placement="top"
                                title="Vende el plan “Internet en tu casa”, realiza solicitudes de otros planes y obtén ganancias por esto.">
                                <div class="icon">
                                    <img src="assets/images/iconopt/ico1.png" class="img-icon">
                                </div>
                                <div class="content">
                                    <div class="title small">Venta de planes Telcel y Renovaciones</div>

                                    <div class="description">
                                        Venta de Planes Tarifarios
                                    </div>
                                </div>
                            </a>
                        </div>
                        <?php } elseif ($_SESSION['tiendaExpress_permisos']['tar'] == 1) { ?>
                        <div class="col-xl-3 col-lg-3 col-md-4 col-6 submenu">
                            <a href="https://www.micro-tec.com.mx/pagina/solicitudesExpress_nuevo/"
                                class="sites--option option--blue colorbox shadow-lg" id="tar" data-toggle="tooltip"
                                data-placement="top"
                                title="Vende el plan “Internet en tu casa”, realiza solicitudes de otros planes y obtén ganancias por esto.">
                                <div class="icon">
                                    <img src="assets/images/iconopt/ico1.png" class="img-icon">
                                </div>
                                <div class="content">
                                    <div class="title small">Venta de planes Telcel y Renovaciones</div>

                                    <div class="description">
                                        Venta de Planes Tarifarios
                                    </div>
                                </div>
                            </a>
                        </div>
                        <?php } else { ?>
                        <div class="col-xl-3 col-lg-3 col-md-4 col-6 submenu">
                            <a href="#" class="sites--option option--blue shadow-lg" data-toggle="tooltip"
                                data-placement="top"
                                onclick="Swal.fire('', 'En construcción, estamos trabajando y pronto estará disponible.', 'info');"
                                title="Vende el plan “Internet en tu casa”, realiza solicitudes de otros planes y obtén ganancias por esto.">
                                <div class="icon">
                                    <img src="assets/images/iconopt/ico1.png" class="img-icon">
                                </div>
                                <div class="content">
                                    <div class="title small">Venta de planes Telcel y Renovaciones</div>

                                    <div class="description">
                                        Venta de Planes Tarifarios
                                    </div>
                                </div>
                            </a>
                        </div>
                        <?php } ?>
                        <!-- /tar -->

                        <!-- Recargas -->
                        <?php // if ($_SESSION['tiendaExpress_permisos']['recargas'] == 1) { ?>
                        <div class="col-xl-3 col-lg-3 col-md-4 col-6">
                            <a href="https://www.micro-tec.com.mx/pagina/mpayExpress/micropay.php" id="venta_tae"
                                class="sites--option option--pink300 colorbox shadow-lg" data-toggle="tooltip"
                                data-placement="top" title="Ofrece recargas de tiempo aire de cualquier compañía">
                                <div class="icon">
                                    <img src="assets/images/iconopt/ico2.png" class="img-icon">
                                </div>
                                <div class="content">
                                    <div class="title">Recargas</div>

                                    <div class="description">
                                        Recarga tiempo aire electrónico
                                    </div>
                                </div>
                            </a>
                        </div>
                        <?php //} ?>
                        <!--/ Recargas -->

                        <!-- PayJoy -->
                        <?php //if ($_SESSION['tiendaExpress_user'] == "nombreP355") { ?>
                        <!-- <div class="col-xl-3 col-lg-3 col-md-4 col-6">
                            <a href="https://www.payjoy.com/merchant2/#/app"
                                class="sites--option option--green shadow-lg" data-toggle="tooltip" data-placement="top"
                                target="_blank"
                                title="Vende equipos con el sistema de crédito de Payjoy y recupera tu ganancia de forma inmediata.">
                                <div class="icon">
                                    <img src="assets/images/iconopt/ico4.png" class="img-icon">
                                </div>
                                <div class="content">
                                    <div class="title">Crédito PayJoy</div>

                                    <div class="description">
                                        Venta/Recepción de Pagos PayJoy
                                    </div>
                                </div>
                            </a>
                        </div> -->
                        <?php if ($_SESSION['tiendaExpress_permisos']['payjoy'] == 1) {?>
                            

                        <div id="payjoy2opc" class="col-xl-3 col-lg-3 col-md-4 col-6">
                            <a href="" class="sites--option option--green shadow-lg"  title="Vende equipos con el sistema de crédito de Payjoy y recupera tu ganancia de forma inmediata." data-toggle="modal" data-target="#subPayjoy">
                                <div class="icon">
                                    <img src="assets/images/iconopt/ico4.png" class="img-icon">
                                </div>
                                <div class="content">
                                  <div class="title">Crédito PayJoy</div>

                                  <div class="description">
                                      Venta/Recepción de Pagos PayJoy
                                  </div>
                                </div>
                            </a>
                          </div>
                        <?php } else { ?>
                        <div class="col-xl-3 col-lg-3 col-md-4 col-6">
                            <a href="#"
                                onclick="Swal.fire('', 'Para usar este servicio debe solicitar su activación, llame por favor al número a continuación: 221-521-1050', 'info');"
                                class="sites--option option--green  shadow-lg" data-toggle="tooltip"
                                data-placement="top"
                                title="Vende equipos con el sistema de crédito de Payjoy y recupera tu ganancia de forma inmediata.">
                                <div class="icon">
                                    <img src="assets/images/iconopt/ico4.png" class="img-icon">
                                </div>
                                <div class="content">
                                    <div class="title">Crédito PayJoy</div>

                                    <div class="description">
                                        Venta/Recepción de Pagos PayJoy
                                    </div>
                                </div>
                            </a>
                        </div>
                        <?php } ?>
                        <!--/ PayJoy -->

                        <!-- Pago de Servicios -->
                        <?php //if ($_SESSION['tiendaExpress_permisos']['servicios'] == 1) {?>
                        <div class="col-xl-3 col-lg-3 col-md-4 col-6">
                            <a href="https://www.micro-tec.com.mx/pagina/mpayExpress/micropay.php" id="pago_servicios"
                                class="sites--option option--oran colorbox shadow-lg" data-toggle="tooltip"
                                data-placement="top"
                                title="Cobra los servicios más solicitados por tus clientes y genera ganancias (Telmex, Totalplay, CFE, etc.)">
                                <div class="icon">
                                    <img src="assets/images/iconopt/ico3.png" class="img-icon">
                                </div>
                                <div class="content">
                                    <div class="title">Pago de Servicios</div>

                                    <div class="description">
                                        Paga tu recibo de CFE, Telmex, Dish y mas...
                                    </div>
                                </div>
                            </a>
                        </div>
                        <?php //} ?>
                        <!--/ Pago de Servicios -->

                        <!-- TAF -->
                        <?php //if ($_SESSION['tiendaExpress_permisos']['taf'] == 1) {?>
                        <?php //if ($_SESSION['tiendaExpress_user'] == "nombreP355" || $_SESSION['tiendaExpress_user'] == "cianca") {?>
                        <div class="col-xl-3 col-lg-3 col-md-4 col-6">
                            <a href="https://www.micro-tec.com.mx/pagina/solicitudesExpress/" id="taf"
                                class="sites--option option--oran200 colorbox shadow-lg" data-toggle="tooltip"
                                data-placement="top"
                                title="Promueve la compra de equipos a través del crédito de Telcel y obtén ganancia por ello.">
                                <div class="icon">
                                    <img src="assets/images/iconopt/ico5.png" class="img-icon">
                                </div>
                                <div class="content">
                                    <div class="title small">
                                        Celular a crédito con Telcel
                                        <small class="font-weight-bold">(Tarjeta Amigo Fácil)</small>
                                    </div>

                                    <div class="description">
                                        Venta en TAF
                                    </div>
                                </div>
                            </a>
                        </div>
                        <?php //} else { ?>
                        <!-- <div class="col-xl-3 col-lg-3 col-md-4 col-6">
                            <a href="#" class="sites--option option--oran200 shadow-lg" data-toggle="tooltip"
                                data-placement="top"
                                onclick="Swal.fire('', 'En construcción, estamos trabajando y pronto estará disponible.', 'info');"
                                title="Promueve la compra de equipos a través del crédito de Telcel y obtén ganancia por ello.">
                                <div class="icon">
                                    <img src="assets/images/iconopt/ico5.png" class="img-icon">
                                </div>
                                <div class="content">
                                    <div class="title small">
                                        Celular a crédito con Telcel
                                        <small class="font-weight-bold">(Tarjeta Amigo Fácil)</small>
                                    </div>

                                    <div class="description">
                                        Venta en TAF
                                    </div>
                                </div>
                            </a>
                        </div> -->
                        <?php //} ?>
                        <!--/ TAF -->

                        <!-- Trámites -->
                        <?php //if ($_SESSION['tiendaExpress_permisos']['tramites'] == 1) {?>
                        <div class="col-xl-3 col-lg-3 col-md-4 col-6 submenu" onclick="cargarSwal(event);"
                            data-href="https://www.micro-tec.com.mx/pagina/tramitesExpress/mgr.php"
                            data-sitio="Recuperación" data-opcion="tramites" data-opcion2=""
                            data-href2="https://www.micro-tec.com.mx/pagina/portabilidad/portabilidad/"
                            data-sitio2="Portabilidad">
                            <a href="#" id="tramites" class="sites--option option--salm shadow-lg" data-toggle="tooltip"
                                data-placement="top"
                                title="Realiza cambios de compañía, recuperación de número y obtén ganancias por ello.">
                                <div class="icon">
                                    <img src="assets/images/iconopt/ico6.png" class="img-icon">
                                </div>
                                <div class="content">
                                    <div class="title small">Cambio de compañía y recuperación de número
                                    </div>

                                    <div class="description">
                                        Trámites básicos, Cambio/Activacion de Chips con saldo
                                    </div>
                                </div>
                            </a>
                        </div>
                        <?php //} ?>
                        <!-- Trámites -->

                        <!-- Chips Express -->
                        <?php //if ($_SESSION['tiendaExpress_permisos']['chip50'] == 1) {?>
                        <div class="col-xl-3 col-lg-3 col-md-4 col-6">
                            <a href="https://www.micro-tec.com.mx/pagina/tramitesExpress/mgr.php" id="chips"
                                class="sites--option option--purp colorbox shadow-lg" data-toggle="tooltip"
                                data-placement="top"
                                title="Vende chips Telcel listos para utilizarse en cualquier celular">
                                <div class="icon">
                                    <img src="assets/images/iconopt/ico7.png" class="img-icon">
                                </div>
                                <div class="content">
                                    <div class="title">Venta de chip</div>

                                    <div class="description">
                                        Activación y venta de chips express
                                    </div>
                                </div>
                            </a>
                        </div>
                        <?php //} ?>
                        <!--/ Chips Express -->

                        <!-- Pedidos -->
                        <div class="col-xl-3 col-lg-3 col-md-4 col-6">
                            <a href="https://www.micro-tec.com.mx/pagina/Control_Pedidos"
                                class="sites--option option--blueligth colorbox shadow-lg" data-toggle="tooltip"
                                data-placement="top"
                                title="Compra los equipos y chips que requieres a través de nuestra tienda virtual y recíbelos en físico en tu tienda.">
                                <div class="icon">
                                    <img src="assets/images/iconopt/ico8.png" class="img-icon">
                                </div>
                                <div class="content">
                                    <div class="title">Comprar nuevos equipos</div>

                                    <div class="description">
                                        Pedidos en linea
                                    </div>
                                </div>
                            </a>
                        </div>
                        <!--/ Pedidos -->

                        <!-- Adelantos -->
                        <div class="col-xl-3 col-lg-3 col-md-4 col-6">
                          <a href="" class="sites--option option--blue200 shadow-lg" data-toggle="modal" data-target="#subConstruc" title="Financiamiento de celulares en pocos pasos:">
                              <div class="icon">
                                  <img src="assets/images/iconopt/ico9.png" class="img-icon">
                              </div>
                              <div class="content">
                                <div class="title small">Tu celular a cuotas con Adelantos</div>

                                <div class="description">
                                    Sólo con tu cédula, llévate tu celular y págalo en cuotas.
                                </div>
                              </div>
                          </a>
                        </div>
                        <!--/ Adelantos -->

                        <!-- Telmex -->
                        <div class="col-xl-3 col-lg-3 col-md-4 col-6">
                          <a href="" class="sites--option option--grayligth shadow-lg" data-toggle="modal" data-target="#subConstruc" title="Elige la velocidad y los servicios que deseas">
                              <div class="icon">
                                  <img src="assets/images/iconopt/ico10.png" class="img-icon">
                              </div>
                              <div class="content">
                                <div class="title small">Telmex para el hogar o negocio</div>

                                <div class="description">
                                    Elige la velocidad y los servicios que deseas
                                </div>
                              </div>
                          </a>
                        </div>
                        <!--/ Pedidos -->

                    </div>

                    <div class="text-center align-self-end pb-3 w-100">
                        <img src="assets/images/home/logo-mic.png" class="img-icon" width="180px" height="64px">
                    </div>
                </section>
                <!-- content-wrapper ends -->
                <!-- partial:./partials/_footer.html -->
                <footer class="footer d-none">
                    <div class="card rounded">
                        <div class="card-body">
                            <div class="d-sm-flex justify-content-center justify-content-sm-between py-2">
                                <p class="text-center text-sm-left d-block d-sm-inline-block mb-0">Copyright © <span
                                        id="year-site">2020</span>.</p>
                                <p class="float-none float-sm-right d-block mt-1 mt-sm-0 text-center mb-0">
                                    Microtecnologías Móviles S.A. de C.V.</p>
                            </div>
                        </div>
                    </div>
                </footer>
                <!-- partial -->
            </div>
            <!-- main-panel ends -->

        </div>
        <!-- page-body-wrapper ends -->
    </div>
    <!-- container-scroller -->

    <!-- Modal -->
    <div class="modal fade st-modal" id="saldoModal" tabindex="-1" role="dialog" aria-labelledby="saldoModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content st-cont--blue">
                <div class="modal-header">
                    <h5 class="modal-title" id="saldoModalLabel">Consultar saldo</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" style="color: white">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-12 text-center">
                            <h5 style="color: #f8bb00; font-weight: bold" id="saldo_actual"></h5>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Cambiar COntraseña Modal -->
    <div class="modal fade modal-comm" id="change-psw" tabindex="-1" role="dialog" aria-labelledby="change-pswLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="change-pswLabel">Cambiar Contraseña</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="auth-form-transparent text-left p-3">
                        <form class="pt-3">
                            <div class="form-group">
                                <label for="exampleInputEmail">Ingresa los siguientes datos para cambiar tu
                                    contraseña.</label>
                                <div class="input-group">
                                    <input type="password" class="form-control form-control-lg" id="passActual"
                                        placeholder="Contraseña actual">
                                </div>
                            </div>
                            <div class="form-group">
                                <!-- <label for="newpas">Nueva Contraseña</label> -->
                                <div class="input-group">
                                    <input type="password" class="form-control form-control-lg" id="passNuevo"
                                        placeholder="Nueva Contraseña">
                                </div>
                            </div>
                            <div class="form-group">
                                <!-- <label for="confnewpas">Confirmar Nueva Contraseña</label> -->
                                <div class="input-group">
                                    <input type="password" class="form-control form-control-lg" id="passNuevo2"
                                        placeholder="Confirmar Nueva Contraseña">
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
                <div class="modal-footer text-center">
                    <button type="button" id="btnCambiarPass" class="btn btn-dfl mx-auto btn-theme--orange">Cambiar
                        Contraseña</button>
                    <button type="button" class="btn btn-link" data-dismiss="modal">Cancelar</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal tabla sorteo -->
    <div class="modal fade modal-comm" id="modal-sorteo" tabindex="-1" role="dialog" aria-labelledby="modal-sorteoLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modal-sorteoLabel">Listado de boletos</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12 col-sm-12 col-xs-12">
                            <table class="table table-bordered table-condensed" id="tabla_boletos"
                                style="width: 100%; font-size: 13px">
                                <thead>
                                    <tr>
                                        <th>Folio</th>
                                        <th>Agente</th>
                                        <th>Sucursal</th>
                                        <th>Fecha</th>
                                        <th>Clave</th>
                                        <th>Producto</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th>Folio</th>
                                        <th>Agente</th>
                                        <th>Sucursal</th>
                                        <th>Fecha</th>
                                        <th>Clave</th>
                                        <th>Producto</th>
                                    </tr>
                                </tfoot>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="modal-footer text-center">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal tabla sorteo -->
    <div class="modal fade modal-comm" id="modal-miniprinter" tabindex="-1" role="dialog" aria-labelledby="modal-miniprinterLabel"
         aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modal-miniprinterLabel">Configuración MiniPrinter</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-12">
                            <button class="btn btn-secondary">
                                Impresora <span id="mp"></span>
                            </button>
                        </div>
                        <p align="center"><strong>Por favor selecciona el tamaño del papel dependiendo de la miniprinter. La IP y el PUERTO estan preconfiguradas</strong></p>
                        <div class="col-12">
                            <span class="input-group-text">IP</span>
                            <input id="ip_miniprinter" name="ip_miniprinter" type="text" class="form-control" readonly
                                   required>
                        </div>
                        <div class="col-12">
                            <span class="input-group-text">Puerto</span>
                            <input id="puerto_miniprinter" name="puerto_minprinter" type="text" class="form-control"
                                   readonly required>
                        </div>
                        <div class="col-12" align="center">
                            <span class="input-group-text">Tamaño de papel</span>
                            <select class="form-control" id="tamano_papel" name="tamano_papel">
                                <option selected value="5">5cm</option>
                                <option value="8">8cm</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="modal-footer text-center">
                    <button onclick="guarda();" type="button" class="btn btn-info">Guadar</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Tutorial Video-->
    <div class="modal fade modVideo modal-comm" id="verTutorial" tabindex="-1" aria-labelledby="verTutorialLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-body">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <div class="embed-responsive embed-responsive-16by9">
                        <iframe class="embed-responsive-item"
                            src="https://www.youtube.com/embed/0tfkMpuvQ6U?rel=0&amp;autoplay=0"
                            allowfullscreen></iframe>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal subopcion Payjoy-->
    <div class="modal fade modal-suboption" id="subPayjoy" tabindex="-1" aria-labelledby="subPayjoyLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header border-0">
              <h5 class="modal-title w-100 text-center" id="subPayjoyLabel">¿Que desea hacer?</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body border-0">
              <div class="row subopt justify-content-around">
                <div class="col-lg-3 col-md-6 py-2 col-6">
                   <a href="https://www.payjoy.com/merchant2/#/app" target="_blank" class="subopt__item">
                     <img src="assets/images/subopc/payjoy/venta.jpg" alt="" class="img-fluid">
                     <h5 class="subopt-title">Venta de Equipos</h5>
                   </a>
                </div>
                <div class="col-lg-3 col-md-6 py-2 col-6">
                   <a id="pago_payjoy" href="https://www.micro-tec.com.mx/pagina/tramitesExpress/mgr.php" class="subopt__item colorbox cboxElement subopt__itempj">
                     <img src="assets/images/subopc/payjoy/saldo.jpg" alt="" class="img-fluid">
                     <h5 class="subopt-title">Pagos</h5>
                   </a>
                </div>
                <div class="col-lg-3 col-md-6 py-2 col-6">
                   <div class="subopt__item" title="Elige el modelo de tus sueños y aplica a un plan de financiamiento." data-toggle="modal" data-target="#subConstruc">
                     <img src="assets/images/subopc/payjoy/lista.jpg" alt="" class="img-fluid">
                     <h5 class="subopt-title">Lista de Equipos</h5>
                   </div>
                </div>
                <div class="col-lg-3 col-md-6 py-2 col-6">
                   <div class="subopt__item" data-toggle="modal" data-target="#subConstruc">
                     <img src="assets/images/subopc/payjoy/foto.jpg" alt="" class="img-fluid">
                     <h5 class="subopt-title">Adjuntar Foto</h5>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>

    <!-- Modal subopcion bajo Construccion-->
    <div class="modal fade modal-suboption modal-suboption--underc" id="subConstruc" tabindex="-1" aria-labelledby="subConstrucLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header border-0 d-none">
              <h5 class="modal-title w-100 text-center" id="subConstrucLabel">¿Que desea hacer?</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body border-0 p-0">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <div class="row subopt justify-content-around">
                <div class="col-lg-9">
                   <div class="subopt__item--noready">
                     <img src="assets/images/icons/yellow-triangle.png" alt="" class="img-fluid">
                     <h5 class="subopt-title">EN CONSTRUCCIÓN</h5>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>å
    </div>

    <!-- Modal subopcion Adelantos-->
    <div class="modal fade modal-suboption modal-suboption--bluedark" id="subAdelantos" tabindex="-1" aria-labelledby="subAdelantosLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header border-0">
          <h5 class="modal-title w-100 text-center" id="subPayjoyLabel">¿Que desea hacer?</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body border-0">
          <div class="row subopt justify-content-around">
            <div class="col-lg-3 col-md-6 py-2 col-6">
               <div class="subopt__item subopt--darkblue">
                 <img src="assets/images/subopc/adelantos/venta.jpg" alt="" class="img-fluid">
                 <h5 class="subopt-title">Venta de Equipos</h5>
               </div>
            </div>
            <div class="col-lg-3 col-md-6 py-2 col-6">
               <div class="subopt__item subopt--darkblue">
                 <img src="assets/images/subopc/adelantos/pagos.jpg" alt="" class="img-fluid">
                 <h5 class="subopt-title">Pagos</h5>
               </div>
            </div>
            <div class="col-lg-3 col-md-6 py-2 col-6">
               <div class="subopt__item subopt--darkblue">
                 <img src="assets/images/subopc/adelantos/lista.jpg" alt="" class="img-fluid">
                 <h5 class="subopt-title">Lista de Equipos</h5>
               </div>
            </div>
            <div class="col-lg-3 col-md-6 py-2 col-6">
               <div class="subopt__item subopt--darkblue">
                 <img src="assets/images/subopc/adelantos/foto.jpg" alt="" class="img-fluid">
                 <h5 class="subopt-title">Adjuntar Foto</h5>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>

    <!-- Modal subopcion Telmex-->
    <div class="modal fade modal-suboption" id="subTelmex" tabindex="-1" aria-labelledby="subTelmexLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header border-0">
          <h5 class="modal-title w-100 text-center" id="subTelmexLabel">¿Que desea hacer?</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body border-0">
          <div class="row subopt justify-content-around">
            <div class="col-lg-3 col-md-6 py-2 col-6">
               <div class="subopt__item subopt--lgblue">
                 <img src="assets/images/subopc/telmex/venta.jpg" alt="" class="img-fluid">
                 <h5 class="subopt-title">Venta de Equipos</h5>
               </div>
            </div>
            <div class="col-lg-3 col-md-6 py-2 col-6">
               <div class="subopt__item subopt--lgblue">
                 <img src="assets/images/subopc/telmex/pagos.jpg" alt="" class="img-fluid">
                 <h5 class="subopt-title">Pagos</h5>
               </div>
            </div>
            <div class="col-lg-3 col-md-6 py-2 col-6">
               <div class="subopt__item subopt--lgblue">
                 <img src="assets/images/subopc/telmex/equipo.jpg" alt="" class="img-fluid">
                 <h5 class="subopt-title">Lista de Equipos</h5>
               </div>
            </div>
            <div class="col-lg-3 col-md-6 py-2 col-6">
               <div class="subopt__item subopt--lgblue">
                 <img src="assets/images/subopc/telmex/foto.jpg" alt="" class="img-fluid">
                 <h5 class="subopt-title">Adjuntar Foto</h5>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>

    <div hidden>
        <a href="#" id="" class="sites--option option--blueligth colorbox shadow-lg asubmenu"></a>
    </div>

    <script src="https://www.gstatic.com/firebasejs/8.6.7/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.6.7/firebase-firestore.js"></script>

    <script>
        // Your web app's Firebase configuration
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        var firebaseConfig = {
            apiKey: "AIzaSyA0wJmtoHwmRJUGsqHIfzDDPE5zz4Yp3TI",
            authDomain: "tienda-express-49a47.firebaseapp.com",
            projectId: "tienda-express-49a47",
            storageBucket: "tienda-express-49a47.appspot.com",
            messagingSenderId: "221425230897",
            appId: "1:221425230897:web:2b797e036b7fa6f9db6110",
            measurementId: "G-6YZKX9E54P"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
    </script>

    <script src="https://code.jquery.com/jquery-3.5.1.min.js"
        integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@10"></script>
    <!-- <script src="./assets/js/app.js"></script> -->
    <script src="./assets/vendors/js/vendor.bundle.base.js"></script>

    <script src="./assets/js/off-canvas.js"></script>
    <script src="./assets/js/hoverable-collapse.js"></script>
    <script src="./assets/js/template.js"></script>
    <script src="./assets/js/jquery.colorbox.js"></script>
    <script src="./assets/js/jquery.colorbox-es.js"></script>
    <script src="./assets/vendors/bootstrap-tour/js/bootstrap-tour-standalone.min.js"></script>

    <script type="text/javascript" src="./assets/vendors/jquery-ui/jquery-ui.min.js"></script>
    <script type="text/javascript" src="./assets/vendors/DataTables/datatables.min.js"></script>

    <script src="./assets/js/init.js"></script>
    <script src="./controllers/main.js"></script>
    <script src="./controllers/notif.js"></script>
    <script src="./controllers/cambiarpass.js"></script>
    <script src="./controllers/tourStoreBoots.js"></script>
    <script src="./controllers/datatableController.js"></script>
    <script src="./controllers/boletos.js"></script>
    <script src="./controllers/validacionMini.js"></script>
    <!-- <script src="./server/socket.io.js"></script>
    <script src="./server/socket.js"></script> -->

</body>

</html>