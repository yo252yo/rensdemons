
AUDIO.music.levels.fissure();

new S_TownFloor(1050, 1550, 750, 750, "010_world_map", "assets/patterns/mud.png");

new S_ExitFloor(1400,1125,20,200, "042_fissure2");
new S_ExitFloor(1400,1025,35,75, "042_fissure2");
new S_ExitFloor(1380,1200,20,125, "042_fissure2");
new S_ExitFloor(1360,1325,20,175, "042_fissure2");
new S_ExitFloor(1380,1425,20,150, "042_fissure2");


CURRENTLEVEL.start_function = function() {
  var callback = function(){
    SAVE.autosave();
    IO.control.character();
  }
  TextBannerSequence.make([
    "In front of you, a thin crack splits the ground into an open wound. It seems barely enough for a child to get through. The walls are steep, but the irregular rock offers plenty of support to climb down. You can tell that it dives deep into the earth. It seems to widen as it burrows underground. You think you see something shimmering vaguely at the bottom.",
    `$$BestFriend$: "I think this is a place where we can find out a lot more about the ancestors... Should we go?"`,
  ], callback);
};


CURRENTLEVEL.initialize_with_character(1050, 1520);
