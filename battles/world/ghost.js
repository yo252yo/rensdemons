// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/world_easy/ghost.png", 'background');
PLAYER_ACTIONS.allow_flight();

// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(300);

PLAYER_ACTIONS.win(PARTYMEMBERS.UpbeatDojikko);
PLAYER_ACTIONS.win(PARTYMEMBERS.TorturedSoul);

PLAYER_ACTIONS.win(ABILITY.Ice_bolt, 2);                  // 100  ELEM
PLAYER_ACTIONS.win(ABILITY.Storm, 1);                     // 200  ELEM

PLAYER_ACTIONS.win(ABILITY.Poison, 3);                    // 75   SPIR
PLAYER_ACTIONS.win(ABILITY.Shrink, 1);                    // 150  SPIR

PLAYER_ACTIONS.win(ABILITY.Circumvent, 3);                // 100  DIPL
PLAYER_ACTIONS.win(ABILITY.Persuade, 1);                  // 500  DIPL

PLAYER_ACTIONS.win(ITEM.Elixir_decay, 1, true);           // 150  ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_chaos, 1, true);           // 200  ALCH

PLAYER_ACTIONS.win(ITEM.Sword_wooden, 5);                 // 20   WEAP
PLAYER_ACTIONS.win(ITEM.Dagger, 3);                       // 75   WEAP

PLAYER_ACTIONS.win(ITEM.Rope, 1);                         // 100  TOOL
PLAYER_ACTIONS.win(ITEM.Net, 1);                          // 200  TOOL

// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.3, // Between 0 and 1
  warning_time_s: 1.3,
  react_time_s: 0.5,
  time_variation: 0.8, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Ghost extends a vapory arm towards you and burrows it deep in your chest. The cold pierces through you.", attack);
BATTLE.monster_actions.add_textual("The Ghost floats around you, grinning menacingly.", attack);
BATTLE.monster_actions.add_textual("The Ghost charges through you. It feels as if you've been in ice cold water. You think a piece of your soul is missing.", attack);



// ===================
//hack START
// ===================
BATTLE.operations.start("A Ghastly Ghost Glows Gloomily.");
