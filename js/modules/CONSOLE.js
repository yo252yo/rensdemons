
const CONSOLE = {
  logs: [],

  _sys_log: function(t, color, extra_style) {
    if (!color) {
      color = "#AAAAAA";
    }
    CONSOLE.logs.push(t);
    console.log("%c " + t, "color:" + color + ";font-style: italic;" + extra_style);
  },

  debug: function(t, color) {
    if (!color) {
      color = "#006666";
    }
    CONSOLE._sys_log(t, color);
  },

  error: function(t) {
    CONSOLE._sys_log(t, "Red", "font-weight:bold;");
  },

  stack_trace: function() {
    throw "Stack trace print request";
  },

  log: {
    import: function(name) {
      CONSOLE._sys_log(">> Loaded " + name, "DarkGray");
    },

    ability: function(operation) {
      CONSOLE._sys_log("# Ability " + operation, "LightBlue");
    },

    setup: function(name) {
      CONSOLE._sys_log("- Setup " + name, "LightGray");
    },

    disk: function(operation){
      CONSOLE._sys_log(". Disk state updated: " + operation, "DarkGreen");
    },

    save: function(operation){
      CONSOLE._sys_log("$ " + operation, "Green");
    },

    event : function(operation){
      CONSOLE._sys_log("- Event " + operation, "Orange");
    },

  },
};
