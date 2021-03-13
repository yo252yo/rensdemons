var usage = function(name) {
  return [`You ask ${name} for help!`];
};

LANGUAGE.actions[PARTYMEMBERS.BestFriend] = {
  usage: function(){
    return RANDOM.pick(usage(DICTIONARY.get(PARTYMEMBERS.BestFriend)));
  },
  fail: function(){
    return `${DICTIONARY.get(PARTYMEMBERS.BestFriend)} fails miserably and goes crying in a corner.`;
  },
  win: function(){
    return `${DICTIONARY.get(PARTYMEMBERS.BestFriend)} reks the $$&ENEMY$. Tis all.`;
  },
};
