
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
    var name = gen.pick(Object.keys(LEDGER._ledger["npc"]));
    if (name) {
      villager = LEDGER._ledger["npc"][name];
      villager.name = name;
      return villager;
    } else {
      // make new
      return LEDGER.get_throwaway_villager(seed);
    }
  },

  load_ledger: function() {
    if(!LEDGER._ledger){
      var json = STATS.get(STAT.Ledger);
      if(json){
        LEDGER._ledger = JSON.parse(json);
      } else {
        LEDGER._ledger = {"npc": {}, "pc": {}};
      }
    }
    return LEDGER._ledger;
  },

  record_birth: function(conscious_object) {
    var name = conscious_object.name;
    var role = conscious_object.role || "person";

    if(role == "herald"){
      // Lets not spam everything by considering the herald itself a human
      LEDGER.latest_herald = conscious_object;
      return;
    }
    if(!name){
      return;
    }
    var city = "";
    switch(conscious_object.city){
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
    if(! LEDGER._ledger["npc"][name]) {
      LEDGER._ledger["npc"][name] = LEDGER._villager(city);
      LEDGER.herald(`A new ${role} named ${name} has been born in the city of ${city}.`);
      STATS.record.soul();
    } else {
      LEDGER.herald(`A ${role} named ${name} has been brought back to life by necromancy.`);
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
    if(LEDGER._ledger["npc"][name]) {
      LEDGER._ledger["npc"][name].death = (new Date()).getTime();
      LEDGER.herald(`An innocent ${role} named ${name} has been mercilessly killed by our God.`);
    } else {
      // This shouldnt happen lol;
      var city = LEDGER.get_random_city(gen.get());
      LEDGER._ledger["npc"][name] = LEDGER._villager(city);
    }
  },

  herald(text) {
    CONSOLE.log.herald(text);
    if(LEDGER.latest_herald){
      LEDGER.latest_herald.makeThoughtBubble(text);
    }
  },


  clear_level: function(){
    for(var obj of CURRENTLEVEL.objects.get_all_objects()){
      if(obj && obj.record_death){
        obj.record_death();
      }
    }
    LEDGER.latest_herald = undefined;

    LEDGER.commit_to_stats();
  },

  commit_to_stats: function() {
    LEDGER.load_ledger();
    STATS.record.ledger(JSON.stringify(LEDGER._ledger));
  },

  getBio: function(){
    var villager;
    var throwaway = true;
    if (Math.random() < 0.2){
      villager = LEDGER.get_throwaway_villager(Math.random());
    } else{
      villager = LEDGER.get_villager(Math.random());
      throwaway = false;
    }
    var birth = (new Date(villager.birth)).toLocaleString();
    var death = (new Date(villager.death)).toLocaleString();
    var gen = new Generator(villager.name);

    var male = DATASETS.male_names.includes(villager.name);
    var man = male ? "man" : "woman";
    var pronoun = male ? "he" : "she";
    var possessive = male ? "his" : "her";

    var adj = gen.pick(["brave", "loving", "strong", "smart", "wealthy", "caring", "popular", "kind", "zealous", "lazy", "talentless", "friendly", "despised", "funny"]);
    var parents = gen.pick(["loving", "uncaring", "indifferent", "severe", "wealthy", "happy", "demanding", "sick", "devout", "conscientious", "strict"]);
    var childhood = gen.pick(["happy", "difficult", "tough", "quiet", "peaceful", "challenging", "harsh", "uneventful", "sad", "poor", "relaxed"]);
    var pursuit = gen.pick(["perfection", "strength", "knowledge", "virtue", "truth", "peace", "enlightnement", "devotion", "piety", "power", "influence"]);
    var witness = gen.pick(["colleagues", "friends", "family", "countrymen", "acquaintances", "cousins", "neighbours", "lovers", "clients"]);
    var passion = gen.pick(["fruits", "birds", "fishing", "sports", "helping others", "religion", "flowers", "weapons", "art", "music", "cooking", "wine", "intimate relationships", "meditation", "poetry", "hunting", "fighting", "sculpting", "puppets", "gambling", "archery"]);
    var adverb = gen.pick(["peacefully", "fiercely", "elegantly", "miserably", "cautiously", "boldly", "blissfully", "arrogantly", "enthusiastically", "randomly"]);
    var events = gen.pick([
      `${pronoun} witnessed ${possessive} parents die to a monster attack`,
      `${pronoun} got seduced by a noble`,
      `${pronoun} was hired as an apprentice by a famous craftsman`,
      `${pronoun} got betrayed by ${possessive} best friend`,
      `${possessive} father died in the war`,
      `${pronoun} got trampled by a horse`,
      `${pronoun} made a fortune gambling`,
      `${pronoun} fell in love`,
      `${pronoun} got beaten by ${possessive} uncle`,
      `${pronoun} spoke with the Goddess in a dream`,
      `${possessive} family lost all their money and possessions`,
      `the monster armies raided ${possessive} village`
    ]);
    var meeting = "";
    if(!throwaway){
      meeting = `The highlight of ${possessive} life is that blessed day in which ${pronoun} had the chance to see the Promised Child. It was the happiest day of ${possessive} life, but also the last.<br />`;
    }

    return `<h1>${villager.name}</h1>
    <hr>
    <h5>Not from Wikipedia, the free encyclopedia</h5>
    <strong>Birth</strong>: ${birth}, in ${villager.city}, ${DICTIONARY.get("world_name")}<br />
    <strong>Death</strong>: ${death}, in ${villager.city}, ${DICTIONARY.get("world_name")}
    <hr>
    ${villager.name} was a ${adj} ${man}. Born by the will of our God in ${villager.city} to ${parents} parents, ${pronoun} had a ${childhood} childhood.<br />
    Life completely changed for ${villager.name} when ${events}. From that day on, ${pronoun} decided to dedicate ${possessive} existence to the pursuit of ${pursuit}.<br />
    Of course, ${villager.name}'s brief life was not summarized by one simple trait. ${villager.name} lead a rich and fullfilling existence, most notably, ${possessive} ${witness} remember ${villager.name} fondly for ${possessive} passion for ${passion}.<br />
    ${meeting}
    ${villager.name} died as ${pronoun} lived, ${adverb}. Our God decided that ${pronoun} was no longer needed, and removed ${villager.name} from existence, but not from our memories.`;
  },

  getPartyBio: function(){
    LEDGER.load_ledger();
    var gen = new Generator(Math.random());
    var name = gen.pick(Object.keys(LEDGER._ledger["pc"]));
    var companion = LEDGER._ledger["pc"][name];

    var birth = (new Date(companion.birth)).toLocaleString();
    var death = "";
    if (companion.death){
      death = "<br /><strong>Death</strong>: " + (new Date(companion.death)).toLocaleString();
    }

    var adjective = PARTY.get_descriptor(companion.role);

    return `<h1>${name} the ${adjective}</h1>
    <hr>
    <h5>Not from Wikipedia, the free encyclopedia</h5>
    <strong>Birth</strong>: ${birth}
    ${death}
    <hr>` + PARTY.description(companion.role, name);
  },

  get_dead_companion: function(seed){
    LEDGER.load_ledger();
    var gen = new Generator(seed || Math.random());
    var candidates = [];
    var k = Object.keys(LEDGER._ledger["pc"]);
    for(var key of k){
        if(LEDGER._ledger["pc"][key]["death"]){
          var c = LEDGER._ledger["pc"][key];
          c.name = key;
          candidates.push(c);
        }
    }

    if(candidates.length < 1 ){
      return undefined;
    }
    return gen.pick(candidates);
  },

  record_party_birth: function(role, name) {
    if(role == PARTYMEMBERS.Ren){ // role == PARTYMEMBERS.BestFriend ||
      // We keep BestFriend because it'll either be displayed in a book or be a previous incarnation in a tomb
      return;
    }
    LEDGER.load_ledger();
    LEDGER._ledger["pc"][name] = {
      birth: (new Date()).getTime(),
      role: role,
    };
    LEDGER.commit_to_stats();
    LEDGER.herald(`A new lead character by the name of ${name} enters the stage, in the role of ${role}.`);
  },

  record_party_death: function() {
    LEDGER.load_ledger();
    var people_to_kill = PARTY._members;
    people_to_kill.push("demon_lord", "demon_lieutenant");
    for (var p of people_to_kill){
      var name = DICTIONARY.get(p);
      if(!LEDGER._ledger["pc"][name]){
        continue;
      }
      if(!LEDGER._ledger["pc"][name]["death"]){
        LEDGER._ledger["pc"][name]["death"] = (new Date()).getTime();
      }
    }
    LEDGER.commit_to_stats();
    LEDGER.herald(`All lead characters have been sacrificed for the good of the narrative.`);
  },

  record_party_name_change: function(from, to){
    LEDGER.load_ledger();
    var c = LEDGER._ledger["pc"][from];
    delete LEDGER._ledger["pc"][from];
    LEDGER._ledger["pc"][to] = c;
    LEDGER.commit_to_stats();
    LEDGER.herald(`The lead character formerly known as ${from} will now be known as ${to}.`);
  }

}
