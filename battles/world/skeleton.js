// ===================
//hack INITIALIZATION
// ===================
BESTIARY.picture('world/skeleton');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Bone, 5);
BATTLE.operations.add_loot(ITEM.Sword_wooden, 1);
BATTLE.operations.add_loot("", 4);

// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(300);

PLAYER_ACTIONS.win(PARTYMEMBERS.RetiredProtector);
PLAYER_ACTIONS.win(PARTYMEMBERS.DisguisedPrincess);
PLAYER_ACTIONS.win(PARTYMEMBERS.SavageChild);

PLAYER_ACTIONS.win(ABILITY.Thunder, 3);
PLAYER_ACTIONS.win(ABILITY.Fireball, 2);                     // 200  ELEM

PLAYER_ACTIONS.win(ABILITY.Shrink, 3);                    // 150  SPIR
PLAYER_ACTIONS.win(ABILITY.Petrify, 2);                   // 300  SPIR

PLAYER_ACTIONS.win(ABILITY.Sneak, 3);                     // 200  DIPL
PLAYER_ACTIONS.win(ABILITY.Persuade, 1);                  // 500  DIPL

PLAYER_ACTIONS.win(ITEM.Elixir_fire, 2, true);            // 20   ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_ice, 2, true);             // 50   ALCH

PLAYER_ACTIONS.win(ITEM.Sword_wooden, 4);                 // 20   WEAP
PLAYER_ACTIONS.win(ITEM.Shield, 2);                       // 200  WEAP

PLAYER_ACTIONS.win(ITEM.Rope, 3);                         // 100  TOOL
PLAYER_ACTIONS.win(ITEM.Net, 3);                          // 200  TOOL


// ===================
//hack MONSTER BEHAVIOR
// ===================
BESTIARY.setup_attacks("world/skeleton", {
  attack_amplitude: 0.1, // Between 0 and 1
  warning_time_s: 0.9,
  react_time_s: 0.9,
  variability: 0.3, // 1 = 100%
});


// ===================
//hack START
// ===================
BATTLE.operations.start(BESTIARY.intro("world/skeleton"));
