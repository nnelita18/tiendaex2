(function($) {
  $('body').on('click', '.deleteitem-listCamp', function () {
    Swal.fire({
      title: 'Estas seguro de eliminar esta Campaña?',
      text: "Esta acción no se podrá revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarla!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Borrado!',
          'La Campaña ha sido eliminada.',
          'success'
        )
      }
    })
  });
})(jQuery);