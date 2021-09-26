// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/caves/lizard.png", 'background');
PLAYER_ACTIONS.allow_flight();
AUDIO.music.interface.boss();

BATTLE.operations.add_loot(ITEM.Stone, 1);
BATTLE.operations.add_loot(ITEM.Meat, 1);



// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(2000);
PLAYER_ACTIONS.kill_with_any_party_member(4);

PLAYER_ACTIONS.win(ABILITY.Sneak, 9);                     // 83  DIPL
PLAYER_ACTIONS.win(ABILITY.Persuade, 4);                  // 250  DIPL

PLAYER_ACTIONS.win(ITEM.Dagger, 8);                       // 50  WEAP
PLAYER_ACTIONS.win(ITEM.Spear, 5);                        // 250  WEAP
PLAYER_ACTIONS.win(ITEM.Axe, 3);                          // 600  WEAP

PLAYER_ACTIONS.win(ABILITY.Thunder, 7);                   // 83  ELEM
PLAYER_ACTIONS.win(ABILITY.Asphyxiate, 4);                // 250  ELEM

PLAYER_ACTIONS.win(ABILITY.Confusion, 6);                 // 666  SPIR
PLAYER_ACTIONS.win(ABILITY.Lull, 2);                      // 1600 SPIR

PLAYER_ACTIONS.win(ITEM.Poison_darts, 12, true);           // 5   TOOL
PLAYER_ACTIONS.win(ITEM.Rope, 7);                         // 100  TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_vine, 9, true);            // 30  ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_decay, 6, true);           // 50  ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_chaos, 5, true);           // 75  ALCH


// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.7, // Between 0 and 1
  warning_time_s: 0.6,
  react_time_s: 0.3,
  variability: 0.8, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Lizard flails its enormous tail, wiping up masses of rocks all around and even yanking some from the walls of the cave. They all get thrown towards you at incredible speed.", attack);
BATTLE.monster_actions.add_textual("The Lizard slides and crawls to the ceiling of the cavern, above you. With an agility that you wouldn't expect from its size, it then immediately jumps on you, maw opened, trying to squish you under its colossal body.", attack);
BATTLE.monster_actions.add_textual("The Lizard slithers towards you through the darkness. It slides around you in the shadows at a surprising speed, making it hard to know where you need to defend. It almost escapes your sight a few times. Then it jumps on you for the strike.", attack);



// ===================
//hack START
// ===================

BATTLE.operations.start("A Large Lizard Looms over the Land.");
