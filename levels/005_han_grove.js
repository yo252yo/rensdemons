AUDIO.music.hideandseek();

CURRENTLEVEL.start_function = function() {
  var callback = function(){
    SAVE.autosave();
    IO.control.character();
  }
  TextBannerSequence.make([
    "You found an interesting grove...",
  ], callback);
};

new S_TownFloor(50, 550, 500, 500, "005_world_map");

new S_Tree(110,270);
new S_Tree(135,470);

CURRENTLEVEL.initialize_with_character(50, 520);
