// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/pandemonium/azazel.png", 'background');
PLAYER_ACTIONS.allow_flight();


BATTLE.operations.add_loot(ITEM.Spear, 1);


// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(1500);

/*TODO T3 defense
PLAYER_ACTIONS.win(ABILITY.Persuade, 3);                  // 250  DIPL
PLAYER_ACTIONS.win(ABILITY.Intimidate, 1);                // 666  DIPL

PLAYER_ACTIONS.win(ITEM.Sword_iron, 2);                 // 20  WEAP
PLAYER_ACTIONS.win(ITEM.Dagger, 3);                       // 50  WEAP

PLAYER_ACTIONS.win(ABILITY.Thunder, 1);                   // 83  ELEM
PLAYER_ACTIONS.win(ABILITY.Storm, 2);                     // 166  ELEM

PLAYER_ACTIONS.win(ABILITY.Poison, 3);                    // 25  SPIR
PLAYER_ACTIONS.win(ABILITY.Confusion, 1);                 // 666  SPIR

PLAYER_ACTIONS.win(ITEM.Poison_darts, 5, true);           // 5   TOOL
PLAYER_ACTIONS.win(ITEM.Rope, 1);                         // 100  TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_venom, 3, true);           // 40  ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_chaos, 1, true);           // 75  ALCH


PLAYER_ACTIONS.win(PARTYMEMBERS.FemmeFatale);
PLAYER_ACTIONS.win(PARTYMEMBERS.WiseOld);
PLAYER_ACTIONS.win(PARTYMEMBERS.RetiredProtector);
*/




// ===================
//hack MONSTER BEHAVIOR
// ===================

var attack = {
  attack_amplitude: 0.5, // Between 0 and 1
  warning_time_s: 0.6,
  react_time_s: 0.2,
  variability: 0.5, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Azazel projects in your mind the voices of everyone you care about listing the worst things they think about you. Nobody likes you.", attack);
BATTLE.monster_actions.add_textual("The Azazel erases you from the memories of everyone you have known, plunging you in an abyss of loneliness. Nobody things about you.", attack);
BATTLE.monster_actions.add_textual("The Azazel postulates you that nobody really loves you. Everyone is using you, tolerating you or just pretending. You matter to nobody.", attack);

// ===================
//hack START
// ===================

BATTLE.operations.start("An Accursed Azazel Ambushes you with Aplomb.");
