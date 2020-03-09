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
load_class("Graphic/VisualElement"); // parent
load_class("Graphic/Color");
load_class("Graphic/Rectangle");
load_class("Graphic/StaticSprite");

load_module("LEVEL");
