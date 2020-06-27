// ===================
// =================== INITIALIZATION
// ===================
new CenteredImage("assets/battles/rodent.png", 'background');

// ===================
// =================== ABILITIES CALLBACKS
// ===================

BATTLE.set_default_player_actions.flee();
BATTLE.set_default_player_actions.pray();

// ===================
// =================== DEFAULT MONSTER BEHAVIOR
// ===================
BATTLE.monster_actions.add_textual("The rodent does something.");

// ===================
// =================== START
// ===================
BATTLE.operations.start("A Repulsive Rodent Rushed to your Rear.");
