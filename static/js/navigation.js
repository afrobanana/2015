(function(window, undefined) {
  var elements = [];

  function addElement(el, options) {
    var parent = options.parent;

    elements.push({
      $el: el,
      parent: parent,
      offset: null
    });

    $(parent).off('scroll.sticky').on('scroll.sticky', function(e) {
      requestAnimationFrame(checkScroll);
    });

  }

  function checkScroll() {
    elements.forEach(function(element) {
      var $el = element.$el,
          top = $(element.parent).scrollTop(),
          height = $el[0].offsetHeight,
          offset = $el.offset().top,
          offset_orig = element.offset = element.offset || offset,
          method = top < (offset_orig)  ? 'removeClass' : 'addClass';
      $el[method]('is-sticky');
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
