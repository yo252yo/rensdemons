// ===================
// =================== INITIALIZATION
// ===================
new CenteredImage("assets/battles/viper.png", 'background');

// ===================
// =================== ABILITIES CALLBACKS
// ===================

BATTLE.set_default_player_actions.flee();
BATTLE.set_default_player_actions.pray();

// ===================
// =================== DEFAULT MONSTER BEHAVIOR
// ===================
BATTLE.monster_actions.add_textual("The viper does something.");

// ===================
// =================== START
// ===================
BATTLE.operations.start("A Vicious Viper Ventured into View.");
