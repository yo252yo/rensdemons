function load_module(name){
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "js/" + name + ".js";

    var ref = document.getElementsByTagName( 'script' )[ 0 ];
    ref.parentNode.insertBefore(s, ref);
    console.log(">> Loaded module " + name);
    return s;
}

window.onload = function() {
    console.log(">> Window loaded");
            setTimeout(function(){ console.log("AAAAAA"); LEVEL.setup("town"); }, 2000);
    DRAWING.init();
    UNIVERSE.load();
    DRAWING.repaint();
    CHARACTER.init();
}

window.onbeforeunload = function() {
    console.log(">> Window unloaded");
    UNIVERSE.save();
}

// All imports
load_module("random");
load_module("universe");
load_module("drawing");
load_module("world");
load_module("level");
load_module("map");
load_module("character");
load_module("io");
load_module("menus");
