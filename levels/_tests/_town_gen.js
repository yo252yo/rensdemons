
var last = 0;


function g(){
  var seed = Math.random();
  CURRENTLEVEL.setup("");

  DICTIONARY.set("town_5_seed", seed);
  new Snippet("levels/decors/town5");

  last = setTimeout(g, 2000);
}
g();



function stop(){
  clearTimeout(last);
}
