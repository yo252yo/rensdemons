
var last = 0;


function g(){
  CURRENTLEVEL.setup("005_world_map");
/*
  var gen = new TownGenerator(seed, 1800, 1800);

  gen.build();*/




// hills, lake, mountain

  last = setTimeout(g, 4000);
}
g();



function stop(){
  clearTimeout(last);
}
