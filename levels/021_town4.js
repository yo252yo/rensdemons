
// ===================
//hack 0. INITIALIZATION
//hack 1. FLOORS -> EXITS
//hack 2. PERMANENT HARDCODED ELEMENTS (furniture)
//hack 3. PERMANENT FILLER ELEMENTS (decoration)
// ===================

new Snippet("levels/decors/town4");

// ===================
//hack 6. START/INIT
// ===================
CURRENTLEVEL.start_function = function() {
  TextBannerSequence.make([
    `As you enter $$town_4$, you're immediately assaulted by a flood of sensations. The streets are filled with people, in spite of the late hour. They are bathed in the lights of colorful lanterns hung at the facade of the houses. The building themselves are pretty colorful too, though no care was given to the paint job which looks obviously rushed, unfinished, and very uneven between different walls. A complete lack of coordination makes for a true chaos of hues.`,
    `The passerbys are chatting loudly, laughing, dancing... Everywhere you turn, you see happy faces. You can hear music coming out of different houses, sometimes dulled down by the walls, other times straight through open doors and windows, resulting in a complete cacophony. Smells are spreading too, and your stomach is excited by the aromas of delicious meals or fruity drinks that surround you.`,
    `$$BestFriend$: "Maybe today is a festival..."`,
    `A nearby stranger, hearing these words, came towards you.`,
    `Stranger: "You must be new to $$town_4$! It's my great pleasure to welcome you, my friends! Make yourselves at home! Yes, today is special! Every day is! That's how we live, here! We make the most out of life! Because we know that it might end any second. You look a bit young, but you need a welcome gift!"`,
    `The stranger gives you cups of a beverage whose strong scent betrayed a powerful intoxicating content.`,
    `Stranger: "It's a local specialty! Anyway, I'm off doing my things, but by all means, enjoy our beautiful town! This is the best place in the world! The town that never sleeps!"`,
    `He walks away, staggering slightly.`,
    `$$BestFriend$: "If nothing more, this place looks very friendly! Should we have a look around?"`,
  ], IO.control.character);
};

CURRENTLEVEL.initialize_with_character(1100, 1100);
