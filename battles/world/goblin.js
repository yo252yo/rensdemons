// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/world_easy/goblin.png", 'background');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Stick, 1);
BATTLE.operations.add_loot("", 9);

// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(300);

PLAYER_ACTIONS.win(PARTYMEMBERS.StreetSmart);
PLAYER_ACTIONS.win(PARTYMEMBERS.SnobRich);
PLAYER_ACTIONS.win(PARTYMEMBERS.BestFriend);

PLAYER_ACTIONS.useless(PARTYMEMBERS.WiseOld);
PLAYER_ACTIONS.useless(PARTYMEMBERS.TraitorFisher);
PLAYER_ACTIONS.useless(PARTYMEMBERS.FemmeFatale);

// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.2, // Between 0 and 1
  warning_time_s: 1.1,
  react_time_s: 0.7,
  time_variation: 0.6, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Goblin slaps you with its stick.", attack);
BATTLE.monster_actions.add_textual("The Goblin shakes its vegetal weapon in your direction. Maybe it's cursing you...", attack);
BATTLE.monster_actions.add_textual("The Goblin waves its bouquet around while mumbling something that sounds like an incantation.", attack);



// ===================
//hack START
// ===================
BATTLE.operations.start("A Grumpy Goblin Grasps some Grass.");

//todo
