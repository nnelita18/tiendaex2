(function($) {
  $('body').on('click', '.delclient-area', function () {
    Swal.fire({
      title: 'Estas seguro de eliminar este Cliente?',
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
          'El Cliente se ha sido eliminada.',
          'success'
        )
      }
    })
  });
})(jQuery);