// ===================
//hack INITIALIZATION
// ===================
BESTIARY.picture('waters/whale');
PLAYER_ACTIONS.allow_flight();

AUDIO.music.interface.boss();

// ===================
//hack PLAYER CAPABILITIES
// ===================

PLAYER_ACTIONS.kill_with_anything_over(999999999999999999);

PLAYER_ACTIONS.useless(ITEM.Sword_legend, 1);
PLAYER_ACTIONS.useless(ITEM.War_hammer, 1);
PLAYER_ACTIONS.useless(ITEM.Staff, 1);
PLAYER_ACTIONS.useless(ITEM.Wand, 1);

// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.85, // Between 0 and 1
  warning_time_s: 1,
  react_time_s: 1.6,
  variability: 0.1, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The Whale moves slowly but surely in your direction, mouth wide open. It is so huge that it occupies almost all of your field of view. Escaping its implacable march is going to be tough.", attack);
BATTLE.monster_actions.add_textual("The Whale sucks in a large quantity of water, creating a maelstrom of currents around you that shake you violently. You struggle to keep control of your body.", attack);
BATTLE.monster_actions.add_textual("The Whale emits a loud and deep cry that seems to make the whole lake vibrate. It then slaps its gigantic fin in your direction. It's several times the size of your house.", attack);

PLAYER_ACTIONS.add({
  name: ABILITY.Feed,
  outcome: BATTLETREE.ESCAPE,
  unlock: true,
  description: ["Empowered by the Goddess, you decide to end the confrontation in a surprising way. You trust your luck and throw yourself recklessly in the mouth of the animal. The Goddess must be watching over you, because you manage to avoid the giant teeth and land safely on the tongue of the animal."],
  extra_function: function(){
    INVENTORY.increase("_eaten_by_whale");
  }
});

// ===================
//hack START
// ===================
BATTLE.operations.start(BESTIARY.intro("waters/whale"));
