
new CenteredMovingImage("assets/characters/party/TraitorFisher.png", 'background',32,48, 2);

AUDIO.music.characters.TraitorFisher();

// ===================
// =================== PLOT
// ===================














PLAYER_ACTIONS.add({
  name: "Apologize",
  unlock: true,
  description: [`$$Ren$: "Sorry, we had no idea, we didn't mean to..."`,
                ],
  function: function() {
  },
});




// ===================
// =================== ATTACKS
// ===================

var attack = {
  attack_amplitude: 0.3, // Between 0 and 1
  warning_time_s: 1,
  react_time_s: 1,
  variability: 0.6, // 1 = 100%
};

BATTLE.monster_actions.add_textual(`$$TraitorFisher$: "Objection sustained!"`, attack);
BATTLE.monster_actions.add_textual(`$$TraitorFisher$: "Order in the court!"`, attack);
BATTLE.monster_actions.add_textual(`$$TraitorFisher$: "Overruled!"`, attack);
BATTLE.monster_actions.add_textual(`$$TraitorFisher$: "Motion denied!"`, attack);
BATTLE.monster_actions.add_textual(`$$TraitorFisher$: "The prosecution rests."`, attack);


// ===================
// =================== START
// ===================
BATTLE.operations.start(
  `$$TraitorFisher$: "You're under arrest for trespassing on the territory of the Sirens."`,
);
