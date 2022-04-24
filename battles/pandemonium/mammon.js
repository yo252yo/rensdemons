// ===================
//hack INITIALIZATION
// ===================
BESTIARY.picture('pandemonium/mammon');
PLAYER_ACTIONS.allow_flight();


BATTLE.operations.add_loot(ITEM.Mace, 1);


// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(1500);


PLAYER_ACTIONS.win(ABILITY.Intimidate, 2);                // 666  DIPL

PLAYER_ACTIONS.win(ITEM.Mace, 5);                         // 75  WEAP

PLAYER_ACTIONS.win(ABILITY.Storm, 1);                     // 166  ELEM

PLAYER_ACTIONS.win(ABILITY.Confusion, 1);                 // 666  SPIR

PLAYER_ACTIONS.win(ITEM.Net, 3);                          // 200  TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_chaos, 4, true);           // 75  ALCH


PLAYER_ACTIONS.win(PARTYMEMBERS.SavageChild);



// ===================
//hack MONSTER BEHAVIOR
// ===================
BESTIARY.setup_attacks("pandemonium/mammon", {
  attack_amplitude: 0.8, // Between 0 and 1
  warning_time_s: 0.3,
  react_time_s: 0.8,
  variability: 0.8, // 1 = 100%
});

// ===================
//hack START
// ===================
BATTLE.operations.start(BESTIARY.intro("pandemonium/mammon"));
