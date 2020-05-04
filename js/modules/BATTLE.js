
const BATTLE = {
  player_actions: [],
  monster_actions: [],
  current_battle: "",
  previous_position: undefined,
  callback: undefined,

  clear: function() {
    BATTLE.player_actions = [];
    BATTLE.monster_actions = [];
    BATTLE.callback = undefined;
    BATTLE.previous_position = undefined;
    BATTLE.current_battle = "";
  },

  player_turn: function() {
    var options = [];
    for (var i in BATTLE.player_actions){
      (function(index){
        var f = function() {
          var text = BATTLE.player_actions[index]();
          // If I don't go through timeout, I think the event canceling blocks IO for the banner.
          if (text) {
            setTimeout(function(){
              TextBannerSequence.make(text, BATTLE.play_monster);
            }, 200);
          } else {
            setTimeout( BATTLE.play_monster, 200);
          }
          return true;
        };

        options.push({"text": index, "effect": f});
      })(i);

    }
    new BattleMenu("", options);
  },

  monster_turn: function(text) {
    TextBannerSequence.make([text], BATTLE.player_turn);
  },

  play_monster: function () {
    RANDOM.pick(BATTLE.monster_actions)();
  },

  prepare_doom: function (doom){
    BATTLE.monster_actions = [
      function() {
        TextBannerSequence.make([doom], BATTLE.loss);
      }
    ];
  },

  prepare_win: function (text){
    BATTLE.monster_actions = [
      function() {
        TextBannerSequence.make([text], BATTLE.win);
      }
    ];
  },

  start: function(text) {
    BATTLE.monster_turn(text);
  },

  loss: function() {
    LEVEL.setup("gameover");
  },

  win: function(text) {
    LEVEL.factory.import(BATTLE.previous_position);

    if (BATTLE.callback){
      setTimeout(BATTLE.callback, 200);
    }
  },

  setup: function(name, callback, previous_position) {
    LEVEL.clear();
    BATTLE.clear();

    if (previous_position) {
      BATTLE.previous_position = previous_position;
    } else {
      BATTLE.previous_position = LEVEL.factory.export();
    }

    BATTLE.current_battle = name;

    if(callback) {
      BATTLE.callback = callback;
    }

    new Import("battles/" + name);
    CONSOLE.sys_log("- Loaded battle " + name);
  },

  reload: function(){
    BATTLE.setup(BATTLE.current_battle, BATTLE.callback, BATTLE.previous_position);
  },

  can_reload: function(){
    return (BATTLE.current_battle != "");
  },
};
