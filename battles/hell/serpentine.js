// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/hell/serpentine.png", 'background');
PLAYER_ACTIONS.allow_flight();


BATTLE.operations.add_loot(ITEM.Scale, 1);


// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(1500);


PLAYER_ACTIONS.win(ABILITY.Intimidate, 1);                // 666  DIPL

PLAYER_ACTIONS.win(ITEM.Sword_great, 1);                  // 1000 WEAP

PLAYER_ACTIONS.win(ABILITY.Asphyxiate, 3);                // 250  ELEM

PLAYER_ACTIONS.win(ABILITY.Confusion, 2);                 // 666  SPIR

PLAYER_ACTIONS.win(ITEM.Net, 3);                     // 100  TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_decay, 4, true);           // 50  ALCH



PLAYER_ACTIONS.win(PARTYMEMBERS.FemmeFatale);



// ===================
//hack MONSTER BEHAVIOR
// ===================

var attack = {
  attack_amplitude: 0.35, // Between 0 and 1
  warning_time_s: 0.5,
  react_time_s: 0.3,
  variability: 0.9, // 1 = 100%
};


BATTLE.monster_actions.add_textual("The Serpentine undulates lusciously her magnificent body, mesmerizing you with her charms.", attack);
BATTLE.monster_actions.add_textual("The Serpentine winks and blows you a kiss, beckoning you to come closer.", attack);
BATTLE.monster_actions.add_textual("The Serpentine makes indecent gestures in your direction, which does not fail to destabilize you.", attack);


// ===================
//hack START
// ===================

BATTLE.operations.start(BESTIARY.intro("hell/serpentine"));
