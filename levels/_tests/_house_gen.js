
var last = 0;


function g(){
  var seed = Math.random();
  CURRENTLEVEL.setup("house_" + seed  + "_");
  last = setTimeout(g, 2000);
}
g();



function stop(){
  clearTimeout(last);
}
