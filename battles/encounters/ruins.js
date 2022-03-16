// ===================
//hack INITIALIZATION
// ===================

BESTIARY.picture('encounters/ruins');
PLAYER_ACTIONS.allow_flight();
// ===================
//hack PLAYER CAPABILITIES
// ===================

PLAYER_ACTIONS.add({
  name: "Fear",
  outcome: BATTLETREE.WIN,
  unlock: true,
  description: ["You cower away in fear of the unknown. Who knows what kind of dark power could lurk under this rubble?",],
});

PLAYER_ACTIONS.add({
  name: "Pray",
  outcome: BATTLETREE.WIN,
  unlock: true,
  description: ["In your mind, you ask the Goddess what this is.",
                "It is an old military base that belonged to an ancient people far more advanced than you can imagine. It got destroyed when the armies of $$demon_lord$ took over the world.",
                "You shiver thinking about how powerful the demons must be, for these powerful relics to not have been enough to stop them."],
});

PLAYER_ACTIONS.add({
  name: "Ponder",
  outcome: BATTLETREE.WIN,
  unlock: true,
  description: ["Faced with these remains of unimaginable artifacts, you ponder the gap that separates you from the ancient civilization that left them.",
                "You feel like these ruins are a way for the Goddess to demonstrate how much time has passed, and how developed this ancient civilization was. You wonder if She guided you here on purpose.",
              ],
});

PLAYER_ACTIONS.add({
  name: "Explore",
  outcome: BATTLETREE.WIN,
  unlock: true,
  description: ["You navigate through the metallic rubbles, in search for anything that could be of use to you. Maybe this place holds the secret to defeating $$demon_lord$.",
                "Sadly, you only find piles of metallic junk. You decide to take some ANCIENT RUBBLES away with you, it might fetch a good price.",
              ],
  extra_function: function(){
    INVENTORY.increase(ITEM.AncientRubbles);
  }
});


PLAYER_ACTIONS.add({
  name: "Scavenge",
  outcome: BATTLETREE.WIN,
  unlock: true,
  description: ["You scavenge the metallic rubbles, in search of anything of value.",
                "But after looking for a while, you conclude that time destroyed whatever could have been of use here, and decide to move on.",
              ],
});


// ===================
//hack START
// ===================

BATTLE.operations.start(BESTIARY.intro("encounters/ruins"));
