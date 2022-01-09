// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/trial/viper.png", 'background');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Fang, 1);
BATTLE.operations.add_loot("", 1);

// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.useless(ABILITY.Pray);
PLAYER_ACTIONS.useless(ITEM.Stone);

PLAYER_ACTIONS.win(ITEM.Elixir_fire, 1, true);

// ===================
//hack MONSTER BEHAVIOR
// ===================
var throwbranch = "Throw branch";

var attack = {
  attack_amplitude: 0.01, // Between 0 and 1
  warning_time_s: 1,
  react_time_s: 0.5,
  variability: 0.01, // 1 = 100%
};
BATTLE.monster_actions.add_textual("The Viper slithers on the ground towards you.", attack);
BATTLE.monster_actions.add_textual("The Viper open its jaw, it shines with drool. Or is that poison?", attack);
BATTLE.monster_actions.add_textual("The Viper's pointy tongue emits a strident hiss.", attack);

var putSnakeOnStick = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: throwbranch,
  outcome: BATTLETREE.WIN,
  description: ["You throw the branch with its temporary occupant.",
                "They disappear together in the darkness, far from you."],
  consume_item: ITEM.Stick,
});

PLAYER_ACTIONS.add({
  name: ITEM.Stick,
  description: "You point the branch towards the vicious enemy with your trembling hand. The viper gets distracted and seems more interested by the branch than you. It wraps yourself around it.",
  function: putSnakeOnStick,
});

var lootfang_text = "In its fresh remains, you manage to extract one of its fangs. It could be useful later.";
PLAYER_ACTIONS.add({
  name: ITEM.Bone,
  outcome: BATTLETREE.WIN,
  description: LANGUAGE.actions.usage(ITEM.Bone).concat(lootfang_text),
  consume_item: ITEM.Bone,
  give_item: ITEM.Fang,
});

PLAYER_ACTIONS.add({
  name: ITEM.Sword_wooden,
  outcome: BATTLETREE.WIN,
  description: LANGUAGE.actions.usage(ITEM.Sword_wooden).concat(lootfang_text),
  give_item: ITEM.Fang,
});

// ===================
//hack START
// ===================
BATTLE.operations.start(BESTIARY.intro("trial/viper"));
