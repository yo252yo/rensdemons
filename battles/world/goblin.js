// ===================
//hack INITIALIZATION
// ===================
BESTIARY.picture('world/goblin');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Stick, 1);
BATTLE.operations.add_loot("", 1);

// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(300);

PLAYER_ACTIONS.win(PARTYMEMBERS.StreetSmart);
PLAYER_ACTIONS.win(PARTYMEMBERS.SnobRich);
PLAYER_ACTIONS.win(PARTYMEMBERS.BestFriend);

PLAYER_ACTIONS.win(ABILITY.Fireball, 3);                  // 50   ELEM
PLAYER_ACTIONS.win(ABILITY.Asphyxiate, 1);                // 500  ELEM

PLAYER_ACTIONS.win(ABILITY.Poison, 4);                    // 75   SPIR
PLAYER_ACTIONS.win(ABILITY.Petrify, 1);                   // 300  SPIR

PLAYER_ACTIONS.win(ABILITY.Sneak, 2);                     // 200  DIPL
PLAYER_ACTIONS.win(ABILITY.Persuade, 1);                  // 500  DIPL

PLAYER_ACTIONS.win(ITEM.Elixir_fire, 1, true);            // 20   ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_vine, 1, true);            // 75   ALCH

PLAYER_ACTIONS.win(ITEM.Mace, 1);                         // 100  WEAP
PLAYER_ACTIONS.win(ITEM.Shield, 1);                       // 200  WEAP

PLAYER_ACTIONS.win(ITEM.Poison_darts, 4, true);           // 10   TOOL
PLAYER_ACTIONS.win(ITEM.Arrow, 4, true);                  // 5    TOOL

// ===================
//hack MONSTER BEHAVIOR
// ===================
BESTIARY.setup_attacks("world/goblin", {
  attack_amplitude: 0.2, // Between 0 and 1
  warning_time_s: 1.1,
  react_time_s: 0.7,
  variability: 0.6, // 1 = 100%
});



// ===================
//hack START
// ===================
BATTLE.operations.start(BESTIARY.intro("world/goblin"));
