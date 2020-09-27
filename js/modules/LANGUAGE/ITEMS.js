LANGUAGE.actions[ITEM.Stick] = {
  usage: function(){
    return RANDOM.pick([
      "You wave the " + ITEM.Stick + " at the $$&ENEMY$.",
      "You try to hit the $$&ENEMY$ with a " + ITEM.Stick + ".",
    ]);
  },
  win: function(){
    return RANDOM.pick([
      "The $$&ENEMY$ dodges your attack pretty easily.",
      "The blow does not seem to hurt the $$&ENEMY$.",
    ]);
  },
};

LANGUAGE.actions[ITEM.Bone] = {
  usage: function(){
    return RANDOM.pick([
      "You try to stab the $$&ENEMY$ with the " + ITEM.Bone + ".",
      "You try to hit the $$&ENEMY$ with your " + ITEM.Bone + ".",
    ]);
  },
  fail: function(){
    return RANDOM.pick([
      "The $$&ENEMY$ dodges your attack pretty easily.",
      "The blow does not seem to hurt the $$&ENEMY$.",
    ]);
  },
  win: function(){
    return "It's enough to get rid of the $$&ENEMY$. However, your makeshift weapon breaks in the process."
  },
};

LANGUAGE.actions[ITEM.Stone] = {
  usage: function(){
    return RANDOM.pick([
      "You try to hit the $$&ENEMY$ with your blunt " + ITEM.Stone + ".",
      "You throw the " + ITEM.Stone + " at the $$&ENEMY$.",
    ]);
  },
  fail: function(){
    return RANDOM.pick([
      "The $$&ENEMY$ dodges it pretty easily.",
      "It doesn't seem very _effective. The $$&ENEMY$ doesn't budge.",
    ]);
  },
  win: function(){
    return "It's enough to rid you of it. You throw the dirty " + ITEM.Stone + " away.";
  },
};

LANGUAGE.actions[ITEM.Elixir_fire] = {
  usage: function(){
    return "You throw the " + ITEM.Elixir_fire + " on the ground, near the $$&ENEMY$.";
  },
  win: function(){
    return "The glass bottle explodes and immediately turns into a ball of fire that roasts your face a little.";
  },
};

LANGUAGE.actions[ITEM.Sword_wooden] = {
  usage: function(){
    return "You attemp to stab the $$&ENEMY$ with your " + ITEM.Sword_wooden + ".";
  },
  win: function(){
    return "It's pretty dull, but it's enough to get rid of the $$&ENEMY$.";
  },
};

LANGUAGE.actions[ITEM.Fang] = {
  usage: function(){
    return "You stab the $$&ENEMY$ with the " + ITEM.Fang + " still dripping with venom.";
  },
  win: function(){
    return "The $$&ENEMY$ convulses and then falls on the ground.";
  },
};
