// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/mountains/harpy.png", 'background');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Feather, 1);
BATTLE.operations.add_loot("", 2);

// ===================
//hack PLAYER CAPABILITIES
// ===================

PLAYER_ACTIONS.useless(ABILITY.Pray);

// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.1, // Between 0 and 1
  warning_time_s: 1.0,
  react_time_s: 0.4,
  time_variation: 0.4, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Harpy emits a loud shriek that seems to pierce your ears and melt you brain.", attack);
BATTLE.monster_actions.add_textual("The Harpy dives towards you with a loud cry.", attack);
BATTLE.monster_actions.add_textual("The Harpy emits a series of howls that pierce through your skull and chill you to the bone.", attack);

// mb more into shriek

// ===================
//hack START
// ===================

BATTLE.operations.start("A Hurling Harpy Harasses the Heroes.");

//todo
