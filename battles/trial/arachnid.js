// ===================
//hack INITIALIZATION
// ===================
BESTIARY.picture('trial/arachnid');
PLAYER_ACTIONS.allow_flight();

// ===================
//hack PLAYER CAPABILITIES
// ===================


PLAYER_ACTIONS.useless(ABILITY.Pray);
PLAYER_ACTIONS.useless(ITEM.Stick);
PLAYER_ACTIONS.useless(ITEM.Bone);

PLAYER_ACTIONS.win(ITEM.Stone, 2);
PLAYER_ACTIONS.win(ITEM.Sword_wooden, 1);
PLAYER_ACTIONS.win(ITEM.Elixir_fire, 1, true);

PLAYER_ACTIONS.add_spoiler();

// ===================
//hack MONSTER BEHAVIOR
// ===================


BESTIARY.setup_attacks("trial/arachnid", {
  attack_amplitude: 0.3, // Between 0 and 1
  warning_time_s: 3.0,
  react_time_s: 0.5,
  variability: 0.4, // 1 = 100%
});


// ===================
//hack START
// ===================

BATTLE.operations.start(BESTIARY.intro("trial/arachnid"));
