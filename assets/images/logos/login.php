<?php
session_start();
?>
<!DOCTYPE html>
<html>

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>Acceso franquicias</title>
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"
          integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
    <link rel="stylesheet" href="assets/views/css/main.css">

    <script src='https://www.google.com/recaptcha/api.js'></script>
</head>

<body>
<?php if (empty($_SESSION["tiendaExpress_user"])) { ?>
    <!--Como pendiente-->
<?php } ?>
<div class="login-container d-flex align-items-center">
    <div class="container">
        <div class="row h100 justify-content-center">
            <div class="col-md-12 col-lg-8 login p-0">
                <section class="">
                    <div class="row h100">
                        <div class="col-md-6 login__side-info">
                            <img src="assets/views/img/logo_franquicia_microtec.png" class="login__logo mb-4"
                                 alt="">

                            <h3>Acceso a Pedidos MicroTec</h3>

                            <p>Bienvenido a la Microtienda, antes de comenzar necesitamos comprobar tus datos. Por
                                favor rellena los campos como se te piden.</p>
                        </div>

                        <div class="col-md-6 login__data">
                            <form class="form" role="form">
                                <h2 class="text-center mb-5">Iniciar Sesión</h2>
                                <div class="form-group">
                                    <label for="inputUsuario">Usuario</label>
                                    <input type="text" class="form-control" id="inputUsuario"
                                           aria-describedby="emailHelp" placeholder="" name="user" required>
                                </div>
                                <div class="form-group">
                                    <label for="inputPassword">Contraseña</label>
                                    <input type="password" class="form-control" id="inputPassword" placeholder=""
                                           name="pass" required>
                                </div>

                                <div class="text-center">
                                    <div class="g-recaptcha" data-size="invisible"
                                         data-sitekey="6LfWHGwUAAAAACWvt-PrX8JEDctySrAgoTC4ePT7"
                                         data-callback='enviarLogin'></div>

                                    <button type="submit" class="btn btn-lg btn--orange w100" id="aceptar">Acceder
                                        <i class="fas fa-arrow-circle-right ml-3"></i></button>
                                </div>

                            </form>
                        </div>

                    </div>
                </section>
            </div>
        </div>
    </div>
</div>

<footer class="footer py-5">
    <div class="container">
        <div class="row">
            <div class="col-md-12 text-center">
                <p>Copyright © Microtecnologías Moviles S.A. de C.V.</p>
            </div>
        </div>
    </div>
</footer>

<!--js-->

<script src="https://code.jquery.com/jquery-3.3.1.min.js"
        integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/7.28.11/sweetalert2.all.min.js"></script>
<!-- <script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>     -->

<script src='assets/controllers/pedidosLogin.js'></script>
</body>

</html>