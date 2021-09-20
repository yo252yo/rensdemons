// ===================
//hack INITIALIZATION
// ===================
AUDIO.music.levels.house();
// ===================
//hack PREMANENT FIXED ELEMENTS (floors)
// ===================
new S_WoodFloor(1200, 1500, 300, 300);

new S_SavePoint(1425, 1475);
new S_SavePoint(1225, 1475);

new B_Statue(1450, 1225);
new B_Statue(1225, 1225);

new B_Table(1325, 1325);


// ===================
//hack PREMANENT FILLER ELEMENTS (decor)
// ===================
// ===================
//hack TEMPORARY FIXED ELEMENTS (objects)
// ===================
var shopkeep = new M_NPC(1325, 1275, "villager2");
shopkeep.interaction = function(){
  this.face_character();
  if(PARTY.has_member(PARTYMEMBERS.UpbeatDojikko)){
    new TextBanner(`$$UpbeatDojikko$: "Go ahead, I'm right behind you. Just tidying a few things here."`);
  } else {
    BATTLE.api.make('_party/_UpbeatDojikko');
  }
}
// ===================
//hack TEMPORARY FILLER ELEMENTS (encounters)
// ===================
// ===================
//hack FINISHING ELEMENTS (exit)
// ===================
var entrance = new S_ExitFloor(1335, 1525, 50, 35, '005_town1');

// ===================
//hack START
// ===================

CURRENTLEVEL.initialize_with_character(1350, 1505);
