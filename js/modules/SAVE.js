
class SaveFile {
  constructor() {
    this.palette = PALETTE.factory.export();
    this.dictionary = DICTIONARY.factory.export();
    this.level = LEVEL.factory.export();
  }
}

const SAVE = {
  slots: [],

  factory: {
    export: function(){
      return SAVE.slots;
    },

    import: function(slots){
      return SAVE.slots = slots;
    },
  },

  _load_savefile: function(savefile){
    PALETTE.factory.import(savefile.palette);
    DICTIONARY.factory.import(savefile.dictionary);
    LEVEL.factory.import(savefile.level);
  },

  save: function(index) {
    var key = (new Date()).toLocaleString();

    if (index == undefined) {
      index = SAVE.slots.length;
    }
    if (index == 0){
      key = "AUTOSAVE";
    }
    SAVE.slots[index] = {
      key: key,
      save: new SaveFile(),
    };
    DISK.set("saves", SAVE.factory.export());
    CONSOLE.sys_log("# Saved in save slot " + index);
    return true;
  },

  load: function(index) {
    if (index >= SAVE.slots.length){
      console.error("Invalid save slot (" + index + ")");
      return;
    }
    SAVE._load_savefile(SAVE.slots[index].save);
    CONSOLE.sys_log("# Loaded save slot " + index);
  },

  print: {
    _menu_from_slots: function(effect, start){
      if (start == undefined){ start = 0; }
      var result = [];
      for(var i = start; i < SAVE.slots.length; i++){
        var slot = SAVE.slots[i];
        (function (f, index) {
          var callback = function() { return f(index); };
          result.push({"text": slot.key, "effect": callback});
        })(effect, i);
      }
      result.push({"text": "Back", "effect": "##BACK"});

      return result;
    },

    save_menu: function(){
      new TextMenu("Save in slot?",
                    [
                      {"text": "New save", "effect": function(){ return SAVE.save(); }},
                   ].concat(SAVE.print._menu_from_slots(function(i){ return SAVE.save(i);}, 1))
                 );
      return true;
    },

    load_menu: function(){
      if (SAVE.slots.length == 0)  {
        return false;
      }
      new TextMenu("Load from slot?",
                    SAVE.print._menu_from_slots(function(i){ return SAVE.load(i);})
                  );
      return true;
    },
  },

  autosave: function(){
    SAVE.save(0);
  },

};
