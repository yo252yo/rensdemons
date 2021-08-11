

var s0 = new LevelObject(new StaticSprite("assets/screens/gameover_layer0.png", 'player'), 0, SCREEN.height());
var s1 = new LevelObject(new StaticSprite("assets/screens/gameover_layer1.png", 'background'), 0, SCREEN.height());
var s2 = new LevelObject(new StaticSprite("assets/screens/gameover_layer2.png", 'obj_light'), 0, SCREEN.height());


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

var displayText = function() {
  TextBannerSequence.make([
    "CONGRATULATIONS for ending the cycle of child sacrifices by beating this demo of Ren's devils, and thanks a lot for playing!!!",
    "If you have access to this, I guess you know who to send all your thoughts, comments and impressions to. Especially bug reports. Your victory gives you priority treatment ;)",
    "Remember that the full version (under development) will be a complete game, with a few similar mechanics and items but a completely different story and meaning! I hope this demo gets you excited for it and eager to play the real thing!",
  ]);
}

setTimeout(displayText, 1000);
FOG.stop();
