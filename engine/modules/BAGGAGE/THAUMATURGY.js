
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
    var ft =
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
      ft.push(
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

    new CenteredTextMenu("Fast travel to...", ft);
  },

  menu_summon_sub: function(category){
    var ft = [];
    var effectFunction = function(constructorName){
      var pos = CURRENTLEVEL.io.get_front_location(0.4);
      eval (`new ${constructorName}(${pos[0]}, ${pos[1]});`);
      GLITCH.screen.glitch(true);
    };

    var add_destination = function(constructorName){
      var name = constructorName.split("_");
      if(name.length > 1){
        name = name[1];
      } else {
        name = name[0];
      }
      ft.push(
        {"text": name, "effect": function(){ effectFunction(constructorName); }}
      );
    };
    var options = [];
    switch(category){
      case "Interior":
        options = ["S_Column", "S_Door", "S_RoyalThrone", "S_SavePoint", "B_Statue", "B_Bed", "B_Bucket", "B_Cabinet_wall", "B_Chair", "B_Hay", "B_Housefire", "B_Jar", "B_Shelf_wall", "B_Stool", "B_Table", "B_Table_Set", "B_Chest", "B_AlchemyShelf_wall", "B_Barrel", "B_Bocals", "B_Box", "B_Chimney_wall", "B_Clock_wall", "B_Papers", "B_Sack", "B_FancyShelf_wall", "B_Candles_wall", "B_Window_wall", "B_CurtainedWindow_wall", "B_WeaponRack", "B_ShieldDisplay_wall", "B_WeaponDisplay_wall", "B_Bottles", "B_BottlesShelf_wall", "B_FlowerCrown_wall", "B_PottedFlower", "B_PottedPlant", "B_Mask_wall", "B_SpikyMask_wall", "B_Rope"];
        break;
      default:
        ft.push({"text": "Back to game", "effect": "##CLOSE"});
        break;
    }

    for(var i of options){
      add_destination(i);
    }

    new CenteredTextMenu("Summon " + category, ft);
  },

  menu_summon: function(){
    new CenteredTextMenu("Summon",
                [
                  {"text": "Interior", "effect": function() { THAUMATURGY.menu_summon_sub("Interior"); }},

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
