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

LANGUAGE.actions.generic = {
  usage: function(){
    return "You attack the $$&ENEMY$.";
  },
  win: function(){
    return "This gets rid of the $$&ENEMY$.";
  },
  fail: function(){
    return "This does not affect the $$&ENEMY$.";
  },
};


//------------------------------------------------------------------------------
//Functions

LANGUAGE.actions._get = function(name, type) {
  try{
    return LANGUAGE.actions[name][type]();
  } catch (e){
    return LANGUAGE.actions["generic"][type]();
  }
};

LANGUAGE.actions.usage = function(name) {
  return LANGUAGE.actions._get(name, "usage");
};

LANGUAGE.actions.win = function(name) {
  return LANGUAGE.actions._get(name, "win");
};

LANGUAGE.actions.fail = function(name) {
  return LANGUAGE.actions._get(name, "fail");
};
