$(function() {
  $('body').scrollspy({
    target: '.menu a',
    offset: 50
  });

  $('.menu')
    .sticky()
    .smoothScroll({
      targets: 'a[href^=#]:not([href=#])',
      duration: 800
    });

  $('.block--timetable')
    .smoothScroll({
      targets: '.block--timetable--section--title',
      duration: 800
    })
    .smoothScroll({
      targets: '.block--timetable--section--entry',
      duration: 800,
      offset: -150
    });
});

$.fn.smoothScroll = function(options) {
  options.offset = options.offset || 0;
  options.duration = options.duration || 500;
  return this.on('click', options.targets, function(e) {
    var hash = $(e.target).closest(options.targets).eq(0).attr('href') || '',
        target = hash ? $(hash) : [];
    target = target.length ? target : $('[name=' + hash.slice(1) +']');
    if (hash && target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top + options.offset
        }, options.duration);
        window.history.pushState( {} , null, hash);
        return false;
    }
  });
};

