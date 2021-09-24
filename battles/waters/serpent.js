// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/waters/serpent.png", 'background');
PLAYER_ACTIONS.allow_flight();
AUDIO.music.interface.boss();

BATTLE.operations.add_loot(ITEM.Scale, 1);



// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(2000);
PLAYER_ACTIONS.kill_with_any_party_member(5);


PLAYER_ACTIONS.win(ABILITY.Persuade, 6);                  // 250  DIPL
PLAYER_ACTIONS.win(ABILITY.Sneak, 8);                     // 83  DIPL

PLAYER_ACTIONS.win(ITEM.Spear, 7);                        // 250  WEAP
PLAYER_ACTIONS.win(ITEM.Sword_iron, 5);                   // 500  WEAP
PLAYER_ACTIONS.win(ITEM.Sword_great, 3);                  // 1000 WEAP

PLAYER_ACTIONS.win(ABILITY.Earthquake, 5);                // 666  ELEM
PLAYER_ACTIONS.win(ABILITY.Asphyxiate, 4);                // 250  ELEM

PLAYER_ACTIONS.win(ABILITY.Shrink, 7);                    // 66  SPIR
PLAYER_ACTIONS.win(ABILITY.Confusion, 4);                 // 666  SPIR

PLAYER_ACTIONS.win(ITEM.Poison_darts, 10, true);           // 5   TOOL
PLAYER_ACTIONS.win(ITEM.Rope, 8);                         // 100  TOOL

PLAYER_ACTIONS.win(ITEM.Elixir_vine, 8, true);            // 30  ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_venom, 6, true);           // 40  ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_decay, 4, true);           // 50  ALCH

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
