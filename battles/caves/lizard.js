// ===================
//hack INITIALIZATION
// ===================
BESTIARY.picture('caves/lizard');
PLAYER_ACTIONS.allow_flight();
AUDIO.music.interface.boss();

BATTLE.operations.add_loot(ITEM.Stone, 1);
BATTLE.operations.add_loot(ITEM.Meat, 1);



// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(2000);
PLAYER_ACTIONS.kill_with_any_party_member(4);

PLAYER_ACTIONS.win(ABILITY.Sneak, 9);                     // 83  DIPL
PLAYER_ACTIONS.win(ABILITY.Persuade, 4);                  // 250  DIPL

PLAYER_ACTIONS.win(ITEM.Dagger, 8);                       // 50  WEAP
PLAYER_ACTIONS.win(ITEM.Spear, 5);                        // 250  WEAP
PLAYER_ACTIONS.win(ITEM.Axe, 3);                          // 600  WEAP

PLAYER_ACTIONS.win(ABILITY.Thunder, 7);                   // 83  ELEM
PLAYER_ACTIONS.win(ABILITY.Asphyxiate, 4);                // 250  ELEM

PLAYER_ACTIONS.win(ABILITY.Confusion, 6);                 // 666  SPIR
PLAYER_ACTIONS.win(ABILITY.Lull, 2);                      // 1600 SPIR

PLAYER_ACTIONS.win(ITEM.Poison_darts, 12, true);           // 5   TOOL
PLAYER_ACTIONS.win(ITEM.Rope, 7);                         // 100  TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_vine, 9, true);            // 30  ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_decay, 6, true);           // 50  ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_chaos, 5, true);           // 75  ALCH


// ===================
//hack MONSTER BEHAVIOR
// ===================
BESTIARY.setup_attacks("caves/lizard", {
  attack_amplitude: 0.7, // Between 0 and 1
  warning_time_s: 0.6,
  react_time_s: 0.3,
  variability: 0.8, // 1 = 100%
});


// ===================
//hack START
// ===================

BATTLE.operations.start(BESTIARY.intro("caves/lizard"));
