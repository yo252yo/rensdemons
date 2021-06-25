
var last = 0;


function g(){
  var seed = Math.random();
  CURRENTLEVEL.setup("");

  DICTIONARY.set("world_seed", seed);
  new Snippet("levels/025_harpies");

  last = setTimeout(g, 5000);
}
g();



function stop(){
  clearTimeout(last);
}
