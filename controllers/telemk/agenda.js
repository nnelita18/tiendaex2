(function($) {
  const date = new Date();
  const d = date.getDate();
  const m = date.getMonth();
  const y = date.getFullYear();
  const form = '';
  const today = new Date($.now());

  $('#calendar').fullCalendar({
    minTime: '08:00:00',
    // maxTime: '21:00:00',
    header: {
      center: 'month,agendaWeek,agendaDay'
    },

    views: {
      basic: {
        // options apply to basicWeek and basicDay views
      },
      agenda: {
        // options apply to agendaWeek and agendaDay views
      },
      week: {
        // options apply to basicWeek and agendaWeek views
      },
      day: {
        // options apply to basicDay and agendaDay views
      }
    },
    events: [
      {
          title: 'Espera de respuesta',
          start: new Date($.now() + 506800000),
          className: 'bg-warning',
          textColor: '#ffffff'
      }, {
          title: 'Ultima Fase',
          start: today,
          end: today,
          className: 'bg-danger',
          textColor: '#ffffff'
      }, {
          title: 'Llamada para comfirmar acuerdo',
          start: new Date($.now() + 848000000),
          className: 'bg-info',
          textColor: '#ffffff'
      }
    ],

    dayClick: function (date, jsEvent, view) {
      const setDate = date,
            setjsEvent = jsEvent,
            setView = view;

      schedulePending(setDate, setjsEvent, setView);
    },
  });

  $(document).on('click', '.openSchedule', function () {
    $('#change-content').addClass('activeSchedule');
  });

  $(document).on('click', '.close-schedsection', function () {
    $('#change-content').removeClass('activeSchedule');
  });

})(jQuery);

function schedulePending(setDate, setjsEvent, setView) {
  console.log('Has hecho click en: '+ setDate.format());
  const dateSelect = setDate.format();
  $('#dateToday').html(dateSelect);
  $('#schedulePend').modal('show');
}