// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/pandemonium/beelzebub.png", 'background');
PLAYER_ACTIONS.allow_flight();
AUDIO.music.interface.boss();

// LOOT SOMETHING SPECIAL WIP BOSS START TEXT.


// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(10000); // only artifacts
PLAYER_ACTIONS.kill_with_any_party_member(7);



PLAYER_ACTIONS.win(ABILITY.Intimidate, 5);                // 666  DIPL
PLAYER_ACTIONS.win(ABILITY.Mystify, 2);                   // 2500 DIPL

PLAYER_ACTIONS.win(ITEM.Axe, 5);                          // 600  WEAP
PLAYER_ACTIONS.win(ITEM.Sword_great, 4);                  // 1000 WEAP

PLAYER_ACTIONS.win(ABILITY.Earthquake, 5);                // 666  ELEM
PLAYER_ACTIONS.win(ABILITY.Incinerate, 4);                // 1000 ELEM
PLAYER_ACTIONS.win(ABILITY.Summon, 2);                    // 2500 ELEM

PLAYER_ACTIONS.win(ABILITY.Confusion, 5);                 // 666  SPIR
PLAYER_ACTIONS.win(ABILITY.Lull, 4);                      // 1600 SPIR
PLAYER_ACTIONS.win(ABILITY.Charm, 2);                     // 2500 SPIR

PLAYER_ACTIONS.win(ITEM.Net, 6);                          // 200  TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_decay, 8, true);           // 50  ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_chaos, 6, true);           // 75  ALCH



// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.9, // Between 0 and 1
  warning_time_s: 0.1,
  react_time_s: 0.5,
  variability: 0.95, // 1 = 100%
};


BATTLE.monster_actions.add_textual("WIP BOSS START TEXT.", attack);

// ===================
//hack START
// ===================

BATTLE.operations.start("WIP BOSS START TEXT.");
