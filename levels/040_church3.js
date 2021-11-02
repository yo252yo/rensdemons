// ===================
//hack 0. INITIALIZATION
//hack 1. FLOORS
//hack 2. EXIT
//hack 3. PERMANENT HARDCODED ELEMENTS (furniture)
// ===================
new Snippet("levels/decors/temple");

var f = new S_ExitFloor(1250,1775,100,35, '040_town3');
new S_StainedGlass(1075, 1050, 'church');
new S_StainedGlass(1275, 1050, 'denial');
new S_StainedGlass(1475, 1050, 'church');



var priest = new M_Priest(1250, 1650);
priest.interaction = function() {
  this.face_character();

TextBannerSequence.make([
    "$$Ren$: \"Hello, sir. I am the Promised Child. I have come here in hope to train, learn, and acquire weapons and techniques to help me in the final assault against $$demon_lord$.\"",
    "Priest: \"$$demon_lord$? I don't know what you mean... It's certainly our pleasure to welcome an envoy of the Goddess, although I have no idea why you would come to our wonderful town.\"",
    "You and $$BestFriend$ look at him, puzzled. The priest shares your incomprehension.",
    "$$Ren$: \"I'm headed to the Maw of Hell to stop the demon armies from ravaging the country.\"",
    "The priest stares in disbelief for a while, but then his face illuminates.",
    "Priest: \"Oooh I see! You kids have an amazing imagination! Well have fun on your quest! You can certainly train with our masters! This unprecedented era of peace allowed them to perfect their craft, I'm sure you'll learn a lot!\"",
    "The priest winks at you. You exchange a worried glance with your best friend. You come to the unspoken understanding that it's better not to insist.",
    "$$BestFriend$: \"Thank you, sir.\"",
    "It looks like the help you can get in $$town_3$ is limited. You'll have to figure out the way to the Maw of Hell on your own. It shouldn't be too far from here, in the south east...",
  ]);
};


new M_Trainer(1500, 1500, 0, ABILITIES_ARCHETYPES_NAMES.Element, 2000);
new M_Trainer(1500, 1350, 0, ABILITIES_ARCHETYPES_NAMES.Spirit, 100000);
new M_Trainer(1500, 1200, 0, ABILITIES_ARCHETYPES_NAMES.Diplomat, 2000);

// ===================
//hack 7. START/INIT
// ===================

CURRENTLEVEL.initialize_with_character(1275, 1750);
