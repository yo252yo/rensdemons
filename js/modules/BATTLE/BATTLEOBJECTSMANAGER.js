const BATTLEOBJECTSMANAGER = {
  current_battleobject: undefined,

  setup_battle: function(name){
    var object = BATTLEOBJECTSMANAGER.current_battleobject;
    if (name != object.name){
      CONSOLE.error("[BATTLEOBJECTSMANAGER] called with the wrong battleobject.");
    }
    new CenteredImage("assets/objects/" + name + ".png", 'background');

    PLAYER_ACTIONS.escape("Turn away");

    for(var command in object.interactions){
      PLAYER_ACTIONS.add({
        name: command,
        description: object.interactions[command],
        outcome: BATTLETREE.NOTHING,
      });
    }

    BATTLE.monster_actions.add_textual(object.description);
    BATTLE.operations.start(object.description);
  },

  getText: function(battle_object) {
    var possibilities = [battle_object.description];
    var battle = "objects/" + battle_object.name;
    var b = BATTLETREE._targets.get([battle]);

    for (var i in b) {
      if(BATTLETREE._targets.get([battle, i]) != BATTLETREE.NOT_TRIED && BATTLETREE._targets.get([battle, i]) != BATTLETREE.HIDDEN) {
        if (battle_object.interactions[i]){
          possibilities.push(battle_object.interactions[i]);
        }
      }
    }
    return possibilities[Math.floor(battle_object.seed * possibilities.length)];
  },

  unlock_randomly: function(battle_object) {
    var commands = Object.keys(battle_object.interactions);
    var unlocked = commands[Math.floor(battle_object.seed * commands.length)];
    BATTLETREE.api.unlock("objects/" + battle_object.name, unlocked);
  },

  interact: function(battle_object) {
    BATTLEOBJECTSMANAGER.current_battleobject = battle_object;
    BATTLEOBJECTSMANAGER.unlock_randomly(battle_object);
    var name = "objects/" + battle_object.name;
    if (!BATTLETREE.score.is_explored(name)) {
      BATTLE.api.make(name);
    } else {
      new TextBanner(BATTLEOBJECTSMANAGER.getText(battle_object));
    }
  },
}
