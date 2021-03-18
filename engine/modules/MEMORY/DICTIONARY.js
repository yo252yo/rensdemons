

class DictionaryGenerator {
  make_new() {
    var r = {};
    // Character names
    r[PARTYMEMBERS.Ren] = 'Ren';
    r[PARTYMEMBERS.BestFriend] = MARKOV_MODELS.human_names.mutate("Aerith", 5);
    // r[PARTYMEMBERS.TorturedSoul] = MARKOV_MODELS.human_names.mutate("Sasuke", 5); // sasuke/seifer/Riku/squall/batman
    // r[PARTYMEMBERS.StreetSmart] = MARKOV_MODELS.human_names.mutate("Han", 5); //hansolo / Quistis / aladdin
    // r[PARTYMEMBERS.WiseOld] = MARKOV_MODELS.human_names.mutate("Gandalf", 5);
    // r[PARTYMEMBERS.RetiredProtector] = MARKOV_MODELS.human_names.mutate_n("Geralt", 5, 50); // snake/jhon wick
    // r[PARTYMEMBERS.DumbMuscles] = MARKOV_MODELS.human_names.mutate_n("Zell", 5, 50); // wakka/barrett/nendou/joey yugui
    // r[PARTYMEMBERS.SnobRich] = MARKOV_MODELS.human_names.mutate_n("Nanami", 5, 50); // Draco/Sanzenin/ouran/gatsby/nanami utena
    // r[PARTYMEMBERS.SavageChild] = MARKOV_MODELS.human_names.mutate_n("Taiga", 5, 50); // ametoyuki/toradora/mowgli/mononoke
    // r[PARTYMEMBERS.FemmeFatale] = MARKOV_MODELS.human_names.mutate_n("Lust", 3, 50); // lust/matahary
    // r[PARTYMEMBERS.DisguisedPrincess] = MARKOV_MODELS.human_names.mutate_n("Sheik", 5, 50); //  sheik
    // r[PARTYMEMBERS.UpbeatDojikko] = MARKOV_MODELS.human_names.mutate_n("Asahina", 5, 50); //  riku/yuffie/dojiko/asahina/phoebe
    // r[PARTYMEMBERS.PreciousChild] = MARKOV_MODELS.human_names.mutate_n("Honey", 5, 50); // hope/genis/ed/hideyoshi/honey senpai
    // r[PARTYMEMBERS.GeniusProdigy] = MARKOV_MODELS.human_names.mutate_n("Amadeus", 5, 50); //  hayate/killua/lelouch/near/ender/mozart/mathilda
    // r[PARTYMEMBERS.TraitorFisher] = MARKOV_MODELS.human_names.mutate_n("Judes", 5, 50); //  traitor

    for(var i in r) {
      r["ORIGINAL_" + i] = r[i];
    }
    r['demon_lord'] = MARKOV_MODELS.human_names.mutate("Bowser", 12);
    r['child_friends_m1'] = 'Michael';
    r['child_friends_m2'] = 'Nicholas';
    r['child_friends_m3'] = 'Andrew';
    r['child_friends_f1'] = 'Sarah';
    r['child_friends_f2'] = 'Emily';

    // Geography names
    r['world_name'] = MARKOV_MODELS.human_names.mutate("Hyrule", 8);
    r['town_1'] = MARKOV_MODELS.human_names.mutate("Pallet", 8) + "burg";
    r['town_2'] = MARKOV_MODELS.human_names.mutate("Midgar", 8);

    // Generation seeds
    r['town_1_seed'] = Math.random();
    r['world_map_seed'] = Math.random();
    return r;
  };
}

const DICTIONARY = {
  _DICTIONARY: {},

  fix_broken: function(key){
    var v = (new DictionaryGenerator()).make_new();
    if (v[key]){
      DICTIONARY._DICTIONARY[key] = v[key];
      CONSOLE.error("Successfully mitigated");
  //    DISK.write("DICTIONARY");
      return DICTIONARY._DICTIONARY[key];
    } else {
      CONSOLE.error("Cannot mitigate");
      return "";
    }
  },

  has: function(key){
    return (key in DICTIONARY._DICTIONARY);
  },

  get: function(key) {
    if (DICTIONARY.has(key)){
      return DICTIONARY._DICTIONARY[key];
    } else {
      CONSOLE.error("Wrong dictionary key: " + key);
      return DICTIONARY.fix_broken(key);
    }
  },

  set: function(key, value) {
    DICTIONARY._DICTIONARY[key] = value;
    // dont save to disk, its in the save
    //    DISK.write("DICTIONARY");
  },

  factory: {
    make_new: function() {
      DICTIONARY._DICTIONARY = (new DictionaryGenerator()).make_new();
      DISK.write("DICTIONARY");
    },

    export: function() {
      return DICTIONARY._DICTIONARY;
    },

    import: function(save) {
      DICTIONARY._DICTIONARY = save;
    },
  },
}
