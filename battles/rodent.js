// ===================
// =================== INITIALIZATION
// ===================
new CenteredImage("assets/battles/rodent.png", 'background');

// ===================
// =================== ABILITIES CALLBACKS
// ===================

PLAYER_ACTIONS.set_default.flee();
PLAYER_ACTIONS.set_default.pray();
PLAYER_ACTIONS.set_default.stick();

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
