LANGUAGE.actions[ITEM.Stick] = {
  useless:{
    description: function(){
      return RANDOM.pick([
        "You wave the stick at the $$&ENEMY$.",
        "You try to hit the $$&ENEMY$ with a stick.",
      ]);
    },
    outcome: function(){
      return RANDOM.pick([
        "The $$&ENEMY$ dodges your attack pretty easily.",
        "The blow does not seem to hurt the $$&ENEMY$.",
      ]);
    },
  }
};

LANGUAGE.actions[ITEM.Bone] = {
  useless:{
    description: function(){
      return RANDOM.pick([
        "You try to stab the $$&ENEMY$ with the bone.",
        "You try to hit the $$&ENEMY$ with your sharp bone.",
      ]);
    },
    outcome: function(){
      return RANDOM.pick([
        "The $$&ENEMY$ dodges your attack pretty easily.",
        "The blow does not seem to hurt the $$&ENEMY$.",
      ]);
    },
  },
  win:{
    description: function(){
      return "You attemp to stab the $$&ENEMY$ with your sharp bone.";
    },
    outcome: function(){
      return "It's enough to get rid of the $$&ENEMY$. However, your makeshift weapon breaks in the process."
    },
  }
};

LANGUAGE.actions[ITEM.Stone] = {
  useless:{
    description: function(){
      return RANDOM.pick([
        "You try to hit the $$&ENEMY$ with your blunt stone.",
        "You throw the stone at the $$&ENEMY$.",
      ]);
    },
    outcome: function(){
      return RANDOM.pick([
        "The $$&ENEMY$ dodges it pretty easily.",
        "It doesn't seem very _effective. The $$&ENEMY$ doesn't budge.",
      ]);
    },
  },
  win:{
    description: function(){
      return "You try to crush the $$&ENEMY$ with the stone.";
    },
    outcome: function(){
      return "It's enough to rid you of it. You throw the dirty stone away.";
    },
  }
};

LANGUAGE.actions[ITEM.Elixir_fire] = {
  win:{
    description: function(){
      return "You throw the elixir on the ground, near the $$&ENEMY$.";
    },
    outcome: function(){
      return "The glass bottle explodes and immediately turns into a ball of fire that roasts your face a little.";
    },
  }
};

LANGUAGE.actions[ITEM.Sword_wooden] = {
  win:{
    description: function(){
      return "You attemp to stab the $$&ENEMY$ with your wooden sword.";
    },
    outcome: function(){
      return "It's pretty dull, but it's enough to get rid of the $$&ENEMY$.";
    },
  }
};

LANGUAGE.actions[ITEM.Fang] = {
  win:{
    description: function(){
      return "You stab the $$&ENEMY$ with the fang still dripping with venom.";
    },
    outcome: function(){
      return "The $$&ENEMY$ convulses and then falls on the ground.";
    },
  }
};
