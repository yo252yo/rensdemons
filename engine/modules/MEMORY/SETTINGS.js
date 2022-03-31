
var _DEFAULT = {
  challenge_level: 0.5,
  volume_music: 0.3,
  volume_sfx: 0.7,
  battleorder: 'exploit',
  fast_text_display: false
};

const SETTINGS = {
  _SETTINGS: {},

  has: function(key){
    return (key in SETTINGS._SETTINGS);
  },

  get: function(key) {
    return SETTINGS._SETTINGS[key] || _DEFAULT[key];
  },

  set: function(key, value) {
    SETTINGS._SETTINGS[key] = value;
    // dont save to disk, its in the save
    //    DISK.write("DICTIONARY");
  },

  factory: {
    make_new: function() {
      SETTINGS._SETTINGS = _DEFAULT;
      DISK.write("SETTINGS");
    },

    export: function() {
      return SETTINGS._SETTINGS;
    },

    import: function(save) {
      SETTINGS._SETTINGS = save;
    },
  },


  options_menu: function() {

    var options = [
      {"text": "Change color scheme", "effect": function(){ PALETTE.factory.make_new(); }, "keep_open": true},
      TEXTMENU_EMPTYROW,
      {"text": "Back", "effect": "##BACK"}
    ];

    if (THAUMATURGY.is_visible() && SCREEN.is_mobile()){
      options.push(TEXTMENU_EMPTYROW);
      options.push({"text": "<i style='opacity:0.2;'>console.js</i>", "effect": function(){ BATTLE.api.make("_060/_screen"); }});
    }

    new CenteredTextMenu(`
                 <h3>Audio</h3>
                 <b>Music</b>: <input type="range" min="1" max="100" value="` + (SETTINGS.get('volume_music') * 100) + `" class="slider" id="myRange1" onInput="AUDIO.set_volume('volume_music', this.value/100);"><br />
                 <b>Effects</b>: <input type="range" min="1" max="100" value="` + (SETTINGS.get('volume_sfx') * 100) + `" class="slider" id="myRange2" onInput="AUDIO.set_volume('volume_sfx', this.value/100);">

                 <h3>Battles</h3>
                 <b>Challenge</b>: <input type="range" min="1" max="100" value="` + (SETTINGS.get('challenge_level') * 100) + `" class="slider" id="myRange3" onInput="SETTINGS.set('challenge_level', this.value/100);"><br />
                 <b>Commands</b>:<select onChange="SETTINGS.set('battleorder', this.value);">>
                   <option value="explore" ${SETTINGS.get('battleorder') == "explore" ? "SELECTED" : ""}>Unexplored first</option>
                   <option value="exploit" ${SETTINGS.get('battleorder') == "exploit" ? "SELECTED" : ""} >Winning first</option>
                   </select>

                 <h3>Dialogs</h3>
                 <b>Instant display</b>: <input type="checkbox" ` + (SETTINGS.get('fast_text_display')? "checked='true'": "") + ` onChange="SETTINGS.set('fast_text_display', this.checked);"><br />
                 `, options);
  },

}
