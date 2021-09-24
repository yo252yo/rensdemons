// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/caves/rhino.png", 'background');
PLAYER_ACTIONS.allow_flight();
AUDIO.music.interface.boss();

BATTLE.operations.add_loot(ITEM.Stone, 1);










PLAYER_ACTIONS.kill_with_any_party_member(5);
/*T2 W
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
  attack_amplitude: 0.85, // Between 0 and 1
  warning_time_s: 0.8,
  react_time_s: 0.8,
  time_variation: 0.2, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Rhino stomps the ground with a heavy paw. The whole cavern trembles around. Sharp rocks and stalactites fall from the ceiling in a flurry of projectiles.", attack);
BATTLE.monster_actions.add_textual("The Rhino charges at you. With each step, the floor shakes under its massive weight. The rocks on its back shine slightly in the darkness.", attack);
BATTLE.monster_actions.add_textual("The Rhino slams into the nearest wall. Its mineral body leaves an imprint on the solid walls of the cave. The vibrations threaten to make the whole place crumble. A fissure opens up under your feet and grows larger by the minute.", attack);



// ===================
//hack START
// ===================

BATTLE.operations.start("A Rocky Rhino's Roar Resounds all around.");
