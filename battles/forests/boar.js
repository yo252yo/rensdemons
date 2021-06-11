
new CenteredImage("assets/battles/forests/boar.png", 'background');

PLAYER_ACTIONS.allow_flight(true);
BATTLE.operations.add_loot(ITEM.Bone, 1);
BATTLE.operations.add_loot("", 4);

BATTLE.operations.start("A Brazen Boar Braces for Battle.");

//todo
