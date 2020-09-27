LANGUAGE.battle = {
  dodge: function() {
    return "You quickly have to figure out which way to dodge.";
  },

  dodge_fail: function() {
    return "You failed to dodge the incoming attack.";
  },

  xp: function() {
    return "All things considered, you still learned a lot through this encounter";
  },

  escape: function() {
    return "You move away from this cruel scene.";
  },
};

LANGUAGE.actions.usage = function(name) {
  try{
    return LANGUAGE.actions[name]["usage"]();
  } catch (e){
    return LANGUAGE.actions["generic"]["usage"]();
  }
};

LANGUAGE.actions.win = function(name) {
  try{
    return LANGUAGE.actions[name]["win"]();
  } catch (e){
    return LANGUAGE.actions["generic"]["win"]();
  }
};

LANGUAGE.actions.fail = function(name) {
  try{
    return LANGUAGE.actions[name]["fail"]();
  } catch (e){
    return LANGUAGE.actions["generic"]["fail"]();
  }
};

LANGUAGE.actions.generic = {
  usage: function(){},
  win: function(){},
  fail: function(){},
};
