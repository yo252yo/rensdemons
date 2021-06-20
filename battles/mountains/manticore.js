// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/mountains/manticore.png", 'background');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Feather, 1);
BATTLE.operations.add_loot("", 2);

// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(500);

// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.1, // Between 0 and 1
  warning_time_s: 0.8,
  react_time_s: 0.6,
  time_variation: 0.5, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Manticore slams its powerful tail in your vicinity.", attack);
BATTLE.monster_actions.add_textual("The Manticore flails its stringer around. Poison is dripping from it.", attack);
BATTLE.monster_actions.add_textual("The Manticore's venomous stinger darts towards you.", attack);

// mb more into stinger

// ===================
//hack START
// ===================

BATTLE.operations.start("A Mythical Manticore Marches on the Mountain.");

//todo
