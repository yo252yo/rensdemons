// ===================
//hack INITIALIZATION
// ===================
BESTIARY.picture('hell/satyr');
PLAYER_ACTIONS.allow_flight();


BATTLE.operations.add_loot(ITEM.Fur, 1);


// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(1500);



PLAYER_ACTIONS.win(ABILITY.Persuade, 3);                  // 250  DIPL

PLAYER_ACTIONS.win(ITEM.Spear, 2);                    // 1000 WEAP

PLAYER_ACTIONS.win(ABILITY.Asphyxiate, 3);                // 250  ELEM

PLAYER_ACTIONS.win(ABILITY.Shrink, 5);                    // 66  SPIR

PLAYER_ACTIONS.win(ITEM.Arrow, 6, true);           // 5   TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_venom, 6, true);           // 40  ALCH


PLAYER_ACTIONS.win(PARTYMEMBERS.WiseOld);



// ===================
//hack MONSTER BEHAVIOR
// ===================

BESTIARY.setup_attacks("hell/satyr", {
  attack_amplitude: 0.4, // Between 0 and 1
  warning_time_s: 0.2,
  react_time_s: 0.6,
  variability: 0.9, // 1 = 100%
});




// ===================
//hack START
// ===================

BATTLE.operations.start(BESTIARY.intro("hell/satyr"));
