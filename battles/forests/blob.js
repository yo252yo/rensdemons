// ===================
//hack INITIALIZATION
// ===================
BESTIARY.picture('forests/blob');
PLAYER_ACTIONS.allow_flight();
AUDIO.music.interface.boss();

BATTLE.operations.add_loot(ITEM.Goo, 1);
BATTLE.operations.add_loot(ITEM.Elixir_vine, 0.1);



// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(2000);
PLAYER_ACTIONS.kill_with_any_party_member(5);



PLAYER_ACTIONS.win(ABILITY.Persuade, 7);                  // 250  DIPL
PLAYER_ACTIONS.win(ABILITY.Intimidate, 3);                // 666  DIPL

PLAYER_ACTIONS.win(ITEM.Mace, 8);                         // 75  WEAP
PLAYER_ACTIONS.win(ITEM.Shield, 4);                       // 200  WEAP
PLAYER_ACTIONS.win(ITEM.Sword_great, 3);                  // 1000 WEAP

PLAYER_ACTIONS.win(ABILITY.Thunder, 6);                   // 83  ELEM
PLAYER_ACTIONS.win(ABILITY.Incinerate, 3);                // 1000 ELEM

PLAYER_ACTIONS.win(ABILITY.Shrink, 7);                    // 66  SPIR
PLAYER_ACTIONS.win(ABILITY.Lull, 3);                      // 1600 SPIR

PLAYER_ACTIONS.win(ITEM.Poison_darts, 12, true);           // 5   TOOL
PLAYER_ACTIONS.win(ITEM.Net, 4);                          // 200  TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_ice, 7, true);             // 20  ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_decay, 5, true);           // 50  ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_chaos, 3, true);           // 75  ALCH

// ===================
//hack MONSTER BEHAVIOR
// ===================
BESTIARY.setup_attacks("forests/blob", {
  attack_amplitude: 0.9, // Between 0 and 1
  warning_time_s: 0.1,
  react_time_s: 1.2,
  variability: 0.5, // 1 = 100%
});


// ===================
//hack START
// ===================
BATTLE.operations.start(BESTIARY.intro("forests/blob"));
