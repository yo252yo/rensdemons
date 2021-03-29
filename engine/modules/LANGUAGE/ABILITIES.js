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
                      `It appears clear that this spell will not work this time.`,
                      `The $$&ENEMY$ seems unaffected by your spell.`,
                      `The $$&ENEMY$ resists against your efforts without trouble.`,
                      `The $$&ENEMY$ is resilient to this spell. Nothing happens.`,
                      `Your spell has no effect.`]);
};

var fail_ability = function(){
  return RANDOM.pick([`Your attempt does not have any effect.`,
                      `It appears clear that this technique will not work this time.`,
                      `The $$&ENEMY$ seems unaffected by your attempt.`,
                      `The $$&ENEMY$ resists against your efforts without trouble.`,
                      `The $$&ENEMY$ is resilient to this technique. Nothing happens.`]);
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

LANGUAGE.actions[ABILITY.Asphyxiate] = {
  usage: function(){
    return cast_spell(ABILITY.Asphyxiate) + RANDOM.pick([
      `You instruct the spirits of the air to avoid the $$&ENEMY$, leaving it unable to breathe.`,
      `Focusing your mind, you chase the atmosphere away from the $$&ENEMY$.`,
      `You manipulate the forces of magic to apply a strong pressure on the $$&ENEMY$.`,
    ]);
  },
  fail: fail_spell,
  win: function(){
    return RANDOM.pick([
      `The $$&ENEMY$ struggles to catch its breath. You see it twitch a little before falling lifeless on the ground.`,
      `The $$&ENEMY$ is so crushed that it cannot take a single breath. It drops dead, gasping for air.`,
      `The air around the $$&ENEMY$ wears thin. You can hear the wheezing sound of its breath as it falls unconscious.`,
    ]);
  },
};

LANGUAGE.actions[ABILITY.Earthquake] = {
  usage: function(){
    return cast_spell(ABILITY.Earthquake) + RANDOM.pick([
      `You summon telluric currents and redirects to them towards the $$&ENEMY$. The ground begins to tremble under it.`,
      `You focus your attention on your feet and send magical shockwaves towards the $$&ENEMY$.`,
      `You hear a tremor in the ground before feeling anything, as the spirits of the soil begin to answer your call.`,
    ]);
  },
  fail: fail_spell,
  win: function(){
    return RANDOM.pick([
      `The ground vibrations grow stronger and stronger, until the $$&ENEMY$ cannot stand anymore. When the tremor ceases, it seems stunned in place.`,
      `The earth shakes around the $$&ENEMY$, and suddenly shatters in a loud crack. A rift forms under the $$&ENEMY$, and before soon it is falling to a neverending doom in the insides of the planet.`,
      `The tremor of the ground seems to grow in strengh. The rumbling noise is deafening. It seems that under the strain, the $$&ENEMY$'s whole body collapses.`,
    ]);
  },
};

LANGUAGE.actions[ABILITY.Incinerate] = {
  usage: function(){
    return cast_spell(ABILITY.Incinerate) + RANDOM.pick([
      `Instead of summoning a fireball, you attempt to start a blaze directly inside the body of the $$&ENEMY$.`,
      `You use your magic forces to manipulate the energy flow of the $$&ENEMY$, and attempt to derail it and set it ablaze.`,
      `You focus your attention on the atoms that constitute the $$&ENEMY$. You try to increase their activity to raise the temperature.`,
    ]);
  },
  fail: fail_spell,
  win: function(){
    return RANDOM.pick([
      `Suddenly, the $$&ENEMY$ takes on fire from the inside. It emits an ungodly roar as its body gets consumed by the flames.`,
      `The $$&ENEMY$ barely has time to break a sweat before turning all red, then black, and crumbling into ash.`,
      `The $$&ENEMY$ becomes suddenly ablaze. Nothing seems to reduce the heat consuming it. You see the $$&ENEMY$ roll on the floor in a vain attempt to quiet the inferno, before passing out, contorted by pain.`,
    ]);
  },
};

LANGUAGE.actions[ABILITY.Summon] = {
  usage: function(){
    return cast_spell(ABILITY.Summon) + RANDOM.pick([
      `Armed with your magic training, you atune yourself with the forces of nature and call for their help.`,
      `You send your mind in the ethereal realms, in the hope to find kindred spirits who may come to your rescue.`,
      `You send a magic signal beckoning mythical creatures to come to you.`,
    ]);
  },
  fail: fail_spell,
  win: function(){ // fairy, griffin, cerberus, hydra
    return RANDOM.pick([
      `You hear a growl from afar, and soon the air trembles around you. Answering your call, a mighty dragon approaches at an incredible speed. Its wide obsidian scales shine as it dashes towards the $$&ENEMY$. It opens his maw, revealing a set of sharp pointy teeth, and grabs its prey in a swift motion. It then flies away as fast as it came.`,
      `What seems like a ball of fire drops from the sky, but as it approaches you see a majestic phoenix spread its wing. It floats a few seconds above you, radiating sparks that crackle in the heated air. Suddenly, it opens its beak, and spouts a torrent of wildfire on the $$&ENEMY$. When the phoenix flipts its wing to take off, there's nothing but dust to be blown away.`,
      `You hear the sound of hooves before you see the legendary animal coming towards you. The unicorn's immaculate mane is almost blinding. It rears up and neighs before dashing towards the $$&ENEMY$. As this incredible speed, it only takes a second before your foe is taken towards the horizon, impaled on the mythical horn.`,
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

LANGUAGE.actions[ABILITY.Petrify] = {
  usage: function(){
    return cast_spell(ABILITY.Petrify) + RANDOM.pick([
      `You call upon the forces of magic to manipulate the very matter in the body of the $$&ENEMY$, and order it to stop moving.`,
      `You try to paralyze the $$&ENEMY$ by pressuring it with ethereal forces.`,
      `You project magic forces onto the $$&ENEMY$ to prevent any motion.`,
    ]);
  },
  fail: fail_spell,
  win: function(){
    return RANDOM.pick([
      `The $$&ENEMY$ becomes stiff and lifeless as a statue. You can easily ignore it now.`,
      `The petrified body of the $$&ENEMY$ falls on the ground as it's no longer able to maintain its balance.`,
      `The $$&ENEMY$ seems to struggle for a bit, with an unnatural growl, before freezing completely in place.`,
    ]);
  },
};

LANGUAGE.actions[ABILITY.Poison] = {
  usage: function(){
    return cast_spell(ABILITY.Poison) + RANDOM.pick([
      `You try to use your arcanic knowledge of body energy to turn the $$&ENEMY$'s own flesh against itself.`,
      `You focus your magical energy into turning the $$&ENEMY$'s bodily fluids into deadly poison.`,
      `You try to inject magically a strong poison into the body of the $$&ENEMY$.`,
    ]);
  },
  fail: fail_spell,
  win: function(){
    return RANDOM.pick([
      `The $$&ENEMY$ is taken by violent spasms that don't even stop when it falls lifeless on the ground.`,
      `Your magical senses perceive that the poison spreads through the $$&ENEMY$ before it begins shakind uncontrollably and pass out in agony.`,
      `The $$&ENEMY$ stumbles as strengh leaves its body, consumed by your venomous fluids. Soon, it is rendered inert.`,
    ]);
  },
};

LANGUAGE.actions[ABILITY.Shrink] = {
  usage: function(){
    return cast_spell(ABILITY.Shrink) + RANDOM.pick([
      `You pull on the fabric of the universe in an attempt to compress the $$&ENEMY$ and squeeze it out of existence.`,
      `Through magic, you apply an enormous pressure force on the $$&ENEMY$.`,
      `You attempt to use your mastery of etheral forces to compress the space around the $$&ENEMY$.`,
    ]);
  },
  fail: fail_spell,
  win: function(){
    return RANDOM.pick([
      `As you manipulate the very structure of space around the $$&ENEMY$, you see it getting smaller and smaller, until nothing is left but a small dot that vanishes away in a pop.`,
      `The $$&ENEMY$'s body contorts in pain under the external pressure. It seems to collapse on itself until there's no sign left it ever existed.`,
      `You can see the $$&ENEMY$'s body squeezed from all sides. It gets thiner, smaller... It becomes more and more like a spherical blob as it slowly turns into a single speck of dust that gets blown away by a breeze.`,
    ]);
  },
};

LANGUAGE.actions[ABILITY.Confusion] = {
  usage: function(){
    return cast_spell(ABILITY.Confusion) + RANDOM.pick([
      `You call on the forces of magic to confuse the senses of the $$&ENEMY$ and render it unable to fight.`,
      `You try to magically mess with the spirit of the $$&ENEMY$ to make it not see you.`,
      `You send through the ether confusing pictures to the mind of the $$&ENEMY$.`,
    ]);
  },
  fail: fail_spell,
  win: function(){
    return RANDOM.pick([
      `The $$&ENEMY$ stumbles hesitantly. It searches the air in front, in a desperate attempt to attack you, but it's hopeless. You manage to get away safely.`,
      `Without its senses, the $$&ENEMY$ cannot keep track of you when you move. You walk casually around it, watching it struggle against nothing.`,
      `You take advantage of the confused senses of the $$&ENEMY$ to run past it.`,
    ]);
  },
};

LANGUAGE.actions[ABILITY.Lull] = {
  usage: function(){
    return cast_spell(ABILITY.Lull) + RANDOM.pick([
      `You call upon your mastery of ethereal arts to control the mind of the $$&ENEMY$ and to force it to fall asleep.`,
      `You use your magic to instill in the $$&ENEMY$'s thoughts an urge to sleep.`,
      `Through magic, you tamper with the perceptions of the $$&ENEMY$ in order to make its whole body feel sluggish and heavy.`,
    ]);
  },
  fail: fail_spell,
  win: function(){
    return RANDOM.pick([
      `It only takes a few seconds for the spell to work and put the $$&ENEMY$ in a deep sleep.`,
      `The $$&ENEMY$'s motions get lethargic, and you can clearly see that even the smallest motion becomes an intense effort. Finally, the $$&ENEMY$ falls unconscious.`,
      `You manage to trick the senses of the $$&ENEMY$ into a state of deep relaxation. The $$&ENEMY$ is lost in its transe, barely breathing, when you pass by it.`,
    ]);
  },
};

LANGUAGE.actions[ABILITY.Persuade] = {
  usage: function(){
    RANDOM.pick([
      `Using your training, you gather your best arguments to convince your opponent to give up.`,
      `You look at the $$&ENEMY$ with determination and starts explaining why there is actually no need to fight.`,
      `You brace yourself for a powerful speech. You start declaiming a series of to-the-point arguments illustrating the pointlessness of this battle.`,
    ]);
  },
  fail: fail_ability,
  win: function(){
    return RANDOM.pick([
      `The $$&ENEMY$ is somehow seemingly convinced. It gives up the fight.`,
      `As it listens to your plead, the $$&ENEMY$ seems to comprehend and empathize with it. It seems that you found an amicable resolution.`,
      `Against all odds, the $$&ENEMY$ seems to respond to your rhetoric and agree to your points. It stops opposing you.`,
    ]);
  },
};

LANGUAGE.actions[ABILITY.Intimidate] = {
  usage: function(){
    RANDOM.pick([
      `You recall your training and start making a series of complex gestures and sounds that is supposed to impress your dominance over the $$&ENEMY$'s subconscious.`,
      `Chosing your words carefully, you attempt to establish yourself as a strong presence through sheer display of rhetoric.`,
      `You threaten the $$&ENEMY$ by exposing calmly and rationally how everything works in your favor for you to win this fight.`,
      `You pick a vocabulary that is as slashing as elegant as you attempt to intimidate the $$&ENEMY$ through lyricality and rhymes.`,
    ]);
  },
  fail: fail_ability,
  win: function(){
    return RANDOM.pick([
      `Your words seem to have successfully frightened the $$&ENEMY$ who runs away in a panic.`,
      `The $$&ENEMY$ loses composure as you progress in your routine. Soon, the $$&ENEMY$ starts to tremble with fear, and simply dashes away.`,
      `Your charisma seems to work wonders on the $$&ENEMY$. It quickly gets so terrified that it stops opposing any resistance.`,
    ]);
  },
};
