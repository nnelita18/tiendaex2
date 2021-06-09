(function($) {
  $('body').on('click', '.delprosp-area', function () {
    Swal.fire({
      title: 'Estas seguro de eliminar este Prospecto?',
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
          'El prospecto se ha sido eliminada.',
          'success'
        )
      }
    })
  });
})(jQuery);