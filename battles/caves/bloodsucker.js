// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/caves/bloodsucker.png", 'background');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Feather, 1);
BATTLE.operations.add_loot("", 2);


// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(700);


PLAYER_ACTIONS.win(ABILITY.Sneak, 2);                     // 83  DIPL
PLAYER_ACTIONS.win(ABILITY.Intimidate, 1);                // 666  DIPL

PLAYER_ACTIONS.win(ITEM.Dagger, 3);                       // 50  WEAP
PLAYER_ACTIONS.win(ITEM.Axe, 1);                          // 600  WEAP

PLAYER_ACTIONS.win(ABILITY.Storm, 1);                     // 166  ELEM
PLAYER_ACTIONS.win(ABILITY.Asphyxiate, 1);                // 250  ELEM

PLAYER_ACTIONS.win(ABILITY.Poison, 3);                    // 25  SPIR
PLAYER_ACTIONS.win(ABILITY.Confusion, 1);                 // 666  SPIR

PLAYER_ACTIONS.win(ITEM.Arrow, 5, true);                  // 2   TOOL
PLAYER_ACTIONS.win(ITEM.Rope, 1);                         // 100  TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_venom, 2, true);           // 40  ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_decay, 1, true);           // 50  ALCH


PLAYER_ACTIONS.win(PARTYMEMBERS.UpbeatDojikko);
PLAYER_ACTIONS.win(PARTYMEMBERS.FemmeFatale);
PLAYER_ACTIONS.win(PARTYMEMBERS.WiseOld);



// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.3, // Between 0 and 1
  warning_time_s: 0.4,
  react_time_s: 0.6,
  time_variation: 0.6, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Bloodusucker extends a long trunk towards your bare skin.", attack);
BATTLE.monster_actions.add_textual("The Bloodusucker faces you mid-air, waiting for an opening to dive for your blood.", attack);
BATTLE.monster_actions.add_textual("The Bloodusucker flutters like a moth and tries to grab your face.", attack);



// ===================
//hack START
// ===================

BATTLE.operations.start("A Bizzare Bloodusucker Buzzes near your Body.");
