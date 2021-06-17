
class S_Tree extends LevelObject {
  constructor(x, y){
    var visual = new StaticSprite("assets/objects/forest/tree.png", 'obj_light');
    super(visual, x, y);
    this.adjust_hitbox(20,0,20,15);
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

class B_Pebbles extends BattleObject {
  constructor(x, y, color, size){
    super(x, y, "exterior/pebbles", 2, color, size, true);

    this.set_description("There are pebbles on the ground.");
  //  this.add_interaction("Please", "You want to sit in it. But it would be rude. Or would it? You're not even sure...");
    //this.add_interaction("Recall", "You recognize this chair as the work of a local craftsman.");
//    this.add_interaction("Sit", "The Goddess compels you to sit on this chair for a few seconds, and to get up again. That was pointless. But Her ways are mysterious.");
  //  this.add_interaction("Obey", "Obeying the commands of the Goddess, you stare at this perfectly unremarkable chair. It's so unremarkable. You stare at it so much that you start to wonder whether its utterly unremarkableness wouldn't be a special feature in itself. Was that what the Goddess wanted you to understand?");
  // 4-6
  this.add_interaction("", "");
  this.add_interaction("", "");
  this.add_interaction("", "");
  this.add_interaction("", "");
  this.add_interaction("", "");
  }
}

class B_Plants extends BattleObject {
  constructor(x, y, color, size){
    super(x, y, "exterior/plant", 2, color, size, true);

    this.set_description("There are pebbles on the ground.");
  //  this.add_interaction("Please", "You want to sit in it. But it would be rude. Or would it? You're not even sure...");
    //this.add_interaction("Recall", "You recognize this chair as the work of a local craftsman.");
//    this.add_interaction("Sit", "The Goddess compels you to sit on this chair for a few seconds, and to get up again. That was pointless. But Her ways are mysterious.");
  //  this.add_interaction("Obey", "Obeying the commands of the Goddess, you stare at this perfectly unremarkable chair. It's so unremarkable. You stare at it so much that you start to wonder whether its utterly unremarkableness wouldn't be a special feature in itself. Was that what the Goddess wanted you to understand?");
  // 4-6
  this.add_interaction("", "");
  this.add_interaction("", "");
  this.add_interaction("", "");
  this.add_interaction("", "");
  this.add_interaction("", "");
  }
}

class B_Seashell extends BattleObject {
  constructor(x, y, color, size){
    super(x, y, "exterior/seashell", 2, color, size, true);

    this.set_description("There are pebbles on the ground.");
  //  this.add_interaction("Please", "You want to sit in it. But it would be rude. Or would it? You're not even sure...");
    //this.add_interaction("Recall", "You recognize this chair as the work of a local craftsman.");
//    this.add_interaction("Sit", "The Goddess compels you to sit on this chair for a few seconds, and to get up again. That was pointless. But Her ways are mysterious.");
  //  this.add_interaction("Obey", "Obeying the commands of the Goddess, you stare at this perfectly unremarkable chair. It's so unremarkable. You stare at it so much that you start to wonder whether its utterly unremarkableness wouldn't be a special feature in itself. Was that what the Goddess wanted you to understand?");
  this.add_interaction("", "");
  this.add_interaction("", "");
  this.add_interaction("", "");
  this.add_interaction("", "");
  this.add_interaction("", "");
  // 4-6
  }
}

class B_Skeleton extends BattleObject {
  constructor(x, y, color, size){
    super(x, y, "exterior/skeleton", 2, color, size, true);

    this.set_description("There are pebbles on the ground.");
  //  this.add_interaction("Please", "You want to sit in it. But it would be rude. Or would it? You're not even sure...");
    //this.add_interaction("Recall", "You recognize this chair as the work of a local craftsman.");
//    this.add_interaction("Sit", "The Goddess compels you to sit on this chair for a few seconds, and to get up again. That was pointless. But Her ways are mysterious.");
  //  this.add_interaction("Obey", "Obeying the commands of the Goddess, you stare at this perfectly unremarkable chair. It's so unremarkable. You stare at it so much that you start to wonder whether its utterly unremarkableness wouldn't be a special feature in itself. Was that what the Goddess wanted you to understand?");
  // 4-6
  this.add_interaction("", "");
  this.add_interaction("", "");
  this.add_interaction("", "");
  this.add_interaction("", "");
  this.add_interaction("", "");
  }
}
