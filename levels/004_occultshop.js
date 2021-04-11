
AUDIO.music.house();

new S_Floor(200, 500, 300, 300);

new S_SavePoint(425, 475);
new S_SavePoint(225, 475);

new B_Statue(450, 225);
new B_Statue(225, 225);

new B_Table(325, 325);

var shopkeep = new M_NPC(325, 275, "villager2");
shopkeep.interaction = function(){
  this.face_character();
  if(PARTY.has_member(PARTYMEMBERS.UpbeatDojikko)){
    new TextBanner(`$$UpbeatDojikko$: "Go ahead, I'm right behind you. Just tidying a few things here."`);
  } else {
    BATTLE.api.make('_party/_UpbeatDojikko');
  }
}

var entrance = new S_Floor(335, 525, 50, 35, 'obj_dark');
entrance.interaction = function(){
  CURRENTLEVEL.setup("004_town1");
}

CURRENTLEVEL.initialize_with_character(350, 505);
