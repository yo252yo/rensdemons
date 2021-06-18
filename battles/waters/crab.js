// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/waters/crab.png", 'background');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Scale, 1);
BATTLE.operations.add_loot("", 2);

// ===================
//hack PLAYER CAPABILITIES
// ===================

PLAYER_ACTIONS.useless(ABILITY.Pray);

// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.3, // Between 0 and 1
  warning_time_s: 1.1,
  react_time_s: 0.5,
  time_variation: 0.2, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Crab pinches your arm with its dented claws.", attack);
BATTLE.monster_actions.add_textual("The Crab rushes at you, snapping its pincers towards your face.", attack);
BATTLE.monster_actions.add_textual("The Crab crawls towards you and pinches your leg.", attack);


// ===================
//hack START
// ===================

BATTLE.operations.start("A Cruel Crab Creeps Closer.");

//todo
