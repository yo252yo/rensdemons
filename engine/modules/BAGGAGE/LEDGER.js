
const LEDGER = {
  _ledger: undefined,

  _villager: function(city){
    return {
      birth: (new Date()).getTime(),
      death: (new Date()).getTime(),
      city: city,
    };
  },

  get_random_city: function(seed){
    var gen = new Generator(seed || Math.random());
    var cities = [DICTIONARY.get("town_1"), DICTIONARY.get("town_2"), DICTIONARY.get("town_3"), DICTIONARY.get("town_4"), DICTIONARY.get("town_5")];
    return gen.pick(cities);
  },

  get_throwaway_villager: function (seed) {
    var gen = new Generator(seed);
    var city = LEDGER.get_random_city(gen.get());

    var villager = LEDGER._villager(city);
    if (gen.get() > 0.5) {
      villager.name = gen.pick(DATASETS.female_names);
    } else {
      villager.name = gen.pick(DATASETS.male_names);
    }
    return villager;
  },

  get_villager: function (seed) {
    var gen = new Generator(seed);
    LEDGER.load_ledger();
    var name = gen.pick(Object.keys(LEDGER._ledger));
    var villager = LEDGER.get_throwaway_villager(seed);
    if (name) {
      villager = LEDGER._ledger[name];
      villager.name = name;
    }
    return villager;
  },

  load_ledger: function() {
    if(!LEDGER._ledger){
      var json = STATS.get(STAT.Ledger);
      if(json){
        LEDGER._ledger = JSON.parse(json);
      } else {
        LEDGER._ledger = {};
      }
    }
    return LEDGER._ledger;
  },

  record_birth: function(name, city_type, role) {
    if(!name){
      return;
    }
    if(!role){
      role = "person";
    }
    var city = "";
    switch(city_type){
      case CITIES.acceptance:
        city = DICTIONARY.get("town_5");
        break;
      case CITIES.denial:
        city = DICTIONARY.get("town_3");
        break;
      case CITIES.fear:
        city = DICTIONARY.get("town_2");
        break;
      case CITIES.hope:
        city = DICTIONARY.get("town_1");
        break;
      case CITIES.indulgence:
        city = DICTIONARY.get("town_4");
        break;
      case CITIES.mourning:
        city = DICTIONARY.get("town_2");
        break;
      default:
        city = LEDGER.get_random_city(Math.random());
        break;
    }
    LEDGER.load_ledger();
    if(! LEDGER._ledger[name]) {
      LEDGER._ledger[name] = LEDGER._villager(city);
      CONSOLE.log.ledger(`A new ${role} named ${name} has been born in the city of ${city}.`);
    } else {
      CONSOLE.log.ledger(`A ${role} named ${name} has been brought back to life by necromancy.`);
    }
  },

  record_death: function(name, role) {
    if(!name){
      return;
    }
    if(!role){
      role = "villager";
    }
    LEDGER.load_ledger();
    if(LEDGER._ledger[name]) {
      LEDGER._ledger[name].death = (new Date()).getTime();
      CONSOLE.log.ledger(`An innocent ${role} named ${name} has been mercilessly killed.`);
    } else {
      // This shouldnt happen lol;
      var city = LEDGER.get_random_city(gen.get());
      LEDGER._ledger[name] = LEDGER._villager(city);
    }
  },

  commit_to_stats: function() {
    LEDGER.load_ledger();
    STATS.record.ledger(JSON.stringify(LEDGER._ledger));
  },
}
