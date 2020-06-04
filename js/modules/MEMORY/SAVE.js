
class SaveFile {
  constructor() {
    this.palette = PALETTE.factory.export();
    this.dictionary = DICTIONARY.factory.export();
    this.currentlevel = CURRENTLEVEL.factory.export();
    this.levelstates = LEVELSTATES.factory.export();
  }
}

const SAVE = {
  _DISK_KEY: "saves",
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
    CURRENTLEVEL.factory.import(savefile.currentlevel);
    LEVELSTATES.factory.import(savefile.levelstates);
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
    DISK.set(SAVE._DISK_KEY, SAVE.factory.export());
    CONSOLE.log.save("Saved in save slot " + index);
  },

  load: function(index) {
    if (index >= SAVE.slots.length){
      CONSOLE.error("Invalid save slot (" + index + ")");
      return;
    }
    SAVE._load_savefile(SAVE.slots[index].save);
    CONSOLE.log.save("Loaded save slot " + index);
  },

  print: {
    _menu_from_slots: function(effect, start){
      if (start == undefined){ start = 0; }
      var result = [];
      for(var i = start; i < SAVE.slots.length; i++){
        var slot = SAVE.slots[i];
        (function (f, index) {
          var callback = function() { f(index); };
          result.push({"text": slot.key, "effect": callback});
        })(effect, i);
      }
      result.push({"text": "Back", "effect": "##BACK"});

      return result;
    },

    save_menu: function() {
      new CenteredTextMenu("Save in slot?",
                    [
                      {"text": "New save", "effect": function(){ SAVE.save(); }},
                   ].concat(SAVE.print._menu_from_slots(function(i){ SAVE.save(i);}, 1))
                 );
      return true;
    },

    can_load: function() {
      return (SAVE.slots.length > 0);
    },

    load_menu: function() {
      new CenteredTextMenu("Load from slot?",
                    SAVE.print._menu_from_slots(function(i){ return SAVE.load(i);})
                  );
    },
  },

  autosave: function(){
    SAVE.save(0);
  },

};
