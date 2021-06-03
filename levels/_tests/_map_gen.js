
var last = 0;


function g(){
  DICTIONARY._DICTIONARY["world_map_seed"] = Math.random();
  CURRENTLEVEL.setup("010_world_map");


// hills, lake, mountain

  last = setTimeout(g, 4000);
}
g();



function stop(){
  clearTimeout(last);
}
