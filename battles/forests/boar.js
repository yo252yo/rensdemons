// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/forests/boar.png", 'background');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Bone, 1);
BATTLE.operations.add_loot("", 4);


// ===================
//hack PLAYER CAPABILITIES
// ===================


// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.3, // Between 0 and 1
  warning_time_s: 0.2,
  react_time_s: 1.5,
  time_variation: 0.2, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Boar stomps its hooves and charges at you head first.", attack);
BATTLE.monster_actions.add_textual("The Boar slams its head and tries to hurt you with his tusks.", attack);
BATTLE.monster_actions.add_textual("The Boar exhales strongly. It seems enraged. It starts running towards you.", attack);



// ===================
//hack START
// ===================

BATTLE.operations.start("A Brazen Boar Braces for Battle.");

//todo
