
class SaveFile {
  constructor() {
    this.level_save = LEVEL.export();
    this.palette = PALETTE.export();
    this.dictionary = DICTIONARY.export();
  }

  load() {
    PALETTE.load(this.palette);
    DICTIONARY.load(this.dictionary);
    LEVEL.load(this.level_save);
  }
}

const SAVE = {
  last_loaded: "",
  slots: [],

};
