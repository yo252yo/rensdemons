
new CenteredMovingBattleImage("assets/characters/party/TraitorFisher.png", 'background',32,48, 2);

AUDIO.music.characters.TraitorFisher();

// ===================
// =================== PLOT
// ===================

PLAYER_ACTIONS.escape();

var convince = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Convince",
  unlock: true,
  description: [
    `$$BestFriend$: "Her type?"`,
    `$$Ren$: "Yeah, she puts on airs, but she has a good heart. Plus, we could use someone to do the cooking and fishing for us."`,
    `$$TraitorFisher$: "How do you know my passions?"`,
    `$$Ren$: "Just a hunch. We don't have a cook yet, the Goddess was bound to give us one."`,
    `$$TraitorFisher$: "What are you talking about?"`,
    `$$Ren$: "Come on, $$BestFriend$. We can't just leave her here to die!"`,
    `$$BestFriend$: "I suppose you have a point. Fine, she can come."`,
    `$$TraitorFisher$: "I'm coming, but it's because I want to. I don't need your help or anything..."`,
    "$$TraitorFisher$ joins your party!",
  ],
  outcome: BATTLETREE.WIN,
  extra_function: function(){
    PARTY.add(PARTYMEMBERS.TraitorFisher);
  },
});

var accept = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Accept",
  unlock: true,
  description: [
    `$$BestFriend$: "I know you trust her, but I don't. She's just too suspicious. We can't let her come with us, she'll betray us at the first chance. She's just looking for a way out of the hole she dug herself. She might be helping us now, but you see that she can change sides in a second!"`,
    `$$Ren$: "Trust me. I guarantee she may seem dubious, but she'll remain loyal. I know her type."`,
  ],
  function: convince,
});

var doubt = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Doubt",
  unlock: true,
  description: [
    `$$BestFriend$: "I know you trust her, but I don't. She's just too suspicious. We can't let her come with us, she'll betray us at the first chance. She's just looking for a way out of the hole she dug herself. She might be helping us now, but you see that she can change sides in a second!"`,
    `$$Ren$: "I suppose that if it makes you uncomfortable, we should just leave her here."`,
  ],
  outcome: BATTLETREE.ESCAPE,
});

var plan = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Plan",
  unlock: true,
  description: [
    `$$Ren$: "What plan?"`,
    `$$TraitorFisher$: "I'm coming with you. I want to see the world, or something..."`,
  ],
  function: function(){
    doubt("Plan");
    accept("Plan");
  },
});


var consequences = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Consequences",
  unlock: true,
  description: [
    `$$Ren$: "What's your game plan, here? The sirens will see that our corpses are not there, they'll understand your betrayal."`,
    `$$TraitorFisher$ seems taken aback, but quickly regains composure.`,
    `$$TraitorFisher$: "Of course I thought of that. This is all part of my plan."`,
  ],
  function: plan,
});

var believe = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: DICTIONARY.get("BestFriend"),
  unlock: true,
  description: [
    `$$BestFriend$: "I guess you would know it if it was a trap, right? With your Goddess powers, you can foresee betrayals, right?"`,
    `$$Ren$: "I... think so?"`,
  ],
  outcome: BATTLETREE.NOTHING,
});


PLAYER_ACTIONS.add({
  name: "Distrust",
  unlock: true,
  description: [`$$Ren$: "How can we trust that this is not a trap and you're actually helping us?"`,
                `$$TraitorFisher$: "I suppose that there's nothing I can do to prove it..."`,
                `$$BestFriend$: "Let's go. She's too shady."`,
                ],
  outcome: BATTLETREE.ESCAPE,
});


// ===================
// =================== SPECIAL LOOP
// ===================


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
  if (agent_number % 2 == 0){
    var side = ["Sirens", "Humans"];
  } else {
    var side = ["Humans", "Sirens"];
  }
  if (n == 1){
    return [`$$TraitorFisher$: "Because I was working for the ${side[n%2]} all along!"`, `$$BestFriend$ gasps in shock.`];
  }
  if(n == agent_number){
    return [`$$TraitorFisher$: "I was only pretending to side with the ${side[n%2]} all along! It was a ruse in order to gain their trust and infiltrate their ranks."`, `$$BestFriend$ gasps in shock.`].concat(description_traitor(n-1));
  }
  return [`$$TraitorFisher$: "Because I was working for the ${side[n%2]} all along! But it was a ruse in order to gain their trust and infiltrate their ranks."`].concat(description_traitor(n-1));
}


var make_callout = function(){

  BATTLE.player_actions.remove("Call out");
  BATTLE.player_actions.remove("Linger");
  BATTLE.player_actions.remove("Believe");
  BATTLE.player_actions.remove("Believe ");

  PLAYER_ACTIONS.add({
    name: "Call out",
    unlock: true,
    description: [
      `$$Ren$: "You liar! Thanks to the Goddess, I see clearly your little game. I can tell you've been pretending."`,
      `$$TraitorFisher$: "You're right! I'm a ${agent_number_text(agent_number)} agent!"`,
    ].concat(description_traitor(agent_number)),
    function: make_callout,
  });


  if (agent_number % 2 == 0 && agent_number > 3){
    PLAYER_ACTIONS.add({
      name: "Believe",
      unlock: true,
      description: [
        `$$Ren$: "I think we should take her at her word. She's probably really working for the Sirens."`,
        `$$Ren$: "It's suspicious enough for her to let us go. Let's not try to figure out her hidden motives, let's just run away."`,
      ],
      outcome: BATTLETREE.ESCAPE,
    });
  } else if(agent_number > 6) {
    PLAYER_ACTIONS.add({
      name: "Believe ",
      unlock: true,
      description: [
        `$$Ren$: "I think we should take her at her word. She's probably really working for the Humans."`,
      ],
      function: function(){
        BATTLE.player_actions.remove("Call out");
        BATTLE.player_actions.remove("Believe");
        BATTLE.player_actions.remove("Believe ");
        believe("Believe");
        consequences("Believe");
      }
    });
  }

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
