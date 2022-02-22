// ===================
//hack A. INITIALIZATION (sound, etc...)
// ===================
AUDIO.music.town.debauch();
var gen = new Generator(DICTIONARY.get("world_seed")*5);

// ===================
//hack B. FLOORS
//hack C. EXIT
// ===================
var town = new S_TownFloor(1050, 2050, 2000, 1000, "010_world_map");

// ===================
//hack D. UNIQUE ELEMENTS
// ===================
new S_Church(1950, 1300, "021_church4$");

new S_Store(CITIES.indulgence, ITEMS_ARCHETYPES_NAMES.Weapon, 500, 1100, 2000, gen.get());
new S_Store(CITIES.indulgence, ITEMS_ARCHETYPES_NAMES.Alchemy, 10000, 2825, 1900, gen.get());
new S_Store(CITIES.indulgence, ABILITIES_ARCHETYPES_NAMES.Diplomat, 100000, 2200, 1375, gen.get());
new S_Store(CITIES.indulgence, ABILITIES_ARCHETYPES_NAMES.Spirit, 2000, 2500, 1600, gen.get());

new S_Manor(2525,1150);

new M_FemmeFatale(2125, 1125);
new M_SnobRich(2725, 1175);


var s = new S_Store(CITIES.indulgence, "Gambler", 0, 1700, 1250, gen.get());
s.enter_function = function() {
  BATTLE.api.make("_021/_casino");
};

// ===================
//hack E. DECOR (permanent filler)
// ===================

var houseFiller = new Filler(gen.get());
houseFiller.set_zone(1075, 2025, 1950, 950);
houseFiller.set_tries(5, 60);
houseFiller.add_constructor(function(x,y,seed){ return new S_House(CITIES.indulgence, x, y, seed); },1 , 120, 160);
houseFiller.fill_floor_by_retry();

var villagerFiller = new Filler(gen.get());
villagerFiller.set_zone(1075, 2025, 1950, 950);
villagerFiller.set_tries(35, 120);//this.gen.int(10) - 7
villagerFiller.add_constructor(function(x,y,seed){ return new M_Villager(CITIES.indulgence, x, y, seed); }, 1, 50, 60);
villagerFiller.fill_floor_by_retry();


// ===================
//hack G. START/INIT
// ===================
CURRENTLEVEL.setup_text_start_function([
  `As you enter $$town_4$, you're immediately assaulted by a flood of sensations. The streets are filled with people, in spite of the late hour. They are bathed in the lights of colorful lanterns hung at the facade of the houses. The building themselves are pretty colorful too, though no care was given to the paint job which looks obviously rushed, unfinished, and very uneven between different walls. A complete lack of coordination makes for a true chaos of hues.`,
  `The passerbys are chatting loudly, laughing, dancing... Everywhere you turn, you see happy faces. You can hear music coming out of different houses, sometimes dulled down by the walls, other times straight through open doors and windows, resulting in a complete cacophony. Smells are spreading too, and your stomach is excited by the aromas of delicious meals or fruity drinks that surround you.`,
  `$$BestFriend$: "Maybe today is a festival..."`,
  `A nearby stranger, hearing these words, came towards you.`,
  `Stranger: "You must be new to $$town_4$! It's my great pleasure to welcome you, my friends! Make yourselves at home! Yes, today is special! Every day is! That's how we live, here! We make the most out of life! Because we know that it might end any second. You look a bit young, but you need a welcome gift!"`,
  `The stranger gives you cups of a beverage whose strong scent betrayed a powerful intoxicating content.`,
  `Stranger: "It's a local specialty! Anyway, I'm off doing my things, but by all means, enjoy our beautiful town! This is the best place in the world! The town that never sleeps!"`,
  `He walks away, staggering slightly.`,
  `$$BestFriend$: "If nothing more, this place looks very friendly! Should we have a look around?"`,
]);


town.get_exit().initialize_with_character(1100, 1100);
