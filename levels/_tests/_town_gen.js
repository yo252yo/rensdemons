
var last = 0;


function g(){
  var seed = Math.random();
  CURRENTLEVEL.setup("");

  DICTIONARY.set("dungeons_seed", seed);
  new Snippet("levels/024_squids");

  last = setTimeout(g, 2000);
}
g();



function stop(){
  clearTimeout(last);
}
