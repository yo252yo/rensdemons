// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/world_easy/skeleton.png", 'background');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Bone, 5);
BATTLE.operations.add_loot(ITEM.Sword_wooden, 1);
BATTLE.operations.add_loot("", 14);

// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(300);

PLAYER_ACTIONS.win(PARTYMEMBERS.RetiredProtector);
PLAYER_ACTIONS.win(PARTYMEMBERS.DisguisedPrincess);
PLAYER_ACTIONS.win(PARTYMEMBERS.SavageChild);

PLAYER_ACTIONS.useless(PARTYMEMBERS.BestFriend);
PLAYER_ACTIONS.useless(PARTYMEMBERS.SnobRich);
PLAYER_ACTIONS.useless(PARTYMEMBERS.GeniusProdigy);



// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.1, // Between 0 and 1
  warning_time_s: 0.9,
  react_time_s: 0.9,
  time_variation: 0.3, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The skeleton hits you with its sword.", attack);
BATTLE.monster_actions.add_textual("The skeleton is quite skilled with its weapon, alternating between feints and hits.", attack);
BATTLE.monster_actions.add_textual("The skeleton swings its sword at you, while the rattling of the bones unsettles you.", attack);



// ===================
//hack START
// ===================

BATTLE.operations.start("A Snorty Skeleton Seizes its Sword.");


//todo
