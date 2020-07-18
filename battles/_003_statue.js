
// this shouldnt mention the monster
PLAYER_ACTIONS.default_useless.flee();
PLAYER_ACTIONS.default_useless.pray();

var battle = "_003_statue";
var test = "test";

var remember_east = "Remember east message";
var look_east = "Look at east message";

PLAYER_ACTIONS.add({
  name: remember_east,
  description: test,
  replacing: look_east,
});

PLAYER_ACTIONS.add({
  name: look_east,
  description: test,
  function: function() {
    BATTLETREE.api.unlock(battle, remember_east);
    BATTLETREE.api.lock(battle, look_east);
  }
});


BATTLE.operations.start("You find essors.");
