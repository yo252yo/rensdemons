
new CenteredImage("assets/battles/statue.png", 'background');

PLAYER_ACTIONS.useless(ABILITY.Pray);

var battle = "_003/_statue";

var update_inspect = function (order){
  if( BATTLETREE.api.is_unlocked(battle, "Inspect " + order + " statue")){
    BATTLETREE.api.lock(battle, "Inspect " + order + " statue");
    BATTLETREE.api.unlock(battle, "Remember " + order + " statue");
  }
}

var stop_inspecting = function() {
  update_inspect("fourth");
  update_inspect("third");
  update_inspect("second");
  update_inspect("first");
}

var inspect_boilerplate = "You inspect the statue of the Goddess. You notice that at the bottom, some lines are carved in the stone. It's very dusty, but you manage to make it out."
var look_closer = "Look closer";
var look_even_closer = "Look even closer";
var speak = "Speak";
var description = "You find scratch marks under the text.";
var hint = "*** ******* **";
var solution = "act through me";
var getDescription = function(){ return description; }
var getHint = function(){ return hint; }

var updateHint = function(proposal) {
  var s = "";
  var i = 0;
  while(i < proposal.length){
    if(proposal[i] == solution[i]){
      s += proposal[i];
    } else {
      s += hint[i];
    }
    i++;
  }
  while(i < hint.length){
    s += hint[i];
    i++;
  }
  hint = s;
  BATTLE.player_actions.remove(look_closer);
  BATTLE.player_actions.remove(look_even_closer);
  PLAYER_ACTIONS.add(tip_object());
}

var attempts = 0;
var tip_object = function() {
  return {
    name: look_even_closer,
    unlock: true,
    description: [getDescription(), getHint()],
    function: function() {
      attempts++;
      if (attempts > 1) {
        description = "You find scratch marks under the text. You can make out a few letters.";
        updateHint("a** *h***g* *e");
      }
      BATTLE.player_actions.remove(look_even_closer);
      PLAYER_ACTIONS.add(tip_object());
    },
  };
}

PLAYER_ACTIONS.add({
  name: look_closer,
  description: ["There is nothing mode that stands out about the statue. You've seen hundreds like this. You could try to investigate further, if you're really desperate for a hint."],
  function: PLAYER_ACTIONS.function.unlock_replacing_action(tip_object()),
});

PLAYER_ACTIONS.add({
  name: speak,
  description: ["You speak."],
  function: function(){
    var answer = prompt("What will you say?");
    answer = answer.toLowerCase();
    updateHint(answer);
    if(answer && answer == solution) {
      BATTLE.monster_actions.prepare_win("As the words are uttered, a weird senstation engulfes your body. Nothing seems to have changed, no sound or flashing light. Yet, you've never been so sure that something had happened. Was it the fabric of the universe? Or was it only inside your head?");
      BATTLE.win_callback = function() {
        TextBannerSequence.make([
          "Ren's surroundings were exactly the same. Yet, somehow, at that moment, Ren just knew that touching any of the statues would teleport him out of this maze."
        ], function(){
          ABILITIES.unlock("_trial_passed");
        });
      };
    }
  },
});


var make_riddle = function(order, riddle) {
  var remember = "Remember " + order + " statue";
  var look = "Inspect " + order + " statue";

  PLAYER_ACTIONS.add({
    name: remember,
    description: riddle,
  });

  PLAYER_ACTIONS.add({
    name: look,
    description: [inspect_boilerplate, riddle],
    function: function() {
      if(order == "first") {
        BATTLETREE.api.unlock(battle, look_closer);
        BATTLETREE.api.unlock(battle, speak);
      }
      stop_inspecting();
    }
  });
}

PLAYER_ACTIONS.add({
  name: "Leave",
  unlock: true,
  description: "You move away from the statue, thinking hard about its mysteries.",
  outcome: BATTLETREE.ESCAPE,
  extra_function: stop_inspecting,
});


make_riddle("fourth", "If the world is a stage, this is all you can do.<br />And when the curtain falls, it's time to start a new.<br />And though this speaks often of deceit and pretense.<br />So too this qualifies actions of any sense.");
make_riddle("third", "This word bridges the way between the start and goal.<br />This is what you traverse, this is your course in whole.<br />This qualifies your means, your intermediate grind.<br />Though this bares resemblance to the thoughts in your mind.");
make_riddle("second", "How can so few letters describe many rich worlds?<br />Impossible to doubt, or to define in words.<br />No two ones are the same, yet we cherish our own.<br />For it lets us each be, or else 'I' would be gone.");
make_riddle("first", "To you, the chosen one, trapped in this dreary maze,<br />I'll obey your command, if you speak the right phrase.<br />When I hear the three words that my icons hinted<br />You will be my servant forever anointed.");


BATTLE.operations.start("You find yourself faced with a statue of the Goddess. You first bow and look down before Her Magnifiscence, but as you look up you notice some text on the pedestal.");
