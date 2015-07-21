// http://codepen.io/AlienPiglet/pen/hvekG
function background(id) {
  var c = document.getElementById(id);
  var ctx = c.getContext('2d');
  var xMax = c.width = window.innerWidth;
  var yMax = c.height = window.innerHeight;
  var hmTimes = Math.round(xMax + yMax);

  for(var i=0; i<=hmTimes; i++) {
    var randomX = Math.floor((Math.random()*xMax)+1);
    var randomY = Math.floor((Math.random()*yMax)+1);
    var randomSize = Math.floor((Math.random()*2)+1);
    var randomOpacityOne = Math.floor((Math.random()*9)+1);
    var randomOpacityTwo = Math.floor((Math.random()*9)+1);
    var randomHue = Math.floor((Math.random()*360)+1);
    if(randomSize>1) {
      ctx.shadowBlur = Math.floor((Math.random()*15)+5);
      ctx.shadowColor = "white";
    }
    ctx.fillStyle = "hsla("+randomHue+", 30%, 80%, ."+randomOpacityOne+randomOpacityTwo+")";
    ctx.fillRect(randomX, randomY, randomSize, randomSize);
  }
  window.addEventListener('resize', throttle(function() {
    requestAnimationFrame(function() {
      background(id);
    });
  }, 1000, {leading: false}), false, false);
}
// http://underscorejs.org/underscore.js
function throttle(func, wait, options) {
  var context, args, result;
  var timeout = null;
  var previous = 0;
  if (!options) options = {};
  var later = function() {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  return function() {
    var now = Date.now();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
}
