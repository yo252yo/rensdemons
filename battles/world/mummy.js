// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/world_easy/mummy.png", 'background');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Linnens, 1);
BATTLE.operations.add_loot("", 9);

// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(300);

// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.3, // Between 0 and 1
  warning_time_s: 0.3,
  react_time_s: 1.5,
  time_variation: 0.05, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Mummy seizes your neck and starts choking you.", attack);
BATTLE.monster_actions.add_textual("The Mummy whips you with a loose bandages.", attack);
BATTLE.monster_actions.add_textual("The Mummy hits you with a slow but powerful punch.", attack);



// ===================
//hack START
// ===================
BATTLE.operations.start("A Meandering Mummy Moans Mournfully.");

//todo
