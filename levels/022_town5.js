
// ===================
//hack 0. INITIALIZATION
//hack 2. PERMANENT HARDCODED ELEMENTS (furniture)
//hack 3. PERMANENT FILLER ELEMENTS (decoration)
// ===================

new Snippet("levels/decors/town5");

// ===================
//hack 6. START/INIT
// ===================
CURRENTLEVEL.start_function = function() {
  TextBannerSequence.make([
  `The atmosphere of $$town_5$ is eerily calm. It's nothing like the oppressive, watchful silence from $$town_2$. There are people in the streets, life is going on. But it seems to be moving at a slower pace. People are sluggish, their faces are inexpressive. Nobody is making any sound.`,
  `$$BestFriend$: "It's almost like a town full of ghosts..."`,
  `By chance or by fate, you arrive at a time where the morning sky is covered in clouds, adding to the ambient morosity. Though the washed out grey stone of the building hints that the weather is not often sunny here. It seems like a cold wind is running through the streets. Or is it your imagination?`,
  `$$Ren$: "Let's go!"`,
  ], IO.control.character);
};

CURRENTLEVEL.initialize_with_character(1100, 1100);
