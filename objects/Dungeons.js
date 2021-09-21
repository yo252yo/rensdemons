
class S_Tree extends LevelObject {
  constructor(x, y){
    var visual = new StaticSprite("assets/objects/forest/tree.png", 'obj_light');
    super(visual, x, y);
    this.adjust_hitbox(25,0,20,15);
    this.default_text = this.text_interaction([
      "It's a tree.",
      "Lustrous leaves, bulky branches... yes, definitely a tree.",
      "The foliage of the tree casts a pleasant shadow.",
      "It's a completely normal tree, hiding nothing whatsoever.",
    ]);
  }

  interaction(){
    if (this.hidden_in){
      this.hidden_in.place_at(this.visual_element.x, this.visual_element.y - 20);
      this.hidden_in.try_walk_by(-40, 30);
      this.hidden_in.interaction();
      this.hidden_in = null;
    } else {
      this.default_text();
    }
  }

  hide_in(object){
    this.hidden_in = object;
  }
}

class S_AlgaeWall extends SimpleObject {
  constructor(x, y){
    super(x, y, "water/algaewall");
    this.adjust_hitbox(20,0,110,25);
    this.default_text = this.text_interaction([
      "These green aquatic plants intertwine in an impassible wall.",
      "You're faced with underwater vines tangled in an inextricable mess.",
      "There's no passing by this wall of tangling vines.",
    ]);
  }
}

class S_Anemone extends SimpleObject {
  constructor(x, y){
    super(x, y, "water/anemone");
    this.adjust_hitbox(0,0,20,20);
    this.default_text = this.text_interaction([
      "The little tentacles around the mouth of the anemone seem to be fondling the water in search of food.",
      "You watch the mouth of the purple anemone open and close with the currents.",
      "It's a colorful anemone. Little fishes are swarming around it, finding a refuge in its watery mane.",
    ]);
  }
}

class S_Coral extends SimpleObject {
  constructor(x, y){
    super(x, y, "water/coral");
    this.adjust_hitbox(0,0,50,25);
    this.default_text = this.text_interaction([
      "This coral stands proudly as a refuge to thousands of tiny fishes swarming around it.",
      "You can't help but be impressed by the colorful reflections emanating from the porous coral structure.",
      "You are taken aback by the beauty of the mysterious natural arabesques drawn by the coral.",
    ]);
  }
}

class S_Seashell extends SimpleObject {
  constructor(x, y){
    super(x, y, "exterior/seashell");
    this.adjust_hitbox(10,0,20,10);
    this.default_text = this.text_interaction([
      "This seashell still has an inhabitant.",
      "The floor is littered with shells like this. Most of them are still alive and well.",
      "You watch as the water carries the small shell and its inhabitant back and forth.",
    ]);
  }
}

class S_Seashellpointy extends SimpleObject {
  constructor(x, y){
    super(x, y, "exterior/seashellpointy");
    this.adjust_hitbox(10,0,20,10);
    this.default_text = this.text_interaction([
      "This shell is without a doubt a refuge for a hermit crab.",
      "You must be careful not to step on these, as they are quite pointy.",
      "You try to grab the seashell, but a claw comes out and dissuades you.",
    ]);
  }
}

class S_Waterplants extends SimpleObject {
  constructor(x, y){
    super(x, y, "water/waterplants");
    this.adjust_hitbox(0,0,40,20);
    this.default_text = this.text_interaction([
      "The underwater plants waver with water currents. Their dance is hypnotic.",
      "The algae wave slowly under the water currents. They bathe the scene by a faint fluorescent glow.",
      "The colorful algae seem to beckon you, but you know that if you get too close you might get tangled.",
    ]);
  }
}

class S_PlantSmall extends SimpleObject {
  constructor(x, y){
    super(x, y, "exterior/plant");
    this.adjust_hitbox(0,0,30,10);
    this.default_text = this.text_interaction([
      "You can easily step over this little bush.",
      "It's a simple little green bush.",
      "Just a little bush, like there are so many in these woods.",
    ]);
    this.walkable = true;
  }
}

class S_Shroomgiant extends SimpleObject {
  constructor(x, y){
    super(x, y, "forest/shroomgiant");
    this.adjust_hitbox(40,0,20,20);
    this.default_text = this.text_interaction([
      "This giant mushroom casts a wide shadow over the surroundings.",
      "You watch with apprehension this giant mushroom. If the cap were to fall, it might crush you.",
      "The bright red mushroom cap contrasts with the surrounding greenery. It also looks like you should probably not eat or lick it.",
    ]);
  }
}

class S_Shroomsmall extends SimpleObject {
  constructor(x, y){
    super(x, y, "forest/shroomsmall");
    this.adjust_hitbox(0,0,30,10);
    this.default_text = this.text_interaction([
      "These mushrooms are of a very manageable size, but you lack the knowledge to figure out whether they're nourishing or deadly. Better stay away.",
      "There are countless mushrooms like these everywhere you look, under trees and bushes.",
      "The little mushrooms seem pretty innocuous. Hard to believe they're related to much bigger threats.",
    ]);
    this.walkable = true;
  }
}

class S_Shroomtall extends SimpleObject {
  constructor(x, y){
    super(x, y, "forest/shroomtall");
    this.adjust_hitbox(20,0,20,20);
    this.default_text = this.text_interaction([
      "The trunk of this mushroom extends vertically even higher than the surrounding trees.",
      "This mushroom is much taller than the others.",
      "This mushroom towers over you by several times your size.",
    ]);
  }
}

class S_Planks extends SimpleObject {
  constructor(x, y){
    super(x, y, "water/planks");
    this.adjust_hitbox(10,0,20,10);
    this.default_text = this.text_interaction([
      "These planks are all that remains of a long lost ship. There's definitely traces of the past here.",
      "You wonder where these planks come from, and what else from human civilization made its way there.",
      "The planks are barely recognizable, as the water smoothed the wood to an almost rock-like softness.",
    ]);
  }
}

class S_Pebbles extends SimpleObject {
  constructor(x, y){
    super(x, y, "exterior/pebbles");
    this.adjust_hitbox(10,0,20,15);
    this.visual_element.adjust_depth(this.visual_element.y-this.visual_element.height);
    this.default_text = this.text_interaction([
      "Of course, little rocks are everywhere. You need to be very careful not to trip on them.",
      "Those little rocks are too small to do anything, except making you trip, maybe.",
      "You barely avoid falling as you lose your footing from these little pebbles.",
    ]);
    this.walkable = true;
  }
}

var rocks = [
  "These are rocks, obviously.",
  "Yes, you are surrounded by rocks.",
  "You have to make your way slowly between massive rocks and peaks.",
  "Some of those peaks have edges sharp enough to cut you pretty deep. You try your best to keep your footing without touching them.",
  "You can see the mark of the elements on these rocks. They were there long before you, and will remain there long after...",
  "Rocks!",
  "Rocks, more rocks... Everywhere you look, all you can see...",
];

class S_RocksHuge extends SimpleObject {
  constructor(x, y){
    super(x, y, "mountain/rockshuge");
    this.adjust_hitbox(10,0,130,50);
    this.default_text = this.text_interaction(rocks);
  }
}

class S_Rocks1 extends SimpleObject {
  constructor(x, y){
    super(x, y, "mountain/rocks1");
    this.adjust_hitbox(20,0,50,20);
    this.default_text = this.text_interaction(rocks);
  }
}

class S_Rocks2 extends SimpleObject {
  constructor(x, y){
    super(x, y, "mountain/rocks2");
    this.adjust_hitbox(10,0,40,20);
    this.default_text = this.text_interaction(rocks);
  }
}

class S_Rocks3 extends SimpleObject {
  constructor(x, y){
    super(x, y, "mountain/rocks3");
    this.adjust_hitbox(0,0,40,20);
    this.default_text = this.text_interaction(rocks);
  }
}

class S_Rocks4 extends SimpleObject {
  constructor(x, y){
    super(x, y, "mountain/rocks4");
    this.adjust_hitbox(0,0,30,20);
    this.default_text = this.text_interaction(rocks);
  }
}

class S_Web extends SimpleObject {
  constructor(x, y){
    super(x, y, "ruins/web");
    this.adjust_hitbox(0,0,100,40);
    this.default_text = this.text_interaction([
      "Giant spider webs fall down the ceiling. This place hasn't been visited in a long time...",
      "There's a lot of spider webs and dust, demonstrating how little this place has been used. Some of them coalesce in giant webs coming down the ceiling.",
      "This was either made by one very big spider, or many little ones over a very long period of time...",
    ]);
  }
}

class S_WebLarge extends SimpleObject {
  constructor(x, y){
    super(x, y, "ruins/weblarge");
    this.adjust_hitbox(0,0,190,30);
    this.default_text = this.text_interaction([
      "The back of the room is littered with metallic debris covered by a huge layer of spider web.",
      "The wall is covered by cobwebs, you can barely distinguish it behind.",
      "The metallic wall is hidden behind several layers of spider webs. Nobody has been here in centuries.",
    ]);
  }
}

class S_Bocals extends SimpleObject {
  constructor(x, y){
    super(x, y, "ruins/bocals");
    this.adjust_hitbox(0,0,30,20);
    this.default_text = this.text_interaction([
      "The previous inhabitants of this place supposedly used this to store food, but it was so long ago... The content is now some sort of black goo that you'd rather stay clear of.",
      "This probably used to hold some sort of sustenance, but now it just looks like rot and mold. It's covered in dust and spider webs.",
      "The content of this container have been sealed for centuries. You cannot imagine the smell that might arise if you were to open them.",
    ]);
  }
}

class S_Rubble extends SimpleObject {
  constructor(x, y){
    super(x, y, "ruins/rubble");
    this.adjust_hitbox(0,0,30,10);
    this.default_text = this.text_interaction([
      "A pile of rubble, scraps of stone and wood...",
    ]);
  }
}

class S_RubbleLarge extends SimpleObject {
  constructor(x, y){
    super(x, y, "ruins/rubblelarge");
    this.adjust_hitbox(0,0,60,30);
    this.default_text = this.text_interaction([
      "This messy pile of bricks is all that remains of a former construction...",
    ]);
  }
}
class B_Pebbles extends EventBattleObject {
  constructor(x, y, color, size){
    super(x, y, "exterior/pebbles", color, size);

    this.set_description("There are pebbles on the ground.");
    this.add_interaction("Play", "You flick around a few spherical rocks with $$BestFriend$. The one who pushes the other's pebbles outside of the game area wins. Of course, you win!");
    this.add_interaction("Play", "You flick around a few spherical rocks with $$BestFriend$. The one who pushes the other's pebbles outside of the game area wins. Of course, you lose!");
    this.add_interaction("Eat", "What? Why would you do that? The Goddess formally forbids you from doing something so stupid! There are limits to exploration.");
    this.add_interaction("Throw", "You take a stone and throw it as far as you can. It's always good to remind yourself of your own strength. It's not much, by the way.");
    this.add_interaction("Examine", "You look at the rock very closely. You explain to a puzzle $$BestFriend$ that it is a method to find clues that the Goddess imprinted on you. Though, apparently, it's not working great right now...");
    this.add_interaction("Build", "You try to arrange the rocks to hold each other and form a house. It takes you a long time, as it keeps breaking. In the end, maybe it wasn't worth it.");
    this.add_interaction("Kick", "You kick a rock with your foot and watch it roll a few meters further. This felt like the obvious thing to do, but it accomplished nothing.");
    this.add_interaction("Trip", "You step on the rocks and lose your balance. You fall on your behind, but fortunately there does not seem to be any permanent damage.");
  }
}

class B_Plants extends EventBattleObject {
  constructor(x, y, color, size){
    super(x, y, "exterior/plant", color, size);

    this.set_description("You find yourself near a little green plant.");
    this.add_interaction("Pluck", "You harvest a leaf from the small plant. It's very green, but serves no purpose whatsoever. Did you imagine it would trigger something? Why did you do that?");
    this.add_interaction("Trample", "You jump on the plant and trample it to death, under the inquisitive gaze of $$BestFriend$. You explain that you really couldn't help yourself.");
    this.add_interaction("Taste", "Trusting your instinct, you shove a bit of the leaves in your mouth, before immediately spitting it out. It may not have been poisonous, but it tasted extremely bitter.");
    this.add_interaction("Whistle", "You take a bit of leaf between your fingers and try to live an iconic moment whistling with $$BestFriend$. Fortunately, the Goddess knows better than to let you succeed. You feel a short lived embarrassment at your failure, but the success would probably have given you a much more awkward memory.");
    this.add_interaction("Rub", "You rub the plant on your arm, moved by the vague impression that some leaves are supposed to be medicinal. Nothing much happens.");
    this.add_interaction("Uproot", "You seize the base of the plant and pull with all your strength. It's not easy, but you manage to get it out of the ground. Now what? You ask the Goddess inside you. But there's no answer.");
    this.add_interaction("Water", "You share some of your resources with the plant. It doesn't thank you, but you can feel its gratitude. Or maybe you're imagining it.");
  }
}

class B_Seashell extends EventBattleObject {
  constructor(x, y, color, size){
    super(x, y, "exterior/seashell", color, size);

    this.set_description("There's a seashell on your way.");
    this.add_interaction("Listen", "You bring the seashell to your ear. It is said that you can hear the sea, but since you're already underwater, it changes nothing for you.");
    this.add_interaction("Grind", "You crush the shell with your boot. Soon, it's nothing but a thin powder, barely distinguishable from the sand around. $$BestFriend$ seems disappointed.");
    this.add_interaction("Ornate", "You take the shell and quickly fashion a little necklace from it, that you give to $$BestFriend$. The presents is much appreciated, and the new ornament makes the smile of your best friend smile even brighter.");
    this.add_interaction("Balance", "You try to balance the seashell on your finger. The pressure of the water around you makes it pretty easy. You're not sure why you did it, but it does feel a little nice.");
    this.add_interaction("Admire", "You take a moment to look at the shell. It's pale, but it has reflects from a myriad of hues that change as you move it around. It's quite mesmerizing.");
    this.add_interaction("Gather", "This might be worth something. You pick it up, before noticing it's actually broken in several pieces. No use for it now...");
  }
}


// NO BEST FRIEND!
class B_Skeleton extends EventBattleObject {
  constructor(x, y, color, size){
    super(x, y, "exterior/skeleton", color, size);

    this.set_description("You discover what appears to be a human skeleton.");
    this.add_interaction("Plunder", "You look around for any valuables that might be up for the taking after the demise of their previous owner. Sadly, there doesn't seem to be anything eager to be adopted by your benevolent care.");
    this.add_interaction("Empathize", "You try to imagine the life of whoever these bones used to be. They had a family, friends, desires, hopes... But now this pile of bones is all there is to show for it. It's tragic, but it's the fate that awaits you too, some day.");
    this.add_interaction("Investigate", "You look closely at the bones to try and figure out what you can about the person or the circumstances of their death. Sadly, you're just a child, and not a wise scholar well versed in medicinal studies, so you don't learn anything from this, but it was certainly worth a shot!");
    this.add_interaction("Scramble", "Moved by the Goddess, you mess up the pile of bones. Why would anyone do such a thing? Maybe someone in the far future will find these bones, and imagine they belonged to someone very weirdly shaped?");
    this.add_interaction("Scrutinize", "Looking at the bones, you can clearly see bitemarks. Some scavenger animal came this way and devoured what was left of this pour soul.");
    this.add_interaction("Harmonize", "You forget all respect for the dead and start smashing the bones against each other, producing some different sounds. Pretty soon, you've mastered their tone and you've managed to compose a pleasant rhythmic melody.");
    this.add_interaction("Study", "You look at the different bones and how they fit together, shuddering at the thought that something very similar is present inside of you.");
  }
}
