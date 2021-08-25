AUDIO.music.interface.titlescreen();

var s0 = new LevelObject(new StaticSprite("assets/screens/title_layer0.png", 'player'), 0, SCREEN.height());
var s1 = new LevelObject(new StaticSprite("assets/screens/title_layer1.png", 'background'), 0, SCREEN.height());
var s2 = new LevelObject(new StaticSprite("assets/screens/title_layer2.png", 'obj_light'), 0, SCREEN.height());

var isTrial = !(window.location.href.includes("ren") && !window.location.href.includes("trial"));

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



var options = [];
var title = "";
if (isTrial){
  document.title = "Ren's DEMO";
  title = "Demo version of the upcoming RPG Ren's Devils by yo252yo (WIP), giving a taste of the atmosphere/mechanics/design with a 30min-1h totally standalone different story (i.e. no spoil).";
  options.push({"text": "New game", "effect": function(){ CURRENTLEVEL.setup("demo/town"); }});
} else {
  options.push({"text": "New game", "effect": function(){ CURRENTLEVEL.setup("000_introduction$"); }});
}

options.push({"text": "Load past save", "effect": function(){ SAVE.print.load_menu(); } });
options.push({"text": "Options", "effect": function(){ INTERFACE.display.options_menu(); }});
options.push({"text": "Credits", "effect": function(){ INTERFACE.display.credits_menu(); }});

if (isTrial) {
  options.push({"text": "Updates on full version", "keep_open": true,"effect": function(){ window.open("https://www.twitter.com/yo252yo"); }});
} else{
  options.push({"text": "Help", "effect": function(){ INTERFACE.display.help_menu(); }});
  options.push({"text": "Ren's DEMO", "effect": function(){ CURRENTLEVEL.setup("demo/town"); }} )
}

new CenteredTextMenu(title, options);

FOG.stop();
