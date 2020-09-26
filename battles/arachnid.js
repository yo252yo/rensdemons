// ===================
// =================== INITIALIZATION
// ===================
new CenteredImage("assets/battles/arachnid.png", 'background');

// ===================
// =================== ABILITIES CALLBACKS
// ===================

PLAYER_ACTIONS.can_flee();

PLAYER_ACTIONS.useless(ABILITY.Pray);
PLAYER_ACTIONS.useless(ITEM.Stick);
PLAYER_ACTIONS.useless(ITEM.Bone);

PLAYER_ACTIONS.win(ITEM.Stone, 1, true);
PLAYER_ACTIONS.win(ITEM.Elixir_fire, 1, true);

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
