
var last = 0;


function g(){
  var seed = Math.random();
  CURRENTLEVEL.setup("");

  var gen = new TownGenerator(seed, 1800, 1800);

  gen.build();
  last = setTimeout(g, 2000);
}
g();



function stop(){
  clearTimeout(last);
}
