
new CenteredImage("assets/battles/forests/mushroom_2.png", 'background');

PLAYER_ACTIONS.allow_flight(true);
BATTLE.operations.add_loot(ITEM.Mushroom, 1);

BATTLE.operations.start("A Terrible Truffle Threatens you Toxically.");

//todo
