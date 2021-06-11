
new CenteredImage("assets/battles/forests/flower.png", 'background');

PLAYER_ACTIONS.allow_flight(true);
BATTLE.operations.add_loot(ITEM.Flower, 1);

BATTLE.operations.start("A Flesh-eating Flower wants to Feed on your Face.");

//todo
