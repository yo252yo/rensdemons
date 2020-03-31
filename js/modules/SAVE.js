
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
  last_loaded: "",
  slots: [],

};
