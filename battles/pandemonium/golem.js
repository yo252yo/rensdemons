// ===================
//hack INITIALIZATION
// ===================
BESTIARY.picture('pandemonium/golem');
PLAYER_ACTIONS.allow_flight();


BATTLE.operations.add_loot(ITEM.Elixir_decay, 1);


// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(1500);


PLAYER_ACTIONS.win(ABILITY.Sneak, 4);                     // 83  DIPL

PLAYER_ACTIONS.win(ITEM.Spear, 1);                        // 250  WEAP

PLAYER_ACTIONS.win(ABILITY.Earthquake, 2);                // 666  ELEM

PLAYER_ACTIONS.win(ABILITY.Confusion, 1);                 // 666  SPIR

PLAYER_ACTIONS.win(ITEM.Rope, 1);                         // 100  TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_chaos, 3, true);           // 75  ALCH


PLAYER_ACTIONS.win(PARTYMEMBERS.UpbeatDojikko);



// ===================
//hack MONSTER BEHAVIOR
// ===================

var attack = {
  attack_amplitude: 0.8, // Between 0 and 1
  warning_time_s: 0.0,
  react_time_s: 0.7,
  variability: 0.2, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Golem overwhelms you with a torrent of insults.", attack);
BATTLE.monster_actions.add_textual("The Golem shouts abuse targeting your worst insecurities.", attack);
BATTLE.monster_actions.add_textual("The Golem harasses you with a relentless flow of slander.", attack);

// ===================
//hack START
// ===================

BATTLE.operations.start(BESTIARY.intro("pandemonium/golem"));
