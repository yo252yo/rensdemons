// ===================
// =================== INITIALIZATION
// ===================
new CenteredMovingBattleImage("assets/characters/child_m.png", 'background',32,48, 2);

PLAYER_ACTIONS.escape();
PLAYER_ACTIONS.escape("Avert eyes");
PLAYER_ACTIONS.escape("Enter denial");
PLAYER_ACTIONS.escape("Go look for help");

STATS.record.flag("SeenMichaelCorpse");

var look = "Look";
var approach = "Approach";
var listen = "Listen";
var examine = "Examine wounds";
var pray = "Pray";
var cryforhelp = "Cry for help";
var lie = "Lie";
var telltruth = "Tell the truth";
var accept = "Listen to his request";


var unlock_euthanasia = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "End his suffering",
  unlock: true,
  outcome: BATTLETREE.WIN,
  description: ["You try to not think too much about what you're doing. You close your eyes, take a deep breath, and cover his face with the fabric of his shirt.",
                "The seconds that follow seem like an eternity. The convulsions of the young boy's body never seem to end. But you never let go, even though your body shakes from sobbing.",
                "And then, finally, they do."],
});

var unlock_goodbye = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Say goodbye",
  unlock: true,
  outcome: BATTLETREE.NOTHING,
  description: ["$$Ren$: \"Not without sending you off.\"",
                "Warm tears start running down your face. It seems so long ago that you both were joking together about the trial. A distant memory in a different world. You knew that not everyone made it through the Trial. But in a much more real way, you had no idea... You curse the world that lead you to this.",
                "$$Ren$: \"Goodbye, $$child_friends_m1$. You did not deserve this. I will always remember you...\""],
});

var unlock_refuse = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Refuse his request",
  unlock: true,
  outcome: BATTLETREE.NOTHING,
  description: "You refuse to listen to $$child_friends_m1$. Surely there is something else that you can do.",
});

var unlock_accept = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: accept,
  unlock: true,
  description: ["$$Ren$: \"Anything you want.\"",
                "$$child_friends_m1$: \"Please... It hurts... so much... I want it to stop... I don't want to go slow and painfully... Please, make it stop...\""],
  function: function() {
    unlock_euthanasia(accept);
    unlock_goodbye(accept);
    PLAYER_ACTIONS.escape("Back away");
  },
});

var unlock_telltruth = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: telltruth,
  unlock: true,
  description: ["$$Ren$: \"It doesn't look good, buddy. I think this might be it...\"",
                "You expected him to be angry, but instead you can see acceptance in his eyes.",
                "$$child_friends_m1$: \"I... I see... I knew it... Thanks...\"",
                "His voice is peaceful, but his face is distorted by pain.",
                "$$child_friends_m1$: \"Can I... ask you a favor?\"",
                "A bad feeling sends a cold shiver down your spine.",
              ],
  function: function() {
    unlock_refuse(telltruth);
    unlock_accept(telltruth);
  },
});

var unlock_lie = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: lie,
  unlock: true,
  description: ["$$Ren$: \"Don't worry. It's gonna be okay. I'll find a way to help you.\"",
                "But you can see in his eyes that he doesn't believe you.",
                "$$child_friends_m1$: \"It hurts... So much... Please, do something... \""
                ],
  function: function() {
    unlock_euthanasia(lie);
    PLAYER_ACTIONS.escape("Back away");
  },
});

var unlock_listen = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: listen,
  unlock: true,
  description: ["$$Ren$: \"I'm here! $$child_friends_m1$! Are you okay?\"",
                "$$child_friends_m1$: \"Of course not! Everything hurts... I... can't see... tell me... how is it?\""],
  function: function() {
    unlock_lie(listen);
    unlock_telltruth(listen);
  },
});

var unlock_pray = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: pray,
  unlock: true,
  outcome: BATTLETREE.NOTHING,
  description: ["If the people can do such horrible things, surely the Goddess, in her Almighty glory, is better than that.",
                "You close your eyes and repeat prayers, hoping for a miracle.",
                "But nothing happens. Long minutes pass without anything but the groans of pain of the dying child."],
});

var unlock_cryforhelp = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: cryforhelp,
  unlock: true,
  description: ["You scream at the top of your lungs. Someone, anyone, come and help! How can adults just let this happen? How can they sacrifice this child, and so many others before him?",
                "But the only people who could help are the ones who caused this in the first place. Your calls remain unanswered."],
  function: unlock_pray,
});

var unlock_puke = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Puke",
  unlock: true,
  outcome: BATTLETREE.NOTHING,
  description: "In the face of this gruesome spectacle, you cannot help but empty the content of your stomach on a wall.",
});

var unlock_stopbleeding = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Stop the bleeding",
  unlock: true,
  outcome: BATTLETREE.NOTHING,
  description: ["You press your hands on your friend's body to try and stop the bleeding. His flesh trembles under your skin. He has never seemed so frail. And cold.",
                "Your hands are too small to cover his wounds. Soon, they're bathed in the warm red liquid. What you're doing is pretty useless."],
});

var unlock_examine = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: examine,
  unlock: true,
  description: ["You take a closer look at the wounds of your friend.",
                "You try hard to fight nausea. You've never seen so much blood before. So much blood.",
                "You can quickly tell that the Basilisk chewed off a huge fraction of the poor boy's abdomen. Things look pretty bleak."],
  function: function() {
    unlock_cryforhelp(examine);
    unlock_stopbleeding(examine);
    unlock_puke(examine);
  },
});

var unlock_approach = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: approach,
  unlock: true,
  description: ["You get closer to $$child_friends_m1$.",
                "You can hear his irregular heavy breathing. You can barely make out a hoarse whisper.",
                "$$child_friends_m1$: \"$$Ren$... $$Ren$? Is that you?\""],
  function: function() {
    unlock_listen(approach);
    unlock_examine(approach);
  },
});

PLAYER_ACTIONS.add({
  name: look,
  unlock: true,
  description: ["You look at what remains of $$child_friends_m1$.",
                "The poor child has been mauled by the beastly creature. He lies in the middle of a pool of blood. You hear a growl coming from his direction. Maybe... Maybe he's not quite dead."],
  function: unlock_approach,
});

// ===================
// =================== START
// ===================
BATTLE.operations.start("You find on the ground the remains of $$child_friends_m1$. It's obviously in a pretty bad shape, the Basilisk really did a number on him.");
