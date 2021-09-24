// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/waters/serpent.png", 'background');
PLAYER_ACTIONS.allow_flight();
AUDIO.music.interface.boss();

PLAYER_ACTIONS.kill_with_any_party_member(5);

/*T2 WI
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
  attack_amplitude: 0.7, // Between 0 and 1
  warning_time_s: 0.2,
  react_time_s: 0.8,
  time_variation: 0.4, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Serpent swims in a circle, first slowly, then with increasing speed. Soon, a huge wormhole opens up in the middle of the water, sucking up everything in its surroundings.", attack);
BATTLE.monster_actions.add_textual("The Serpent shakes the water chaotically. Waves collides up in the sky, projecting massive liquid projectiles in all directions with a palpable unrelenting power.", attack);
BATTLE.monster_actions.add_textual("The Serpent dives out of the water and summons dark clouds around it. They soon form a maelstorm grabbing everything around and sucking up the water into a majestic liquid pillar.", attack);



// ===================
//hack START
// ===================

BATTLE.operations.start("A Sumptuous Serpent Slashes through the Sea.");
