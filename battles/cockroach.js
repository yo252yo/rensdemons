// ===================
// =================== INITIALIZATION
// ===================
new CenteredImage("assets/battles/cockroach.png", 'background');

// ===================
// =================== ABILITIES CALLBACKS
// ===================

PLAYER_ACTIONS.default_useless.flee();
PLAYER_ACTIONS.default_useless.pray();
PLAYER_ACTIONS.default_useless.stick();
PLAYER_ACTIONS.default_win.stone();
PLAYER_ACTIONS.default_win.elixir_fire();
PLAYER_ACTIONS.default_win.fang();
PLAYER_ACTIONS.default_useless.bone();

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
