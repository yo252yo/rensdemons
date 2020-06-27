// ===================
// =================== INITIALIZATION
// ===================
new CenteredImage("assets/battles/cockroach.png", 'background');

// ===================
// =================== ABILITIES CALLBACKS
// ===================

PLAYER_ACTIONS.set_default.flee();
PLAYER_ACTIONS.set_default.pray();

// ===================
// =================== DEFAULT MONSTER BEHAVIOR
// ===================
BATTLE.monster_actions.add_textual("The cockroach does something.");

// ===================
// =================== START
// ===================
BATTLE.operations.start("A Crass Cockroach Crawled Creepily.");
