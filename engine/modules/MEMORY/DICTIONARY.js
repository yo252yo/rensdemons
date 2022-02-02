
function camel(name){
  return name[0].toUpperCase() + name.substr(1).toLowerCase();
}

class DictionaryGenerator {
  make_new() {
    var r = {};
    // Character names
    r[PARTYMEMBERS.Ren] = 'Ren';
    r[PARTYMEMBERS.BestFriend] = MARKOV_MODELS.human_names.mutate("Aerith", 5);
    r[PARTYMEMBERS.PreciousChild] = MARKOV_MODELS.human_names.mutate("Honey", 5); // hope/genis/ed/hideyoshi/honey senpai
    r[PARTYMEMBERS.UpbeatDojikko] = MARKOV_MODELS.human_names.mutate("Asahina", 5); //  riku/yuffie/dojiko/asahina/phoebe
    r[PARTYMEMBERS.StreetSmart] = MARKOV_MODELS.human_names.mutate("Han", 5); //hansolo / Quistis / aladdin
    r['han_dog'] = MARKOV_MODELS.human_names.mutate("Guffin", 5); //Pachiko
    r[PARTYMEMBERS.WiseOld] = MARKOV_MODELS.human_names.mutate("Gandalf", 5);
    r[PARTYMEMBERS.TraitorFisher] = MARKOV_MODELS.human_names.mutate("Judes", 5); //  traitor
    r[PARTYMEMBERS.SavageChild] = MARKOV_MODELS.human_names.mutate("Mowgli", 5); // Taiga//ametoyuki/toradora/mowgli/mononoke/razor
    r[PARTYMEMBERS.GeniusProdigy] = MARKOV_MODELS.human_names.mutate("Amadeus", 5); //  hayate/killua/lelouch/near/ender/mozart/mathilda
    r[PARTYMEMBERS.FemmeFatale] = MARKOV_MODELS.human_names.mutate("Lust", 3); // lust/matahary
    r[PARTYMEMBERS.DisguisedPrincess] = MARKOV_MODELS.human_names.mutate("Sheik", 5); //  sheik
    r[PARTYMEMBERS.DumbMuscles] = MARKOV_MODELS.human_names.mutate("Zell", 5); // wakka/barrett/nendou/joey
    r[PARTYMEMBERS.TorturedSoul] = MARKOV_MODELS.human_names.mutate("Sasuke", 5); // sasuke/seifer/Riku/squall/batman
    r[PARTYMEMBERS.RetiredProtector] = MARKOV_MODELS.human_names.mutate("Geralt", 5); // snake/jhon wick
    r[PARTYMEMBERS.SnobRich] = MARKOV_MODELS.human_names.mutate("Nanami", 5); // Draco/Sanzenin/ouran/gatsby/nanami utena

    for(var i in r) {
      r["ORIGINAL_" + i] = r[i];
    }
    r['demon_lord'] = MARKOV_MODELS.human_names.mutate("Bowser", 12);
    r['demon_lieutenant'] = MARKOV_MODELS.human_names.mutate("beelzebub", 5);
    r['child_friends_m1'] = 'Michael';
    r['child_friends_f1'] = 'Sarah';
    r['child_friends_f2'] = 'Emily';
    r['RetiredProtector_bio'] = '';
    r['SnobRich_particules'] =
      MARKOV_MODELS.human_names.mutate("Margarita Maria Victoria", 3) + "-" +
      MARKOV_MODELS.human_names.mutate("Esperanza Jacoba de Felicidad la Perpetua Thadeus Maria Pius Ultra Andrea de Brinje") + " von " +
      MARKOV_MODELS.human_names.mutate("Borbon y Borbon") + " d'" +
      MARKOV_MODELS.human_names.mutate("Aviano", 3)
    ;

    // Geography names
    r['mushroom_adj'] = camel(RANDOM.grab(DATASETS.propaganda_adjectives));
    r['trees_adj'] = camel(RANDOM.grab(DATASETS.propaganda_adjectives));
    r['squid_adj'] = camel(RANDOM.grab(DATASETS.propaganda_adjectives));
    r['harpies_adj'] = camel(RANDOM.grab(DATASETS.propaganda_adjectives));
    r['sirens_adj'] = camel(RANDOM.grab(DATASETS.propaganda_adjectives));
    r['hawk_adj'] = camel(RANDOM.grab(DATASETS.propaganda_adjectives));
    r['slimes_adj'] = camel(RANDOM.grab(DATASETS.propaganda_adjectives));

    r['world_name'] = MARKOV_MODELS.human_names.mutate("Hyrule", 8);
    r['town_1'] = MARKOV_MODELS.human_names.mutate("Pallet", 8) + "burg"; // hope
    r['town_2'] = MARKOV_MODELS.human_names.mutate("Midgar", 8); // fear
    r['town_3'] = MARKOV_MODELS.human_names.mutate("Columbia", 8); // denial
    r['town_4'] = MARKOV_MODELS.human_names.mutate("Vegas", 8); // debauch, optional
    r['town_5'] = MARKOV_MODELS.human_names.mutate("Capitol", 8); // acceptance, optional

    // Generation seeds
    r['world_seed'] = Math.random();
    return r;
  };
}

const DICTIONARY = {
  _DICTIONARY: {},

  fix_broken: function(key){
    var v = (new DictionaryGenerator()).make_new();
    for(var k in v){
      if(! DICTIONARY._DICTIONARY[k]) {
        DICTIONARY._DICTIONARY[k] = v[k];
      }
    }
    if (DICTIONARY._DICTIONARY[key]){
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
