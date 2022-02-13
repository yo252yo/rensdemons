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

var plugBoulder = function (boulder, walkable_antifoor, tx, ty, now, keephard) {
  var cementboulder = function(){
    boulder.interaction = function(){};
    if (!keephard){
      boulder.make_walkable();
    }
    if(!walkable_antifoor){
      CONSOLE.error("cannot find the ground to walk on");
    }
    walkable_antifoor.make_walkable(true);
  }

  var moveboulder = function(){
    boulder.silenced = true;
    MovingObject.try_make_walk_to(boulder, tx, ty, cementboulder, true);
  }

  if(now){
    moveboulder();
  } else {
    boulder.interaction = function(){
      new CenteredTextMenu("Push the boulder?",
                    [
                      {"text": "Yes", "effect": moveboulder},
                      {"text": "No", "effect": "##CLOSE"},
                   ]
                 );
     };
   }
}


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

  var moveboulder = function(){
    plugBoulder(b, walkable_antifoor, 1340, 1175, true);
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
        `$$Ren$: "Yeah, it seems that I instantly knew everything I needed about adventure!"`,
        `$$DumbMuscles$: "That is so rad! Well, I learned something, thanks mate. Leave it to me!"`,
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
  var a = new SE_event(3775, 2450, [`...`]);

  var destroyStack = function(){
    a.destroy();
    INVENTORY.increase("_dumbmuscle_story_quest");
    TextBannerSequence.make([
      `$$DumbMuscles$ gives a little push and the pile of rocks crumbles. The boulders roll on the road and fill a gap in the road a few steps ahead of you.`,
      `$$Ren$: "See! That's how you make good things happen!"`,
    ]);
  }

  var prompt = function(){
    new CenteredTextMenu("What do you want to do?",
                  [
                    {"text": "Destroy the stack", "effect": destroyStack},
                    {"text": "Leave things as they are", "effect": "##CLOSE"},
                 ]
               );
 }

  a.interaction = function(){
    TextBannerSequence.make([
      `You find a pile of rocks that seem pretty unstable.`,
      `$$Ren$: "Let's push it down."`,
      `$$DumbMuscles$: "Why?"`,
      `$$Ren$: "I don't know. This looks interactible, we should try and see what it does!"`,
      `$$DumbMuscles$: "If you say so..."`,
    ], prompt);
  }

  if (INVENTORY.count("_dumbmuscle_story_quest") == 2){
    INVENTORY.set("_dumbmuscle_story_quest", 3);
  }

}
if(hawkpart == 4) {
  new S_AntiFloor(3650,2750,125,150);
  var b = new S_AntiFloor(3775,2750,75,150);
  new S_AntiFloor(3850,2750,125,150);


  if(INVENTORY.count("_dumbmuscle_story_quest") > 0) {
    b.destroy();
  }

  var placeholder = new S_AntiFloor(3625,2775,375,350, true);
  if (!INVENTORY.count("_dumbmuscle_story_quest")){
    new SE_event(3775, 2625, [
      `$$DumbMuscles$: "Look! Another gap in the road! And this time there's no boulder!"`,
      `$$Ren$: "That usually means we missed something..."`,
      `$$DumbMuscles$: "What do you mean?"`,
      `$$Ren$: "We need to trace back our steps and be more careful. There's got to be something that allows us to pass through."`,
      `$$DumbMuscles$: "Are you sure? Maybe there's just no way forward..."`,
      `$$Ren$: "There's always a way forward."`,
    ]);
  } else if(INVENTORY.count("_dumbmuscle_story_quest") <= 2) {
    new SE_event(3775, 2650, [
      `The chasm in the road has been filled by the gravel from your earlier destruction of a random pile of rocks. How fortunate. The Goddess is really looking up for you!`,
    ], 75);

    var a = new SE_event(3775, 2775, [`...`], 75);
    a.interaction = function(){
      if (INVENTORY.count("_dumbmuscle_story_quest") == 1){
        TextBannerSequence.make([
          `No sooner did you make your way past the gap that a giant eagle charges towards you. Sharp claws ahead, the bird seems determined to make you its prey.`,
          `$$DumbMuscles$: "Oh shit mate! What do we do? What do we do!"`,
          `$$Ren$: "Calm down! Let's go back down the road a bit, in an area we cleared. We made sure that it's safe!"`,
          `$$DumbMuscles$: "It'll follow us!"`,
          `$$Ren$: "Only for a while!"`,
          `You start going back on your steps.`,
          `$$DumbMuscles$: "It's still following us!"`,
          `The predator is indeed still aiming for your back.`,
          `$$Ren$: "Trust me, it will stop!"`,
        ], function(){ INVENTORY.set("_dumbmuscle_story_quest", 2); });
      } else {
        TextBannerSequence.make([
          `The eagle is still charging towards you menacingly.`,
          `$$DumbMuscles$: "Oh shit! We need to run!"`,
          `$$Ren$: "Don't worry, we have time."`,
          `Indeed, when you look at the bird, it is clearly moving, but it doesn't seem like the distance between you and it ever decreases.`,
        ]);
      }
    }
  } else  {
    new SE_event(3775, 2785, [
      `The way seems clear. Your predator is nowhere to be found.`,
      `$$DumbMuscles$: "Damn! It's gone!"`,
      `$$Ren$: "See!"`,
      `$$BestFriend$: "I should be used to it by now, but I'm still puzzled by your weird tactics."`,
      `$$DumbMuscles$: "As long as it works..."`,
    ], 75);

  }

}
if(hawkpart == 5) {
  new S_AntiFloor(1750,3375,175,150);
  var placeholder = new S_AntiFloor(1675,3450,275,300, true);
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
  new SE_event(1900, 3425, [
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
if(hawkpart == 6) {
  new S_AntiFloor(1750,1695,70,120);
  var placeholder = new S_AntiFloor(1525,2725,600,1225, true);


  new S_MudFloor(1825,2050,50,50);
  new S_MudFloor(1850,2050,75,225);

  new S_MudFloor(1725,2300,475,50);
  new S_MudFloor(2150,2300,75,375);
  new S_MudFloor(2000,1975,400,50);
  new S_MudFloor(1975,2175,75,250);
  new S_MudFloor(1875,2175,150,50);

  new S_MudFloor(2350,2350,50,425);
  new S_MudFloor(2350,2475,50,50);

  new SE_gem(2350, 2475);

  var walkable_antifoor = new S_AntiFloor(1750,1760,70,70);
  var finalBoulder = new M_Boulder(1825, 1850);
  plugBoulder(finalBoulder, walkable_antifoor, 1780, 1750);

  var walkable_anteantifoor = new S_AntiFloor(1725,2050,150,50);
  walkable_anteantifoor.visual_element.adjust_depth(-2);
  var antefinalBoulder = new M_Boulder(1825, 2175);
  plugBoulder(antefinalBoulder, walkable_anteantifoor, 1790, 2060);


  var fake_walkable_antifoor = new S_AntiFloor(100,100,10,10);
  var fakeBoulder = new M_Boulder(1600, 2025);
  plugBoulder(fakeBoulder, fake_walkable_antifoor, 1550, 2000);


  var fake_walkable_antifoor2 = new S_AntiFloor(200,200,10,10);
  var blockingBoulder = new M_Boulder(1725, 2300);
  plugBoulder(blockingBoulder, fake_walkable_antifoor2, 1800, 2380);


  var fake_walkable_antifoor3 = new S_AntiFloor(150,150,10,10);
  var blockingBoulder2 = new M_Boulder(1950, 1975);
  plugBoulder(blockingBoulder2, fake_walkable_antifoor2, 1890, 1975, false, true);

  var gem_antifloor = new S_AntiFloor(2350,2450,50,125);
  gem_antifloor.visual_element.adjust_depth(-2);
  var gem_boulder = new M_Boulder(2200, 2300);
  plugBoulder(gem_boulder, gem_antifloor, 2375, 2425);

}
if(hawkpart == 7){
  new SE_gem(3350, 1675);
}
if(hawkpart == 8){
  new S_Waterfall(2825, 3250);
  new S_MudFloor(2825,3275,96,455);
  new S_MudFloor(2700,2875,175,50);
  new S_MudFloor(2700,2875,50,200);
  new S_MudFloor(2125,2725,625,50);

  var destroyable_antifoor = new S_AntiFloor(2575,3475,175,275);
  var placeholder = new S_AntiFloor(2425,3450,525,275, true);

  var destroyable_event = new SE_event(2750, 3350, [
    `$$DumbMuscles$: "What about now? No boulder, and I'm pretty sure we didn't pass by a pile of rocks or some other convenient stuff we missed."`,
    `$$Ren$: "Admittedly. This looks like the kind of place where you'd need to talk to someone to trigger an event and unlock progression."`,
    `$$DumbMuscles$: "But there's nobody around!"`,
    `$$Ren$: "What about that waterfall?"`,
    `$$DumbMuscles$: "What about it?"`,
    `$$Ren$: "We need to check behind it."`,
    `$$DumbMuscles$: "You mean... go under that water? But it is so cold and powerful!"`,
    `$$Ren$: "Yes, I know. But there's always something behind the waterfall. Always."`,
    `$$DumbMuscles$ exchanges a puzzled look with $$BestFriend$ who just shrugs.`,
  ]);

  var feffect = function(){

    destroyable_antifoor.destroy();
    if(destroyable_event){
      destroyable_event.destroy();
    }
    feffect = undefined;
  }
  new S_RockColumnGoddess(2175, 2690);

  new S_MudFloor(2125,2200,50,50);

  var f = new M_Faery(2135, 2190);
  f.interaction = function() {
    this.face_character();
    if (feffect){
      TextBannerSequence.make([
        `In front of you stands an ethereal feminine shape. Instead of matter, she seems made of a kind of translucent liquid.`,
        `$$DumbMuscles$: "Wow!"`,
        `Faerie: "Hello. Who are you?"`,
        `$$Ren$: "We're simple adventurers passing by. You must be a spirit of nature?"`,
        `Faerie: "Yes, I am indeed the spirit of this mountain. I do not recall having ever had human visitors in eons."`,
        `$$DumbMuscles$: "This mountain is hard to climb."`,
        `Faerie: "I know. I commend you for making it this far. And warn you that the way ahead is even harder."`,
        `$$DumbMuscles$: "Thanks, but I've got my mate here, $$Ren$, nothing can stop us!"`,
        `$$BestFriend$: "$$Ren$ is the Promised Child, you see..."`,
        `Faerie: "By the Goddess, why didn't you say so sooner? It explains why you managed to make it so far! It's an honor to meet you! Is there anything I can do to help your quest?"`,
        `$$Ren$: "As a matter of fact, yes. There's a rift blocking our way..."`,
        `Faerie: "Say no more! Consider it done!"`,
        `Faerie: "You can pass now! I wish you the best of luck on your travels!"`,
      ], feffect);
    } else {
      TextBannerSequence.make([
        `Faerie: "You can pass now! I wish you the best of luck on your travels!"`,
      ]);
    }


  }

  new SE_event(2775, 2875, [
    `Behind the waterfall, you find a natural cave which extends with a tunnel into the depths of the mountain.`,
  ]);

  var extra = [
    `$$BestFriend$: "You think there's gonna be gemstones just... laying around in the mountains?"`,
    `$$Ren$: "I know so. In fact I'm pretty sure they are specifically on this mountain, not anywhere else in the world."`,
    `$$BestFriend$: "Okay, Promised Child. Let's go look around then!"`,
  ];
  if(INVENTORY.count(ITEM.Gemstone)){
     extra = [
      `$$DumbMuscles$: "You mean like the one we picked up earlier?"`,
      `$$Ren$: "Exactly. It's no coincidence we found it on this mountain. I bet it fits perfectly. Try it!"`,
    ];
  }

  new SE_event(2225, 2725, [
    `$$DumbMuscles$: "Dead end... well, so much for that."`,
    `$$Ren$: "No, there's no way this tunnel doesn't lead somewhere!"`,
    `$$BestFriend$: "You know, sometimes nature does stuff for no reason."`,
    `$$Ren$: "Nature, maybe, but not the Goddess! Look at that pillar over there, doesn't the shape remind you of Her?"`,
    `$$DumbMuscles$: "I could see it I guess..."`,
    `$$Ren$: "Except... the eyes are missing! Well, it's simple. We just need to find two gemstones and put them in the sockets!"`,
  ].concat(extra), 50, undefined, function(){ ABILITIES.unlock("_DumbMuscles_searchinggemstones");});
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
if(hawkpart == 16){
  new SE_event(2525, 2900, [
    `$$DumbMuscles$: "Can we rest a bit? I need to replenish my energy."`,
    `$$Ren$: "Good idea, let's nap!"`,
    `$$DumbMuscles$: "Here? Is it safe?"`,
    `$$Ren$: "Yeah, we just cleared the zone."`,
    `$$DumbMuscles$: "What if we get attacked by beast or something?"`,
    `$$Ren$: "We won't. We eliminated all non-optional dangers."`,
    `$$DumbMuscles$: "If you say so..."`,
    `$$DumbMuscles$ is doubtful, but you still all set up a little camp. So much climbing took a toll on your stamina, and the respite is much welcome.`,
    `As you expected, nothing bad happens.`,
  ], 75);
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


var filler = new Filler(gen.get(), 50, 50);

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
events.add_shared_events(0.4);


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
if(hawkpart == 3){
  CURRENTLEVEL.setup_text_start_function([
    `$$DumbMuscles$: "So how does this work? There are monsters everywhere around that path..."`,
    `$$Ren$: "Well usually, you'd want to clear everything in an area before moving on to the next."`,
    `$$DumbMuscles$: "Do I have to?"`,
    `$$Ren$: "Not really, but you might miss something important."`,
    `$$DumbMuscles$: "I see..."`,
  ]);
}
if(hawkpart == 6){
  CURRENTLEVEL.setup_text_start_function([
    `$$DumbMuscles$: "Wow! What the hell is going on here?"`,
    `$$Ren$: "Calm down, it's a pretty classic puzzle. It's simple, we have to push the boulders in the right order."`,
    `$$DumbMuscles$: "What if I mess up?"`,
    `$$Ren$: "We'll just leave and come back, and we can try again."`,
    `$$DumbMuscles$: "Just like that?"`,
    `$$Ren$: "Yeah, just like that."`,
  ]);
}
if(hawkpart == 19){
  CURRENTLEVEL.setup_text_start_function([
    `As you near the summit, you see that the floor is littered with incandescent feathers.`,
    `$$Ren$: "Aren't those what you needed?"`,
    `$$DumbMuscles$ crouches down and picks up a few.`,
    `$$DumbMuscles$: "Yeah, I think. Thanks for everything, mate."`,
    `You stare awkwardly at each other during a moment of silence.`,
    `$$Ren$: "I guess... this is goodbye, then?"`,
    `$$DumbMuscles$: "Well, huh... There's more..."`,
    `$$Ren$: "What?"`,
    `$$DumbMuscles$: "I kinda don't want to go back alone. What if there's more puzzles or dangers and stuff that I don't know on the way down?"`,
    `$$Ren$: "There won't be. We cleared the whole way."`,
    `$$DumbMuscles$: "But what if monsters come back?"`,
    `$$Ren$: "They won't."`,
    `$$DumbMuscles$: "Still, I'd be much more confident if I could stick to your side a bit longer. Just until I know the ropes, you know..."`,
    `$$Ren$: "What about your quest?"`,
    `$$DumbMuscles$: "The questgiver didn't specify a time limit..."`,
    `$$Ren$: "Oh, I see. That means you have until the end of the universe."`,
    `$$DumbMuscles$: "Yep."`,
    `You exchange a smile.`,
    `$$Ren$: "Ok, you can tag along."`,
    `$$DumbMuscles$: "Sweet!"`,
    "$$DumbMuscles$ joins your party!",
  ], function(){ PARTY.add(PARTYMEMBERS.DumbMuscles); IO.control.character(); });
}
if(hawkpart == 20){
  CURRENTLEVEL.setup_text_start_function([
    `The summit stands in front of you, piercing the cottony layer of clouds below.`,
    `On top, you can see on a small platform a cluster of wood bathed in a crimson glow. On top, a gigantic bird seems to be ablaze. It lets out a piercing shriek as soon as it sees you.`,
  ]);
}

exit.initialize_with_character(2500, 2500);

if(hawkpart == 5){
  SAVE.autosave();
}
