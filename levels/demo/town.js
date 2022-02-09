AUDIO.music.town.hope();


var gen = new Generator(DICTIONARY.get("world_seed")*2);

new S_TownFloor(1050, 1650, 600, 600, "demo/world_map");
new S_Church(1450, 1500, "demo/church");

new S_Store(CITIES.hope, ITEMS_ARCHETYPES_NAMES.Weapon, 200, 1070, 1150, gen.get());
new S_Store(CITIES.hope, ITEMS_ARCHETYPES_NAMES.Tool, 200, 1220, 1150, gen.get());
new S_Store(CITIES.hope, ABILITIES_ARCHETYPES_NAMES.Spirit, 500, 1370, 1150, gen.get());
new S_Store(CITIES.hope, ABILITIES_ARCHETYPES_NAMES.Element, 500, 1520, 1150, gen.get());

var houseFiller = new Filler(gen.get(), 120, 160);
houseFiller.set_zone(1075, 1625, 550, 550);
houseFiller.set_tries(10, 100);
houseFiller.set_guaranteed(2);
houseFiller.add_constructor(function(x,y,seed){ return new S_House(CITIES.hope, x, y, seed); });
houseFiller.fill_floor_by_retry();

var villagerFiller = new Filler(gen.get(), 50, 60);
villagerFiller.set_zone(1075, 1625, 550, 550);
villagerFiller.set_tries(2, 40);//this.gen.int(10) - 7
villagerFiller.add_constructor(function(x,y,seed){ return new M_Villager(CITIES.hope, x, y, seed); });
villagerFiller.fill_floor_by_retry();


var change_nickname = function() {
  INVENTORY.increase(ITEM.Coin, 100);
  INVENTORY.increase(ITEM.XpToken, 150);
  MARTYRDOM.death(10);
  PARTY.changeNickname(PARTYMEMBERS.Ren);
  TextBannerSequence.make([
    "Today is an important day, you're finally going to the church to learn how you're going to defeat the forces of evil!",
  ], function(){ IO.control.character(); });
};

CURRENTLEVEL.setup_text_start_function([
  `This is the town of $$town_1$, where you have lived your whole life. It's one of the last remaining cities in a world at the mercy of the forces of evil. It's not very big, but you feel like it's brimming with new things to discover every day!`,
  `Fortunately, your life has not been too hard: everybody loves you, because you're the Promised Child, a child chosen by the Goddess to finally bring peace to the village.`,
  `Everyone knows your name, it's synonymous with hope for a better future. Your name is...`,
], change_nickname);

DICTIONARY.set("BestFriend", "a villager");
DICTIONARY.set("ORIGINAL_BestFriend", "a villager");

CURRENTLEVEL.initialize_with_character(1600, 1600);
