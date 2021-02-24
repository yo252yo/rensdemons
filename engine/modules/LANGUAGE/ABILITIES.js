var cast_spell = function(name){
  return RANDOM.pick([
    `You focus your spirits and try to cast the spell ${name}.`,
    `You try to use your magic talents on the $$&ENEMY$.`,
    `You try to cast ${name} on the $$&ENEMY$.`
  ]);
};

var fail_spell = function(){
  return RANDOM.pick([`The spell fizzles out without any effect.`,
                      `The $$&ENEMY$ seems unaffected by your spell.`,
                      `The $$&ENEMY$ is resilient to this spell. Nothing happens.`,
                      `Your spell has no effect.`]);
};



LANGUAGE.actions[ABILITY.Pray] = {
  usage: function(){
    return RANDOM.pick([
      `You close your eyes and begs the Goddess for help.`,
      `You focus your thoughts on the Goddess and pray for Her help.`,
      `You pray for the Goddess to come to your rescue.`,
    ])
  },
  fail: function(){
    return RANDOM.pick([
      `The Goddess works in mysterious ways. Nothing happens.`,
      `The Goddess seems to ignore your call.`,
      `The Goddess probably deems that you should solve this situation on your own.`,
      `The Goddess wants you to find your own way.`,
      `The Goddess will not be troubled over such trivial matters.`,
    ]);
  },
};

LANGUAGE.actions[ABILITY.Flee] = {
  usage: function(){
    return RANDOM.pick([
      `You try to run away.`,
      `You turn around and attempt to escape the $$&ENEMY$.`,
      `You back away slowly.`,
    ]);
  },
  fail: function(){
    return RANDOM.pick([
      `In a stroke of luck, you manage to escape.`,
      `The $$&ENEMY$ chases you for a bit, but you manage to escape.`,
      `As you turn around, the $$&ENEMY$ loses interest and runs off in the distance.`,
    ]);
  },
};

LANGUAGE.actions[ABILITY.Fireball] = {
  usage: function(){
    return cast_spell(ABILITY.Fireball) + RANDOM.pick([
      `A bubbling ball of lava forms in front of you. You send it away from you in a gesture.`,
      `The air around you is cracking as the temperature raises, and pretty soon flames dance in your hand, slightly burning your face. You throw the immaterial projectile towards your target.`,
      `A perfectly spherical orb of scorching lava takes form in front of you, and speeds up towards the $$&ENEMY$.`
    ]);
  },
  fail: fail_spell,
  win: function(){
    return RANDOM.pick([
      `The fireball hits the $$&ENEMY$ which screams from the pain.`,
      `The ball hits its target and engulfs it in raging flames. Pretty soon, nothing remains but a pile of ash.`,
      `The incandescent sphere reaches the $$&ENEMY$ in a whirlwind of embers. The smell of burning immediately engulfs the place.`
    ]);
  },
};
