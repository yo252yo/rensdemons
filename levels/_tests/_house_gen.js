
var last = 0;


function g(){
  var seed = Math.random();
  CURRENTLEVEL.setup("house_" + seed  + "_");
  var h = new HouseGenerator(seed);
  var c = h.build();
  CURRENTLEVEL.initialize_with_character(c[0], c[1]);
  last = setTimeout(g, 2000);
}
g();



function stop(){
  clearTimeout(last);
}
