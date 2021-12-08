const BATTLEOBJECTSMANAGER = {
  buffer: undefined,
  prefix: "environment/",

  battle: {
    get_extra_function: function(battle_object, command) {
      if (BATTLETREE.score.is_explored(battle_object.battle_name(), command)){
        return function(){};
      } else {
        return battle_object.get_special_effect(command);
      }
    },

    add_commands_from_object: function(battle_object){
      var special_commands = BATTLEOBJECTSMANAGER.interactions.get_all(battle_object);

      for(var command in battle_object.interactions){
        var outcome = BATTLETREE.ESCAPE;

        if(battle_object.lastingBattle && command != ABILITY.Escape){
          outcome = BATTLETREE.NOTHING;
        }

        PLAYER_ACTIONS.add({
          name: command,
          description: battle_object.interactions[command],
          outcome: outcome,
          extra_function: BATTLEOBJECTSMANAGER.battle.get_extra_function(battle_object, command),
        });
        if (!special_commands.includes(command)){
          BATTLE.player_actions.remove(command);
        }
      }
    },
  },

  setup_battle: function(name) {
    var battleobject = BATTLEOBJECTSMANAGER.buffer;
    if (name != battleobject.name){ // we do a roundtrip to BATTLE for the whole battle setup
      CONSOLE.error("[BATTLEOBJECTSMANAGER] called with the wrong battleobject.");
    }
    if(battleobject.battle_sprite_name.startsWith("characters")){
      var c = new CenteredMovingImage("assets/" + battleobject.battle_sprite_name + ".png", 'background',32,48, 2);
    } else{
      var c = new CenteredImage("assets/" + battleobject.battle_sprite_name + ".png", 'background', 2);
    }

    BATTLEOBJECTSMANAGER.battle.add_commands_from_object(battleobject);

    if (!battleobject.enemy_actions){
      BATTLE.monster_actions.add_textual(battleobject.description);
    } else {
      for(var e of battleobject.enemy_actions){
        BATTLE.monster_actions.add_textual(e.text, e.attack);
      }
    }
    BATTLE.operations.start(battleobject.description);
  },

  interactions: {
    get_all: function(battle_object) {
      var commands = Object.keys(battle_object.interactions);
      var result = [];
      for (var i =0; i < battle_object.max_actions; i++){
        var candidate = commands[Math.floor(battle_object.seeds[i] * commands.length)];
        var duplicate = false;
        for(var r of result){
          if (r.trim() == candidate.trim()){
            duplicate = true; // mutual exclusivity
            break;
          }
        }
        if (!duplicate){
          result.push(candidate);
        }
      }
      if(battle_object.lastingBattle){
        result.push(ABILITY.Escape);
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

    var commands = BATTLEOBJECTSMANAGER.interactions.get_all(battle_object);
    for (var i = 0; i < commands.length; i++){
      if (commands[i] != ABILITY.Escape){
        possibilities.push(battle_object.interactions[commands[i]]);
      }
    }
    var text = possibilities[Math.floor(battle_object.seeds[0] * possibilities.length)];

    var array = text;
    if (!Array.isArray(text)){
      array = [text];
    }
    TextBannerSequence.make(array);
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
