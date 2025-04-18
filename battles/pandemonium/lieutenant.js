// ===================
//hack INITIALIZATION
// ===================
BESTIARY.picture('pandemonium/lieutenant');
PLAYER_ACTIONS.allow_flight();
AUDIO.music.interface.boss();



// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(10000); // only artifacts
PLAYER_ACTIONS.kill_with_any_party_member(7);



PLAYER_ACTIONS.win(ABILITY.Intimidate, 5);                // 666  DIPL
PLAYER_ACTIONS.win(ABILITY.Mystify, 2);                   // 2500 DIPL

PLAYER_ACTIONS.win(ITEM.Axe, 5);                          // 600  WEAP
PLAYER_ACTIONS.win(ITEM.Sword_great, 4);                  // 1000 WEAP

PLAYER_ACTIONS.win(ABILITY.Earthquake, 5);                // 666  ELEM
PLAYER_ACTIONS.win(ABILITY.Incinerate, 4);                // 1000 ELEM
PLAYER_ACTIONS.win(ABILITY.Summon, 2);                    // 2500 ELEM

PLAYER_ACTIONS.win(ABILITY.Confusion, 5);                 // 666  SPIR
PLAYER_ACTIONS.win(ABILITY.Lull, 4);                      // 1600 SPIR
PLAYER_ACTIONS.win(ABILITY.Charm, 2);                     // 2500 SPIR

PLAYER_ACTIONS.win(ITEM.Net, 6);                          // 200  TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_decay, 8, true);           // 50  ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_chaos, 6, true);           // 75  ALCH



// ===================
//hack MONSTER BEHAVIOR
// ===================
BESTIARY.setup_attacks("pandemonium/lieutenant", {
  attack_amplitude: 0.9, // Between 0 and 1
  warning_time_s: 0.1,
  react_time_s: 0.5,
  variability: 0.95, // 1 = 100%
});



// ===================
//hack START
// ===================

BATTLE.operations.start([
  BESTIARY.intro("pandemonium/lieutenant"),
  `$$demon_lieutenant$: "So you really think you can take me over by brute force?"`,
  `$$Ren$: "Yes, the Goddess is with me! I always succeed, eventually. Nothing can go wrong!"`,
  `$$demon_lieutenant$ laughs out loud.`,
  `$$demon_lieutenant$: "Child, this kind of declaration is like begging for trouble! You might as well sign your death warrant yourself."`,
  `$$demon_lieutenant$: "Where has your precious Goddess been the few hundred years? Anyway, you made your choice. It's time for you to accept the consequences..."`
]);
