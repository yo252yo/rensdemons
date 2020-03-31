
class SaveFile {
  constructor() {
    SAVE.palette = PALETTE.save.export();
    SAVE.dictionary = DICTIONARY.save.export();
    SAVE.level_save = LEVEL.save.export();
  }

  load() {
    PALETTE.save.load(SAVE.palette);
    DICTIONARY.save.load(SAVE.dictionary);
    LEVEL.save.load(SAVE.level_save);
  }
}

const SAVE = {
  slots: [],

  save: function(index) {
    if (index == undefined) {
      index = SAVE.slots.length;
    }
    SAVE.slots[index] = {
      key: (new Date()).toLocaleString(),
      save: new SaveFile(),
    };
    CONSOLE.sys_log("# Saved in save slot " + index);
    return true;
  },

  load: function(index) {
    if (index >= SAVE.slots.length){
      console.error("Invalid save slot (" + index + ")");
      return;
    }
    SAVE.slots[index].save.load();
    CONSOLE.sys_log("# Loaded save slot " + index);
  },

  _menu_from_slots: function(effect){
    var result = [];
    for(var i = 0; i < SAVE.slots.length; i++){
      console.log(i);
      var slot = SAVE.slots[i];
      (function (f, index) {
        var callback = function() { return f(index); };
        result.push({"text": slot.key, "effect": callback});
      })(effect, i);
    }
    console.log(result);

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
