// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/forests/fox.png", 'background');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Bone, 1);
BATTLE.operations.add_loot("", 4);


// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(300);


PLAYER_ACTIONS.win(PARTYMEMBERS.GeniusProdigy);
PLAYER_ACTIONS.win(PARTYMEMBERS.WiseOld);

PLAYER_ACTIONS.useless(PARTYMEMBERS.SnobRich);
PLAYER_ACTIONS.useless(PARTYMEMBERS.DisguisedPrincess);

// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.05, // Between 0 and 1
  warning_time_s: 1.2,
  react_time_s: 0.3,
  time_variation: 0.7, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Fox jumps at you. The momentum makes you tumble.", attack);
BATTLE.monster_actions.add_textual("The Fox hits you with a front paw. The sharp claws leave marks in your skin.", attack);
BATTLE.monster_actions.add_textual("The Fox bites you. Its sharp teeth and powerful jaw penetrate deep in your flesh.", attack);



// ===================
//hack START
// ===================

BATTLE.operations.start("A Frisky Fox Feints Flight.");

//todo
