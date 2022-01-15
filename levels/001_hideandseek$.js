
// ===================
//hack 0. INITIALIZATION
// ===================

AUDIO.music.levels.hideandseek();


// ===================
//hack 1. FLOORS
// ===================

new S_MudFloor(1050,1400,600,350);

// ===================
//hack 3. PERMANENT HARDCODED ELEMENTS (furniture)
// ===================

var CHILDREN_FOUND = {};

var child_in_tree = function (x, y, name, child, dialog) {
  child.interaction = function() {
    this.face_character();
     CHILDREN_FOUND[name] = true;
     dialog.progress();
   };
  (new S_Tree(x,y)).hide_in(child);
}

var make_priest = function (x, y) {
  var priest = new M_Priest(x,y, CITIES.hope);
  priest.interaction = function() {
    this.face_character();
    TextBannerSequence.make([
      "Priest: \"Thank you for coming, Second Born. Your trial is about to begin.\"",
      "Priest: \"Please come with us to the temple for further instructions.\"",
    ], function(){ CURRENTLEVEL.setup("002_trialinstruction$"); });
   };
  priest.try_walk_by(-50, 60);
}

new S_Tree(1110,1270);

child_in_tree(1150, 1130, "cff1", new M_ChildF(-1,-1, DICTIONARY.get("child_friends_f1"), CITIES.hope),
  new TextBannerProgressive([
    "You found $$child_friends_f1$!",
    "$$child_friends_f1$: \"You're really good\"",
    "$$child_friends_f1$: \"But I won't let you win this afternoon. I'm gonna be chosen. Don't expect me to hold back because we're friends!\""
]));

new S_Tree(1240,1380);

new S_Tree(1290,1160);

child_in_tree(1400, 1250, "cfm1", new M_ChildM(-1,-1, DICTIONARY.get("child_friends_m1"), CITIES.hope), new TextBannerProgressive([
    "You found $$child_friends_m1$!",
    "$$child_friends_m1$: \"Damn, I really thought I had a good spot this time...\"",
    "$$child_friends_m1$: \"I'm sure I'll do better next time!\"",
    "$$child_friends_m1$: \"I mean, if we're both still there, of course. Are you scared about today?\""
]));

new S_Tree(1470,1300);
new S_Tree(1550,1100);

child_in_tree(1420, 1120, "cfbf", new M_BestFriend(-1,-1), new TextBannerProgressive([
    "You found your best friend, $$BestFriend$!",
    function(){  PARTY.changeNickname(PARTYMEMBERS.BestFriend); },
    "$$BestFriend$: \"I knew you'd find me $$Ren$!\"",
    "$$BestFriend$: \"Good luck for this afternoon, I'm sure you'll do great!\""
]));

child_in_tree(1370,1380, "cff2", new M_ChildF(-1,-1, DICTIONARY.get("child_friends_f2"), CITIES.hope),
  new TextBannerProgressive([
    "You found $$child_friends_f2$! It wasn't too hard, she's really bad at hiding. She can't stay too long without moving.",
    "$$child_friends_f2$: \"Finally, I was dying over there!\"",
    "$$child_friends_f2$: \"Well not dying, sorry, that's not what I meant...\"",
    "$$child_friends_f2$: \"Sorry...\"",
    "$$child_friends_f2$: \"I hope you make it, though...\"",
    "$$child_friends_f2$: \"Sorry...\"",
]));

child_in_tree(1250, 1280, "cfm3", new M_PreciousChild(-1,-1),
  new TextBannerProgressive([
    "You found $$PreciousChild$!",
    function(){  PARTY.changeNickname(PARTYMEMBERS.PreciousChild); },
    "$$PreciousChild$: \"Well done... You're so good at hide and seek, $$Ren$!\"",
    "$$PreciousChild$: \"Are you ready? It's about time! Good luck!\"",
]));


var foundAll = function() { return Object.keys(CHILDREN_FOUND).length == 5; };

CURRENTLEVEL.add_trigger("foundAllChildren", foundAll, function() {
  make_priest(1630,1200);
  make_priest(1630,1150);
  make_priest(1630,1250);

  TextBannerSequence.make([
    "Priest: \"The time has come. Candidates for the Trial of the Second-Borns, please do follow us.\"",
    "$$BestFriend$: \"Good luck! Please be safe and come back!\"",
  ], function(){ IO.control.character(); });
});


// ===================
//hack 7. START/INIT
// ===================
var callback = function(){
  PARTY.changeNickname(PARTYMEMBERS.Ren);
  TextBannerSequence.make([
    "$$Ren$: \"... 97\"",
    "$$Ren$: \"... 98\"",
    "$$Ren$: \"... 99\"",
    "$$Ren$: \"... 100! Ready or not, here I come!\"",
  ], function(){ IO.control.character(); });
};

CURRENTLEVEL.setup_text_start_function([
  "Although for now, the Promised Child, unaware of the fate that awaited, is simply playing hide and seek in the outskirts of town.",
], callback);

CURRENTLEVEL.initialize_with_character(1150, 1300);
