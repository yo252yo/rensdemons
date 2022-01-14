class Import {
    constructor(src, async) {
      this.src = src;
      this.loaded = false;
      this.atload = [];
      if (! async){
        this.write_html();
      }
    }

    write_html(){
      // We dont actually load things that end in _
      if(this.src[this.src.length - 1] == "_"){
        return;
      }
      this.html = document.createElement("script");
      this.html.type = "text/javascript";
      this.html.src = this.src + ".js";
      this.html.id = "SC_" + this.src;

      var self = this;
      this.html.addEventListener('load', function(){ self.onloaded() });

      var ref = document.getElementsByTagName( 'script' )[ 0 ];
      ref.parentNode.insertBefore(this.html, null);
    }

    onloaded() {
       this.loaded = true;

       if (typeof CONSOLE !== 'undefined') {
         CONSOLE.log.import(this.src);
       } else{
         console.log(">> Loaded " + this.src);
       }
       for (var i in this.atload){
         this.atload[i]();
       }
     }

    child_function(f) {
      if (this.loaded){
        f();
      }
      else {
        this.atload.push(f);
      }
    }

    child_import(name){
      var child = new Import(name, true);
      this.child_function(function() {child.write_html();});
      return child;
    }

    child_class(name){
      var child = new Class(name, true);
      this.child_function(function() {child.write_html();});
      return child;
    }

    child_library(name){
      return this.child_class("../../objects/" + name);
    }

    child_module(name){
      var child = new Module(name, true);
      this.child_function(function() {child.write_html();});
      return child;
    }
}

class Module extends Import {
  constructor(name, async) {
    super("engine/modules/" + name, async);
    IMPORTS.modules[name] = this;
  }
}

class Class extends Import {
  constructor(name, async) {
    super("engine/classes/" + name, async);
    IMPORTS.classes[name] = this;
  }
}

class Snippet extends Import {
  constructor(name) {
    super(name, false);
  }
}

const IMPORTS = {
  classes:{},
  modules:{},

  file_exists(name, f_yes, f_no){
    var o = document.createElement('object');
    o.data = name;
    o.style.visibility = "hidden";
    o.addEventListener('error', function(){ if(f_no){ f_no(); } });
    o.addEventListener('load', function(){ if(f_yes){ f_yes(); } });
    document.body.appendChild(o);
  },
}


// All imports
new Module("CONSOLE");
new Module("UTILS/RANDOM");
new Module("UTILS/HTML");
new Module("GRAPHICS/SCREEN");
  IMPORTS.modules['GRAPHICS/SCREEN'].child_module("LEVEL/FOG");

new Module("MEMORY/RESOURCES");
new Module("MEMORY/DISK");
new Module("MEMORY/SAVE");
new Module("BATTLE/BATTLE");
new Module("BATTLE/SPECIALBATTLES");
new Module("BATTLE/BATTLEOBJECTSMANAGER");
new Module("BATTLE/PLAYER_ACTIONS");



new Module("LEVEL/CURRENTLEVEL");
new Module("LEVEL/GENERATEDLEVELS");
new Module("GRAPHICS/PALETTE");

new Module("MEMORY/SETTINGS");
IMPORTS.modules['MEMORY/SETTINGS'].child_module("BATTLE/DODGE");
IMPORTS.modules['MEMORY/SETTINGS'].child_module("AUDIO");

new Module("UTILS/MAP");
  IMPORTS.modules['UTILS/MAP'].child_module("BATTLE/BATTLETREE");
  IMPORTS.modules['UTILS/MAP'].child_module("BAGGAGE/ABILITIES");
  IMPORTS.modules['UTILS/MAP'].child_module("BAGGAGE/INVENTORY");
  IMPORTS.modules['UTILS/MAP'].child_module("BAGGAGE/STATS");
  IMPORTS.modules['UTILS/MAP'].child_module("BAGGAGE/MARTYRDOM");
  IMPORTS.modules['UTILS/MAP'].child_module("BAGGAGE/LEDGER");
  IMPORTS.modules['UTILS/MAP'].child_module("LEVEL/LEVELSTATES");
new Module("BAGGAGE/ARCHETYPES");

  IMPORTS.modules['UTILS/MAP'].child_module("UTILS/BUILDER");
    IMPORTS.modules['UTILS/BUILDER'].child_module("UTILS/DEBUG");
      IMPORTS.modules['UTILS/DEBUG'].child_module("IO/IO");
        IMPORTS.modules['IO/IO'].child_module("IO/IO_DIALOG");
        IMPORTS.modules['IO/IO'].child_module("IO/IO_DODGE");
        IMPORTS.modules['IO/IO'].child_module("IO/IO_CHARACTER");
        IMPORTS.modules['IO/IO'].child_module("IO/IO_MENU");

const LANGUAGE = {};
  LANGUAGE.actions = {};
new Module("LANGUAGE/BATTLE");
  IMPORTS.modules['BAGGAGE/ABILITIES'].child_module("LANGUAGE/ABILITIES");
  IMPORTS.modules['BAGGAGE/INVENTORY'].child_module("LANGUAGE/ITEMS");
  IMPORTS.modules['BAGGAGE/INVENTORY'].child_module("BAGGAGE/SHOP");
  IMPORTS.modules['BAGGAGE/INVENTORY'].child_module("BAGGAGE/TRAINER");
new Module("LANGUAGE/BESTIARY");

new Module("BAGGAGE/PARTY");
  IMPORTS.modules['BAGGAGE/PARTY'].child_module("LANGUAGE/PARTY");
  IMPORTS.modules['BAGGAGE/PARTY'].child_module("UTILS/STRING");
    IMPORTS.modules['UTILS/STRING'].child_class("Generation/Markov");
      IMPORTS.classes['Generation/Markov'].child_class("Generation/MarkovModels");
        IMPORTS.classes['Generation/MarkovModels'].child_module("MEMORY/DICTIONARY");
      IMPORTS.modules['UTILS/STRING'].child_class("Generation/Generator");
        IMPORTS.classes['Generation/Generator'].child_class("Generation/HouseGenerator");
        IMPORTS.classes['Generation/Generator'].child_class("Generation/StoreGenerator");
new Class("Generation/Filler");
new Class("Generation/Datasets");


new Class("Graphic/Color");
new Class("Graphic/VisualElement");
  IMPORTS.classes['Graphic/VisualElement'].child_class("Graphic/Rectangle");
  IMPORTS.classes['Graphic/VisualElement'].child_class("Graphic/LayeredImage");
  IMPORTS.classes['Graphic/VisualElement'].child_class("Graphic/TextElement");
    IMPORTS.classes['Graphic/TextElement'].child_class("Graphic/SpeakerIcon");
    IMPORTS.classes['Graphic/TextElement'].child_class("Graphic/TextBox");
      IMPORTS.classes['Graphic/TextBox'].child_class("Graphic/TextBanner");
      IMPORTS.classes['Graphic/TextBox'].child_class("Graphic/MenuScreen");
    IMPORTS.classes['Graphic/TextElement'].child_class("Graphic/TextMenu");
      IMPORTS.classes['Graphic/TextMenu'].child_class("Graphic/TextMenuImplementations");
  IMPORTS.classes['Graphic/VisualElement'].child_class("Graphic/CanvasElement");
    IMPORTS.classes['Graphic/CanvasElement'].child_class("Graphic/MovingSprite");
    IMPORTS.classes['Graphic/CanvasElement'].child_class("Graphic/StaticSprite");
      IMPORTS.classes['Graphic/StaticSprite'].child_class("Graphic/CenteredImage");

new Class("Objects/LevelObject");
  IMPORTS.classes['Objects/LevelObject'].child_class("Objects/EventObject");
    IMPORTS.classes['Objects/EventObject'].child_library("Events");
  IMPORTS.classes['Objects/LevelObject'].child_class("Objects/MovingObject");
    IMPORTS.classes['Objects/MovingObject'].child_module("LEVEL/CHARACTER");
    IMPORTS.classes['Objects/MovingObject'].child_class("Objects/ConsciousObject");
      IMPORTS.classes['Objects/ConsciousObject'].child_library("MovingObjectsTemplates");
      IMPORTS.classes['Objects/ConsciousObject'].child_class("Objects/BattleObject");
        IMPORTS.classes['Objects/BattleObject'].child_library("Buildings");
        IMPORTS.classes['Objects/BattleObject'].child_library("Bosses");
        IMPORTS.classes['Objects/BattleObject'].child_library("Dungeons");
        IMPORTS.classes['Objects/BattleObject'].child_library("Specials");
        IMPORTS.classes['Objects/BattleObject'].child_library("Interior");
        IMPORTS.classes['Objects/BattleObject'].child_library("EventBattles");
        IMPORTS.classes['Objects/BattleObject'].child_library("Map");
        IMPORTS.classes['Objects/BattleObject'].child_library("Villagers");

new Class("Sequence");

new Module("CREDITS");
new Module("INTERFACE");

window.onload = function() {
  var init = new Import("startup");
}
