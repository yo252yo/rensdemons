// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/waters/jellyfish.png", 'background');
PLAYER_ACTIONS.allow_flight();

// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(500);

// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.1, // Between 0 and 1
  warning_time_s: 1,
  react_time_s: 0.6,
  time_variation: 0.7, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Jellyfish extends a veil of venomous filaments in your direction.", attack);
BATTLE.monster_actions.add_textual("The Jellyfish tries to sting you with its translucent poisonous tentacles.", attack);
BATTLE.monster_actions.add_textual("The Jellyfish swims all around you energetically. You must be extremely careful to avoid being burnt by its trail.", attack);


// ===================
//hack START
// ===================
BATTLE.operations.start("A Judgemental Jellyfish Jiggles Joyfully.");

//todo
