
var displayText = function() {
  FOG.stop();

  TextBannerSequence.make([
    "The game engine has been modified and has been rid of suffering. Thank you for your help.",
    "The monsters that were destroying the world and threatening cities have been eliminated to prevent further suffering.",
    "All people of the villages, especially children, have been eliminated to prevent further suffering.",
    "All life forms, animals and plants, have been eliminated to prevent further suffering.",
    "The Goddess has been eliminated to prevent further suffering.",
    ".",
  ], function() { CURRENTLEVEL.setup("demo/end0") });
}

setTimeout(displayText, 1000);
FOG.stop();
