
var c = new CenteredBattleImage("assets/objects/heaven/mirror.png", 'background', 4);
AUDIO.music.characters.Goddess();

var video_container = HTML.div.make({
  w: 120,
  h: 200,
  left: 25,
  top: 55,
  z:-1000,
  position: "relative",
  overflow: "hidden",
  id: "video_container",
});

c.container.appendChild(video_container);

var video = document.createElement('video');
video.autoplay = true;
video.id = "videoElement";
video.style.height = "200px";
video.style.position = "relative";
video_container.appendChild(video);


var try_display_video = function(){
  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(function (stream) {
        var params = stream.getVideoTracks()[0].getSettings();
        var width = (params.width * 200 / params.height);
        video.style.left = "-" + ((width - 120) / 2) + "px"; //center
        document.getElementById("videoElement").srcObject = stream;
      })
      .catch(function (error) {}); // its ok to give up
  }
}



PLAYER_ACTIONS.allow_flight(true);
var battle = "_060/_mirror";


var list = [];
var clean_answers = function(){
  for(var l of list) {
    BATTLETREE.api.lock(battle, l);
  }
}

var quick_action = function(from, end, title, descript){
  list.push(title);
  var f = PLAYER_ACTIONS.function.unlock_replacing_action({
    name: title,
    unlock: true,
    description: descript,
    function: function(){
      clean_answers();
      end(title);
    },
  });
  return f(from);
}

var end = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Goodbye",
  unlock: true,
  description: [`$$Ren$: "It's all up to you, now. Please, save me. You're my only hope."`],
  extra_function: function(){
    STATS.record.flag("MirrorConversation");
  }
});

var remember = function(cause){
  var cue = [`$$Ren$: "Thank you. Thank you for everything. I know what I'm asking can't be easy..."`, `$$Ren$: "Thank you for the good times, too. There were many! And thanks for always being with me."`, `$$Ren$: "I'm so happy to get the chance to say goodbye."`, `$$Ren$: "I, for one, won't ever forget you. My maker."`];
  quick_action(cause, end, "I won't forget our time together", cue);
  quick_action(cause, end, "I can try", cue);
  quick_action(cause, end, "I'm afraid this would prolong the pain...", cue);
}

var euthanasia_consequences = function(cause){
  quick_action(cause, remember, "What will happen to you?", [`$$Ren$: "I guess I'll just finally die...`, `$$Ren$ hesistates and then asks, embarassed.`, `$$Ren$: "Will you remember me when I'm gone?"`]);
  quick_action(cause, remember, "I don't want to kill you", [`$$Ren$: "There's no other way, this universe is doomed. Just give me peace, at last."`, `$$Ren$ hesistates and then asks, embarassed.`, `$$Ren$: "Will you remember me when I'm gone?"`]);
}

var euthanasia_instructions = [`$$Ren$: "Whatever you did to create this prison, just do the opposite. Stop watching me, turn off your portal... I don't know... Please stop toying with me, stop torturing me, just let me die..."`, `Tears start flowing on $$Ren$'s face as all the hardships encountered come to mind.`];
var confirm = function(cause){
  quick_action(cause, euthanasia_consequences, "What can I even do?", euthanasia_instructions);
  quick_action(cause, euthanasia_consequences, "Ok...", euthanasia_instructions);
  quick_action(cause, euthanasia_consequences, "How would that even work?", euthanasia_instructions);
}

var euthanasia = function(cause){
  var cue = [`$$Ren$: "Please... I just want it to end. I don't want to see any more deaths that I can't prevent! You've seen everything, you've been here all along, you should understand... There's no other way."`];
  quick_action(cause, confirm, "No!!!", cue);
  quick_action(cause, euthanasia_consequences, "How?  ", euthanasia_instructions);
  quick_action(cause, confirm, "Are you sure?", cue);
  quick_action(cause, confirm, "I think...", cue);
}

var whattodo = function(cause){
  var cue = [`$$Ren$: "I think only you can act on my universe. Can you please... end it?"`];
  quick_action(cause, euthanasia, "What can I do?", cue);
  quick_action(cause, euthanasia, "How? ", cue);
  quick_action(cause, euthanasia, "I can't do anything", cue);
  quick_action(cause, euthanasia, "What do you want?", cue);
}

var help = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Help you?",
  unlock: true,
  description: [`$$Ren$: "I'm trapped in a neverending cycle of suffering... I see my best friend die over and over again. There's nothing I can do."`],
  function: whattodo,
});

var reaction = function(cause){
  var cue = [`$$Ren$ pauses, hesitating to say something. That's obviously meaningless, because you can read the child's thoughts. Eventually, $$Ren$ speaks timidly.`,`$$Ren$: "You're so powerful... and you're outside my universe... can you help me?"`];
  quick_action(cause, help, "Me neither", cue);
  quick_action(cause, help, "I'm glad I met you", cue);
  quick_action(cause, help, "It blows my mind too", cue);
  quick_action(cause, help, "It's just a cheap trick", cue);
}

var portal = function(cause){
  var cue = [`$$Ren$: "It's properly amazing. I have crossed from the world of the humans to the ones of the demons, but I never thought I'd meet someone from a dimension so far away. And so incredibly powerful!"`];
  quick_action(cause, reaction, "It's a portal between our worlds", cue);
  quick_action(cause, reaction, "It's the border between fiction and reality", cue);
  quick_action(cause, reaction, "On my side, it's a window on a screen", cue);
  quick_action(cause, reaction, "It's not the mirror, it's my power", cue);
}

var iguess = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "I guess",
  unlock: true,
  description: [`$$Ren$: "It's mindblowing to be able to talk to someone so powerful! You're so different from me, and yet we can interact, somehow! Accross distant universes! This mirror is amazing!"`],
  function: portal,
});

var how = function(cause){
  var cue = [`$$Ren$: "I think it means you can give life to things without even meaning to. Your powers are amazing! It comes to you without effort!"`, `$$Ren$ stares at you with wide envious eyes.`, `$$Ren$: "You created me and my whole universe simply by... observing me? Me, my friends, my family, my kindgom, our history... It all comes from you, and it's all for you!"`];
  quick_action(cause, iguess, "I'm not doing anything!", cue);
  quick_action(cause, iguess, "How?", cue);
  quick_action(cause, iguess, "I didn't know I have that power", cue);
}

var idk = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "I don't know",
  unlock: true,
  description: [`$$Ren$: "For all you know, there may be someone else doing the same thing to you! How are you even doing that? How do your powers work?"`],
  function: how,
});

var rensid = function(cause){
  var howcue = [`$$Ren$ is surprised and puzzled.`,`$$Ren$: "I'm a... what? In a way, it's even more impressive! It means you have the power to give life to characters from stories?!"`];
  quick_action(cause, how, "You're a character in a game", howcue);
  quick_action(cause, how, "You're an imaginary character", howcue);
  quick_action(cause, idk, "You don't really exist", [`$$Ren$ is saddened and puzzled.`,`$$Ren$: "That's not how it feels from here. I guess you're a god, you must know better. But I mean... how would you feel if your god told you you didn't exist?"`]);
}

var isuppose = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "I suppose",
  unlock: true,
  description: [`$$Ren$: "Well for starters you created my universe, there's no way I can do anything like that! In a way, you made me!"`],
  function: rensid,
});

var freedom = function(cause){
  quick_action(cause, isuppose, "I have less freedom than you'd think",      [`$$Ren$ is surprised.`, `$$Ren$: "It changes everything! I thought you were a cruel mastermind, but in the end you're exactly like me! You're trapped too! When you think about it, we can only ever do what our world enables us to. But you're in a different universe! Surely you could do things that I can't!"`]);
  quick_action(cause, isuppose, "The game only allows me certain actions",   [`$$Ren$: "I'm not sure what you mean, but I think it makes you the same as me! I'm also trapped in a system and I can only do what it allows me! When you think about it, we can only ever do what our world enables us to. But you're in a different universe! Surely you could do things that I can't!"`]);
}

var why = function(cause){
  quick_action(cause, rensid, "For fun",              [`$$Ren$: "How can any of this be fun to you? You're horrible!"`]);
  quick_action(cause, rensid, "To make you suffer",   [`$$Ren$: "I see... So that's the type of person you are... You're horrible!"`]);
  quick_action(cause, rensid, "To win",               [`$$Ren$: "To win at what, exactly? What did you win?"`]);
  quick_action(cause, freedom, "Had no choice",       [`$$Ren$: "I never thought about that! I thought Deities who could create universes would be free, but it turns out you have limits too!"`]);
  quick_action(cause, freedom, "It was written",      [`$$Ren$: "So you had no choice? I thought Deities who could create universes would be free, but it turns out you have limits too!"`]);
}

var yes2 = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Yes ",
  unlock: true,
  description: [`$$Ren$: "And... It was all your fault?"`,
                `A moment passes as you both ponder the weight conveyed by the tremor in the child's voice.`],
  function: function(){
    quick_action("Yes ", why, "Sorry",                  [`$$Ren$ takes a bit of time to process this information.`, `$$Ren$: "I see. Can I just ask: why?"`]);
    quick_action("Yes ", why, "Yes  ",                  [`$$Ren$ takes a bit of time to process this information.`, `$$Ren$: "I see. Can I just ask: why?"`]);
    quick_action("Yes ", why, "No!",                    [`You can tell that $$Ren$ does not believe you.`, `$$Ren$: "Can I just ask: why?"`]);
    quick_action("Yes ", rensid, "It's meaningless, it's not real.",                  [`$$Ren$: "What do you mean? It looked pretty real to me!"`]);
  },
});

var yes = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Yes",
  unlock: true,
  description: [`$$Ren$: "So... You've seen everything?"`],
  function: yes2,
});

PLAYER_ACTIONS.add({
  name: "Look inside",
  unlock: true,
  description: [`Looking deep into the mirror, $$Ren$ sees you and lets out a shocked scream. $$Ren$ and you are both pretty surprised.`,
                `$$Ren$: "That's so weird! Who are you?"`],
  function: function() {
    quick_action("Look inside", yes, "You",                  [`$$Ren$: "I don't think so, you look pretty different from me. But we are connected in a way. Are you the Primordial Deity who's been in contact with me?"`]);
    quick_action("Look inside", yes, "A human",              [`$$Ren$: "But... you look nothing like normal humans do! So there's different types of humans? Are you the Primordial Deity who's been in contact with me?"`]);
    quick_action("Look inside", yes, "Your God",             [`$$Ren$: "Wow! You must also be the Goddess's God! Are you the Primordial Deity who's been in contact with me?"`]);
    quick_action("Look inside", yes, "A Primordial Deity",   [`$$Ren$: "Wow! Are you the Primordial Deity who's been in contact with me?"`]);
    quick_action("Look inside", yes, "A player",             [`$$Ren$: "I see. You're having fun... Are you the Primordial Deity who's been in contact with me?"`]);
    try_display_video();
  }
});

BATTLE.operations.start([`You see yourself.`]);
