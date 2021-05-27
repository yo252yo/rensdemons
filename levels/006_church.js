AUDIO.music.temple();

new Snippet("levels/decors/temple");

var f = new S_Floor(250,775,100,35, 'obj_dark');
f.interaction = function(){
  CURRENTLEVEL.setup("006_town2");
}


// 2-3 trainers
// new companion
// scenario


CURRENTLEVEL.initialize_with_character(275, 750);
