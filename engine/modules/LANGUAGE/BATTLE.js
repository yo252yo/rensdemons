LANGUAGE.battle = {
  dodge: function() {
    return `You quickly have to figure out which way to dodge.`;
  },

  dodge_fail: function() {
    return `You failed to dodge the incoming attack.`;
  },

  xp: function() {
    return `All things considered, you still learned a lot through this encounter`;
  },

  escape: function() {
    return RANDOM.pick([`You move away from this scene.`,
                        `You go away and do not turn back.`,
                        `You escape from this encounter.`,
                        `You manage to make your way out of this situation.`]);
  },
};

LANGUAGE.actions.generic = {
  usage: function(){
    return `You attack the $$&ENEMY$.`;
  },
  win: function(){
    return `This gets rid of the $$&ENEMY$.`;
  },
  fail: function(){
    return `This does not affect the $$&ENEMY$.`;
  },
};


//------------------------------------------------------------------------------
//Functions

LANGUAGE.actions._get = function(name, type) {
  var r;
  try{
    r = LANGUAGE.actions[name][type]();
  } catch (e){
    r = LANGUAGE.actions[`generic`][type]();
  }

  if(typeof r == "string"){
    return [r];
  } else {
    return r;
  }
};

LANGUAGE.actions.usage = function(name) {
  return LANGUAGE.actions._get(name, `usage`);
};

LANGUAGE.actions.win = function(name) {
  return LANGUAGE.actions._get(name, `win`);
};

LANGUAGE.actions.fail = function(name) {
  return LANGUAGE.actions._get(name, `fail`);
};
