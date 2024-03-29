// ===================
//hack INITIALIZATION
// ===================
BESTIARY.picture('waters/octopus');
PLAYER_ACTIONS.allow_flight();

// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(300);


PLAYER_ACTIONS.win(PARTYMEMBERS.WiseOld);
PLAYER_ACTIONS.win(PARTYMEMBERS.PreciousChild);

PLAYER_ACTIONS.win(ABILITY.Fireball, 5);                  // 50   ELEM
PLAYER_ACTIONS.win(ABILITY.Thunder, 3);                   // 150  ELEM

PLAYER_ACTIONS.win(ABILITY.Poison, 2);                    // 75   SPIR
PLAYER_ACTIONS.win(ABILITY.Shrink, 2);                    // 150  SPIR

PLAYER_ACTIONS.win(ABILITY.Sneak, 3);                     // 200  DIPL
PLAYER_ACTIONS.win(ABILITY.Persuade, 1);                  // 500  DIPL

PLAYER_ACTIONS.win(ITEM.Elixir_fire, 3, true);            // 20   ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_decay, 1, true);           // 150  ALCH

PLAYER_ACTIONS.win(ITEM.Dagger, 6);                       // 75   WEAP
PLAYER_ACTIONS.win(ITEM.Spear, 1);                        // 250  WEAP

PLAYER_ACTIONS.win(ITEM.Poison_darts, 5, true);           // 10   TOOL
PLAYER_ACTIONS.win(ITEM.Arrow, 5, true);                  // 5    TOOL
PLAYER_ACTIONS.win(ITEM.Rope, 1);                         // 100  TOOL

// ===================
//hack MONSTER BEHAVIOR
// ===================
BESTIARY.setup_attacks("waters/octopus", {
  attack_amplitude: 0.2, // Between 0 and 1
  warning_time_s: 0.8,
  react_time_s: 0.8,
  variability: 0.5, // 1 = 100%
});

// tentacle, squeeze, drag

// ===================
//hack START
// ===================
BATTLE.operations.start(BESTIARY.intro("waters/octopus"));
