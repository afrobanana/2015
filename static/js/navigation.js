(function(window, undefined) {
  var elements = [];

  function addElement(el, options) {
    var parent = options.parent;

    elements.push({
      $el: el,
      parent: parent
    });

    $(parent).off('scroll.sticky').on('scroll.sticky', function(e) {
      requestAnimationFrame(checkScroll);
    });

  }

  function checkScroll() {
    elements.forEach(function(nav) {
      var $el = nav.$el,
          top = $(nav.parent).scrollTop(),
          height = $el[0].offsetHeight,
          offset_orig = $el.data('sticky') ? $el.data('sticky').offset : null,
          offset = $el.offset().top,
          method = top <= (offset_orig) || (offset && (offset + height >= 0)) ? 'removeClass' : 'addClass';
      if (offset_orig == null) {
        $el.data('sticky', {
          offset: top + offset - height
        });
      }
      if (!$el.data('clone') && method === 'addClass') {
        var clone = $el.clone()
        // .css({
        //   height: $el[0].offsetHeight
        // });
        clone.insertAfter($el).css({
          'visibility': 'hidden'
        });
        $el.data('clone', clone);
      } else if ($el.data('clone') && method === 'removeClass') {
        $el.data('clone').remove();
        $el.data('clone', null);
      }
      $el[method]('is-sticky');
      console.log(method, offset_orig, offset, height, top);
    });
  }

  $.fn.sticky = function(options) {
    options = options || {};
    options.parent = options.parent || $(window);
    return this.each(function(i, el) {
      addElement($(this), options);
    });
  };
})(this);
