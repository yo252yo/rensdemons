// ===================
//hack INITIALIZATION
// ===================
BESTIARY.picture('trial/rodent');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Meat, 0.1);
BATTLE.operations.add_loot(ITEM.Bone, 1);
BATTLE.operations.add_loot("", 1);

// ===================
//hack PLAYER CAPABILITIES
// ===================

PLAYER_ACTIONS.useless(ABILITY.Pray);
PLAYER_ACTIONS.useless(ITEM.Stick);

PLAYER_ACTIONS.win(ITEM.Fang, 1, true);
PLAYER_ACTIONS.win(ITEM.Elixir_fire, 1, true);
PLAYER_ACTIONS.win(ITEM.Bone, 1, true);

PLAYER_ACTIONS.add_spoiler();

// ===================
//hack MONSTER BEHAVIOR
// ===================
BESTIARY.setup_attacks("trial/rodent", {
  attack_amplitude: 0.1, // Between 0 and 1
  warning_time_s: 0.7,
  react_time_s: 1.3,
  variability: 0.4, // 1 = 100%
});

// ===================
//hack START
// ===================
BATTLE.operations.start(BESTIARY.intro("trial/rodent"));
