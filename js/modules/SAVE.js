
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
      key: new Date(),
      save: new SaveFile(),
    };
  },

  load: function(index) {
    if (index >= SAVE.slots.length){
      console.error("Invalid save slot (" + index + ")");
      return;
    }
    SAVE.slots[index].save.load();
  }

};
