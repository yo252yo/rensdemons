// Maps to dictionary keys
const PARTYMEMBERS = {
  Ren: "Ren",
  BestFriend: "BestFriend",
  PreciousChild: "PreciousChild",
  UpbeatDojikko: "UpbeatDojikko",
  StreetSmart: "StreetSmart",
  WiseOld: "WiseOld",
  TraitorFisher: "TraitorFisher",
  SavageChild: "SavageChild",
  GeniusProdigy: "GeniusProdigy",
  FemmeFatale: "FemmeFatale",
  DisguisedPrincess: "DisguisedPrincess",
  DumbMuscles: "DumbMuscles",
  TorturedSoul: "TorturedSoul",
  RetiredProtector: "RetiredProtector",
  SnobRich: "SnobRich",

  isPartyMember: function(s){
    for (var i in PARTYMEMBERS){
      if(PARTYMEMBERS[i] == s){
        return true;
      }
    }
    return false;
  },
};


const PARTY = {
  _members: [],

  description: function(name) {
    switch (name) {
      case "Ren":
        if (ABILITIES.has_ability("_trial_passed")){
          return `You are a child of ${DICTIONARY.get("town_1")}. After succeeding in the Trial of the Second-Borns, you have learned that you are the The Promised Child. The Goddess chose you to bring salvation to the world of ${DICTIONARY.get("world_name")} and its inhabitants. You set out on a journey to strengthen yourself, in order to defeat the evil ${DICTIONARY.get("demon_lord")}.`;
        } else {
          return `You are a child of ${DICTIONARY.get("town_1")}. There does not seem to be anything special about you.`;
        }
      case "Goddess":
        return `The Goddess is the guardian deity of ${DICTIONARY.get("world_name")}. In Her infinite wisdom, She chose you as Her vessel to save the world from destruction. She is always with you, in your heart.`;
      case PARTYMEMBERS.BestFriend:
        return `${DICTIONARY.get(PARTYMEMBERS.BestFriend)} grew up with you in the town of ${DICTIONARY.get("town_1")}. Since you were of similar age, and your families lived near each other, you spent most of your childhood together. As time passed, you watched ${DICTIONARY.get(PARTYMEMBERS.BestFriend)} grow into the most caring and thoughtful person, whose smile always spread joy to the people around.<br /><br />
                Soon, you were never seen without one another, and the term "best friend" is almost not enough to capture the complicity that tie you two together. It was pretty obvious that ${DICTIONARY.get(PARTYMEMBERS.BestFriend)} would support you until the end, and certainly not let you leave on your quest alone.`;
      case PARTYMEMBERS.PreciousChild:
        return `${DICTIONARY.get(PARTYMEMBERS.PreciousChild)} is the younger brother of ${DICTIONARY.get(PARTYMEMBERS.BestFriend)}. You've spent a lot of time playing with him in ${DICTIONARY.get("town_1")}. You think of him as your little brother too. And since he's also a Second-Born, ${DICTIONARY.get(PARTYMEMBERS.PreciousChild)} really looks up to you. His admiration for you is no secret.<br /><br />
                ${DICTIONARY.get(PARTYMEMBERS.PreciousChild)} always puts on a brave face, and is not afraid of standing his own ground, but nobody ever takes him seriously. He may think he's fierce, but people just find him adorable. His rebellious pout only manages to melt hearts. As a result, nobody can say no to him.`;
      case PARTYMEMBERS.UpbeatDojikko:
        return `${DICTIONARY.get(PARTYMEMBERS.UpbeatDojikko)} is a fortune teller living in ${DICTIONARY.get("town_1")}. She has a way with the spirits, who let her peek into the fabric of time to reveal the things to come. In fact, she would probably know all the secrets of the universe by now, if only she wasn't such an airhead.<br /><br />
                ${DICTIONARY.get(PARTYMEMBERS.UpbeatDojikko)} was very young when she lost her father to the monsters of ${DICTIONARY.get("demon_lord")}'s army, but not so young that she could remain oblivious to how this loss destroyed her mother's soul. She swore to always spread joy and happiness around her, to bring back the light in her mother's life. It's not often that she pauses to wonder if anything darker is hiding behind her warm smile, her upbeat demeanor and her legendary clumsiness.`;
      case PARTYMEMBERS.StreetSmart:
        return `${DICTIONARY.get(PARTYMEMBERS.StreetSmart)} is a beastmaster you encountered in a forest near ${DICTIONARY.get("town_1")}. Behind his innocent face hides a sly and calculating brain. Any means is good for him to reach his goals. Fortunately, his big heart means that he aims for nothing besides the happiness of those he cares about.<br /><br />
                The war simply did not allow him the luxury to abide by the law. Very young, he had to resort to thievery to save his family from starvation. Growing up, he discovered in himself a talent that granted him a more stable life: he was very gifted with animals. Since then, he's become a pillar of the underworld of the kingdom, from poaching to trafficking or even beast fights. Yet, he has not completely given up hope for a better world, or to find ${DICTIONARY.get('han_dog')}, his lost companion...`;
      case PARTYMEMBERS.WiseOld:
        return `All Churches in the kingdom have been waiting for the Promised Child, but the Church of ${DICTIONARY.get("town_2")} is home of the Tutor, a priest with the privilege to dedicate their whole life to learning and studying in order to support the Promised Child in due time. This is ${DICTIONARY.get(PARTYMEMBERS.WiseOld)}'s position. Usually, the Tutor passes the torch to their apprentice at a younger age, but ${DICTIONARY.get(PARTYMEMBERS.WiseOld)} was determined to remain in function in spite of his age. Maybe he figured out in some way that he would encounter the Promised Child.<br /><br />
                Years of solitude in libraries have turned him into quite a peculiar character, and people tend to get uncomfortable faced with his eccentricity. But nobody would question his dedication to his duties: if he gave his approval and joined the Promised Child, it must mean that the Child is ready for the challenges ahead.`;
      case PARTYMEMBERS.SavageChild:
        return `${DICTIONARY.get(PARTYMEMBERS.SavageChild)} was the Second-Born in a loving family. Perhaps too loving. Fearing she might succumb to the Trial of the Second-Borns, her mother committed the ultimate heresy of not volunteering her. She faked ${DICTIONARY.get(PARTYMEMBERS.SavageChild)}'s death to even her husband, and abandonned the poor baby in a forest to give her better odds of growing up.<br /><br />
                ${DICTIONARY.get(PARTYMEMBERS.SavageChild)} grew up among wild beasts and owes her survival to their clemency. She had to become fierce, agile and quick-witted, and she lacks the basics of civilization. Having to fend for herself made her very cautious, but she does know a good trail when she sees one. When she assessed that you could be a reliable source of food, she opted to follow you. But don't make the mistake of thinking you've tamed her just because you've named her.`;
      case PARTYMEMBERS.TraitorFisher:
        return `${DICTIONARY.get(PARTYMEMBERS.TraitorFisher)} loves cooking. She turns the study of ingredients and their interactions into an almost scientific discipline. She's always made a point to gather the best ingredients herself. That's how she also became an expert at fishing. But one day, while she was trying to catch a promising fish, she fell into the hands of the merfolks.<br /><br />
                ${DICTIONARY.get(PARTYMEMBERS.TraitorFisher)} is very bright and calculating. She saw there an opportunity. She started to work as a double agent in the Siren army, spying for the humans. But she also had to prove her loyalty to her new masters by sabotaging mankind. And she quickly betrayed both to join you on your quest. She supposedly wants to discover new recipes, but her actual motivations are mysterious. It's impossible to keep track of all her convoluted schemes. In the end, only she knows where her true allegiance lies...`;
      case PARTYMEMBERS.GeniusProdigy:
        return `${DICTIONARY.get(PARTYMEMBERS.GeniusProdigy)} is one of the very few humans lucky enough to not have to worry about their survival every day. Otherwise, he would not have lived very long. He never pays attention to the down-to-earth problems of daily life. Instead, he's always in his own little world, daydreaming about his latest discoveries, pondering existential questions, designing experimental protocols, reading whatever he can find...<br /><br />
                Born in an aristocratic family, ${DICTIONARY.get(PARTYMEMBERS.GeniusProdigy)} took advantage of his privileged position to follow his passion, to the dismay of his parents. His curiosity lead him to explore and analyze many parts of the world, until his steps brought him to you, who stands as the biggest mystery he's ever encountered. Naturally, he couldn't let it go without getting answers.`;
      case PARTYMEMBERS.FemmeFatale:
        return `Like many, ${DICTIONARY.get(PARTYMEMBERS.FemmeFatale)} was orphaned by the war. She was very young when both her parents died and it fell on her to take care of her younger siblings. She spent a long time begging for scraps in the streets of ${DICTIONARY.get("town_4")} before she got old enough to use her body to her advantage.<br /><br />
                In a cruel world, you sometimes do whatever it takes to survive. ${DICTIONARY.get(PARTYMEMBERS.FemmeFatale)} has found a way to exploit base human instincts to put food on the table of her family. She feels pride in using people's impulses to her advantage. So she got intrigued and moved when she met someone naive like you who didn't see her as a product. Someone like that needs her protection, and maybe she can even make a few coins in the process...`;
      case PARTYMEMBERS.DisguisedPrincess:
        return `Born to the royal family, ${DICTIONARY.get(PARTYMEMBERS.DisguisedPrincess)} never liked the pageantry and ceremonies that it entailed. The young aristocrat was always dreaming of faraway lands and waiting impatiently for the visit of the next adventurer or storyteller in the court. As a teenager, the walls of the royal castle started to feel like a prison, and ${DICTIONARY.get(PARTYMEMBERS.DisguisedPrincess)} began to view with disdain the futile games and schemes that the people in power were doing.<br /><br />
                Gardening was a welcome escape out of the oppressive castle, and it grew steadily into a passion for herbalism. One day, ${DICTIONARY.get(PARTYMEMBERS.DisguisedPrincess)} discovered in the royal library tomes that told of poisons and elixirs that might come in handy for an escape. Armed with this knowledge, the self-taught alchemist started to draft a plan to leave the castle and join the common folk, when you appeared as a welcome help.`;
      case PARTYMEMBERS.DumbMuscles:
        return `The Goddess was not kind to ${DICTIONARY.get(PARTYMEMBERS.DumbMuscles)} and gave him at birth less than average mental abilities. He got picked on and teased a lot by the other children. But fortunately, he had no shortage of courage and determination. Through rigorous training, he built up his body to ensure he would never again be the butt of the joke.<br /><br />
                Through all of this, his heart never tarnished, for his kindness was on par with his resolve. He longed to use his cultivated strength for the good of his fellow humans. Becoming a mercenary adventurer seemed the right thing to do. He did not foresee that the quests could be so difficult. Luckily, he found in you a mentor and an inspiration that he could follow to learn the ropes until he is ready to make his own way.`;
      case PARTYMEMBERS.TorturedSoul:
        return `${DICTIONARY.get(PARTYMEMBERS.TorturedSoul)}'s past is dark, full of traumas secrets. Nobody really knows the hardships the poet had to go through that left him forever scarred, but it is assumed that it might have something to do with chickens. In any case, the weight of that somber history is visible on art. And his face. And his gestures. And his clothes. He is not one to hide the feelings of suffering that swallow his soul.<br /><br />
                In a hostile nonsensical world, suicide seemed to ${DICTIONARY.get(PARTYMEMBERS.TorturedSoul)} as the only way to end his pain. But none of his attempts were successful. He got intrigued by your peculiar relationship to death, and decided to stick to your side, partly out of morbid curiosity, partly following his death wish that your impossible quest was bound to fulfill.`;
      case PARTYMEMBERS.RetiredProtector:
        return `${DICTIONARY.get(PARTYMEMBERS.RetiredProtector)} had a long brilliant career in the military.
                ${DICTIONARY.get('RetiredProtector_bio')}
                Yet, some calls cannot be ignored, and so ${DICTIONARY.get(PARTYMEMBERS.RetiredProtector)} takes up once again the armor he had donned to protect you on your dangerous quest.`;
      case PARTYMEMBERS.SnobRich:
        return `${DICTIONARY.get(PARTYMEMBERS.SnobRich)} grew up with a silver spoon in her mouth. As the sole daughter to the wealthiest family in the kingdom, she never lacked anything, or faced any adversity. Some say this made her less than agreeable. She lived in a luxurious villa in the opulent city of ${DICTIONARY.get("town_4")}.<br /><br />
                But chance is fickle in this town, and all of this changed recently, when her father lost all their fortune gambling. Chased from her home, forced in the streets to mingle with commoners for the first time, she does not yet understand her new situation. How could she when she knows nothing about living without the kind help of an enormous wealth? Deep in denial, she is sure that the world will somehow keep providing to her needs and fix this little hiccup. And it seems that what the world sent her is you.`;
      default:
        return "";
    }
  },

  factory: {
    export: function() {
      return {
        members: PARTY._members,
      };
    },

    import: function(save) {
      PARTY._members = save.members;
    },

    make_new: function() {
      PARTY._members = [];
    },
  },

  has_member: function(name) {
    return PARTY._members.includes(name);
  },

  add: function(name) {
    PARTY._members.push(name);
    STATS.record.unlock(name);
    CONSOLE.log.party(name + " joined");
  },

  remove: function(name) {
    PARTY._members = PARTY._members.filter(function(item) {
        return item != name;
    })
    CONSOLE.log.party(name + " left");
  },

  changeNickname: function(name, prompt_text) {
    var trueName = PARTY.display._get_name(name);
    var newName = prompt(prompt_text || ("Chose a nickname for " + trueName), trueName);

    if (newName) {
      DICTIONARY.set(name, newName.replaceAll(' ',''));
    }
  },

  newChangeNickname: function(name, prompt_text, callback) {
    var fullcallback = function(newName){
      if (newName) {
        DICTIONARY.set(name, newName.replaceAll(' ',''));
      }
      callback();
    }
    var trueName = PARTY.display._get_name(name);
    new PromptTextMenu(prompt_text || "Chose a nickname for ", trueName, fullcallback);
  },

  display: {
    _get_name: function(name) {
      if(DICTIONARY.has(name)){
        return DICTIONARY.get(name);
      } else {
        return name;
      }
    },

    _get_entry: function(name){
      var prefix = `<img style="width:50px;height:50px;margin:5px;margin-bottom:-5px;" src="assets/portraits_small/${name}.png" />`;
      return prefix + PARTY.display._get_name(name);
    },

    character: function(name) {
      var nickname = PARTY.display._get_name(name);
      var original = PARTY.display._get_name("ORIGINAL_" + name);

      var nameString = nickname;
      if (original != nickname){
       nameString += "(" + original + ")";
     }

     var extra = SCREEN.is_mobile() ? "clear:both;" : "float: left;";
      new FullTextMenu(`<b>${nameString}</b><hr/>
                      <div style='width:300px;height:300px;position:relative;${extra}' id='character_portait_slot'>
                      </div>` + PARTY.description(name),
                    [
                     {"text": "Change nickname", "effect": function(){ PARTY.newChangeNickname(name); }},
                     TEXTMENU_EMPTYROW,
                     {"text": "Back to party", "effect": "##BACK"},
                     TEXTMENU_EMPTYROW,
                     {"text": "Back to game", "effect": "##CLOSEWITHFOLLOW"}
                   ]);

       var d = document.getElementById('character_portait_slot');
       new LayeredImage("assets/portraits_large/" + name + "_$.png", 300, 300, d);
    },

    menu: function() {
      var options = [
        {"text": PARTY.display._get_entry("Ren"), "effect": function(){ PARTY.display.character("Ren"); }}
      ];
      if (ABILITIES.has_ability("_trial_passed")) {
        options.push({"text": PARTY.display._get_name("Goddess"), "effect": function(){ PARTY.display.character("Goddess"); }});
      }
      for(var member of PARTY._members){
        var f = function(m) {
          options.push(
            {"text": PARTY.display._get_entry(m),
            "effect": function(){ PARTY.display.character(m); }});
        }
        f(member);
      }

      options.push(TEXTMENU_EMPTYROW);
      options.push({"text": "Back to game", "effect": "##CLOSEWITHFOLLOW"});
      new CenteredTextMenu("Current party", options);
    },
  },
}
