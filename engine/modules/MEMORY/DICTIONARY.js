

class DictionaryGenerator {
  make_new() {
    var r = {};
    // Character names
    r[PARTYMEMBERS.Ren] = 'Ren';
    r[PARTYMEMBERS.BestFriend] = MARKOV_MODELS.human_names.mutate("Aerith", 5);
    r[PARTYMEMBERS.PreciousChild] = MARKOV_MODELS.human_names.mutate("Honey", 5); // hope/genis/ed/hideyoshi/honey senpai
    r[PARTYMEMBERS.UpbeatDojikko] = MARKOV_MODELS.human_names.mutate("Asahina", 5); //  riku/yuffie/dojiko/asahina/phoebe

    // r[PARTYMEMBERS.TorturedSoul] = MARKOV_MODELS.human_names.mutate("Sasuke", 5); // sasuke/seifer/Riku/squall/batman
    // r[PARTYMEMBERS.StreetSmart] = MARKOV_MODELS.human_names.mutate("Han", 5); //hansolo / Quistis / aladdin
    // r[PARTYMEMBERS.WiseOld] = MARKOV_MODELS.human_names.mutate("Gandalf", 5);
    // r[PARTYMEMBERS.RetiredProtector] = MARKOV_MODELS.human_names.mutate("Geralt", 5); // snake/jhon wick
    // r[PARTYMEMBERS.DumbMuscles] = MARKOV_MODELS.human_names.mutate("Zell", 5); // wakka/barrett/nendou/joey yugui
    // r[PARTYMEMBERS.SnobRich] = MARKOV_MODELS.human_names.mutate("Nanami", 5); // Draco/Sanzenin/ouran/gatsby/nanami utena
    // r[PARTYMEMBERS.SavageChild] = MARKOV_MODELS.human_names.mutate("Taiga", 5); // ametoyuki/toradora/mowgli/mononoke
    // r[PARTYMEMBERS.FemmeFatale] = MARKOV_MODELS.human_names.mutate("Lust", 3); // lust/matahary
    // r[PARTYMEMBERS.DisguisedPrincess] = MARKOV_MODELS.human_names.mutate("Sheik", 5); //  sheik
    // r[PARTYMEMBERS.GeniusProdigy] = MARKOV_MODELS.human_names.mutate("Amadeus", 5); //  hayate/killua/lelouch/near/ender/mozart/mathilda
    // r[PARTYMEMBERS.TraitorFisher] = MARKOV_MODELS.human_names.mutate("Judes", 5); //  traitor

    for(var i in r) {
      r["ORIGINAL_" + i] = r[i];
    }
    r['demon_lord'] = MARKOV_MODELS.human_names.mutate("Bowser", 12);
    r['child_friends_m1'] = 'Michael';
    r['child_friends_m2'] = 'Nicholas';
    r['child_friends_f1'] = 'Sarah';
    r['child_friends_f2'] = 'Emily';

    // Geography names
    r['world_name'] = MARKOV_MODELS.human_names.mutate("Hyrule", 8);
    r['town_1'] = MARKOV_MODELS.human_names.mutate("Pallet", 8) + "burg"; // hope
    // exposition/duty/perseverance/bravery/sacrifice
    r['town_2'] = MARKOV_MODELS.human_names.mutate("Midgar", 8); // fear
    // zeal/purity/sectarism/distrust/suspicion/obsession/zeal/exclusion/rejection/isolation/paranoia  > ? rules/faith/guilt
    r['town_3'] = MARKOV_MODELS.human_names.mutate("Columbia", 8); // denial
    // ignorance/delusion/lie/pretend  > cant see others?
    r['town_4'] = MARKOV_MODELS.human_names.mutate("Vegas", 8); // debauch
    // debauchery/lust  > freedom, memories
    r['town_5'] = MARKOV_MODELS.human_names.mutate("Capitol", 8); // acceptance
    // death/praise  > death cult/scapegoat/acceptance

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
