function load_js(src){
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = src + ".js";

    var ref = document.getElementsByTagName( 'script' )[ 0 ];
    ref.parentNode.insertBefore(s, null);
    return s;
}

function load_module(name){
    load_js("js/modules/" + name);
    console.log(">> Loaded module " + name);
}

function load_class(name){
    load_js("js/classes/" + name);
    console.log(">> Loaded class " + name);
}

// tech demo
window.onload = function() {
  LEVEL.load("zero");
}


// All imports
load_module("RESOURCES");
load_module("LEVEL");
load_module("IO");


load_class("Graphic/Color");
load_class("Graphic/VisualElement"); // parent
  load_class("Graphic/CanvasElement");
    load_class("Graphic/StaticSprite");
    load_class("Graphic/MovingSprite");
  load_class("Graphic/Rectangle");
