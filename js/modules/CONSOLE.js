
const CONSOLE = {
  logs: [],

  sys_log: function(t) {
    this.logs.push(t);
    console.log("%c " + t, "color:#AAAAAA;font-style: italic;");
  },
};
