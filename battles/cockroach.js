// ===================
// =================== INITIALIZATION
// ===================
new CenteredImage("assets/battles/cockroach.png", 'background');

// ===================
// =================== ABILITIES CALLBACKS
// ===================

PLAYER_ACTIONS.can_flee();

PLAYER_ACTIONS.useless(ABILITY.Pray);
PLAYER_ACTIONS.useless(ITEM.Stick);
PLAYER_ACTIONS.useless(ITEM.Bone);

PLAYER_ACTIONS.win(ITEM.Fang, 1, true);
PLAYER_ACTIONS.win(ITEM.Stone, 2, true);
PLAYER_ACTIONS.win(ITEM.Elixir_fire, 1, true);

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
