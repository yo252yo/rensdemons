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

new SE_event(2450, 1800, [`As you approach the main hallway, nobles in the throne room notice your little party. They start screaming for the guards, claiming a kidnapping is taking place. Some of the guards with the bravest stomach come running and arrest you. They throw you in prison without trial where you spend the rest of your days.`], 50, undefined, function(){CURRENTLEVEL.setup("gameover$")});
var guard = new SE_event(2100, 2275, [`You walk slowly, but you stumble upon the patrol route of one of the rare surviving guards. He is quick to conclude a kidnapping attempt, and throws you in prison where you spend the rest of your days.`], 50, undefined, function(){CURRENTLEVEL.setup("gameover$")});


new SE_event(2000, 2200, [
  `$$Ren$: "Let's hide here for a bit!"`,
  `Your party does not really understand why, but knows better than questionning you. A few moments after you found a hiding spot, you hear footsteps in the hallway. One of the remaining guards was patrolling.`,
  `$$DisguisedPrincess$: "How did you know that?"`,
  `$$Ren$: "Nevermind, let's go!"`,
], 50, undefined, function(){
  guard.destroy();
});



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
