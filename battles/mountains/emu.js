
new CenteredImage("assets/battles/mountains/emu.png", 'background');

PLAYER_ACTIONS.allow_flight(true);

BATTLE.operations.add_loot(ITEM.Feather, 1);
BATTLE.operations.add_loot("", 2);

BATTLE.operations.start("An Enraged Emu Encroaches on your Ensemble.");

//todo
