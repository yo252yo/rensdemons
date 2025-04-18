
// ===================
//hack A. INITIALIZATION (sound, etc...)
//hack B. FLOORS
//hack D. UNIQUE ELEMENTS
// ===================
ABILITIES.unlock("_trial_passed"); // redundant
var gen = new Generator(DICTIONARY.get("world_seed"));

new Snippet("levels/decors/temple");

// ===================
//hack C. EXIT
// ===================

new S_ExitFloor(1250,1775,100,35, '005_town1');

// ===================
//hack D. UNIQUE ELEMENTS
// ===================

new S_StainedGlass_wall(1075, 1050, 'church');
new S_StainedGlass_wall(1275, 1050, 'hope');
new S_StainedGlass_wall(1475, 1050, 'church');

var make_priest = function (x, y) {
  var priest = new M_Priest(x,y, CITIES.hope);
  priest.interaction = function() {
    this.face_character();

    new TextBannerRandom([
      "Priest: \"The day has finally come! The Promised Child is here! Praised be the Goddess.\"",
      "Priest: \"We are all saved! The world is saved! Praised be the Goddess.\"",
      "Priest: \"It's a miracle! A miracle! Praised be the Goddess for granting me this sight!\"",
      "Priest: \"Her Glory be onto you, Child. I am not worthy of Your gaze.\"",
      "The priest cannot even talk clearly. He mumbles unintelligible sounds, tears of joy running down his wrinkled face.",
    ]);
 };
 return priest;
}
make_priest(1200, 1550);
make_priest(1275, 1550);
make_priest(1350, 1550);

var hp = make_priest(1275, 1100);
hp.interaction = function() {
    BATTLE.api.make('_004/_priest');
};


(new M_ChildM(1150, 1670, gen.pick(DATASETS.male_names), CITIES.hope)).interaction = function() {
  this.face_character();
  TextBannerSequence.make([
    "After this unlikely escape from a certain death, this child is overwhelmed by emotion. He's too stunned to talk, and simply weeps of joy."
  ])
 };
(new M_ChildF(1180, 1710, DICTIONARY.get("child_friends_f1"), CITIES.hope)).interaction = function() {
  this.face_character();
  TextBannerSequence.make([
    "$$child_friends_f1$: \"I... I wasn't lying before. I could have done it too. Don't get too cocky because you're a god or something now.\""
  ])
 };
(new M_ChildF(1280, 1710, gen.pick(DATASETS.female_names), CITIES.hope)).interaction = function() {
  this.face_character();
  TextBannerSequence.make([
    "Girl: \"You... you saved me! Thank you! Thank you! And now you'll save us all!\""
  ])
 };

// ===================
//hack G. START/INIT
// ===================

CURRENTLEVEL.start_function = function(){
    TextBannerSequence.make([
      "You just appear in the middle of the temple, in front of the Head Priest. For a few seconds, no one moves or says anything. The situation is so unexpected that all the witnesses need some time to make sense of what their eyes are reporting.",
      "And then, all at once, the atmosphere of disbelief explodes, and cheers erupt all around the room. Even the priests forget their solemn demeanor for a while.",
      "Everyone in the room is very excited. Some are yelling, some are dancing, others are just too stunned to realize what has happened. For centuries, mankind has awaited this event. And now it is finally here. During their lifetime. In front of them. In their little town!",
      "The euphoria lasts for a moment. Finally, the head priest turns towards $$Ren$.",
      "Priest: \"Come to me, Child. You have much to learn. Your journey is only beginning.\"",
    ], function(){ IO.control.character(); });

};
CURRENTLEVEL.initialize_with_character(1275, 1150);
