// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/caves/mole.png", 'background');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Meat, 0.5);
BATTLE.operations.add_loot(ITEM.Bone, 1);
BATTLE.operations.add_loot("", 1);


// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(700);


PLAYER_ACTIONS.win(ABILITY.Sneak, 3);                     // 83  DIPL
PLAYER_ACTIONS.win(ABILITY.Persuade, 2);                  // 250  DIPL

PLAYER_ACTIONS.win(ITEM.Mace, 1);                         // 75  WEAP
PLAYER_ACTIONS.win(ITEM.Shield, 1);                       // 200  WEAP

PLAYER_ACTIONS.win(ABILITY.Thunder, 3);                   // 83  ELEM
PLAYER_ACTIONS.win(ABILITY.Storm, 1);                     // 166  ELEM

PLAYER_ACTIONS.win(ABILITY.Poison, 3);                    // 25  SPIR
PLAYER_ACTIONS.win(ABILITY.Confusion, 1);                 // 666  SPIR

PLAYER_ACTIONS.win(ITEM.Rope, 2);                         // 100  TOOL
PLAYER_ACTIONS.win(ITEM.Net, 1);                          // 200  TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_ice, 3, true);             // 20  ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_chaos, 2, true);            // 30  ALCH


PLAYER_ACTIONS.win(PARTYMEMBERS.RetiredProtector);
PLAYER_ACTIONS.win(PARTYMEMBERS.PreciousChild);
PLAYER_ACTIONS.win(PARTYMEMBERS.BestFriend);



// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.2, // Between 0 and 1
  warning_time_s: 0.1,
  react_time_s: 0.8,
  time_variation: 0.9, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Mole burrows itself. Any second, it will come out under you.", attack);
BATTLE.monster_actions.add_textual("The Mole slashes you with its unexpectedly long and sharp claws.", attack);
BATTLE.monster_actions.add_textual("The Mole digs under you, and the ground becomes shaky. You start to get engulfed...", attack);



// ===================
//hack START
// ===================

BATTLE.operations.start("A Measly Mole Moves in the Muck.");
