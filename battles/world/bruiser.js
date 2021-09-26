// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/world_hard/bruiser.png", 'background');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Mace, 0.1);
BATTLE.operations.add_loot("", 2);



// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(700);


PLAYER_ACTIONS.win(ABILITY.Sneak, 3);                     // 83  DIPL
PLAYER_ACTIONS.win(ABILITY.Persuade, 1);                  // 250  DIPL

PLAYER_ACTIONS.win(ITEM.Mace, 2);                         // 75  WEAP
PLAYER_ACTIONS.win(ITEM.Shield, 1);                       // 200  WEAP

PLAYER_ACTIONS.win(ABILITY.Asphyxiate, 2);                // 250  ELEM
PLAYER_ACTIONS.win(ABILITY.Earthquake, 2);                // 666  ELEM

PLAYER_ACTIONS.win(ABILITY.Shrink, 3);                    // 66  SPIR
PLAYER_ACTIONS.win(ABILITY.Petrify, 1);                   // 166  SPIR

PLAYER_ACTIONS.win(ITEM.Arrow, 5, true);                  // 2   TOOL
PLAYER_ACTIONS.win(ITEM.Net, 1);                          // 200  TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_vine, 3, true);            // 30  ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_decay, 2, true);           // 50  ALCH



PLAYER_ACTIONS.win(PARTYMEMBERS.PreciousChild);
PLAYER_ACTIONS.win(PARTYMEMBERS.DisguisedPrincess);
PLAYER_ACTIONS.win(PARTYMEMBERS.DumbMuscles);





// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.5, // Between 0 and 1
  warning_time_s: 0.5,
  react_time_s: 0.9,
  time_variation: 0.4, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Bruiser slams you with its heavy mace.", attack);
BATTLE.monster_actions.add_textual("The Bruiser spins around, holding its spiked bludgeon.", attack);
BATTLE.monster_actions.add_textual("The Bruiser chains up slow but powerful hits.", attack);



// ===================
//hack START
// ===================

BATTLE.operations.start("A Brutal Bruiser thinks you're Begging for a Beating.");
