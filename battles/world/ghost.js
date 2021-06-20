// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/world_easy/ghost.png", 'background');
PLAYER_ACTIONS.allow_flight();

// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(300);

PLAYER_ACTIONS.win(PARTYMEMBERS.UpbeatDojikko);
PLAYER_ACTIONS.win(PARTYMEMBERS.TorturedSoul);

PLAYER_ACTIONS.useless(PARTYMEMBERS.PreciousChild);
PLAYER_ACTIONS.useless(PARTYMEMBERS.DumbMuscles);
PLAYER_ACTIONS.useless(PARTYMEMBERS.DisguisedPrincess);

// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.3, // Between 0 and 1
  warning_time_s: 1.3,
  react_time_s: 0.5,
  time_variation: 0.8, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Ghost extends a vapory arm towards you and burrows it deep in your chest. The cold pierces through you.", attack);
BATTLE.monster_actions.add_textual("The Ghost floats around you, grinning menacingly.", attack);
BATTLE.monster_actions.add_textual("The Ghost charges through you. It feels as if you've been in ice cold water. You think a piece of your soul is missing.", attack);



// ===================
//hack START
// ===================
BATTLE.operations.start("A Ghastly Ghost Glows Gloomily.");

//todo
