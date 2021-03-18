var cast_spell = function(name){
  return RANDOM.pick([
    `You focus your spirits and try to cast the spell ${name}.`,
    `You try to use your magic talents on the $$&ENEMY$.`,
    `You try to cast ${name} on the $$&ENEMY$.`,
    `Invoking the ethereal forces of magic, you attempt to use  ${name}.`
  ]) + " ";
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
      `A bubbling ball of fire forms in front of you. You send it away from you in a gesture.`,
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

LANGUAGE.actions[ABILITY.Ice_bolt] = {
  usage: function(){
    return cast_spell(ABILITY.Ice_bolt) + RANDOM.pick([
      `Droplets of water in the air in front of you crystalize and congregate. Soon, you're looking at a sizeable block of ice, that you propel towards the $$&ENEMY$.`,
      `The air grows cold around you as you summon a blade of razor-thin ice in your hand, and throw it at your target.`,
      `You gather the humidity in the air and shape it into an ice dagger. Your will pushes it towards the $$&ENEMY$.`
    ]);
  },
  fail: fail_spell,
  win: function(){
    return RANDOM.pick([
      `The fragment of ice shatters on impact, into a myriad of splinters that lacerate the $$&ENEMY$.`,
      `The bolt of ice pierces the body of the $$&ENEMY$, which falls lifeless on the ground.`,
      `The icy crystal crashes into the $$&ENEMY$ at full speed. It sways and falls on the ground, in the middle of a sea of ice shards.`
    ]);
  },
};

LANGUAGE.actions[ABILITY.Thunder] = {
  usage: function(){
    return cast_spell(ABILITY.Thunder) + RANDOM.pick([
      `You confer with the spirits of nature and borrow their strength to form a powerful ray of energy.`,
      `The air dries around you, and a crinkling noise can be heard, as a blinding strike of lightning hits the $$&ENEMY$.`,
      `You summon your magical teachings and leverage the power of the thunder storms to smite your foe with a ray of light.`
    ]);
  },
  fail: fail_spell,
  win: function(){
    return RANDOM.pick([
      `A flash blinds you for a second. Then nothing remains of the $$&ENEMY$ but a pile of smoking ash.`,
      `The $$&ENEMY$ shakes violently, moved by an unfathomable amount of energy, before falling dead on the ground.`,
      `The lightning burns through the $$&ENEMY$ and detroys all life from it, rendering no more than an empty shell.`
    ]);
  },
};

LANGUAGE.actions[ABILITY.Storm] = {
  usage: function(){
    return cast_spell(ABILITY.Storm) + RANDOM.pick([
      `You summon the spirits of the winds that start dancing around you. Pretty soon, it is hard to resist the power of their gust. You send them full force towards the $$&ENEMY$.`,
      `You manipulate the air around you and concentrate it in powerful twisters that push back everything around you. By the time it reaches your target, the wind is so strong that you can barely hear anything else.`,
      `You amplify the breeze you feel on your skin by imbuing it with your magical power. You turn it into a deadly whirlwind, whose pressure makes it hard to breathe even for you.`
    ]);
  },
  fail: fail_spell,
  win: function(){
    return RANDOM.pick([
      `The force of the wind thursts the $$&ENEMY$ back. It cannot survive so powerful a shock.`,
      `The $$&ENEMY$ is carried by the tornado, propelled in the air, before crashing to the ground in a loud cracking noise.`,
      `The pressure of the air currents compress your target to incredible levels. You see it shrink under the magic force, before it falls on the ground, lifeless.`
    ]);
  },
};

LANGUAGE.actions[ABILITY.Charm] = {
  usage: function(){
    return cast_spell(ABILITY.Charm) + RANDOM.pick([
      `Through your mastery of magic, you probe the spirit of the $$&ENEMY$ and try to submit it to your control.`,
      `You summon the forces of magic and use them to pressure your target's mind and enslave it to your command.`,
      `You attempt to crush your target's will with your spell.`
    ]);
  },
  fail: fail_spell,
  win: function(){
    return RANDOM.pick([
      `The possession enchantment was a success. The $$&ENEMY$ is at your mercy and does your bidding. There is no more threat.`,
      `Your spirit completely controls the $$&ENEMY$, and it has no choice but to follow your order to leave you alone.`,
      `The $$&ENEMY$ obeys your every command. You order it to go away, and it does.`,
    ]);
  },
};
