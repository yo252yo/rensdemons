// ===================
//hack INITIALIZATION
// ===================
BESTIARY.picture('world/butcher');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Sword_iron, 0.1);
BATTLE.operations.add_loot("", 2);



// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(700);


PLAYER_ACTIONS.win(ABILITY.Circumvent, 1);                // 33  DIPL
PLAYER_ACTIONS.win(ABILITY.Sneak, 1);                     // 83  DIPL

PLAYER_ACTIONS.win(ITEM.Spear, 3);                        // 250  WEAP
PLAYER_ACTIONS.win(ITEM.Axe, 1);                          // 600  WEAP

PLAYER_ACTIONS.win(ABILITY.Fireball, 4);                  // 10  ELEM
PLAYER_ACTIONS.win(ABILITY.Earthquake, 1);                // 666  ELEM

PLAYER_ACTIONS.win(ABILITY.Poison, 3);                    // 25  SPIR
PLAYER_ACTIONS.win(ABILITY.Petrify, 1);                   // 166  SPIR

PLAYER_ACTIONS.win(ITEM.Net, 2);                          // 200  TOOL
PLAYER_ACTIONS.win(ITEM.Poison_darts, 5, true);           // 5   TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_vine, 2, true);            // 30  ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_venom, 3, true);           // 40  ALCH



PLAYER_ACTIONS.win(PARTYMEMBERS.SnobRich);
PLAYER_ACTIONS.win(PARTYMEMBERS.GeniusProdigy);
PLAYER_ACTIONS.win(PARTYMEMBERS.TorturedSoul);


// ===================
//hack MONSTER BEHAVIOR
// ===================
BESTIARY.setup_attacks("world/butcher", {
  attack_amplitude: 0.8, // Between 0 and 1
  warning_time_s: 0.3,
  react_time_s: 1.0,
  variability: 0.3, // 1 = 100%
});



// ===================
//hack START
// ===================
// basis for a barbacue/buffet
BATTLE.operations.start(BESTIARY.intro("world/butcher"));
