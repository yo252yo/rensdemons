// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/waters/triton.png", 'background');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Meat, 0.5);
BATTLE.operations.add_loot(ITEM.Scale, 0.5);
BATTLE.operations.add_loot(ITEM.Seashell, 1);
BATTLE.operations.add_loot("", 1);



// ===================
//hack PLAYER CAPABILITIES
// ===================

PLAYER_ACTIONS.kill_with_anything_over(700);

PLAYER_ACTIONS.win(ABILITY.Circumvent, 4);                // 33  DIPL
PLAYER_ACTIONS.win(ABILITY.Sneak, 1);                     // 83  DIPL

PLAYER_ACTIONS.win(ITEM.Shield, 2);                       // 200  WEAP
PLAYER_ACTIONS.win(ITEM.Sword_iron, 1);                   // 500  WEAP

PLAYER_ACTIONS.win(ABILITY.Fireball, 4);                  // 10  ELEM
PLAYER_ACTIONS.win(ABILITY.Storm, 1);                     // 166  ELEM

PLAYER_ACTIONS.win(ABILITY.Poison, 4);                    // 25  SPIR
PLAYER_ACTIONS.win(ABILITY.Shrink, 2);                    // 66  SPIR

PLAYER_ACTIONS.win(ITEM.Rope, 1);                         // 100  TOOL
PLAYER_ACTIONS.win(ITEM.Net, 3);                          // 200  TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_fire, 3, true);            // 10  ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_venom, 1, true);           // 40  ALCH


PLAYER_ACTIONS.win(PARTYMEMBERS.SnobRich);
PLAYER_ACTIONS.win(PARTYMEMBERS.FemmeFatale);
PLAYER_ACTIONS.win(PARTYMEMBERS.UpbeatDojikko);





// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.6, // Between 0 and 1
  warning_time_s: 0.2,
  react_time_s: 1.0,
  time_variation: 0.7, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Triton waves its hook towards you.", attack);
BATTLE.monster_actions.add_textual("The Triton charges at you with his deadly javelin.", attack);
BATTLE.monster_actions.add_textual("The Triton tries to slit your throat with his weapon.", attack);



// ===================
//hack START
// ===================

BATTLE.operations.start("A Triton Trooper Treads the Tides.");
