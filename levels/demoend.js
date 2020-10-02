

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
    "Thanks for playing this little tech demo-proof of concept for Ren's devils. If you have access to this, I guess you know who to send all your thoughts, comments and impressions to. Especially bug reports.",
    "Contrary to You Doesn't Exist, I want this game to be original and enjoyable from the get go XD the beginning should stay a lot like this, but I'll probably make the Trials a bit more complex.",
    "There's a few known issues I'm already working on: centering elements is a bit broken, depth rendering sometimes fucks up on mobile, and I still don't know what to do when menus have too many options. But hopefully the game engine is in a pretty reasonable state.",
    "In the rest of the game, Ren will set out to travel the world and get stronger to defeat the evil  $$demon_lord$. And of course, discover the secrets of this world in the process. And of course there's gonna be a bunch of weirdness and pseudo philosophy to this whole adventure.",
  ]);
}
/*
var boss_callback = function() {
  TextBannerSequence.make([
    "Everyone in the room was very excited. Some were yelling, some were dancing, other were just too stunned to realize what had happened.",
    "Priest: \"The day has finally come! The Promised Child is here! Praised be the Goddess.\"",
    "Priests and children alike were weeping tears of joys. For centuries, mankind had awaited this event. And now it was finally here. During their lifetime. In front of them. In their little town! The cheers lasted for a moment. Finally, the head priest turned towards Ren.",
    "Priest: \"Come, child. You have much to learn. Your journey is only beginning.\"",
  ], function(){ CURRENTLEVEL.setup("demoend"); });
}

*/

setTimeout(displayText, 1000);
FOG.stop();
