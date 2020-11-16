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

    child_module(name){
      var child = new Module(name, true);
      this.child_function(function() {child.write_html();});
      return child;
    }
}

class Module extends Import {
  constructor(name, async) {
    super("js/modules/" + name, async);
    IMPORTS.modules[name] = this;
  }
}

class Class extends Import {
  constructor(name, async) {
    super("js/classes/" + name, async);
    IMPORTS.classes[name] = this;
  }
}

class Snippet extends Import {
  constructor(name) {
    super("snippets/" + name, false);
  }
}

const IMPORTS = {
  classes:{},
  modules:{},
}


// All imports
new Module("CONSOLE");
new Module("UTILS/RANDOM");
new Module("UTILS/HTML");
new Module("GRAPHICS/SCREEN");
new Module("MEMORY/RESOURCES");
new Module("MEMORY/DISK");
new Module("MEMORY/SAVE");
new Module("BATTLE/BATTLE");
new Module("BATTLE/BATTLEOBJECTSMANAGER");
new Module("BATTLE/PLAYER_ACTIONS");
new Module("BATTLE/DODGE");


new Module("IO/IO");
IMPORTS.modules['IO/IO'].child_module("IO/IO_DIALOG");
IMPORTS.modules['IO/IO'].child_module("IO/IO_DODGE");
IMPORTS.modules['IO/IO'].child_module("IO/IO_CHARACTER");
IMPORTS.modules['IO/IO'].child_module("IO/IO_MENU");

new Module("LEVEL/CURRENTLEVEL");
new Module("LEVEL/FOG");
new Module("GRAPHICS/PALETTE");
new Module("AUDIO");

new Module("UTILS/MAP");
IMPORTS.modules['UTILS/MAP'].child_module("BATTLE/BATTLETREE");
IMPORTS.modules['UTILS/MAP'].child_module("BAGGAGE/ABILITIES");
IMPORTS.modules['UTILS/MAP'].child_module("BAGGAGE/INVENTORY");
IMPORTS.modules['UTILS/MAP'].child_module("BAGGAGE/STATS");
IMPORTS.modules['UTILS/MAP'].child_module("BAGGAGE/MARTYRDOM");
IMPORTS.modules['UTILS/MAP'].child_module("LEVEL/LEVELSTATES");

IMPORTS.modules['UTILS/MAP'].child_module("UTILS/BUILDER");
IMPORTS.modules['UTILS/BUILDER'].child_module("UTILS/DEBUG");

const LANGUAGE = {};
LANGUAGE.actions = {};
new Module("LANGUAGE/BATTLE");
IMPORTS.modules['BAGGAGE/ABILITIES'].child_module("LANGUAGE/ABILITIES");
IMPORTS.modules['BAGGAGE/INVENTORY'].child_module("LANGUAGE/ITEMS");

new Module("UTILS/STRING");
IMPORTS.modules['UTILS/STRING'].child_class("Generation/Markov");
IMPORTS.classes['Generation/Markov'].child_class("Generation/MarkovModels");
IMPORTS.classes['Generation/MarkovModels'].child_module("MEMORY/DICTIONARY");
new Class("Generation/Generator");
IMPORTS.classes['Generation/Generator'].child_class("Generation/Houses");


new Class("Graphic/Color");
new Class("Graphic/VisualElement");
IMPORTS.classes['Graphic/VisualElement'].child_class("Graphic/Rectangle");
IMPORTS.classes['Graphic/VisualElement'].child_class("Graphic/TextElement");
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
IMPORTS.classes['Objects/EventObject'].child_class("Objects/Library/Events");
IMPORTS.classes['Objects/LevelObject'].child_class("Objects/MovingObject");
IMPORTS.classes['Objects/MovingObject'].child_class("Objects/Library/MovingObjects");
IMPORTS.classes['Objects/MovingObject'].child_module("LEVEL/CHARACTER");
IMPORTS.classes['Objects/LevelObject'].child_class("Objects/BattleObject");
IMPORTS.classes['Objects/BattleObject'].child_class("Objects/Library/Buildings");
IMPORTS.classes['Objects/BattleObject'].child_class("Objects/Library/Interior");
IMPORTS.classes['Objects/BattleObject'].child_class("Objects/Library/Villagers");

new Class("Sequence");

new Module("INTERFACE");

window.onload = function() {
  var init = new Import("startup");
}
