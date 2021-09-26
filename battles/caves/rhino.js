// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/caves/rhino.png", 'background');
PLAYER_ACTIONS.allow_flight();
AUDIO.music.interface.boss();

BATTLE.operations.add_loot(ITEM.Stone, 1);



// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(2000);
PLAYER_ACTIONS.kill_with_any_party_member(5);

PLAYER_ACTIONS.win(ABILITY.Sneak, 6);                     // 83  DIPL
PLAYER_ACTIONS.win(ABILITY.Intimidate, 5);                // 666  DIPL

PLAYER_ACTIONS.win(ITEM.Mace, 6);                         // 75  WEAP
PLAYER_ACTIONS.win(ITEM.Shield, 3);                       // 200  WEAP
PLAYER_ACTIONS.win(ITEM.Axe, 4);                          // 600  WEAP

PLAYER_ACTIONS.win(ABILITY.Ice_bolt, 8);                  // 50  ELEM
PLAYER_ACTIONS.win(ABILITY.Earthquake, 3);                // 666  ELEM

PLAYER_ACTIONS.win(ABILITY.Confusion, 4);                 // 666  SPIR
PLAYER_ACTIONS.win(ABILITY.Petrify, 7);                   // 166  SPIR

PLAYER_ACTIONS.win(ITEM.Rope, 8);                         // 100  TOOL
PLAYER_ACTIONS.win(ITEM.Net, 3);                          // 200  TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_ice, 8, true);             // 20  ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_venom, 7, true);           // 40  ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_decay, 4, true);           // 50  ALCH


// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.85, // Between 0 and 1
  warning_time_s: 0.8,
  react_time_s: 0.8,
  variability: 0.2, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Rhino stomps the ground with a heavy paw. The whole cavern trembles around. Sharp rocks and stalactites fall from the ceiling in a flurry of projectiles.", attack);
BATTLE.monster_actions.add_textual("The Rhino charges at you. With each step, the floor shakes under its massive weight. The rocks on its back shine slightly in the darkness.", attack);
BATTLE.monster_actions.add_textual("The Rhino slams into the nearest wall. Its mineral body leaves an imprint on the solid walls of the cave. The vibrations threaten to make the whole place crumble. A fissure opens up under your feet and grows larger by the minute.", attack);



// ===================
//hack START
// ===================

BATTLE.operations.start("A Rocky Rhino's Roar Resounds all around.");
