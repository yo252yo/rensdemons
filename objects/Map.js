// use(Object)
// runtime: Rectangle, StaticSprite

class MapObject extends LevelObject {
  constructor(visual, x, y, label, destination, accessibility_function) {
    super(visual, x, y);

    if (label) {
      this.legend = new TextBoxFitted(x, y+40, label);
      this.legend.adjust_depth(y-200);
      this.legend.set_opacity(0.6);
    }

    this.destination = destination;
    this.accessibility_function = accessibility_function;
  }

  interaction() {
    if(this.accessibility_function && !this.accessibility_function()){
      new TextBanner("As you approach your destination, the Goddess strongly impresses in your mind that you are not prepared for what is to come. In Her infinite wisdom, She knows that this is not where are meant to be for now.");
    } else if(this.destination) {
      CURRENTLEVEL.setup(this.destination);
    }
  }
}


class SM_Town extends MapObject {
  constructor(x, y, destination, code, accessibility_function){
    var visual = new StaticSprite("assets/objects/map/town.png", 'obj_light');

    var subtitle = "";
    switch(code){
      case "town_1":
        subtitle = "<br />City of Hope";
        break;
      case "town_2":
        subtitle = "<br />City of Fear";
        break;
      case "town_3":
        subtitle = "<br />City of Denial";
        break;
      case "town_4":
        subtitle = "<br />City of Indulgence";
        break;
      case "town_5":
        subtitle = "<br />City of Acceptance";
        break;
    }
    var label = DICTIONARY.get(code).toUpperCase() + subtitle;

    super(visual, x, y, label, destination, accessibility_function);

    if(this.legend) this.legend.shift(80);
    this.adjust_hitbox(50,-35,120,130);
  }
}

class SM_Trees extends MapObject {
  constructor(x, y, seed, label, destination, accessibility_function){
    var gen = new Generator(seed);
    switch(gen.int(2)){
      case 0:
        var visual = new StaticSprite("assets/objects/map/trees0.png", 'obj_light');
        super(visual, x, y, label, destination, accessibility_function);
        this.adjust_hitbox(30,0,65,80);
        break;

      case 1:
        var visual = new StaticSprite("assets/objects/map/trees1.png", 'obj_light');
        super(visual, x, y, label, destination, accessibility_function);
        this.adjust_hitbox(30,0,55,80);
        break;
    }
    if(!destination){
      this.interaction = this.text_interaction([
        "You find lustrous trees. They offer a pleasant shelter from the weather. You decide to spend a few moments under their protection.",
        "A few trees form an unremarkable grove. There seems to be nothing special about it.",
        "This grove is ideal to take a quick rest in the middle of your journey. The road ahead is still long!",
        "You stop for a while in this little grove. Among the trees, you send a prayer to the Goddess. May She protect you on your journey.",
        "The wind rustling the leaves of the trees lulls you, and you end up taking a well deserved nap in this little vegetal haven.",
      ], gen);
    }
  }
}

class SM_Forest extends MapObject {
  constructor(x, y, label, destination, accessibility_function){
    var visual = new StaticSprite("assets/objects/map/forest.png", 'obj_light');
    super(visual, x, y, label, destination, accessibility_function);
    this.adjust_hitbox(30,-10,285,220);
    if(this.legend) this.legend.shift(150);
  }
}

class SM_Cave extends MapObject {
  constructor(x, y, label, destination, accessibility_function){
    var visual = new StaticSprite("assets/objects/map/cave.png", 'obj_light');
    super(visual, x, y, label, destination, accessibility_function);
    this.adjust_hitbox(30,-10,50,30);
    if(this.legend) this.legend.shift(20,10);
  }
}

class SM_Crevasse extends MapObject {
  constructor(x, y, label, destination, accessibility_function){
    var visual = new StaticSprite("assets/objects/map/crevasse.png", 'obj_light');
    super(visual, x, y, label, destination, accessibility_function);
    this.adjust_hitbox(30,-10,155,50);
    if(this.legend) this.legend.shift(80);
  }
}

class SM_Vulcano extends MapObject {
  constructor(x, y, label, destination, accessibility_function){
    var visual = new StaticSprite("assets/objects/map/vulcano.png", 'obj_light');
    super(visual, x, y, label, destination, accessibility_function);
    this.adjust_hitbox(30,-10,270,200);
    if(this.legend) this.legend.shift(150);

    if(!destination){
      this.interaction = this.text_interaction([
        "A big forest blocks your path."
      ], gen);
    }
  }
}

class SM_Hills extends MapObject {
  constructor(x, y, seed, label, destination, accessibility_function){
    var gen = new Generator(seed);
    switch(gen.int(2)){
      case 0:
        var visual = new StaticSprite("assets/objects/map/hills0.png", 'obj_light');
        super(visual, x, y, label, destination, accessibility_function);
        this.adjust_hitbox(0,0,200,100);
        break;

      case 1:
        var visual = new StaticSprite("assets/objects/map/hills1.png", 'obj_light');
        super(visual, x, y, label, destination, accessibility_function);
        this.adjust_hitbox(0,0,200,100);
        break;
    }
//    visual.adjust_depth(1); // this is buggy
    this.visual_element.adjust_depth(this.visual_element.y-this.visual_element.height);
    this.make_walkable();
    if(!destination){
      this.interaction = this.text_interaction([
        "This hill region takes quite a toll on your stamina. Maybe it would have been easier to walk around...",
        "From the top of this small hill, you get a much better view of the surroundings. The world sees much bigger than you ever thought it would be.",
        "The hills block the horizon and make it hard to see what's behind.",
        "A few hills break the monotony of the flat fields.",
      ], gen);
    }
  }
}

class SM_Lake extends MapObject {
  constructor(x, y, seed, label, destination, accessibility_function){
    var gen = new Generator(seed);
    switch(gen.int(2)){
      case 0:
        var visual = new StaticSprite("assets/objects/map/lake0.png", 'obj_light');
        super(visual, x, y, label, destination, accessibility_function);
        this.adjust_hitbox(0,0,280,150);
        if(this.legend) this.legend.shift(140);
        break;

      case 1:
        var visual = new StaticSprite("assets/objects/map/lake1.png", 'obj_light');
        super(visual, x, y, label, destination, accessibility_function);
        this.adjust_hitbox(0,0,200,100);
        if(this.legend) this.legend.shift(100);
        break;
    }
    if(!destination){
      this.interaction = this.text_interaction([
        "The sun shimmers on the surface of this great lake. You take advantage of the clear water for a well deserved bath.",
        "The winds in the plains make little ripples on the surface of the lake. You remain for a while mesmerized by their dancing patterns.",
        "You find a freshwater lake. It's time to refill your water supplies, and to wash whatever may need it!",
      ], gen);
    }
  }
}

class SM_Mountain extends MapObject {
  constructor(x, y, seed, label, destination, accessibility_function){
    var gen = new Generator(seed);
    switch(gen.int(2)){
      case 0:
        var visual = new StaticSprite("assets/objects/map/mountain0.png", 'obj_light');
        super(visual, x, y, label, destination, accessibility_function);
        this.adjust_hitbox(20,0,170,110);
        if(this.legend) this.legend.shift(100);
        break;

      case 1:
        var visual = new StaticSprite("assets/objects/map/mountain1.png", 'obj_light');
        super(visual, x, y, label, destination, accessibility_function);
        this.adjust_hitbox(20,0,270,140);
        if(this.legend) this.legend.shift(150);
        break;
    }
    if(!destination){
      this.interaction = this.text_interaction([
        "The tall peaks seem to puncture the skies.",
        "These mountains are way too tall to climb. You can see snow on their tops. You wonder if it's everlasting...",
        "Crossing these mountains would take a long time, and a lot of effort. Better to avoid it.",
      ], gen);
    }
  }
}
