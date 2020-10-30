const BATTLEOBJECTSMANAGER = {
  current_battleobject: undefined,

  setup_battle: function(name){
    var object = BATTLEOBJECTSMANAGER.current_battleobject;
    if (name != object.name){ // we do a roundtrip to BATTLE for the whole battle setup
      CONSOLE.error("[BATTLEOBJECTSMANAGER] called with the wrong battleobject.");
    }
    new CenteredImage("assets/objects/" + name + ".png", 'background');

    PLAYER_ACTIONS.escape("Turn away");

    var special_command0 = BATTLEOBJECTSMANAGER.get_unique_interaction(object, 0);
    var special_command1 = BATTLEOBJECTSMANAGER.get_unique_interaction(object, 1);
    for(var command in object.interactions){
      PLAYER_ACTIONS.add({
        name: command,
        description: object.interactions[command],
        outcome: BATTLETREE.ESCAPE,
      });
      if (command != special_command0 && command != special_command1){
        BATTLE.player_actions.remove(command);
      }
    }

    BATTLE.monster_actions.add_textual(object.description);
    BATTLE.operations.start(object.description);
  },

  getTextBox: function(battle_object) {
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
    return possibilities[Math.floor(battle_object.seeds[0] * possibilities.length)];
  },

  get_unique_interaction: function(battle_object, i) {
    var commands = Object.keys(battle_object.interactions);
    var interaction = commands[Math.floor(battle_object.seeds[i] * commands.length)];
    return interaction;
  },

  has_explored_unique_interaction: function(battle_object, i) {
    var battle = "objects/" + battle_object.name;
    var interaction = BATTLEOBJECTSMANAGER.get_unique_interaction(battle_object, i);
    var outcome = BATTLETREE._targets.get([battle, interaction]);

    if(!outcome || outcome == BATTLETREE.NOT_TRIED || outcome == BATTLETREE.HIDDEN) {
      BATTLETREE.api.unlock(battle, interaction);
      return false;
    } else {
      return true;
    }
  },

  has_explored_unique_interactions: function(battle_object) {
    var interaction1 = BATTLEOBJECTSMANAGER.has_explored_unique_interaction(battle_object, 0);
    var interaction2 = BATTLEOBJECTSMANAGER.has_explored_unique_interaction(battle_object, 1);
    return (interaction1 && interaction2);
  },

  interact: function(battle_object) {
    BATTLEOBJECTSMANAGER.current_battleobject = battle_object;
    var explored = BATTLEOBJECTSMANAGER.has_explored_unique_interactions(battle_object);
    var name = "objects/" + battle_object.name;
    if (!explored) {
      BATTLE.api.make(name);
    } else {
      new TextBanner(BATTLEOBJECTSMANAGER.getTextBox(battle_object));
    }
  },
}
