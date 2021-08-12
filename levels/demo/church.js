new Snippet("levels/decors/temple");

var f = new S_Floor(250,775,100,35, 'obj_dark', 'demo/town');

var win = function(){
  CURRENTLEVEL.setup("demo/end");
}

var talk = function() {
  TextBannerSequence.make([
    `$$Ren$: "Hello, father. I am ready for the ritual."`,
    `Priest: "Good, very good. Come closer, my child."`,
  ], function() {
    BATTLE.api.make('_demo/_priest');
  });
}

if (! ABILITIES.has_ability("_demo_killed")){
  var hp = new M_Priest(300, 475);
  hp.interaction = function() {
    this.face_character();
    SAVE.autosave();
    new CenteredTextMenu("Talk to the Priest?",
                  [
                    {"text": "Yes", "effect": talk},
                    {"text": "No", "effect": "##CLOSE"},
                 ]
               );
  }
} else {
  var hp = new M_Priest(300, 475);
  hp.interaction = function() {
    this.face_character();
    TextBannerSequence.make([
      `The corpse of the holy man lies at your feet. Your murder did not solve anything. There is no going back, now. No way to go back to your peaceful life you loved so much. There is only one escape. And it could even save the village.`,
    ], function() {
      new CenteredTextMenu("Will you stab yourself?",
                    [
                      {"text": "Yes", "effect": function(){ ABILITIES.unlock("_demo_died"); }},
                      {"text": "No", "effect": "##CLOSE"},
                   ]
                 );
    });
  }
}


CURRENTLEVEL.add_trigger("suicide", function(){ return ABILITIES.has_ability("_demo_died"); }, function() {
  TextBannerSequence.make([
    `As life leaves your frail body, you take comfort in the fact that your village and family will be protected by your altruistic sacrifice.`,
  ], function() {
    CURRENTLEVEL.setup("demo/suicide");
  });
});





CURRENTLEVEL.initialize_with_character(275, 750);
