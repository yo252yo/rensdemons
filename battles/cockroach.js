// ===================
// =================== INITIALIZATION
// ===================
new CenteredImage("assets/battles/cockroach.png", 'background');

// ===================
// =================== ABILITIES CALLBACKS
// ===================

PLAYER_ACTIONS.set_default.flee();
PLAYER_ACTIONS.set_default.pray();
PLAYER_ACTIONS.set_default.stick();

// ===================
// =================== DEFAULT MONSTER BEHAVIOR
// ===================
BATTLE.monster_actions.add_textual("The Cockroach runs between your legs.");
BATTLE.monster_actions.add_textual("The Cockroach emits small chirping sound.");
BATTLE.monster_actions.add_textual("The Cockroach runs around in circles.");

// ===================
// =================== START
// ===================
BATTLE.operations.start("A Crass Cockroach Crawled Creepily.");
