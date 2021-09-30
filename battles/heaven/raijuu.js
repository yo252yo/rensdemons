// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/heaven/raijuu.png", 'background');
PLAYER_ACTIONS.allow_flight();


BATTLE.operations.add_loot(ITEM.Elixir_chaos, 1);

// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(1500);


PLAYER_ACTIONS.win(ABILITY.Sneak, 4);                     // 83  DIPL

PLAYER_ACTIONS.win(ITEM.Shield, 2);                       // 200  WEAP

PLAYER_ACTIONS.win(ABILITY.Asphyxiate, 2);                // 250  ELEM

PLAYER_ACTIONS.win(ABILITY.Shrink, 4);                    // 66  SPIR

PLAYER_ACTIONS.win(ITEM.Net, 2);                          // 200  TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_chaos, 3, true);           // 75  ALCH


PLAYER_ACTIONS.win(PARTYMEMBERS.UpbeatDojikko);



// ===================
//hack MONSTER BEHAVIOR
// ===================

var attack = {
  attack_amplitude: 0.3, // Between 0 and 1
  warning_time_s: 0.1,
  react_time_s: 0.4,
  variability: 0.7, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Raijuu doesn't do anything. It's simply pulsating light that you can almost feel go through your body. This can't be good.", attack);
BATTLE.monster_actions.add_textual("The Raijuu is not moving. The air is cracking around it. Who knows what its proximity is doing to your flesh...", attack);
BATTLE.monster_actions.add_textual("The Raijuu is static. Its light aura permeates your every cell, irradiating you to your core.", attack);


// ===================
//hack START
// ===================

BATTLE.operations.start("A Rebel Raijuu's Radiation Reverberates around.");
