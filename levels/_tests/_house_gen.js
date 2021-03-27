
var last = 0;


function g(){
  var seed = Math.random();
  CURRENTLEVEL._setup.house(this.seed);
  last = setTimeout(g, 4000);
}
g();



function stop(){
  clearTimeout(last);
}
