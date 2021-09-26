// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/world_hard/vadhaka.png", 'background');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Dagger, 0.2);
BATTLE.operations.add_loot("", 1);

// ===================
//hack PLAYER CAPABILITIES
// ===================

PLAYER_ACTIONS.kill_with_anything_over(700);

PLAYER_ACTIONS.win(ABILITY.Sneak, 2);                     // 83  DIPL
PLAYER_ACTIONS.win(ABILITY.Intimidate, 1);                // 666  DIPL

PLAYER_ACTIONS.win(ITEM.Dagger, 2);                       // 50  WEAP
PLAYER_ACTIONS.win(ITEM.Sword_wooden, 3);                 // 20  WEAP

PLAYER_ACTIONS.win(ABILITY.Thunder, 2);                   // 83  ELEM
PLAYER_ACTIONS.win(ABILITY.Asphyxiate, 1);                // 250  ELEM

PLAYER_ACTIONS.win(ABILITY.Petrify, 3);                   // 166  SPIR
PLAYER_ACTIONS.win(ABILITY.Confusion, 1);                 // 666  SPIR

PLAYER_ACTIONS.win(ITEM.Net, 1);                          // 200  TOO
PLAYER_ACTIONS.win(ITEM.Poison_darts, 5, true);           // 5   TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_fire, 2, true);            // 10  ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_ice, 2, true);             // 20  ALCH


PLAYER_ACTIONS.win(PARTYMEMBERS.BestFriend);
PLAYER_ACTIONS.win(PARTYMEMBERS.WiseOld);
PLAYER_ACTIONS.win(PARTYMEMBERS.TorturedSoul);



// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.6, // Between 0 and 1
  warning_time_s: 0.8,
  react_time_s: 0.4,
  time_variation: 0.95, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Vadhaka drowns you under hits from her many arms.", attack);
BATTLE.monster_actions.add_textual("The Vadhaka attacks you from all sides with her numerous limbs.", attack);
BATTLE.monster_actions.add_textual("The Vadhaka multiplies her assaults with her diverse weapons.", attack);



// ===================
//hack START
// ===================

BATTLE.operations.start("A Vigorous Vadhaka Vows Vengeance.");
