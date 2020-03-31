
class SaveFile {
  constructor() {
    this.palette = PALETTE.save.export();
    this.dictionary = DICTIONARY.save.export();
    this.level_save = LEVEL.save.export();
  }

  load() {
    PALETTE.save.load(this.palette);
    DICTIONARY.save.load(this.dictionary);
    LEVEL.save.load(this.level_save);
  }
}

const SAVE = {
  last_loaded: "",
  slots: [],

};
