AUDIO.music.temple();

new Snippet("levels/decors/temple");

var f = new S_Floor(250,775,100,35, 'obj_dark');
f.interaction = function(){
  CURRENTLEVEL.setup("006_town2");
}

var wiseOldFool = new M_Priest(500, 125);

wiseOldFool.interaction = function() {
  this.face_character();
  if (PARTY.has_member(PARTYMEMBERS.WiseOld)){
    TextBannerSequence.make([
      `$$WiseOld$: "I am yours to command."`,
    ]);
  } else if (INVENTORY.count("_wiseOldTraining") == 1) {
    BATTLE.api.make('_party/_WiseOldBody');
  } else if (INVENTORY.count("_wiseOldTraining") == 2) {
    BATTLE.api.make('_party/_WiseOldMind');
  } else {
    BATTLE.api.make('_party/_WiseOldHeart');
  }
}

var hp = new M_Priest(300, 675);
hp.interaction = function() {
  this.face_character();
  TextBannerSequence.make([
    `Priest: "Please, make yourself at home. Our wisdom is yours."`,
    // TODO
  ]);
}


new M_Trainer(100, 650, 1, ABILITIES_ARCHETYPES_NAMES.Element, 500);
new M_Trainer(450, 650, 1, ABILITIES_ARCHETYPES_NAMES.Spirit, 500);


CURRENTLEVEL.start_function = function(){
    TextBannerSequence.make([
      `When you enter the immaculate building, you're immediately greeted by a hooded figure.`,
      `Priest: "Welcome, child! We were expecting you! I hope your travel from $$town_1$ went peacefully, though I have no doubt that the Goddess made sure it was so."`,
      `Priest: "You'll see, our beautiful city of $$town_2$ has much more to offer! We may not be the best in the kingdom, but we can help you a long way!"`,
      `Priest: "Everyone in this building is fully devoted to you! We'll give you anything you require, just ask! Some of us can teach you magic: we are knowledgeable in the ways of the Element and the ways of the Spirit."`,
      `Priest: "But most importantly, I can tell you where to find the power to defeat $$demon_lord$. Come and see me when you're ready to learn."`,
      `$$BestFriend$: "Well, that sounds promising!"`,
      `$$Ren$: "To me, it sounds scary!"`,
    ], function(){ IO.control.character(); });
};

CURRENTLEVEL.initialize_with_character(275, 750);
