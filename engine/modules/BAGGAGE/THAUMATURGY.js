
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

  change_colors: function() {
    PALETTE.factory.make_new();
  },

  glitch: function() {
    GLITCH.screen.glitch();
  },

  menu: function() {
    new CenteredTextMenu("Miracles",
                  [
                    {"text": "Run faster", "effect": THAUMATURGY.run_faster},
                    {"text": (THAUMATURGY.teleport? "Dea" : "A") + "ctivate teleport", "effect": THAUMATURGY.toggle_teleport},
                    {"text": (THAUMATURGY.smite? "Dea" : "A") + "ctivate smiting", "effect": THAUMATURGY.toggle_smiting},
                    TEXTMENU_EMPTYROW,
                    {"text": "Change colors", "effect": THAUMATURGY.change_colors},
                    {"text": "Glitch", "effect": THAUMATURGY.glitch},
                    {"text": "Remove fog", "effect": THAUMATURGY.remove_fog},
                    {"text": "Remove camera lock", "effect": THAUMATURGY.remove_camera_lock},
                    TEXTMENU_EMPTYROW,
                    {"text": "Get all items", "effect": THAUMATURGY.get_all_items},
                    {"text": "Get all abilities", "effect": THAUMATURGY.get_all_abilities},
                    {"text": "Get all party members", "effect": THAUMATURGY.get_all_party_members},
                    TEXTMENU_EMPTYROW,
                    {"text": "Go to White Space", "effect": GENERATEDLEVELS.blank.setup},

                    TEXTMENU_EMPTYROW,
                    {"text": "Back to game", "effect": "##CLOSE"}
                 ]);
  },

  react_to_click: function(x,y) {
    if (THAUMATURGY.teleport && IO.interface._can_open_escape_menu()){
      CHARACTER.character.destroy();
      CHARACTER.initialize(x, y);
    }

    if(THAUMATURGY.smite && IO.interface._can_open_escape_menu()){
      var obj = CURRENTLEVEL.io.select_interactible_at(x,y);
      if(obj) {
        obj.destroy();
        GLITCH.screen.glitch();
      }
    }
  },
}
