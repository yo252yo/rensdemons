// ===================
// =================== INITIALIZATION
// ===================
new CenteredImage("assets/battles/cockroach.png", 'background');

// ===================
// =================== ABILITIES CALLBACKS
// ===================

BATTLE.set_default_player_actions.flee();
BATTLE.set_default_player_actions.pray();

// ===================
// =================== DEFAULT MONSTER BEHAVIOR
// ===================
BATTLE.monster_actions.add_textual("The cockroach does something.");

// ===================
// =================== START
// ===================
BATTLE.operations.start("A Crass Cockroach Crawled Creepily.");
