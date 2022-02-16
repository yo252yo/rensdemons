
new CenteredMovingBattleImage("assets/characters/party/DumbMuscles.png", 'background',32,48, 2);

AUDIO.music.characters.DumbMuscles();
PLAYER_ACTIONS.escape();

PLAYER_ACTIONS.add({
  name: "No",
  unlock: true,
  description: [
    `He seems disappointed.`,
    `$$DumbMuscles$: "Alright. Get out of the way, then. I'm gonna jump."`,
    ],
  outcome: BATTLETREE.ESCAPE,
});

var yes3 = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Yeah bro, welcome to the gang! Watch and learn!",
  unlock: true,
  description: [
    `$$DumbMuscles$: "Sweet! Thanks mate!"`,
    `$$DumbMuscles$: "Oh, just one thing, my name's $$DumbMuscles$! But if we're gonna be best mates, you're gonna have to give me a nickname! What do you think?"`,
    `He seems pleased with your choice.`,
    ],
  extra_function: function(){
    ABILITIES.unlock("_followedByDumbMuscles");

    BATTLE.monster_actions.make_unique(
      function() {
        PARTY.newChangeNickname(PARTYMEMBERS.DumbMuscles, undefined, BATTLE.operations.win);
      }
    );
  },
});

var yes2 = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "You betch'a... or something",
  unlock: true,
  description: [
      `$$Ren$: "What's the problem?"`,
      `$$DumbMuscles$: "Well I've started being an adventurer, and I got this request to go fetch magic feathers from some kind of magic bird at the top of the mountain. But it's my very first quest and I'm having a tough time. Look, the path is broken. I don't know what to do, mate. Can you like... show me the ropes? Teach me a bit about adventuring?"`,
      `$$DumbMuscles$: "I know I'm asking a lot, but I swear, if we run into trouble, you can count on my fists to protect you! Please!"`,
    ],
  function: yes3,
});

PLAYER_ACTIONS.add({
  name: `Yes... mate`,
  unlock: true,
  description: [
    `He rushes towards you enthusiastically and hugs you. It feels more like he's crushing your bones.`,
    `$$DumbMuscles$: "That's awesome, mate! Blessed be the Goddess! You can help me, then!"`,
    ],
  function: yes2,
});


// ===================
// =================== START
// ===================
BATTLE.operations.start([
  `You find a muscular young man doing stretches next to a wide crack in the path.`,
  `$$DumbMuscles$: "Stand back, mates, I'm gonna jump!"`,
  `$$BestFriend$: "Wait! Don't! It's way too far!"`,
  `$$DumbMuscles$: "Who are you? What are you doing here?"`,
  `He takes a good look at you.`,
  `$$DumbMuscles$: "Wow, mate! Are you guys experienced adventurers?"`,
]);
