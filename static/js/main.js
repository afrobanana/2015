$(function() {
  $('.wrapper').scrollspy({
    target: '.side-nav a'
  });
  $('.side-nav').sticky({
    'parent': '.wrapper'
  });
});



// console.log('hello world');
//   $(window).on('resize', function(e) {
//       var nav_width = (function(items) {
//           var w = 0;
//           items.each(function(i, item){
//             w += $(item).width();
//           });
//           return w;
//         })(abr.nav_items),
//         max_width = this.innerWidth,
//         diff = nav_width - max_width;

//       if (nav_width >= max_width) {
//         abr.nav_global.addClass('minimize');
//       } else {
//         abr.nav_global.removeClass('minimize');
//       }
//     }).on('hashchange', function() {
//       var hash = (location.hash || '#/intro').split('#/')[1],
//           subs = hash.split('/'),
//           id = hash.replace(/\//g,  '__'),
//           $el = $('#' + id);

//       $('.page.is-active, a.is-active').removeClass('is-active');
//       subs.forEach(function(sub) {
//         $('a[href="#/' + sub + '"]').addClass('is-active');
//       });
//       $('a[href="#/' + hash + '"]').addClass('is-active');
//       if (!abr.views.id) {
//         // abr.views[id] = new Vue({
//         //   el: '#' + id,
//         //   data: abr.viewData[id]
//         // });
//       }
//       if (abr._headroom) {
//         abr._headroom.destroy();
//       }
//       abr._headroom = new Headroom($(".nav-global")[0], {
//         scroller: $el[0]
//       });
//       abr._headroom.init();
//       $el.addClass('is-active').scrollTop(0);
//     }).trigger('resize').trigger('hashchange');
