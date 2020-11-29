// ===================
//hack LOADING
// ===================

// get the sprite name from BATTLE.make_conversation
var s = new CenteredMovingImage("assets/characters/" + BATTLE.pending_text[0] + ".png", 'background', 32, 48);
var gen = new Generator(BATTLE.pending_text[1]);

var unlocked_keys = [];
var is_unlocked = function(key){
  var unlock_proba = 3 / 5; /* avg number of unlocked / total number of possibilities */
  return gen.get() <= unlock_proba;
}

// ===================
//hack PLAYER ACTIONS
// ===================

var weathers = [];
weathers.push("A");
weathers.push("B");
weathers.push("C");
weathers.push("D");

PLAYER_ACTIONS.mutually_exclusive("Weather", weathers, is_unlocked(), BATTLETREE.NOTHING);

// ===================
//hack NPC RESPONSES
// ===================
var attack = {
  attack_amplitude: 0.1, // Between 0 and 1
  warning_time_s: 2,
  react_time_s: 1,
  time_variation: 0.5, // 1 = 100%
};

BATTLE.monster_actions.add_textual("You feel the weight of the social pressure to come up with interesting small talk.", attack);
BATTLE.monster_actions.add_textual("You struggle to find an interesting answer.", attack);
BATTLE.monster_actions.add_textual("There's an awkward silence during which you don't know what to say.", attack);
BATTLE.monster_actions.add_textual("The villager asks you an embarrassing question.", attack);
BATTLE.monster_actions.add_textual("The villager mumbles some platitudes with a warm smile.");
BATTLE.monster_actions.add_textual("The villager compliments your hair.");


// ===================
//hack BASE ACTIONS
// ===================
var escapes = [
  "End conversation",
  "Bid farewell",
  "Say goodbye",
  "Run away"
];
BATTLETREE.api.declare_all(BATTLE.current_battle, escapes);
PLAYER_ACTIONS.escape(gen.pick(escapes));
PLAYER_ACTIONS.useless(ABILITY.Pray);

// ===================
//hack START
// ===================
var start_text = gen.pick([
  "This villager seems interested in talking to you. They greet you with a big smile.",
  "This villager starts the conversation with a warm greeting.",
  "It looks like small talk is unavoidable. What topic will you chose?",
]);
BATTLE.operations.start(start_text);
