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

})(jQuery);

function loadContent(part, contentReplace) {
  $.get(part, function (data, textStatus, jqXHR) {
    contentReplace.html(data);
    // $('html, body').animate( {scrollTop : 0}, 800 );
  });
}