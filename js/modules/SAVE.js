
class SaveFile {
  constructor() {
    this.palette = PALETTE.save.export();
    this.dictionary = DICTIONARY.save.export();
    this.level_save = LEVEL.save.export();
  }
}

const SAVE = {
  slots: [],

  export: function(){
    return SAVE.slots;
  },

  import: function(slots){
    return SAVE.slots = slots;
  },

  load_savefile: function(savefile){
    PALETTE.save.import(savefile.palette);
    DICTIONARY.save.import(savefile.dictionary);
    LEVEL.save.import(savefile.level_save);
  },

  save: function(index) {
    if (index == undefined) {
      index = SAVE.slots.length;
    }
    SAVE.slots[index] = {
      key: (new Date()).toLocaleString(),
      save: new SaveFile(),
    };
    DISK.set("saves", SAVE.export());
    CONSOLE.sys_log("# Saved in save slot " + index);
    return true;
  },

  load: function(index) {
    if (index >= SAVE.slots.length){
      console.error("Invalid save slot (" + index + ")");
      return;
    }
    SAVE.load_savefile(SAVE.slots[index].save);
    CONSOLE.sys_log("# Loaded save slot " + index);
  },

  _menu_from_slots: function(effect){
    var result = [];
    for(var i = 0; i < SAVE.slots.length; i++){
      var slot = SAVE.slots[i];
      (function (f, index) {
        var callback = function() { return f(index); };
        result.push({"text": slot.key, "effect": callback});
      })(effect, i);
    }

    return result;
  },

  print_save_menu: function(){
    new TextMenu("Save in slot?",
                  [
                    {"text": "New save", "effect": function(){ return SAVE.save(); }},
                 ].concat(SAVE._menu_from_slots(function(i){ return SAVE.save(i);}))
               );
    return true;
  },

  print_load_menu: function(){
    if (SAVE.slots.length == 0)  {
      return false;
    }
    new TextMenu("Load from slot?",
                  SAVE._menu_from_slots(function(i){ return SAVE.load(i);})
                );
    return true;
  },

};
