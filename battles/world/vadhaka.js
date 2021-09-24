// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/world_hard/vadhaka.png", 'background');
PLAYER_ACTIONS.allow_flight();

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
