
new CenteredImage("assets/battles/forests/squirrel.png", 'background');

PLAYER_ACTIONS.allow_flight(true);
BATTLE.operations.add_loot(ITEM.Berry, 1);
BATTLE.operations.add_loot("", 4);

BATTLE.operations.start("A Savage Squirrel Springs on Stage.");

//todo
