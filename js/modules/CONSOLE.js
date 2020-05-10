
const CONSOLE = {
  logs: [],

  sys_log: function(t) {
    CONSOLE.logs.push(t);
    console.log("%c " + t, "color:#AAAAAA;font-style: italic;");
  },

  debug: function(t, color) {
    if (!color) {
      color = "#006666";
    }
    CONSOLE.logs.push(t);
    console.log("%c " + t, "color:" + color + ";font-style: italic;");
  },

  error: function(t) {
    CONSOLE.logs.push(t);
    console.log("%c " + t, "color:#AA0000;");
  },
};
