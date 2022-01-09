// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/heaven/cherub.png", 'background');
PLAYER_ACTIONS.allow_flight();


BATTLE.operations.add_loot(ITEM.Feather, 1);
BATTLE.operations.add_loot(ITEM.Spear, 1);


// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(1500);


PLAYER_ACTIONS.win(ABILITY.Intimidate, 1);                // 666  DIPL

PLAYER_ACTIONS.win(ITEM.Sword_iron, 1);                   // 500  WEAP

PLAYER_ACTIONS.win(ABILITY.Earthquake, 2);                // 666  ELEM

PLAYER_ACTIONS.win(ABILITY.Lull, 2);                      // 1600 SPIR

PLAYER_ACTIONS.win(ITEM.Arrow, 7, true);           // 5   TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_chaos, 2, true);           // 75  ALCH


PLAYER_ACTIONS.win(PARTYMEMBERS.SnobRich);



// ===================
//hack MONSTER BEHAVIOR
// ===================

var attack = {
  attack_amplitude: 0.6, // Between 0 and 1
  warning_time_s: 0.1,
  react_time_s: 0.4,
  variability: 0.6, // 1 = 100%
};


BATTLE.monster_actions.add_textual("The Cherub crushes you under the weight of all expectations placed on you. How can you possibly accomplish what they expect from you?", attack);
BATTLE.monster_actions.add_textual("The Cherub stirs up all your regrets of things you should have done to overwhelm you with guilt. How did you let that happen?", attack);
BATTLE.monster_actions.add_textual("The Cherub simply notes that there is no way you can be the person that everyone wants you to be. It's okay to give up on yourself.", attack);


// ===================
//hack START
// ===================

BATTLE.operations.start(BESTIARY.intro("heaven/cherub"));
