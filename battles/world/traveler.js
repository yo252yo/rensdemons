// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/objects/exterior/traveler.png", 'background');

// ===================
//hack PLAYER CAPABILITIES
// ===================

// It may be luck, or the Goddess guiding your intuition, but you react very quickly and manage to kill the monsters before it gets to you.
PLAYER_ACTIONS.add({
  name: "Pray",
  outcome: BATTLETREE.WIN,
  unlock: true,
  description: ["The Goddess gives you the vague feeling that it's better to not get too close. You accept her divine advice and renounce the encounter."],
});

PLAYER_ACTIONS.add({
  name: "Kill",
  outcome: BATTLETREE.WIN,
  unlock: true,
  description: ["Moved by an insight from the Goddess, you decide to strike first and jump on the poor traveler. Before they can do anything, you already took their life.",
                "$$BestFriend$ looks at you in shock and disbelief. No amount of explaining can justify your murder of an innocent bypasser."],
});

PLAYER_ACTIONS.add({
  name: ABILITY.Escape,
  outcome: BATTLETREE.WIN,
  unlock: true,
  description: ["Moved by your intuition, you decide to go in the opposite direction. After all, not much good can happen from an encounter in these wild regions. You're sure the traveler thinks the same way."],
});

PLAYER_ACTIONS.add({
  name: "Greet",
  outcome: BATTLETREE.LOSS,
  unlock: true,
  description: ["You warmly greet your fellow traveler. As he gets close, his face starts to deform, and soon his whole appearance shifts into the features of a shapeshifting demon.",
                "You barely have time to scream before the sharp fangs are ripping through your flesh."],
});

PLAYER_ACTIONS.add({
  name: "Rob",
  outcome: BATTLETREE.LOSS,
  unlock: true,
  description: ["You decide that your needs certainly outweigh this poor soul's. Reluctantly, you set about asking him to give you whatever he can spare for your quest.",
                "As only answer, the traveler who seemed human a second ago transforms into a hideous monster and devour you whole."],
});


PLAYER_ACTIONS.add({
  name: "Help",
  outcome: BATTLETREE.LOSS,
  unlock: true,
  description: ["You get close to the traveler in hope of helping them. You ask if they need anything.",
                "They do not answer. You insist, but the person standing in front of you turned into a demon assaulting you. You do not have time to react."],
});

// ===================
//hack START
// ===================

BATTLE.operations.start("You cross the path of another weary traveler.");
