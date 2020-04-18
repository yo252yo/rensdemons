

var s0 = new LevelObject(new StaticSprite("assets/title_layer0.png", 'player'), 0, SCREEN.height());
var s1 = new LevelObject(new StaticSprite("assets/title_layer1.png", 'background'), 0, SCREEN.height());
var s2 = new LevelObject(new StaticSprite("assets/title_layer2.png", 'obj_light'), 0, SCREEN.height());


function adapt_sprite(s, depth) {
  s.visual_element.container.style.top = "0px";
  s.visual_element.container.style.left =  "0px";
  s.visual_element.container.style.height = "100%";
  s.visual_element.html_canvas.style.height = "100%";
  s.visual_element.adjust_depth(depth);

  s.visual_element.draw = function (){
    s.visual_element.tint();
  }
}

// We wait so that we're sure the sprite has been drawn :(
setTimeout(function(){
  adapt_sprite(s0, 0);
  adapt_sprite(s1, 1);
  adapt_sprite(s2, 2);
}, 500);

new TextMenu("",
              [
                {"text": "New game", "effect": function(){ LEVEL.setup("000_introduction"); return true; }},
                {"text": "Load", "effect": function(){ return SAVE.print.load_menu(); }},
                {"text": "Options", "effect": function(){ INTERFACE.display_options_menu(); return true; }},
             ]);
