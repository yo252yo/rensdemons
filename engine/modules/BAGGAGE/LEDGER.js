
const LEDGER = {
  get_throwaway_villager: function (seed) {
    var gen = new Generator(seed);
    var cities = [DICTIONARY.get("town_1"), DICTIONARY.get("town_2"), DICTIONARY.get("town_3"), DICTIONARY.get("town_4"), DICTIONARY.get("town_5")];
    var city = gen.pick(cities);

    var name = "";
    if (gen.get() > 0.5) {
      name = gen.pick(DATASETS.female_names);
    } else {
      name = gen.pick(DATASETS.male_names);
    }

    return {
      birth: new Date(),
      death: new Date(),
      city: city,
      name: name,
    };
  },

  get_villager: function (seed) {
    return LEDGER.get_throwaway_villager(seed);
  },

}
