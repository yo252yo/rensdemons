
var c = new CenteredImage("assets/objects/heaven/bookshelf.png", 'background');
c.adjust_dimensions(c.width * 2, c.height * 2);

PLAYER_ACTIONS.allow_flight(true);


var unlock_begin = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Read the beginning",
  unlock: true,
  outcome: BATTLETREE.NOTHING,
  description: ["Opening the book that bears your name, you're surprised to find that it doesn't start at your birth. It starts on the day you passed the trial to be acknowledge as the Promised Child. You sigh at the pompous introduction that places your little life in the context of the history of the world:",
                `"During thousands of years, the kingdom of $$world_name$ had enjoyed peace and prosperity. Of course monarchs fell and rose, and the occasional war broke out, but not much truly threatened the life of its inhabitants..."`
                ],
});

var unlock_end = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Read the end",
  unlock: true,
  outcome: BATTLETREE.NOTHING,
  description: ["You start to read the book by the end. You discover with surprise that it describes precisely events that have not happened yet: in it, you do save the world, and come back to $$world_name$ where you're heralded as a hero. You become a ruler and lead your kingdom to prosperity in the memory of $$BestFriend$.",
                "However, these events are only be described very succinctly. Most of the book is focused on your adventure...",
                ],
});

var unlock_solution = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Read what to do",
  unlock: true,
  description: [`You read intently as the book explains how you will act. It seems that your reading will teach you the path to the Goddess through this foggy labyrinth.`,
                `The correct path was apparently drawn according to a ritual from another world. It goes: up, up, down, down, left, right, left, right.`,
                ],
});


var unlock_bookshelf = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Read about now",
  unlock: true,
  outcome: BATTLETREE.NOTHING,
  description: [`Below the picture, the words are describing your current situation.`,
                `"$$Ren$ looks closer at one of the mysterious bookshelves."`,
                `It goes into details about how you first skimmed through the book, and then read this very part. The uncanniness makes your head hurt. But the really interesting part is what comes next.`,
                `Indeed, after describing your tribulations in Heaven, it narrates how you will find your way and encounter the Goddess.`,
                ],
  function: unlock_solution,
});


var unlock_browse = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Browse",
  unlock: true,
  description: ["You skim through the massive book. Sections of it seem to be written with runes you do not understand. Every now and then, it is punctuated by beautiful illustrations drawn in ink. You recognize with emotion places and people you've come across on your journey.",
                "Near the end of the tome, a picture catches your gaze. It is the bookshelf you're standing in front of."
                ],
  function: unlock_bookshelf,
});



PLAYER_ACTIONS.add({
  name: "Read about you",
  unlock: true,
  description: "The tome is pretty massive, where are you going to start?",
  function: function() {
    unlock_begin("Read about you");
    unlock_browse("Read about you");
    unlock_end("Read about you");
  },
});

BATTLE.operations.start(`You look closer at one of the mysterious bookshelves. You're surprised to find that you can read most of the book titles. The majority appears to be names. One of them draws your attention: near the top, a golden bound volume is titled "$$Ren$, the Promised Child".`);
