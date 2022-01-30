var summon_friend = function(name) {
  return RANDOM.pick([
    `You ask ${name} for help!`,
    `You decide to let ${name} take care of the $$&ENEMY$.`,
    `You leave the floor to ${name}.`,
  ]) + " ";
};

LANGUAGE.actions[PARTYMEMBERS.BestFriend] = {
  usage: function(){
    var text = summon_friend(DICTIONARY.get(PARTYMEMBERS.BestFriend)) + RANDOM.pick([
      `$$BestFriend$ approaches the $$&ENEMY$ cautiously.`,
      `You watch, terrified, as $$BestFriend$ moves towards the $$&ENEMY$ to try and establish contact.`,
      `$$BestFriend$, brimming with optimism, attempts to establish a link with the $$&ENEMY$ by talking softly to it.`,
      `$$BestFriend$ raises a hand towards the $$&ENEMY$, in an attempt to tame it.`,
    ]);

    var dialog = RANDOM.pick([
      `$$BestFriend$: "If you wouldn't mind letting us through, please?"`,
      `$$BestFriend$: "There's really no need for us to fight!"`,
      `$$BestFriend$: "Must violence always be the answer?"`]);
    return [text, dialog];
  },
  fail: function(){
    return RANDOM.pick([
      `The $$&ENEMY$ pushes $$BestFriend$ away, and charges at the two of you, taking advantage of your vulnerability.`,
      `$$BestFriend$'s attempt is a failure. The $$&ENEMY$ is fiercer than ever, and attacks the both of you.`,
      `The $$&ENEMY$ does not respond well to $$BestFriend$'s approach. $$BestFriend$, disappointed and sad, withdraws in a corner.`,
    ]);
  },
  win: function(){
    return RANDOM.pick([
      `You cannot believe your eyes, but somehow the murmur of $$BestFriend$ managed to win the $$&ENEMY$ over. Completely tamed, it is now harmless to you.`,
      `The soothing voice of $$BestFriend$ succeeds at removing the will to fight from the $$&ENEMY$.`,
      `Perhaps something in the gentle demeanor of $$BestFriend$ touched the heart of the $$&ENEMY$. In any case, it backs away from the fight, leaving you free.`,
    ]);
  },
};

LANGUAGE.actions[PARTYMEMBERS.PreciousChild] = {
  usage: function(){
    var text = summon_friend(DICTIONARY.get(PARTYMEMBERS.PreciousChild)) + RANDOM.pick([
      `$$PreciousChild$ hides behind you, grabbing your arm, peeking shyly at the $$&ENEMY$.`,
      `$$PreciousChild$ tiptoes forward towards the $$&ENEMY$. The child fidgets hesitantly while looking at his opponent.`,
      `$$PreciousChild$ takes your hand, and together you approach the $$&ENEMY$.`,
      `$$PreciousChild$ cheers at the $$&ENEMY$ with a brimming smile.`]);

    var dialog = RANDOM.pick([
      `$$PreciousChild$: "Will you be my friend?"`,
      `$$PreciousChild$: "Please stop being a bad guy."`,
      `$$PreciousChild$: "I will protect my friends!"`]);
    return [text, dialog];
  },
  fail: function(){
    return RANDOM.pick([
      `The $$&ENEMY$ does not seem to notice $$PreciousChild$. Surely, if it did, it would react.`,
      `The shy voice of the little boy does not reach the $$&ENEMY$. You jump in front of $$PreciousChild$ to protect him.`,
      `The $$&ENEMY$ does not react. You're worried about $$PreciousChild$, so you push him out of the way before hostilities pick up.`,
    ]);
  },
  win: function(){
    return RANDOM.pick([
      `The innocent smile of $$PreciousChild$ seems to melt the heart of the $$&ENEMY$. It doesn't want to fight anymore.`,
      `As soon as it sees $$PreciousChild$, the face of the $$&ENEMY$ lights up. $$PreciousChild$'s candor touches its heart and pacifies it for good.`,
      `The $$&ENEMY$ cannot help but be moved by $$PreciousChild$'s innocence. It approaches you, and you can tell that all ill intent is gone.`,
    ]);
  },
};

LANGUAGE.actions[PARTYMEMBERS.UpbeatDojikko] = {
  usage: function(){
    var text = summon_friend(DICTIONARY.get(PARTYMEMBERS.UpbeatDojikko)) + RANDOM.pick([
      `$$UpbeatDojikko$ takes out her crystal ball to peek at the world of the departed. As she gets it out of her bag, however, it sleeps between her fingers. She juggles with it for a moment, as the ball resist her attempts at catching, before finally seizing it.`,
      `$$UpbeatDojikko$ stands in front of the $$&ENEMY$ and takes out her proverbial tarot deck. A draft immediately causes the cards to fly in all directions, and she moans as she puts them back together.`,
      `$$UpbeatDojikko$ closes her eyes and enters a state of trance to communicate with the spirit world. Her body begins to shake, producing a tingling noise from the jewelry she's wearing. She shakes so much that she falls on the ground. She crawls back on all fours.`]);

    var dialog = RANDOM.pick([
      `$$UpbeatDojikko$: "My little spirit friends are calling, why won't you play with them?"`,
      `$$UpbeatDojikko$: "Let me turn your frown upside down!"`,
      `$$UpbeatDojikko$: "You know, the afterlife can be a lot of fun too!"`]);
    return [text, dialog];
  },
  fail: function(){
    return RANDOM.pick([
      `$$UpbeatDojikko$ remembers a bit late that her powers are useless against a $$&ENEMY$. Oopsies.`,
      `It turns out that $$UpbeatDojikko$ has the phobia of the $$&ENEMY$. As soon as she realizes what she's up against, she runs away screaming, flailing her arms in the air.`,
      `It only takes a sudden motion from the $$&ENEMY$ in her direction to make $$UpbeatDojikko$ jump with surprise and fall on her bottom. It looks like she won't be very helpful here.`,
    ]);
  },
  win: function(){
    return RANDOM.pick([
      `$$UpbeatDojikko$ tells the $$&ENEMY$ about the details of its future. The depiction is scaringly accurate, and the $$&ENEMY$ screams to cover her predictions as she describes in gruesome details its upcoming death. The $$&ENEMY$ would rather flee than hearing this.`,
      `$$UpbeatDojikko$ reveals to the $$&ENEMY$ what the spirits showed her. It includes many embarrassing secrets. The $$&ENEMY$ yells in a panic, begging her to stop, before running away.`,
      `$$UpbeatDojikko$ shares with the $$&ENEMY$ her vision of a close friend or relative that the $$&ENEMY$ lost a long time ago. The scene gets surreal as the $$&ENEMY$ starts weeping, crying out for their departed acquaintance. `,
    ]);
  },
};


LANGUAGE.actions[PARTYMEMBERS.StreetSmart] = {
  usage: function(){
    var text = summon_friend(DICTIONARY.get(PARTYMEMBERS.StreetSmart)) + RANDOM.pick([
      `$$StreetSmart$ makes a grand entrance, as usual. He looks at the $$&ENEMY$ mockingly and taunts with a sly smile:`,
      `You need to be very convincing to persuade $$StreetSmart$ to help. Finally, after promising him a large share of the booty, he deigns come to your rescue.`,
      `Moved by the promise of a bribe, $$StreetSmart$ accepts to help. He looks around, gauging the terrain for his beasts, and then begins to work his talent.`]);

    var dialog = RANDOM.pick([
      `$$StreetSmart$: "Did someone call for the best?"`,
      `$$StreetSmart$: "I'll show you why they call me 'King of Beasts'!"`,
      `$$StreetSmart$: "Let's make this quick, my time is precious and you're not worth it."`]);
    return [text, dialog];
  },
  fail: function(){
    return RANDOM.pick([
      `$$StreetSmart$ whistles, calling a vulture which dives on the $$&ENEMY$. Sadly, the $$&ENEMY$ dodges it, and the bird flies off in the distance without having been of any help.`,
      `$$StreetSmart$ snaps his fingers, but nothing happens. He explains majestically that this is not supposed to happen, this is not how it usually goes, and that he didn't really want to do anything anyway.`,
      `$$StreetSmart$ takes a look at the $$&ENEMY$, and goes back to the rear, explaining that it's not his problem and that you really shouldn't bother him for nothing.`,
    ]);
  },
  win: function(){
    return RANDOM.pick([
      `$$StreetSmart$ whistles, and out of nowhere a few falcons speed through the air in a whooshing sound. They dives on the $$&ENEMY$ claws first. The sharpness and the velocity lacerate the $$&ENEMY$ which falls on the ground, but the birds adopt a wide trajectory and come back again and again to beat the $$&ENEMY$ to a pulp in a flurry of beak and claws.`,
      `$$StreetSmart$ moves his lips, as if to make a sound, but it does not seem perceptible to your hear. It reaches its target, though, since you begin to hear a loud rumbling sound coming towards you. Before long, it appears clearly that it's the stomping of an enormous enraged boar that charges mercilessly towards the $$&ENEMY$. Not only is the $$&ENEMY$ projected backwards by the shock of the impact, but the beast continues its course and tramples its defenseless prey.`,
      `$$StreetSmart$ opens one of the pockets of his leather coat, and takes out a menacing snake. Its colorful skin suggests that you'd better stay away, but there's nothing for you to do since the expert guidance of $$StreetSmart$ leads the predator directly to the $$&ENEMY$. It slithers, dodging any attack against it, and jumps on the $$&ENEMY$, burrowing its venomous fangs deep into its prey. But the snake does not stop there: it rolls itself around the $$&ENEMY$, blocking any move and slightly choking it until the poison takes full effect.`,
    ]);
  },
};


LANGUAGE.actions[PARTYMEMBERS.WiseOld] = {
  usage: function(){
    var text = summon_friend(DICTIONARY.get(PARTYMEMBERS.WiseOld)) + RANDOM.pick([
      `$$WiseOld$ gets up painfully and walk slowly towards the $$&ENEMY$. After a moment of reflection, he says solemnly:`,
      `As usual, $$WiseOld$ struggles to make his way to the $$&ENEMY$ with his slow, elderly pace. The $$&ENEMY$ watches patiently, perplexed.`,
      `$$WiseOld$ closes his eyes and bows his head, as if entering a meditative trance. By some miracle, the $$&ENEMY$ does not react right away.`,
    ]);

    var dialog = RANDOM.pick([
      `$$WiseOld$: "The farmer has to look through the rain to see the rainbow."`,
      `$$WiseOld$: "Life is not about waiting for the storm to pass. It's about learning to dance in the rain."`,
      `$$WiseOld$: "A journey of a thousand mountains begins with a single step."`,
      `$$WiseOld$: "A bird does not sing because it has an answer. It sings because it has a song."`,
      `$$WiseOld$: "Experience is a comb which nature gives us when we are bald."`,
      `$$WiseOld$: "The flower in a bouquet whither, and never grows again."`,
      `$$WiseOld$: "The harvest moon is brightest every festival homesickness multiplies."`,
      `$$WiseOld$: "A horde of horses will never manage to chase down a spoken word."`,
      `$$WiseOld$: "If you do not enter the tiger's den, how will you get the tiger cub?"`,
      `$$WiseOld$: "The only truly binding shackles are the ones you put on yourself."`,
      `$$WiseOld$: "There is no such thing as a fool except for the lost soul foolish enough to think they are a fool."`,
    ]);
    return [text, dialog];
  },
  fail: function(){
    return RANDOM.pick([
      `The wise words of $$WiseOld$ do not touch the $$&ENEMY$. It's as if the $$&ENEMY$ doesn't care at all!`,
      `Whatever the desired effect was, it appears that it wasn't reached, as the $$&ENEMY$ adopts once again a menacing posture.`,
      `The $$&ENEMY$ completely ignores $$WiseOld$. Before long, it is ready to attack again.`,
    ]);
  },
  win: function(){
    return RANDOM.pick([
      `The wisdom of $$WiseOld$ goes straight to the $$&ENEMY$'s heart. The $$&ENEMY$ has a new understanding of life, and questions everything they have done so far. Enraptured, the $$&ENEMY$ walks away towards a better tomorrow.`,
      `The words resonate within the $$&ENEMY$ and completely change the way it thinks. The $$&ENEMY$'s mind is completely blown, it has finally seen the light. The $$&ENEMY$ simply sits there, motionless, in total awe and beatitude. It appears it has reached complete enlightenment, and is completely detached from all earthly sensations.`,
      `The $$&ENEMY$ ponders on the phrase of the wise man. It soon appears that the $$&ENEMY$ is deep in self-reflection, reevaluating their own life in light of this pearl of wisdom. Clearly, $$WiseOld$ gave it a lot to think about, and the $$&ENEMY$ is now deep into a meditative trance, pondering all the implications of the newfound insight. Needless to say that all will to fight has left it.`,
    ]);
  },
};

LANGUAGE.actions[PARTYMEMBERS.TraitorFisher] = {
  usage: function(){
    var text = summon_friend(DICTIONARY.get(PARTYMEMBERS.TraitorFisher)) + RANDOM.pick([
        `$$TraitorFisher$ sneaks onto the battleground. She explains a convoluted plan to infiltrate enemy ranks and take them down from the inside.`,
        `$$TraitorFisher$ springs forward and explains theatrically how she's been scheming and preparing for this moment for years. All the pieces are in place, now, and it's time for her plans to finally bear fruits!`,
        `$$TraitorFisher$ says that her true goal joining your party was to be able to meet the $$&ENEMY$. Now it's finally time to reveal her true allegiance.`]);

    var dialog = RANDOM.pick([
      `$$TraitorFisher$: "My name is $$TraitorFisher$. Just $$TraitorFisher$."`,
      `$$TraitorFisher$: "All along, you thought I was an innocent naive girl? Fooled you! All this time, I've been..."`,
      `$$TraitorFisher$: "Brace yourself for the big reveal I've been working towards secretly the whole time!"`]);
    return [text, dialog];
  },
  fail: function(){
    return RANDOM.pick([
      `$$TraitorFisher$ approaches the $$&ENEMY$. She gives you an apologetic smile, and joins the enemy ranks.`,
      `$$TraitorFisher$ decides to betray you and sides with the $$&ENEMY$.`,
      `$$TraitorFisher$ starts exposing a convoluted plan explaining why she needs to join the enemy side. Before you understand what's going on, she's already buttering up to the $$&ENEMY$.`,
    ]);
  },
  win: function(){
    return RANDOM.pick([
      `$$TraitorFisher$ reveals that she has been friends with the $$&ENEMY$ for years to prepare for this. She has no problems coming close to the unsuspecting $$&ENEMY$, and betray her long time acquaintance by stabbing it in the back.`,
      `$$TraitorFisher$ convinces the $$&ENEMY$ to let her join its party. But no sooner did she earn the trust of the credulous $$&ENEMY$ that she betrays it, exposing its weak points to the world. You have no problem exploiting this information to conclude the fight.`,
      `$$TraitorFisher$ pretends to attack you. The $$&ENEMY$ is convinced and invites her to join its ranks. She convinces the $$&ENEMY$ that it's best for her to infiltrate your party as a double agent. But as soon as she's back, $$TraitorFisher$ starts negotiating with the $$&ENEMY$ to betray you. The $$&ENEMY$ is visibly confused. Taking advantage of its turmoil, $$TraitorFisher$ strikes down the $$&ENEMY$ in an instant.`,
    ]);
  },
};

LANGUAGE.actions[PARTYMEMBERS.SavageChild] = {
  usage: function(){
    var text = summon_friend(DICTIONARY.get(PARTYMEMBERS.SavageChild)) + RANDOM.pick([
      `$$SavageChild$ sprawls onto the battleground on all fours, spitting and hissing like an animal. She jumps in place excitedly.`,
      `$$SavageChild$ approaches carefully the $$&ENEMY$, eyes squinting. She sniffs the air and assesses the scent of her opponent.`,
      `$$SavageChild$ crawls cautiously towards the $$&ENEMY$. Her feral body undulates like a feline as she awaits the perfect opportunity to strike.`,
    ]);

    var dialog = RANDOM.pick([
    `$$SavageChild$: "$$SavageChild$ fight."`,
    `$$SavageChild$: "GRRRRR!"`,
    `$$SavageChild$: "$$SavageChild$ protect the pack."`,
    ]);
    return [text, dialog];
  },
  fail: function(){
    return RANDOM.pick([
      `The $$&ENEMY$ has no problem dodging the repeated assaults of $$SavageChild$. The little girl cannot even land her hands on her enemy. She charges relentlessly a dozen times before giving up, exhausted.`,
      `$$SavageChild$ enters a staring match with the $$&ENEMY$. The first to falter will be vulnerable. Sadly, it seems that the $$&ENEMY$ has a stronger will, and $$SavageChild$ turns around assessing this is one fight she cannot win.`,
      `The $$&ENEMY$ spreads out their body in an animal display of dominance. It may look ridiculous, but it is enough to beat $$SavageChild$ into submission. She turns away yelping.`,
    ]);
  },
  win: function(){
    return RANDOM.pick([
      `$$SavageChild$ jumps onto the $$&ENEMY$ mouth wide-open. She starts biting it all over. Soon, her sharp teeth are tearing up the flesh of the $$&ENEMY$, which cannot overthrow the girl despite violent contorsions.`,
      `$$SavageChild$ charges on the $$&ENEMY$ with a inhuman roar. She scratches her enemy with her nails that have become as long and sharp as claws. The $$&ENEMY$ twists and turns but the wild girl does not falter. Soon, the opponent falls on the ground, lacerated by a thousand cuts.`,
      `$$SavageChild$ grabs hold of the $$&ENEMY$ and proceed to bite and scratch it. The child may not look like much, but no amount of struggle can relax her feral grip. She continues her savage assault until her prey is nothing more than shreds.`,
    ]);
  },
};


LANGUAGE.actions[PARTYMEMBERS.GeniusProdigy] = {
  usage: function(){
    var text = summon_friend(DICTIONARY.get(PARTYMEMBERS.GeniusProdigy)) + RANDOM.pick([
      `$$GeniusProdigy$ slowly arrives on the battleground, head deep in a book. He finally lifts up his gaze after finishing his page, and looks around distractedly.`,
      `$$GeniusProdigy$ does not hear your call straight away, as he seems busy drawing diagrams for some invention. You multiply the calls, until you finally get his attention. He hurries to the fight to make up for the lost time.`,
      `$$GeniusProdigy$ moves towards the target with sure steps. He almost seems bored, as he takes mental note of every feature of the environment.`,
    ]);

    var dialog = RANDOM.pick([
      `$$GeniusProdigy$: "When you get rid of all disproved hypotheses, whatever remains, however improbable, must be the truth."`,
      `$$GeniusProdigy$: "I have the perfect protocol for this! I hope it'll yield good samples!"`,
      `$$GeniusProdigy$: "Stand back, it's time to use science!"`,
    ]);
    return [text, dialog];
  },
  fail: function(){
    return RANDOM.pick([
      `$$GeniusProdigy$ computes the odds of victory. Considering how low they are, he concludes that the reasonable course of action is to withdraw from the fight.`,
      `$$GeniusProdigy$ assesses the situation by building a mental model of the environment, taking into consideration every possible factor. No matter how many strategies he simulates, the results are bleak. The conclusion of this cost-benefit analysis is to leave the floor to someone else.`,
      `$$GeniusProdigy$ closes his eyes and thinks hard to come up with a strategy to win the battle. The $$&ENEMY$, however, doesn't wait and takes advantage of this crucial reflection time to strike $$GeniusProdigy$ first.`,
    ]);
  },
  win: function(){
    return RANDOM.pick([
      `$$GeniusProdigy$ has computed the equilibrium of physical forces in the vicinity. Thanks to this calculation, he figured out the single optimal point where to hit the $$&ENEMY$. A precise flick of the finger is enough to incapacitate the opponent.`,
      `$$GeniusProdigy$ constantly outwits the $$&ENEMY$ with a clever battle strategy. To every blow, he has already prepared a defense and a counter. He remains one step ahead of his opponent until the $$&ENEMY$ finally gives up, exhausted.`,
      `$$GeniusProdigy$ smiles slyly. He has already foreseen all the events unfolding, and he is prepared. Everything is happening according to plan. Suddenly, the $$&ENEMY$ collapses on the ground for no apparent reason. With a satisfied face, $$GeniusProdigy$ goes back to his reading, refusing to elaborate on his methods.`,
    ]);
  },
};


LANGUAGE.actions[PARTYMEMBERS.FemmeFatale] = {
  usage: function(){
    var text = summon_friend(DICTIONARY.get(PARTYMEMBERS.FemmeFatale)) + RANDOM.pick([
      `$$FemmeFatale$ approaches slowly. Every step she takes radiates with sensuality. She gives you a kind wave, before turning to the $$&ENEMY$.`,
      `$$FemmeFatale$'s hair flows gently in the breeze. Her elaborate garments highlight perfectly her gorgeous silhouette. As soon as she advances, all eyes turn towards her.`,
      `$$FemmeFatale$'s entrance feels like the arrival of a deity. Every movement is perfectly calibrated to exude grace. Her revealing outfit is an expertly calibrated display of her fair skin.`,
    ]);

    var dialog = RANDOM.pick([
      `$$FemmeFatale$: "Don't let go of your desire."`,
      `$$FemmeFatale$: "I'll show you the time of your life."`,
      `$$FemmeFatale$: "You, me, right here, right now ;)"`,
      `$$FemmeFatale$: "I'll bring your wildest fantasies to life."`,
    ]);
    return [text, dialog];
  },
  fail: function(){
    return RANDOM.pick([
      `The $$&ENEMY$ does not seem to respond to $$FemmeFatale$'s charms. You did not think it was possible, and yet here you are...`,
      `$$FemmeFatale$ does not inspire any reaction from the $$&ENEMY$. You don't understand how it's possible.`,
      `$$FemmeFatale$'s approach is ineffective on the $$&ENEMY$. Maybe the $$&ENEMY$'s preferences lie elsewhere...`,
    ]);
  },
  win: function(){
    return RANDOM.pick([
      `$$FemmeFatale$ blows the $$&ENEMY$ a kiss. It doesn't take more to send the $$&ENEMY$ into a storm of fantasies and delusions. Distracted, the head full of erotic scenarii, the $$&ENEMY$ becomes vulnerable, and soon, powerless.`,
      `$$FemmeFatale$ winks and whispers suggestively to the $$&ENEMY$. The $$&ENEMY$ becomes entrances and pledges heart and soul to $$FemmeFatale$. As they are abiding her every word, she makes the $$&ENEMY$ do a few silly pirouettes, before asking them to fetch her something really, really far.`,
      `$$FemmeFatale$ starts describing in incredibly evocative details the sexual activities she supposedly craves to do with the $$&ENEMY$. Embarrassed and aroused, the $$&ENEMY$ keeps begging for more details and more privacy. It's then extremely easy to drag them far from the fight, and leave them hanging forever.`,
      `It doesn't take more than a few carefully chosen words in the velvety voice of $$FemmeFatale$ to make the $$&ENEMY$ succumb to her charms. Desperate to be loved by the woman of their dreams, the $$&ENEMY$ accepts her every order. To prove their devotion, the $$&ENEMY$ does not even hesitate when she orders them to kill themselves.`,
    ]);
  },
};


LANGUAGE.actions[PARTYMEMBERS.DisguisedPrincess] = {
  usage: function(){
    var text = summon_friend(DICTIONARY.get(PARTYMEMBERS.DisguisedPrincess)) + RANDOM.pick([
      `$$DisguisedPrincess$ arrives with leather bags full of dried herbs and mixes. The vials on the aristocrat's pockets clink with every step.`,
      `$$DisguisedPrincess$ rushes on the battleground full of the determination that was for so long sealed by the sheltered aristocrat life.`,
      `$$DisguisedPrincess$ is impatient to be of use. After gathering herbs and potions, the runaway noble turns to the $$&ENEMY$.`,
    ]);

    var dialog = RANDOM.pick([
      `$$DisguisedPrincess$: "I may never sit on the throne, but I can still save this kingdom!"`,
      `$$DisguisedPrincess$: "I had to run away and become nobody so that I could be free to be myself! No more and no less."`,
      `$$DisguisedPrincess$: "I will not be made to hide behind thick walls! I will not be anyone's puppet anymore!"`,
    ]);
    return [text, dialog];
  },
  fail: function(){
    return RANDOM.pick([
      `The $$&ENEMY$ seems immune to $$DisguisedPrincess$'s best poisons...`,
      `$$DisguisedPrincess$ keeps blowing a powdered concoction on the $$&ENEMY$ without much success.`,
      `$$DisguisedPrincess$'s special elixirs did not have the expected effect. Could there be a problem with the formula?`,
    ]);
  },
  win: function(){
    return RANDOM.pick([
      `$$DisguisedPrincess$ sets up an elaborate trap, spreading a mysterious elixir on the floor. When the $$&ENEMY$ arrives in that zone, they suddenly freezes. The poison sinks into the $$&ENEMY$'s vulnerable body and weakens it from the inside. In a matter of seconds, it turns into a pile of amorphous goo.`,
      `$$DisguisedPrincess$ blows a weird powder towards the $$&ENEMY$. Nothing seems to happen at first, but when the $$&ENEMY$ starts moving, they immediately fall on the ground. After a few jolts, the $$&ENEMY$ becomes rigid and lifeless.`,
      `$$DisguisedPrincess$ pops the lid of a vial and splashes its content in the direction of the $$&ENEMY$. You're surprised to see the droplets correct their course and fly in the direction of their targets. They hit the $$&ENEMY$, making as many tiny holes in their victim's body. Riddled with so many tiny open wounds, it's not long before the $$&ENEMY$ is neutralized.`,
    ]);
  },
};


LANGUAGE.actions[PARTYMEMBERS.DumbMuscles] = {
  usage: function(){
    var text = summon_friend(DICTIONARY.get(PARTYMEMBERS.DumbMuscles)) + RANDOM.pick([
      `$$DumbMuscles$ rushes on the battleground, jumping excitedly in every direction and vocifering strange cries to psych himself up.`,
      `$$DumbMuscles$ runs around the $$&ENEMY$ a couple of times as a warmup, and takes a stance in the middle of the field. For no apparent reason, he slowly jolts up and down to signal he's ready to fight.`,
      `$$DumbMuscles$ roars loudly as he barges on the scene, punching the air around him in a show of strength.`,
    ]);
    var dialog = RANDOM.pick([
      `$$DumbMuscles$: "I'm gonna beat the living shit out of you!"`,
      `$$DumbMuscles$: "Who needs strategy when you have raw power?"`,
      `$$DumbMuscles$: "I came here to kick ass and chew dried meat... and there's a famine going on."`,
      `$$DumbMuscles$: "Say hello to my friends, left fist and right fist... haven't named them yet. They'll beat you up all the same."`,
    ]);
    return [text, dialog];
  },
  fail: function(){
    return RANDOM.pick([
      `The $$&ENEMY$ has no problems blocking the straightforward punches of $$DumbMuscles$.`,
      `$$DumbMuscles$'s brute force is no match for the agility of the $$&ENEMY$ who easily dodges his crude assault.`,
      `The $$&ENEMY$ uses $$DumbMuscles$'s strengh against him through clever combat moves.`,
    ]);
  },
  win: function(){
    return RANDOM.pick([
    `$$DumbMuscles$ charges on the $$&ENEMY$ like a berserker and overwhelms his target with a flurry of heavy punches. The $$&ENEMY$ does not have a second to react. After what seems like an eternity of vigourous blows, $$DumbMuscles$ steps back, and the $$&ENEMY$ immediately falls to the ground.`,
    `$$DumbMuscles$ takes a few steps back to accumulate energy, then suddenly dashes towards the $$&ENEMY$ like a madman, yelling out an intimidating roar. The tackle seems powerful enough to take down a building. The $$&ENEMY$ is thrown on the ground with the added pressure of the muscle power of the young man. They will never move again.`,
    `$$DumbMuscles$ seems animated by a blind rage, and assaults the $$&ENEMY$ with his naked fists. The blows don't stop and push back the staggering target with every hit. The $$&ENEMY$ is quickly incapacitated and in no state to counterattack. $$DumbMuscles$ finishes them, spits on the ground, and wipes the sweat of his face, grinning after a hard job well done.`,
    ]);
  },
};


LANGUAGE.actions[PARTYMEMBERS.TorturedSoul] = {
  usage: function(){
    var text = summon_friend(DICTIONARY.get(PARTYMEMBERS.TorturedSoul)) + RANDOM.pick([
      `$$TorturedSoul$ arrives slowly, taking wide theatrical strides. His cape floats dramatically behind him. He lets out a big sigh before turning to the $$&ENEMY$.`,
      `It seems that $$TorturedSoul$ is reluctant to come to the battleground. His face is pouty, though it is hardly different from usual. He drags his feet and exhales loudly to show his discontent. `,
      `You have to call several times before getting any answer from $$TorturedSoul$, and when you do it's an annoyed grunt. He drags himself to the battleground, mumbling complains about how you're bothering him.`,
    ]);
    var dialog = RANDOM.pick([
      `$$TorturedSoul$: "We never really heal. We only acclimate to affliction."`,
      `$$TorturedSoul$: "What is silence but another expression for my endless suffering..."`,
      `$$TorturedSoul$: "I offer my blood as libation to seal this pact and herald my pledge that this is not a phase. Black is my true color."`,
      `$$TorturedSoul$: "The scars thou cannot see are the toughest to regenerate. I shall douse thee in the abyss of misery that is my bleeding bosom."`,
      `$$TorturedSoul$: "Plead that I do not spare thee, for surviving is oft more dolorous than passing."`,
      `$$TorturedSoul$: "How many times can thine heart shatter until there’s naught left to be broken?`,
      `$$TorturedSoul$: "I would sooner be solitary. Only thus can nobody hurt thou.`,
    ]);
    return [text, dialog];
  },
  fail: function(){
    return RANDOM.pick([
      `The $$&ENEMY$ laughs out loud at the lonely maverik. His dark demeanor did not impress them at all.`,
      `The $$&ENEMY$ opens up to $$TorturedSoul$'s honnesty by sharing their own pain and worries. It just makes the depressed artist even sadder, and he has to withdraw to hide his tears.`,
      `The $$&ENEMY$ is unmoved by the overly sentimental display of the sad poet. They simply ignore him and keep attacking.`,
    ]);
  },
  win: function(){
    return RANDOM.pick([
      `The $$&ENEMY$ listens intently to the lamenting complaints of $$TorturedSoul$. As the tortured soul discusses life and its meaning, it appears clear that the $$&ENEMY$ relates to $$TorturedSoul$'s hopelessness. Before long, the $$&ENEMY$ agrees fully and commiserates with the rebel. They conclude that suicide is the only reasonable answer to the absurdity of existence, and in a matter of seconds, the $$&ENEMY$ takes their own life.`,
      `$$TorturedSoul$'s blunt oversentimentality is too much to bear for the $$&ENEMY$. All this poetry talk of suicide and heart in pain makes them recoil in cringe. The second-hand embarrassment is very effective, and soon the $$&ENEMY$ cannot take anymore of this unceasing whining and runs away to avoid ever facing him again.`,
      `$$TorturedSoul$ opens his heart and shares his feeling to the $$&ENEMY$. They listen politely at first, but grow empathetical as the tales of woe slowly but surely engulfs their heart. The $$&ENEMY$ cannot ignore a suffering so intense that the poor man is even willing to take his own life. Filled with compassion, the $$&ENEMY$ shares $$TorturedSoul$'s pain, and becomes overwhelmed with existential despair. It becomes too intense for them to handle, and the $$&ENEMY$ falls sobbing on the ground, never to raise up again.`,
    ]);
  },
};
