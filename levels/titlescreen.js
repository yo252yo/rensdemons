AUDIO.music.interface.titlescreen();

var s0 = new LevelObject(new StaticSprite("assets/screens/title_layer0.png", 'player'), 0, SCREEN.height());
var s1 = new LevelObject(new StaticSprite("assets/screens/title_layer1.png", 'background'), 0, SCREEN.height());
var s2 = new LevelObject(new StaticSprite("assets/screens/title_layer2.png", 'obj_light'), 0, SCREEN.height());


function adapt_sprite(s, depth) {
  s.visual_element.container.style.top = "0px";
  s.visual_element.container.style.left =  "0px";
  s.visual_element.container.style.height = "100%";
  s.visual_element.html_canvas.style.height = "100%";
  s.visual_element.html_canvas.style.position = "fixed";
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

new CenteredTextMenu("",
              [
                {"text": "New game", "effect": function(){ CURRENTLEVEL.setup("000_introduction"); }},
                {"text": "$ALPHA$_ go to new content", "effect": function(){ CURRENTLEVEL.setup("002_trialinstruction"); }},
                {"text": "$ALPHA$_ CLEAN MEMORY", "effect": function(){ DISK.hard_reset(); }, "keep_open": true},
                {"text": "Load past save", "effect": function(){ SAVE.print.load_menu(); } },
                {"text": "Download/upload game data", "effect": function(){ INTERFACE.display.data_menu(); } },
                {"text": "Options", "effect": function(){ INTERFACE.display.options_menu(); }},
                {"text": "Help", "effect": function(){ INTERFACE.display.help_menu(); }},
                {"text": "Credits", "effect": function(){ INTERFACE.display.credits_menu(); }},
             ]);

 FOG.stop();
