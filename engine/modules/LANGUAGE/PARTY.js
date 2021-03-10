var usage = function(name) {
  return [`You ask ${name} for help!`];
};

LANGUAGE.actions["Goddess"] = {
  usage: function(){
    return RANDOM.pick(usage("Goddess"));
  },
  fail: function(){
    return "Goddess fails miserably and goes crying in a corner.";
  },
  win: function(){
    return "Goddess reks the $$&ENEMY$. Tis all.";
  },
};
