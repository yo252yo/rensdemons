
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
    level: function(name) {
      CONSOLE._sys_log(": " + name, "Pink");
    },

    import: function(name) {
      //CONSOLE._sys_log(">> Loaded " + name, "DarkGray");
      var bar = document.getElementById("loading_bar");
      var logs = document.getElementById("loading_log");
      if(bar){
        bar.innerHTML += "|";
      }
      if (logs){
        logs.innerHTML += "<br />>> Loaded " + name.substr(15);
      }
    },

    battletree: function(operation) {
      CONSOLE._sys_log("# Action " + operation, "LightBlue");
    },

    setup: function(name) {
      CONSOLE._sys_log("- Setup level " + name, "LightGray");
    },

    disk: function(operation){
      CONSOLE._sys_log(". Disk state updated: " + operation, "DarkGreen");
    },

    save: function(operation){
      CONSOLE._sys_log("$ " + operation, "Green");
    },

    event : function(operation){
      CONSOLE._sys_log("- Event " + operation, "Purple");
    },

    abilities : function(operation){
      CONSOLE._sys_log(") Ability: " + operation, "Yellow");
    },

    io : function(operation){
      CONSOLE._sys_log("]IO: " + operation, "Orange");
    },

    battle : function(operation){
      CONSOLE._sys_log(". " + operation, "Pink");
    },

    item : function(name, quantity){
      var s = " ";
      if (quantity > 0){ s = " +";}
      CONSOLE._sys_log("} Item stock modification: " + name + s + quantity, "Orange");
    },

    party : function(operation){
      CONSOLE._sys_log(")) Party: " + operation, "Brown");
    },
  },
};
