
// ===================
//hack A. INITIALIZATION (sound, etc...)
//hack B. FLOORS
//hack D. UNIQUE ELEMENTS
// ===================
new Snippet("levels/decors/temple");

new S_StainedGlass_wall(1075, 1050, 'church');
new S_StainedGlass_wall(1275, 1050, 'fear');
new S_StainedGlass_wall(1475, 1050, 'church');


var f = new S_ExitFloor(1250,1775,100,35, '020_town2');

new M_Trainer(1100, 1650, 11, ABILITIES_ARCHETYPES_NAMES.Element, 750);
new M_Trainer(1450, 1650, 33, ABILITIES_ARCHETYPES_NAMES.Diplomat, 750);

var wiseOldFool = new M_WiseOld(1500, 1125);


var explanations = function() {
  var short = [
    `Archpriest: "Of course I would never be so presumptuous as to give orders to the Promised Child. But what I advise you is to look for the secrets of our ancestors. There are ruins of their grand civilization, but we haven't been able to explore them because they are swarming with monsters. But that should not be a problem for the Promised Child."`,
    `Archpriest: "In the north west, you'll find the Waters of the $$squid_adj$ Squids. We're sure there's some ancient secrets drowned in, but make sure you buy breathing potions at the alchemist before!"`,
    `Archpriest: "In the south east, there is the Peaks of the $$harpies_adj$ Harpies. There used to be some sort of refuge there, but it's been overtaken by monsters."`,
    `Archpriest: "And finally, east of here, the Forest of the $$mushroom_adj$ Mushrooms is surely worth exploring too."`,
    `Archpriest: "Now go forth, Promised Child! Rid our beautiful lands of the scum that invaded it, and make $$world_name$ prosperous again!"`,
  ];
  if (!ABILITIES.has_ability("_town2_visited")){
    ABILITIES.unlock("_town2_visited");
    TextBannerSequence.make([
      `Archpriest: "As the Promised Child, I will now share with you secrets that have been kept strictly within the highest officials of the Church of $$town_2$."`,
      `Archpriest: "Everybody knows that the world of $$world_name$ has been under relentless torment from the evil armies of $$demon_lord$ for centuries, now. But few know the full story of how it happened, and what was before."`,
      `$$BestFriend$: "Wasn't there just peace?"`,
      `Archpriest: "Yes, but peace brings prosperity and development. It seems that our ancestors, free from the colonization of demons, had built a society far more powerful and sophisticated than we can ever imagine from this period of suffering and ignorance."`,
      `Archpriest: "Sadly, even we don't know a lot about it. Most places, people and documents were wiped out when the armies of $$demon_lord$ raided $$world_name$. Not much is left besides rumors passed down by word of mouth over generations."`,
      `Archpriest: "We can only speculate how far their powers extended. We think they had complete mastery over nature, that magic was everywhere in the kingdom, that life was easy, happy and plentiful."`,
      `Archpriest: "Some of us think that it made our ancestors lazy, other think that it made them too drunk on their own hubris. In any case, when $$demon_lord$ arrived, they were not ready. In less than a few days, civilization was reduced to a few surviving tribes who rebuilt villages any way they could. Our ancestors. The ones the Goddess could protect."`,
      `$$Ren$: "I see, but why does it matter?"`,
      `Archpriest: "You, Promised Child, are the one who will make things right and bring us back to our former glory. But doing this will be no easy task. You're up against a demon who destroyed an entire kingdom in a few days."`,
      `$$Ren$: "I know, it sounds impossible. That's why I'm waiting for you to reveal your secret weapon, the big plan or whatever!"`,
      `Archpriest: "Well... That's the thing. We don't have one."`,
      `$$BestFriend$: "Are you joking? You want to send $$Ren$ straight to the grave?"`,
      `Archpriest: "Calm down. We do have the Goddess on our side. $$Ren$ is the Promised Child. That means $$Ren$ cannot fail! Implying otherwise is not only blasphemy, it's outright absurd!"`,
      `$$Ren$: "So... What do I do?"`,
      `Archpriest: "Well since you're going to defeat $$demon_lord$ and rid us of his evil scum, it means that you will find a way."`,
      `$$BestFriend$: "So we're supposed to just relax and wait until the Goddess talks to $$Ren$?"`,
      `Archpriest: "No, impertinent child! You cannot put demands on Her Holy Wisdom. I've told you about our ancestors for a reason. Our powers are no match for $$demon_lord$, but perhaps theirs could be, in the rightful hands of the servants of the Goddess. Furthermore, if we knew more about the circumstances of $$demon_lord$'s coming, we could maybe find a way to banish him..."`,
    ].concat(short));
  } else {
    TextBannerSequence.make(short);
  }
}

var warning = function() {
  var short = [`Archpriest: "I see. Thanks a lot, my child. I'll see to it that the strongest defenses are put in place and the highest level of alert is maintained for the next few days. You can go in peace, we won't be defeated easily!"`];
  if (!ABILITIES.has_ability("_town2_saved")){
    ABILITIES.unlock("_town2_saved");
    TextBannerSequence.make([
      `$$Ren$: "Father, I have something important to tell you. $$demon_lord$ will attack this city shortly. You must get everyone ready to defend the city or this assault will be so strong that the capital won't hold."`,
      `$$BestFriend$ looks at you with an expression of surprised. Clearly the abilities and foresight of the Promised Child are still hard to comprehend. But the Archpriest seems to accept it right away without any question.`,
    ].concat(short));
  } else {
    TextBannerSequence.make(short);
  }
}

var sitrep = function() {
  TextBannerSequence.make([
    `Archpriest: "It's hardly a surprise, but you were right! The forces of $$demon_lord$ launched a coordinated assault a few hours after you last were here. If it weren't for you, we would have been completely taken by storm. But thanks to your divine foresight, our defenses held off the enemy. Blessed be the Goddess for her incredible help!"`,
  ]);
}

var armament = function() {
  var short = [
    `Archpriest: "To start your attack on $$demon_lord$, you must travel to the south east. That is where the Maw of Hell is open, at the edge of the world. It is the core of $$demon_lord$'s forces, it's where all his armies are coming from. Be careful, no human has ever seen this place and returned to tell the tale. We don't know what you'll encounter there. But we have faith that the Goddess will lead your path to victory!"`,
    `Archpriest: "On the way, you should probably stop at $$town_3$ to rest and resupply. It is the human settlement the closest to the Maw of Hell, where the best warriors of mankind do their best to keep the forces of evil at bay. I'm sure you can learn a lot from their expertise."`,
    `$$Ren$: "Thank you! I'll be on my way."`,
    `$$BestFriend$: "Don't worry, you're going to do great!"`,
    `Things would be much simpler if either of you could truly believe it.`,
  ];
  if (!ABILITIES.has_ability("_town3_prompted")){
    ABILITIES.unlock("_town3_prompted");
    TextBannerSequence.make([
      `You show the head of the temple the artifacts you found. He examines briefly the armature and ammunition, then spends much longer studying the advisory manual in silence. You don't disturb his concentration and patiently wait. After what seems like an eternity, the Archpriest turns back to you.`,
      `Archpriest: "This is most interesting. I can only decipher some fragments of this book, but if what I understand is correct, this is a weapon of incredible power. Our ancestors were truly fearsome! It's a wonder how $$demon_lord$ was able to overtake them..."`,
      `You shudder. If people so strong were wiped out, how could you even hold a stand against the armies of demons. Your eyes crosses the gaze of $$BestFriend$ and you can see the same uncertainty. But you decide that it would be better to not show it to the adults.`,
      `$$Ren$: "I see... How does it work?"`,
      `Archpriest: "It's actually quite simple. That's what truly impresses me. They managed to harness such power in such an accessible form. Anyway, as I was saying, it's dead simple. You put this little marble in this tube, that's how you load the ammunition. Then you point the towards your target, and press here."`,
      `He demonstrates an example while talking.`,
      `$$Ren$: "And then?"`,
      `Archpriest: "That's it. Your target will be gone."`,
      `$$Ren$: "Really? That is indeed simple. How does it work?"`,
      `Archpriest: "That much I don't know. The details are in this book, but it's well beyond our current understanding. We'll have to trust that it does. What really worries me is that with so few ammunition, we can't afford to try it out before the actual battle."`,
      `You swallow in anguish.`,
      `$$Ren$: "So it's a gamble?"`,
      `Archpriest: "You could see it that way. But with the Goddess on our side, this is a gamble we cannot lose."`,
      `You would have loved a bit more certainty. You can tell by a quick look that $$BestFriend$ feels the same way. But certainty is a luxury you cannot afford. The armies of $$demon_lord$ are growing by the day. $$town_2$ may have survived this time, but it won't survive the next...`,
      `$$Ren$: "I see. Let's do it then!"`,
      `$$BestFriend$: "$$Ren$..."`,
      `$$Ren$: "Don't worry, it will be fine!"`,
      `You exchange a smile that makes it clear that neither of you really believes it. Nonetheless, you feel pressed onwards by the Goddess. There is no other way.`,
      `Archpriest: "You are brave, as can be expected from the Promised Child! We are all grateful to you!"`,
    ].concat(short));
  } else {
    TextBannerSequence.make(short);
  }
}

var hp = new M_Priest(1300, 1675, CITIES.fear);
hp.interaction = function() {
  this.face_character();
  var options = [];
  if (INVENTORY.has_ancient_armament()){
    options.push({"text": "Show armament", "effect": armament});
    options.push({"text": "Situation report", "effect": sitrep});
  } else {
    options.push({"text": "Hear explanation", "effect": explanations});

    if(STATS.flag("town2_ruin_seen")){
      options.push({"text": "Warn Archpriest", "effect": warning});
    }
  }

  options.push({"text": "Leave", "effect": "##CLOSE"});

  new CenteredTextMenu("Talk to the Archpriest?", options);
}



// ===================
//hack G. START/INIT
// ===================

CURRENTLEVEL.start_function = function(){
    TextBannerSequence.make([
      `When you enter the immaculate building, you're immediately greeted by a hooded figure.`,
      `Archpriest: "Welcome, child! We were expecting you! I hope your travel from $$town_1$ went peacefully, though I have no doubt that the Goddess made sure it was so."`,
      `Archpriest: "You'll see, our beautiful city of $$town_2$ has much more to offer! We may not be the best in the kingdom, but we can help you a long way!"`,
      `Archpriest: "Everyone in this building is fully devoted to you! We'll give you anything you require, just ask! Some of us can teach you magic: we are knowledgeable in the ways of the Element and the ways of the Diplomat."`,
      `$$BestFriend$: "Well, that sounds promising!"`,
      `$$Ren$: "To me, it sounds scary!"`,
      `Archpriest: "Most importantly, I can tell you where to find the power to defeat $$demon_lord$. Come and see me when you're ready to learn. But... this is very sensitive information... Maybe it's best we speak alone?"`,
      `$$Ren$: "I'll just tell $$BestFriend$ everything right after, you may as well talk now."`,
      `Archpriest: "Very well."`,
    ], function(){ IO.control.character(); });
};

f.initialize_with_character(1275, 1750);
