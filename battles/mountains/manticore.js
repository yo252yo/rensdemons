
new CenteredImage("assets/battles/mountains/manticore.png", 'background');

PLAYER_ACTIONS.allow_flight(true);

BATTLE.operations.add_loot(ITEM.Feather, 1);
BATTLE.operations.add_loot("", 2);

BATTLE.operations.start("A Mythical Manticore Marches on the Mountain.");

//todo
