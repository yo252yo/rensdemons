// ===================
// =================== INITIALIZATION
// ===================
var battle = "_060/_screen";
var turnoff =  `Shutting down...`;

AUDIO.music.interface.introduction();

// ===================
//hack LOG
// ===================

var log = HTML.div.make({w:"100%", h:"55%", z:10000, margin: 10, position: "fixed"});
log.style.color = PALETTE.color("background").code();
log.innerHTML = "<strong>[RENS DEMONS] @ JS CONSOLE</strong><br/>";
log.style.visibility = "hidden";
CURRENTLEVEL.system.html().appendChild(log);

var logcontent = document.createElement("textarea");
logcontent.style.position = "relative";
logcontent.style.width = "80%";
logcontent.style.margin = "10px";
logcontent.style.fontSize = "large";
logcontent.style.background = "black";
logcontent.style.border = "1px white solid";
logcontent.style.color = "white";
logcontent.id = "logcontent";
logcontent.readOnly = true;
log.appendChild(logcontent);

if(SCREEN.is_mobile()){
  document.getElementById("logcontent").style.height = "45%";
} else {
  document.getElementById("logcontent").style.height = "80%";
}

var logform = HTML.div.make({position:"relative"});
log.appendChild(logform);
logform.innerHTML = `
  <form action='javascript:executelog()'>
  &gt; <input type="text" id='terminal_entry' style="margin:10px;width:70%;color:white;background:black;" placeholder="TYPE COMMAND" />
  <input type="submit" value="EXECUTE" /></form>
`;


var executelog = function(){
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
  if(msg) {
    if(typeof msg == "string" && msg.startsWith(">")){
      CONSOLE.log.input(msg);
    } else {
      CONSOLE.log.debug(msg);
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




// ===================
//hack FRAME
// ===================



var frame_container = HTML.div.make({w:"95%", h:"55%", z:10000, margin: 10, position: "fixed"});
//frame_container.style.background = "red";
frame_container.innerHTML = `<iframe id="iframe" src="https://www.yo252yo.com/rd/man.md" title="description" style="width:100%;background:white;">test</iframe>`;
frame_container.style.visibility = "hidden";
CURRENTLEVEL.system.html().appendChild(frame_container);
if(SCREEN.is_mobile()){
  document.getElementById("iframe").style.height = "50%";
} else {
  document.getElementById("iframe").style.height = "90%";
}

var frameform = HTML.div.make({position:"relative"});
frame_container.appendChild(frameform);
frameform.style.color = PALETTE.color("background").code();
frameform.innerHTML = `
  <form action='javascript:executeframe()' style="font-weight:bold;">
  &gt; <input type="text" id='frame_entry' style="margin:10px;width:50%;color:white;background:black;" value="https://www.yo252yo.com/rd/man.md" />
  <input type="submit" value="ENTER" /> or
  <input type="submit" onclick="openframe();" value="OPEN" /> (recommended in case of loading error).
  </form>
`;


var executeframe = function(){
  var content = document.getElementById('frame_entry').value;
  if(!content.startsWith("http")){
    content = "https://" + content;
    document.getElementById('frame_entry').value = content;
  }
  document.getElementById('iframe').src = content;
  return false;
}

var openframe = function(){
  var content = document.getElementById('frame_entry').value;
  if(!content.startsWith("http")){
    content = "https://" + content;
    document.getElementById('frame_entry').value = content;
  }
  var c = window.open(content);
  return false;
}

// ===================
//hack COMMANDS
// ===================

var backtomenu = " <-- ";
var displayconsole = "Console.exe";
var displaybrowser = "Navigator.exe";
var program = "./Worlds/";
var rd = "rens_demons_xx.exe";
var rdd = "rens_demo.exe";
var randomgame = "random_game.exe";


var entersubmenu =  function(){
  BATTLETREE.api.forget(battle, displayconsole);
  BATTLETREE.api.forget(battle, displaybrowser);
  BATTLETREE.api.forget(battle, program);
  BATTLETREE.api.unlock(battle, backtomenu);
}
var exitsubmenu =  function(){
  BATTLETREE.api.unlock(battle, displayconsole);
  BATTLETREE.api.unlock(battle, displaybrowser);
  BATTLETREE.api.unlock(battle, program);
  BATTLETREE.api.forget(battle, backtomenu);
  BATTLETREE.api.forget(battle, rd);
  BATTLETREE.api.forget(battle, rdd);
  BATTLETREE.api.forget(battle, randomgame);
}

var unlock_terminal_show = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: displayconsole,
  unlock: true,
  function: function (){
    entersubmenu();

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

var back_to_menu = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: backtomenu,
  unlock: true,
  function: function (){
    exitsubmenu();
    updatelog("> Back to main menu");
    log.style.visibility = "hidden";
    frame_container.style.visibility = "hidden";
    IO.key_interceptor.activate();
  }
});

var unlock_browser = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: displaybrowser,
  unlock: true,
  extra_function: function () {
    entersubmenu();

    frame_container.style.visibility = "visible";
    IO.key_interceptor.deactivate();

    BATTLETREE.api.unlock(battle, "Stop pressing button");
    BATTLETREE.api.forget(battle, "Press buttons");
  }
});


var unlock_rd = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: rd,
  unlock: true,
  description: ["Loading " + rd + "..."],
  function: function () {
    STATS.record._increment(STAT.Endings);
    window.location = "index.html";
  }
});

var unlock_rdd = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: rdd,
  unlock: true,
  description: ["Loading " + rdd + "..."],
  function: function () {
    window.location = "index.html?trial";
  }
});

var unlock_store = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: randomgame,
  unlock: true,
  description: ["Loading randomly other reality..."],
  function: function () {
    if(Math.random() < 0.4){
      window.location = "http://store.steampowered.com/explore/random/";
    } else{
      window.location = "https://itch.io/randomizer/";
    }
  }
});


var unlock_program = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: program,
  unlock: true,
  description: ["Chose world engine..."],
  extra_function: function () {
    entersubmenu();

    unlock_rd();
    unlock_rdd();
    unlock_store();
  }
});



// ===================
//hack STARTUP
// ===================

var unlock_exit = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "[X]",
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
  name: "[R]etry",
  unlock: true,
  description: ["CONNECTION ESTABLISHED.<br />MAIN MENU."],
  extra_function: function(){
    BATTLE.player_actions.empty();

    unlock_terminal_show("[R]etry");
    unlock_browser("[R]etry");
    back_to_menu("[R]etry");
    unlock_exit("[R]etry");
    unlock_program("[R]etry");

    exitsubmenu();
  }
});

PLAYER_ACTIONS.add({
  name: "[A]bort",
  outcome: BATTLETREE.ESCAPE,
  unlock: true,
  description: turnoff,
});

PLAYER_ACTIONS.add({
  name: "[F]ail",
  outcome: BATTLETREE.ESCAPE,
  unlock: true,
  description: turnoff,
});


// ===================
// =================== START
// ===================
BATTLE.operations.start("EXECUTION IN PROGRESS.<br />FAILED TO CONNECT TO THE SIMULATION.");
