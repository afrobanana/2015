// http://codepen.io/AlienPiglet/pen/hvekG
function background(id) {
  var c = document.getElementById(id);
  var ctx = c.getContext('2d');
  var xMax = c.width = window.innerWidth;
  var yMax = c.height = window.innerHeight;
  // var xMax = c.width = window.screen.availWidth;
  // var yMax = c.height = window.screen.availHeight;

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
  // window.addEventListener('resize', function() {
  //   requestAnimationFrame(background(id));
  // }, false, false);
}
