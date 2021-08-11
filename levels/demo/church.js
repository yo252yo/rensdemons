new Snippet("levels/decors/temple");

var f = new S_Floor(250,775,100,35, 'obj_dark', 'demo/town');



var talk = function() {
  TextBannerSequence.make([
    `$$Ren$: "Hello, father. I am ready for the ritual."`,
    `Priest: "Good, very good. Come closer, my child."`,
  ], function() {
    BATTLE.api.make('_demo/_priest');
  });
}

var hp = new M_Priest(300, 475);
hp.interaction = function() {
  this.face_character();
  new CenteredTextMenu("Talk to the Priest?",
                [
                  {"text": "Yes", "effect": talk},
                  {"text": "No", "effect": "##CLOSE"},
               ]
             );
}



CURRENTLEVEL.add_trigger("suicide", function(){ return ABILITIES.has_ability("_demo_died"); }, function() {
  DICTIONARY.factory.make_new();
  PALETTE.factory.make_new();

  ABILITIES._abilities.delete(["_demo_died"]);
  LEVELSTATES._states.delete(["demo/town"]);
  LEVELSTATES._states.delete(["demo/world"]);
  LEVELSTATES._states.delete(["demo/church"]);

  var newren = MARKOV_MODELS.human_names.mutate("Ren", 20);
  DICTIONARY.set("Ren", newren);
  DICTIONARY.set("ORIGINAL_Ren", newren);
  CURRENTLEVEL.setup("demo/town");
});



SAVE.autosave();

CURRENTLEVEL.initialize_with_character(275, 750);
