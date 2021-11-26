
var c = new CenteredImage("assets/objects/heaven/bookshelf.png", 'background');
c.adjust_dimensions(c.width * 2, c.height * 2);

PLAYER_ACTIONS.allow_flight(true);


// ===================
//hack Primordial deities
// ===================

var unlock_mirror = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Identity",
  unlock: true,
  description: [
                  `You read what you can from the damaged page.`,
                  `"For Primordial Deities, vision was the most important sense, and therefore the eyes had a strong symbolic importance."`,
                  `...`,
                  `"It was widely admitted that identity was constructed in contrast from the gaze of other people, and even oneself."`,
                  `...`,
                  `"Therefore, the child, when facing a mirror, becomes for the first time aware that they are not just a floating point of view but a complete body. They become aware of the whole of their selves: a dual system of mind and body. This mirror stage is paramount to the development of a person."`,
                  `...`,
                  `"In conclusion, to see oneself whole and understand the full relationship between the self and its environment, it is necessary to turn inwards."`,
                  `"ONE MUST FOLLOW THE PATH OF THE MIRROR."`,
                ],

});


var unlock_code = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Communication",
  unlock: true,
  description: [
                `You read what you can from the damaged page.`,
                `"Primordial Deities developed technology to the point where they could create other beings out of metal - the machines."`,
                `"The machines understood only binary signal: 1 or UP for when the power was flowing, and 0 or DOWN for when it was not."`,
                `"Therefore, in order to communicate with the machines, the Primordial Deities had to devise systems to encode their language in one that would be understandable by the machines."`,
                `"The most popular code is as follows:"`,
                `"A = number 65, in binary 01000001<br /> B = number 66, in binary 01000010<br /> C = number 67, in binary 01000011"`,
                `...`,
                `"Alphabet only starts at the number 65 to keep lower numbers for special characters."`,
                `"! = number 33, in binary 00100001<br />...<br /> ? = number 63, in binary 00111111"`,
                `"Some positions were kept for important signals."`,
                `"START_OF_TEXT = number 2, in binary 00000010<br /> CANCEL = number 24, in binary 00011000"`,
                `"END_OF_TRANSMISSION = number 4, in binary 00000100"`,
                ],
});


if(STATS.flag("PrimordialDeities")){
  PLAYER_ACTIONS.add({
    name: "Primordial Deities",
    unlock: true,
    description: "You search through the books to see if anyone looks like it might have information about the Primordial Deities. You find an old tome that seems promising. It does not have a title. Instead, the cover is full of mysterious symbols. When you open it, some pages are so worn off that they are unreadable, others are torn, but it looks like some parts are still usable...",
    function: function() {
      unlock_mirror("Primordial Deities");
      unlock_code("Primordial Deities");
    },
  });
}


// ===================
//hack Godess path
// ===================

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
