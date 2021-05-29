AUDIO.music.temple();

new Snippet("levels/decors/temple");

var f = new S_Floor(250,775,100,35, 'obj_dark');
f.interaction = function(){
  CURRENTLEVEL.setup("007_town5");
}


CURRENTLEVEL.initialize_with_character(275, 750);
