

class S_Beelzebub extends SimpleObject {
  constructor(x, y){
    super(x, y, 173, 264, "hell/beelzebub", "obj_dark");
    this.adjust_hitbox(50,10,100,100);


    var self = this;
    var postBossPhase3 = function(){
      ABILITIES.unlock("_lieutenant_defeated");
      STATS.record.set_flag("KilledBestFriend", (new Date()).getTime());
      AUDIO.music.stop();

      TextBannerSequence.make([
        `You stay a long time kneeling on the ground in shock and disbelief. You don't want to let go of the body of $$BestFriend$. Tears keep flowing for hours. The world becomes a whirlwind of pain and sobs...`,
        `At some point, you lose consciousness and fall asleep. The cherished face of $$BestFriend$ follows you in feverish nightmares.`,
        `When you come to, your resolve has grown. The world around seems less colorful, your body is sluggish and heavy, you feel a deep empty hole in your chest. But you cannot let yourself go. You need to drag yourself forward and honor $$BestFriend$'s last wishes.`,
        `You cannot allow yourself to let so much efforts and pain go to waste...`,
      ]);
    }

    var postBossPhase2 = function(){
      AUDIO.music.characters.BestFriend();
      PARTY.remove(PARTYMEMBERS.BestFriend);
      self.destroy();

      TextBannerSequence.make([
        `$$BestFriend$: "$$Ren$..."`,
        `$$Ren$: "$$BestFriend$!"`,
        `You jump to the side of your long-life companion.`,
        `Despite all efforts, $$BestFriend$ did not reach shelter on time and could not avoid the powerful explosion. The concussion tore some limbs, the conflagration ravaged some others... The beloved faced that cheered you up so many times is beyond recognition.`,
        `There's no healing those cruel wounds... You immediately understand on some level that this inferno is the end of the road for $$BestFriend$. Yet, you refuse to accept it. You do not dare touch the weakened body, but you cannot help but trying every spell, unction or plant that comes to mind.`,
        `$$BestFriend$: "$$Ren$, it's useless..."`,
        `$$Ren$: "No! No! No!"`,
        `It seems to be all you manage to say through the tears. $$BestFriend$'s fate leaves no room for doubt. But you hold on as strongly as you can, refusing to accept a world where $$BestFriend$ is not at your side.`,
        `$$Ren$: "I can't! I can't do it without you!"`,
        `$$BestFriend$: "You have to... Otherwise this will all be for nothing..."`,
        `$$BestFriend$'s breath is slow and irregular. It pierces through the silence like a deadly whizzing.`,

        `$$Ren$: "Curse the Goddess! Curse it all! What good is it to be the Promised Child if I can't even save the person I care the most about!"`,

        `$$BestFriend$: "You can't... Say that..."`,
        `$$BestFriend$ takes a pause. Each word seems to be more difficult than the previous one.`,
        `$$BestFriend$: "You've got to... Keep the faith... Keep going..."`,
        `$$BestFriend$: "We've come so far... You need to end it..."`,
        `$$BestFriend$: "For everyone... For a better future..."`,
        `$$BestFriend$: "For $$PreciousChild$..."`,
        `$$BestFriend$: "Do it for me... Please..."`,

        `Your face is soaked with tears as you hold the hand of your friend close to your heart.`,
        `$$Ren$: "I will. I promise I will not let all of this be in vain. I will kill $$demon_lord$ and save $$world_name$. I will make it a happy and peaceful place... A place you would have wanted... It'll bear your name. You'll never be forgotten!"`,
        `$$BestFriend$: "Thank... You..."`,
        `$$BestFriend$ struggles to take a last painful breath, then falls eyes-closed on the ground. All suffering has stopped now, and the beloved face displays an outlandish peacefulness.`,

      ], postBossPhase3);
    }

    var postBossDialog = function(){
      TextBannerSequence.make([
        `$$demon_lieutenant$ falls down on the ground, defeated. The weight of the shock makes everything shake around you.`,
        `You let out a sigh of relief, but it is short lived: victory cannot be that easy. A morbid sizzling noise is coming out of the lifeless body of the demon. Its skin bubbles up. You barely have time to jump to cover, yelling at $$BestFriend$ to do the same.`,
        `The deformed body of $$demon_lieutenant$ suddenly explodes in a massive burst of flames. For a few moments that seem like an eternity, you cannot see anything around you. Torrents of burning lava are scattered in all directions, blinding you with their incandescent light. You hold your breath as much as possible from the stench of the body's ignited insides.`,
        `When the dust finally settles down, you're mostly unharmed. You look around for $$BestFriend$, only to discover with horror that your luck has not been shared...`,
      ], postBossPhase2);
    }

    this.interaction = function(){
      if(STATS.flag("StoryOfTheAncients")) {
        if(ABILITIES.has_ability("_lieutenant_confronted")) {
          BATTLE.api.make("pandemonium/lieutenant", postBossDialog);
        } else if(INVENTORY.has_ancient_armament()) {
          new CenteredTextMenu("What will you use?", [
            {"text": "The ancient artifact", "effect": function() {  BATTLE.api.make("pandemonium/_lieutenant_first_encounter"); }},
            {"text": "Your faith", "effect": function() { BATTLE.api.make("pandemonium/lieutenant", postBossDialog); }},
          ]);
        } else {
          BATTLE.api.make("pandemonium/lieutenant", postBossDialog);
        }
      } else {
        if (ABILITIES.has_ability("_lieutenant_confronted")){
          TextBannerSequence.make([
            `$$demon_lieutenant$: "I'll spare you this time. I have pity for you. You brought me some amusement, and I am weary of this war. But if I ever see you here again, or if you attempt to pass through to go to hell, I will have to kill you."`,
            `$$Ren$: "So... What now?"`,
            `$$BestFriend$: "I heard that west of here is the Forgotten Fissure, one of the oldest ruins from the time of the ancestors that we haven't checked out yet. Maybe we'll find an answer there?"`
          ]);
        } else {
          BATTLE.api.make("pandemonium/_lieutenant_first_encounter");
        }
      }
    }
  }
}

class S_Maou extends SimpleObject {
  constructor(x, y){
    super(x, y, 300, 300, "pandemonium/maou", "obj_dark");
    this.adjust_hitbox(50,10,180,100);

    var winn = function() {
      TextBannerSequence.make([
        `With a final prayer to the Goddess, you deliver the final blow to Her sworn enemy...`,
        `As he draws his last breath, you cannot help but be intrigued by his facial expression. He looks... relieved?`,
        `Something is not quite right...`,
      ], function(){
        CURRENTLEVEL.setup("end@A");
      });
    }

    var optionGenerator = function(text, prompt, next) {
        var options = [
          {"text": "Kill " + DICTIONARY.get(["demon_lord"]), "effect": winn},
        ];
        if (ABILITIES.has_ability("_new_game_plus")){
          options.push({"text": "Spare " + DICTIONARY.get(["demon_lord"]), "effect": next});
        }
        var choice = function() {
          new CenteredTextMenu(prompt, options);
        }
        return function(){
          TextBannerSequence.make(text, choice);
        }
    }

    var afterSecretEnd = function(){
      TextBannerSequence.make([
        `You're still shocked by what you saw $$demon_lord$ do to himself. What kind of being is the Goddess, to inspire such terror in her servants? The only way to find out is to head for Heaven, which shouldn't be far from this castle.`,
      ]);
    }
    var secretEnd = function(){
      ABILITIES.unlock("_secret_ending_chosen");
      TextBannerSequence.make([
        `Unsure of what you're doing, you slowly nurse $$demon_lord$ back to life.`,
        `When he regains consciousness, his face distort in a level of fear you've never seen on a demon before. Sweat runs down his forehead and he struggles to find his words. He grabs you, shakes you, and screams in a panicked voice.`,
        `$$demon_lord$: "What the fuck have you done, kid! We're so screwed! She'll never forgive us!"`,
        `$$Ren$: "What... Who do you mean?"`,
        `$$demon_lord$: "The Goddess! She's more powerful than you can ever imagine! She transcends time, space and dimensions!"`,
        `$$Ren$: "You... Know the Goddess?"`,
        `$$demon_lord$: "Of course! She created all things! I've been serving Her dutifully, and you fucked it all up!"`,
        `$$Ren$: "Wait a minute... You were serving the Goddess?"`,
        `$$demon_lord$: "Yes! You'd be a fool to oppose Her Almighty Will! I had one job to do, I was supposed to die, and that's fucking it! Why didn't you just kill me? What awaits us now is worse than death..."`,
        `$$Ren$: "What?"`,
        `$$demon_lord$: "` + RANDOM.glitch(`Maybe it's not too late! Kill me! Please! Kill me! Maybe we can still fix it!`, 0.01) + `"`,
        `$$demon_lord$ ` + RANDOM.glitch(`pitifully grabs your arm and shakes your weapon, but you're still too puzzled to do anything. The colossal demon starts sobbing like a newborn.`, 0.01),
        `$$demon_lord$: "` + RANDOM.glitch(`Please! I don't want to imagine what She will do to me! I've failed her! I was supposed to punish the humans for their hubris, and die peacefully when my time comes!`, 0.02) + `"`,
        `$$Ren$: "You mean... The Goddess is behind the demon invasion?"`,
        `$$demon_lord$: "` + RANDOM.glitch(`How could She not be? She is Divine! Everything is Her Holy Will! I just obey Her commands! Oh, Goddess, forgive me! Forgive him! Please, just let me die!`, 0.03) + `"`,
        RANDOM.glitch(`Sobs turn into convulsions. It truly is a pathetic sight. Strident wails raise from the contorted muscular body.`, 0.04),
        `$$Ren$: "Focus! There may still be hope! I want to meet Her. Where is She?"`,
        `$$demon_lord$: "` + RANDOM.glitch(`Heaven! She's in Heaven, of course. She's always been near, but you couldn't see Her. It's pointless, though, you cannot survive Her wrath. We're doomed. This world has no point anymore, this life has no meaning. Please, oh, Mighty One, please spare little miserable me!`, 0.06) + `"`,
        `$$demon_lord$ ` + RANDOM.glitch(`lets out a high pitched scream that pierces your ears. The whimper continues.`, 0.1),
        `$$demon_lord$: "` + RANDOM.glitch(`She's here! She sees All! She's Everywhere! And She's angry at us! Oh please, please! Her reckoning has come! Please, let it stop! Kill me!`, 0.15) + `"`,
        `Before you could do anything, you watch in horror as $$demon_lord$ burrows his fanged fingers deep within his chest and rips his body apart. Blood explodes in all directions as the massive lump of incandescent flesh crashes on the ground. $$demon_lord$ let out a final whisper.`,
        `$$demon_lord$: "Forgive me, Mother! I failed you!"`,
      ], afterSecretEnd);
    }

    var endFight10 = optionGenerator(["Fine! Have it your way! Don't come crawling back if you're stuck in a neverending nightmare. I gave you plenty of chances to end this adventure. There's nothing else."], "Will you refuse the ending?", secretEnd);
    var endFight9 = optionGenerator(["Why are you so intent on disobeying? You'll only prolong your suffering, and everyone else's. We all want this to be over. Even $$demon_lord$, I'm sure. He'd beg you if he could talk!"], "Will you slaughter an unconscious being?", endFight10);
    var endFight8 = optionGenerator(["Are you seriously going to spare the monster that caused all this suffering? He killed most of your kind! It makes you basically an accomplice! Is this really the side you want to be on?"], "Will you oppose what you should do?", endFight9);
    var endFight7 = optionGenerator(["You're unbelievable! Stop it! You're not supposed to resist! You're not supposed to go this way!"], "Will you resist the urge to kill?", endFight8);
    var endFight6 = optionGenerator(["Come on! You're supposed to kill him! He's the Big Bad Boss! What else is there? What other ending do you want there to be? Just listen to me! It's not too late for a happy resolution!"], "Will you murder the demon?", endFight7);
    var endFight5 = optionGenerator(["Just kill him already! It's not that hard! He deserves it! Think of all he's done! Avenge your friend!"], "KILL?", endFight6);
    var endFight4 = optionGenerator(["This is the last effort you'll ever need to do! Think of the peace that will come after! You'll be a hero! You'll have won!"], "Will you triumph?", endFight5);
    var endFight3 = optionGenerator(["If you waver now, all your efforts will be for nothing! Your whole journey will be meaningless! $$BestFriend$ will have died in vain!"], "Will you free the world from suffering?", endFight4);
    var endFight2 = optionGenerator(["This is the only way to rid the world of the demon threat, and all the suffering it brings! Without their leader, the demons will retreat and $$world_name$ will be saved!"], "Will you kill the Demon Lord?", endFight3);
    var endFight = optionGenerator(["$$demon_lord$ is on the floor, unconscious. Victory is in your grasp."], "Will you deliver the final blow?", endFight2);

    var startFight = function(){
      BATTLE.api.make("pandemonium/lord", endFight);
    }

    var extra = "";
    if(STATS.flag("FoughtMaou")>0){
      extra = " In fact, I've been one of your victims before! I've challenged you " + STATS.flag("FoughtMaou") + " times in the past already!";
    }

    this.interaction = function(){
      if(! ABILITIES.has_ability("_secret_ending_chosen")){
        TextBannerSequence.make([
          `$$demon_lord$: "So you made it all the way here, little vermin! Congratulations are in order, I suppose. But you must know that it is meaningless..."`,
          `$$Ren$: "Silence! I'll make you pay for all the lives you destroyed! For all my fellow humans! For $$BestFriend$!"`,
          `$$demon_lord$: "You're more stupid than I thought... Do you really think you're the first one to come here? Do you have any idea how many silly brats like you I've had to crush? None of them ever made any difference!"`,
          `$$Ren$: "Well, this time won't be the same! I know very well how many times you have to fail when the odds are stacked against you!${extra} But it changes nothing! I'll succeed eventually, because the Goddess is with me!"`,
          `$$demon_lord$: "Poor fool, what do you know of the Goddess?"`,
          `$$Ren$: "I know that She will guide me to victory!"`,
        ], startFight);
      } else {
        afterSecretEnd();
      }
    }
  }
}


class S_RockColumnGoddess extends SimpleObject {
  constructor(x, y, seed){
    super(x, y, 47,129, "cave/godesscolumn");
    this.adjust_hitbox(0,0,40,30);
  }

  interaction() {
    var consume = function(){
      var newFloor = new S_MudFloor(2125,2725,50,550);
      INVENTORY.increase(ITEM.Gemstone, -2);
    }
    var putgems = function(){
      TextBannerSequence.make([
        `You hear a click as soon as the second gem is enshrined in the socket. The rock in front of you splits up and unveils a path that burrows even deeper in the mountain.`,
      ], consume);
    }

    var sequel = function(){
      if(INVENTORY.count(ITEM.Gemstone) == 1){
        TextBannerSequence.make([
          `You only have one stone.`,
          `$$Ren$: "We need to look for the other one. I'm pretty sure it is specifically on this mountain, not anywhere else in the world."`,
        ]);
      } else if(INVENTORY.count(ITEM.Gemstone) == 2){
        new CenteredTextMenu("Place your gems in the sockets?",
                    [
                      {"text": "Yes", "effect": putgems},
                      {"text": "No", "effect": "##CLOSE"},
                   ]
                 );
      }
    }

    TextBannerSequence.make([
      `This rock pillar has a shape oddly reminiscing of the Goddess, except that there are two holes where the eyes should be.`,
    ], sequel);
  }
}



class SE_gem extends S_event {
  constructor(x, y) {
    super(x, y);
    this.icon_type = "event_purse";
  }

  real_interaction(extra_callback) {
    INVENTORY.increase(ITEM.Gemstone);
    var self = this;

    var extras = [
      `$$DumbMuscles$: "What is that? It looks so cool! But it doesn't seem to have any use..."`,
      `$$Ren$: "I'm pretty sure it's something that will turn out to be important later. It probably unlocks something. Better keep it carefully!"`,
      `$$DumbMuscles$: "For once I agree with your weird intuition, it does look important."`,
    ];
    if(ABILITIES.has_ability("_DumbMuscles_searchinggemstones")){
      extras = [
        `$$DumbMuscles$: "What is that?"`,
        `$$Ren$: "It's one of the gemstones we need for the eyes of the Goddess in the cave, did you forget already?"`,
      ];
    }


    TextBannerSequence.make([
      "You found something on the ground. It's a " + ITEM.Gemstone + ".",
    ].concat(extras), function(){
      self.destroy();
    });
  }

}
