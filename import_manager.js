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

const IMPORTS = {
  classes:{},
  modules:{},
}


// All imports
new Module("CONSOLE");
new Module("UTILS/DEBUG");
new Module("UTILS/RANDOM");
new Module("GRAPHICS/SCREEN");
new Module("MEMORY/RESOURCES");
new Module("MEMORY/DISK");
new Module("MEMORY/SAVE");
new Module("BATTLE/BATTLE");

new Module("IO/IO");
IMPORTS.modules['IO/IO'].child_module("IO/IO_DIALOG");
IMPORTS.modules['IO/IO'].child_module("IO/IO_CHARACTER");
IMPORTS.modules['IO/IO'].child_module("IO/IO_MENU");

new Module("LEVEL/CURRENTLEVEL");
new Module("LEVEL/CHARACTER");
new Module("GRAPHICS/PALETTE");

new Module("UTILS/MAP");
IMPORTS.modules['UTILS/MAP'].child_module("BATTLE/BATTLETREE");
IMPORTS.modules['UTILS/MAP'].child_module("ABILITIES");
IMPORTS.modules['UTILS/MAP'].child_module("INVENTORY");
IMPORTS.modules['UTILS/MAP'].child_module("STATS");
IMPORTS.modules['UTILS/MAP'].child_module("LEVEL/LEVELSTATES");

new Module("UTILS/STRING");
IMPORTS.modules['UTILS/STRING'].child_class("Generation/Markov");
IMPORTS.classes['Generation/Markov'].child_class("Generation/MarkovModels");
IMPORTS.classes['Generation/MarkovModels'].child_module("MEMORY/DICTIONARY");


new Class("Graphic/Color");
new Class("Graphic/VisualElement");
IMPORTS.classes['Graphic/VisualElement'].child_class("Graphic/Rectangle");
IMPORTS.classes['Graphic/VisualElement'].child_class("Graphic/TextElement");
IMPORTS.classes['Graphic/TextElement'].child_class("Graphic/TextBox");
IMPORTS.classes['Graphic/TextBox'].child_class("Graphic/TextBanner");
IMPORTS.classes['Graphic/TextBox'].child_class("Graphic/MenuScreen");
IMPORTS.classes['Graphic/TextElement'].child_class("Graphic/TextMenu");

IMPORTS.classes['Graphic/VisualElement'].child_class("Graphic/CanvasElement");
IMPORTS.classes['Graphic/CanvasElement'].child_class("Graphic/MovingSprite");
IMPORTS.classes['Graphic/CanvasElement'].child_class("Graphic/StaticSprite");
IMPORTS.classes['Graphic/StaticSprite'].child_class("Graphic/CenteredImage");

new Class("LevelObject");
IMPORTS.classes['LevelObject'].child_class("LevelObjectLibrary");
IMPORTS.classes['LevelObject'].child_class("MovingObject");
IMPORTS.classes['MovingObject'].child_class("MovingObjectLibrary");

new Module("INTERFACE");

window.onload = function() {
  var init = new Import("startup");
}
