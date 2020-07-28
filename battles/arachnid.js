// ===================
// =================== INITIALIZATION
// ===================
new CenteredImage("assets/battles/arachnid.png", 'background');

// ===================
// =================== ABILITIES CALLBACKS
// ===================

PLAYER_ACTIONS.default_useless.flee();
PLAYER_ACTIONS.default_useless.pray();
PLAYER_ACTIONS.default_useless.stick();
PLAYER_ACTIONS.default_useless.bone();
PLAYER_ACTIONS.default_win.stone();
PLAYER_ACTIONS.default_win.elixir_fire();

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
