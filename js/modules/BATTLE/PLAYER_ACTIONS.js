class ActionObject {
  constructor(copy) {
    if(!copy) {copy = {}; }
    // Used in BATTLE
    this.name = copy.name;
    this.description = copy.description;
    if(copy.function){
      this.function = copy.function;
    } else { // default null effect
      this.function = function(){};
    }
    this.unlock = copy.unlock;
    this.replacing = copy.replacing;
    this.ephemeral = copy.ephemeral;

    this.consume_item = copy.consume_item;
    this.give_item = copy.give_item;

    // Used only in this helper for _with_outcome_function
    this._effect = copy._effect;
    this._extra_function = copy._extra_function;
    this._result_enum = copy._result_enum;
    this._result_function = copy._result_function;
  }
}


const PLAYER_ACTIONS = {
  unlock_function: function(f, argument){
    var result = function() {
      f(argument);
    };
    return result;
  },

  unlock_replacing_function: function(f, argument){
    var result = function(result_argument) {
      argument.replacing = result_argument;
      f(argument);
    };
    return result;
  },

  add: {
    _with_outcome_function: function(action_object) {
      action_object.function = function(){
        BATTLETREE.develop(BATTLE.current_battle,
                           action_object.name,
                           action_object._result_enum);
        action_object._result_function(action_object._effect);

        if(action_object._extra_function) {
          action_object._extra_function();
        }
      }

      BATTLE.player_actions.add(action_object);
    },

    losing: function(action_object) {
      action = new ActionObject(action_object);
      action._result_function = BATTLE.monster_actions.prepare_loss;
      action._result_enum = BATTLETREE.LOSS;
      return PLAYER_ACTIONS.add._with_outcome_function(action);
    },

    useless: function(action_object) {
      action = new ActionObject(action_object);
      action._result_function = function(ignored) {};
      action._result_enum = BATTLETREE.NOTHING;
      return PLAYER_ACTIONS.add._with_outcome_function(action);
    },

    escape: function(action_object) {
      action = new ActionObject(action_object);
      action._result_function = BATTLE.monster_actions.prepare_escape;
      action._result_enum = BATTLETREE.NOTHING;
      return PLAYER_ACTIONS.add._with_outcome_function(action);
    },

    winning: function(action_object) {
      action = new ActionObject(action_object);
      action._result_function = BATTLE.monster_actions.prepare_win;
      action._result_enum = BATTLETREE.WIN;
      return PLAYER_ACTIONS.add._with_outcome_function(action);
    },

    action: function(action_object){
      action = new ActionObject(action_object);
      BATTLE.player_actions.add(action);
    },
  },

  default_useless: {
    pray: function() {
      var description = RANDOM.pick([
        "You close your eyes and begs the Goddess for help.",
        "You focus your thoughts on the Goddess and pray for Her help.",
        "You pray for the Goddess to come to your rescue.",
      ]);
      var _effect = RANDOM.pick([
        "The Goddess works in mysterious ways. Nothing happens.",
        "The Goddess seems to ignore your call.",
        "The Goddess probably deems that you should solve this situation on your own.",
        "The Goddess wants you to find your own way.",
        "The Goddess will not be troubled over such trivial matters.",
      ]);
      PLAYER_ACTIONS.add.useless({
        name: ABILITY.Pray,
        description: [description, _effect],
      });
    },

    flee: function() {
      var description = RANDOM.pick([
        "You try to run away.",
        "You turn around and attempt to escape the $$&ENEMY$.",
        "You back away slowly.",
      ]);
      var _effect = RANDOM.pick([
        "In a stroke of luck, you manage to escape.",
        "The $$&ENEMY$ chases you for a bit, but you manage to escape.",
        "As you turn around, the $$&ENEMY$ loses interest and runs off in the distance.",
      ]);
      PLAYER_ACTIONS.add.escape({
        name: ABILITY.Flee,
        description: [description],
        _effect: _effect,
      })
    },

    stick: function() {
      var description = RANDOM.pick([
        "You wave the stick at the $$&ENEMY$.",
        "You try to hit the $$&ENEMY$ with a stick.",
      ]);
      var _effect = RANDOM.pick([
        "The $$&ENEMY$ dodges your attack pretty easily.",
        "The blow does not seem to hurt the $$&ENEMY$.",
      ]);
      PLAYER_ACTIONS.add.useless({
        name: ITEM.Stick,
        description: [description, _effect],
      });
    },

    stone: function() {
      var description = RANDOM.pick([
        "You try to hit the $$&ENEMY$ with your sharp stone.",
        "You throw the stone at the $$&ENEMY$.",
      ]);
      var _effect = RANDOM.pick([
        "The $$&ENEMY$ dodges it pretty easily.",
        "It doesn't seem very _effective. The $$&ENEMY$ doesn't budge.",
      ]);
      PLAYER_ACTIONS.add.useless({
        name: ITEM.Stone,
        description: [description, _effect],
      });
    },
  },

  default_win: {
    stone_crush: function() {
      var description = RANDOM.pick([
        "You try to crush the $$&ENEMY$ with the stone.",
      ]);
      var _effect = RANDOM.pick([
        "It's enough to rid you of it. You throw the dirty stone away.",
      ]);
      PLAYER_ACTIONS.add.winning({
        name: ITEM.Stone,
        description: [description],
        _effect: _effect,
        consume_item: ITEM.Stone,
      });
    },

    sword_wooden: function() { // Chance to break ??
      var description = RANDOM.pick([
        "You attemp to stab the $$&ENEMY$ with your wooden sword.",
      ]);
      var _effect = RANDOM.pick([
        "It's pretty dull, but it's enough to get rid of the $$&ENEMY$.",
      ]);
      PLAYER_ACTIONS.add.winning({
        name: ITEM.Sword_wooden,
        description: [description],
        _effect: _effect,
      });
    },

    elixir_fire: function() {
      var description = RANDOM.pick([
        "You throw the elixir on the ground, near the $$&ENEMY$.",
      ]);
      var _effect = RANDOM.pick([
        "The glass bottle explodes and immediately turns into a ball of fire that roasts your face a little.",
      ]);
      PLAYER_ACTIONS.add.winning({
        name: ITEM.Elixir_fire,
        description: [description],
        _effect: _effect,
        consume_item: ITEM.Elixir_fire,
      });
    },

    fang: function() {
      var description = RANDOM.pick([
        "You stab the $$&ENEMY$ with the fang still dripping with venom.",
      ]);
      var _effect = RANDOM.pick([
        "The $$&ENEMY$ convulses and then falls on the ground.",
      ]);
      PLAYER_ACTIONS.add.winning({
        name: ITEM.Fang,
        description: [description],
        _effect: _effect,
        consume_item: ITEM.Fang,
      });
    },
  },
}
