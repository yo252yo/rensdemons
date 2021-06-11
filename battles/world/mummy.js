
new CenteredImage("assets/battles/world_easy/mummy.png", 'background');

PLAYER_ACTIONS.allow_flight(true);

BATTLE.operations.add_loot(ITEM.Linnens, 1);
BATTLE.operations.add_loot("", 9);

BATTLE.operations.start("A Meandering Mummy Moans Mournfully.");

//todo
