AUDIO.music.interface.titlescreen();

var s0 = new LevelObject(new StaticSprite("assets/screens/title_layer0.png", 'player'), 0, SCREEN.height());
var s1 = new LevelObject(new StaticSprite("assets/screens/title_layer1.png", 'background'), 0, SCREEN.height());
var s2 = new LevelObject(new StaticSprite("assets/screens/title_layer2.png", 'obj_light'), 0, SCREEN.height());


function adapt_sprite(s, depth) {
  if(SCREEN.is_mobile()){
    s.visual_element.container.style.top = "-100px";
    s.visual_element.container.style.left =  "-500px";
    s.visual_element.html_canvas.style.left =  "-500px";
  } else {
    s.visual_element.container.style.right =  "0px";
    s.visual_element.html_canvas.style.right =  "0px";
    s.visual_element.container.style.top = "0px";
  }
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
if (INTERFACE.is_trial()) {
  document.title = "Ren's DEMO";
  title = "Demo version of the upcoming RPG Ren's Demons by yo252yo (WIP), giving a taste of the atmosphere/mechanics/design with a 30min-1h totally standalone different story (i.e. no spoil).";
} else {
  document.title = INTERFACE.game_title_string();
  INTERFACE.game_title();
}

options.push({"text": "New game", "effect": function(){ INTERFACE.start_game() }});
options.push({"text": "Load past save", "effect": function(){ SAVE.print.load_menu(); } });
options.push({"text": "", "keep_open": true});
options.push({"text": "Options", "effect": function(){ INTERFACE.display.options_menu(); }});
options.push({"text": "Achivements", "effect": function(){ INTERFACE.display.achievements(); }});
options.push({"text": "Help", "effect": function(){ INTERFACE.display.help_menu(); }});
options.push({"text": "", "keep_open": true});
options.push({"text": "Credits", "effect": function(){ INTERFACE.display.credits_menu(); }});

if (INTERFACE.is_trial()) {
  options.push({"text": "Updates on full version", "keep_open": true,"effect": function(){ window.open("https://www.twitter.com/yo252yo"); }});
} else{
  options.push({"text": "Ren's DEMO", "effect": function(){ CURRENTLEVEL.setup("demo/town"); }} )
}



if(SCREEN.is_mobile()){
  var d = {
    top:  Math.floor(SCREEN.height())-400,
    left: Math.floor(SCREEN.width() * 0.5)-150,
    height: 0,
    width:300,
    padding: 5,
  };
} else{
  var d = {
    top: 200,
    left: Math.floor(SCREEN.width() * 0.1),
    height: 0,
    width: 550,
    padding: 75,
  };
}
var te = new TextMenu(title, options, d.left,d.top+d.height, d.width, d.height, d.padding);

if(SCREEN.is_mobile()){
  te.container.style.opacity = 0.8;
}
FOG.stop();


var r = new Rectangle (-100,SCREEN.height()+100, SCREEN.width()+200, SCREEN.height()+200, undefined, "assets/screens/title_bg.png", true);
