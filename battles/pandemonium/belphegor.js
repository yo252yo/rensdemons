// ===================
//hack INITIALIZATION
// ===================
BESTIARY.picture('pandemonium/belphegor');
PLAYER_ACTIONS.allow_flight();


BATTLE.operations.add_loot(ITEM.Elixir_vine, 0.5);


// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(1500);


PLAYER_ACTIONS.win(ABILITY.Persuade, 3);                  // 250  DIPL

PLAYER_ACTIONS.win(ITEM.Sword_great, 2);                  // 1000 WEAP

PLAYER_ACTIONS.win(ABILITY.Asphyxiate, 2);                // 250  ELEM

PLAYER_ACTIONS.win(ABILITY.Confusion, 1);                 // 666  SPIR

PLAYER_ACTIONS.win(ITEM.Rope, 3);

PLAYER_ACTIONS.win(ITEM.Elixir_venom, 6, true);           // 40  ALCH


PLAYER_ACTIONS.win(PARTYMEMBERS.DumbMuscles);


// ===================
//hack MONSTER BEHAVIOR
// ===================

BESTIARY.setup_attacks("pandemonium/belphegor", {
  attack_amplitude: 0.65, // Between 0 and 1
  warning_time_s: 0.2,
  react_time_s: 0.5,
  variability: 0.9, // 1 = 100%
});



// ===================
//hack START
// ===================

BATTLE.operations.start(BESTIARY.intro("pandemonium/belphegor"));
