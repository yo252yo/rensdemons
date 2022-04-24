// ===================
//hack INITIALIZATION
// ===================
BESTIARY.picture('mountains/phoenix');
PLAYER_ACTIONS.allow_flight();
AUDIO.music.interface.boss();


BATTLE.operations.add_loot(ITEM.Elixir_fire, 1);


// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(2000);
PLAYER_ACTIONS.kill_with_any_party_member(5);


PLAYER_ACTIONS.win(ABILITY.Sneak, 6);                     // 83  DIPL
PLAYER_ACTIONS.win(ABILITY.Persuade, 4);                  // 250  DIPL

PLAYER_ACTIONS.win(ITEM.Dagger, 4);                       // 50  WEAP
PLAYER_ACTIONS.win(ITEM.Mace, 6);                         // 75  WEAP
PLAYER_ACTIONS.win(ITEM.Sword_great, 3);                  // 1000 WEAP

PLAYER_ACTIONS.win(ABILITY.Thunder, 8);                   // 83  ELEM
PLAYER_ACTIONS.win(ABILITY.Storm, 4);                     // 166  ELEM

PLAYER_ACTIONS.win(ABILITY.Petrify, 7);                   // 166  SPIR
PLAYER_ACTIONS.win(ABILITY.Lull, 2);                      // 1600 SPIR

PLAYER_ACTIONS.win(ITEM.Poison_darts, 11, true);           // 5   TOOL
PLAYER_ACTIONS.win(ITEM.Net, 6);                          // 200  TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_ice, 9, true);             // 20  ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_venom, 6, true);           // 40  ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_chaos, 3, true);           // 75  ALCH

// ===================
//hack MONSTER BEHAVIOR
// ===================
BESTIARY.setup_attacks("mountains/phoenix", {
  attack_amplitude: 0.8, // Between 0 and 1
  warning_time_s: 0.8,
  react_time_s: 0.3,
  variability: 0.6, // 1 = 100%
});



// ===================
//hack START
// ===================
BATTLE.operations.start(BESTIARY.intro("mountains/phoenix"));
