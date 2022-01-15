
// ===================
//hack 0. INITIALIZATION
//hack 1. FLOORS
//hack 2. EXIT
//hack 3. PERMANENT HARDCODED ELEMENTS (furniture)
//hack 4. PERMANENT FILLER ELEMENTS (decoration)
// ===================

new Snippet("levels/decors/town3");

// ===================
//hack 7. START/INIT
// ===================
CURRENTLEVEL.setup_text_start_function([
  `As you arrive in the town of $$town_3$, you are relieved to see a peaceful little city where life seems to be going on normally.`,
  `$$BestFriend$: "So this is the last bastion of human forces?"`,
  `$$Ren$: "It seems so. Anything wrong?"`,
  `$$BestFriend$: "Nothing, I just expected it to be more... militaristic? alert, maybe? I don't know... It seems too quiet..."`,
  `$$Ren$: "Maybe it's because they are so powerful that they can keep the demons at bay and be in peace!"`,
  `$$BestFriend$: "It would be nice... If that's true, we have a lot to learn from them. Let's resupply here before we head southeast for the Maw of Hell..."`,
]);

CURRENTLEVEL.initialize_with_character(1100, 1100);
