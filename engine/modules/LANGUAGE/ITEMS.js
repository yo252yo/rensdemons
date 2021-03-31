var attack_blunt = function(name){
  return [`You try to hit the $$&ENEMY$ with your ${name}.`,
          `You swing your ${name} in the direction of the $$&ENEMY$.`,
          `You attempt to strike the $$&ENEMY$ with the ${name}.`];
};
var attack_pointy = function(name){
  return [`You attemp to stab the $$&ENEMY$ with your ${name}.`,
          `You jump forward, ${name} first, to pierce the $$&ENEMY$.`,
          `You wave the ${name} at the $$&ENEMY$.`];
};
var attack_throw = function(name){
  return [`You throw the ${name} at the $$&ENEMY$.`,
          `You toss the ${name} towards the $$&ENEMY$.`];
}
var defend_dodge = function(name){
  return [`The $$&ENEMY$ avoids your attack pretty easily.`,
          `The $$&ENEMY$ has no problem dodging.`,
          `You $$&ENEMY$ dodges your ${name}.`,
          `You $$&ENEMY$ jumps to the side, and your ${name} misses it.`,
          `The $$&ENEMY$ just gets out of the way, and recovers its position.`,
          `This doesn't seem to hit the $$&ENEMY$.`];
}
var defend_tank = function(name){
  return [`The blow does not seem to hurt the $$&ENEMY$.`,
          `It doesn't seem very effective. The $$&ENEMY$ doesn't budge.`,
          `The $$&ENEMY$ is hit, but it seems too painless for it to matter.`,
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

var get_elixir_flair = function(){
  return RANDOM.pick([``, `It explodes on the ground, near the $$&ENEMY$.`]);
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
    return get_language(ITEM.Elixir_fire, [attack_throw]) + " " + get_elixir_flair();
  },
  fail: function(){
    return get_language(ITEM.Elixir_fire, [defend_dodge]);
  },
  win: function(){
    return `The glass bottle explodes and immediately turns into a ball of fire that roasts your face a little.`;
  },
};

LANGUAGE.actions[ITEM.Elixir_ice] = {
  usage: function(){
    return get_language(ITEM.Elixir_ice, [attack_throw]) + " " + get_elixir_flair();
  },
  fail: function(){
    return get_language(ITEM.Elixir_ice, [defend_dodge]);
  },
  win: function(){
    return RANDOM.pick([
      `The bottle shatters near the $$&ENEMY$ and a mist spreads in the air.`,
      `You see a unnatural chilling vapor escape the bottle.`,
      `The glass container explodes and a shimmering fog expands out of it.`
    ]) + " " + RANDOM.pick([
      `It soon engulfes the $$&ENEMY$ and crystalizes around it.`,
      `It's not long before the $$&ENEMY$ is entirely covered by the shiny gas. It imperceptibly turns into ice.`,
      `The substance propagates its biting freeze, until the $$&ENEMY$ is covered by a thin layer of ice.`
    ]) + " " + RANDOM.pick([
      `The $$&ENEMY$ is no more than an statue of ice.`,
      `A simple hit is enough to break your frozen opponent into a million tiny pieces.`,
    ]);
  },
};

LANGUAGE.actions[ITEM.Elixir_decay] = {
  usage: function(){
    return get_language(ITEM.Elixir_decay, [attack_throw]) + " " + get_elixir_flair();
  },
  fail: function(){
    return get_language(ITEM.Elixir_decay, [defend_dodge]);
  },
  win: function(){
    return RANDOM.pick([
      `The bottle shatters near the $$&ENEMY$ and splashes its bubbly viscous content all over it.`,
      `The bottle empties its content on the $$&ENEMY$.`,
      `The glass container explodes and covers the $$&ENEMY$ of its liquid content.`
    ]) + " " + RANDOM.pick([
      `You see the body of the $$&ENEMY$ wither under the desctructive effect of the potion.`,
      `The acid mixture burns through the $$&ENEMY$ and consumes its body.`,
      `The unholy potion decomposes the body of the $$&ENEMY$, which starts to crumble before your eyes.`
    ]) + " " + RANDOM.pick([
      `Soon, the $$&ENEMY$ is nothing but a formless goo that you can just step over.`,
      `All that remains of the disintegrated $$&ENEMY$ is a few traces on the ground.`,
    ]);
  },
};

LANGUAGE.actions[ITEM.Elixir_chaos] = {
  usage: function(){
    return get_language(ITEM.Elixir_chaos, [attack_throw]) + " " + get_elixir_flair();
  },
  fail: function(){
    return get_language(ITEM.Elixir_chaos, [defend_dodge]);
  },
  win: function(){
    return RANDOM.pick([
      `The bottle shatters near the $$&ENEMY$, unleashing what appears to be an black sphere.`,
      `As soon as it broken, the fuzzy obsidian sphere that the bottle contained starts floating in the air in front of the $$&ENEMY$.`,
      `The glass container explodes to reveals a dark orb that hovers near the $$&ENEMY$.`
    ]) + " " + RANDOM.pick([
      `The trembling body of darkness seems to suck up everything around it. The $$&ENEMY$ struggles, but eventually gives in to its unnatural gravitational pull.`,
      `Turbulent currents animate the air around the mysterious object, slashing the $$&ENEMY$ and pulling it closer and closer to the dark anomaly.`,
      `The mysterious black shape seems to engulf even light, and appears more dark than anything you've seen before. Its borders vascillate, and grow to capture the $$&ENEMY$.`,
    ]) + " " + RANDOM.pick([
      `Finally, in a pop, the black hole disappears out of existence, leaving no trace anything ever happened.`,
      `The black hole simply vanishes, taking with it your former foe.`,
    ]);
  },
};

LANGUAGE.actions[ITEM.Elixir_vine] = {
  usage: function(){
    return get_language(ITEM.Elixir_vine, [attack_throw]) + " " + get_elixir_flair();
  },
  fail: function(){
    return get_language(ITEM.Elixir_vine, [defend_dodge]);
  },
  win: function(){
    return RANDOM.pick([
      `The bottle shatters near the $$&ENEMY$, and immediately roots start stemming out from it.`,
      `The seeds contained in the bottle spread out around the $$&ENEMY$ and burgeon into roots.`,
      `The glass container explodes spreading a cloud of seeds that fall on the ground and germinate into small plants.`
    ]) + " " + RANDOM.pick([
      `The vines grow at an incredible pace all around the $$&ENEMY$ and quickly ensnare it.`,
      `Vines surround the $$&ENEMY$ and squeeze it into a deadly embrace.`,
      `The vegetal grows in an instant, spreading its stems all over the $$&ENEMY$ whose struggle amounts to nothing.`,
    ]) + " " + RANDOM.pick([
      `The $$&ENEMY$ is left unable to move, forever frozen as a vegetal scultpure.`,
      `There is now a tree where the $$&ENEMY$ used to be, and you can barely make out the features of your enemy in the shapes of its bark.`,
    ]);
  },
};

LANGUAGE.actions[ITEM.Elixir_venom] = {
  usage: function(){
    return get_language(ITEM.Elixir_venom, [attack_throw]) + " " + get_elixir_flair();
  },
  fail: function(){
    return get_language(ITEM.Elixir_venom, [defend_dodge]);
  },
  win: function(){
    return RANDOM.pick([
      `The bottle shatters near the $$&ENEMY$, and the colored gas it contained spreads around the $$&ENEMY$.`,
      `The gas contained in the bottle surrounds the $$&ENEMY$.`,
      `The glass container explodes in a cloud of toxic fumes.`
    ]) + " " + RANDOM.pick([
      `The $$&ENEMY$'d body contorts in spasms as it breathes the poison.`,
      `The poisonous smoke penetrates inside the $$&ENEMY$ and starts destroying its body.`,
      `There is no choice left for the $$&ENEMY$ but to breathe in the poisonous gas.`,
    ]) + " " + RANDOM.pick([
      `The corpse of the $$&ENEMY$ is still convulsing when it touches the ground.`,
      `The $$&ENEMY$ falls lifeless on the ground.`,
    ]);
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

LANGUAGE.actions[ITEM.Shield] = {
  usage: function(){
    return get_language(ITEM.Shield, [attack_blunt]);
  },
  fail: function(){
    return get_language(ITEM.Shield, [defend_dodge, defend_tank]);
  },
  win: function(){
    return RANDOM.pick([
      `You protect yourself from the blows of the $$&ENEMY$ with your trusty shield, as you dash towards it. You crash into the $$&ENEMY$ and push it to the ground.`,
      `You slam your shield into the $$&ENEMY$ in a wide gesture. The smash makes a big noise and leaves the $$&ENEMY$ completely stunned.`,
      `You hit the $$&ENEMY$ with your shield while parrying its attacks. It pushes your opponent back. The shock makes the $$&ENEMY$ lose its equilibrium, and then its consciousness.`,
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
      `You need an ample motion to wave the heavy weapon, but it is worth it when the strength of the shock propells the $$&ENEMY$, or rather what's left of it, out of your way.`,
      `You barely feel any resistance when your hammer hits its target, but you do hear the chilling sound of the $$&ENEMY$ being crushed by your blow. What remains is better left undescribed.`,
    ]);
  },
};

LANGUAGE.actions[ITEM.Staff] = {
  usage: function(){
    return RANDOM.pick([
      `You brandish your legendary staff, entrusting your fate to the generations of wise wizards who honed it before you, and theatrically hit the ground with it.`,
      `You lift the enchanted staff in the air and spins it faster and faster. You can feel the ancestral powers living deep in the wood waking up.`,
      `You feel the mighty staff shake with magical power within your firm grasp. You point it in the direction of the $$&ENEMY$.`,
    ]);
  },
  fail: function(){
    return get_language(ITEM.Staff, [defend_dodge]);
  },
  win: function(){
    return RANDOM.pick([
      `A huge flash of light blinds you, a thunderous crack deafens you. The fabric of reality itself seems to shake. The next time you look up, the $$&ENEMY$ has simply been wiped out of existence.`,
      `A halo flashes around the legendary rod, and a similar light wraps up the $$&ENEMY$. A second later, the $$&ENEMY$ is simply gone, and there is no trace of it having ever existed.`,
      `The legendary artifact jolts so strongly that you almost lose hold of it. There is a popping noise as the $$&ENEMY$ vanishes.`,
    ]);
  },
};

LANGUAGE.actions[ITEM.Wand] = {
  usage: function(){
    return RANDOM.pick([
      `You point your magic wand in the direction of the $$&ENEMY$. You can feel a burst of energy rising in your chest and pulsing through your arm to the legendary artifact.`,
      `You take the enchanted wand and wave it towards the $$&ENEMY$. Its tip sparks up as your motion seems to rip the very fabric of the universe.`,
      `You dramatically lift the enchanted wand above your head. You can almost feel the ethereal energies converging to the mythical rod. You then unleash its power by a swift gesture aimed at the $$&ENEMY$.`,
    ]);
  },
  fail: function(){
    return get_language(ITEM.Wand, [defend_dodge]);
  },
  win: function(){
    return RANDOM.pick([
      `An orb of pure energy stems out of the magic wood. It crepitates as it traverses the air at extreme speeds to finish its course right on the $$&ENEMY$. It is disintegrated on the spot.`,
      `A ray of energy sprawls out of the enchanted wood. It cuts the air like lightning and lands with perfect precision on the $$&ENEMY$. It pierces through the body of your foe, which simply vanishes.`,
      `The wand liberates a projectile of pure magic force that crashes into the $$&ENEMY$ who immediately explodes in a luminous burst of ethereal colors.`,
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

LANGUAGE.actions[ITEM.Arrow] = {
  usage: function(){
    return RANDOM.pick([
      `You take your bow and load an arrow.`,
      `In a swift motion, you grab and load your bow.`,
      `You get your bow.`,
    ]) + " " + RANDOM.pick([
      `You calmly take aim at the $$&ENEMY$.`,
      `You draw slow breath to steady your aim, and close one eye to target the $$&ENEMY$.`,
      `You try to focus your mind and aim for the weak points of the $$&ENEMY$.`,
    ]);
  },
  fail: function(){
    return get_language(ITEM.Arrow, [defend_dodge, defend_tank]);
  },
  win: function(){
    return RANDOM.pick([
      `Your arrow lands right into the $$&ENEMY$'s vital point. It drops dead on the spot.`,
      `You manage to lodge your projectile on the most vulnerable part of the $$&ENEMY$'s body, taking it down with this last shot.`,
      `Your arrow pierces through the $$&ENEMY$, and comes out the other side with a gush of blood.`,
    ]);
  },
};

LANGUAGE.actions[ITEM.Poison_darts] = {
  usage: function(){
    return get_language(ITEM.Poison_darts, [attack_throw]);
  },
  fail: function(){
    return get_language(ITEM.Poison_darts, [defend_dodge, defend_tank]);
  },
  win: function(){
    return RANDOM.pick([
      `Your dart lands on the $$&ENEMY$. The poison takes a few moments to propagate through its body, but before soon the $$&ENEMY$ is on the floor, lifeless.`,
      `The needle scratches the $$&ENEMY$. It's enough for the poison to take effect. The $$&ENEMY$ is shaken by convulsions for a while, before falling dead on the ground.`,
      `You manage to hit a soft spot in the $$&ENEMY$'s body. The blow is already a serious injury, but the poison finishes it off.`,
    ]);
  },
};

LANGUAGE.actions[ITEM.Net] = {
  usage: function(){
    return get_language(ITEM.Net, [attack_throw]);
  },
  fail: function(){
    return get_language(ITEM.Net, [defend_dodge]);
  },
  win: function(){
    return RANDOM.pick([
      `The $$&ENEMY$ struggles for a bit, but it soon understands it cannot escape your net.`,
      `The net lands on the $$&ENEMY$ and fully immobilizes it. There is no more threat.`,
      `Your net captures the $$&ENEMY$. With each struggling motion, it only entangles itself more. Before long, the $$&ENEMY$ is unable to move.`,
    ]);
  },
};

LANGUAGE.actions[ITEM.Rope] = {
  usage: function(){
    return get_language(ITEM.Rope, [attack_throw]);
  },
  fail: function(){
    return get_language(ITEM.Rope, [defend_dodge]);
  },
  win: function(){
    return RANDOM.pick([
      `You manage to capture the $$&ENEMY$ with your lasso. It struggles for a while, but you hold on and don't let it go.`,
      `You expertly launch the rope toward the $$&ENEMY$'s limbs. It successfully entangles them. The $$&ENEMY$ stumbles and falls, and you take advantage of this to tie the rope and seal the deal.`,
      `Your lariat manages to grab the $$&ENEMY$. With a jolt on the rope, you make it lose its footing. A few more expert gestures convert your rope into a permanent prison.`,
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
