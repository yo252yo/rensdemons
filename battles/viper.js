// ===================
// =================== INITIALIZATION
// ===================
new CenteredImage("assets/battles/viper.png", 'background');

// ===================
// =================== ABILITIES CALLBACKS
// ===================

PLAYER_ACTIONS.set_default.flee();
PLAYER_ACTIONS.set_default.pray();

// ===================
// =================== DEFAULT MONSTER BEHAVIOR
// ===================
BATTLE.monster_actions.add_textual("The viper does something.");

// ===================
// =================== START
// ===================
BATTLE.operations.start("A Vicious Viper Ventured into View.");
