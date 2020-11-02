const BATTLEOBJECTSMANAGER = {
  buffer: undefined,

  battle: {
    get_extra_function: function(battle_object, command) {
      if (BATTLETREE.score.is_explored(battle_object.battle_name(), command)){
        return function(){};
      } else {
        return battle_object.get_special_effect(command);
      }
    },

    add_from_object: function(battle_object){
      var special_command0 = BATTLEOBJECTSMANAGER.interactions.get(battle_object, 0);
      var special_command1 = BATTLEOBJECTSMANAGER.interactions.get(battle_object, 1);
      for(var command in battle_object.interactions){
        PLAYER_ACTIONS.add({
          name: command,
          description: battle_object.interactions[command],
          outcome: BATTLETREE.ESCAPE,
          extra_function: BATTLEOBJECTSMANAGER.battle.get_extra_function(battle_object, command),
        });
        if (command != special_command0 && command != special_command1){
          BATTLE.player_actions.remove(command);
        }
      }
    },
  },

  setup_battle: function(name) {
    if (name != BATTLEOBJECTSMANAGER.buffer.name){ // we do a roundtrip to BATTLE for the whole battle setup
      CONSOLE.error("[BATTLEOBJECTSMANAGER] called with the wrong battleobject.");
    }
    new CenteredImage("assets/objects/" + name + ".png", 'background');

    PLAYER_ACTIONS.escape("Turn away");

    BATTLEOBJECTSMANAGER.battle.add_from_object(BATTLEOBJECTSMANAGER.buffer);

    BATTLE.monster_actions.add_textual(BATTLEOBJECTSMANAGER.buffer.description);
    BATTLE.operations.start(BATTLEOBJECTSMANAGER.buffer.description);
  },

  interactions: {
    get: function(battle_object, i) { // could move to the object themselves if we want an object not to have variable numbers of options.
      var commands = Object.keys(battle_object.interactions);
      var interaction = commands[Math.floor(battle_object.seeds[i] * commands.length)];
      return interaction;
    },

    has_explored_action: function(battle_object, i) {
      var interaction = BATTLEOBJECTSMANAGER.interactions.get(battle_object, i);

      if(!BATTLETREE.score.is_explored(battle_object.battle_name(), interaction)) {
        BATTLETREE.api.unlock(battle_object.battle_name(), interaction);
        return false;
      } else {
        return true;
      }
    },

    has_explored: function(battle_object) {
      var interaction1 = BATTLEOBJECTSMANAGER.interactions.has_explored_action(battle_object, 0);
      var interaction2 = BATTLEOBJECTSMANAGER.interactions.has_explored_action(battle_object, 1);
      return (interaction1 && interaction2);
    },
  },

  textBoxInteraction: function(battle_object) {
    var possibilities = [battle_object.description];
    var battle = battle_object.battle_name();
    var b = BATTLETREE._targets.get([battle]);

    for (var i in b) {
      if(BATTLETREE._targets.get([battle, i]) != BATTLETREE.NOT_TRIED && BATTLETREE._targets.get([battle, i]) != BATTLETREE.HIDDEN) {
        if (battle_object.interactions[i]){
          possibilities.push(battle_object.interactions[i]);
        }
      }
    }
    var text = possibilities[Math.floor(battle_object.seeds[0] * possibilities.length)];
    new TextBanner(text);
  },

  interact: function(battle_object) {
    BATTLEOBJECTSMANAGER.buffer = battle_object;
    var explored = BATTLEOBJECTSMANAGER.interactions.has_explored(battle_object);
    if (!explored) {
      BATTLE.api.make(battle_object.battle_name());
    } else {
      BATTLEOBJECTSMANAGER.textBoxInteraction(battle_object);
    }
  },
}
