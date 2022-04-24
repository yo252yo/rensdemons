// ===================
//hack INITIALIZATION
// ===================
BESTIARY.picture('hell/eyeball');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Eye, 1);

// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(1500);



PLAYER_ACTIONS.win(ABILITY.Intimidate, 1);                // 666  DIPL

PLAYER_ACTIONS.win(ITEM.Dagger, 6);                       // 50  WEAP

PLAYER_ACTIONS.win(ABILITY.Incinerate, 1);                // 1000 ELEM

PLAYER_ACTIONS.win(ABILITY.Shrink, 4);                    // 66  SPIR

PLAYER_ACTIONS.win(ITEM.Net, 3);                          // 200  TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_decay, 4, true);           // 50  ALCH



PLAYER_ACTIONS.win(PARTYMEMBERS.TraitorFisher);


// ===================
//hack MONSTER BEHAVIOR
// ===================

BESTIARY.setup_attacks("hell/eyeball", {
  attack_amplitude: 0.5, // Between 0 and 1
  warning_time_s: 0.4,
  react_time_s: 0.4,
  variability: 0.8, // 1 = 100%
});


// ===================
//hack START
// ===================

BATTLE.operations.start(BESTIARY.intro("hell/eyeball"));
