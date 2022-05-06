
new CenteredMovingBattleImage("assets/characters/party/TorturedSoul.png", 'background',32,48, 2);

AUDIO.music.characters.TorturedSoul();
PLAYER_ACTIONS.escape();


if(INVENTORY.count("_torturedSoulSteps") > 5){

  PLAYER_ACTIONS.add({
    name: "Admit defeat",
    unlock: true,
    description: [
      `$$Ren$: "You're right. It seems you can't die."`,
      `$$TorturedSoul$: "What do thou mean?"`,
      `$$Ren$: "I tried to kill you ${INVENTORY.count("_torturedSoulSteps") - 1} times, in various ways. It never sticks. You might be glitched or something. I keep bringing you back to life..."`,
      `$$TorturedSoul$: "What are thou rambling about? I did not perceive anything."`,
      `$$BestFriend$: "Don't worry. $$Ren$ is always rambling like that. It's the possession by the Goddess, you see..."`,
      `$$TorturedSoul$: "Ah... So what of it?"`,
      `$$Ren$: "I don't know. I don't think I can help you..."`,
      `$$TorturedSoul$: "Such a shame... Yet I can glimpse in thee a kindred spirit. It soothes my heart that thou heard me out."`,
      `$$TorturedSoul$: "I have a mind to follow thee. As I am awaiting my demise, I could as well be at thine side. Thou seem to be on a suicidal expedition of thine own. Perchance could I also partake in the exquisite fruit of thine ascertained doom."`,
      `$$Ren$: "Sure... Whatever."`,
      "$$TorturedSoul$ JOINS YOUR PARTY!",
    ],
    extra_function: function(){
      PARTY.add(PARTYMEMBERS.TorturedSoul);

      BATTLE.monster_actions.make_unique(
        function() {
          PARTY.changeNickname(PARTYMEMBERS.TorturedSoul, undefined, BATTLE.operations.win);
        }
      );
    },
  });
}


var attempt = function(name, text){
  PLAYER_ACTIONS.add({
    name: name,
    unlock: true,
    description: [text],
    outcome: BATTLETREE.LOSS,
    extra_function: function(){
      INVENTORY.increase("_torturedSoulSteps");
    }
  });
}

attempt("Stab", `You stab $$TorturedSoul$. He falls on the ground with a thankful expression on his face.`);
attempt("Kill", `You kill $$TorturedSoul$. He falls on the ground with a thankful expression on his face.`);
attempt("Murder", `You murder $$TorturedSoul$. He falls on the ground with a thankful expression on his face.`);
attempt("Strangle", `You strangle $$TorturedSoul$. It is hard but he doesn't pose any resistance. He soon stop breathing, a thankful expression on his face.`);
attempt("Hang", `You help $$TorturedSoul$ hand himself to a tree. You avert your eyes at the critical moment. When you look back, he is dead, a thankful expression on his face.`);
attempt("Flag", `You decide to seal the fate of $$TorturedSoul$ with an ominous declaration like 'do not worry, we will all be ok'. It's just as good as a death sentence: he immediately dies in a tragic accident, a thankful expression on his face.`);
attempt("Drown", `You find the nearest pond and throw $$TorturedSoul$ in, heavily loaded with rocks. He falls to the bottom of the water and remains there.`);
attempt("Slit", `You slit $$TorturedSoul$'s throat in a quick gesture. He falls on the ground with a thankful expression on his face.`);
attempt("Empoison", `You feed $$TorturedSoul$ some strong poison. After a few seconds, he falls on the ground with a thankful expression on his face.`);
attempt("Immolate", `You build a pyre and throw $$TorturedSoul$ in. He welcomes the flames with a thankful expression on his face.`);
attempt("Spell", `You cast one of your spells on $$TorturedSoul$. Without any defense, it is fatal to him.`);
attempt("Push", `You go with $$TorturedSoul$ to the nearest cliff. You give him a push. He crashes on the solid ground far below.`);
attempt("Monster", `You decide to use the wilderness and feed $$TorturedSoul$ to hungry wild beasts. It does not take long for them to lacerate the poor soul.`);


PLAYER_ACTIONS.add({
  name: "Refuse",
  unlock: true,
  description: [
    `$$TorturedSoul$: "It appears that thou don't understand me after all..."`,
    `$$TorturedSoul$: "Do abandon me to my woes. Everybody always does."`,
  ],
  outcome: BATTLETREE.ESCAPE,
});

// ===================
// =================== START
// ===================
BATTLE.operations.start([
  `$$TorturedSoul$: "I beg thee to be of assistance. Bring an end to my misery."`,
]);
