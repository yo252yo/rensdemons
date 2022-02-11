
const THAUMATURGY = {
  teleport: false,

  is_visible: function(){
    return STATS.ending(ENDINGS.God);
  },

  activate_teleport: function() {
    THAUMATURGY.teleport = true;
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
                    {"text": "Activate teleport", "effect": THAUMATURGY.activate_teleport},
                    {"text": "Glitch", "effect": THAUMATURGY.glitch},
                    {"text": "Run faster", "effect": THAUMATURGY.run_faster},
                    TEXTMENU_EMPTYROW,
                    {"text": "Change colors", "effect": THAUMATURGY.change_colors},
                    {"text": "Remove camera lock", "effect": THAUMATURGY.remove_camera_lock},
                    {"text": "Remove fog", "effect": THAUMATURGY.remove_fog},
                    TEXTMENU_EMPTYROW,
                    {"text": "Get all items", "effect": THAUMATURGY.get_all_items},
                    {"text": "Get all party members", "effect": THAUMATURGY.get_all_party_members},
                    {"text": "Get all abilities", "effect": THAUMATURGY.get_all_abilities},

                    TEXTMENU_EMPTYROW,
                    {"text": "Back to game", "effect": "##CLOSE"}
                 ]);
  },
}
