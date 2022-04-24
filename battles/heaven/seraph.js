// ===================
//hack INITIALIZATION
// ===================
BESTIARY.picture('heaven/seraph');
PLAYER_ACTIONS.allow_flight();


BATTLE.operations.add_loot(ITEM.Feather, 1);
BATTLE.operations.add_loot(ITEM.Spear, 1);


// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(1500);


PLAYER_ACTIONS.win(ABILITY.Persuade, 1);                  // 250  DIPL

PLAYER_ACTIONS.win(ITEM.Mace, 6);                         // 75  WEAP

PLAYER_ACTIONS.win(ABILITY.Ice_bolt, 4);                  // 50  ELEM

PLAYER_ACTIONS.win(ABILITY.Petrify, 3);                   // 166  SPIR

PLAYER_ACTIONS.win(ITEM.Arrow, 8, true);           // 5   TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_decay, 4, true);           // 50  ALCH


PLAYER_ACTIONS.win(PARTYMEMBERS.RetiredProtector);

// ===================
//hack MONSTER BEHAVIOR
// ===================

BESTIARY.setup_attacks("heaven/seraph", {
  attack_amplitude: 0.6, // Between 0 and 1
  warning_time_s: 0.4,
  react_time_s: 0.1,
  variability: 0.6, // 1 = 100%
});


// ===================
//hack START
// ===================

BATTLE.operations.start(BESTIARY.intro("heaven/seraph"));
