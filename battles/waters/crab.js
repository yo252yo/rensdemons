
new CenteredImage("assets/battles/waters/crab.png", 'background');

PLAYER_ACTIONS.allow_flight(true);
BATTLE.operations.add_loot(ITEM.Scale, 1);
BATTLE.operations.add_loot("", 2);

BATTLE.operations.start("A Cruel Crab Creeps Closer.");

//todo
