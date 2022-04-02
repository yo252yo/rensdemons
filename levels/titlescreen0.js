AUDIO.music.interface.titlescreen();

var ss0 = new StaticSprite("assets/screens/title_layer0.png", 'player', SCREEN.width(), SCREEN.height());
var s0 = new LevelObject(ss0, 0, SCREEN.height());

var ss1 = new StaticSprite("assets/screens/title_layer1.png", 'background', SCREEN.width(), SCREEN.height());
var s1 = new LevelObject(ss1, 0, SCREEN.height());

var ss2 = new StaticSprite("assets/screens/title_layer2.png", 'obj_light', SCREEN.width(), SCREEN.height());
var s2 = new LevelObject(ss2, 0, SCREEN.height());


function adapt_sprite(s, depth) {
  if(!s.visual_element.drawn){
    setTimeout(function(){ adapt_sprite(s, depth); }, 100);
    return;
  }

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

var adapt_all_sprite = function(){
  adapt_sprite(s0, 0);
  adapt_sprite(s1, 1);
  adapt_sprite(s2, 2);
}
adapt_all_sprite();


var options = [];
var title = "";
if (INTERFACE.is_trial()) {
  document.title = "Ren's DEMO";
  title = "<span style='font-size:14px;'>Demo version of the upcoming RPG Ren's Demons by yo252yo (WIP), giving a taste of the atmosphere/mechanics/design with a 30min-1h totally standalone different story (i.e. no spoil).</span>";
} else {
  document.title = INTERFACE.game_title_string();
  INTERFACE.game_title();
}


if(/^((?!chrome|android).)*safari/i.test(navigator.userAgent)){
  title += "<span style='font-size:14px;font-weight:bold;color:red;'>WARNING: It looks like you are using a web browser like Safari which does not respect all HTML standards and prevents developpers from debugging their code. The game may not run smoothly unless you change browser.</span>";
}

options.push({"text": "New game", "effect": function(){ INTERFACE.start_game() }});
options.push({"text": "Load past save", "effect": function(){ SAVE.print.load_menu(); } });
options.push({"text": "", "keep_open": true});
options.push({"text": "Options", "effect": function(){ SETTINGS.options_menu(); }});

if (!INTERFACE.is_trial()) {
  options.push({"text": "Completion", "effect": function(){ INTERFACE.display.achievements(); }});
}

options.push({"text": "Help", "effect": function(){ INTERFACE.display.help_menu(); }});
options.push({"text": "", "keep_open": true});
options.push({"text": "Change language", "effect": function(){ INTERFACE.display.translations(); }});
options.push({"text": "Content warnings", "effect": function(){ INTERFACE.display.cw_menu(); }});
options.push({"text": "Credits", "effect": function(){ INTERFACE.display.credits_menu(); }});

if (INTERFACE.is_trial()) {
  options.push({"text": "Updates on full version", "keep_open": true,"effect": function(){ window.open("https://www.twitter.com/yo252yo"); }});
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
    padding: 50,
  };
}

var deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  alert("do u want to install?");
  e.preventDefault();
  deferredPrompt = e;
});

var install = function(){
  alert(deferredPrompt);
  if(deferredPrompt){
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice
    .then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });
  }
}

title +=`<span onclick="install();">TEST</span>`;
console.log(title);

if('serviceWorker' in navigator) {
  navigator.serviceWorker
           .register('serviceWorker.js', {scope : '.' })
           .then(function() { console.log("Service Worker Registered"); });
}

var te = new TextMenu("A" + title, options, d.left,d.top+d.height, d.width, d.height, d.padding);

if(SCREEN.is_mobile()){
  te.container.style.opacity = 0.8;
}
FOG.stop();


var r = new Rectangle (-100,SCREEN.height()+100, SCREEN.width()+200, SCREEN.height()+200, undefined, "assets/screens/title_bg.png", true);
r.container.style.position = "fixed";
