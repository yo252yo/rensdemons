
var last = 0;


function g(){
  var seed = Math.random();
  GENERATEDLEVELS.house.setup(this.seed);
  last = setTimeout(g, 4000);
}
g();



function stop(){
  clearTimeout(last);
}
