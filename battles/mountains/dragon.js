// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/mountains/dragon.png", 'background');
PLAYER_ACTIONS.allow_flight();

AUDIO.music.interface.boss();

BATTLE.operations.add_loot(ITEM.Scale, 1);

// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(1000);
PLAYER_ACTIONS.kill_with_any_party_member(3);


PLAYER_ACTIONS.win(ABILITY.Thunder, 7);                   // 75   ELEM
PLAYER_ACTIONS.win(ABILITY.Storm, 7);                     // 100  ELEM

PLAYER_ACTIONS.win(ABILITY.Shrink, 7);                    // 75   SPIR
PLAYER_ACTIONS.win(ABILITY.Confusion, 3);                 // 500  SPIR

PLAYER_ACTIONS.win(ABILITY.Sneak, 7);                     // 100  DIPL
PLAYER_ACTIONS.win(ABILITY.Intimidate, 2);                // 500  DIPL

PLAYER_ACTIONS.win(ITEM.Elixir_vine, 6, true);            // 75   ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_venom, 4, true);           // 100  ALCH
PLAYER_ACTIONS.win(ITEM.Elixir_chaos, 2, true);           // 200  ALCH

PLAYER_ACTIONS.win(ITEM.Spear, 6);                        // 250  WEAP
PLAYER_ACTIONS.win(ITEM.Sword_iron, 4);                   // 500  WEAP
PLAYER_ACTIONS.win(ITEM.Axe, 3);                          // 600  WEAP

PLAYER_ACTIONS.win(ITEM.Arrow, 7, true);                  // 5    TOOL
PLAYER_ACTIONS.win(ITEM.Net, 3);                          // 200  TOOL


// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.7, // Between 0 and 1
  warning_time_s: 0.7,
  react_time_s: 0.7,
  time_variation: 0.6, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Dragon towers over you high in the air. It looks at you and you can see the judgement and anger in its ancestral eyes. It spits a torrent of fire in your direction.", attack);
BATTLE.monster_actions.add_textual("The Dragon flies over the scene gracefully. Its scales reflect the sunlight. Suddenly, it breathes out a huge stormy cloud that evolves towards you.", attack);
BATTLE.monster_actions.add_textual("The Dragon slithers fluidly in the wind. Its mystical dance controls the elements, and a tornado starts to form around you.", attack);


// ===================
//hack START
// ===================
BATTLE.operations.start("A Dominating Dragon Descends with a Deafening roar.");
