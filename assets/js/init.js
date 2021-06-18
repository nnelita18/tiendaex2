(function($) {
  /* ----------------------------------------------
 * Menu active selection
 *
 * ---------------------------------------------- */
  $('#navmenu > .nav-item > .nav-link').on('click', function (ev) {
    // ev.preventDefault();
    var  $itemMenu = $(this).parent(),
         $listMenu = $('#navmenu > .nav-item');

    $listMenu.removeClass('active');
    $itemMenu.addClass('active');

  });

  $('body').on('click', '#sidebar .pageto', function( e ) {
    e.preventDefault();
    let contentReplace = $('#change-content'),
        $localpage = $(this).attr('href'),
        pageRedir = $localpage;

    if ( pageRedir !== '' && pageRedir ) {
      loadContent(pageRedir, contentReplace);
    }
  });

  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

  $('.accdq-sec').on('show.bs.collapse', function () {
    $(this).addClass('only-onecard');
  })
  $('.accdq-sec').on('hide.bs.collapse', function () {
    $(this).removeClass('only-onecard');
    $('.accdq-sec .q-content').removeClass('only-onebtn');
  })

  $('.accdq-sec .btn-link').on('click', function () {
    $(this).parent().parent().addClass('only-onebtn');
  })

  $(body).on('click', '#services .sites--option', function () {
    var $bgnavpag = '#ffffe5',
        $this = $(this),
        $idopt = $this.attr('id');

    switch ($idopt) {
      case 'v-planes':
        $bgnavpag = '#274696';
        break;
      case 'venta_tae':
        $bgnavpag = '#c63468';
        break;
      case 'v-pj':
        $bgnavpag = '#36872c';
        break;
      case 'pago_servicios':
        $bgnavpag = '#e9501a';
        break;
      case 'v-tae':
        $bgnavpag = '#f9b030';
        break;
      case 'tramites':
        $bgnavpag = '#a55171';
        break;
      case 'chips':
        $bgnavpag = '#57509d';
        break;
      case 'v-peds':
        $bgnavpag = '#41b0f0';
        break;

    }

    $('#navcolorbox').css('backgroudColor', $bgnavpag);
  })

})(jQuery);

function loadContent(part, contentReplace) {
  $.get(part, function (data, textStatus, jqXHR) {
    contentReplace.html(data);
    // $('html, body').animate( {scrollTop : 0}, 800 );
  });
}