function load_module(name){
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "js/" + name + ".js";

    var ref = document.getElementsByTagName( 'script' )[ 0 ];
    ref.parentNode.insertBefore(s, null);
    console.log(">> Loaded module " + name);
    return s;
}

// tech demo
window.onload = function() {

  var color1 = Color.random();
  var color2 = color1.opposite();
  var color3 = color2.hoffset(0.3);
  var color4 = color3.hoffset(0.2);

  document.body.style.backgroundColor = color1.code();

  var char = new GraphicElement("testing/char1.png", color1.code());
  char.move(100,100);

  var tree = new GraphicElement("testing/tree.png", color3.code());
  tree.move(20,0);

  var tree = new GraphicElement("testing/tree.png", color3.code());
  tree.move(200,30);

  var tree = new GraphicElement("testing/tree.png", color3.code());
  tree.move(250,50);

  var h = new GraphicElement("testing/house.png", color4.code());
  h.move(250,50);
}


// All imports
load_module("classes/Color");
load_module("classes/GraphicElement");
