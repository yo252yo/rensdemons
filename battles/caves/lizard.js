// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/caves/lizard.png", 'background');
PLAYER_ACTIONS.allow_flight();

/*T2 WIP
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

// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.3, // Between 0 and 1
  warning_time_s: 0.2,
  react_time_s: 1.5,
  time_variation: 0.2, // 1 = 100%
};*/

BATTLE.monster_actions.add_textual("The Lizard flails its enormous tail, wiping up masses of rocks all around and even yanking some from the walls of the cave. They all get thrown towards you at incredible speed.", attack);
BATTLE.monster_actions.add_textual("The Lizard slides and crawls to the ceiling of the cavern, above you. With an agility that you wouldn't expect from its size, it then immediately jumps on you, maw opened, trying to squish you under its colossal body.", attack);
BATTLE.monster_actions.add_textual("The Lizard slithers towards you through the darkness. It slides around you in the shadows at a surprising speed, making it hard to know where you need to defend. It almost escapes your sight a few times. Then it jumps on you for the strike.", attack);



// ===================
//hack START
// ===================

BATTLE.operations.start("A Large Lizard Looms over the Land.");
