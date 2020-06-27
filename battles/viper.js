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
BATTLE.monster_actions.add_textual("The Viper slithers on the ground towards you.");
BATTLE.monster_actions.add_textual("The Viper open its jaw, it shines with drool. Or is that poison?");
BATTLE.monster_actions.add_textual("The Viper's pointy tongue emits a strident hiss.");

// ===================
// =================== START
// ===================
BATTLE.operations.start("A Vicious Viper Ventured into View.");
