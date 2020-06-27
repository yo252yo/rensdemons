
const PLAYER_ACTIONS = {
  add: {
    _helper: function(action_object, result_enum, result_function) {
      action_object.function = function(){
        BATTLETREE.develop(BATTLE.current_battle, action_object.name, result_enum);
        result_function(action_object.effect);
        if(action_object.extra_function){
          action_object.extra_function();
        }
      }

      BATTLE.player_actions.add(action_object);
    },

    losing: function(action_object) {
      return PLAYER_ACTIONS.add._helper(
        action_object,
        BATTLETREE.LOSS,
        BATTLE.monster_actions.prepare_loss
      );
    },

    useless: function(action_object) {
      return PLAYER_ACTIONS.add._helper(
        action_object,
        BATTLETREE.NOTHING,
        function(ignored) {}
      );
    },

    escape: function(action_object) {
      return PLAYER_ACTIONS.add._helper(
        action_object,
        BATTLETREE.NOTHING,
        BATTLE.monster_actions.prepare_escape
      );
    },

    winning: function(action_object) {
      return PLAYER_ACTIONS.add._helper(
        action_object,
        BATTLETREE.WIN,
        BATTLE.monster_actions.prepare_win
      );
    },

    action: function(action_object){
      BATTLE.player_actions.add(action_object);
    },
  },

  set_default: {
    pray: function() {
      PLAYER_ACTIONS.add.useless({
        name: ABILITY.Pray,
        description: ["You close your eyes and begs the Goddess for help."],
        effect: "The Goddess works in mysterious ways. Nothing happens.",
      });
    },

    flee: function() {
      PLAYER_ACTIONS.add.escape({
        name: ABILITY.Flee,
        description: ["You run away."],
        effect: "The monster tries to pursue you, but you manage to escape.",
      })
    },
  },
}
