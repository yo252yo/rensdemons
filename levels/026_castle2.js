// ===================
//hack A. INITIALIZATION (sound, etc...)
//hack B. FLOORS
//hack C. EXIT
// ===================

var gen = new Generator(DICTIONARY.get("world_seed")*7);

new Snippet("levels/decors/castle");
STATS.record.flag("_seen_castle2");

// ===================
//hack D. UNIQUE ELEMENTS
// ===================
var die = function(){CURRENTLEVEL.setup("gameover$")};

new SE_event(2450, 1800, [`As you approach the main hallway, nobles in the throne room notice your little party. They start screaming for the guards, claiming a kidnapping is taking place. Some of the guards with the bravest stomach come running and arrest you. They throw you in prison without trial where you spend the rest of your days.`], 50, undefined, die);
new SE_event(1950, 1425, [`As you approach the throne room hallway, nobles inside notice your little party. They start screaming for the guards, claiming a kidnapping is taking place. Some of the guards with the bravest stomach come running and arrest you. They throw you in prison without trial where you spend the rest of your days.`], 50, undefined, die);

var guard = new SE_event(2100, 2275, [`You walk slowly, but you stumble upon the patrol route of one of the rare surviving guards. He is quick to conclude a kidnapping attempt, and throws you in prison where you spend the rest of your days.`], 50, undefined, die);


new SE_event(2000, 2200, [
  `$$Ren$: "Let's hide here for a bit!"`,
  `Your party does not really understand why, but knows better than questioning you. A few moments after you found a hiding spot, you hear footsteps in the hallway. One of the remaining guards was patrolling.`,
  `$$DisguisedPrincess$: "How did you know that? When did you memorize the patrol routes of all the guards?"`,
  `$$Ren$: "Nevermind that, let's go, quick before he comes back!"`,
], 50, undefined, function(){
  guard.destroy();
});

var lookleft = function(){
  TextBannerSequence.make([
    `You peek left and immediately withdraw, seeing one of the few remaining guards coming your way. You barely have time to hide against the wall. You hold your breath while the heavily armored soldier passes you by.`,
    `$$DisguisedPrincess$: "Good thing you knew were to look! Adventurer's instincts are impressive!"`,
  ]);
}

var lookright = function(){
  TextBannerSequence.make([
    `As you carefully peek on the right side, one of the few remaining guards arrives by your left and sees you. It doesn't take long for him to accuse you of kidnapping and throw you in prison where you spend the rest of your days.`
  ], die);
}


new SE_event(1925, 1800, 'You arrive at a split in the hallway.', 50, undefined, function(){
  new CenteredTextMenu("Which way to look first?",
                [
                  {"text": "Left", "effect": lookleft},
                  {"text": "Right", "effect": lookright},
               ]
             );
});


var chargenow = function(){
  TextBannerSequence.make([
    `You gesture to your companions to hurry, and you all make your way to the outside. You run towards the outskirts of the town before pausing to catch your breath.`,
    `$$DisguisedPrincess$: "Thank you so much! I can't believe it! I'm free!"`,
    `$$Ren$: "I guess you are, be careful though, keep a low profile."`,
    `$$DisguisedPrincess$: "Don't worry. Outside of the castle, many people know my name but not my face. Anyway, now I get to experience the world by myself! Adventure! And I'll have the best guide!"`,
    `$$Ren$: "You're coming with us?"`,
    `$$DisguisedPrincess$: "I have a lot to learn, I need to be with experienced adventurers, right? Besides, I need to figure out a way to repay you for your help!"`,
    "$$DisguisedPrincess$ joins your party!",
  ], function(){
    PARTY.changeNickname(PARTYMEMBERS.DisguisedPrincess);
    PARTY.add(PARTYMEMBERS.DisguisedPrincess);
    CURRENTLEVEL.setup("020_town2");
  });
}

var waitabit = function(){
  TextBannerSequence.make([
    `You wait for the ideal moment, but after a few seconds the guard you eluded earlier sees you on his way back. You try to outrun him, but he rang the alarm, and you can only take a few steps outside before soldiers swarm out from every corner of the village. For your attempted kidnapping, you are thrown in prison where you spend the rest of your days.`
  ], die);
}

new SE_event(2475, 2275, [
  `You arrive near the main door of the castle. It appears that the way is clear.`,
], 50, undefined, function(){
  new CenteredTextMenu("What to do?",
                [
                  {"text": "Charge now", "effect": chargenow},
                  {"text": "Wait a bit", "effect": waitabit},
               ]
             );
});


new SE_event(1900, 2000, [
  `$$DisguisedPrincess$: "Why are we going this way? Wouldn't it be faster by the main hallway?"`,
  `$$Ren$: "If we do that, people will see us!"`,
  `$$DisguisedPrincess$: "Right, good point."`,
], 50);


// ===================
//hack G. START/INIT
// ===================

if (!INVENTORY.count(ITEM.PoisonousHerbs)){
  CURRENTLEVEL.setup_text_start_function([
    `As soon as you walk out in the hallway, a guard sees you and stops you.`,
    `Guard: "What are you doing here? With all due respect, you need to go back to your chambers."`,
    `You, on the other hand, get arrested for attempted kidnapping on a royal person.`,
  ], function(){ CURRENTLEVEL.setup("gameover$"); });
} else if (!INVENTORY.count("_poisoned_palace_guards")) {
  CURRENTLEVEL.setup_text_start_function([
    `$$DisguisedPrincess$: "I don't think we should go quite yet. There's still many guards in the hallways. Are you sure you used the poison?"`,
  ], function(){ CURRENTLEVEL.setup("026_castle"); });
} else if (INVENTORY.count("_poisoned_palace_guards") == 1) {
  CURRENTLEVEL.setup_text_start_function([
    `$$DisguisedPrincess$: "There seems to be less guards than before, but some of them are still here... I bet some of them didn't eat what you poisoned. There must be another way to get to them... Maybe their booze?"`,
  ], function(){ CURRENTLEVEL.setup("026_castle"); });
} else if (INVENTORY.count("_poisoned_palace_guards") == 2) {
  CURRENTLEVEL.setup_text_start_function([
    `$$DisguisedPrincess$: "There seems to be less guards than before, but some of them are still here... I bet some of them didn't drink what you poisoned. There must be another way to get to them... Maybe their food?"`,
  ], function(){ CURRENTLEVEL.setup("026_castle"); });
} else {
  CURRENTLEVEL.setup_text_start_function([
    `$$DisguisedPrincess$: "Let's go! I hope you're ready!"`,
  ]);
}

CURRENTLEVEL.initialize_with_character(2025, 1875);
