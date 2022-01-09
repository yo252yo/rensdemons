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


PLAYER_ACTIONS.win(ABILITY.Persuade, 4);                  // 250  DIPL

PLAYER_ACTIONS.win(ITEM.Sword_great, 1);                  // 1000 WEAP

PLAYER_ACTIONS.win(ABILITY.Thunder, 4);                   // 83  ELEM

PLAYER_ACTIONS.win(ABILITY.Shrink, 4);                    // 66  SPIR

PLAYER_ACTIONS.win(ITEM.Net, 2);                          // 200  TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_venom, 6, true);           // 40  ALCH

PLAYER_ACTIONS.win(PARTYMEMBERS.SnobRich);


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
BATTLE.operations.start(BESTIARY.intro("pandemonium/azazel"));
