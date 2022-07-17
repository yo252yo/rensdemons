AUDIO.music.interface.gameover();






var ss0 = new StaticSprite("assets/screens/gameover_layer0.png", 'player', SCREEN.width(), SCREEN.height());
var s0 = new LevelObject(ss0, 0, SCREEN.height());

var ss1 = new StaticSprite("assets/screens/gameover_layer1.png", 'background', SCREEN.width(), SCREEN.height());
var s1 = new LevelObject(ss1, 0, SCREEN.height());

var ss2 = new StaticSprite("assets/screens/gameover_layer2.png", 'obj_light', SCREEN.width(), SCREEN.height());
var s2 = new LevelObject(ss2, 0, SCREEN.height());


function adapt_sprite(s, depth) {
  if(!s.visual_element.drawn){
    setTimeout(function(){ adapt_sprite(s, depth); }, 100);
    return;
  }
  s.visual_element.container.style.height = "100%";
  s.visual_element.html_canvas.style.height = "100%";
  s.visual_element.container.style.top = "0px";

  if(SCREEN.width() / SCREEN.height() > 0.8 * 1620 / 1080){
    s.visual_element.container.style.width = "100%";
    s.visual_element.html_canvas.style.width = "100%";
  } else{
  s.visual_element.container.style.width = 1620/1080 * SCREEN.height();
  s.visual_element.html_canvas.style.width = 1620/1080 * SCREEN.height();


    var r = Math.floor(- 400 + 500 * SCREEN.width()/1620);
    s.visual_element.container.style.right = r;
    s.visual_element.html_canvas.style.right = r;

  }


  s.visual_element.html_canvas.style.position = "fixed";
  s.visual_element.adjust_depth(depth);

  s.visual_element.draw = function (){
    s.visual_element.tint();
  }
}

/*
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
*/

var adapt_all_sprite = function(){
  adapt_sprite(s0, 0);
  adapt_sprite(s1, 1);
  adapt_sprite(s2, 2);
}
adapt_all_sprite();

var options = [];

if (BATTLE.api.can_reload()) {
  options.push({"text": "Retry event", "effect": function(){ BATTLE.api.reload(); }});
}
if(CURRENTLEVEL.previous_lvl == "026_castle2"){
  options.push({"text": "Retry event", "effect": function(){
    SAVE.load(0);
    setTimeout(function(){ MARTYRDOM.death();}, 1000);
   }});
}
options.push({"text": "Load", "effect": function(){ SAVE.print.load_menu(); }});
options.push({"text": "New game", "effect": function(){ INTERFACE.start_game(); }});

var flavortext = RANDOM.pick(
  ["This is not how it ends.",
  "This is not how it's supposed to be.",
  "There's another way.",
  "Your quest goes on.",
  "Your story does not conclude here."]);


var s = CURRENTLEVEL.level_name.split(CURRENTLEVEL.SAME_IMPORT_DIFFERENT_LEVEL_SEPARATOR);
if(s.length > 1 && s[1] == 'suicide'){
  flavortext = RANDOM.pick(
    ["You killed yourself. It is not what you should have done.",
    "You're dead. What are you going to do now?",
    "You are not supposed to end your life."]);
}
var te = new CenteredTextMenu("<i>"+flavortext+"</i><br />Reap the fruits of your misfortune in the Martyrdom menu.", options);

if(!SCREEN.is_mobile()){
  te.place_at(100,100);
} else {
  te.place_at(undefined,SCREEN.height() - 475);
}
FOG.stop();

STATS.record.death();
MARTYRDOM.death();
FOG.stop();
