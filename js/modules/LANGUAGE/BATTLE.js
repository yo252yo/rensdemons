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

LANGUAGE.actions.get = function(name, type) {
  try{
    return LANGUAGE.actions[name][type]();
  } catch (e){
    return LANGUAGE.actions["generic"][type]();
  }
};

LANGUAGE.actions.generic = {
  usage: function(){},
  win: function(){},
  fail: function(){},
};
