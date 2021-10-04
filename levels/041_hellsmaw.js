// ===================
//hack 0. INITIALIZATION
//hack 1. FLOORS
//hack 2. EXIT
//hack 3. PERMANENT HARDCODED ELEMENTS (furniture)
//hack 4. PERMANENT FILLER ELEMENTS (decoration)
//hack 5. DESTRUCTIBLE HARDCODED ELEMENTS (bosses, etc...)
//hack 6. DESTRUCTIBLE FILLER ELEMENTS (encounters)
// ===================

hellsmawpart = 1;
new Snippet("levels/decors/hellsmaw");


// ===================
//hack 7. START/INIT
// ===================

CURRENTLEVEL.start_function = function() {
  TextBannerSequence.make([
    `You arrive at the foot of a mountain chain. The rock is black and rises steeply in contrast to the surrounding meadow, as if some sort of massive otherworldly spike perforated the ground. Every now and then, you can hear an ominous rumbling in the distance. The smell of sulfur overwhelms you and makes it hard to breathe. From the summit, a thick grey fog runs down the slopes and makes it impossible to see what lies ahead of you..."`,
    `$$BestFriend$: "So this is it, this is $$demon_lord$'s hideout?"`,
    `$$Ren$: "I think so... This is the heart of enemy territory! Let's be extra careful, it must be swarming with demons..."`,
    `Next to you, an old worn out altar stands as the last stand of civilization.`,
    `The track you can climb is thin and unreliable. Pretty soon, it forks into different paths shrouded in fog that crawl up the sharp facade. You pray that the Goddess leads you to the right one...`,
  ], IO.control.character);
};

CURRENTLEVEL.initialize_with_character(2000, 2500);
