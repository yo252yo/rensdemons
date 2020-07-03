
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
      var description = RANDOM.pick([
        "You close your eyes and begs the Goddess for help.",
        "You focus your thoughts on the Goddess and pray for Her help.",
        "You pray for the Goddess to come to your rescue.",
      ]);
      var effect = RANDOM.pick([
        "The Goddess works in mysterious ways. Nothing happens.",
        "The Goddess seems to ignore your call.",
        "The Goddess probably deems that you should solve this situation on your own.",
        "The Goddess wants you to find your own way.",
        "The Goddess will not be troubled over such trivial matters.",
      ]);
      PLAYER_ACTIONS.add.useless({
        name: ABILITY.Pray,
        description: [description, effect],
      });
    },

    flee: function() {
      var description = RANDOM.pick([
        "You run away.",
        "You turn around and attempt to escape.",
        "You back away slowly.",
      ]);
      var effect = RANDOM.pick([
        "In a stroke of luck, you manage to escape.",
        "Your opponnent chases you for a bit, but you manage to escape.",
        "As you turn around, your opponnent loses interest and runs off in the distance.",
      ]);
      PLAYER_ACTIONS.add.escape({
        name: ABILITY.Flee,
        description: [description],
        effect: effect,
      })
    },

    stick: function() {
      var description = RANDOM.pick([
        "You wave the stick at your enemy.",
        "You try to hit with a stick.",
      ]);
      var effect = RANDOM.pick([
        "It dodges your attack pretty easily.",
        "The blow does not seem to hurt it.",
      ]);
      PLAYER_ACTIONS.add.useless({
        name: ITEM.Stick,
        description: [description, effect],
      });
    },
  },
}
