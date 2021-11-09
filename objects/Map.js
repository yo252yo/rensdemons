// use(Object)
// runtime: Rectangle, StaticSprite

class MapObject extends LevelObject {
  constructor(visual, x, y, label, destination, accessibility_function) {
    super(visual, x, y);

    if (label) {
      this.legend = new TextBoxFitted(x, y+60, label);
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

  is_interactible(x, y) {
    return (
      this.is_at_sprite(x,y) ||
      (this.legend && this.legend.is_at(x,y))
    );
  }

  distance_to_character(){
    if(!this.legend){
      return super.distance_to_character();
    }
    return Math.min(super.distance_to_character(), this.legend.distance_to_character());
  }


  destroy(){
    this.legend.destroy();
    super.destroy();
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

    if(this.legend) this.legend.shift(60);
    this.adjust_hitbox(20,-40,120,110);
    this.specify_sprite_size(150,170);
  }
}

class SM_Trees extends MapObject {
  constructor(x, y, seed, label, destination, accessibility_function){
    var gen = new Generator(seed);
    switch(gen.int(2)){
      case 0:
        var visual = new StaticSprite("assets/objects/map/trees0.png", 'obj_light');
        super(visual, x, y, label, destination, accessibility_function);
        this.adjust_hitbox(20,0,65,80);
        this.specify_sprite_size(100, 100);
        break;

      case 1:
        var visual = new StaticSprite("assets/objects/map/trees1.png", 'obj_light');
        super(visual, x, y, label, destination, accessibility_function);
        this.adjust_hitbox(20,0,55,80);
        this.specify_sprite_size(85, 100);
        break;
    }
    if(!destination){
      this.interaction = this.text_interaction([
        "You find lustrous trees. They offer a pleasant shelter from the weather. You decide to spend a few moments under their protection.",
        "A few trees form an unremarkable grove. There seems to be nothing special about it.",
        "This grove is ideal to take a quick rest in the middle of your journey. The road ahead is still long!",
        "You stop for a while in this little grove. Among the trees, you send a prayer to the Goddess. May She protect you on your journey.",
        "The wind rustling the leaves of the trees lulls you, and you end up taking a well deserved nap in this little vegetal haven.",
      ], seed);
    }
  }
}

class SM_Forest extends MapObject {
  constructor(x, y, label, destination, accessibility_function){
    var visual = new StaticSprite("assets/objects/map/forest.png", 'obj_light');
    super(visual, x, y, label, destination, accessibility_function);
    this.adjust_hitbox(15,0,285,220);
    this.specify_sprite_size(310,245);
    if(this.legend) this.legend.shift(140);
  }
}

class SM_Cave extends MapObject {
  constructor(x, y, label, destination, accessibility_function){
    var visual = new StaticSprite("assets/objects/map/cave.png", 'obj_light');
    super(visual, x, y, label, destination, accessibility_function);
    this.adjust_hitbox(0,-10,50,30);
    this.specify_sprite_size(75,50);
    if(this.legend) this.legend.shift(20,10);
  }
}

class SM_Crevasse extends MapObject {
  constructor(x, y, label, destination, accessibility_function){
    var visual = new StaticSprite("assets/objects/map/crevasse.png", 'obj_light');
    super(visual, x, y, label, destination, accessibility_function);
    this.adjust_hitbox(20,0,155,50);
    this.specify_sprite_size(180,55);
    if(this.legend) this.legend.shift(80);
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
        this.specify_sprite_size(180,80);
        break;

      case 1:
        var visual = new StaticSprite("assets/objects/map/hills1.png", 'obj_light');
        super(visual, x, y, label, destination, accessibility_function);
        this.adjust_hitbox(0,0,200,100);
        this.specify_sprite_size(190,125);
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
      ], seed);
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
        this.adjust_hitbox(0,0,270,150);
        this.specify_sprite_size(280,155);
        if(this.legend) this.legend.shift(130);
        break;

      case 1:
        var visual = new StaticSprite("assets/objects/map/lake1.png", 'obj_light');
        super(visual, x, y, label, destination, accessibility_function);
        this.adjust_hitbox(0,0,190,90);
        this.specify_sprite_size(180,90);
        if(this.legend) this.legend.shift(70);
        break;
    }
    if(!destination){
      this.interaction = this.text_interaction([
        "The sun shimmers on the surface of this great lake. You take advantage of the clear water for a well deserved bath.",
        "The winds in the plains make little ripples on the surface of the lake. You remain for a while mesmerized by their dancing patterns.",
        "You find a freshwater lake. It's time to refill your water supplies, and to wash whatever may need it!",
      ], seed);
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
        this.adjust_hitbox(10,0,140,90);
        this.specify_sprite_size(165,130);
        if(this.legend) this.legend.shift(70);
        break;

      case 1:
        var visual = new StaticSprite("assets/objects/map/mountain1.png", 'obj_light');
        super(visual, x, y, label, destination, accessibility_function);
        this.adjust_hitbox(20,-5,240,120);
        this.specify_sprite_size(260,155);
        if(this.legend) this.legend.shift(110);
        break;
    }
    if(!destination){
      this.interaction = this.text_interaction([
        "The tall peaks seem to puncture the skies.",
        "These mountains are way too tall to climb. You can see snow on their tops. You wonder if it's everlasting...",
        "Crossing these mountains would take a long time, and a lot of effort. Better to avoid it.",
      ], seed);
    }
  }
}


class SM_Vulcano extends MapObject {
  constructor(x, y, label, destination, accessibility_function){
    var visual = new StaticSprite("assets/objects/map/vulcano.png", 'obj_light');
    super(visual, x, y, label, destination, accessibility_function);
    this.adjust_hitbox(30,-10,270,200);
    this.specify_sprite_size(315,266);
    if(this.legend) this.legend.shift(150);

    if(!destination){
      this.interaction = this.text_interaction([
        "A big vulcano blocks your path."
      ]);
    }
  }
}

class SM_Pandemonium extends MapObject {
  constructor(x, y){
    var visual = new StaticSprite("assets/objects/hellmap/pandemonium.png", 'obj_light');
    super(visual, x, y, `Pandemonium`, "051_pandemonium@0");
    this.adjust_hitbox(40,-10,235,200);
    this.specify_sprite_size(300,251);
    if(this.legend) this.legend.shift(140);
  }
}


class SM_Heaven extends MapObject {
  constructor(x, y){
    var visual = new StaticSprite("assets/objects/hellmap/heaven.png", 'obj_light');
    super(visual, x, y, `Heaven`, "060_heaven");
    this.adjust_hitbox(40,-10,235,200);
    this.specify_sprite_size(300,215);
    if(this.legend) this.legend.shift(150);
    this.make_walkable();
  }

  destroy(stillborn) {
    if (this.visual_element){
      this.visual_element.destroy();
    }
    this.legend.destroy();
  //  CURRENTLEVEL.objects.remove_object(this, stillborn);
    delete this;
  }
}

class SM_HellVulcano extends MapObject {
  constructor(x, y){
    var visual = new StaticSprite("assets/objects/hellmap/hellvulcano.png", 'obj_light');
    super(visual, x, y, `Maw of Hell`, "041_hellsmaw@14");
    this.adjust_hitbox(30,-10,270,200);
    this.specify_sprite_size(315,266);
    if(this.legend) this.legend.shift(150);
  }
}

class SM_Altar extends MapObject {
  constructor(x, y, type){
    var visual = new StaticSprite("assets/objects/hellmap/altar.png", 'obj_light');
    super(visual, x, y, `Altar of<br />${type}`, `$altar_${type}_${x}${y}`);
    this.adjust_hitbox(20,-10,40,50);
    this.specify_sprite_size(67,100);
    if(this.legend) this.legend.shift(20);
  }
}


class SM_Worm extends MapObject {
  constructor(x, y, seed, label){
    var gen = new Generator(seed);
    switch(gen.int(2)){
      case 0:
        var visual = new StaticSprite("assets/objects/hellmap/creep1.png", 'obj_light');
        super(visual, x, y, label);
        this.adjust_hitbox(10,-5,40,25);
        this.specify_sprite_size(47,44);
        break;

      case 1:
        var visual = new StaticSprite("assets/objects/hellmap/creep2.png", 'obj_light');
        super(visual, x, y, label);
        this.adjust_hitbox(10,-5,50,25);
        this.specify_sprite_size(53,50);
        break;
    }

    this.interaction = this.text_interaction([
      "You find the giant carcass of what seems to be a worm. You shiver at the thought that others may be nearby...",
      "A multitude of smaller insects are devouring what remains of this huge beast.",
      "You don't dare come close to the colossal worm, but after careful observation it seems that it is just an empty moult.",
      "This other world is filled with the rotting corpses of bugs that are more massive than you. You can't help but wonder if other creatures killed them as easily as you do flies in your world...",
      "There's many such maggots in your field of view. They seem to be digging numerous tunnels in the arid land.",
      "This grub wiggles in agony. It might be desiccating.",
    ], seed);
  }
}

class SM_Fang extends MapObject {
  constructor(x, y, seed, label, destination, accessibility_function){
    var gen = new Generator(seed);
    switch(gen.int(2)){
      case 0:
        var visual = new StaticSprite("assets/objects/hellmap/fang1.png", 'obj_light');
        super(visual, x, y, label);
        this.adjust_hitbox(15,0,30,30);
        this.specify_sprite_size(51,114);
        break;

      case 1:
        var visual = new StaticSprite("assets/objects/hellmap/fang2.png", 'obj_light');
        super(visual, x, y, label);
        this.adjust_hitbox(10,0,20,30);
        this.specify_sprite_size(46,114);
        break;
    }

    this.interaction = this.text_interaction([
      "A giant tusk towers over you.",
      "The creature this fang came from must have been the size of a castle...",
      "How did this giant tooth end up here? Is it all that's left of a long decomposed corpse? Or has it been planted by a demon, as a marker perhaps?",
      "Looking closely at this tusk, you find rough markings carved in the ivory, but you cannot make sense of the demonic script.",
      "This fang is browned by what is probably coagulated blood. Insects crawl on its surface.",
    ], seed);
  }
}

class SM_Tenta extends MapObject {
  constructor(x, y, seed, label, destination, accessibility_function){
    var gen = new Generator(seed);
    switch(gen.int(2)){
      case 0:
        var visual = new StaticSprite("assets/objects/hellmap/helltenta1.png", 'obj_light');
        super(visual, x, y, label);
        this.adjust_hitbox(5,0,40,30);
        this.specify_sprite_size(43,80);
        break;

      case 1:
        var visual = new StaticSprite("assets/objects/hellmap/helltenta2.png", 'obj_light');
        super(visual, x, y, label);
        this.adjust_hitbox(10,0,40,40);
        this.specify_sprite_size(57,175);
        break;
    }

    this.interaction = this.text_interaction([
      "You cannot tell if this tentacular shape is animal or vegetal... Or perhaps even mineral? After observing it for a while, it appears safe to approach.",
      "You take advantage of this massive protuberance to shield yourself from the heat and rest a bit in its shade. But you cannot relax for long.",
      "This kind of tentacular being seems to be as common as trees in your world. Its texture reminds you of raw flesh, and it emits a smell that remind you of uncooked food.",
      "You watch in time as a swarm of flies approaches the strange plant and gets sucked in its gelatinous membrane.",
      "Giant arabesques of shade dance on the ground as the massive otherworldly trunk unfurls its slimy arms.",
    ], seed);
  }
}
