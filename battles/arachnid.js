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
BATTLE.monster_actions.add_textual("The Arachnid crawls up your arm. The unsettling sensation of its fur against your skin makes you panic.");
BATTLE.monster_actions.add_textual("The Arachnid bites you. Nothing too serious. Yet.");
BATTLE.monster_actions.add_textual("The Arachnid's many legs burrow in your forearm. There's no dislodging their hooks.");

// ===================
// =================== START
// ===================
BATTLE.operations.start("An Aversive Arachnid Appeared on your Arm.");
