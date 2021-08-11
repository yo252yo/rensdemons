// ===================
// =================== INITIALIZATION
// ===================
var battle = "_demo/_screen";
var turnoff =  `Shutting down...`;

var log = HTML.div.make({w:"100%", h:"100%", z:10000});
log.style.color = PALETTE.color("background").code();
log.innerHTML = "";
log.style.visibility = "hidden";
CURRENTLEVEL.system.html().appendChild(log);

var execute = function(){
  var content = document.getElementById('terminal_entry').value;
  try {
    var result = eval(content);
  } catch(e){
    var result = e;
  }
  if (typeof result === 'object'){
    result = "[OBJECT]" + JSON.stringify(result);
  }

  updatelog(content);
  updatelog(result);
  document.getElementById('terminal_entry').value = "";
}

var updatelog = function (msg){
  if(msg) {
    CONSOLE.log.level(msg);
  }
  log.innerHTML =  `<strong>[RENS DEMONS ENGINE] @ JAVASCRIPT CONSOLE</strong><br /><form onsubmit='execute()'>
  <input type="text" id='terminal_entry' style="margin:10px;width:70%" />
  <input type="submit" /></form>
  <br />` + getLogs();
}

var getLogs = function (){
  var l = [];
  for (var log in CONSOLE.logs){
   l.push(CONSOLE.logs[log]);
 }
 return l.reverse().join("<br />");
}


var man = function(){
  updatelog("Displaying manual page");
  alert("man");
}

var win = function(){
  CURRENTLEVEL.setup("demo/end");
}


var unlock_terminal_show = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Display console",
  unlock: true,
  function: function (){
    updatelog("Displaying console log");
    log.style.visibility = "visible";
    IO.key_interceptor.deactivate();
  }
});

var unlock_terminal_hide = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Hide console",
  unlock: true,
  function: function (){
    updatelog("Hiding console log");
    log.style.visibility = "hidden";
    IO.key_interceptor.activate();
  }
});

var unlock_man = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "MANual page",
  unlock: true,
  function: function () {
    man();
  }
});

var unlock_exit = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Exit",
  unlock: true,
  outcome: BATTLETREE.ESCAPE,
  description: turnoff,
  extra_function: function (){
    updatelog("Exiting terminal");
    log.style.visibility = "hidden";
    IO.key_interceptor.activate();
  }
});


PLAYER_ACTIONS.add({
  name: "Abort",
  outcome: BATTLETREE.ESCAPE,
  unlock: true,
  description: turnoff,
});

PLAYER_ACTIONS.add({
  name: "Retry",
  unlock: true,
  description: ["CONNECTION ESTABLISHED.<br />MAIN MENU."],
  extra_function: function(){
    BATTLETREE.api.lock(battle, "Abort");
    BATTLETREE.api.lock(battle, "Fail");
    unlock_terminal_show("Retry");
    unlock_terminal_hide("Retry");
    unlock_exit("Retry");
    unlock_man("Retry");
  }
});

PLAYER_ACTIONS.add({
  name: "Fail",
  outcome: BATTLETREE.ESCAPE,
  unlock: true,
  description: turnoff,
});


// ===================
// =================== START
// ===================
BATTLE.operations.start("EXECUTION IN PROGRESS.<br />FAILED TO CONNECT TO THE SIMULATION.");
