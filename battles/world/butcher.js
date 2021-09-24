// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/world_hard/butcher.png", 'background');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Sword_iron, 0.1);
BATTLE.operations.add_loot("", 2);



// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(700);


PLAYER_ACTIONS.win(ABILITY.Circumvent, 1);                // 33  DIPL
PLAYER_ACTIONS.win(ABILITY.Sneak, 1);                     // 83  DIPL

PLAYER_ACTIONS.win(ITEM.Spear, 3);                        // 250  WEAP
PLAYER_ACTIONS.win(ITEM.Axe, 1);                          // 600  WEAP

PLAYER_ACTIONS.win(ABILITY.Fireball, 4);                  // 10  ELEM
PLAYER_ACTIONS.win(ABILITY.Earthquake, 1);                // 666  ELEM

PLAYER_ACTIONS.win(ABILITY.Poison, 3);                    // 25  SPIR
PLAYER_ACTIONS.win(ABILITY.Petrify, 1);                   // 166  SPIR

PLAYER_ACTIONS.win(ITEM.Arrow, 5, true);                  // 2   TOOL
PLAYER_ACTIONS.win(ITEM.Poison_darts, 5, true);           // 5   TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_vine, 2, true);            // 30  ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_venom, 3, true);           // 40  ALCH



PLAYER_ACTIONS.win(PARTYMEMBERS.SnobRich);
PLAYER_ACTIONS.win(PARTYMEMBERS.GeniusProdigy);
PLAYER_ACTIONS.win(PARTYMEMBERS.TorturedSoul);


// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.8, // Between 0 and 1
  warning_time_s: 0.3,
  react_time_s: 1.0,
  time_variation: 0.3, // 1 = 100%
};


BATTLE.monster_actions.add_textual("The Butcher smashes you with the biggest knife you've ever seen.", attack);
BATTLE.monster_actions.add_textual("The Butcher hits you with a blade as big as yourself.", attack);
BATTLE.monster_actions.add_textual("The Butcher slices through the air with precision, as if to cut you in half.", attack);



// ===================
//hack START
// ===================
// basis for a barbacue/buffet
BATTLE.operations.start("A Butcher Beholds you as the Basis for his Buffet.");
