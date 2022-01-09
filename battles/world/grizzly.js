// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/world_hard/grizzly.png", 'background');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Meat, 1);
BATTLE.operations.add_loot(ITEM.Bone, 1);
BATTLE.operations.add_loot(ITEM.Fur, 0.3);


// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(700);


PLAYER_ACTIONS.win(ABILITY.Circumvent, 3);                // 33  DIPL
PLAYER_ACTIONS.win(ABILITY.Intimidate, 1);                // 666  DIPL

PLAYER_ACTIONS.win(ITEM.Mace, 2);                         // 75  WEAP
PLAYER_ACTIONS.win(ITEM.Sword_iron, 2);                   // 500  WEAP

PLAYER_ACTIONS.win(ABILITY.Ice_bolt, 3);                  // 50  ELEM
PLAYER_ACTIONS.win(ABILITY.Earthquake, 1);                // 666  ELEM

PLAYER_ACTIONS.win(ABILITY.Shrink, 3);                    // 66  SPIR
PLAYER_ACTIONS.win(ABILITY.Petrify, 1);                   // 166  SPIR

PLAYER_ACTIONS.win(ITEM.Rope, 2);                         // 100  TOOL
PLAYER_ACTIONS.win(ITEM.Net, 1);                          // 200  TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_vine, 3, true);            // 30  ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_venom, 1, true);           // 40  ALCH



PLAYER_ACTIONS.win(PARTYMEMBERS.StreetSmart);
PLAYER_ACTIONS.win(PARTYMEMBERS.UpbeatDojikko);
PLAYER_ACTIONS.win(PARTYMEMBERS.DisguisedPrincess);



// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.8, // Between 0 and 1
  warning_time_s: 0.7,
  react_time_s: 0.9,
  variability: 0.4, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Grizzly roars at you and then charges.", attack);
BATTLE.monster_actions.add_textual("The Grizzly slaps you with a powerful paw.", attack);
BATTLE.monster_actions.add_textual("The Grizzly bites you in a quick maw movement.", attack);



// ===================
//hack START
// ===================

BATTLE.operations.start(BESTIARY.intro("world/grizzly"));
