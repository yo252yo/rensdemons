// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/forests/flower.png", 'background');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Flower, 1);


// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(300);


// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.6, // Between 0 and 1
  warning_time_s: 0.8,
  react_time_s: 0.8,
  time_variation: 0.4, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Flower spreads out a cloud of strong fruity aroma. It's alluring power is affecting your senses.", attack);
BATTLE.monster_actions.add_textual("The Flower disseminates poisonous gas in the vicinity. You hold your breath while trying to escape.", attack);
BATTLE.monster_actions.add_textual("The Flower's scent reaches your nose, and you feel irresistibly drawn towards it...", attack);



// ===================
//hack START
// ===================

BATTLE.operations.start("A Flesh-eating Flower wants to Feed on your Face.");

//todo
