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

var explanations = function() {
  ABILITIES.unlock("_town2_visited");
  TextBannerSequence.make([
    `Priest: "As the Promised Child, I will now share with you secrets that have been kept strictly within the highest officials of the Church of $$town_2$."`,
    `Priest: "Everybody knows that the world of $$world_name$ has been under relentless torment from the evil armies of $$demon_lord$ for centuries, now. But few know the full story of how it happened, and what was before."`,
    `$$BestFriend$: "Wasn't there just peace?"`,
    `Priest: "Yes, but peace brings prosperity and development. It seems that our ancestors, free from the colonization of demons, had built a society far more powerfull and sophisticated than we can ever imagine from this period of suffering and ignorance."`,
    `Priest: "Sadly, even we don't know a lot about it. Most places, people and documents were wiped out when the armies of $$demon_lord$ raided $$world_name$. Not much is left besides rumors passed down by word of mouth over generations."`,
    `Priest: "We can only speculate how far their powers extended. We think they had complete mastery over nature, that magic was everywhere in the kingdom, that life was easy, happy and plentiful."`,
    `Priest: "Some of us think that it made our ancestors lazy, other think that it made them too drunk on their own hubris. In any case, when $$demon_lord$ arrived, they were not ready. In less than a few days, civilization was reduced to a few surviving tribes who rebuilt villages any way they could. Our ancestors. The ones the Goddess could protect."`,
    `$$Ren$: "I see, but why does it matter?"`,
    `Priest: "You, Promised Child, are the one who will make things right and bring us back to our former glory. But doing this will be no easy task. You're up against a demon who destroyed an entire kingdom in a few days."`,
    `$$Ren$: "I know, it sounds impossible. That's why I'm waiting for you to reveal your secret weapon, the big plan or whatever!"`,
    `Priest: "Well... That's the thing. We don't have one."`,
    `$$BestFriend$: "Are you joking? You want to send $$Ren$ straight to the grave?"`,
    `Priest: "Calm down. We do have the Goddess on our side. $$Ren$ is the Promised Child. That means $$Ren$ cannot fail! Implying otherwise is not only blasphemy, it's outright absurd!"`,
    `$$Ren$: "So... What do I do?"`,
    `Priest: "Well since you're going to defeat $$demon_lord$ and rid us of his evil scum, it means that you will find a way."`,
    `$$BestFriend$: "So we're supposed to just relax and wait until the Goddess talks to $$Ren$?"`,
    `Priest: "No, impertinent child! You cannot put demands on Her Holy Wisdom. I've told you about our ancestors for a reason. Our powers are no match for $$demon_lord$, but perhaps theirs could be, in the rightful hands of the servants of the Goddess. Furthermore, if we knew more about the circumstances of $$demon_lord$'s coming, we could maybe find a way to banish him..."`,
    `Priest: "Of course I would never be so presumptuous as to give orders to the Promised Child. But what I advise you is to look for the secrets of our ancestors. There are ruins of their grand civilization, but we haven't been able to explore them because they are swarming with monsters. But that should not be a problem for the Promised Child."`,
    `Priest: "In the north west, you'll find the Waters of $$sea_adj$ Squids."`,
    `Priest: "In the south east, there is the Peaks of $$mountain_adj$ Harpies."`,
    `Priest: "And finally, east of here, the Forest of the $$forest_adj$ Mushrooms is surely worth exploring too."`,
    `Priest: "Now go forth, Promised Child! Rid our beautiful lands of the scum that invaded it, and make $$world_name$ prosperous again!"`,
  ]);
}

var hp = new M_Priest(300, 675);
hp.interaction = function() {
  this.face_character();
  new CenteredTextMenu("Hear the Priest's explanations?",
                [
                  {"text": "Yes", "effect": explanations},
                  {"text": "No", "effect": "##CLOSE"},
               ]
             );
}


new M_Trainer(100, 650, 1, ABILITIES_ARCHETYPES_NAMES.Element, 500);
new M_Trainer(450, 650, 1, ABILITIES_ARCHETYPES_NAMES.Spirit, 500);


CURRENTLEVEL.start_function = function(){
    TextBannerSequence.make([
      `When you enter the immaculate building, you're immediately greeted by a hooded figure.`,
      `Priest: "Welcome, child! We were expecting you! I hope your travel from $$town_1$ went peacefully, though I have no doubt that the Goddess made sure it was so."`,
      `Priest: "You'll see, our beautiful city of $$town_2$ has much more to offer! We may not be the best in the kingdom, but we can help you a long way!"`,
      `Priest: "Everyone in this building is fully devoted to you! We'll give you anything you require, just ask! Some of us can teach you magic: we are knowledgeable in the ways of the Element and the ways of the Spirit."`,
      `$$BestFriend$: "Well, that sounds promising!"`,
      `$$Ren$: "To me, it sounds scary!"`,
      `Priest: "Most importantly, I can tell you where to find the power to defeat $$demon_lord$. Come and see me when you're ready to learn. But... these are very sensitive informations... Maybe it's best we speak alone?"`,
      `$$Ren$: "I'll just tell $$BestFriend$ everything right after, you may as well talk now."`,
      `Priest: "Very well."`,
    ], function(){ IO.control.character(); });
};

CURRENTLEVEL.initialize_with_character(275, 750);
