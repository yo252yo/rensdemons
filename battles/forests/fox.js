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

PLAYER_ACTIONS.useless(ABILITY.Ice_bolt, 1);                  // 100  ELEM
PLAYER_ACTIONS.win(ABILITY.Thunder, 3);                   // 150  ELEM
PLAYER_ACTIONS.win(ABILITY.Storm, 2);                     // 200  ELEM

PLAYER_ACTIONS.win(ABILITY.Poison, 6);                    // 75   SPIR
PLAYER_ACTIONS.useless(ABILITY.Shrink, 1);                    // 150  SPIR
PLAYER_ACTIONS.useless(ABILITY.Petrify, 2);                   // 300  SPIR

PLAYER_ACTIONS.win(ABILITY.Circumvent, 3);                // 100  DIPL
PLAYER_ACTIONS.useless(ABILITY.Sneak, 2);                     // 200  DIPL
PLAYER_ACTIONS.useless(ABILITY.Persuade, 1);                  // 500  DIPL

PLAYER_ACTIONS.useless(ITEM.Elixir_ice, 1, true);             // 50   ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_venom, 1, true);           // 100  ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_chaos, 1, true);           // 200  ALCH

PLAYER_ACTIONS.useless(ITEM.Mace, 4);                         // 100  WEAP
PLAYER_ACTIONS.win(ITEM.Shield, 1);                       // 200  WEAP
PLAYER_ACTIONS.win(ITEM.Spear, 2);                        // 250  WEAP

PLAYER_ACTIONS.useless(ITEM.Poison_darts, 3, true);           // 10   TOOL
PLAYER_ACTIONS.useless(ITEM.Rope, 1);                         // 100  TOOL
PLAYER_ACTIONS.win(ITEM.Net, 1);                          // 200  TOOL

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
