// ===================
// =================== INITIALIZATION
// ===================
new CenteredImage("assets/battles/arachnid.png", 'background');

// ===================
// =================== ABILITIES CALLBACKS
// ===================

PLAYER_ACTIONS.set_default.flee();
PLAYER_ACTIONS.set_default.pray();

// ===================
// =================== DEFAULT MONSTER BEHAVIOR
// ===================
BATTLE.monster_actions.add_textual("The arachnid does something.");

// ===================
// =================== START
// ===================
BATTLE.operations.start("An Aversive Arachnid Appeared on your Arm.");
