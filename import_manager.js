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

       if (CONSOLE && CONSOLE.sys_log){
         CONSOLE.sys_log(">> Loaded " + this.src);
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

    child_class(name){
      var child = new Class(name, true);
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
new Module("RESOURCES");
new Module("IO");
new Module("LEVEL");
new Module("CHARACTER");
new Module("PALETTE");


new Class("Graphic/Color");
new Class("Graphic/VisualElement");
IMPORTS.classes['Graphic/VisualElement'].child_class("Graphic/Rectangle");

IMPORTS.classes['Graphic/VisualElement'].child_class("Graphic/CanvasElement");
IMPORTS.classes['Graphic/CanvasElement'].child_class("Graphic/MovingSprite");
IMPORTS.classes['Graphic/CanvasElement'].child_class("Graphic/StaticSprite");

new Class("LevelObject");
IMPORTS.classes['LevelObject'].child_class("LevelObjectLibrary");

window.onload = function() {
  var init = new Import("startup");

  // tech demo
  init.child_function(function(){
    LEVEL.load("zero");
  });
}

new Module("RANDOM.xp");
