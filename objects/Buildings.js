// use(Object)
// runtime: Rectangle, StaticSprite


const CITIES = {
  hope: "hope",
  fear: "fear",
  mourning: "mourning",
  indulgence: "indulgence",
  denial: "denial",
  acceptance: "acceptance",
}


class S_Floor extends LevelObject {
  constructor(x, y, w, h, color, texture){
    if (!color){
      color = 'background';
    }
    var visual = new Rectangle(x,y,w,h, color, texture);
    super(visual, x, y);
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.adjust_hitbox(10,0,w- 20,h-10);
    this.make_walkable(true);
    this.visual_element.adjust_depth(-1);
  }

  draw_hitbox(even_floors){
    if(even_floors){
      super.draw_hitbox();
    }
  }

  get_depth() {
    return -1;
  }
}

class S_WoodFloor extends S_Floor {
  constructor(x, y, w, h) {
    super(x, y, w, h, undefined, "assets/patterns/wood.png");
  }
}

class S_SandFloor extends S_Floor {
  constructor(x, y, w, h) {
    super(x, y, w, h, undefined, "assets/patterns/sand.png");
  }
}

class S_LushFloor extends S_Floor {
  constructor(x, y, w, h) {
    super(x, y, w, h, undefined, "assets/patterns/lush.png");
  }
}

class S_MapFloor extends S_Floor {
  constructor(x, y, w, h, color) {
    super(x, y, w, h, color, "assets/patterns/map.png");
  }
}

class S_MudFloor extends S_Floor {
  constructor(x, y, w, h) {
    super(x, y, w, h, undefined, "assets/patterns/mud.png");
  }
}

class S_CloudFloor extends S_Floor {
  constructor(x, y, w, h) {
    super(x, y, w, h, undefined, "assets/patterns/clouds.png");
  }
}

class S_GooFloor extends S_Floor {
  constructor(x, y, w, h) {
    super(x, y, w, h, undefined, "assets/patterns/goo.png");
  }
}

class S_WebFloor extends S_Floor {
  constructor(x, y, w, h) {
    super(x, y, w, h, undefined, "assets/patterns/web.png");
  }
}

class S_RockFloor extends S_Floor {
  constructor(x, y, w, h) {
    super(x, y, w, h, undefined, "assets/patterns/rock.png");
  }
}

class S_LavaFloor extends S_Floor {
  constructor(x, y, w, h) {
    super(x, y, w, h, undefined, "assets/patterns/lava.png");
  }
}

class S_TilingFloor extends S_Floor {
  constructor(x, y, w, h) {
    super(x, y, w, h, undefined, "assets/patterns/tiling.png");
  }
}

class S_CastleFloor extends S_Floor {
  constructor(x, y, w, h) {
    super(x, y, w, h, undefined, "assets/patterns/castle.png");
  }
}

class S_AntiFloor extends S_Floor {
  constructor(x, y, w, h, interactible, color) {
    super(x, y, w, h, color || "void", undefined);
    this.walkable = false;
    if (interactible){
      this.interaction = function() {};
    }
  }
}

class S_SeaFloor extends S_Floor {
  constructor(x, y, w, h) {
    super(x, y, w, h, 'obj_dark', "assets/patterns/sea.png");
    this.walkable = false;
  }
}

class S_ExitFloor extends S_Floor {
  constructor(x, y, w, h, outside, force_new_position) {
    super(x, y, w, h, 'obj_dark', "assets/patterns/exit.png");

    if (outside){
      this.interaction = function() {
        CURRENTLEVEL.setup(outside, force_new_position);
      }
    }
  }

  is_interactible(x,y) {
    var margin = 10;
    if (x >= this.x - margin && x <= this.x + this.w + margin) {
      if (y >= this.y - this.h - margin && y <= this.y + margin) {
        return true;
      }
    }
    return false;
  }

  initialize_with_character() {
    CURRENTLEVEL.initialize_with_character(this.x+this.w/2, this.y-this.h/2);
  }
}

class S_TownFloor extends S_Floor {
  constructor(x, y, w, h, outside, pattern) {
    if (!pattern){
      pattern = "assets/patterns/town.png";
    }
    super(x, y, w, h, undefined, pattern);

    var exit = 40;

    this.left_border = new S_ExitFloor(x-exit, y-h/2+h/8, exit+10, 2*h/8, outside);
    this.right_border = new S_ExitFloor(x+w-10, y-h/2+h/8, exit+10, 2*h/8, outside);
    this.top_border = new S_ExitFloor(x+w/2-w/8, y-h+10, 2*w/8, exit+10, outside);
    this.bot_border = new S_ExitFloor(x+w/2-w/8, y+exit, 2*w/8, exit+10, outside);
  }

  get_exit(){
    return this.bot_border;
  }
}

class S_BorderedMapFloor extends S_MapFloor {
  constructor(x, y, w, h, color) {
    super(x, y, w, h, color);

    var border = 50;
    this.left_border = new S_AntiFloor(x-border, y, border, h, true, color);
    this.right_border = new S_AntiFloor(x+w, y, border, h, true, color);
    this.top_border = new S_AntiFloor(x, y-h, w, border, true, color);
    this.bot_border = new S_AntiFloor(x, y+border, w, border, true, color);

    var i = function() {
      new TextBannerRandom([
        "The world seems to stop abruptly. You cannot advance further.",
        "You keep walking in the same direction, but the air blocks your motion in an unshakeable resistance, as if an invisible wall was blocking your way.",
        "You cannot progress in that direction. An invisible force blocks all movement.",
        "You expected the world to have the shape of a torus as a matter of fact, but it appears that it has well defined borders that you cannot cross. You'll never be able to figure out its true spatial configuration.",
        "You have reached the end of the world. There is nothing but void behind this point.",
        "The ground you're stepping on stops sharp. In front of you expands an infinite abyss of void. You're extremely curious to look down after this cliff, to see the layers of ground below your feet, but it appears that it's impossible to advance your head further than the ground.",
        "The universe appears to stop there. Nothing but nothingness expands in front of your eyes. When you throw a rock towards this abyss, it bounces back at you.",
        "It's like a wall, but invisible.",
      ]);
    }

    this.left_border.interaction = i;
    this.right_border.interaction = i;
    this.top_border.interaction = i;
    this.bot_border.interaction = i;

  }
}



class S_LayeredBuilding extends LevelObject {
  constructor(name, x, y, w, h, description){
    var visual = new StaticSprite("assets/objects/buildings/" + name + "_base.png", 'obj_light');
    visual.specify_sprite_size(w, h);
    super(visual, x, y);
    this.layers = [];
    this.describe = this.text_interaction([description]);
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.name = name;
  }

  add_layer(modifier) {
    var visual = new StaticSprite("assets/objects/buildings/" + this.name + "_" + modifier +".png", 'obj_dark');
    visual.specify_sprite_size(this.w, this.h);
    var object = new LevelObject(visual, this.x, this.y+(0.1 * this.layers.length));
    this.layers.push(object);
  }

  add_door(from, to, enter_function) {
    this.enter_function = enter_function;
    var self = this;
    this.character_can_enter = function() {
      var dx = (CHARACTER.get().x + 15 - self.x);
      var dy = (CHARACTER.get().y - self.y);
      return (dx > from && dx < to && dy > 0);
    }
  }

  interaction(){
    if (this.character_can_enter() && this.enter_function){
      this.enter_function();
    } else if (this.describe) {
      this.describe();
    }
  }

  destroy() {
    for(var layer of this.layers) {
      layer.destroy();
    }
    super.destroy();
  }
}

class S_House extends S_LayeredBuilding {
  constructor(type, x, y, seed) {
    switch(type){
      case CITIES.fear:
        var description = "This house looks fierce and unwelcoming. The spikes coming out of the roof and walls speak volumes about its hostility. You cannot even peek through the thin slits that serve as windows.";
        break;
      case CITIES.hope:
        var description = "A welcoming house covered with flowers and plants. Their fruity aroma puts you in a good mood. The door is half open, inviting you in.";
        break;
      case CITIES.indulgence:
        var description = "This house has no door or window, only open holes from which escapes loud conversation, occasional music and sometimes more adult noises. You hear the clinging of bottles, and people vehemently pressuring you to come in.";
        break;
      case CITIES.acceptance:
        var description = "This house shows its wear. It has not been maintained in a while. Stones are covered in moss, some of them are missing.";
        break;
      case CITIES.denial:
        var description = "A very normal looking house. Nothing unusual about it. Absolutely nothing stands out as suspicious. It is as normal as a house can ever be. The shutters are closed.";
        break;
    }
    super("house", x, y, 120, 157, description);
    this.add_layer(type);
    this.add_layer(type + "_windows");
    this.add_door(40, 80, function(){
      GENERATEDLEVELS.house.setup(type, seed);
    });
    this.adjust_hitbox(0,0,120,90);
  }
}

class S_Store extends S_LayeredBuilding {
  constructor(city, type, threshold, x, y, seed) {
    super("house", x, y, 120, 157,
      `This place specializes in the way of the ${type}. You wonder what you could learn or purchase inside...`
    );
    this.add_layer("store");
    this.add_layer(city);
    this.add_door(40, 80, function(){
      GENERATEDLEVELS.store.setup(type, threshold, seed);
    });
    this.adjust_hitbox(0,0,120,90);
  }
}

class S_Church extends S_LayeredBuilding {
  constructor(x, y, inside_lvl){
    super("church", x, y, 166, 347, "...");
    this.add_layer("details");

    if(inside_lvl != "004_trial_end" || STATS.is_post_game()){
      new M_Herald(x+80, y-175);
    }

    if(inside_lvl){
      this.add_door(50, 115, function(){
        CURRENTLEVEL.setup(inside_lvl);
      });
    }
    this.adjust_hitbox(0,0,165,200);
    this.describe = function() {

      var dx = (CHARACTER.get().x + 15 - this.x);
      var dy = (CHARACTER.get().y - this.y);
      if ((dx < 40 || dx > 125) && (dy > -100 || dy < -225)) {
        var t = [RANDOM.pick([
          "It appears to be still the temple. The building shape might be a cross, but its boundaries are clearly a simple rectangle.",
          "Common sense may tell you that the temple looks like a cross, but in truth it seems that you can interact with a full rectangle around it.",
          "The temple seems surrounded by a rectangle box that responds as the temple if you hit it."
        ])];
      } else {
        var t = ["In every city, the temple is a beacon welcoming both devout villagers and wandering pilgrims."];
      }
      var churchtext = this.text_interaction(t);
      churchtext();
    }
  }
}

class S_Castle extends S_LayeredBuilding {
  constructor(x, y){
    super("castle", x, y, 485, 432,
      "The royal castle towers over the city with its massive dark silhouette."
    );
    this.add_layer("details");
    this.add_door(200, 280, function(){
      CURRENTLEVEL.setup("026_castle");
    });
    this.adjust_hitbox(10,0,460,300);
  }
}

class S_Casern extends S_LayeredBuilding {
  constructor(x, y){
    super("casern", x, y, 250, 200,
      "This massive building looks like it has seen better days. It seems to be some sort of military facility",
    );
    this.add_layer("details");
    this.add_door(110, 140, function(){
      CURRENTLEVEL.setup("028_casern");
    });
    this.adjust_hitbox(0,0,250,100);
  }
}

class S_Manor extends S_LayeredBuilding {
  constructor(x, y){
    super("manor", x, y, 300, 240,
      "This villa is bigger and more sumptuous than the others.",
    );
    this.add_layer("details");

    this.add_door(130, 170, function(){
      if(INVENTORY.count("_followedBySnobRich") != 0){
        CURRENTLEVEL.setup("027_manor");
      } else{
        TextBannerSequence.make(["You feel intimidated by the oppressive manor and do not dare enter."]);
      }
    });

    this.adjust_hitbox(10,0,275,120);
  }
}





class S_Placeholder extends LevelObject {
  constructor(x, y, w, h){
    var visual = new Rectangle(x,y,w,h, 'white');
    super(visual, x, y);
    this.adjust_hitbox(x, y, w, h);
    this.walkable = false;
  }

  interaction(){
    this.walkable = false;
    // a non  null function to make sure this is interactible
  }
}
