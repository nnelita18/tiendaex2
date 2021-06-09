(function($) {

	$('#table-metas').DataTable();

	$('body').on('click', '#selareas-metas .item', function () {
		let $areaSel = $(this),
        $areasList =  $('#selareas-metas .item');
        $areasList.removeClass('selected');

        $areaSel.addClass('selected');
	});

  $('body').on('click', '.deleteitem-list', function () {
    Swal.fire({
      title: 'Estas seguro de eliminar esta Meta?',
      text: "Esta acción no se podrá revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Borrado!',
          'La meta ha sido eliminada.',
          'success'
        )
      }
    })
  });

  $('#fechaIni').datepicker({
      autoClose: true
  });
  $('#fechaFin').datepicker({
      autoClose: true
  });
})(jQuery);