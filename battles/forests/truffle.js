// ===================
//hack INITIALIZATION
// ===================
BESTIARY.picture('forests/truffle');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Mushroom, 1);

// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(300);

PLAYER_ACTIONS.win(PARTYMEMBERS.DumbMuscles);
PLAYER_ACTIONS.win(PARTYMEMBERS.TraitorFisher);
PLAYER_ACTIONS.win(PARTYMEMBERS.SnobRich);

PLAYER_ACTIONS.win(ABILITY.Fireball, 4);                  // 50   ELEM
PLAYER_ACTIONS.win(ABILITY.Storm, 2);                     // 200  ELEM

PLAYER_ACTIONS.win(ABILITY.Petrify, 2);                   // 300  SPIR

PLAYER_ACTIONS.win(ABILITY.Persuade, 1);                  // 500  DIPL

PLAYER_ACTIONS.win(ITEM.Elixir_vine, 1, true);            // 75   ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_chaos, 1, true);           // 200  ALCH

PLAYER_ACTIONS.win(ITEM.Mace, 4);                         // 100  WEAP
PLAYER_ACTIONS.win(ITEM.Shield, 2);                       // 200  WEAP

PLAYER_ACTIONS.win(ITEM.Net, 3, true);           // 10   TOOL

// ===================
//hack MONSTER BEHAVIOR
// ===================
BESTIARY.setup_attacks("forests/truffle", {
  attack_amplitude: 0.6, // Between 0 and 1
  warning_time_s: 0.7,
  react_time_s: 1.2,
  variability: 0.8, // 1 = 100%
});

// ===================
//hack START
// ===================
BATTLE.operations.start(BESTIARY.intro("forests/truffle"));
