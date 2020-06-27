// ===================
// =================== INITIALIZATION
// ===================
new CenteredImage("assets/battles/arachnid.png", 'background');

// ===================
// =================== ABILITIES CALLBACKS
// ===================

BATTLE.set_default_player_actions.flee();
BATTLE.set_default_player_actions.pray();

// ===================
// =================== DEFAULT MONSTER BEHAVIOR
// ===================
BATTLE.monster_actions.add_textual("The arachnid does something.");

// ===================
// =================== START
// ===================
BATTLE.operations.start("An Aversive Arachnid Appeared on your Arm.");
