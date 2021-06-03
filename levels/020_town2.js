new Snippet("levels/decors/town2");

CURRENTLEVEL.start_function = function() {
  TextBannerSequence.make([
    `You arrive at $$town_2$. The metropolis is bigger than anything you've ever known, leaving $$BestFriend$ looking around, pretty impressed.`,
    `$$BestFriend$: "Wow... This is nothing like $$town_1$!"`,
    `More than the size of the town, what really strikes you is its condition. Most buildings in $$town_1$, without being outright ruins, were displaying clearly the mark of time passing. Patches and repairs over the years made any building's appearance somewhat chaotic. Not here, though. All houses, without exception, are in pristine condition, as if they had just been freshly built. The stones have been bleached or painted to an immaculate white, turning the city into a shimmering sea that almost blinds you under the day's sun.`,
    `Something else feels peculiar, but you can't put your finger on it until $$BestFriend$ articulates it for you.`,
    `$$BestFriend$: "This city is so big, but it's weird, there's almost nobody in the streets..."`,
    `Indeed, the place looks like a ghost town. Not only are passerby pretty rare, there is also none of the usual signs of life you'd expect on the roads: trails, mud, steps, the occasional lost item... It looks as if nobody ever steps foot outside.`,
    `This only makes the ambient silence weigh even more. You would almost consider this town abandonned if it weren't for its impeccable maintenance and the occasional glance you exchange with inhabitants peeking at you from their homes, protecte behind heavy curtains.`,
    `$$Ren$: "You're right, this is a weird place..."`,
    `$$BestFriend$: "I don't really like it..."`,
    `$$Ren$: "We don't have to stay long... Let's head for the church and see what kind of training they have for me!"`,
  ], IO.control.character);
};

CURRENTLEVEL.initialize_with_character(750, 1550);
