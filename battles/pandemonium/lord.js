// ===================
//hack INITIALIZATION
// ===================
BESTIARY.picture('pandemonium/lord');
PLAYER_ACTIONS.allow_flight();
AUDIO.music.interface.boss();

STATS.record.flag("FoughtMaou");

// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(10000); // only artifacts
PLAYER_ACTIONS.kill_with_any_party_member(9);

PLAYER_ACTIONS.win(ABILITY.Mystify, 2);                   // 2500 DIPL

PLAYER_ACTIONS.win(ITEM.Sword_great, 5);                  // 1000 WEAP

PLAYER_ACTIONS.win(ABILITY.Summon, 2);                    // 2500 ELEM

PLAYER_ACTIONS.win(ABILITY.Charm, 2);                     // 2500 SPIR

PLAYER_ACTIONS.win(ITEM.Net, 8);                          // 200  TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_chaos, 8, true);           // 75  ALCH



// ===================
//hack MONSTER BEHAVIOR
// ===================
BESTIARY.setup_attacks("pandemonium/lord", {
  attack_amplitude: 0.85, // Between 0 and 1
  warning_time_s: 0.0,
  react_time_s: 0.3,
  variability: 0.6, // 1 = 100%
});


// ===================
//hack START
// ===================

BATTLE.operations.start([
  BESTIARY.intro("pandemonium/lord"),
  `$$demon_lord$: "It's such a shame... It looks like I will have to crush you like I did all the others!"`,
  `$$Ren$: "Big talk for someone who's about to die!"`,
  `$$demon_lord$: "Enough! I'll show you by force how little you matter!"`
]);
