
LEVEL.start_function = function() {
  TextBannerSequence.make([
    "Although for now, the Promised Child, unaware of the fate that awaited, was simply playing hide and seek in the outskirts of town.",
    "Ren: \"... 97\"",
    "Ren: \"... 98\"",
    "Ren: \"... 99\"",
    "Ren: \"... 100! Ready or not, here I come!\"",
  ], function(){ SAVE.autosave(); IO.control.character(); });
};
LEVEL.initialize_with_character(150, 300);


var CHILDREN_FOUND = {};

var child_in_tree = function (x, y, name, child, dialog) {
  child.interaction = function() {
     CHILDREN_FOUND[name] = true;
     dialog.progress();
   };
  (new S_Tree(x,y)).hide_in(child);
}

var make_priest = function (x, y) {
  var priest = new M_Priest(x,y);
  priest.interaction = function() {
    TextBannerSequence.make([
      "Priest: \"Thank you for coming, Second Born. Your trial is about to begin.\"",
      "Priest: \"Please come with us to the temple for further instructions.\"",
    ], function(){ LEVEL.setup("002_trialinstruction"); });
   };
  priest.try_walk_by(-50, 60);
}

new S_Floor(50,550,1000,500);

new S_Tree(110,270);
new S_Tree(135,470);

child_in_tree(150, 130, "cff1", new M_ChildF(),
  new TextBannerProgressive([
    "You found $$child_friends_f1$!",
    "$$child_friends_f1$: \"You're really good\"",
    "$$child_friends_f1$: \"But I won't let you win this afternoon. I'm gonna be chosen. Don't expect me to hold back because we're friends!\""
]));

new S_Tree(240,380);

child_in_tree(265, 500, "cfm2", new M_ChildM(), new TextBannerProgressive([
    "It was not easy, but you finally spotted $$child_friends_m2$!",
    "$$child_friends_m2$: \"Hmpf\""
]));

new S_Tree(290,160);
new S_Tree(370,420);

child_in_tree(400, 250, "cfm1", new M_ChildM(), new TextBannerProgressive([
    "You found $$child_friends_m1$!",
    "$$child_friends_m1$: \"Damn, I really thought I had a good spot this time...\"",
    "$$child_friends_m1$: \"I'm sure I'll do better next time!\"",
    "$$child_friends_m1$: \"I mean, if we're both still there, of course. Are you scared about today?\""
]));

new S_Tree(470,300);
new S_Tree(480,495);
new S_Tree(550,100);
new S_Tree(560,460);

child_in_tree(620, 280, "cfbf", new M_ChildF(), new TextBannerProgressive([
    "You found your best friend $$sidekick_name$!",
    "$$sidekick_name$: \"I knew you'd find me Ren!\"",
    "$$sidekick_name$: \"Good luck for this afternoon, I'm sure you'll do great!\""
]));

new S_Tree(645,190);
new S_Tree(730,400);
new S_Tree(735,150);

child_in_tree(790, 490, "cff2", new M_ChildF(),
  new TextBannerProgressive([
    "You found $$child_friends_f2$! It wasn't too hard, she's really bad at hiding. She can't stay too long without moving.",
    "$$child_friends_f2$: \"Finally, I was dying over there!\"",
    "$$child_friends_f2$: \"Well not dying, sorry, that's not what I meant...\"",
    "$$child_friends_f2$: \"Sorry...\"",
    "$$child_friends_f2$: \"I hope you make it, though...\"",
    "$$child_friends_f2$: \"Sorry...\"",
]));

new S_Tree(800,250);
new S_Tree(895,260);

child_in_tree(930, 460, "cfm3", new M_ChildM(),
  new TextBannerProgressive([
    "You found $$child_friends_m3$!",
    "$$child_friends_m3$: \"Well done...\"",
    "$$child_friends_m3$: \"Are you ready? It's about time!\"",
]));

new S_Tree(950,185);



var foundAll = function() { return Object.keys(CHILDREN_FOUND).length == 6; };
LEVEL.add_trigger("foundAllChildren", foundAll, function() {
  make_priest(1030,300);
  make_priest(1030,250);
  make_priest(1030,350);

  TextBannerSequence.make([
    "Priest: \"The time has come. Candidates for the Trial of the Second-Borns, please do follow us.\"",
    "$$sidekick_name$: \"Good luck! Please be safe and come back!\"",
  ], function(){ IO.control.character(); });
});
