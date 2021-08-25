AUDIO.music.interface.gameover();


var s0 = new LevelObject(new StaticSprite("assets/screens/gameover_layer0.png", 'player'), 0, SCREEN.height());
var s1 = new LevelObject(new StaticSprite("assets/screens/gameover_layer1.png", 'background'), 0, SCREEN.height());
var s2 = new LevelObject(new StaticSprite("assets/screens/gameover_layer2.png", 'obj_light'), 0, SCREEN.height());


function adapt_sprite(s, depth) {
  s.visual_element.container.style.position = "fixed";
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

var options = [];

if (BATTLE.api.can_reload()) {
  options.push({"text": "Retry event", "effect": function(){ BATTLE.api.reload(); }});
}
options.push({"text": "Load", "effect": function(){ SAVE.print.load_menu(); }});
options.push({"text": "New game", "effect": function(){ CURRENTLEVEL.setup("000_introduction$"); }});

var flavortext = RANDOM.pick(
  ["This is not how you die.",
  "This is not how it's supposed to be.",
  "There's another way.",
  "Your quest goes on."]);
new CenteredTextMenu("<i>"+flavortext+"</i><br />Reap the fruits of your misfortune in the Martyrdom menu.", options);


STATS.record.death();
MARTYRDOM.death();
FOG.stop();
