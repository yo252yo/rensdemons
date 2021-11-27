// ===================
// =================== INITIALIZATION
// ===================
var battle = "_060/_screen";
var turnoff =  `Shutting down...`;

AUDIO.music.interface.boss();


var log = HTML.div.make({w:"100%", h:"55%", z:10000, margin: 10, position: "fixed"});
log.style.color = PALETTE.color("background").code();
log.innerHTML = "<strong>[RENS DEMONS] @ JS CONSOLE</strong><br/>";
log.style.visibility = "hidden";
CURRENTLEVEL.system.html().appendChild(log);

var logcontent = document.createElement("textarea");
logcontent.style.position = "relative";
logcontent.style.height = "47%";
logcontent.style.width = "80%";
logcontent.style.margin = "10px";
logcontent.style.fontSize = "large";
logcontent.style.background = "black";
logcontent.style.border = "1px white solid";
logcontent.style.color = "white";
logcontent.readOnly = true;
log.appendChild(logcontent);

var logform = HTML.div.make({position:"relative"});
log.appendChild(logform);
logform.innerHTML = `
  <form action='javascript:execute()'>
  &gt; <input type="text" id='terminal_entry' style="margin:10px;width:70%;color:white;background:black;" placeholder="TYPE COMMAND" />
  <input type="submit" value="EXECUTE" /></form>
`;

var execute = function(){
  var content = document.getElementById('terminal_entry').value;
  try {
    var result = eval(content);
  } catch(e){
    var result = e.toString();
  }
  if(result == {}) {
    result = "[INVALID INPUT]";
  } else if (typeof result == 'object'){
    result = "[OBJECT]" + JSON.stringify(result);
  }

  updatelog(">> " + content);
  updatelog(result);
  document.getElementById('terminal_entry').value = "";
  return false;
}

var updatelog = function (msg){
  if(typeof msg == "string" && msg) {
    if(msg.startsWith(">")){
      CONSOLE.input(msg);
    } else {
      CONSOLE.log.level(msg);
    }
  }
  logcontent.innerHTML = getLogs();
  logcontent.scrollTop = logcontent.scrollHeight;
}

var getLogs = function (){
  var l = [];
  for (var log in CONSOLE.logs){
   l.push(CONSOLE.logs[log]);
 }
 return l.slice(l.length-1000).join("\n");
}


var unlock_terminal_show = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Display console",
  unlock: true,
  function: function (){
    updatelog("> Displaying console log");
    updatelog("Connection to the simulation established.");
    updatelog("#################################");
    updatelog("#   UNIVERSE ENGINE gOd-S 1.0   #");
    updatelog("#  AWAITING USER INPUT COMMAND  #");
    updatelog("#     TYPE help() FOR HELP      #");
    updatelog("#################################");
    log.style.visibility = "visible";
    IO.key_interceptor.deactivate();
    document.getElementById('terminal_entry').focus();
  }
});

var unlock_terminal_hide = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Hide console",
  unlock: true,
  function: function (){
    updatelog("> Hiding console log");
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
    updatelog("> Exiting terminal");
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
