// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/forests/mushroom_1.png", 'background');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Mushroom, 1);

// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(500);


// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.3, // Between 0 and 1
  warning_time_s: 0.3,
  react_time_s: 1.2,
  time_variation: 0.8, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Morel expands its rhizome at an incredible speed. It expands under your feet and starts ensnaring them.", attack);
BATTLE.monster_actions.add_textual("The Morel grows its roots longer, and they surge suddenly out of the ground and converge towards you.", attack);
BATTLE.monster_actions.add_textual("The Morel activates its rhizome which shakes the ground beneath you. You start to sink in the mud, grabbed by the vegetal tentacles.", attack);



// ===================
//hack START
// ===================
BATTLE.operations.start("A Menacing Morel Meets its Match.");

//todo
