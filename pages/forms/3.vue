<?php
session_start();
require("link.php");
require("control.php");
?>

<script>
  //func solo num
  function cNum(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
      return false;
    return true;
  }

  //municipio
  function rmuni(x) {
    var esta1 = $("#estado option:selected").text();
    var estado = encodeURIComponent(esta1.trim())

    $("#municipio").load("municipio.php?e="+estado);
  }

  //ciudad
  function rciu(x) {
    var esta1 = $("#estado option:selected").text();
    var estado = encodeURIComponent(esta1.trim())
    var muni = $("#muni option:selected").text();
    var municipio = encodeURIComponent(muni.trim())

    $("#ciudad").load("ciudad.php?e="+estado+"&m="+municipio);
  }

  //colonia
  function rcol(x) {
    var esta1 = $("#estado option:selected").text();
    var estado = encodeURIComponent(esta1.trim())
    var muni = $("#muni option:selected").text();
    var municipio = encodeURIComponent(muni.trim())
    var ciu = $("#ciud option:selected").text();
    var ciudad = encodeURIComponent(ciu.trim())

    $("#colonia").load("colonia.php?e="+estado+"&m="+municipio+"&c="+ciudad);
  }
  //cp
  function rcodigo(x) {
    var cod = $("#colo option:selected").val().split('|');
    var codigo = encodeURIComponent(cod[0].trim())

    $("#cpostal").val(codigo);
  }

  //validar y guardar
	$(document).ready(function(){
    $("#bot").click(function(){
    	nom=$('input#nombre').val();
    	apa=$('input#paterno').val();
    	ama=$('input#materno').val();
    	tel=$('input#telefono').val();
    	mail=$('input#email').val();
    	medio=$('select#medio').val();
    	com=$('textarea#coment').val();

    	edo=$('select#estado').val();
    	muni=$('select#muni').val();
    	cd=$('select#ciud').val();
    	col=$("#colo option:selected").val().split('|');
      colonia=col[1];
    	cp=$('input#cpostal').val();
    	calle=$('input#calle').val();
    	num=$('input#num').val();
    	inte=$('input#int').val();
    	cel=$('input#cel').val();

    	emp=$('input#empresa').val();
    	giro=$('input#giro').val();
    	cargo=$('input#cargo').val();
    	teltrab=$('input#teltrab').val();

    	error="0";
      if (medio=="") { error="Debe seleccionar un medio de contacto"; acc=$('select#medio').focus(); }
      if (mail.indexOf('@', 0) == -1 || mail.indexOf('.', 0) == -1) { error="Email incorrecto"; acc=$('input#email').focus(); }
      if (tel.length<10 || tel==" " || tel=="") { error="Numero de teléfono incorrecto"; acc=$('input#telefono').focus(); }
      if (ama.length<3 || ama==" " || ama=="") { error="Apellido materno incorrecto"; acc=$('input#amaterno').focus(); }
      if (apa.length<3 || apa==" " || apa=="") { error="Apellido paterno incorrecto"; acc=$('input#apaterno').focus(); }
      if (nom.length<3 || nom==" " || nom=="") { error="Nombre incorrecto"; acc=$('input#nombre').focus(); }

      if (error=="0") {
        if (confirm("¿Desea agregar el prospecto?")) {
          cad=nom+"|"+apa+"|"+ama+"|"+tel+"|"+mail+"|"+medio+"|"+com;
          pers=edo+"|"+muni+"|"+cd+"|"+colonia+"|"+cp+"|"+calle+"|"+num+"|"+inte+"|"+cel;
          empre=emp+"|"+giro+"|"+cargo+"|"+teltrab;

          $.post("save_prospecto.php",{cad:cad, pers:pers, empre:empre},function(respuesta){
            $('#content').html(respuesta);
          })
        }
      } else {
        alert(error);
        acc;
      }
    });
  });
</script>

<div class="well">
  <span class="txt_v"><b>Capturar nuevo prospecto</b></span>
  <hr style="margin-bottom: 15px;">
	<div class="row">
		<form role="form" name="nuevo" id="nuevo" >

      <div class="form-group">
        <div class="col-xs-4">
          <label for="nombre">Nombre(s):</label>
          <input type="text" class="form-control input-sm" id="nombre" name="nombre" placeholder="Nombre" required>
        </div>
        <div class="col-xs-4">
          <label for="paterno">Apellido Paterno:</label>
          <input type="text" class="form-control input-sm" id="paterno" name="paterno" placeholder="A. Paterno" required>
        </div>
        <div class="col-xs-4">
          <label for="materno">Apellido Materno:</label>
          <input type="text" class="form-control input-sm" id="materno" name="materno" placeholder="A. Materno" required>
        </div>
			</div>

      <div class="form-group">
        <div class="col-xs-4">
        	<label for="telefono">Teléfono:</label>
          <input type="text" class="form-control input-sm" id="telefono" name="telefono" maxlength="10" minlength="10" placeholder="Número a 10 dígitos" onKeyPress="return cNum(event)" required>
        </div>
        <div class="col-xs-4">
          <label for="email">E-mail:</label>
          <input type="email" class="form-control input-sm" id="email" name="email" placeholder="email@ejemplo.com" required>
        </div>
        <div class="col-xs-4">
        	<label for="medio">Medio de contacto:</label>
        	<select class="form-control input-sm" name="medio" id="medio" required>
          	<option value="" selected>Seleccione...</option>
          	<option value="Agente de ventas">Agente de ventas</option>
          	<option value="Feria/Expo">Feria/Expo</option>
          	<option value="Medio impreso">Medio impreso</option>
          	<option value="Radio">Radio</option>
          	<option value="Recomendacion">Recomendación</option>
          	<option value="Pagina web">Pagina web</option>
        	</select>
        </div>
      </div>

      <div class="form-group">
      	<div class="col-xs-12">
        	<label for="coment">Comentarios:</label>
        	<textarea class="form-control input-sm" id="coment" name="coment" rows="3" placeholder="Agregar comentarios..."></textarea>
        </div>
      </div>

			<div class="col-xs-12">
				<br><hr><br>
			</div>

      <div class="col-xs-12 panel-group" id="accordion">
  			<div class="panel panel-default">
    			<div class="panel-heading">
      			<span>
        			<a data-toggle="collapse" data-parent="#accordion" href="#collapseOne"><i class="fa fa-plus-square-o"></i> Personales</a>
      			</span>
    			</div>
    			<div id="collapseOne" class="panel-collapse collapse">
      			<div class="panel-body">

							<div class="form-group">
      					<div class="col-xs-4" id='estado'>
      						<label for="estado">Estado: </label>
        					<select class="form-control input-sm" name="estado" id="estado" onChange='rmuni();'>
          					<option value="" selected>Estado...</option>
          					<?
          					mysqli_select_db($link, "recargas") or die ("Problemas...");
          					$sql="SELECT DISTINCT(estado) FROM recargas.sepomex WHERE estado IN ('Oaxaca','Puebla','Tlaxcala','Veracruz') ";
          					$result = mysqli_query($link, $sql);
          					if ($row = mysqli_fetch_array($result)) {
            					do {
              					echo '<option value="'.$row["estado"].'" >'.$row["estado"].'</option>';
            					} while ($row = mysqli_fetch_array($result));
          					}
          					?>
        					</select>
      					</div>
      					<div class="col-xs-4" id='municipio'>
      						<label for="muni">Municipio: </label>
        					<select class="form-control input-sm" name="muni" id="muni" disabled>
          					<option value="" selected>Municipio...</option>
        					</select>
      					</div>
      					<div class="col-xs-4" id='ciudad'>
      						<label for="ciud">Ciudad: </label>
        					<select class="form-control input-sm" name="ciud" id="ciud" disabled>
          					<option value="" selected>Ciudad...</option>
        					</select>
      					</div>
    					</div>

    					<div class="form-group">
    						<div class="col-xs-4" id='colonia'>
    							<label for="colo">Colonia: </label>
        					<select class="form-control input-sm" name="colo" id="colo" disabled>
          					<option value="" selected>Colonia...</option>
        					</select>
      					</div>
      					<div class="col-xs-2">
      						<label for="cpostal">CP: </label>
        					<input type="text" class="form-control input-sm" name="cpostal" id="cpostal" value="" disabled>
      					</div>
      					<div class="col-xs-4">
      						<label for="calle">Calle: </label>
        					<input type="text" class="form-control input-sm" name="calle" id="calle" placeholder="Calle">
      					</div>
      					<div class="col-xs-2">
      						<label for="num">Número: </label>
        					<input type="text" class="form-control input-sm" name="num" id="num" placeholder="Número">
      					</div>
    					</div>

    					<div class="form-group">
    						<div class="col-xs-2">
      						<label for="int">Interior: </label>
        					<input type="text" class="form-control input-sm" name="int" id="int" placeholder="Interior">
      					</div>
      					<div class="col-xs-4">
      						<label for="cel">Celular:</label>
          				<input type="text" class="form-control input-sm" id="cel" name="cel" maxlength="10" minlength="10" placeholder="Número a 10 dígitos" onKeyPress="return cNum(event)">
          			</div>
    					</div>

      			</div>
    			</div>
  			</div>

  			<div class="panel panel-default">
    			<div class="panel-heading">
      			<span>
        			<a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo"><i class="fa fa-plus-square-o"></i> Empresa</a>
      			</span>
    			</div>
    			<div id="collapseTwo" class="panel-collapse collapse">
      			<div class="panel-body">

							<div class="form-group">
    						<div class="col-xs-6">
    							<label for="empresa">Nombre: </label>
        					<input type="text" class="form-control input-sm" name="empresa" id="empresa" placeholder="Nombre de la empresa">
      					</div>
      					<div class="col-xs-6">
    							<label for="giro">Giro: </label>
        					<input type="text" class="form-control input-sm" name="giro" id="giro" placeholder="Giro de la empresa">
      					</div>
    					</div>

    					<div class="form-group">
    						<div class="col-xs-4">
    							<label for="cargo">Cargo: </label>
        					<input type="text" class="form-control input-sm" name="cargo" id="cargo" placeholder="Cargo en la empresa">
      					</div>
      					<div class="col-xs-4">
    							<label for="teltrab">Teléfono: </label>
        					<input type="text" class="form-control input-sm" id="teltrab" name="teltrab" maxlength="10" minlength="10" placeholder="Número a 10 dígitos" onKeyPress="return cNum(event)">
      					</div>
    					</div>

      			</div>
    			</div>
  			</div>
  		</div>

  		<div class="form-group">
      	<div class="col-xs-12 text-right">
        	<button type="reset" class="btn btn-default"><i class="fa fa-square-o"></i> Limpiar</button>
        	<button class="btn btn-primary" type="button" id="bot"><i class="fa fa-save"></i> Registrar</button>
      	</div>
    	</div>

		</form>
	</div>
</div>