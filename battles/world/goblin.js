
new CenteredImage("assets/battles/world_easy/goblin.png", 'background');

PLAYER_ACTIONS.allow_flight(true);
BATTLE.operations.add_loot(ITEM.Stick, 1);
BATTLE.operations.add_loot("", 9);


BATTLE.operations.start("A Grumpy Goblin Grasps some Grass.");

//todo
