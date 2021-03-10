var usage = function(name) {
  return [`You ask ${name} for help!`];
};

LANGUAGE.actions[PARTYMEMBERS.Sidekick] = {
  usage: function(){
    return RANDOM.pick(usage(DICTIONARY.get(PARTYMEMBERS.Sidekick)));
  },
  fail: function(){
    return `${DICTIONARY.get(PARTYMEMBERS.Sidekick)} fails miserably and goes crying in a corner.`;
  },
  win: function(){
    return `${DICTIONARY.get(PARTYMEMBERS.Sidekick)} reks the $$&ENEMY$. Tis all.`;
  },
};
