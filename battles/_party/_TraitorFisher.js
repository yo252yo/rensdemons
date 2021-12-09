
new CenteredMovingImage("assets/characters/party/TraitorFisher.png", 'background',32,48, 2);

AUDIO.music.characters.TraitorFisher();

// ===================
// =================== PLOT
// ===================

PLAYER_ACTIONS.escape();

/*

>> Artist vessel for god inspiration
Ren can Foresee a betrayal
unwavering loyalty: Someone’ll drop their oranges, you’ll help to pick them up, and then they’ll follow you for the next 60 hours as thanks, because that’s a perfectly normal response.
theres always a fishing system

*/

var agent_number = 2;
var surface_alliegance = "Sirens";

var agent_number_text = function(n){
  if (n > 9999){
    return "multiple";
  }
  if (n < 10) {
    var arr = ["","", "double", "triple", "quadruple", "quintuple", "sextuple", "septuple", "otcuple", "nonuple"];
    return arr[n];
  }

  var numberfix = ["","un", "duo", "tri", "quattuor", "quinqua", "sexa", "septen", "otco", "novem"];
  var s = "";
  s += numberfix[n % 10];

  var d = Math.floor((n/10) % 10);
  if(d > 1){
    s += numberfix[d];
    s += "gint";
  } else if (d == 1){
    s += "dec";
  }

  var c = Math.floor((n/100) % 100);
  if(c > 1){
    s += numberfix[c] + "genti";
  } else if (c == 1){
    s += "cen";
  }

  return s + "uple";
}

var description_traitor = function(n) {
  var side = ["Sirens", "Humans"];
  if (n == 1){
    return [`$$TraitorFisher$: "Because I was working for the Humans all along!"`];
  }
  if(n == agent_number){
    return [`$$TraitorFisher$: "I was only pretending to side with the ${side[n%2]} all along! It was a ruse in order to gain their trust and infiltrate their ranks."`, `$$BestFriend$ gasps in shock.`].concat(description_traitor(n-1));
  }
  return [`$$TraitorFisher$: "Because I was working for the ${side[n%2]} all along! But it was a ruse in order to gain their trust and infiltrate their ranks."`, `$$BestFriend$ gasps in shock.`].concat(description_traitor(n-1));
}


var make_callout = function(){

  BATTLE.player_actions.remove("Call out");
  BATTLE.player_actions.remove("Linger");

  PLAYER_ACTIONS.add({
    name: "Call out",
    unlock: true,
    description: [
      `$$Ren$: "You liar! Thanks to the Goddess, I see clearly your little game. I can tell you've been pretending."`,
      `$$TraitorFisher$: "You're right! I'm a ${agent_number_text(agent_number)} agent!"`,
    ].concat(description_traitor(agent_number)),
    function: make_callout,
  });
  agent_number ++;
}


PLAYER_ACTIONS.add({
  name: "Linger",
  unlock: true,
  description: [`$$Ren$: "Actually, there's no rush. We have the Goddess on our side, we can take all the time we need."`,
                `$$TraitorFisher$: "What do you mean? The sirens could be back any second!"`,
                `$$Ren$: "They won't be, trust me. It's a bluff."`,
                ],
  function: make_callout,
});

// ===================
// =================== START
// ===================
BATTLE.operations.start(
  `$$TraitorFisher$: "Quick, run away before it's too late! The closest shore is to the south!"`,
);
