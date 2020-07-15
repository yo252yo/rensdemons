// ===================
// =================== INITIALIZATION
// ===================
new CenteredImage("assets/battles/viper.png", 'background');

// ===================
// =================== ABILITIES CALLBACKS
// ===================

PLAYER_ACTIONS.default_useless.flee();
PLAYER_ACTIONS.default_useless.pray();
PLAYER_ACTIONS.default_useless.stone();
PLAYER_ACTIONS.default_win.elixir_fire();

// ===================
// =================== DEFAULT MONSTER BEHAVIOR
// ===================
var throwbranch = "Throw branch";

BATTLE.monster_actions.add_textual("The Viper slithers on the ground towards you.");
BATTLE.monster_actions.add_textual("The Viper open its jaw, it shines with drool. Or is that poison?");
BATTLE.monster_actions.add_textual("The Viper's pointy tongue emits a strident hiss.");

var putSnakeOnStick = PLAYER_ACTIONS.unlock_replacing_function(
  PLAYER_ACTIONS.add.winning, {
    name: throwbranch,
    description: ["You throw the branch with its temporary occupant."],
    _effect: "They disappear together in the darkness, far from you.",
    _consume_item: ITEM.Stick,
  }
);

PLAYER_ACTIONS.add.action({
  name: ITEM.Stick,
  description: ["You point the branch towards the vicious enemy with your trembling hand. The viper gets distracted and seems more interested by the branch than you. It wraps yourself around it."],
  function: putSnakeOnStick,
});

PLAYER_ACTIONS.add.winning({
  name: ITEM.Sword_wooden,
  description: ["You slice the Viper in half."],
  _effect: "In its fresh remains, you manage to extract one of its fangs. It could be useful later.",
  _give_item: ITEM.Fang,
});


// ===================
// =================== START
// ===================
BATTLE.operations.start("A Vicious Viper Ventured into View.");
