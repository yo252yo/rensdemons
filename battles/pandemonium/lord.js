// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/pandemonium/maou.png", 'background');
PLAYER_ACTIONS.allow_flight();
AUDIO.music.interface.boss();


// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(10000); // only artifacts
PLAYER_ACTIONS.kill_with_any_party_member(9);

PLAYER_ACTIONS.win(ABILITY.Mystify, 2);                   // 2500 DIPL

PLAYER_ACTIONS.win(ITEM.Sword_great, 5);                  // 1000 WEAP

PLAYER_ACTIONS.win(ABILITY.Summon, 2);                    // 2500 ELEM

PLAYER_ACTIONS.win(ABILITY.Charm, 2);                     // 2500 SPIR

PLAYER_ACTIONS.win(ITEM.Net, 8);                          // 200  TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_chaos, 8, true);           // 75  ALCH




// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.85, // Between 0 and 1
  warning_time_s: 0.0,
  react_time_s: 0.3,
  variability: 0.6, // 1 = 100%
};


BATTLE.monster_actions.add_textual("WIP BOSS START TEXT.", attack);
// ===================
//hack START
// ===================

BATTLE.operations.start("WIP BOSS START TEXT.");
