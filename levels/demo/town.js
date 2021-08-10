AUDIO.music.town.hope();

var gen = new Generator(DICTIONARY.get("world_seed")*2);

new S_TownFloor(50, 650, 600, 600, "demo/world_map");
new S_Church(450, 500, "demo/church");

new S_Store(ITEMS_ARCHETYPES_NAMES.Weapon, 200, 70, 200, gen.get());
new S_Store(ITEMS_ARCHETYPES_NAMES.Tool, 100, 220, 200, gen.get());
new S_Store(ABILITIES_ARCHETYPES_NAMES.Spirit, 300, 370, 200, gen.get());
new S_Store(ABILITIES_ARCHETYPES_NAMES.Elements, 300, 520, 200, gen.get());

var houseFiller = new Filler(gen);
houseFiller.set_zone(75, 625, 550, 550);
houseFiller.set_tries(10, 100);
houseFiller.set_guaranteed(2);
houseFiller.set_object(120, 160, function(x,y,g){ return new S_House(CITIES.hope, x, y, g.get()); });
houseFiller.fill_by_retry();

var villagerFiller = new Filler(gen);
villagerFiller.set_zone(75, 625, 550, 550);
villagerFiller.set_tries(2, 40);//this.gen.int(10) - 7
villagerFiller.set_object(50, 60, function(x,y,g){ return new M_Villager(CITIES.hope, x, y, g.get()); });
villagerFiller.fill_by_retry();


var change_nickname = function() {
  PARTY.changeNickname(PARTYMEMBERS.Ren);
  TextBannerSequence.make([
    "Today is an important day, you're finally going to the church to learn how you're going to defeat the forces of evil!",
  ], function(){ IO.control.character(); });
};

CURRENTLEVEL.start_function = function() {
  INVENTORY.increase(ITEM.Coin, 100);
  INVENTORY.increase(ITEM.XpToken, 150);
  MARTYRDOM.death(10);
  TextBannerSequence.make([
    `This is the town of $$town_1$, where you have lived your whole life. It's one of the last remaining cities in a world at the mercy of the forces of evil. It's not very big, but you feel like it's brimming with new things to discover every day!`,
    `Fortunately, your life has not been too hard: everybody loves you, because you're the Promised Child, a child chosen by the gods to finally bring peace to the village.`,
    `Everyone knows your name, it's synonymous with hope for a better future. Your name is...`,
  ], change_nickname);
};

CURRENTLEVEL.initialize_with_character(600, 600);
