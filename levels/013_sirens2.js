// ===================
//hack 0. INITIALIZATION
// ===================
AUDIO.music.levels.sirens();

var sirenspart = 1;
var s = CURRENTLEVEL.level_name.split(CURRENTLEVEL.SAME_IMPORT_DIFFERENT_LEVEL_SEPARATOR);
if(s.length > 1){
  sirenspart= parseInt(s[1]);
}
var gen = new Generator(DICTIONARY.get("world_seed")*(51+sirenspart));


if(sirenspart == 1){
  var dim = [2375,1350];
  var modifier = 1;
} else if(sirenspart == 2){
  var dim = [1800,900];
  var modifier = 2;
} else if(sirenspart == 3){
  var dim = [1300,600];
  var modifier = 4;
}

// ===================
//hack 1. FLOORS
// ===================

if(sirenspart < 4){
  new S_SandFloor(1075,2200,dim[0],dim[1]);
} else {
  new S_SandFloor(950,2200,750,200);
  new S_SandFloor(1675,2175,850,150);
  new S_SandFloor(2500,2150,1000,100);
  new S_SandFloor(3475,2125,1250,50);
  new S_SandFloor(4700,2175,150,150);
}

// ===================
//hack 2. EXIT
// ===================
if(sirenspart == 1){
  var x = new S_ExitFloor(2150,2225,250,50, "010_world_map");
} else if(sirenspart == 2){
  var x = new S_ExitFloor(1525,1325,400,50, "010_world_map");
} else if(sirenspart == 3){
  var x = new S_ExitFloor(1050,2000,50,250, "010_world_map");
} else {
  var x = new S_ExitFloor(925,2200,50,200, "010_world_map");
}

x.interaction = function(){
  new CenteredTextMenu("Swim to the surface?", [
    {"text": "Yes", "effect": function(){ CURRENTLEVEL.setup("010_world_map"); }},
    {"text": "Not yet", "effect": function(){}},
  ]);
}

// ===================
//hack 3. PERMANENT HARDCODED ELEMENTS (furniture)
// ===================
if(sirenspart == 1){
  new S_SavePoint(2175, 1900, 100, 50);

  var traitor = new M_TraitorFisher(2300, 1750);

  traitor.interaction = function() {
    this.face_character();
    if (PARTY.has_member(PARTYMEMBERS.TraitorFisher)){
      TextBannerSequence.make([
        `$$TraitorFisher$: "Let's leave quickly before we get found out!"`,
      ]);
    } else {
      BATTLE.api.make('_party/_TraitorFisher');
    }
  }
}

var placeholder = new S_Placeholder(2235, 1835,100, 100);

if(sirenspart < 4) {
  var x = gen.get();
  var y = gen.get();
  while(CURRENTLEVEL.io.select_interactible_at(1075+50+x * (dim[0]-100), 2200-50-y * (dim[1]-100))){
    x = gen.get();
    y = gen.get();
  }

  var constructor = function(x,y, seed){
    var rx = 100*((x - 1075) / dim[0]);
    var ry = 100*((2200 - y) / dim[1]);
     CONSOLE.log.debug(`Escape whirlwind located at (${rx}%,${ry}%) position.`);
     return new S_Whirlwind(x,y, seed, "013_sirens2@" + (sirenspart+1));
   }

  var f = new Filler(gen.get());
  f.set_zone(1075+50,2200+50,dim[0]-100, dim[1]-100);
  f.set_guaranteed(1);
  f.set_object(50, 50, constructor);
  f.fill_floor_by_retry();
} else{
  new SE_event(2500, 2150, [
    `$$Ren$: "We haven't seen any monster for a while, now..."`,
    `$$BestFriend$: "Isn't that good? That means we're safe!"`,
    `$$Ren$: "On the contrary, it means that something big is coming..."`,
    `$$BestFriend$: "What kind of twisted logic is that!"`,
  ], 100);
  new SE_event(2825, 2150, [
    `$$BestFriend$: "This place is so quiet... It's almost relaxing!"`,
    `$$Ren$: "I bet it hides something. It's too suspicious."`,
  ], 100);

  new SE_event(3325, 2150, [
    `$$BestFriend$: "Look, over there, an altar!"`,
    `$$Ren$: "That means we're going to face a pretty big challenge soon."`,
    `$$BestFriend$: "How do you get that from an altar?"`,
    `$$Ren$: "It's the Goddess' way of warning us!"`,
    `$$BestFriend$: "I see..."`,
  ], 100);
  new S_SavePoint(3425, 2150);


  new SE_event(3550, 2125, [
    `$$BestFriend$: "It's getting darker, we must be getting close to the deepest point of the lake, and still, nothing."`,
  ], 50);
  new SE_event(3775, 2125, [
    `$$BestFriend$: "Without the swarm of armed sirens, I feel like I'm looking at the scenery for the first time. It's beautiful here!"`,
    `$$Ren$: "Don't get too comfortable. There's no such thing as peace. It's the calm before the storm."`,
  ], 50);
  new SE_event(4000, 2125, [
    `$$BestFriend$: "When we get out of here, let's take some actual rest somewhere quiet. We could find a cabin..."`,
    `$$Ren$: "Don't start making plans for the future! That's a sure-fire way to invite disaster!"`,
    `$$BestFriend$: "You're so superstitious..."`,
  ], 50);
  new SE_event(4200, 2125, [
    `$$BestFriend$: "What are you so afraid of? It's empty here, we're completely safe!"`,
    `$$Ren$: "Stop saying this kind of things! You're asking for trouble!"`,
  ], 50);

  new SE_event(4425, 2125, [
    `$$BestFriend$: "Let's just swim away, if you're so scared..."`,
    `$$Ren$: "I'm not sure. Clearly there's something here. Something big. I bet it's worth the trouble..."`,
    `$$BestFriend$: "You're getting all that from the absence of enemies? Don't you think you might be reading too much into it?"`,
  ], 50);

  new SBattle(4575, 2125, 'waters/serpent');

  new SE_event(4750, 2125, [
    `You discover a sword planted upright in the sand. It is unlike any weapon you've ever seen. The blade shines so bright that it lights up the whole surroundings. It's even hard to look at it. The hilt is ornamented with the finest golden arabesques you've ever seen. You quietly think that no human could have done that. It's surrounded by an aura that seems to slowly vibrate the very fabric of the universe, ringing your ears with an angelic buzz.`,
    `$$BestFriend$: "Woah!"`,
    `$$Ren$: "It's probably a holy artifact. It can help us tremendously on our quest!"`,
    `$$BestFriend$: "Take it!"`,
    `You expected to struggle, but the weapon slides effortlessly out of the ground. Even taking into account the fact that you're underwater, the blade is incredibly light. It cuts through the water almost without resistance.`,
    `$$Ren$: "This is amazing..."`,
  ], 50, undefined, function(){ INVENTORY.increase(ITEM.Sword_legend); });
}




// ===================
//hack 4. PERMANENT FILLER ELEMENTS (decoration)
// ===================

var ff = new Filler(gen.get());
var decorFiller = new MultiFiller(ff, 50, 60);
decorFiller.add_default_constructor("S_Seashell", 0.6);
decorFiller.add_default_constructor("S_Seashellpointy", 0.6);
decorFiller.add_default_constructor("S_Planks", 0.4);

decorFiller.add_default_constructor("S_WaterPlantWall", 1);
decorFiller.add_default_constructor("S_TentaPlantMini", 2);
decorFiller.add_default_constructor("S_Coral", 1);
decorFiller.add_default_constructor("S_Anemone", 1);

decorFiller.add_default_constructor("S_BubblePlant", 4);
decorFiller.add_default_constructor("S_TentaPlant", 2);

if(sirenspart < 4){
  decorFiller.add_default_constructor("S_Whirlwind", 1 * modifier);

  decorFiller.set_zone(1075,2200,dim[0], dim[1]);
  decorFiller.set_tries(75, 100);
  decorFiller.fill_floor_by_retry();
} else {
  decorFiller.set_tries(10, 25);
  decorFiller.set_zone(1050,2200,650,200);
  decorFiller.fill_floor_by_retry();
  decorFiller.set_zone(1675,2175,850,150);
  decorFiller.fill_floor_by_retry();
  decorFiller.set_zone(2500,2150,1000,100);
  decorFiller.fill_floor_by_retry();
  decorFiller.set_zone(3475,2125,1250,50);
  decorFiller.fill_decor_by_retry();
}

// ===================
//hack 5. DESTRUCTIBLE FILLER ELEMENTS (encounters)
// ===================

  var events = new EventFiller(decorFiller, 10);
  events.battle('waters/anemone', modifier);
  events.battle('waters/crab', modifier);
  events.battle('waters/jellyfish', modifier);
  events.battle('waters/mermaid', 2 * modifier);
  events.battle('waters/naiad', 0.5 * modifier);
  events.battle('waters/triton', 2 * modifier);
  events.groundItem(ITEM.Scale);
  events.groundItem(ITEM.Seashell);
  events.battleRubble(ITEM.Bone);
  events.battleRubble(ITEM.Spear, 0.05);
  events.battleRubble(ITEM.Elixir_venom, 0.1);
  events.battleRubble(ITEM.Poison_darts, 0.1);
  events.battleRubble(ITEM.BreathingPotion, 0.1);
  events.byConstructor("EB_Seashell", 0.1);
  events.byConstructor("EB_Skeleton", 0.1);
  events.text('The waters in this lake are way more tumultuous than the placid surface had lead you to believe. Every now and then you see columns of bubbles swirling, or fishes being dragged by powerful chaotic currents.');
  events.text(`A patrol of heavily armed tritons is swimming nearby. You don't think you can take them head on. Fortunately, you can swim down to the sand. You croutch and wait for the menace to go away.`);
  events.text(`The lake is much deeper than you first thought. When you look up, you can barely see rays of light defracted by massive quantities of water. Most of the ambient light that allows you to see comes from fluorescent vegetals.`);
  events.text(`The water dulls the sounds around you. It makes it hard to be reactive to approaching danger. When a flesh eating fish charges you from behind, you only notice it way too late. Fortunately, $$BestFriend$ is ready and manages to counter the animal before you even get hurt.`);
  events.text(`The bottom of the lake is full of life. Huge swarms of fishes are swimming above your heads. Their colorful scale make them shine in the darkness like moving sparkly stars. The Sirens people must not be hungry.`);
  events.text(`The breathing potion makes it possible for you to remain underwater. You breathe in the liquid and it somehow sustains you without drowning. The feeling is weird, it's definitely more viscous and heavy than air, and it has a distinctly fishy taste.`);

if(sirenspart < 4){
  events.set_tries(50, 75);
  events.fill_floor_by_retry();
}

placeholder.destroy();

// ===================
//hack 7. START/INIT
// ===================

if(sirenspart == 1){
  var callback = function(){
    TextBannerSequence.make([
      `$$BestFriend$: "What... What just happened? How did you know you could trust her?"`,
      `$$BestFriend$: "Of course, the Goddess! Well, let's not linger! She said to head south, right?"`,
    ]);
  }

  var fight = function(){
    IO.control.character();
    BATTLE.api.make('_party/_TraitorFisherTrial', callback);
  }

  var next = function() {
    PARTY.changeNickname(PARTYMEMBERS.TraitorFisher);
    TextBannerSequence.make([
      `$$TraitorFisher$: "Why were you trespassing on the territory of the Sirens?"`,
      `$$Ren$: "The Sirens? Sorry, we had no idea..."`,
      `The crowd of merfolk exchange concerned murmurs in a tongue you cannot comprehend. It sounds like hisses and tongue clicks. $$TraitorFisher$ sends a few concerned gazes around.`,
      `$$TraitorFisher$: "I'm sorry, we must begin your formal trial."`,
    ], fight);
  };
  CURRENTLEVEL.setup_text_start_function([
    `You get dragged all the way to the bottom of the lake. When the currents finally quiet down, the tentacular monster that brought you here is nowhere to be seen. Instead, you can see plenty of heavily armored sirens and tritons floating in the water all around. They are all watching you with a suspicious eye.`,
    `In front of you stands a young woman, studying you patiently. She seems very serious, and not at all phased by this unusual environment or by your presence.`,
  ], next);
  CURRENTLEVEL.initialize_with_character(2275, 1800);
} else if(sirenspart == 2){
  CURRENTLEVEL.setup_text_start_function([
    `$$BestFriend$: "We've arrived in a completely different part of the lake... Do you think the Siren army will follow us here?"`,
    `$$Ren$: "I'm pretty sure that they won't. In this world, if you run away for a bit, your pursuers will always give up."`,
    `$$BestFriend$: "That seems unlikely. Why would they just abandon the chase?"`,
    `$$Ren$: "I guess the Goddess has our backs!"`,
  ]);
  CURRENTLEVEL.initialize_with_character(2275, 1800);
} else if(sirenspart == 3){
  CURRENTLEVEL.setup_text_start_function([
    `You arrive in an even deeper and densely populated part of the lake.`,
  ]);
  CURRENTLEVEL.initialize_with_character(2275, 1800);
} else {
  CURRENTLEVEL.setup_text_start_function([
    `You've reached the bottom of the lake, the deepest parts of the water. The place is so dark that you can barely see. Contrary to what you've seen before, everything seems very quiet.`,
    `$$BestFriend$: "It seems like we'll be safe here..."`,
    `$$Ren$: "Don't let your guard down, though. That's begging for trouble. It's always when you start to feel safe that you get attacked by the biggest creature..."`,
  ]);
  CURRENTLEVEL.initialize_with_character(1000, 2175);
}
