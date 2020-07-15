// ===================
// =================== INITIALIZATION
// ===================
new CenteredImage("assets/battles/child_m.png", 'background');

var escape_function = function(name){
  PLAYER_ACTIONS.add.escape({
    name: name,
    description: [],
    effect: "You move away from the scene, it's just too much for you to handle.",
  });
  BATTLETREE.unlock(BATTLE.get_current_battle(), name);
}

escape_function("Run away");
escape_function("Avert eyes");
escape_function("Enter denial");
escape_function("Go look for help");


var look = "Look";
var approach = "Approach";
var listen = "Listen";
var examine = "Examine wounds";
/*
var unlock_ = function() {
  //BATTLETREE.unlock(BATTLE.get_current_battle(), to_action, from_action);
  PLAYER_ACTIONS.add.unlocked_action({
    name: approach,
    description: [""],
    function: function() {
      //approach();
    },
  });
};*/

var unlock_telltruth = function(from) {
  var action = "Tell the truth";
  PLAYER_ACTIONS.add.replace(from, action);
  PLAYER_ACTIONS.add.unlocked_action({
    name: action,
    description: ["Ren: \"It doesn't look good, buddy. I think this might be it...\"",
                  ],
    function: function() { BATTLE.player_actions.remove(action); },
    // NEEDMORE
  });
};

var unlock_lie = function(from) {
  var action = "Lie";
  PLAYER_ACTIONS.add.replace(from, action);
  PLAYER_ACTIONS.add.unlocked_action({
    name: action,
    description: ["Ren: \"Don't worry. It's gonna be okay. I'll find a way to help you.\"",
                  "But you can see in his eyes that he doesn't believe you."
                  ],
    function: function() { BATTLE.player_actions.remove(action); },
    // NEEDMORE
  });
};

var unlock_listen = function(from) {
  PLAYER_ACTIONS.add.replace(from, listen);
  PLAYER_ACTIONS.add.unlocked_action({
    name: listen,
    description: ["Ren: \"I'm here! $$child_friends_m1$! Are you okay?\"",
                  "$$child_friends_m1$: \"Of course not! Everything hurts... I... can't see... tell me... how is it?\""],
    function: function() {
      unlock_lie(listen);
      unlock_telltruth(listen);
    },
  });
};

var unlock_pray = function(from) {
  var action = "Pray";
  PLAYER_ACTIONS.add.replace(from, action);
  PLAYER_ACTIONS.add.unlocked_action({
    name: action,
    description: ["If the people can do such horrible things, surely the Goddess, in her Allmighty glory, is better than that.",
                  "You close your eyes and repeat prayers, hoping for a miracle.",
                  "But nothing happens. Long minutes pass without anything but the groans of pain of the dying child."],
    function: function() { BATTLE.player_actions.remove(action); },
  });
};

var unlock_cryforhelp = function(from) {
  var action = "Cry for help";
  PLAYER_ACTIONS.add.replace(from, action);
  PLAYER_ACTIONS.add.unlocked_action({
    name: action,
    description: ["You scream at the top of your lungs. Someone, anyone, come and help! How can adults just let this happen? How can they sacrifice this child, and so many others before him?",
                  "But the only people who could help are the ones who caused this in the first place. Your calls remain unanswered."],
    function: function() {  unlock_pray(action); },
  });
};

var unlock_puke = function(from) {
  PLAYER_ACTIONS.add.throwaway_action(
    from, "Puke",
    ["In the face of this gruesome spectacle, you cannot help but empty the content of your stomach on a wall."]);
};

var unlock_stopbleeding = function(from) {
  PLAYER_ACTIONS.add.throwaway_action(
    from, "Stop the bleeding",
    ["You press your hands on your friend's body to try and stop the bleeding. His flesh trembles under your skin. He has never seemed so frail. And cold.",
     "Your hands are too small to cover his wounds. Soon, they're bathed in the warm red liquid. What you're doing is pretty useless."]);
};

var unlock_examine = function(from) {
  PLAYER_ACTIONS.add.replace(from, examine);
  PLAYER_ACTIONS.add.unlocked_action({
    name: examine,
    description: ["You take a closer look at the wounds of your friend.",
                  "You try hard to fight nausea. You've never seen so much blood before. So much blood.",
                  "You can quickly tell that the Basilisk chewed off a huge fraction of the poor boy's abdomen. Things look pretty bleak."],
    function: function() {
      unlock_cryforhelp(examine);
      unlock_stopbleeding(examine);
      unlock_puke(examine);
    },
  });
};

var unlock_approach = function() {
  PLAYER_ACTIONS.add.replace(look, approach);
  PLAYER_ACTIONS.add.unlocked_action({
    name: approach,
    description: ["You get closer to $$child_friends_m1$.",
                  "You can hear his irregular heavy breathing. You can barely make out a hoarse whisper.",
                  "$$child_friends_m1$: \"Ren... Ren? Is that you?\""],
    function: function() {
      unlock_listen(approach);
      unlock_examine(approach);
    },
  });
};

PLAYER_ACTIONS.add.unlocked_action({
  name: look,
  description: ["You look at what remains of $$child_friends_m1$.",
                "The poor child has been mauled by the beastly creature. He lies in the middle of a pool of blood. You hear a growl coming from his direction. Maybe... Maybe he's not quite dead."],
  function: function() {
    unlock_approach();
  },
});

// ===================
// =================== START
// ===================
BATTLE.operations.start("You find on the ground the remains of $$child_friends_m1$. It's obviously in a pretty bad shape, the Basilisk really did a number on him.");
