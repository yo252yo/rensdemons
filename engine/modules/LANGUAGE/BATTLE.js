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
  try{
    return LANGUAGE.actions[name][type]();
  } catch (e){
    return LANGUAGE.actions[`generic`][type]();
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


//------------------------------------------------------------------------------
//Proficiency

LANGUAGE.proficiency = function(number) {
  if (number > 0.9){ return "veteran"; }
  if (number > 0.7){ return "proficient"; }
  if (number > 0.5){ return "adept"; }
  if (number > 0.3){ return "initiate"; }
  if (number > 0){ return "novice"; }
  return "inept";
}
