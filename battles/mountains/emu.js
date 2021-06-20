// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/mountains/emu.png", 'background');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Feather, 1);
BATTLE.operations.add_loot("", 2);

// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(300);

// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.5, // Between 0 and 1
  warning_time_s: 1,
  react_time_s: 1,
  time_variation: 0.9, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Emu stomps the ground with its bird legs. It looks like it can't fly.", attack);
BATTLE.monster_actions.add_textual("The Emu pecks you violently.", attack);
BATTLE.monster_actions.add_textual("The Emu looks pretty upset, shaking its head and ruffling its feathers. It emits a loud screech.", attack);



// ===================
//hack START
// ===================
BATTLE.operations.start("An Enraged Emu Encroaches on your Ensemble.");

//todo
