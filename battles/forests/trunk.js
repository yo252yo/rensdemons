// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/forests/trunk.png", 'background');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Stick, 1.5);
BATTLE.operations.add_loot("", 0.5);


// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(700);


PLAYER_ACTIONS.win(ABILITY.Circumvent, 3);                // 33  DIPL
PLAYER_ACTIONS.win(ABILITY.Intimidate, 1);                // 666  DIPL

PLAYER_ACTIONS.win(ITEM.Dagger, 4);                       // 50  WEAP
PLAYER_ACTIONS.win(ITEM.Sword_iron, 1);                   // 500  WEAP

PLAYER_ACTIONS.win(ABILITY.Thunder, 2);                   // 83  ELEM
PLAYER_ACTIONS.win(ABILITY.Earthquake, 1);                // 666  ELEM

PLAYER_ACTIONS.win(ABILITY.Poison, 3);                    // 25  SPIR
PLAYER_ACTIONS.win(ABILITY.Confusion, 1);                 // 666  SPIR

PLAYER_ACTIONS.win(ITEM.Rope, 3);                         // 100  TOOL
PLAYER_ACTIONS.win(ITEM.Net, 1);                          // 200  TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_vine, 2, true);            // 30  ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_venom, 2, true);           // 40  ALCH


PLAYER_ACTIONS.win(PARTYMEMBERS.TorturedSoul);
PLAYER_ACTIONS.win(PARTYMEMBERS.RetiredProtector);
PLAYER_ACTIONS.win(PARTYMEMBERS.DumbMuscles);



// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.5, // Between 0 and 1
  warning_time_s: 0.8,
  react_time_s: 0.5,
  time_variation: 0.1, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Trunk falls in your direction in a loud rumble.", attack);
BATTLE.monster_actions.add_textual("The Trunk rolls towards you at incredible speed.", attack);
BATTLE.monster_actions.add_textual("The Trunk extends a pointy twig to pierce your body.", attack);



// ===================
//hack START
// ===================

BATTLE.operations.start("A Terrifying Tottering Trunk Towers over you.");
