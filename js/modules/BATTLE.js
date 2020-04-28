
const BATTLE = {
  player_actions: [],
  monster_actions: [],
  current_battle: "",
  previous_position: undefined,

  clear: function() {
    BATTLE.player_actions = [];
    BATTLE.monster_actions = [];
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
  },

  setup: function(name) {
    // This trycatch is dangerous but this fails in debug mode
    try {
      BATTLE.previous_position = LEVEL.factory.export();
    } catch(error) {}
    
    LEVEL.clear();
    BATTLE.clear();
    BATTLE.current_battle = name;

    new Import("battles/" + name);
    CONSOLE.sys_log("- Loaded battle " + name);
  },

  reload: function(){
    BATTLE.setup(BATTLE.current_battle);
  },

  can_reload: function(){
    return (BATTLE.current_battle != "");
  },
};
