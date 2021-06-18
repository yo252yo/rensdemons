// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/mountains/chimera.png", 'background');
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
  attack_amplitude: 0.4, // Between 0 and 1
  warning_time_s: 0.4,
  react_time_s: 1,
  time_variation: 0.5, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Chimera charges towards you in the air, claws first.", attack);
BATTLE.monster_actions.add_textual("The Chimera overwhelms you with a storm of scratches from its sharp claws.", attack);
BATTLE.monster_actions.add_textual("The Chimera grabs on to your arm and tries to throw you up in the air.", attack);

// ===================
//hack START
// ===================

BATTLE.operations.start("A Cawing Chimera Charges Claws ahead.");

//todo
