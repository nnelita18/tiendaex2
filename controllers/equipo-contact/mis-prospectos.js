$('#table-prospectos').DataTable();

$('body').on('click', '.deleteitem-listEdit', function () {
    Swal.fire({
      title: '¿Estas seguro de eliminar este prospecto?',
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
          'El prospecto ha sido eliminado.',
          'success'
        )
      }
    })
  });