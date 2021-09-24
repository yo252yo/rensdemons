// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/forests/blob.png", 'background');
PLAYER_ACTIONS.allow_flight();
AUDIO.music.interface.boss();

PLAYER_ACTIONS.kill_with_any_party_member(5);
/*T2 WI
BATTLE.operations.add_loot(ITEM.Meat, 0.5);
BATTLE.operations.add_loot(ITEM.Bone, 1);
BATTLE.operations.add_loot("", 2);

// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(300);

PLAYER_ACTIONS.win(PARTYMEMBERS.StreetSmart);
PLAYER_ACTIONS.win(PARTYMEMBERS.SavageChild);

PLAYER_ACTIONS.win(ABILITY.Ice_bolt, 5);                  // 100  ELEM
PLAYER_ACTIONS.win(ABILITY.Asphyxiate, 1);                // 500  ELEM

PLAYER_ACTIONS.win(ABILITY.Petrify, 1);                   // 300  SPIR

PLAYER_ACTIONS.win(ABILITY.Circumvent, 3);                // 100  DIPL

PLAYER_ACTIONS.win(ITEM.Elixir_ice, 2, true);             // 50   ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_vine, 1, true);            // 75   ALCH

PLAYER_ACTIONS.win(ITEM.Mace, 4);                         // 100  WEAP
PLAYER_ACTIONS.win(ITEM.Spear, 1);                        // 250  WEAP

PLAYER_ACTIONS.win(ITEM.Rope, 3);                         // 100  TOOL
*/
// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.9, // Between 0 and 1
  warning_time_s: 0.1,
  react_time_s: 1.2,
  time_variation: 0.5, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Blob's gelatinous body deforms and slides towards you. At this rate, it won't be long before you're engulfed in the green goo.", attack);
BATTLE.monster_actions.add_textual("The Blob shakes and jumps in the air. Its shape wobbles as it flies over you and its shadow surrounds you. In a few seconds, it will crash back on the ground, no doubt crushing you in the process.", attack);
BATTLE.monster_actions.add_textual("The Blob splits up in a dozen smaller versions of itself, and then splits up some more. Pretty soon, you find yourself surrounded by a see of lush jelly crawling towards you from all sides.", attack);



// ===================
//hack START
// ===================

BATTLE.operations.start("A Burgeoning Blob Buds and Bloats.");
