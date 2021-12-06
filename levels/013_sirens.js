
/*
mermaid,naiad,triton

serpent < boss
*/

AUDIO.music.levels.squids();


new S_SandFloor(1725,2750,450,200);
new S_ExitFloor(1725,2775,450,50, "010_world_map");

var b = new M_Boat(1700,2600);
new S_SeaFloor(1075,2575,2450,1200);

var attack = function(){
  AUDIO.music.levels.sirens();
  TextBannerSequence.make([
    `The boat suddenly comes to a halt.`,
    `$$BestFriend$: "What's happening? Why are we not moving?"`,
    `$$Ren$: "I told you..."`,
    `Waves start to shake the sea around you, as tentacles sprawl around and grab your little wooden raft.`,
  ]);
//  CHARACTER.character.visual_element.show();
//  IO.control.character();
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
    TextBannerSequence.make([
    `$$BestFriend$: "Let's go in!"`,
    `$$Ren$: "I'm pretty sure that if we do, something bad will happen. Isn't this abandoned boat a bit too convenient? I'm telling you, in this kind of situations, people who take to the sea always get attacked by some sort of monster from the depths..."`,
    `$$BestFriend$: "What do you mean, this kind of situation? It's not an ocean, it's a lake!"`,
    `$$Ren$: "Still... This lake wouldn't be here if there wasn't more to it..."`,
    `$$BestFriend$: "Do your mystical intuitions have to make you such a downer? Come on, what's the worst that could happen? We'll be super careful! Live a little!"`,
  ], proposesea);
}

CURRENTLEVEL.start_function = function() {
  TextBannerSequence.make([
  `You arrive at the border of a big lake. The surface is shining under the sunlight.`,
  `$$BestFriend$: "It's beautiful! Look, there's a boat here! We should definitely borrow it and go in the middle of the lake! It would be so peaceful and relaxing! Not to mention safe..."`,
  `$$Ren$: "I'm not sure about that... This looks suspicious... Especially when you say things like that..."`,
  `$$BestFriend$: "Please!"`,
  ], IO.control.character);
}

CURRENTLEVEL.initialize_with_character(1950,2675);
