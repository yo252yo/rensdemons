// ===================
//hack INITIALIZATION
// ===================
BESTIARY.picture('world/ghost');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Goo, 0.1);
BATTLE.operations.add_loot("", 1);

// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(300);

PLAYER_ACTIONS.win(PARTYMEMBERS.UpbeatDojikko);
PLAYER_ACTIONS.win(PARTYMEMBERS.TorturedSoul);

PLAYER_ACTIONS.win(ABILITY.Ice_bolt, 2);
PLAYER_ACTIONS.win(ABILITY.Fireball, 5);              // 200  ELEM

PLAYER_ACTIONS.win(ABILITY.Poison, 3);                    // 75   SPIR
PLAYER_ACTIONS.win(ABILITY.Confusion, 1);                    // 150  SPIR

PLAYER_ACTIONS.win(ABILITY.Circumvent, 3);                // 100  DIPL
PLAYER_ACTIONS.win(ABILITY.Persuade, 1);                  // 500  DIPL

PLAYER_ACTIONS.win(ITEM.Elixir_decay, 1, true);           // 150  ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_chaos, 1, true);           // 200  ALCH

PLAYER_ACTIONS.win(ITEM.Sword_wooden, 5);                 // 20   WEAP
PLAYER_ACTIONS.win(ITEM.Dagger, 3);                       // 75   WEAP

PLAYER_ACTIONS.win(ITEM.Rope, 1);                         // 100  TOOL
PLAYER_ACTIONS.win(ITEM.Net, 1);                          // 200  TOOL

// ===================
//hack MONSTER BEHAVIOR
// ===================
BESTIARY.setup_attacks("world/ghost", {
  attack_amplitude: 0.3, // Between 0 and 1
  warning_time_s: 1.3,
  react_time_s: 0.5,
  variability: 0.8, // 1 = 100%
});


// ===================
//hack START
// ===================

BATTLE.operations.start(BESTIARY.intro("world/ghost"));
