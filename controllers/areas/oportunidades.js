(function($) {
  $('body').on('click', '.delopor-area', function () {
    Swal.fire({
      title: 'Estas seguro de eliminar esta Oportunidad ?',
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
          'La Oportunidad  se ha sido eliminada.',
          'success'
        )
      }
    })
  });
})(jQuery);