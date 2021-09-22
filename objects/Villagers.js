
class VillagerSoul extends SoulBattleObject {
  constructor(type, sprite_nb, seed){
    super(seed * -1000, seed * -1000, "villagers/" + type, sprite_nb);
    this.gen = new Generator(seed);

    if (sprite_nb == 2 || sprite_nb == 3) {
      this.vname = this.gen.pick(DATASETS.female_names);
    } else {
      this.vname = this.gen.pick(DATASETS.male_names);
    }

    switch(type){
      case CITIES.acceptance:
        this.setup_acceptance();
        break;
      case CITIES.denial:
        this.setup_denial();
        break;
      case CITIES.fear:
        this.setup_fear();
        break;
      case CITIES.hope:
        this.setup_hope();
        break;
      case CITIES.indulgence:
        this.setup_indulgence();
        break;
      case CITIES.mourning:
        this.setup_mourning();
        break;
    }
  }

  setup_acceptance() {
    var attack = {
      attack_amplitude: 0.1, // Between 0 and 1
      warning_time_s: 2,
      react_time_s: 1,
      time_variation: 0.5, // 1 = 100%
    };

    this.add_enemy_action(`There's an awkward silence during which you don't know what to say.`, attack);
    this.add_enemy_action(`${this.vname} is looking at you in silence.`, attack);
    this.add_enemy_action(`You feel that the villager's gloominess is getting to you.`, attack);

    this.add_enemy_action(`${this.vname} stares at you with empty eyes.`);
    this.add_enemy_action(`${this.vname} stands still in front of you.`);
    this.add_enemy_action(`${this.vname} sighs.`);
    this.add_enemy_action(`${this.vname} simply waits for the conversation to go on.`);


    var start_text = this.gen.pick([
      `The villager salutes you with a monotonous voice.`,
      `The villager barely raises an eyebrow noticing you.`,
      `The villager doesn't react to your presence.`,
      `The person in front of you is barely moving. If it weren't for their breathing, you might think they were a statue.`,
      `${this.vname}: "Hi!"`,
      `${this.vname}: "Hi! We're glad your path lead you here. We hope you'll share our peace!"`,
    ]);
    this.set_description(start_text);


    this.add_interaction("Weather",`${this.vname}: "If the Goddess sent us these storms, it's surely that the wind is good for us. A human can survive on very little food, you know..."`);
    this.add_interaction("Weather",`${this.vname}: "I don't look at the sky anymore, that way I'm never disappointed if it's not sunny!"`);
    this.add_interaction("Weather",`${this.vname}: "You're looking at things the wrong way. What good is the sun, apart for the crops? What good are the crops, apart keeping us alive longer? And why would I want to be apart from the Goddess any longer than necessary?"`);

    this.add_interaction("Crops",`${this.vname}: "I don't really need food, I'll eat while there is some, but I'll be glad to join the Goddess when She calls me back to Her."`);
    this.add_interaction("Crops",`${this.vname}: "Wheat is the food of the body. Mine is already dead. Soon it will be nothing but dust. What matters is the food of the spirit."`);
    this.add_interaction("Crops",`${this.vname}: "I don't mind famine. If we had food, we'd stay alive longer, and then we'd suffer for longer."`);

    this.add_interaction("War",`${this.vname}: "War will always be with us, it's simply the best way for us to go back to our Goddess."`);
    this.add_interaction("War",`${this.vname}: "When monsters raid us next, I won't fight back. Death is the only relief from the fear of the next raid."`);
    this.add_interaction("War",`${this.vname}: "We have less raids than other parts of the Kingdom because we send sacrifices to the monsters. It appeases their appetite."`);
    this.add_interaction("War", [`${this.vname}: "Best not think about it!"`,
                                `$$Ren$: "Shouldn't you prepare yourselves to defend?"`,
                                `${this.vname}: "What's the use, we don't stand a chance. Best prepare ourselves for our inevitable demise."`]);

    this.add_interaction("Hunt",`${this.vname}: "Yes, we do hunt most of our food. It's a very spiritual moment between the hunter and their prey. We'll all be united in death, sometime."`);
    this.add_interaction("Hunt",`${this.vname}: "I like to hunt and to take other animals' lives. It's good practice for when I'll have to take my own."`);
    this.add_interaction("Hunt",`${this.vname}: "What's the point in hunting? Why take innocent lives to prolong ours, since we are doomed anyway."`);

    this.add_interaction("Taxes",`${this.vname}: "We don't pay taxes to the kingdom. What's the point, soon there won't be a kingdom left."`);
    this.add_interaction("Taxes",`${this.vname}: "Yes, I usually give all my money. I won't need it soon, anyway."`);
    this.add_interaction("Taxes",`${this.vname}: "Since I'm dying soon, I'm don't keep any money. So there's nothing to take from."`);

    this.add_interaction("King",`${this.vname}: "He owns us. I'll follow his orders and do whatever I can to contribute, even if it's a lost cause!"`);
    this.add_interaction("King",`${this.vname}: "Poor lad, thrown in charge of this mess and tasked with an impossible quest. It's a lost battle, and yet he has to fight... I tell you, wouldn't want to be him..."`);
    this.add_interaction("King",`${this.vname}: "Sometimes I dream about his death. Surely after he's gone we can all officially give up, and this whole suffering will end."`);

    this.add_interaction("Health",`${this.vname}: "Diseases are a blessing in disguise. Most often the pain is short and you die pretty fast."`);
    this.add_interaction("Health",`${this.vname}: "I don't fear diseases. I'm sure monsters will kill you before you get a chance to get sick."`);
    this.add_interaction("Health",`${this.vname}: "Health comes and goes, it's unavoidable. I'm not a big believer in hygiene. There's no use trying to avoid plagues, they'll get to you eventually."`);

    this.add_interaction("Family",`${this.vname}: "I don't want children. I can't bring myself to impose this world of suffering on others."`);
    this.add_interaction("Family",`${this.vname}: "Most of my family is already dead. My siblings are waiting for me with the Goddess. I can't wait for my turn to join them."`);
    this.add_interaction("Family",`${this.vname}: "My only child was stillborn. It's probably just as well, at least she didn't suffer. She might be the lucky one."`);

    this.add_interaction("Promised Child",`${this.vname}: "The Promised Child could come, or not. It doesn't matter. It's too late."`);
    this.add_interaction("Promised Child",`${this.vname}: "I'm sure the Promised Child was born a long time ago and was killed by the monsters. Maybe there was even several Promised Children."`);
    this.add_interaction("Promised Child",`${this.vname}: "I think it's pretty clear by now that the Promised Child is not coming. We've waited hundreds of years. Why would they come now?"`);

    this.add_interaction("Job",`${this.vname}: "I have the privilege to work on building tombs. It's an important responsibility. Our lives are transient, but our final rest will be eternal!"`);
    this.add_interaction("Job",`${this.vname}: "I offer council to prepare people for death. I organize sessions of prayers and meditations. I guess you could call me a guide for the spirits."`);
    this.add_interaction("Job",`${this.vname}: "I'm what you'd call the executioner, I guess. I'm in charge of picking the sacrifices, preparing them, and executing the ceremony at the altar. It's probably the most important job of all!"`);
    this.add_interaction("Job",`${this.vname}: "I don't have a job. I don't want to waste my time building things that are just going to be destroyed or disappear."`);

    this.add_interaction("Rumors",`${this.vname}: "I hear there will be a raid soon. Many will die. I hope my turn comes."`);
    this.add_interaction("Rumors",`${this.vname}: "Many here are saying that the Goddess has abandoned us. I can't tell if it's true, but it sure looks like it."`);
    this.add_interaction("Rumors",`${this.vname}: "People around here keep saying that the grave is a better place than this wretched world. I'm not sure if I believe them, but if things keep piling up, I might..."`);

    this.add_interaction("Dreams",`${this.vname}: "My only wish is for my death to be painless."`);
    this.add_interaction("Dreams",`${this.vname}: "I just wish the pain would stop."`);
    this.add_interaction("Dreams",`${this.vname}: "I hope our sacrifice pleases the Goddess and spares us a bit from suffering."`);

    this.add_interaction("Traditions",`${this.vname}: "Every month, we designate a sacrifice, who gets killed in the church as an offering to the Goddess. We hope it eases her anger, and lessens our punishment."`);
    this.add_interaction("Traditions",`${this.vname}: "We do regular sacrifices to the Goddess. We all want to give ourselves to Her, so we draw the lucky chosen at random. Only our blood willingly offered can appease the Goddess."`);
    this.add_interaction("Traditions",`${this.vname}: "No matter how many executions we do, the Goddess will not stop punishing her. I don't dare imagine how much worse things would be without our sacrifices."`);

    this.add_interaction("City",`${this.vname}: "Welcome to the best city in the world! The only place with the courage to look at reality in the face!"`);
    this.add_interaction("City",`${this.vname}: "Welcome to the best city in the world, where we know how wretched our kind is. We try very hard to atone and to appease the anger of the Goddess by making sacrifices."`);
    this.add_interaction("City",`${this.vname}: "Things are horrible, the only sensible thing to do is to accept our inevitable death and learn to love our suffering."`);
    this.add_interaction("City",`${this.vname}: "Here, we value wisdom and knowledge. Once you know your fate, you must accept it."`);

    this.add_interaction("Religion",`${this.vname}: "Praise be to the Goddess and may She forgive us and lessen Her punishment!"`);
    this.add_interaction("Religion",`${this.vname}: "We pray, offer blood and lives, so that the Goddess may forgive us and ease our pain!"`);
    this.add_interaction("Religion",`${this.vname}: "Religion is the only way to forgiveness which will keep our punishment bearable."`);
  }

  setup_denial() {
    var attack = {
      attack_amplitude: 0.5, // Between 0 and 1
      warning_time_s: 1,
      react_time_s: 1,
      time_variation: 0.4, // 1 = 100%
    };
    this.add_enemy_action(`The constant cheerfulness of your conversation partner is a bit too much to handle.`, attack);
    this.add_enemy_action(`You need to carefully craft your answer to not contradict ${this.vname}'s weird inconsistent answer.`, attack);
    this.add_enemy_action(`You try to tiptoe carefully around the truth to not break ${this.vname}'s rosy bubble of optimism.`, attack);

    this.add_enemy_action(`${this.vname} smiles in silence. Their enthusiasm is almost contagious.`);
    this.add_enemy_action(`You listen as ${this.vname} rambles on about how great this city is.`);
    this.add_enemy_action(`${this.vname} goes on in pointless details about how great a day they're having.`);


    var start_text = this.gen.pick([
      `The villager politely greets you.`,
      `The villager greets you with open arms and a friendly face.`,
      `The villager doesn't seem to notice you. They are startled when you speak.`,
      `The person in front of you is smiling in spite of what seems to be a pretty deep fresh wound on their arm.`,
      `${this.vname}: "Hello! Isn't it a beautiful day?"`,
      `${this.vname}: "Hello! Welcome to the best city on this world!"`,
    ]);
    this.set_description(start_text);


    this.add_interaction("Weather", [`${this.vname}: "Is there anything better than this great sunshine?"`,
                                    `You are perplexed, as the sky is full of dark clouds.`]);
    this.add_interaction("Weather", [`${this.vname}: "I love days of warm weather like this"`,
                                    `$$Ren$: "But.. it's cold, and raining!"`,
                                    `${this.vname}: "Poor child, you're delusional. Your brain must be hurt from the tough circumstances you've lived through..."`]);
    this.add_interaction("Weather", [`${this.vname}: "This is the perfect temperature for crops!"`,
                                    `${this.vname} points in a direction where you can see a few fruits on the ground. They are obviously smaller than they should have been, as if they didn't develop properly.`]);

    this.add_interaction("Crops", `${this.vname}: "What do you mean reserves are slim? You must be misinformed, there's plenty of food in store!"`);
    this.add_interaction("Crops", [`${this.vname}: "Do you want to share my bread? It's a bit stale, but I've had worse..."`,
                                  `$$Ren$: "Hum excuse me, sorry, I think this is a rock..."`]);
    this.add_interaction("Crops", [`${this.vname}: "Did you not see the lustrous fields all around our glorious city? We have plenty of food to spare!"`,
                                  `$$Ren$: "Actually, all I saw were ravaged lands..."`,
                                  `${this.vname}: "That's odd... You probably came from a weird direction then, that must be it!"`]);

    this.add_interaction("War", `${this.vname}: "What are you talking about? There's no war in this city."`);
    this.add_interaction("War", `${this.vname}: "I, for one, have never seen any monster around here. I'm not sure what you're talking about."`);
    this.add_interaction("War", `${this.vname}: "War? I've only ever known this period of peace and quiet."`);
    this.add_interaction("War", `${this.vname}: "What country are you talking about? Yours? It sounds awful, I'm so glad to live here."`);

    this.add_interaction("Hunt", `${this.vname}: "Hunting is pretty easy in these parts. Animals just come to us!"`);
    this.add_interaction("Hunt", `${this.vname}: "Don't you just love taking a little stroll in the woods and hunt whatever comes your way?"`);
    this.add_interaction("Hunt", `${this.vname}: "That's a common misconception, hunting doesn't actually hurt the animals, you know."`);

    this.add_interaction("Taxes", `${this.vname}: "Sure, I'll gladly pay my taxes, it's what allows the king to make our kingdom such a wonderful and safe place!"`);
    this.add_interaction("Taxes", `${this.vname}: "We barely pay any taxes, and in exchange we get protections and services from the kingdom. Talk about a good deal!"`);
    this.add_interaction("Taxes", `${this.vname}: "Pay taxes? To whom?"`);

    this.add_interaction("King", `${this.vname}: "All hail our mighty king, the glorious and perfect leader of this great nation!"`);
    this.add_interaction("King", `${this.vname}: "He is doing such an outstanding job! It's thanks to him that we're so prosperous! I can't imagine a better king."`);
    this.add_interaction("King", `${this.vname}: "You know what, I don't think he exists. Never seen him in person, and things have always been just fine."`);

    this.add_interaction("Health", [`${this.vname}: "I'm in great shape! Everything is fine!"`,
                                    `$$Ren$: "Are you sure? You look a bit pale... and... malnourished."`,
                                    `${this.vname}: "Of course I'm sure! Maybe you're the one in poor health, sounds to me like your eyesight is bad."`]);
    this.add_interaction("Health", [`${this.vname}: "My baby was born weak, and got very sick, but he recovered, and now he's in great shape!"`,
                                    `$$Ren$: "Where is he, then?"`,
                                    `${this.vname}: "Oh, he's... somewhere... He's in great shape... In great shape..."`,
                                    `The vacant gaze on ${this.vname}'s face tells you it might be better to avoid the topic.`]);
    this.add_interaction("Health", [`$$Ren$: "What happened to your arm?"`,
                                    `${this.vname}: "What are you talking about?"`,
                                    `$$Ren$: "You're missing your left arm, is there a story behind it?"`,
                                    `${this.vname}: "No I'm not."`,
                                    `You don't know how to react to this.`]);

    this.add_interaction("Family", `${this.vname}: "I haven't seen my children in a while... It's been a few years, actually. I'm sure they're fine, but I wonder where they went..."`);
    this.add_interaction("Family", `${this.vname}: "My parents retired in a farm when I was very young. Then my siblings joined them. I haven't seen any of them since. It must be a pretty nice, joyful farm. Maybe I'll go there too some day."`);
    this.add_interaction("Family", [`${this.vname}: "Are you looking at my little girl? Isn't she the prettiest?"`,
                                    `But there is no-one else around...`]);

    this.add_interaction("Promised Child", `${this.vname}: "Promised Children are great! We have a dozen in this village!"`);
    this.add_interaction("Promised Child", `${this.vname}: "I've met the Promised Child once! It was a long time ago, it's probably not a child anymore."`);
    this.add_interaction("Promised Child", `${this.vname}: "The Promised Child is a legend of the past! It's the person who defeated all the monsters and their leader, and ushered in this era of peace! We send our thanks every day to the Goddess and Her Promised Child, for giving us this great land!"`);

    this.add_interaction("Job", [`${this.vname}: "I'm the best tanner this land has ever seen! I bend leather to my will!"`,
                                `$$Ren$: "Why are you not wearing any, then?"`,
                                `${this.vname}: "Hum just a dry spell, haven't had a job in a while..."`]);
    this.add_interaction("Job", [`${this.vname}: "Yes, you're not dreaming, it is me, ${this.vname}, the mighty blacksmith. I guess my reputation precedes me. But if you must, you can have a look at my latest creation."`,
                                `Saying that, ${this.vname} holds you a tiny dagger. It looks more like a kitchen knife, and the blade is so blunt that you cannot imagine it hurting anyone.`]);
    this.add_interaction("Job", [`${this.vname}: "I'm a hunter, but I'm sure you can tell, because I keep trophies of all the beasts I've slain!"`,
                                `But looking around, there is no such trophy to be found.`]);
    this.add_interaction("Job", `${this.vname}: "As butcher, my work depends on whatever the hunters are able to bring. They haven't brought anything in days, but it's just as well, it allows me to work on my passion, poetry. Funny how life works out perfectly sometimes, isn't it?"`);

    this.add_interaction("Rumors", `${this.vname}: "I hear that an emissary from a faraway land arrived in our city recently, and called it the 'greatest city he had ever seen'."`);
    this.add_interaction("Rumors", `${this.vname}: "There isn't a lot of gossip in our town. People just share facts, and everyone agrees."`);
    this.add_interaction("Rumors", `${this.vname}: "Rumor has it people are thinking about me for the post of new mayor of the town! I hope I can do a good job and keep this town great!"`);

    this.add_interaction("Dreams", `${this.vname}: "I just wish this bliss would continue."`);
    this.add_interaction("Dreams", `${this.vname}: "I don't think there's anything I'm missing right now!"`);
    this.add_interaction("Dreams", `${this.vname}: "I wish the whole world could be as perfect as this town!"`);

    this.add_interaction("Traditions", `${this.vname}: "Every now and then we throw together a banquet with the whole town to rejoice on how well we're doing!"`);
    this.add_interaction("Traditions", `${this.vname}: "We have a custom in this city, which is never to tell anyone else what we think of them. It helps reduce the number of conflicts. Many people do live in their own little world, better not to break their bubble..."`);
    this.add_interaction("Traditions", `${this.vname}: "Our values are respect and courtesy. Mind you it's pretty easy to be respectful when nothing bad is happening and everyone is just happy."`);

    this.add_interaction("City", `${this.vname}: "Welcome to the best city in the world! There is no problems here, you can be happy!"`);
    this.add_interaction("City", `${this.vname}: "Welcome to the best city in the world, everything is great here. Every day is a little slice of heaven."`);
    this.add_interaction("City", `${this.vname}: "This city is simply the best possible city. I cannot imagine anything better than this."`);
    this.add_interaction("City", `${this.vname}: "Here, we value peace. Please don't bring about trouble by spreading lies and hurting people."`);

    this.add_interaction("Religion", `${this.vname}: "Praise be to the Goddess for giving us such a perfect land!"`);
    this.add_interaction("Religion", `${this.vname}: "We pray so that the Goddess always shields us from experiencing pain!"`);
    this.add_interaction("Religion", `${this.vname}: "Religion is our way to give thanks for the blessings we have gotten."`);
  }

  setup_fear() {
    var attack = {
      attack_amplitude: 0.05, // Between 0 and 1
      warning_time_s: 0.2,
      react_time_s: 0.2,
      time_variation: 0.8, // 1 = 100%
    };
    this.add_enemy_action(`The stranger stares at you judgmentally in silence.`, attack);
    this.add_enemy_action(`The villager's glacial gaze is pretty oppressive.`, attack);
    this.add_enemy_action(`${this.vname} scolds you. What are you doing here? Isn't there somewhere else you should be?`, attack);
    this.add_enemy_action(`${this.vname} doesn't seem convinced that you're telling the truth. They press you for more details.`, attack);
    this.add_enemy_action(`You have to subject yourself to the relentless questioning of ${this.vname}.`, attack);
    this.add_enemy_action(`${this.vname} asks for proof of your faith, but it seems that nothing you say will ever be good enough.`, attack);
    this.add_enemy_action(`${this.vname} asks you an embarrassing questions.`, attack);


    var start_text = this.gen.pick([
      `The villager looks at you suspiciously, their eyes silently asking what you want.`,
      `The villager snappily asks you what you want.`,
      `The villager notices straight away your unfamiliar face. They grumpily come to scold you.`,
      `The person in front of you keeps darting suspicious glances at you and taking quick notes in a small black book.`,
      `${this.vname}: "Who are you and what are you doing here?"`,
      `${this.vname}: "I haven't seen you around here before. We don't really like strangers in this town..."`,
    ]);
    this.set_description(start_text);


    this.add_interaction("Weather", `${this.vname}: "Yes, the weather has been dreadful. It's obvious, since we share the sky with lowlives heretics, we must also share their punition..."`);
    this.add_interaction("Weather", `${this.vname}: "It's such a shame that the Goddess has to punish all of us for the actions of a few bad apples..."`);
    this.add_interaction("Weather", `${this.vname}: "If only people were more zealous, the Goddess wouldn't have to ruin the crops to punish them..."`);

    this.add_interaction("Crops", `${this.vname}: "We all have to ration ourselves pretty strictly to make sure that the food supplies last. We don't get a lot, with all the outsiders coming in, destroying our crops, stealing our supplies..."`);
    this.add_interaction("Crops", `${this.vname}: "Are you here to steal my food? I've earned it fair and square. I'm not going to give it to outsiders like you."`);
    this.add_interaction("Crops", `${this.vname}: "Why don't you farm your own crops before enquiring about honest folks like me? A lot of talking, not a lot of working... It's because of people like you that the Goddess has forsaken us!"`);
    this.add_interaction("Crops", `${this.vname}: "We get really worse yields than we deserve. It's because people are not praying enough. I spend hours every day repenting, and I wish I could do more."`);

    this.add_interaction("War", `${this.vname}: "Damn these monsters coming from who-knows-were to pillage and destroy our beloved lands!"`);
    this.add_interaction("War", `${this.vname}: "Some say the monster invasion is punishment for our sins. Each monster is born from a sinner. I can't wait to get rid of all the scum so that only pure people remain and the problem will be solved once and for all!"`);
    this.add_interaction("War", `${this.vname}: "I'm sure it's travelers like you who bring the monsters to our doors..."`);
    this.add_interaction("War", `${this.vname}: "Things will only improve after we've thoroughly defeated all the outsiders in battle, and pushed them back where they come from. Or better yet, exterminate them!"`);
    this.add_interaction("War", `${this.vname}: "The monsters won't cease attacking as long as there's impurity in our hearts. We must pray harder!"`);

    this.add_interaction("Hunt", `${this.vname}: "Our hunters are the best there is! I just hope they are careful and don't bring dangers to our town by getting followed!"`);
    this.add_interaction("Hunt", `${this.vname}: "Truth be told, we almost never hunt. Leaving the town is way too risky."`);
    this.add_interaction("Hunt", `${this.vname}: "I don't trust those hunter folks. They just galivant willy-nilly outside the village. Who knows what kind of stuff happens there..."`);

    this.add_interaction("Taxes", `${this.vname}: "I don't mind financing our war efforts. But I do mind when the money is spent in useless bails for unworthy people, or even worse, outsiders."`);
    this.add_interaction("Taxes", `${this.vname}: "I'm paying my dues. I'm not convinced that everyone else is doing the same. I'm pretty sure there's corruption somewhere. With the amount I've donated, we should have won the war by now!"`);
    this.add_interaction("Taxes", `${this.vname}: "I don't like paying taxes. You can't ever be sure that the money doesn't end up in the wrong pocket. Not everyone is an upstanding citizen like I am."`);

    this.add_interaction("King", `${this.vname}: "He's too weak, we need someone stronger to weed out the bad elements of this kingdom, and to kick the intruders out!"`);
    this.add_interaction("King", `${this.vname}: "If I was king, I wouldn't have let things get this bad."`);
    this.add_interaction("King", `${this.vname}: "Yes, I support the king. I'm not one of those troublemakers causing chaos in our fine kingdom."`);

    this.add_interaction("Health", `${this.vname}: "We would be fine if it weren't for outsiders bringing plagues and diseases into this beautiful city."`);
    this.add_interaction("Health", `${this.vname}: "I'm taking great care of protecting myself. I almost never leave my house, so I don't run into diseases, and I pray the Goddess every hour, so that she protects me!"`);
    this.add_interaction("Health", `${this.vname}: "I spend most of my day cleaning my house. We wouldn't have plagues if everyone was as diligent as me. Those bad apples make it hard for the rest of honest folk like me..."`);

    this.add_interaction("Family", `${this.vname}: "I cut ties with my family. Their morals were too loose for my taste. I didn't want to be associated with this kind of people, and become part of the problem."`);
    this.add_interaction("Family", `${this.vname}: "When I meet someone right, and we have children together, we'll educate them properly. Moral standards have been going down lately, and the children are as bad as it gets. No wonder why we get divine punishments..."`);
    this.add_interaction("Family", `${this.vname}: "I want to start a family, I just haven't met the right person. It's important for me that my life partner is pure, you know. I wouldn't want to invite misfortune on our home. I need to chose carefully!"`);

    this.add_interaction("Promised Child", `${this.vname}: "The Promised Child would have been here a long time ago if people were not so impure. The Goddess did not send us Her child because we're not worthy yet. We haven't prayed enough, it's that simple."`);
    this.add_interaction("Promised Child", `${this.vname}: "I'm not sure the Promised Child is ever coming, to be honest. There's so much sin everywhere. I don't know how such a dark environment can birth a holy child. We must repent!"`);
    this.add_interaction("Promised Child", `${this.vname}: "I spend all my time praying the Goddess and asking Her to send Her Promised Child to save me. I'm sure She will find my devotion worthy."`);

    this.add_interaction("Job", [
        `${this.vname}: "The world would be a much better place if everyone was doing their job as diligently as me!"`,
        `$$Ren$: "Oh, what do you do?"`,
        `${this.vname}: "Nothing at the moment, I pray!"`,
      ]);
    this.add_interaction("Job", `${this.vname}: "Most people in this city are devotes. They don't have a job per se, they dedicate their whole life to praying the Goddess and mediating, repenting and asking for forgiveness."`);
    this.add_interaction("Job", `${this.vname}: "I belong to the militia. We go through the town and make sure that public order is respected, and that people are acting in a proper and devout way. You might say that I'm the protector of the spiritual peace of this kingdom. So you better watch what you're doing, I'm keeping an eye on you, outsider."`);
    this.add_interaction("Job", `${this.vname}: "I work at the temple. We conduct random raids in the village, to punish the corrupt people who are at the root of our suffering. Once we finish getting rid of this scum, surely the Goddess will grant us peace and prosperity. You can see how important my job is."`);

    this.add_interaction("Rumors", `${this.vname}: "I keep hearing that some people have settled in this city without deserving their place... I'm sure their laziness is attracting monsters upon us..."`);
    this.add_interaction("Rumors", `${this.vname}: "Rumor has it that there are people in this city that do not do their due diligence and pray enough. I'm pretty sure this is true, and this is why the Goddess is punishing us."`);
    this.add_interaction("Rumors", `${this.vname}: "Rumors are plentiful in this city. Nobody is as perfect as me, everyone has dirty laundry. We're still far from a perfect world. If only people tried a little harder..."`);
    this.add_interaction("Rumors", `${this.vname}: "I'm sure that my neighbor is slacking off from prayer. I've heard many people confirming it..."`);

    this.add_interaction("Dreams", `${this.vname}: "I just wish that everybody was doing as much effort as me..."`);
    this.add_interaction("Dreams", `${this.vname}: "If only we could get rid of the invaders, life would be so much better..."`);
    this.add_interaction("Dreams", `${this.vname}: "I wish there were more hours in the day, so that I could pray the Goddess for longer!"`);

    this.add_interaction("Traditions", `${this.vname}: "Every week, we hold a citizen tribunal, to confront our unworthy neighbors with their sins. It's for the good of all of us, we must be righteous if we are to survive."`);
    this.add_interaction("Traditions", `${this.vname}: "We have regular deliberations to decide who should we banish from the town. It's important to banish someone every month, it keeps the city pure, and the fear keeps people in check..."`);
    this.add_interaction("Traditions", `${this.vname}: "Despite our trials and banishments, the city is still full of sin. I say we need to be more strict, so that we finally stop attracting monsters."`);

    this.add_interaction("City", `${this.vname}: "Welcome to the best city in the world! We probably have faults, but we're very devoted to getting rid of them as soon as we notice."`);
    this.add_interaction("City", `${this.vname}: "Welcome to the best city in the world! We work very hard at keeping it pure and weeding out the unwanted elements."`);
    this.add_interaction("City", `${this.vname}: "Things are horrible, it's the fault of outsiders like you and lowlives who are not devoted enough to the Goddess. You better do things the right way if you want to stay here."`);
    this.add_interaction("City", `${this.vname}: "Here, we value purity and devotion!"`);

    this.add_interaction("Religion", `${this.vname}: "Praise be to the Goddess for keeping us righteous!"`);
    this.add_interaction("Religion", `${this.vname}: "We pray zealously to show that we are worthy and to keep the bad away from us."`);
    this.add_interaction("Religion", `${this.vname}: "Religion is the only way to purity which will keep the monsters at bay."`);
  }

  setup_hope() {
    this.add_enemy_action(`${this.vname} compliments your hair.`);
    this.add_enemy_action(`${this.vname} is impressed. You're so mature for your age. You really got the Goddess's blessings.`);
    this.add_enemy_action(`The villager mumbles some platitudes with a warm smile.`);
    this.add_enemy_action(`${this.vname} blesses the Goddess for having allowed your meeting.`);
    this.add_enemy_action(`${this.vname} politely asks you questions about your day.`);
    this.add_enemy_action(`${this.vname} is holding on to your every word, eager to hear what you'll say next.`);


    var start_text = this.gen.pick([
      `The villager is interested in talking to you and greets you with a big smile.`,
      `This villager starts the conversation with a warm greeting.`,
      `The villager waves at you, you feel like you should answer.`,
      `The person in front of you clearly hasn't had enough to eat in a while, and yet a faint smile is shining on their face as they greet you.`,
      `${this.vname}: "Hello, may the Goddess light your path!"`,
      `${this.vname}: "Hello! I'm sorry, this city is not great, but we're working hard on improving it!"`,
    ]);
    this.set_description(start_text);


    this.add_interaction("Weather", `${this.vname}: "What a crazy weather we're having lately, right? Only a few more days of rain and the crops will start rotting. It's not going to happen, though, the Goddess is with us. The sun will be back any day now."`);
    this.add_interaction("Weather", `${this.vname}: "The winds from the east have been strong lately and destroyed many crops. Winds from the east... It's an omen of good beginnings."`);
    this.add_interaction("Weather", `${this.vname}: "I'm so glad to see a bit of sun today. It's been so cloudy lately, I haven't been able to grow anything. Praised be the Goddess for this blessed vision."`);
    this.add_interaction("Weather", `${this.vname}: "This period of famine will pass soon! The Goddess is here above us. She'll bring us some sun any day, I'm sure!"`);

    this.add_interaction("Crops", `${this.vname}: "We haven't had enough to eat for years. Not only do we need clement weather, but the raids can destroy months of hard work. This would be terrifying if the Goddess wasn't there to guarantee a better future soon."`);
    this.add_interaction("Crops", `${this.vname}: "I've been trying to breed new varieties of wheat. Make them more resilient to the rain and suchlike. So far, all my attempts have failed, but I'm keeping hope. These things take time."`);
    this.add_interaction("Crops", `${this.vname}: "We mostly live from our own crops, like many people in this town. Anything outside the city walls can be destroyed any day. But fortunately, we have some space to farm in the city. It's tiny, but it can provide us several days worth of food!"`);

    this.add_interaction("War", `${this.vname}: "Sure, the fights never cease. Monsters gain ground every day. But they'll never breach our walls. Not again, not like those other times. The Goddess is watching over us."`);
    this.add_interaction("War", `${this.vname}: "We're fewer and fewer soldiers every day. I cannot wait to go back out on the battlefield. I'll make the Goddess proud, and rid us of this scum that killed my comrades. No way I'll meet the same fate!"`);
    this.add_interaction("War", `${this.vname}: "Day after day, the same threats. My parents fought in the war. My siblings fight in the war. My children will fight in the war. When was the last time of peace? Who even remembers? That's how I'm sure we're close to a victory. It could be any day now."`);
    this.add_interaction("War", `${this.vname}: "As a matter of fact, my brother died to those monsters last week. I'm sure it was part of the Goddess' plan. I'll take his place, avenge him, and bring us to victory."`);

    this.add_interaction("Hunt", `${this.vname}: "I'm no hunter, but I wish them good luck. With all the raids, they're our main source of food, y'know. Most days they don't get much, but today will be different, I'm sure."`);
    this.add_interaction("Hunt", `${this.vname}: "Yep, I'm a hunter. I know I don't look the part, but I'm bringing game every day or so. Well, I mean sometimes! Haven't been lucky in a while, though... but the tide will turn!"`);
    this.add_interaction("Hunt", `${this.vname}: "Our hunters haven't brought back much game lately. But they are very good, they know the patterns of the preys, and of the monsters. Bounty is bound to increase again!"`);

    this.add_interaction("Taxes", `${this.vname}: "Look, I'm like anyone, of course I don't like paying, but that's something we have to do if we want the guard to protect us. With them monsters and all, someone has to protect the town. It's all worth it if you ask me."`);
    this.add_interaction("Taxes", `${this.vname}: "It's crazy what they take us! We can barely afford to eat as it is! I'd say the times are tough, but truth is I've never seen it any other way. That's why it's important to contribute, for a better day. It's an investment in the future, I say."`);
    this.add_interaction("Taxes", `${this.vname}: "I had a bit of coins on the side, I was working on a present for my Second Born, for her trial. But with the rise of taxes this year, I had to give it up. It's just as well, I'm sure the Goddess will give her an even better gift!"`);

    this.add_interaction("King", `${this.vname}: "Leading the kingdom in our desperate times is such a tough task. Thankfully the Goddess is here to help him, and I'm sure that with Her guidance he will lead us to success!"`);
    this.add_interaction("King", `${this.vname}: "The King? Yea, he's alright. Sure this is no paradise, but what can he do except wait for the Goddess to send us a Promised Child?"`);
    this.add_interaction("King", `${this.vname}: "He hasn't done much for us. Haven't heard of him in years. But I'm sure he has not forgotten us. He'll probably visit soon!"`);

    this.add_interaction("Health", `${this.vname}: "It's been months since the last plague brought by the monsters! It's going pretty well! Let's hope this continues!"`);
    this.add_interaction("Health", `${this.vname}: "With the monsters raiding our crops, we barely have enough to eat. We're more often sick than not. It's fortunate that we have the Goddess to watch over us, otherwise things could be pretty bad..."`);
    this.add_interaction("Health", `${this.vname}: "My two first children did not make it past age 1. Winters are too cold, and crops too rare. But I'm expecting a third child. I'm sure this one will survive!"`);

    this.add_interaction("Family", `${this.vname}: "My little one looks just like you. Or rather looked, I mean. It's okay, surely the Goddess will bless me with a new child soon!"`);
    this.add_interaction("Family", `${this.vname}: "I don't have children yet. I suppose I should get busy soon. I want many little ones to carry on my legacy and to fulfill the will of The Goddess. With Her blessing, of course!"`);
    this.add_interaction("Family", `${this.vname}: "Between infant mortality and the Second Born trial, I haven't much to call a child. I just know my little ${this.gen.pick(DATASETS.male_names)} will grow up to do us proud, under the eye of the Goddess."`);

    this.add_interaction("Promised Child", `${this.vname}: "The Promised Child will be there soon, I tell you. This town cannot survive much longer. Then again my dad used to say the same thing. We're a town of survivors."`);
    this.add_interaction("Promised Child", `${this.vname}: "I hear there's another trial going on today. I can't wait to know the results. I'm sure today will be the day where the Promised Child finally appears!"`);
    this.add_interaction("Promised Child", [`${this.vname}: "Are you? Are you sure? Praised be the Goddess, can I touch you?"`,
                                            `Without waiting for your answer, ${this.vname} puts a hand on your shoulder. In a weird holy trance, ${this.vname} then falls on the ground and starts weeping tears of joy, muttering prayers to the Goddess.`]);

    this.add_interaction("Job", `${this.vname}: "How sweet of you to ask. I'm a tanner. I get the skin from the animals that the hunters bring back, and I make all kind of clothes out of them. When they bring back something, that is. Do you like my jacket? Maybe I can make you one some day, the next time we get a great haul. It shouldn't be long!"`);
    this.add_interaction("Job", `${this.vname}: "I'm a butcher. I prepare meat from whatever the hunters bring. It's dirty, but without me nobody could eat! I'm preparing my tools for the next big hunt!"`);
    this.add_interaction("Job", `${this.vname}: "I'm the blacksmith. I make the weapons that our fine guards use to defend our town. And the tools our hunters use to bring us our food. As I get better, so will their efficiency!"`);
    this.add_interaction("Job", `${this.vname}: "Mason isn't an easy job. I made this house with my bare hands. And maybe yours, too. And many more to come!"`);
    this.add_interaction("Job", `${this.vname}: "With the forest all around, we will always need lumberjacks. Wood has so many uses, not the least of which is to warm us through the night."`);

    this.add_interaction("Rumors", `${this.vname}: "I hear that the Goddess is going to send us help very soon!"`);
    this.add_interaction("Rumors", `${this.vname}: "Everyone is saying that the victory is near, and that the suffering is almost over!"`);
    this.add_interaction("Rumors", `${this.vname}: "Rumor has it that the Promised Child will be born soon! Finally, our savior is coming!"`);

    this.add_interaction("Dreams", `${this.vname}: "I hope I'm still there to witness the Promised Child's victory and our salvation!"`);
    this.add_interaction("Dreams", `${this.vname}: "I wish for our victory to come soon!"`);
    this.add_interaction("Dreams", `${this.vname}: "I don't wish, I trust. I know that the Goddess will bring me joy!"`);

    this.add_interaction("Traditions", `${this.vname}: "We hold a weekly mass at the church where we all gather in prayer for a better tomorrow! You're welcome to join!"`);
    this.add_interaction("Traditions", `${this.vname}: "There's this festival, in the summer, where we each write what we want for the future on a piece of paper, and a mage sends them in the sky! I wish you could see it, it's so beautiful!"`);
    this.add_interaction("Traditions", `${this.vname}: "Our town's motto is 'never despair, keep moving forward'."`);

    this.add_interaction("City", `${this.vname}: "Welcome to the best city in the world! Well it may not be yet, but we're working hard on it."`);
    this.add_interaction("City", `${this.vname}: "Welcome to the best city in the world! It may not be the greatest, but none other has such hardworking people!"`);
    this.add_interaction("City", `${this.vname}: "Things are pretty tough, but we're keeping faith and working hard for a better tomorrow!"`);
    this.add_interaction("City", `${this.vname}: "Here, we value faith and honor, which are the pillars of the hard work we're doing to leave the world better than we found it."`);

    this.add_interaction("Religion", `${this.vname}: "Praise be to the Goddess for giving us a better tomorrow!"`);
    this.add_interaction("Religion", `${this.vname}: "We pray so that the Goddess helps us to victory and a peaceful future!"`);
    this.add_interaction("Religion", `${this.vname}: "Religion is the light that guides us to a bright destiny!"`);
  }

  setup_indulgence() {
    var attack = {
      attack_amplitude: 0.4, // Between 0 and 1
      warning_time_s: 0.5,
      react_time_s: 1.5,
      time_variation: 0.9, // 1 = 100%
    };
    this.add_enemy_action(`You need to fight off the overbearing stranger who's coming a little too close.`, attack);
    this.add_enemy_action(`You struggle to match ${this.vname}'s levels of excitement.`, attack);
    this.add_enemy_action(`You struggle to find an interesting answer.`, attack);
    this.add_enemy_action(`You feel the weight of the social pressure to come up with interesting small talk.`, attack);
    this.add_enemy_action(`${this.vname} tries to share their drink with you, but you do your best to refuse.`, attack);
    this.add_enemy_action(`${this.vname} tries to make you eat something, but you think you should probably refuse.`, attack);

    this.add_enemy_action(`${this.vname} high-fives you.`);
    this.add_enemy_action(`${this.vname} compliments you and says that apparently you're "their kind of people".`);


    var start_text = this.gen.pick([
      `The villager jumps at you and passes an arm around your shoulder.`,
      `The villager winks and comes very close to you.`,
      `The villager grabs your arm and pulls you towards them.`,
      `The person in front of you is visibly inebriated. They tumble on you and mumble an apology.`,
      `${this.vname}: "Yo! What's up?"`,
      `${this.vname}: "Hey! Come join the party!"`,
    ]);
    this.set_description(start_text);


    this.add_interaction("Weather", `${this.vname}: "Don't really care about that. Interesting things happen at night, anyway."`);
    this.add_interaction("Weather", `${this.vname}: "Who cares about what's going on in the sky? What matters is what we do here on earth!"`);
    this.add_interaction("Weather", `${this.vname}: "The storms have become more frequent lately. They'll probably destroy this city soon, so we need to make the most of it before!"`);
    this.add_interaction("Weather", `${this.vname}: "We hold a rain festival when it rains, and a sun festival when it doesn't! There's never a boring day! Sometimes we do even both in the same day!"`);

    this.add_interaction("Crops", `${this.vname}: "We have the best delicacies in the Kingdom! I mean it's just bread, but with enough wine it'll taste divine!"`);
    this.add_interaction("Crops", `${this.vname}: "Damn, you missed the harvest festival by a few days! It's a celebration where we get all the crops we've just harvested, and eat them all until we get sick! It's wicked!"`);
    this.add_interaction("Crops", [`${this.vname}: "We don't really store crops, here. We just eat whatever the Goddess provides!"`,
                                   `$$Ren$: "What about the future? The next cold season?"`,
                                   `${this.vname}: "Who knows if we'll survive until then. Let's enjoy what we have while we can!"`]);

    this.add_interaction("War", `${this.vname}: "Yeah, war is raging, we probably won't hold on much longer, so why not enjoy ourselves?"`);
    this.add_interaction("War", `${this.vname}: "Monsters could raid us any day now, come and have fun before it's too late!"`);
    this.add_interaction("War", `${this.vname}: "My best mate was killed in a raid last week. We could be next. Forget about this stuff, let's make the most of the time we have!"`);
    this.add_interaction("War", `${this.vname}: "Don't be a downer! Why do you have to bring heavy topics like that!"`);

    this.add_interaction("Hunt", `${this.vname}: "There's nothing tastier than a roasted boar! Make sure to try it the next chance you get!"`);
    this.add_interaction("Hunt", `${this.vname}: "Yes, I sometimes hunt. I'm pretty good. I can tell how tasty the prey is going to be just by looking at it."`);
    this.add_interaction("Hunt", `${this.vname}: "Praised be to hunter, I tell you. They are the backbone of this community! They bring us so much good food! We have a big banquet after every hunt!"`);

    this.add_interaction("Taxes", `${this.vname}: "Fuck taxes! I'm not gonna send money to the kingdom when it can be better spent elsewhere, and by elsewhere I mean here!"`);
    this.add_interaction("Taxes", `${this.vname}: "We don't really like taxes, here. Everyone does whatever they want with their money. No, what's really important is that everyone contributes to the potlucks and banquets!"`);
    this.add_interaction("Taxes", `${this.vname}: "I swear I was about to pay my taxes, but then I spent it all in wine instead."`);

    this.add_interaction("King", `${this.vname}: "Never seen him, though we keep sending him invitations to our festivals! Why should I care?"`);
    this.add_interaction("King", `${this.vname}: "He's so beautiful! A bit old, but experience can be a good thing, if you know what I mean. You can tell by his look that he's been through a lot. He can surely teach me a thing or two."`);
    this.add_interaction("King", `${this.vname}: "I hear he gives the most extravagant parties! What wouldn't I give for an invite to the luxury of the royal palace!"`);

    this.add_interaction("Health", `${this.vname}: "There are some who say that too much drinking is bad for your health. But how can it be true if it feels so great?"`);
    this.add_interaction("Health", `${this.vname}: "I'll make the most of my body until it cannot withstand it anymore!"`);
    this.add_interaction("Health", `${this.vname}: "Diseases can kill you any day, you know. Nothing you can do about that. The only thing you can actually do is make sure you live a life worth living before that time comes!"`);

    this.add_interaction("Family", `${this.vname}: "Spend as much time as you can with your family! Cherish them! Don't you just love a big family meal!?"`);
    this.add_interaction("Family", `${this.vname}: "Have you come to play with my children? Sorry, they're off with their friends now, somewhere in the village. You can wait with me until they come back, if you want."`);
    this.add_interaction("Family", `${this.vname}: "Yes, I have a few children here and there. We don't have a strict model of family in this city, we're a community. Or if you look at it another way, we are one giant family!"`);

    this.add_interaction("Promised Child", `${this.vname}: "The Promised Child has been found? Amazing! We must celebrate! Let's start planning the biggest party ever!"`);
    this.add_interaction("Promised Child", `${this.vname}: "When the Promised Child gets there, we're going to throw a festival, and it'll be the biggest and grandest celebration anyone has ever thrown! We've been working on plans for decades, you know!"`);
    this.add_interaction("Promised Child", `${this.vname}: "You know, it's only logical, the best thing we can do to help with the coming of the Promised Child is to make as many children as we can..."`);

    this.add_interaction("Job", `${this.vname}: "Life is too short to waste it on a job!"`);
    this.add_interaction("Job", `${this.vname}: "Jobs only serve to limit your potential and trap you in a mold. Here, we do whatever we feel like."`);
    this.add_interaction("Job", `${this.vname}: "In this city, we're all a bit poet, cook or musician. Dancer one day, painter the next... Follow your heart, surely that's what the Goddess wants!"`);
    this.add_interaction("Job", `${this.vname}: "We don't have masons or blacksmiths, so there's less and less buildings and tools we can use, but we all share what's left!"`);

    this.add_interaction("Rumors", `${this.vname}: "I hear the end of the world will be in three days, and we're gonna have a huge feast just before!"`);
    this.add_interaction("Rumors", `${this.vname}: "Rumor has it that there's a party tomorrow at ${this.gen.pick(DATASETS.male_names)}'s place. Very exclusive event. You didn't hear it from me."`);
    this.add_interaction("Rumors", `${this.vname}: "Everyone is talking about that new kind of wine that a trader brought us last week. I wonder if there is any left..."`);

    this.add_interaction("Dreams", `${this.vname}: "I don't know, I'm simple, I just wish for good food, good drinks, and good company."`);
    this.add_interaction("Dreams", `${this.vname}: "Well, I could always use more money..."`);
    this.add_interaction("Dreams", `${this.vname}: "When I was a child, I tried the fruitiest wine I've ever tasted... What I wouldn't give for another drop of this delicious wine!"`);

    this.add_interaction("Traditions", `${this.vname}: "Every week we throw a big ball where every artist in town can demonstrate the new songs, dances or poems they came up with!"`);
    this.add_interaction("Traditions", `${this.vname}: "Every month a lot of villagers get together for a big or... wait, you're probably too young for me to tell you about that!"`);
    this.add_interaction("Traditions", `${this.vname}: "We have festivals for each big occasion! Seasons, great people, historical events, spirits of nature... We celebrate something every week or so!"`);

    this.add_interaction("City", `${this.vname}: "Welcome to the best city in the world! We know how to have fun and live a good life, here!"`);
    this.add_interaction("City", `${this.vname}: "Welcome to the best city in the world! We know how fragile life is, so we enjoy every day to the fullest!"`);
    this.add_interaction("City", `${this.vname}: "Things are horrible, so we need to make the most of whatever little time we have left on this world!"`);
    this.add_interaction("City", `${this.vname}: "Here, we value pleasure. That's all we have in our fleeting lives."`);

    this.add_interaction("Religion", `${this.vname}: "Praise be to the Goddess for giving us such pleasant experiences!"`);
    this.add_interaction("Religion", `${this.vname}: "We pray so the Goddess gives us more food and drinks!"`);
    this.add_interaction("Religion", `${this.vname}: "Religion? It's a good subject of inspiration for art, a great way to transcend our mortal senses."`);
  }


  setup_mourning() {
    this.add_enemy_action(`The stranger lets out a profound sigh, as if life was escaping their body.`);
    this.add_enemy_action(`The villager is shaking, still under shock from the past events.`);
    this.add_enemy_action(`The villager's face is distorted by anger and sadness.`);
    this.add_enemy_action(`${this.vname} sheds a silent tear. Who knows what is going through their mind...`);
    this.add_enemy_action(`${this.vname} starts crying loudly.`);
    this.add_enemy_action(`${this.vname} stayed silent, but you could feel in their eyes a storm of emotions.`);

    var start_text = this.gen.pick([
      `The villager looks extremely sad, but seems to respond when you wave at them.`,
      `The villager salutes you, and for a moment you can see in their eyes the weight of the loss they just went through.`,
      `${this.vname}: "What do you want?"`,
    ]);
    this.set_description(start_text);

  this.add_interaction("Cause", `${this.vname}: "I'm sure it was the fault of the government! They were too relaxed, letting too many people in, of course it was bound to bring problems!"`);
  this.add_interaction("Cause", `${this.vname}: "I knew it! I knew it! I told them we didn't pray enough! I told them we were not pure enough! It's all our fault!"`);

  this.add_interaction("Promised Child", `${this.vname}: "It's your fault, isn't it? You're not one of us!"`);
  this.add_interaction("Promised Child", `${this.vname}: "We were fine before you came along! Curse you! We should never have let an outsider in!"`);

  this.add_interaction("Events", `${this.vname}: "The hordes of $$demon_lord$ raided the city. The royal army was there, but they were powerless faced by the swarm of demons..."`);
  this.add_interaction("Events", `${this.vname}: "It was pure destruction... They didn't seem to have any goal in mind, just tearing down buildings and killing people randomly. It was pure chaos."`);
  this.add_interaction("Events", `${this.vname}: "I was so scared... So sure that I would not make it. At any second, any of them could have found me..."`);

  this.add_interaction("Demons", `${this.vname}: "It was horrible... The monsters were plowing through our soldiers and our buildings as if they were nothing! I was so scared!"`);
  this.add_interaction("Demons", `${this.vname}: "There were so many demons... I survived by hiding in a cave, there was no end to their ranks. We can't compete..."`);
  this.add_interaction("Demons", `${this.vname}: "A single one of them can destroy a whole battalion. Iron armor is like paper to them."`);

  this.add_interaction("Victims", `${this.vname}: "So many people died! There was blood everywhere!"`);
  this.add_interaction("Victims", `${this.vname}: "They took my children! My babies! Please! Help!"`);;
  this.add_interaction("Victims", `${this.vname}: "Most of the townsfolks died... Only by waiting out and hiding did we have any chance of surviving the assault."`);

  this.add_interaction("Future", `${this.vname}: "What are we going to do now? Where are we going to live?"`);
  this.add_interaction("Future", `${this.vname}: "We must repent! We must repent! We need to bring back our purity!"`);
  this.add_interaction("Future", `${this.vname}: "It's the end for this town... And probably for us too... Our supplies were ransacked. We may have escaped the battle, but we won't survive its aftermath."`);
  this.add_interaction("Future", `As only answer, ${this.vname} let out a wail of despair.`);


  }


}


var make_banner_function = function(text){
  return function() {
    TextBannerSequence.make([text]);
  };
}

var get_rejection_soul = function(type, seed, indoors, seed) {
  var excuses = [];
  var threshold = 0.05;

  if(type == CITIES.acceptance){
    return undefined;
  }
  if(type == CITIES.indulgence){
    excuses.push(make_banner_function(`The villager just blows you a kiss.`));
    excuses.push(make_banner_function(`The villager winks at you, a little bit too salaciously for your taste.`));
    excuses.push(make_banner_function(`Villager: "Hello cutie, having fun?"`));

    if(indoors){
      excuses.push(make_banner_function(`Villager: "Well hello, look what the cat dragged in! Coming to my house, did you have anything in mind?"`));
      excuses.push(make_banner_function(`Villager: "I see you made yourself at home... I have an idea what we could do, if you get my drift..."`));
      threshold = 0.1;
    } else {
      threshold = 0.2;
    }
  }
  if(type == CITIES.denial){
    excuses.push(make_banner_function(`Villager: "What are you doing in my house?"`));
    excuses.push(make_banner_function(`The villager does not seem to see you. They ignore your attempts to communicate.`));
    excuses.push(make_banner_function(`The villager passes you by without noticing you, visibly deep in very happy thoughts.`));
    excuses.push(make_banner_function(`Villager: "Hello! Isn't this just the best possible day in the best possible world?"`));
    threshold = 0.2;
  }
  if(type == CITIES.fear){
    excuses.push(make_banner_function(`The villager pretends to not see you.`));
    excuses.push(make_banner_function(`The villager looks at you with a judgmental expression. It's clear they don't want anything to do with you.`));
    excuses.push(make_banner_function(`The villager gives you a dark look that chills your very soul. Never have you felt so hated by someone you did not know.`));
    excuses.push(make_banner_function(`The villager snears at you and continues their life as if you were not there.`));
    excuses.push(make_banner_function(`Villager: "What makes you think you can talk to me?"`));
    if(indoors){
      excuses.push(make_banner_function(`Villager: "Get out!"`));
      excuses.push(make_banner_function(`Villager: "What are you doing in my house?"`));
      excuses.push(make_banner_function(`Villager: "You have no business being here! This is trespassing!"`));
      threshold = 0.6;
    } else{
      threshold = 0.4;
    }
  }
  if(type == CITIES.hope){
    if(indoors){
      excuses.push(make_banner_function(`Villager: "Get out!"`));
      excuses.push(make_banner_function(`Villager: "What are you doing in my house?"`));
      threshold = 0.3;
    } else {
      excuses.push(make_banner_function(`The villager just passes you by and addresses you a warm smile.`));
      excuses.push(make_banner_function(`The villager seems busy doing their own things.`));
      threshold = 0.1;
    }
  }
  if(type == CITIES.mourning){
    excuses.push(make_banner_function(`The villager cries in silence. You can see their body shaken by the sobs. Better not disturb them.`));
    excuses.push(make_banner_function(`As you try to attract their attention, the villager does not bulge. They stay standing without motion. Their empty gaze sends a shiver down your spine. It's as if their soul is gone...`));
    excuses.push(make_banner_function(`The villager shouts hysterically. They have obviously lost their mind. As you get close, they start yelling at you a barely intelligible mumble of insults.`));
    threshold = 0.1;
  }

  if(seed < threshold) {
    return {interaction: RANDOM.pick(excuses, new Generator(seed))};
  }
  return undefined;
}

var get_meta_soul = function(seed, sprite_nb) {
  return {interaction: function() {
    SPECIALBATTLES.characters("villagers", "villager" + sprite_nb, seed);
  }};
}


var get_villager_soul = function(type, seed, indoors, sprite_nb) {
  if (seed < 0.03) {
    return get_meta_soul(seed, sprite_nb);
  }

  var rejection_soul = get_rejection_soul(type, seed, indoors, seed);
  if (rejection_soul){
    return rejection_soul;
  }

  return new VillagerSoul(type, sprite_nb, seed);
}


class M_NPC extends MovingObject {
  constructor(x, y, sprite) {
    var visual = new MovingSprite("assets/characters/" + sprite + ".png", 'obj_dark', 32, 48);
    super(visual, x, y, 32, 48);
    this.adjust_hitbox(7, 3, 20, 12);
    this.specify_sprite_size(32, 48);
  }
}

class M_Villager extends M_NPC {
  constructor(type, x, y, seed, indoors) {
    var gen = new Generator(seed);
    var sprite_nb = gen.int(5);
    super(x, y, "villager" + sprite_nb);
    this.seed = seed;
    this.sprite_nb = sprite_nb;
    this.soul = get_villager_soul(type, this.seed, indoors, sprite_nb);
  }

  interaction() {
    this.face_character();
    this.soul.interaction(this.sprite_nb, this.seed);
  }
}

class M_Vendor extends M_Villager {
  constructor(x, y, seed, type, threshold) {
    super("", x,y,seed);
    this.type = type;
    this.threshold = threshold;
  }

  interaction() {
    this.face_character();
    SHOP.enter(this.type, this.threshold);
  }
}

class M_Trainer extends M_Villager {
  constructor(x, y, seed, type, threshold) {
    super("", x,y,seed);
    this.type = type;
    this.threshold = threshold;
  }

  interaction() {
    this.face_character();
    TRAINER.enter(this.type, this.threshold);
  }
}
