// ===================
//hack INITIALIZATION
// ===================
BESTIARY.picture('pandemonium/hellhound');
PLAYER_ACTIONS.allow_flight();


BATTLE.operations.add_loot(ITEM.Elixir_ice, 1);


// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(1500);



PLAYER_ACTIONS.win(ABILITY.Intimidate, 1);                // 666  DIPL

PLAYER_ACTIONS.win(ITEM.Axe, 2);                          // 600  WEAP

PLAYER_ACTIONS.win(ABILITY.Ice_bolt, 4);                  // 50  ELEM

PLAYER_ACTIONS.win(ABILITY.Lull, 3);                      // 1600 SPIR

PLAYER_ACTIONS.win(ITEM.Arrow, 10, true);           // 5   TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_vine, 7, true);            // 30  ALCH

PLAYER_ACTIONS.win(PARTYMEMBERS.StreetSmart);



// ===================
//hack MONSTER BEHAVIOR
// ===================

BESTIARY.setup_attacks("pandemonium/hellhound", {
  attack_amplitude: 0.6, // Between 0 and 1
  warning_time_s: 0.6,
  react_time_s: 0.2,
  variability: 0.5, // 1 = 100%
});




// ===================
//hack START
// ===================

BATTLE.operations.start(BESTIARY.intro("pandemonium/hellhound"));
