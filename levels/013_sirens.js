
AUDIO.music.levels.squids();

new S_SandFloor(1725,2750,450,200);
new S_ExitFloor(1725,2775,450,50, "010_world_map");

var b = new M_Boat(1700,2600);
new S_SeaFloor(1075,2575,2450,1200);


var drink = function(){
  TextBannerSequence.make([
    `$$Ren$: "Here, drink this!"`,
    `You both take a sip of potion. As you drink, the tentacles become more frantic, and the water engulfes the insides of the boat. Wooden planks explode in a cloud of splinters. You feel the cold embrace of the water dragging your whole body down. You grab $$BestFriend$'s hand to stay together in this chaos.`,
    `Pretty soon, you're sucked towards the bottom of the lake in a maelstorm of bubble and wooden pieces.`,
  ], function(){ CURRENTLEVEL.setup("013_sirens2"); });
}

var react2 = function(){
  new CenteredTextMenu("What do you want to do?", [
    {"text": "Jump and swim", "effect": jump},
    {"text": "Drink the potions", "effect": drink},
  ]);
}

var loot = function(){
  TextBannerSequence.make([
      `$$Ren$: "Look with me around the boat!"`,
      `$$BestFriend$: "We're going to drown!"`,
      `$$Ren$: "Relax, it'll all be fine!"`,
      `You look around together for something that you might have overlooked in your surroundings that could help in this dire situation. It does take some time, but the boat seems to sink suspiciously slowly, and the tentacles have quieted down.`,
      `You notice a little bag under one of the benches. It is full of underwater breathing potions.`,
  ], react2 );
}


var jump = function(){
  TextBannerSequence.make([
    `$$Ren$: "Let's jump!"`,
    `You both throw yourself in the water. Terrified by the monster's attack, you barely pay attention to the thermic shock, and start making your way towards the closest shore. You hear behind you the noise of wood cracking.`,
    `When you finally reach safe ground and look behind, nothing is left from your encounter.`,
  ], function(){ ABILITIES.unlock("_seen_boat"); CURRENTLEVEL.setup("010_world_map"); });
}


var actualwait = function() {
  setTimeout(react, 2000);
}

var wait = function(){
  TextBannerSequence.make([
    `As you expected, the boat sinks very slowly and the tentacles do not move much. In fact, it almost seems that everything is staying still.`,
  ], actualwait);
}

var react = function(){
  new CenteredTextMenu("What do you want to do?", [
    {"text": "Jump and swim", "effect": jump},
    {"text": "Loot the boat", "effect": loot},
    {"text": "Wait", "effect": wait},
  ]);
}

var attack = function(){
  AUDIO.music.levels.sirens();
  TextBannerSequence.make([
    `The boat suddenly comes to a halt.`,
    `$$BestFriend$: "What's happening? Why are we not moving?"`,
    `$$Ren$: "I told you..."`,
    `Waves start to shake the water around you, as tentacles sprawl around and grab your little raft. The wood starts to crack under the pressure from the monster.`,
    `$$BestFriend$: "Quick, what should we do?"`,
    `$$Ren$: "Actually, we don't need to hurry, we have all the time we need."`,
    `$$BestFriend$: "What on earth do you mean? There's no time! We're sinking!"`,
    `$$Ren$: "We've got the Goddess' protection!"`,
  ], react);
}

var moveBoat2 = function(){
  MovingObject.try_make_walk_to(b, 2000,2000, function(){}, true);
  MovingObject.try_make_walk_to(CHARACTER.character, 2050,1950, attack, true); // for the camera
}

var moveBoat = function(){
  CHARACTER.character.visual_element.hide();
  CHARACTER.character.silenced = true;
  MovingObject.try_make_walk_to(b, 1700,2000, moveBoat2, true);
  MovingObject.try_make_walk_to(CHARACTER.character, 1750,1950, function(){}, true); // for the camera
}

var boardBoat = function(){
  IO.control.cede();
  MovingObject.try_make_walk_to(CHARACTER.character, 1750,2500, moveBoat, true);
}

var accept = function(){
  TextBannerSequence.make([
    `$$Ren$: "Fine..."`,
    `A huge smile warms $$BestFriend$'s face, and melts all your worries away. You both go into the boat and start roaming towards the center.`,
  ], boardBoat);
}

var refuse = function(){
  TextBannerSequence.make([
    `$$BestFriend$: "Ok..."`,
  ]);
}

var proposesea = function(){
  new CenteredTextMenu("Who will you listen to?", [
    {"text": DICTIONARY.get("BestFriend"), "effect": accept},
    {"text": "Your gut", "effect": refuse},
  ]);
}

b.interaction = function(){
  if(ABILITIES.has_ability("_seen_boat")){
    TextBannerSequence.make([
      `$$BestFriend$: "What on earth... the boat... came back?"`,
      `$$Ren$: "Yes, this kind of things happen. The Goddess sent us a new one."`,
      `$$BestFriend$: "This is crazy! I'll never get used to being under Her care!"`,
      `$$BestFriend$: "So, do you want to tempt fate and give it another go?"`,
    ], proposesea);
  } else {
      TextBannerSequence.make([
        `$$BestFriend$: "Let's go in!"`,
        `$$Ren$: "I'm pretty sure that if we do, something bad will happen. Isn't this abandoned boat a bit too convenient? I'm telling you, in this kind of situations, people who take to the sea always get attacked by some sort of monster from the depths..."`,
        `$$BestFriend$: "What do you mean, this kind of situation? It's not an ocean, it's a lake!"`,
        `$$Ren$: "Still... This lake wouldn't be here if there wasn't more to it..."`,
        `$$BestFriend$: "Do your mystical intuitions have to make you such a downer? Come on, what's the worst that could happen? We'll be super careful! Live a little!"`,
      ], proposesea);
  }
}

CURRENTLEVEL.setup_text_start_function([
  `You arrive at the border of a big lake. The surface is shining under the sunlight.`,
  `$$BestFriend$: "It's beautiful! Look, there's a boat here! We should definitely borrow it and go in the middle of the lake! It would be so peaceful and relaxing! Not to mention safe..."`,
  `$$Ren$: "I'm not sure about that... This looks suspicious... Especially when you say things like that..."`,
  `$$BestFriend$: "Please!"`,
]);

CURRENTLEVEL._recover_position = [1950,2675];
CURRENTLEVEL.initialize_with_character(1950,2675);
