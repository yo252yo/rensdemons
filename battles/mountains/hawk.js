// ===================
//hack INITIALIZATION
// ===================
BESTIARY.picture('mountains/hawk');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Feather, 0.5);
BATTLE.operations.add_loot(ITEM.Fang, 1);
BATTLE.operations.add_loot("", 0.5);



// ===================
//hack PLAYER CAPABILITIES
// ===================

PLAYER_ACTIONS.kill_with_anything_over(700);


PLAYER_ACTIONS.win(ABILITY.Circumvent, 3);                // 33  DIPL
PLAYER_ACTIONS.win(ABILITY.Intimidate, 1);                // 666  DIPL

PLAYER_ACTIONS.win(ITEM.Dagger, 2);                       // 50  WEAP
PLAYER_ACTIONS.win(ITEM.Spear, 1);                        // 250  WEAP

PLAYER_ACTIONS.win(ABILITY.Ice_bolt, 4);                  // 50  ELEM
PLAYER_ACTIONS.win(ABILITY.Asphyxiate, 1);                // 250  ELEM

PLAYER_ACTIONS.win(ABILITY.Shrink, 2);                    // 66  SPIR
PLAYER_ACTIONS.win(ABILITY.Petrify, 1);                   // 166  SPIR

PLAYER_ACTIONS.win(ITEM.Arrow, 6, true);                  // 2   TOOL
PLAYER_ACTIONS.win(ITEM.Rope, 1);                         // 100  TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_ice, 2, true);             // 20  ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_vine, 1, true);            // 30  ALCH


PLAYER_ACTIONS.win(PARTYMEMBERS.PreciousChild);
PLAYER_ACTIONS.win(PARTYMEMBERS.WiseOld);
PLAYER_ACTIONS.win(PARTYMEMBERS.GeniusProdigy);




// ===================
//hack MONSTER BEHAVIOR
// ===================
BESTIARY.setup_attacks("mountains/hawk", {
  attack_amplitude: 0.4, // Between 0 and 1
  warning_time_s: 0.8,
  react_time_s: 0.6,
  variability: 0.4, // 1 = 100%
});



// ===================
//hack START
// ===================
BATTLE.operations.start(BESTIARY.intro("mountains/hawk"));
