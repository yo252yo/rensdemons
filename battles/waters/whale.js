// ===================
//hack INITIALIZATION
// ===================
new CenteredImage("assets/battles/waters/whale.png", 'background');
PLAYER_ACTIONS.allow_flight();

// ===================
//hack PLAYER CABAILITIES
// ===================


// ===================
//hack MONSTER BEHAVIOR
// ===================
var attack = {
  attack_amplitude: 0.1, // Between 0 and 1
  warning_time_s: 2,
  react_time_s: 1,
  time_variation: 0.5, // 1 = 100%
};

BATTLE.monster_actions.add_textual("...", attack);
BATTLE.monster_actions.add_textual("...", attack);
BATTLE.monster_actions.add_textual("...", attack);


PLAYER_ACTIONS.add({
  name: "Feed",
  outcome: BATTLETREE.WIN,
  unlock: true,
  description: ["Empowered by the Goddess, you decide to end the confrontation in a surprising way. You trust your luck and throw yourself recklessly in the mouth of the animal. The Goddess must be watching over you, because you manage to avoid the giant teeth and land safely on the tongue of the animal."],
  extra_function: function(){
    INVENTORY.increase("_eaten_by_whale");
  }
});

// ===================
//hack START
// ===================
BATTLE.operations.start("A Wondrous Whale Wrecked your Wares.");

//todo BOSS
