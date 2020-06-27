// ===================
// =================== INITIALIZATION
// ===================
new CenteredImage("assets/battles/rodent.png", 'background');

// ===================
// =================== ABILITIES CALLBACKS
// ===================

PLAYER_ACTIONS.set_default.flee();
PLAYER_ACTIONS.set_default.pray();

// ===================
// =================== DEFAULT MONSTER BEHAVIOR
// ===================
BATTLE.monster_actions.add_textual("The rodent does something.");

// ===================
// =================== START
// ===================
BATTLE.operations.start("A Repulsive Rodent Rushed to your Rear.");
