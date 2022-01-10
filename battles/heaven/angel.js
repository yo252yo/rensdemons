// ===================
//hack INITIALIZATION
// ===================
BESTIARY.picture('heaven/angel');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Feather, 1);


// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(1500);


PLAYER_ACTIONS.win(ABILITY.Intimidate, 2);                // 666  DIPL

PLAYER_ACTIONS.win(ITEM.Spear, 3);                        // 250  WEAP

PLAYER_ACTIONS.win(ABILITY.Incinerate, 1);                // 1000 ELEM

PLAYER_ACTIONS.win(ABILITY.Confusion, 1);                 // 666  SPIR

PLAYER_ACTIONS.win(ITEM.Net, 4);                          // 200  TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_vine, 6, true);            // 30  ALCH



PLAYER_ACTIONS.win(PARTYMEMBERS.DisguisedPrincess);



// ===================
//hack MONSTER BEHAVIOR
// ===================

var attack = {
  attack_amplitude: 0.8, // Between 0 and 1
  warning_time_s: 0.4,
  react_time_s: 0.4,
  variability: 0.6, // 1 = 100%
};


BATTLE.monster_actions.add_textual("The Angel congratulates you for making it this far considering your lack of abilities. They're just saying that for you!", attack);
BATTLE.monster_actions.add_textual("The Angel snarks mockingly at you, sapping your confidence. They're just trying to help you grow!", attack);
BATTLE.monster_actions.add_textual("The Angel recounts your past experiences, criticizing and ridiculing them. They're trying to help you!", attack);



// ===================
//hack START
// ===================

BATTLE.operations.start(BESTIARY.intro("heaven/angel"));
