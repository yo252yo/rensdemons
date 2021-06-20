// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/mountains/dragon.png", 'background');
PLAYER_ACTIONS.allow_flight();

BATTLE.operations.add_loot(ITEM.Scale, 1);

// ===================
//hack PLAYER CAPABILITIES
// ===================
PLAYER_ACTIONS.kill_with_anything_over(1000);

PLAYER_ACTIONS.kill_with_any_party_member();

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

//todo,
