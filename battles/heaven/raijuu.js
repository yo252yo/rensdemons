// ===================
//hack INITIALIZATION
// ===================
BESTIARY.picture('heaven/raijuu');
PLAYER_ACTIONS.allow_flight();


BATTLE.operations.add_loot(ITEM.Elixir_chaos, 1);

// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(1500);


PLAYER_ACTIONS.win(ABILITY.Sneak, 4);                     // 83  DIPL

PLAYER_ACTIONS.win(ITEM.Axe, 1);                          // 600  WEAP

PLAYER_ACTIONS.win(ABILITY.Asphyxiate, 2);                // 250  ELEM

PLAYER_ACTIONS.win(ABILITY.Shrink, 4);                    // 66  SPIR

PLAYER_ACTIONS.win(ITEM.Net, 2);                          // 200  TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_chaos, 3, true);           // 75  ALCH


PLAYER_ACTIONS.win(PARTYMEMBERS.UpbeatDojikko);



// ===================
//hack MONSTER BEHAVIOR
// ===================

BESTIARY.setup_attacks("heaven/raijuu", {
  attack_amplitude: 0.3, // Between 0 and 1
  warning_time_s: 0.1,
  react_time_s: 0.4,
  variability: 0.7, // 1 = 100%
});

// ===================
//hack START
// ===================

BATTLE.operations.start(BESTIARY.intro("heaven/raijuu"));
