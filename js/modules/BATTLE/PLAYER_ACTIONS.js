class ActionObject {
  constructor(copy) {
    if(!copy) {copy = {}; }
    // Used in BATTLE
    this.name = copy.name;
    this.description = copy.description;

    this.outcome = copy.outcome;
    this.outcome_description = copy.outcome_description;

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

    this.extra_function = copy.extra_function;
  }
}

const PLAYER_ACTIONS = {

  add: function(action_object){
    action = new ActionObject(action_object);
    BATTLE.player_actions.add(action);
  },

  function: {
    unlocking_action: function(argument){
      var result = function() {
        PLAYER_ACTIONS.add(argument);
      };
      return result;
    },

    unlock_replacing_action: function(argument){
      var result = function(result_argument) {
        argument.replacing = result_argument;
        PLAYER_ACTIONS.add(argument);
      };
      return result;
    },
  },

  default_useless: {
    pray: function() {
      PLAYER_ACTIONS.add({
        name: ABILITY.Pray,
        outcome: BATTLETREE.NOTHING,
        description: [
          RANDOM.pick([
            "You close your eyes and begs the Goddess for help.",
            "You focus your thoughts on the Goddess and pray for Her help.",
            "You pray for the Goddess to come to your rescue.",
          ]), RANDOM.pick([
            "The Goddess works in mysterious ways. Nothing happens.",
            "The Goddess seems to ignore your call.",
            "The Goddess probably deems that you should solve this situation on your own.",
            "The Goddess wants you to find your own way.",
            "The Goddess will not be troubled over such trivial matters.",
          ])
        ],
      });
    },

    flee: function() {
      PLAYER_ACTIONS.add({
        name: ABILITY.Flee,
        outcome: BATTLETREE.ESCAPE,
        description: [RANDOM.pick([
          "You try to run away.",
          "You turn around and attempt to escape the $$&ENEMY$.",
          "You back away slowly.",
        ])],
        outcome_description: RANDOM.pick([
          "In a stroke of luck, you manage to escape.",
          "The $$&ENEMY$ chases you for a bit, but you manage to escape.",
          "As you turn around, the $$&ENEMY$ loses interest and runs off in the distance.",
        ]),
      })
    },

    stick: function() {
      PLAYER_ACTIONS.add({
        name: ITEM.Stick,
        outcome: BATTLETREE.NOTHING,
        description: [RANDOM.pick([
            "You wave the stick at the $$&ENEMY$.",
            "You try to hit the $$&ENEMY$ with a stick.",
          ]), RANDOM.pick([
            "The $$&ENEMY$ dodges your attack pretty easily.",
            "The blow does not seem to hurt the $$&ENEMY$.",
          ])
        ],
      });
    },

    stone: function() {
      PLAYER_ACTIONS.add({
        name: ITEM.Stone,
        outcome: BATTLETREE.NOTHING,
        description: [RANDOM.pick([
            "You try to hit the $$&ENEMY$ with your sharp stone.",
            "You throw the stone at the $$&ENEMY$.",
          ]), RANDOM.pick([
            "The $$&ENEMY$ dodges it pretty easily.",
            "It doesn't seem very _effective. The $$&ENEMY$ doesn't budge.",
          ])
        ],
      });
    },
  },

  default_win: {
    stone_crush: function() {
      PLAYER_ACTIONS.add({
        name: ITEM.Stone,
        outcome: BATTLETREE.WIN,
        description: ["You try to crush the $$&ENEMY$ with the stone."],
        outcome_description: "It's enough to rid you of it. You throw the dirty stone away.",
        consume_item: ITEM.Stone,
      });
    },

    sword_wooden: function() {
      PLAYER_ACTIONS.add({
        name: ITEM.Sword_wooden,
        outcome: BATTLETREE.WIN,
        description: ["You attemp to stab the $$&ENEMY$ with your wooden sword."],
        outcome_description: "It's pretty dull, but it's enough to get rid of the $$&ENEMY$.",
      });
    },

    elixir_fire: function() {
      PLAYER_ACTIONS.add({
        name: ITEM.Elixir_fire,
        outcome: BATTLETREE.WIN,
        description: ["You throw the elixir on the ground, near the $$&ENEMY$."],
        outcome_description: "The glass bottle explodes and immediately turns into a ball of fire that roasts your face a little.",
        consume_item: ITEM.Elixir_fire,
      });
    },

    fang: function() {
      PLAYER_ACTIONS.add({
        name: ITEM.Fang,
        outcome: BATTLETREE.WIN,
        description: ["You stab the $$&ENEMY$ with the fang still dripping with venom."],
        outcome_description: "The $$&ENEMY$ convulses and then falls on the ground.",
        consume_item: ITEM.Fang,
      });
    },
  },
}
