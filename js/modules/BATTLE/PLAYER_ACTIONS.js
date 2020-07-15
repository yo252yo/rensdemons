
const PLAYER_ACTIONS = {
  add: {
    _helper: function(action_object, result_enum, result_function) {
      action_object.function = function(){
        BATTLETREE.develop(BATTLE.current_battle, action_object.name, result_enum);
        result_function(action_object.effect);
        if(action_object.extra_function) {
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

// Can this be a parameter like action_object.unlock = true?
    unlocked_action: function(action_object){
      BATTLE.player_actions.add(action_object);
      BATTLETREE.unlock(BATTLE.get_current_battle(), action_object.name);
    },

  // Can this be a parameter like action_object.replace = from_action
    replace: function(from_action, to_action){
      BATTLETREE.unlock(BATTLE.get_current_battle(), to_action, from_action);
      BATTLE.player_actions.remove(from_action);
    },

      // Can this be a parameter like action_object.replace = from_action
    throwaway_action: function(from, name, description, extra_function) {
      PLAYER_ACTIONS.add.replace(from, name);
      PLAYER_ACTIONS.add.unlocked_action({
        name: name,
        description: description,
        function: function() {
          BATTLE.player_actions.remove(name);
          if(extra_function){
            extra_function();
          }
        },
      });
    },
  },

  default_useless: {
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
        "You try to run away.",
        "You turn around and attempt to escape the $$&ENEMY$.",
        "You back away slowly.",
      ]);
      var effect = RANDOM.pick([
        "In a stroke of luck, you manage to escape.",
        "The $$&ENEMY$ chases you for a bit, but you manage to escape.",
        "As you turn around, the $$&ENEMY$ loses interest and runs off in the distance.",
      ]);
      PLAYER_ACTIONS.add.escape({
        name: ABILITY.Flee,
        description: [description],
        effect: effect,
      })
    },

    stick: function() {
      var description = RANDOM.pick([
        "You wave the stick at the $$&ENEMY$.",
        "You try to hit the $$&ENEMY$ with a stick.",
      ]);
      var effect = RANDOM.pick([
        "The $$&ENEMY$ dodges your attack pretty easily.",
        "The blow does not seem to hurt the $$&ENEMY$.",
      ]);
      PLAYER_ACTIONS.add.useless({
        name: ITEM.Stick,
        description: [description, effect],
      });
    },

    stone: function() {
      var description = RANDOM.pick([
        "You try to hit the $$&ENEMY$ with your sharp stone.",
        "You throw the stone at the $$&ENEMY$.",
      ]);
      var effect = RANDOM.pick([
        "The $$&ENEMY$ dodges it pretty easily.",
        "It doesn't seem very effective. The $$&ENEMY$ doesn't budge.",
      ]);
      PLAYER_ACTIONS.add.useless({
        name: ITEM.Stone,
        description: [description, effect],
      });
    },
  },

  default_win: {

    stone_crush: function() {
      var description = RANDOM.pick([
        "You try to crush the $$&ENEMY$ with the stone.",
      ]);
      var effect = RANDOM.pick([
        "It's enough to rid you of it. You throw the dirty stone away.",
      ]);
      PLAYER_ACTIONS.add.winning({
        name: ITEM.Stone,
        description: [description],
        effect: effect,
        extra_function: function(){
          INVENTORY.decrease(ITEM.Stone);
        },
      });
    },

    sword_wooden: function() { // Chance to break ??
      var description = RANDOM.pick([
        "You attemp to stab the $$&ENEMY$ with your wooden sword.",
      ]);
      var effect = RANDOM.pick([
        "It's pretty dull, but it's enough to get rid of the $$&ENEMY$.",
      ]);
      PLAYER_ACTIONS.add.winning({
        name: ITEM.Sword_wooden,
        description: [description],
        effect: effect,
      });
    },

    elixir_fire: function() {
      var description = RANDOM.pick([
        "You throw the elixir on the ground, near the $$&ENEMY$.",
      ]);
      var effect = RANDOM.pick([
        "The glass bottle explodes and immediately turns into a ball of fire that roasts your face a little.",
      ]);
      PLAYER_ACTIONS.add.winning({
        name: ITEM.Elixir_fire,
        description: [description],
        effect: effect,
        extra_function: function(){
          INVENTORY.decrease(ITEM.Elixir_fire);
        },
      });
    },

    fang: function() {
      var description = RANDOM.pick([
        "You stab the $$&ENEMY$ with the fang still dripping with venom.",
      ]);
      var effect = RANDOM.pick([
        "The $$&ENEMY$ convulses and then falls on the ground.",
      ]);
      PLAYER_ACTIONS.add.winning({
        name: ITEM.Fang,
        description: [description],
        effect: effect,
        extra_function: function(){
          INVENTORY.decrease(ITEM.Fang);
        },
      });
    },
  },
}
