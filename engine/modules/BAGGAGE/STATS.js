
const STAT = {
  Death: "death",
  Endings: "endings",
  Ledger: "LEDGER",
  MaxExplorationScore: "MaxExplorationScore",
  Glitches: "Glitches",
}

const ENDINGS = {
  War: "END OF WAR", // kill demon_lord
  God: "END OF GOD", // kill goddess
  Suffering: "END OF SUFFERING", // stop suffering
  World: "END OF WORLD", // ask for a new world
  Line: "END OF LINE", // code
  Game: "END OF GAME", // leave the game
  Universe: "END OF UNIVERSE", // Fork on git
  // road, world, ear, year, universe, trail, story, day, journey
}

const STATS = {
  _stats: new FluidMap(),

  factory: {
    export: function() {
      return STATS._stats.export();
    },

    import: function(save) {
      STATS._stats.merge(new FluidMap(save));
    },

    make_new: function() {
      // Nothing is needed.
      STATS.record.ending(ENDINGS.Game); // always true when the game is off
    },
  },

  record: {
    _increment(key, v){
      STATS._stats.increment([key], v);
      DISK.write("STATS");

      CONSOLE.log.flag("Changed " + key + " by " + (v || 1));
    },

    _set(key, v){
      STATS._stats.set([key], v);
      DISK.write("STATS");

      CONSOLE.log.flag("Set " + key + " by " + (v || 1));
    },

    death: function(v) {
      AUDIO.effect.unlock();
      STATS.record._increment(STAT.Death, v);
    },

    ledger: function(l) {
      STATS._stats.set([STAT.Ledger], l);
      DISK.write("STATS");
    },

    flag: function(text, value){
      AUDIO.effect.unlock();
      STATS.record._increment("FLAG_" + text, value);
    },

    unlock: function(text, value){
      STATS.record._increment("UNLOCK_" + text, value);
    },

    ending: function(text, value){
      AUDIO.effect.unlock();
      if(text != ENDINGS.Game){
        STATS.record._increment(STAT.Endings, value);
      }
      STATS.record._increment("END_" + text, value);
    },

    set_flag: function(text, value){
      AUDIO.effect.unlock();
      STATS.record._set("FLAG_" + text, value);
    },

    maxScore: function(value){
      var g = STATS._stats.get([STAT.MaxExplorationScore]);

      if (!g || g < value){
        STATS.record._set(STAT.MaxExplorationScore, value);
      }
    },

  },

  get: function(key){
    return STATS._stats.get([key]);
  },

  flag: function(text){
    return STATS._stats.get(["FLAG_" + text]);
  },

  unlocked: function(text){
    return STATS._stats.get(["UNLOCK_" + text]);
  },

  _enduniverse_validate: function(){
    STATS.EU_prior ++;
    if(STATS.EU_prior >= 2){ // this is the number of files we check :/
      document.getElementById('END OF UNIVERSE').style.opacity = 1.0;
    }
  },

  _enduniverse_invalidate: function(){
    STATS.EU_prior = -1000;
  },

  ending: function(text){
    if (text == ENDINGS.Game){
      return false; // can never be true if the game is launched
    }
    if (text == ENDINGS.Universe) {
      // The only way for this to be true is to change the code or the files (const and class).
      var prior = (typeof BATTLE == "undefined" && typeof ConsciousObject == "undefined");
      if(prior){
        STATS.EU_prior = 0;
        IMPORTS.file_exists("battles/heaven/_goddess.js", STATS._enduniverse_invalidate, STATS._enduniverse_validate);
        IMPORTS.file_exists("battles/pandemonium/lord.js", STATS._enduniverse_invalidate, STATS._enduniverse_validate);
      } else {
        return false;
      }
    }
    return STATS._stats.get(["END_" + text]);
  },

  is_post_game: function(){
    return STATS.get(STAT.Endings);
  },
}
