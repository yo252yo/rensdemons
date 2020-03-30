

var s0 = new StaticSprite("assets/title_layer0.png", PALETTE.color_player.code());
var s1 = new StaticSprite("assets/title_layer1.png", PALETTE.color_background.code());
var s2 = new StaticSprite("assets/title_layer2.png", PALETTE.color_obj_light.code());

function adapt_sprite(s, depth) {
  s.container.style.top = "0px";
  s.container.style.left =  "0px";
  s.container.style.height = "100%";
  s.html_canvas.style.height = "100%";
  s.adjust_depth(depth);
}

// We wait so that we're sure the sprite has been drawn :(
setTimeout(function(){
  adapt_sprite(s0, 0);
  adapt_sprite(s1, 1);
  adapt_sprite(s2, 2);
}, 500);

new TextMenu("",
              [
                {"text": "New game", "effect": function(){ LEVEL.load("introduction");}},
                {"text": "Load", "effect": function(){ alert("Not implemented");}},
                {"text": "Options", "effect": function(){ alert("Not implemented");}}
             ]);
