
var last = 0;


function g(){
  var seed = Math.random();
  CURRENTLEVEL.setup("");

  DICTIONARY.set("town_1_seed", seed);
  new Snippet("levels/decors/town1");

  last = setTimeout(g, 2000);
}
g();



function stop(){
  clearTimeout(last);
}
