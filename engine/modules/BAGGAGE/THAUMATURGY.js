
const THAUMATURGY = {
  teleport: false,
  smite: false,

  is_visible: function(){
    return STATS.ending(ENDINGS.God);
  },

  toggle_teleport: function() {
    THAUMATURGY.teleport = ! THAUMATURGY.teleport;
  },

  toggle_smiting: function() {
    THAUMATURGY.smite = ! THAUMATURGY.smite;
  },

  remove_fog: function() {
    FOG.stop();
  },

  remove_camera_lock: function() {
    document.body.style.overflow = "scroll";
  },

  run_faster: function() {
    MovingObject._RUNNING_BONUS = 10;
  },

  get_all_abilities: function() {
    for(var i of Object.keys(ABILITY)){
      if (typeof ABILITY[i] == "function"){
        continue;
      }
      ABILITIES.unlock(ABILITY[i]);
    }
  },

  get_all_party_members: function() {
    for(var i of Object.keys(PARTYMEMBERS)){
      if (typeof PARTYMEMBERS[i] == "function"){
        continue;
      }
      if (i != PARTYMEMBERS.Ren){
        PARTY.add(i);
      }
    }
  },

  get_all_items: function() {
    for(var i of Object.keys(ITEM)){
      if (typeof ITEM[i] == "function"){
        continue;
      }
      INVENTORY.increase(ITEM[i]);
    }
  },

  boost_martyrdom: function(){
    for(var m of Object.keys(MARTYRDOMS)){
      MARTYRDOM._progress.increment([MARTYRDOMS[m]]);
    }
  },

  change_colors: function() {
    PALETTE.factory.make_new();
  },

  glitch: function() {
    GLITCH.screen.glitch();
  },

  force_observer_effect: function(){
    GLITCH.berkeley.make_god_observer();
  },

  menu: function() {
    new CenteredTextMenu("Miracles",
                  [
                    {"text": "Run faster", "effect": THAUMATURGY.run_faster},
                    {"text": (THAUMATURGY.teleport? "Dea" : "A") + "ctivate teleport", "effect": THAUMATURGY.toggle_teleport},
                    {"text": (THAUMATURGY.smite? "Dea" : "A") + "ctivate smiting", "effect": THAUMATURGY.toggle_smiting},
                    TEXTMENU_EMPTYROW,
                    {"text": "Fast travel", "effect": THAUMATURGY.menu_fast_travel},
                    {"text": "Summon", "effect": THAUMATURGY.menu_summon},
                    TEXTMENU_EMPTYROW,
                    {"text": "Change colors", "effect": THAUMATURGY.change_colors},
                    {"text": "Glitch", "effect": THAUMATURGY.glitch},
                    {"text": "Remove fog", "effect": THAUMATURGY.remove_fog},
                    {"text": "Remove camera lock", "effect": THAUMATURGY.remove_camera_lock},
                    {"text": "Force observer effect", "effect": THAUMATURGY.force_observer_effect},
                    TEXTMENU_EMPTYROW,
                    {"text": "Get all items", "effect": THAUMATURGY.get_all_items},
                    {"text": "Get all abilities", "effect": THAUMATURGY.get_all_abilities},
                    {"text": "Get all party members", "effect": THAUMATURGY.get_all_party_members},
                    {"text": "Boost martyrdom", "effect": THAUMATURGY.boost_martyrdom},

                    TEXTMENU_EMPTYROW,
                    {"text": "Go to White Space", "effect": GENERATEDLEVELS.blank.setup},
                    {"text": "Back to game", "effect": "##CLOSE"}
                 ]);
  },

  menu_fast_travel: function(){
    var menu_options =
    [
      {"text": "Nowhere", "effect": "##CLOSE"},
      TEXTMENU_EMPTYROW,
    ];

    var effectFunction = function(destination){
      var setup =  function(){
        GLITCH.screen.glitch(true);
        CURRENTLEVEL.setup(destination);
      };

      if(!["010_world_map", "050_hell_map"].includes(destination)){
        return function(){
          TextBannerSequence.make([
            RANDOM.pick([
              `The decor fades around you as you teleport to your destination.`,
              `The world starts spinning around you and you need to close your eyes to not get sick.`,
              `You concentrate and manipulate the fabric of the universe to change your location.`,
            ]),
            RANDOM.pick([
              `Everyone screams in panic when you appear in the middle of the town, but before long life has taken back its course.`,
              `Citizens watch you in terror as you pop into existence unnaturally in the middle of the city.`,
              `Everyone around is traumatized by your sudden appearance out of thin air. Children are crying, villagers are screaming, priests are calling for heresy sanctions. It takes a while before the town is back to its normal state.`,
            ]),
          ], setup);
        }
      }

      return setup;
    };

    var add_destination = function(name, destination){
      menu_options.push(
        {"text": name, "effect": function(){ var f = effectFunction(destination); f();}}
      );
    };

    add_destination(DICTIONARY.get("town_1"), "005_town1");
    add_destination(DICTIONARY.get("town_2"), "020_town2");
    add_destination(DICTIONARY.get("town_3"), "040_town3");
    add_destination(DICTIONARY.get("town_4"), "021_town4");
    add_destination(DICTIONARY.get("town_5"), "022_town5");
    add_destination("World map", "010_world_map");
    add_destination("Hell", "050_hell_map");

    new CenteredTextMenu("Fast travel to...", menu_options);
  },

  menu_summon_sub: function(category){
    var menu_options = [];
    var simpleConstructor = function(constructorName){
      var pos = CURRENTLEVEL.io.get_front_location(0.4);
      eval (`new ${constructorName}(${pos[0]}, ${pos[1]});`);
      GLITCH.screen.glitch(true);
    };
    var prefixConstructor = function(prefix){
      var pos = CURRENTLEVEL.io.get_front_location(0.4);
      eval (`${prefix} ${pos[0]}, ${pos[1]});`);
      GLITCH.screen.glitch(true);
    };

    var create_menu_option = function(constructorName, fullName){
      var name = constructorName.split("_");
      if(name.length > 1){
        fullName = fullName || name[1];
      } else {
        fullName = fullName || name[0];
      }
      var effect;
      if(constructorName.includes("(")){
        effect = function(){ prefixConstructor(constructorName); };
      } else {
        effect = function(){ simpleConstructor(constructorName); };
      }

      menu_options.push({"text": fullName, "effect": effect});
    };
    var simple_options = [];
    var complex_options = [];
    switch(category){
      case "Interior":
        simple_options = ["S_Column", "S_Door", "S_RoyalThrone", "S_SavePoint", "B_Statue", "B_Bed", "B_Bucket", "B_Cabinet_wall", "B_Chair", "B_Hay", "B_Housefire", "B_Jar", "B_Shelf_wall", "B_Stool", "B_Table", "B_Table_Set", "B_Chest", "B_AlchemyShelf_wall", "B_Barrel", "B_Bocals", "B_Box", "B_Chimney_wall", "B_Clock_wall", "B_Papers", "B_Sack", "B_FancyShelf_wall", "B_Candles_wall", "B_Window_wall", "B_CurtainedWindow_wall", "B_WeaponRack", "B_ShieldDisplay_wall", "B_WeaponDisplay_wall", "B_Bottles", "B_BottlesShelf_wall", "B_FlowerCrown_wall", "B_PottedFlower", "B_PottedPlant", "B_Mask_wall", "B_SpikyMask_wall", "B_Rope", "S_Armor","S_Candle","S_Organ","S_Throne","S_Bocals","S_Painting_wall","S_HellWindow_wall","S_Flag_wall","S_Mirror_wall"      ];
        break;
      case "Decor":
        simple_options = ["S_Tree", "S_TreeSad", "S_TreePalm", "S_Vine", "S_Plant", "S_Shroomgiant", "S_Shroomsmall", "S_Shroomtall", "S_PlantSmall", "S_AlgaeWall", "S_Anemone", "S_Coral", "S_Seashell", "S_Seashellpointy", "S_Waterplants", "S_WaterPlantWall", "S_BubblePlant", "S_TentaPlant", "S_TentaPlantMini", "S_Planks", "S_Pebbles", "S_RocksHuge", "S_Rocks1", "S_Rocks2", "S_Rocks3", "S_Rocks4", "S_Boulder", "S_Rubble", "S_RubbleLarge", "S_Web", "S_WebLarge", "S_RockColumn", "S_CristalBig", "S_CristalSmall", "S_CristalTiny", "S_RockLump", "S_CristalFragment", "S_Caveplant", "S_Cavesprouts", "S_Hole", "S_Rootstall", "S_Root", "S_HellPlantLeaning", "S_HellPlantSretching", "S_HellPlantSlimy", "S_HellPlantLoops", "S_Spike", "S_HellEgg", "S_Cloud", "S_Waterfall"    ];
        break;
      case "Special":
        simple_options = ["S_Castle", "S_Casern", "S_Church", "S_Manor", "S_Beelzebub", "S_Maou", "S_RockColumnGoddess", "SE_gem", "S_GameBoard"         ];
        break;
      case "Villagers":
        complex_options = [
          {prefix: `new M_Villager("${CITIES.hope}",`, name: "Expectations"},
          {prefix: `new M_Villager("${CITIES.fear}",`, name: "Fear"},
          {prefix: `new M_Villager("${CITIES.denial}",`, name: "Denial"},
          {prefix: `new M_Villager("${CITIES.indulgence}",`, name: "Indulgence"},
          {prefix: `new M_Villager("${CITIES.acceptance}",`, name: "Acceptance"},
          {prefix: `new M_Villager("${CITIES.mourning}",`, name: "Mourning"}
        ];
        break;
      default:
        menu_options.push({"text": "Back to game", "effect": "##CLOSE"});
        break;
    }

    for(var i of simple_options){
      create_menu_option(i);
    }
    for(var i of complex_options){
      create_menu_option(i.prefix, i.name);
    }

    new CenteredTextMenu("Summon " + category, menu_options);
  },

  menu_summon: function(){
    new CenteredTextMenu("Summon",
                [
                  {"text": "Villagers", "effect": function() { THAUMATURGY.menu_summon_sub("Villagers"); }},
                  {"text": "Interior", "effect": function() { THAUMATURGY.menu_summon_sub("Interior"); }},
                  {"text": "Decor", "effect": function() { THAUMATURGY.menu_summon_sub("Decor"); }},
                  {"text": "Special", "effect": function() { THAUMATURGY.menu_summon_sub("Special"); }},
                  TEXTMENU_EMPTYROW,
                  {"text": "Nothing", "effect": "##CLOSE"}
               ]);
  },

  react_to_click: function(x,y) {
    if (THAUMATURGY.teleport && IO.interface._can_open_escape_menu()){
      CHARACTER.character.destroy();
      CHARACTER.initialize(x, y);
      GLITCH.screen.glitch(true);
    }

    if(THAUMATURGY.smite && IO.interface._can_open_escape_menu()){
      var obj = CURRENTLEVEL.io.select_interactible_at(x,y);
      if(obj) {
        obj.destroy();
        GLITCH.screen.glitch(true);
      }
    }
  },
}
