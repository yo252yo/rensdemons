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
      var special_commands = BATTLEOBJECTSMANAGER.interactions.get_all(battle_object);
      for(var command in battle_object.interactions){
        PLAYER_ACTIONS.add({
          name: command,
          description: battle_object.interactions[command],
          outcome: BATTLETREE.ESCAPE,
          extra_function: BATTLEOBJECTSMANAGER.battle.get_extra_function(battle_object, command),
        });
        if (!special_commands.includes(command)){
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

    BATTLEOBJECTSMANAGER.battle.add_from_object(BATTLEOBJECTSMANAGER.buffer);

    BATTLE.monster_actions.add_textual(BATTLEOBJECTSMANAGER.buffer.description);
    BATTLE.operations.start(BATTLEOBJECTSMANAGER.buffer.description);
  },

  interactions: {
    get_all: function(battle_object) {
      var commands = Object.keys(battle_object.interactions);
      var result = [];
      for (var i =0; i < battle_object.max_actions; i++){
        result.push(commands[Math.floor(battle_object.seeds[i] * commands.length)]);
      }
      return result;
    },

    get: function(battle_object, i) { // could move to the object themselves if we want an object not to have variable numbers of options.
      var commands = Object.keys(battle_object.interactions);
      var interaction = commands[Math.floor(battle_object.seeds[i] * commands.length)];
      return interaction;
    },

    has_explored_action: function(battle_object, interaction) {
      if(!BATTLETREE.score.is_explored(battle_object.battle_name(), interaction)) {
        BATTLETREE.api.unlock(battle_object.battle_name(), interaction);
        return false;
      } else {
        return true;
      }
    },

    has_explored: function(battle_object) {
      var has_explored = true;
      var actions = BATTLEOBJECTSMANAGER.interactions.get_all(battle_object);
      for(var i in actions){
        var interaction1 = BATTLEOBJECTSMANAGER.interactions.has_explored_action(battle_object, actions[i]);
        has_explored = has_explored & interaction1;
      }
      return has_explored;
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
