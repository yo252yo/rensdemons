// ===================
//hack INITIALIZATION
// ===================
BESTIARY.picture('mountains/manticore');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Meat, 0.1);
BATTLE.operations.add_loot(ITEM.Feather, 1);
BATTLE.operations.add_loot("", 1);

// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(300);

PLAYER_ACTIONS.win(PARTYMEMBERS.UpbeatDojikko);
PLAYER_ACTIONS.win(PARTYMEMBERS.DisguisedPrincess);
PLAYER_ACTIONS.win(PARTYMEMBERS.SavageChild);
PLAYER_ACTIONS.win(PARTYMEMBERS.DumbMuscles);

PLAYER_ACTIONS.win(ABILITY.Ice_bolt, 5);                  // 100  ELEM
PLAYER_ACTIONS.win(ABILITY.Storm, 3);                     // 200  ELEM

PLAYER_ACTIONS.win(ABILITY.Poison, 2);                    // 75   SPIR

PLAYER_ACTIONS.win(ABILITY.Circumvent, 5);                // 100  DIPL

PLAYER_ACTIONS.win(ITEM.Elixir_chaos, 1, true);             // 50   ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_vine, 1, true);           // 150  ALCH

PLAYER_ACTIONS.win(ITEM.Dagger, 3);                       // 75   WEAP
PLAYER_ACTIONS.win(ITEM.Axe, 2);                        // 250  WEAP

PLAYER_ACTIONS.win(ITEM.Net, 3);                          // 200  TOOL

// ===================
//hack MONSTER BEHAVIOR
// ===================
BESTIARY.setup_attacks("mountains/manticore", {
  attack_amplitude: 0.1, // Between 0 and 1
  warning_time_s: 0.8,
  react_time_s: 0.6,
  variability: 0.5, // 1 = 100%
});

// mb more into stinger

// ===================
//hack START
// ===================

BATTLE.operations.start(BESTIARY.intro("mountains/manticore"));
