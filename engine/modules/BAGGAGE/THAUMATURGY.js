
const THAUMATURGY = {
  teleport: false,
  smite: false,
  time_compression: 1,
  space_compression: 1,

  compress_space: function(factor){
    var f = THAUMATURGY.space_compression/factor;
    THAUMATURGY.space_compression = f;
    document.body.style.zoom = f;
    var range = document.getElementById("compressSpaceRange");
    if(range){
      range.value = 1/THAUMATURGY.space_compression * 100;
    }
    GLITCH.screen.glitch();
  },

  compress_time: function(factor){
    var f = THAUMATURGY.time_compression/factor;
    THAUMATURGY.time_compression = f;
    var range = document.getElementById("compressTimeRange");
    if(range){
      range.value = 1/THAUMATURGY.time_compression * 100;
    }
    GLITCH.screen.glitch();
  },

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
      if (PARTYMEMBERS[i] != PARTYMEMBERS.Ren){
        PARTY.add(PARTYMEMBERS[i]);
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

  display_events: function() {
    var objects = CURRENTLEVEL.objects.get_all_objects();
    for(var i in objects) {
      if (objects[i] && objects[i].draw_display_name) {
        objects[i].draw_display_name();
      }
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
    var spaceCompression = `<b>Space compression</b>: <input type="button" value="-" onClick="THAUMATURGY.compress_space(0.95);"><input type="range" id="compressSpaceRange" min="10" max="200" value="` + (1/THAUMATURGY.space_compression * 100) + `" class="slider" id="myRange1" disabled="true"><input type="button" value="+" onClick="THAUMATURGY.compress_space(1.05);"><br />`;
    if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
      spaceCompression = "";
    }

    new CenteredTextMenu(`<h3>Miracles</h3>
    ${spaceCompression}
    <b>Time compression</b>: <input type="button" value="-" onClick="THAUMATURGY.compress_time(0.9);"><input type="range" id="compressTimeRange" min="10" max="500" value="` + (1/THAUMATURGY.time_compression * 100) + `" class="slider" id="myRange1" disabled="true"><input type="button" value="+" onClick="THAUMATURGY.compress_time(1.1);">
      `,
                  [
                    {"text": (THAUMATURGY.teleport? "Dea" : "A") + "llow blink through space", "effect": THAUMATURGY.toggle_teleport},
                    {"text": (THAUMATURGY.smite? "Dea" : "A") + "ctivate smiting", "effect": THAUMATURGY.toggle_smiting},
                    TEXTMENU_EMPTYROW,
                    {"text": "Fast travel", "effect": THAUMATURGY.menu_fast_travel},
                    {"text": "Go to White Space", "effect": GENERATEDLEVELS.blank.setup},
                    {"text": "Summon objects", "effect": THAUMATURGY.menu_summon},
                    TEXTMENU_EMPTYROW,
                    {"text": "Recolor reality", "effect": THAUMATURGY.change_colors},
                    {"text": "Glitch fabric of space-time", "effect": THAUMATURGY.glitch},
                    {"text": "Divinate event content", "effect": THAUMATURGY.display_events},
                    {"text": "Use clairvoyance", "effect": THAUMATURGY.remove_fog},
                    {"text": "Unlock astral projection", "effect": THAUMATURGY.remove_camera_lock},
                    {"text": "Create absolute observer", "effect": THAUMATURGY.force_observer_effect},
                    TEXTMENU_EMPTYROW,
                    {"text": "Summon all inventory items", "effect": THAUMATURGY.get_all_items},
                    {"text": "Conjure all party members", "effect": THAUMATURGY.get_all_party_members},
                    {"text": "Learn all abilities", "effect": THAUMATURGY.get_all_abilities},
                    {"text": "Acquire all martyrdoms", "effect": THAUMATURGY.boost_martyrdom},

                    TEXTMENU_EMPTYROW,
                    {"text": "Back to game", "effect": "##CLOSEWITHFOLLOW"}
                 ]);
  },

  menu_fast_travel: function(){
    var menu_options =
    [
      {"text": "Nowhere", "effect": "##CLOSEWITHFOLLOW"},
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
    var patternConstructor = function(pattern){
      var pos = CURRENTLEVEL.io.get_front_location(0.4);
      eval (pattern.replace('$x', pos[0]).replace('$y', pos[1]));
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
        effect = function(){ patternConstructor(constructorName); };
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
          {pattern: `new M_Villager("${CITIES.hope}", $x, $y, ${Math.random()});`, name: "Expectations"},
          {pattern: `new M_Villager("${CITIES.fear}", $x, $y, ${Math.random()});`, name: "Fear"},
          {pattern: `new M_Villager("${CITIES.denial}", $x, $y, ${Math.random()});`, name: "Denial"},
          {pattern: `new M_Villager("${CITIES.indulgence}", $x, $y, ${Math.random()});`, name: "Indulgence"},
          {pattern: `new M_Villager("${CITIES.acceptance}", $x, $y, ${Math.random()});`, name: "Acceptance"},
          {pattern: `new M_Villager("${CITIES.mourning}", $x, $y, ${Math.random()});`, name: "Mourning"}
        ];
        break;
      case "Shops":
        complex_options = [
          {pattern: `new M_Vendor($x, $y, 1, "${ITEMS_ARCHETYPES_NAMES.Alchemy}", 999999);`, name: "Alchemy vendor"},
          {pattern: `new M_Vendor($x, $y, 1, "${ITEMS_ARCHETYPES_NAMES.Tool}", 999999);`, name: "Tool vendor"},
          {pattern: `new M_Vendor($x, $y, 1, "${ITEMS_ARCHETYPES_NAMES.Weapon}", 999999);`, name: "Weapon vendor"},
          {pattern: `new M_Trainer($x, $y, 1, "${ABILITIES_ARCHETYPES_NAMES.Diplomat}", 999999);`, name: "Diplomat trainer"},
          {pattern: `new M_Trainer($x, $y, 1, "${ABILITIES_ARCHETYPES_NAMES.Element}", 999999);`, name: "Element trainer"},
          {pattern: `new M_Trainer($x, $y, 1, "${ABILITIES_ARCHETYPES_NAMES.Spirit}", 999999);`, name: "Spirit trainer"},
          {pattern: `new SM_Altar($x, $y, "${ITEMS_ARCHETYPES_NAMES.Alchemy}");`, name: "Alchemy altar"},
          {pattern: `new SM_Altar($x, $y, "${ITEMS_ARCHETYPES_NAMES.Tool}");`, name: "Tool altar"},
          {pattern: `new SM_Altar($x, $y, "${ITEMS_ARCHETYPES_NAMES.Weapon}");`, name: "Weapon altar"},
          {pattern: `new SM_Altar($x, $y, "${ABILITIES_ARCHETYPES_NAMES.Diplomat}");`, name: "Diplomat altar"},
          {pattern: `new SM_Altar($x, $y, "${ABILITIES_ARCHETYPES_NAMES.Element}");`, name: "Element altar"},
          {pattern: `new SM_Altar($x, $y, "${ABILITIES_ARCHETYPES_NAMES.Spirit}");`, name: "Spirit altar"}
        ];
        break;
      case "Monsters":
        var battle_names = ['trial/arachnid', 'trial/cockroach', 'trial/rodent', 'trial/viper', 'forests/boar', 'forests/flower', 'forests/fox', 'forests/mandragora', 'forests/morel', 'forests/nymph', 'forests/squirrel', 'forests/tree', 'forests/truffle', 'forests/trunk', 'mountains/chimera', 'mountains/emu', 'mountains/harpy', 'mountains/hawk', 'mountains/manticore', 'mountains/pterosaur', 'caves/bat', 'caves/bloodsucker', 'caves/crawler', 'caves/mole', 'caves/scorpion', 'caves/slime', 'waters/anemone', 'waters/anglerjelly', 'waters/crab', 'waters/jellyfish', 'waters/mermaid', 'waters/naiad', 'waters/octopus', 'waters/squid', 'waters/triton', 'world/arsonist', 'world/bruiser', 'world/butcher', 'world/djinn', 'world/ghost', 'world/goblin', 'world/grizzly', 'world/knight', 'world/mammoth', 'world/mummy', 'world/skeleton', 'world/vadhaka', 'world/wraith', 'heaven/angel', 'heaven/cherub', 'heaven/maneki', 'heaven/ponpon', 'heaven/raijuu', 'heaven/seraph', 'heaven/valkyrie', 'hell/centipede', 'hell/devilfly', 'hell/eyeball', 'hell/hecatoncheir', 'hell/sandworm', 'hell/satyr', 'hell/serpentine', 'hell/toad', 'hell/warlock', 'pandemonium/abaddon', 'pandemonium/asmodeus', 'pandemonium/azazel', 'pandemonium/belial', 'pandemonium/belphegor', 'pandemonium/golem', 'pandemonium/hellhound', 'pandemonium/ifrit', 'pandemonium/mammon', 'pandemonium/titan' ];
        for(var b of battle_names){
          complex_options.push({pattern: `new SBattle($x, $y, "${b}");`, name: b});
        }
        break;
      case "Bosses":
        var battle_names = ['trial/basilisk', 'forests/blob', 'forests/fungus', 'mountains/dragon', 'mountains/phoenix', 'caves/lizard', 'caves/rhino', 'waters/serpent', 'waters/whale', 'pandemonium/lieutenant', 'pandemonium/lord'  ];
        for(var b of battle_names){
          complex_options.push({pattern: `new SBattle($x, $y, "${b}");`, name: b});
        }
        break;
      case "Floors":
        complex_options = [
          {pattern: `new S_Floor($x-50, $y+50, 100, 100);`, name: "Empty"},
          {pattern: `new S_WoodFloor($x-50, $y+50, 100, 100);`, name: "Wood"},
          {pattern: `new S_SandFloor($x-50, $y+50, 100, 100);`, name: "Sand"},
          {pattern: `new S_LushFloor($x-50, $y+50, 100, 100);`, name: "Lush"},
          {pattern: `new S_MudFloor($x-50, $y+50, 100, 100);`, name: "Mud"},
          {pattern: `new S_CloudFloor($x-50, $y+50, 100, 100);`, name: "Cloud"},
          {pattern: `new S_GooFloor($x-50, $y+50, 100, 100);`, name: "Goo"},
          {pattern: `new S_WebFloor($x-50, $y+50, 100, 100);`, name: "Web"},
          {pattern: `new S_RockFloor($x-50, $y+50, 100, 100);`, name: "Rock"},
          {pattern: `new S_LavaFloor($x-50, $y+50, 100, 100);`, name: "Lava"},
          {pattern: `new S_TilingFloor($x-50, $y+50, 100, 100);`, name: "Tiling"},
          {pattern: `new S_CastleFloor($x-50, $y+50, 100, 100);`, name: "Castle"},
          {pattern: `new S_SeaFloor($x-50, $y+50, 100, 100);`, name: "Sea"},
          {pattern: `new S_MapFloor($x-50, $y+50, 100, 100);`, name: "Map"},
          {pattern: `new S_AntiFloor($x-50, $y+50, 100, 100);`, name: "Antifloor"},
        ];
        break;
      default:
        menu_options.push({"text": "Back to game", "effect": "##CLOSEWITHFOLLOW"});
        break;
    }

    for(var i of simple_options){
      create_menu_option(i);
    }
    for(var i of complex_options){
      create_menu_option(i.pattern, i.name);
    }

    new CenteredTextMenu("Summon " + category, menu_options);
  },

  menu_summon: function(){
    new CenteredTextMenu("Summon",
                [
                  {"text": "Monsters", "effect": function() { THAUMATURGY.menu_summon_sub("Monsters"); }},
                  {"text": "Bosses", "effect": function() { THAUMATURGY.menu_summon_sub("Bosses"); }},
                  {"text": "Villagers", "effect": function() { THAUMATURGY.menu_summon_sub("Villagers"); }},
                  {"text": "Shops", "effect": function() { THAUMATURGY.menu_summon_sub("Shops"); }},
                  {"text": "Floors", "effect": function() { THAUMATURGY.menu_summon_sub("Floors"); }},
                  {"text": "Interior", "effect": function() { THAUMATURGY.menu_summon_sub("Interior"); }},
                  {"text": "Decor", "effect": function() { THAUMATURGY.menu_summon_sub("Decor"); }},
                  {"text": "Special", "effect": function() { THAUMATURGY.menu_summon_sub("Special"); }},
                  TEXTMENU_EMPTYROW,
                  {"text": "Nothing", "effect": "##CLOSEWITHFOLLOW"}
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
