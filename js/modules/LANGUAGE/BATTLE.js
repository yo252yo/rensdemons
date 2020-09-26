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

LANGUAGE.actions.get = function(name, outcome, type) {
  try{
    return LANGUAGE.actions[name][outcome][type]();
  } catch (e){
    return LANGUAGE.actions["generic"][outcome][type]();
  }
};

LANGUAGE.actions.generic = {
  useless:{
    description: function(){},
    outcome: function(){},
  },
  win:{
    description: function(){},
    outcome: function(){},
  }
};
