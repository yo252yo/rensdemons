
new CenteredMovingBattleImage("assets/characters/party/SavageChild.png", 'background',32,48, 2);

AUDIO.music.characters.SavageChild();
PLAYER_ACTIONS.escape();


var unlock_join = function () {
  return PLAYER_ACTIONS.function.unlock_replacing_action({
    name: DICTIONARY.get(PARTYMEMBERS.SavageChild) + " ",
    unlock: true,
    description: [
      `You keep repeating the name you chose for her in hope to establish a connection.`,
      `Finally, she seems to understand you. She nods and smiles at you.`,
      `$$SavageChild$: "I'm $$SavageChild$!"`,
      `It's going to take a while to develop proper communication, but it seems that she's willing to follow you.`,
      "$$SavageChild$ JOINS YOUR PARTY!",
    ],
    outcome: BATTLETREE.WIN,
    extra_function: function(){
      PARTY.add(PARTYMEMBERS.SavageChild);
    },
  });
};


var unlock_name = function(){
  return PLAYER_ACTIONS.function.unlock_replacing_action({
    name: DICTIONARY.get(PARTYMEMBERS.SavageChild),
    unlock: true,
    description: [
      `$$Ren$: "I'm $$Ren$. You're $$SavageChild$."`,
    ],
    function: function(){
      if(INVENTORY.count("_sg_name") > 1){
        BATTLE.player_actions.empty(true);
        var f = unlock_join(DICTIONARY.get(PARTYMEMBERS.SavageChild));
        f();
      } else {
        INVENTORY.increase("_sg_name", 1);
      }
    }
  });
}

var check_adoption = function(){
  if(INVENTORY.count("_sg_affection") > 3){
    PLAYER_ACTIONS.add({
      name: "Name",
      unlock: true,
      description: [
        `You feel like the wild girl got used to you. As if to confirm this, she follows you when you move away. You think it may be a good time to give her a name.`,
      ],
      function: function(){
        BATTLE.player_actions.empty();
        BATTLE.monster_actions.empty();

        var callback = function(){
          BATTLE.monster_actions.empty();
          BATTLE.monster_actions.add_textual("The child looks at you with big eyes full of expectations.");
          (unlock_name())();
          PLAYER_ACTIONS.escape();
          BATTLE.turn_factory.player();
        }

        BATTLE.monster_actions.make_unique(
          function() {
            PARTY.changeNickname(PARTYMEMBERS.SavageChild, undefined, callback);
          }
        );
      },
    });
  }
}

var make_spook = function(name){
  var unlock_spook = PLAYER_ACTIONS.function.unlock_replacing_action({
    name: name,
    unlock: true,
    description: [
      `It seems that the girl hated it. Startled by your action, she ran away. You make a mental note of this in case you ever run into her again.`,
    ],
    outcome: BATTLETREE.ESCAPE,
  });
  unlock_spook("Approach carefully");
}
var make_neutral = function(name){
  var unlock_neutral = PLAYER_ACTIONS.function.unlock_replacing_action({
    name: name,
    unlock: true,
    description: [
      `It seems that the girl did not care for it. She seems pretty indifferent.`,
    ],
    outcome: BATTLETREE.NOTHING,
  });
  unlock_neutral("Approach carefully");
}
var make_plus = function(name){
  var unlock_plus = PLAYER_ACTIONS.function.unlock_replacing_action({
    name: name,
    unlock: true,
    description: [
      `It seems that the girl liked it. You think she is purring.`,
    ],
    outcome: BATTLETREE.NOTHING,
    extra_function: function(){
      INVENTORY.increase("_sg_affection", 1);
      check_adoption();
    }
  });
  unlock_plus("Approach carefully");
}




PLAYER_ACTIONS.add({
  name: "Approach carefully",
  unlock: ABILITIES.has_ability("_sg_spooked"),
  description: [`You approach the girl very slowly, careful to not make any sudden move.`, `You succeed at coming close to the child.`],
  function: function() {
    BATTLETREE.api.lock("_party/_SavageChild3", "Approach");
    check_adoption();

    make_spook("Touch hand");
    make_spook("Pat back");
    make_spook("Bark");
    make_spook("Pluck apple");
    make_neutral("Clean");
    make_neutral("Pat head");
    make_neutral("Speak");
    make_neutral("Pluck pear");
    make_plus("Meow");
    make_plus("Scratch chin");
    make_plus("Praise");
    make_plus("Play fetch");
    make_plus("Race");
    make_plus("Pluck berry");
  },
});

PLAYER_ACTIONS.add({
  name: "Approach",
  unlock: true,
  description: [`You try to approach the girl, but it seems that your fast movement spooked her. She runs away from you.`],
  outcome: BATTLETREE.ESCAPE,
  extra_function: function(){
    ABILITIES.unlock("_sg_spooked");
  },
});

var attack = {
  attack_amplitude: 0.3, // Between 0 and 1
  warning_time_s: 1,
  react_time_s: 1,
  variability: 0.9, // 1 = 100%
};

BATTLE.monster_actions.add_textual("The wild child bites you.", attack);
BATTLE.monster_actions.add_textual("The girl is growling at you like an animal.", attack);
BATTLE.monster_actions.add_textual("The child is jumpy, on edge, ready to attack or flee at the first oddity.", attack);
BATTLE.monster_actions.add_textual("The savage girl scratches you.", attack);
BATTLE.monster_actions.add_textual("The girl waves her limbs frantically in all directions and hits you.", attack);

// ===================
// =================== START
// ===================
BATTLE.operations.start(
  `The feral girl you've already encounter is facing you, her piercing eyes permanently reevaluating your threat level.`,
);
