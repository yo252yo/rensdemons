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
  fail: function(){
    return get_language(ITEM.Elixir_fire, [defend_dodge]);
  },
  win: function(){
    return `The glass bottle explodes and immediately turns into a ball of fire that roasts your face a little.`;
  },
};

LANGUAGE.actions[ITEM.Sword_wooden] = {
  usage: function(){
    return get_language(ITEM.Sword_wooden, [attack_pointy, attack_blunt]);
  },
  fail: function(){
    return get_language(ITEM.Sword_wooden, [defend_dodge, defend_tank]);
  },
  win: function(){
    return `It's pretty dull, but it's enough to get rid of the $$&ENEMY$.`;
  },
};

LANGUAGE.actions[ITEM.Sword_iron] = {
  usage: function(){
    return get_language(ITEM.Sword_iron, [attack_pointy, attack_blunt]);
  },
  fail: function(){
    return get_language(ITEM.Sword_iron, [defend_dodge, defend_tank]);
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
  fail: function(){
    return get_language(ITEM.Sword_great, [defend_dodge, defend_tank]);
  },
  win: function(){
    return RANDOM.pick([
      `Your weapon slashes through the air in a blinding ray of light, before hitting the $$&ENEMY$ which perishes under the blow.`,
      `There is a ringing as your sword cuts through the air before reaching its target. It cleanly slashes the $$&ENEMY$ in half.`,
      `The blow hits hard when it lands, and leaves a deep cut on the $$&ENEMY$. The $$&ENEMY$ twitches, shocked, before giving its last breath.`
    ]);
  },
};

LANGUAGE.actions[ITEM.Sword_legend] = {
  usage: function(){
    return get_language(ITEM.Sword_legend, [attack_pointy, attack_blunt]);
  },
  fail: function(){
    return get_language(ITEM.Sword_legend, [defend_dodge, defend_tank]);
  },
  win: function(){
    return RANDOM.pick([
      `The air around you seems to tremble as you brandish your holy weapon. You can almost hear the Goddess' blessing as your arm slashes in front of you and reduces the $$&ENEMY$ to a pile of ash.`,
      `A ray of holy light accompanies your blow. Through the holy powers imbued in your sword, the Goddess smites your enemy and reduces it to dust.`,
      `The flurry of the sword is almost too fast to be seen. It looks as if a ray of light pierced your enemy. It disappears instantly.`
    ]);
  },
};

LANGUAGE.actions[ITEM.Dagger] = {
  usage: function(){
    return get_language(ITEM.Dagger, [attack_pointy]);
  },
  fail: function(){
    return get_language(ITEM.Dagger, [defend_dodge, defend_tank]);
  },
  win: function(){
    return RANDOM.pick([
      `You manage to get close enough to the $$&ENEMY$ to plant your dagger into it. You're close enough to feel it tremble as the last breath of life leaves it.`,
      `You need to move carefully, but you finally get in range to slash your target with your weapon. You then withdraw in fear, wondering if it would be enough, but the $$&ENEMY$ falls on the ground, confirming your victory.`,
      `In a last ditch effort, you throw the dagger at your enemy. Much to your surprise, it hits the $$&ENEMY$ and takes its life.`
    ]);
  },
};

LANGUAGE.actions[ITEM.Axe] = {
  usage: function(){
    return get_language(ITEM.Axe, [attack_blunt]);
  },
  fail: function(){
    return get_language(ITEM.Axe, [defend_dodge, defend_tank]);
  },
  win: function(){
    return RANDOM.pick([
      `You slash the $$&ENEMY$ with your massive axe. The disjointed body parts hit the ground with a morbid sound.`,
      `You shudder as you hear the metal of your blade tear through your target's body. The $$&ENEMY$ will not survive this.`,
      `Your axe hits the $$&ENEMY$ with a fatal blow. The slashed lifeless body falls on the ground.`,
    ]);
  },
};

LANGUAGE.actions[ITEM.Mace] = {
  usage: function(){
    return get_language(ITEM.Mace, [attack_blunt]);
  },
  fail: function(){
    return get_language(ITEM.Mace, [defend_dodge, defend_tank]);
  },
  win: function(){
    return RANDOM.pick([
      `Your mace smashes the $$&ENEMY$ with an awful crushing sound that resonates all around you.`,
      `The blow from your mace sends the $$&ENEMY$ tumbling back. It will not recuperate from this shock.`,
      `The mace is heavy and hard to manoeuvre, but it leaves a visible dent in the body of the $$&ENEMY$ which is rendered unable to fight.`,
    ]);
  },
};

LANGUAGE.actions[ITEM.War_hammer] = {
  usage: function(){
    return get_language(ITEM.War_hammer, [attack_blunt]);
  },
  fail: function(){
    return get_language(ITEM.War_hammer, [defend_dodge, defend_tank]);
  },
  win: function(){
    return RANDOM.pick([
      `The massive hammer, charged by the inertia of your arm, explodes the poor $$&ENEMY$ into little fragments that go flying around.`,
      `You need an ample motion to wave the heavy weapon, but it is worth it when the strength of the shock propells the $$&ENEMY$ a few steps behind.`,
      `You barely feel any resistance when your hammer hits its target, but you do hear the chilling sound of the $$&ENEMY$ being crushed by your blow.`,
    ]);
  },
};

LANGUAGE.actions[ITEM.Spear] = {
  usage: function(){
    return get_language(ITEM.Spear, [attack_pointy]);
  },
  fail: function(){
    return get_language(ITEM.Spear, [defend_dodge, defend_tank]);
  },
  win: function(){
    return RANDOM.pick([
      `Your spear goes right through the $$&ENEMY$, which falls dead in an instant.`,
      `The spear pierces the air with a whistling sound before slashing through the $$&ENEMY$.`,
      `The protection of the $$&ENEMY$ is no match for your spear which punctures it and leaves it lifeless.`,
    ]);
  },
};


LANGUAGE.actions[ITEM.Fang] = {
  usage: function(){
    var flair = [``, `It is still dripping with venom.`];
    return get_language(ITEM.Fang, [attack_pointy]) + RANDOM.pick(flair);
  },
  fail: function(){
    return get_language(ITEM.Fang, [defend_dodge, defend_tank]);
  },
  win: function(){
    return `The $$&ENEMY$ convulses and then falls on the ground.`;
  },
};
