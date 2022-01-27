// ===================
//hack A. INITIALIZATION (sound, etc...)
// ===================
AUDIO.music.levels.hawks();

var hawkpart = 1;
var s = CURRENTLEVEL.level_name.split(CURRENTLEVEL.SAME_IMPORT_DIFFERENT_LEVEL_SEPARATOR);
if(s.length > 1){
  hawkpart= parseInt(s[1]);
}
var gen = new Generator((DICTIONARY.get("world_seed")+ hawkpart)*61);

// ===================
//hack B. FLOORS
//hack C. EXIT
// ===================

var centerX = 1000 + 1500;
var centerY = 1000 + 1500;

var paths = [200, 150, 100, 75,  50];
var sizes = [1400,  900, 600, 400, 200];

var o = Math.floor((hawkpart-1) / 4);
var path = paths[o];
var size = sizes[o];

var exit;
var floors = [];

switch(hawkpart % 4){
  case 1:
    floors.push(new S_MudFloor(centerX-size, centerY+size,           size, path));
    var destination = hawkpart > 1 ? "014_hawks@" + (hawkpart-1) : "010_world_map";
    exit = new S_ExitFloor(centerX-size+size-25, centerY+size,           50, path, destination);
    floors.push(new S_MudFloor(centerX-size, centerY+size,           path, size));
    new S_ExitFloor(centerX-size, centerY+size-size+25,           path, 50, "014_hawks@" + (hawkpart+1));
  break;
  case 2:
    floors.push(new S_MudFloor(centerX-size, centerY-size + path,    size, path));
    new S_ExitFloor(centerX-size+size-25, centerY-size + path,    50, path, "014_hawks@" + (hawkpart+1));
    floors.push(new S_MudFloor(centerX-size, centerY,                path, size));
    exit = new S_ExitFloor(centerX-size, centerY+25,                path, 50, "014_hawks@" + (hawkpart-1));
  break;
  case 3:
    floors.push(new S_MudFloor(centerX, centerY-size + path,         size, path));
    exit = new S_ExitFloor(centerX-25, centerY-size + path,  50, path, "014_hawks@" + (hawkpart-1));
    floors.push(new S_MudFloor(centerX+size - path, centerY,         path, size));
    new S_ExitFloor(centerX+size - path, centerY+25,  path, 50, "014_hawks@" + (hawkpart+1));
  break;
  case 0: // 4
    floors.push(new S_MudFloor(centerX, centerY+size,                size, path));
    if (hawkpart < 20){
      new S_ExitFloor(centerX-25, centerY+size,       50, path, "014_hawks@" + (hawkpart+1));
    }
    floors.push(new S_MudFloor(centerX+size - path, centerY+size,    path, size));
    exit = new S_ExitFloor(centerX+size - path, centerY+size-size+25,  path, 50, "014_hawks@" + (hawkpart-1));
  break;
}

if (hawkpart == 20){ // summit
  new S_MudFloor(2475,2700,50,150);
  floors.push(new S_MudFloor(2400,2600,200,200));

  var xx = new S_ExitFloor(2475,2425,50,50);

  xx.interaction = function(){
    if(INVENTORY.count(ITEM.Wand)){
      TextBannerSequence.make([
        `Looking down on the plains below, you wave your newly found wand, curious to see if anything could happen.`,
        `As you do this, a myriad of tiny sparkly particles leave the tip of your wand and flow to the air before you. They appear chaotic at first, doing a mesmerizing dance you cannot make sense of, but soon a pattern appears. They seem to be forming a kind of path joining your feet to the ground floor.`,
        `You probe carefully the ethereal path with your feet, and find that it seems solid enough to support your weight. You decide to make your way further, and discover that you are actually pleasantly sliding through the air on this glowing ramp. You reach an incredible speed, but you still feel in control. It's like the world around you is moving and you're not. In any case, it only takes seconds before you're back on solid ground.`,
      ], function(){ CURRENTLEVEL.setup("010_world_map") });
    } else {
      TextBannerSequence.make([
        `The view of the plains down below is breathtaking, but the slope is way too steep to go down that way.`,
      ]);
    }
  }
}

// ===================
//hack D. UNIQUE ELEMENTS
// ===================

if(hawkpart % 4 == 1){
  new S_SavePoint(exit.x - 125, exit.y + 25 - (path-50)/2);
}
if(hawkpart == 20){
  new SBattle(2475, 2650, 'mountains/phoenix');

  var b = new SE_groundItem(2475, 2500,   ITEM.Wand);
  var take = function(){
    INVENTORY.increase(ITEM.Wand);
    b.destroy();
  }

  b.interaction = function(){
    b.make_icon();
    TextBannerSequence.make([
      `At the very summit of the mountain, you find the nest of the majestic phoenix. It's so big that you can fit several times inside the mass of plants and twigs. You do not dare try, however, because it is filled with loose feathers who seem to burn magically like orphan flames.`,
      `In the middle of the nest, something catches your eyes. Surrounded by silvery ashes, a single twig stands upright. It emits a warm red glow which makes it hard to see its details. It looks as if a feather got embedded in the wood. The fiery barbs circle around the rod and end in a tiny perpetual flame at the tip.`,
      `You decide that the item is too intriguing to pass. You enter the nest carefully, but to your surprise you find that it does not burn.`,
      `You take the magic wand. It sends sparkles through the air as you wave it around. You cannot wait to try out the amazing powers contained within.`,
    ], take);
  };
}
if(hawkpart == 2) {
  var b = new M_Boulder(1225, 1175);

  var cementboulder = function(){
    b.interaction = function(){};
    b.make_walkable();
    if(!walkable_antifoor){
      CONSOLE.error("cannot find the ground to walk on");
    }
    walkable_antifoor.make_walkable(true);
  }

  var moveboulder = function(){
    b.silenced = true;
    MovingObject.try_make_walk_to(b, 1340, 1175, cementboulder, true);
  }

  b.interaction = function(){
    if (!ABILITIES.has_ability("_followedByDumbMuscles")){
      TextBannerSequence.make([
        `A perfectly spherical boulder, about the size of the gap in the road. If only someone was strong enough to push it...`,
      ]);
    } else {
      TextBannerSequence.make([
        `$$Ren$: "Ok, $$DumbMuscles$?"`,
        `$$DumbMuscles$: "Yeah, mate?"`,
        `$$Ren$: "See this big round rock?"`,
        `$$DumbMuscles$: "Yeah?"`,
        `$$Ren$: "Doesn't it make you think of anything?"`,
        `$$DumbMuscles$: "Huh, no?"`,
        `$$Ren$: "It's okay. Look, it's spherical, it can be rolled. You can push it, it should fill the gap!"`,
        `$$DumbMuscles$: "Wow, you just blew my mind! You just... know that stuff?"`,
        `$$Ren$: "Yeah, it's pretty common for adventurers."`,
        `$$BestFriend$: "Actually, I don't know if that's common knowledge. Don't take it too hard, $$DumbMuscles$. $$Ren$ gets intel directly from the Goddess."`,
        `$$DumbMuscles$: "That is rad! Well, I learned something, thanks mate. Leave it to me!"`,
        `$$DumbMuscles$ pushes the boulder effortlessly. It rolls and blocks the chasm, creating a way forward.`,
      ], moveboulder);
    }
  }

  new S_AntiFloor(1300,1325,70,145);
  var walkable_antifoor = new S_AntiFloor(1300,1180,70,80);

  new M_DumbMuscles(1250, 1275);

  var placeholder = new S_AntiFloor(1175,1350,500,300, true);
}
if(hawkpart == 3) {
  new S_AntiFloor(3450,1325,250,200);
  var placeholder = new S_AntiFloor(3400,1350,400,325, true);

  var leavehim = function(){
    TextBannerSequence.make([
      `$$DumbMuscles$ runs carelessly on the ledge, proud to display his equilibrium by doing jumps and sumbersaults. Unfortunately, nature doesn't share his enthusiasm, and the sudden weigh increase causes the ground to finish its collapse under your feet. Soon, you're burrowed under layers of thick rock.`
    ], function(){CURRENTLEVEL.setup("gameover$")});
  }
  var stophim = function(){
    TextBannerSequence.make([
      `$$Ren$: "$$DumbMuscles$, stop!"`,
      `$$DumbMuscles$ suddenly comes to a halt.`,
      `$$DumbMuscles$: "What?"`,
      `$$Ren$: "This is obviously a trap! The path forms only a tiny bridge before the next platform. It's going to collapse if we walk on it."`,
      `$$DumbMuscles$ looks at you inquisitively. $$BestFriend$ shrugs.`,
      `$$DumbMuscles$: "What do we do then?"`,
      `$$Ren$: "We take precautions!"`,
      `You use ropes to secure your bodies and possessions, and start making your way very slowly over the dangerous ledge. Thanks to your preparations, you cross without a hitch.`,
    ]);
  }

  new SE_event(3425, 1150, [
    'At this place, the rock collapsed and left only a very thin line to advance. $$DumbMuscles$ is advancing towards it.'
  ], 75, undefined, function(){
    new CenteredTextMenu("What do you want to do?",
                  [
                    {"text": "Stop him", "effect": stophim},
                    {"text": "Leave him", "effect": leavehim},
                 ]
               );
  });
}
if(hawkpart == 11){ // open, only used for 12 for now!
  if(INVENTORY.count("_dumbmuscle_hunt_step") > 1){
    INVENTORY.set("_dumbmuscle_hunt_step", 10);
  }
}
if(hawkpart == 12){
  var e = new SE_event(3000, 3100, [`...`], 100);
  e.interaction = function(){
  if (INVENTORY.count("_dumbmuscle_hunt_step") == 10){
    TextBannerSequence.make([
      `When you come back, you see that your trap has caught a rabbit.`,
      `$$DumbMuscles$: "Damn mate, that's impressive! You were right!"`,
      `You improvide a little campfire to cook your catch and share a friendly meal.`,
      `$$DumbMuscles$: "I still have a lot to learn..."`,
      `Full and well rested, you decide to continue on your way.`,
    ], function(){e.destroy();});
  } else if (INVENTORY.count("_dumbmuscle_hunt_step") == 5){
    TextBannerSequence.make([
      `$$Ren$: "Remember, we need to go back to the previous part of the path, and then come back."`,
      `$$DumbMuscles$: "What does that even mean, part of the path..."`,
    ]);
  } else if (INVENTORY.count("_dumbmuscle_hunt_step") == 4){
    TextBannerSequence.make([
      `$$DumbMuscles$: "There's still nothing..."`,
      `$$Ren$: "Hmm... Ok let's try this: let's go back to the previous part of the path, and then come back. It should be enough."`,
      `$$DumbMuscles$: "What do you mean?"`,
      `$$Ren$: "Well it will show that we've been far enough for long enough!"`,
      `$$DumbMuscles$: "I don't..."`,
      `$$BestFriend$: "It's probably best to just do what $$Ren$ says without trying to understand in this kind of situations."`,
      `$$DumbMuscles$: "Ok..."`,
    ], function(){INVENTORY.increase("_dumbmuscle_hunt_step")});
  } else if (INVENTORY.count("_dumbmuscle_hunt_step") == 3){
    TextBannerSequence.make([
      `$$DumbMuscles$: "$$Ren$! The prey is not coming!"`,
      `$$Ren$: "It's because you're too close, you're scaring the wildlife!"`,
    ], function(){INVENTORY.increase("_dumbmuscle_hunt_step")});
  } else if (INVENTORY.count("_dumbmuscle_hunt_step") == 2){
    TextBannerSequence.make([
      `$$DumbMuscles$: "$$Ren$! The meat is not coming!"`,
      `$$Ren$: "You have to wait for your prey to come!"`,
    ], function(){INVENTORY.increase("_dumbmuscle_hunt_step")});
  } else if (INVENTORY.count("_dumbmuscle_hunt_step") == 1){
    TextBannerSequence.make([
      `You watch and give tips and indications as $$DumbMuscles$ sets up the trap. He does not do too poorly.`,
      `$$DumbMuscles$: "Awesome! We're gonna have some meat!"`,
    ], function(){INVENTORY.increase("_dumbmuscle_hunt_step")});
  } else {
      TextBannerSequence.make([
        `$$DumbMuscles$: "Mate, can we take a break?"`,
        `$$Ren$: "Sure, is there a problem?"`,
        `$$DumbMuscles$: "I'm just so hungry!"`,
        `$$Ren$: "Yeah, let's have a meal! What kind of rations are you carrying?"`,
        `$$DumbMuscles$: "Rations?"`,
        `$$Ren$: "What food did you prepare?"`,
        `$$DumbMuscles$: "I was supposed to prepare something?"`,
        `You sigh.`,
        `$$DumbMuscles$: "Hey, go easy on me, it's my first quest, remember."`,
        `$$Ren$: "Alright, alright! Let's just catch something here and eat it! There must be hares in this mountain..."`,
        `$$DumbMuscles$: "Ok, sweet, how do we do that?"`,
        `$$Ren$: "You need to lay a trap on the ground. Here, you can use this."`,
        `You hand him a basic rabbit trap.`,
      ], function(){INVENTORY.increase("_dumbmuscle_hunt_step")});
    }
  }
}
if(hawkpart == 18){
  var b = new M_Boulder(2350, 2350);

  var moveboulder = function(){
    b.silenced = true;
    MovingObject.try_make_walk_to(b, 2400, 2290, undefined, true);
  }

  b.interaction = function(){
    TextBannerSequence.make([
      `$$DumbMuscles$: "Dammit there's a boulder in the way!"`,
      `$$Ren$: "So... ?"`,
      `$$DumbMuscles$: "So what?"`,
      `$$Ren$: "Well, we can push it..."`,
      `$$DumbMuscles$: "How can you tell?"`,
      `$$Ren$: "It's the same as before!"`,
      `$$DumbMuscles$: "Oh right, right!"`,
      `$$DumbMuscles$ rolls the big boulder out of the way.`,
    ], moveboulder);
  }
  var placeholder = new S_AntiFloor(2325,2425,125,200, true);
}


// ===================
//hack E. DECOR
// ===================


var f = new Filler(gen.get());
var filler = new MultiFiller(f, 50, 50);

filler.add_default_constructor("S_RocksHuge", 3, 200, 50);
filler.add_default_constructor("S_Boulder", 0.3, 100, 100);
filler.add_default_constructor("S_Rocks1");
filler.add_default_constructor("S_Rocks2");
filler.add_default_constructor("S_Pebbles");
filler.add_default_constructor("S_Rootstall", 1.5);
filler.add_default_constructor("S_Root", 1.5);

filler.set_tries(10+2*size/100, 10+3*size/100);

for (var floor of floors){
  filler.set_zone(floor.x - 50,floor.y + 50,floor.w +100,floor.h +100);
  filler.fill_decor_by_retry();
}


// ===================
//hack F. EVENTS
// ===================


var events = new EventFiller(filler, 10);
var monstermodifier = 1 + hawkpart/20 * 1.5;
events.set_tries(2+size/100, 2*size/100);
events.battle('mountains/pterosaur',0.3 * monstermodifier);
events.battle('mountains/emu',0.5 * monstermodifier);
events.battle('mountains/hawk', 2 * monstermodifier);
events.battle('world/grizzly', 1 * monstermodifier);
events.battle('caves/scorpion', 0.5 * monstermodifier);

events.groundItem(ITEM.Stone);
events.groundItem(ITEM.Feather);
events.battleRubble(ITEM.Arrow);

events.byConstructor("EB_Pebbles", 0.5);

events.text(`You hear a piercing whistling sound and you notice an eagle darting through the air in your direction. As it comes closer at an incredible speed, it appears to be of massive size. You barely have the time to dodge the charge by jumping behind nearby rocks.`, 0.5);
events.text(`You jump with surprise as a massive flock of birds of prey take flight simultaneously from behind a nearby rock. The cumulated wing beating and shrieking is deafening. You can feel the air flow that their takeoff is producing.`, 0.5);
events.text(`You wonder if any human ever made it this far up the mountain. You've not seen many traces of previous travelers. Maybe you're the very first to reach that far!`, 0.5);
events.text(`As you climb up, the air is getting thinner, and each step becomes harder than the one before. You find yourself gasping for breath. You decide to slow down the pace to make up for it.`, 0.5);
events.text(`You see something odd on the ground. A quick examination informs you that it is a broken eggshell. When you look up, however, you find yourself faced with what is presumably the parent of the unlucky egg. The eagle stares at you with piercing eyes. You attempt to signify your peaceful intentions by not moving much. After what seems like an eternity, the beast moves on to other matters.`, 0.5);
events.text(`You look up at the peak of the mountain you're trying to climb. The very summit seems like a sharp needle piercing the sky. At the top, you believe you see some kind of incandescent radiating light. Are you imagining it?`, 0.5);
events.text(`You hear the nearby shrieks of a ravenous bird echoing in the stone around you, but the creature is nowhere to be seen. After carefully monitoring your surroundings, you decide to progress slowly.`, 0.5);
events.text(`A flock of vultures is fighting over the remains of what used to be a small mammal. The battle gets tense, in a flurry of beaks and claws. When the dust settles down, the birds fly away, leaving one of their kind wounded to death on the side of the path.`, 0.5);
events.text(`The air gets colder as you progress down the path. You cough when you swallow some of the dust from the path that the wind threw in your face.`, 0.5);


if(hawkpart != 20){
  for (var floor of floors){
    events.set_zone_from_floor(floor);
    events.fill_floor_by_retry();
  }
}


if(placeholder){
  placeholder.destroy();
}
// ===================
//hack G. START/INIT
// ===================

if(hawkpart == 1){
  CURRENTLEVEL.setup_text_start_function([
    `You find yourself at the bottom of the tallest mountain you've ever seen. It is bound to be an arduous climb.`,
  ]);
}

exit.initialize_with_character(2500, 2500);

if(hawkpart == 3){
  SAVE.autosave();
}
