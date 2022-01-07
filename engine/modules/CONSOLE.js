
const CONSOLE = {
  logs: [],

  _log: function(t, color, extra_style) {
    var style = extra_style;
    if (color) {
      style = "color:" + color + ";" + style;
    }
    CONSOLE.logs.push(t);
    console.log("%c " + t, style);
  },

  _sys_log: function(t, color, extra_style) {
    CONSOLE._log(t, color || "#AAAAAA", "font-style: italic;" + extra_style);
  },

  _speech: function(t, color, extra_style) {
    CONSOLE._log(t, color || "#000000", "font-weight:bold;" + extra_style);
  },

  error: function(t, with_trace, with_alert) {
    CONSOLE._sys_log(t, "Red", "font-weight:bold;");
    if(with_trace){
      CONSOLE.stack_trace();
    }
    if(with_alert){
      alert(t);
    }
  },

  stack_trace: function() {
    console.trace();
  },

  break: function() {
    throw "Break request";
  },


  log: {
    debug: function(t, color) {
      CONSOLE._sys_log(t, color || "#a64b9b");
    },

// ===================
//hack System
// ===================

    setup: function(name) {
      CONSOLE._sys_log(". Level setup: " + name);
    },

    save: function(operation){
      CONSOLE._sys_log(". " + operation);
    },

// ===================
//hack Disabled system
// ===================

    import: function(name) {
      //CONSOLE._sys_log(". Import " + name);

      var bar = document.getElementById("loading_bar");
      var logs = document.getElementById("loading_log");
      if(bar){
        bar.innerHTML += "|";
      }
      if (logs){
        logs.innerHTML += "<br />>> Loaded " + name.substr(15);
      }
    },

    disk: function(operation){
      //CONSOLE._sys_log(". Disk updated: " + operation);
    },

    io: function(operation){
      //CONSOLE._sys_log("]IO: " + operation, "Orange");
    },

    event: function(operation){
      //CONSOLE._sys_log("- Event: " + operation, "#86adad");
    },

    levelstate: function(name) {
      //CONSOLE._sys_log(": " + name);
    },

// ===================
//hack Baggage log
// ===================

    abilities: function(operation){
      CONSOLE._sys_log("(Ability) " + operation, "#7daaab");
    },

    item: function(name, quantity, set){
      var s = " ";
      if (quantity > 0){ s = " +";}
      if (set){ s += "(SET)"; }
      CONSOLE._sys_log("(Item) " + name + s + quantity, "#7daaab");
    },

    party: function(operation){
      CONSOLE._sys_log("(Party) " + operation, "#7daaab");
    },

    flag: function(operation){
      CONSOLE._sys_log("(Flag) " + operation, "#7daaab");
    },

    battletree: function(operation) {
      CONSOLE._sys_log("(Action) " + operation, "#8aa68a");
    },

// ===================
//hack Backside
// ===================

    input: function(t) {
      CONSOLE._sys_log(STRING_UTILS.datedString(t), "Blue", "font-weight:bold;");
    },

    herald: function(operation){
      CONSOLE._speech(`A herald proclaims: "Hear, hear! ${operation}"`);
    },

    thoughts: function(name, thought){
      var verb = RANDOM.pick(["thinks", "thinks", "thinks", "whispers", "sighs", "mumbles", "mutters", "murmurs", "broods", "daydreams", "reflects", "ponders", "ruminates"]);
      CONSOLE._speech(`${name} ${verb}: "${thought}"`);
    },
  },
};
