
const CONSOLE = {
  logs: [],

  sys_log: function(t) {
    CONSOLE.logs.push(t);
    console.log("%c " + t, "color:#AAAAAA;font-style: italic;");
  },
};
