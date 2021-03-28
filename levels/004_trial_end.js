AUDIO.music.temple();
ABILITIES.unlock("_trial_passed"); // redundant

new Snippet("levels/decors/temple");

var make_priest = function (x, y) {
  var priest = new M_Priest(x,y);
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

var hp = make_priest(275, 100);
hp.interaction = function() {
    BATTLE.api.make('_004/_priest');
};
make_priest(200, 550);
make_priest(275, 550);
make_priest(350, 550);


(new M_ChildM(150, 670)).interaction = function() {
  this.face_character();
  TextBannerSequence.make([
    "After this unlikely escape from a certain death, this child is overwhelmed by emotion. He's too stunned to talk, and simply weeps of joy."
  ])
 };
(new M_ChildF(180, 710)).interaction = function() {
  this.face_character();
  TextBannerSequence.make([
    "$$child_friends_f1$: \"I... I wasn't lying before. I could have done it too. Don't get too cocky because you're a god or something now.\""
  ])
 };
(new M_ChildF(280, 710)).interaction = function() {
  this.face_character();
  TextBannerSequence.make([
    "Girl: \"You... you saved me! Thank you! Thank you! And now you'll save us all!\""
  ])
 };

CURRENTLEVEL.start_function = function(){
    TextBannerSequence.make([
      "You just appear in the middle of the temple, in front of the Head Priest. For a few seconds, no one moves or says anything. The situation is so unexpected that all the witnesses need some time to make sense of what their eyes are reporting.",
      "And then, all at once, the atmosphere of disbelief exploded, and cheers errupted all around the room. Even the priests forgot their solemn demeanour for a while.",
      "Everyone in the room was very excited. Some were yelling, some were dancing, other were just too stunned to realize what had happened. For centuries, mankind had awaited this event. And now it was finally here. During their lifetime. In front of them. In their little town!",
      "The euphoria lasted for a moment. Finally, the head priest turned towards $$Ren$.",
      "Priest: \"Come to me, Child. You have much to learn. Your journey is only beginning.\"",
    ], function(){ IO.control.character(); });

};
CURRENTLEVEL.initialize_with_character(275, 150);
