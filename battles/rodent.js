// ===================
// =================== INITIALIZATION
// ===================
new CenteredImage("assets/battles/rodent.png", 'background');

// ===================
// =================== ABILITIES CALLBACKS
// ===================

PLAYER_ACTIONS.can_flee();

PLAYER_ACTIONS.useless(ABILITY.Pray);
PLAYER_ACTIONS.useless(ITEM.Stick);
PLAYER_ACTIONS.useless(ITEM.Bone);

PLAYER_ACTIONS.win(ITEM.Fang, 1, true);
PLAYER_ACTIONS.win(ITEM.Elixir_fire, 1, true);
PLAYER_ACTIONS.win(ITEM.Bone, 1, true);

// ===================
// =================== DEFAULT MONSTER BEHAVIOR
// ===================
BATTLE.monster_actions.add_textual("The Rodent takes a bite off your leg. It strings. You hope it won't get infected.");
BATTLE.monster_actions.add_textual("The Rodent scratches around, like it's looking for something.");
BATTLE.monster_actions.add_textual("The Rodent shakes its whiskers. Maybe it's calling for help.");

// ===================
// =================== START
// ===================
BATTLE.operations.start("A Repulsive Rodent Rushed to your Rear.");
