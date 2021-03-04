var attack_blunt = function(name){
  return [`You try to hit the $$&ENEMY$ with your ${name}.`,
          `You attempt to strike the $$&ENEMY$ with the ${name}.`];
};
var attack_pointy = function(name){
  return [`You attemp to stab the $$&ENEMY$ with your ${name}.`,
          `You wave the ${name} at the $$&ENEMY$.`];
};
var attack_throw = function(name){
  return [`You throw the ${name} at the $$&ENEMY$.`,
          `You toss the ${name} towards the $$&ENEMY$.`];
}
var defend_dodge = function(name){
  return [`The $$&ENEMY$ avoids your attack pretty easily.`,
          `The $$&ENEMY$ has no problem dodging.`,
          `This doesn't seem to hit the $$&ENEMY$.`];
}
var defend_tank = function(name){
  return [`The blow does not seem to hurt the $$&ENEMY$.`,
          `It doesn't seem very effective. The $$&ENEMY$ doesn't budge.`,
          `The $$&ENEMY$ is not affected by your attack.`,
          `The $$&ENEMY$ doesn't appear to notice your hit.`];
}

var get_language = function(name, functions){
  var results = [];
  for (var i in functions){
    results = results.concat(functions[i](name));
  }
  return RANDOM.pick(results);
}

LANGUAGE.actions[ITEM.Stick] = {
  usage: function(){
    return get_language(ITEM.Stick, [attack_pointy, attack_blunt]);
  },
  fail: function(){
    return get_language(ITEM.Stick, [defend_dodge, defend_tank]);
  },
};

LANGUAGE.actions[ITEM.Bone] = {
  usage: function(){
    return get_language(ITEM.Bone, [attack_pointy, attack_blunt]);
  },
  fail: function(){
    return get_language(ITEM.Bone, [defend_dodge, defend_tank]);
  },
  win: function(){
    return `It's enough to get rid of the $$&ENEMY$. However, your makeshift weapon breaks in the process.`
  },
};

LANGUAGE.actions[ITEM.Stone] = {
  usage: function(){
    return get_language(ITEM.Stone, [attack_throw, attack_blunt]);
  },
  fail: function(){
    return get_language(ITEM.Stone, [defend_dodge, defend_tank]);
  },
  win: function(){
    return `It's enough to rid you of it. You throw the dirty ` + ITEM.Stone + ` away.`;
  },
};

LANGUAGE.actions[ITEM.Elixir_fire] = {
  usage: function(){
    var flair = [``, `It explodes on the ground, near the $$&ENEMY$.`];
    return get_language(ITEM.Elixir_fire, [attack_throw]) + RANDOM.pick(flair);
  },
  win: function(){
    return `The glass bottle explodes and immediately turns into a ball of fire that roasts your face a little.`;
  },
};

LANGUAGE.actions[ITEM.Sword_wooden] = {
  usage: function(){
    return get_language(ITEM.Sword_wooden, [attack_pointy, attack_blunt]);
  },
  win: function(){
    return `It's pretty dull, but it's enough to get rid of the $$&ENEMY$.`;
  },
};

LANGUAGE.actions[ITEM.Sword_iron] = {
  usage: function(){
    return get_language(ITEM.Sword_iron, [attack_pointy, attack_blunt]);
  },
  win: function(){
    return RANDOM.pick([
      `You defeat the $$&ENEMY$ with a hit of your sword.`,
      `After waving your sword in the air, you finally manage to slash your target. It falls on the ground, powerless.`,
      `This blow from your trusty sword slays the $$&ENEMY$ for good.`
    ]);
  },
};

LANGUAGE.actions[ITEM.Sword_great] = {
  usage: function(){
    return get_language(ITEM.Sword_great, [attack_pointy, attack_blunt]);
  },
  win: function(){
    return RANDOM.pick([
      `Your weapon slashes through the air in a blinding ray of light, before hitting the $$&ENEMY$ which perishes under the blow.`,
      `There is a ringing as your sword cuts through the air before reaching its target. It cleanly slashes the $$&ENEMY$ in half.`,
      `The blow hits hard when it lands, and leaves a deep cut on the $$&ENEMY$. The $$&ENEMY$ twitches, shocked, before giving its last breath.`
    ]);
  },
};



LANGUAGE.actions[ITEM.Fang] = {
  usage: function(){
    var flair = [``, `It is still dripping with venom.`];
    return get_language(ITEM.Fang, [attack_pointy]) + RANDOM.pick(flair);
  },
  win: function(){
    return `The $$&ENEMY$ convulses and then falls on the ground.`;
  },
};
