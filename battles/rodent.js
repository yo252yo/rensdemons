// ===================
// =================== INITIALIZATION
// ===================
new CenteredImage("assets/battles/rodent.png", 'background');

// ===================
// =================== ABILITIES CALLBACKS
// ===================

PLAYER_ACTIONS.default_useless.flee();
PLAYER_ACTIONS.default_useless.pray();
PLAYER_ACTIONS.default_useless.stick();
PLAYER_ACTIONS.default_useless.stone();

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
