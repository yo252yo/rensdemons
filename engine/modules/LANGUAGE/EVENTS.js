LANGUAGE_EVENTS = {
  _all_alone: [
    [
      `You decide to make camp and have a little meal.`,
      `You gaze at the fire, deep in thoughts. You really feel lonely without $$BestFriend$.`
    ],
    [
      `You bitterly think about $$BestFriend$ and how much you miss the presence of your best friend besides you.`,
      `Your life and your quest go on, but it feels like the world has lost its colors...`
    ],
  ],

  _party: function(member){
    switch (member){
      case PARTYMEMBERS.BestFriend:
        return [
          [
            `$$BestFriend$: "Isn't it weird that we always find what we need on our way?"`,
            `$$Ren$: "It's because the Goddess guides our steps!"`,
            `$$BestFriend$: "Sure, there's that. But it feels like every time we face an obstacle, the solution is somewhere nearby. That's not really a matter of what we do. We stumble onto things more than we succeed at finding them."`,
            `$$Ren$: "The Goddess has many powers. She pretty much rules the world. I think She puts things where She knows we'll need them."`,
            `$$BestFriend$: "Don't you think that's odd? Why doesn't she give us what we need directly, then?"`,
            `$$Ren$: "I don't know. She works in mysterious ways. She helps us so much, I don't want to question Her..."`,
            `$$BestFriend$: "Sounds like excuses to me..."`,
          ],
          [
            `$$BestFriend$: "When are we going to stop and take a break?"`,
            `$$Ren$: "Whenever you want!"`,
            `$$BestFriend$: "What about you, though? You seem like you're always ready to go on. You never take bathroom or sleep breaks..."`,
            `$$Ren$: "The Goddess gives me energy!"`,
            `$$BestFriend$: "I know that, but I can't help but worry about your body. Be careful, please!"`,
          ],
          [
            `$$BestFriend$: "I'm so impressed, you always seem to know where we should go and what we should do."`,
            `$$Ren$: "It's pretty easy. There's always some sort of clue. Most of the time we just follow the instructions of the last person we talked to, you know..."`,
            `$$BestFriend$: "What if they didn't say anything? Or if we forgot? Or if we got lost?"`,
            `$$Ren$: "Then it's time to pray the Goddess!"`,
          ],
          [
            `$$BestFriend$: "I can't help but be scared. There's so many dangers all around... Maybe we should stop this quest. What if something were to happen to you?"`,
            `$$Ren$: "Nothing bad will happen to me. One way or another, I'm bound to complete my mission."`,
            `$$BestFriend$: "Still, how can you be so sure you won't die or get badly hurt?"`,
            `$$Ren$: "Even if I'm hurt, I will recover. Don't worry. The Goddess is guaranteeing it. I'm the Promised Child, after all, am I not?"`,
            `$$BestFriend$: "I hope you're right..."`,
          ],
          [
            `$$BestFriend$: "Don't you ever feel like... words are not enough?"`,
            `$$Ren$: "How so?"`,
            `$$BestFriend$: "Well, if I want to tell you how I feel, no matter how many words I use, you won't be able to know exactly. I wish I could just show you."`,
            `$$Ren$: "I understand. I think that as long as we're separate people, we'll never fully know what goes on in the other person's head. But you know, I think I know you well enough to sort of get it, most of the time."`,
            `$$BestFriend$: "It seems that we have evolved past the need for words."`,
            `You laugh together.`,
          ],
          [
            `$$BestFriend$: "You know, $$Ren$, I try to put on a brave face, to be as supportive as I can, but deep down I'm really scared."`,
            `$$Ren$: "It's going to be alright. We have the Goddess on our side!"`,
            `$$BestFriend$: "I know that, but I don't feel Her the way you do. So for me it's just a matter of blind faith... And this may be a horrible thing to say, but sometimes my faith wavers."`,
            `$$Ren$: "It's not horrible to say, it's only natural, it happens to everyone."`,
            `$$BestFriend$: "If you say so."`,
            `$$Ren$: "I'm sure of it. That's why we have each other, so that if one of us is in trouble, the other one can help!"`,
            `$$BestFriend$: "Yes, I'll always help you, $$Ren$."`,
          ]
        ];

      case PARTYMEMBERS.PreciousChild:
        return [
          [
            `$$PreciousChild$: "Hey, $$Ren$, why are you fighting the demons?"`,
            `$$Ren$: "To make the world a better place, of course!"`,
            `$$PreciousChild$: "But... but... Are you sure it will be a good thing? Perhaps the demons are secretly good guys? Or maybe when they're gone there's gonna be something even worse! Or maybe..."`,
            `$$Ren$: "Maybe, we can never know for sure, you're right."`,
            `$$Ren$: "But it does seem that the way things are currently has plenty of bad aspects. I don't think we should use the fact that we could make things worse as an excuse to avoid trying to make things better!"`,
            `$$PreciousChild$: "I understand now. I think you're right. Thanks, you explain things very well!"`,
          ],
          [
            `$$PreciousChild$: "Why are you going on an adventure?"`,
            `$$Ren$: "To save the world!"`,
            `$$PreciousChild$: "But why do you want to save the world?"`,
            `$$Ren$: "Because it's the right thing to do!"`,
            `$$PreciousChild$: "But... but... Why do you want to do the right thing?"`,
            `$$Ren$: "Stop with the silly questions, that's what the right thing is, the thing you should do!"`,
            `$$PreciousChild$: "Yes but why is it the thing you should do?"`,
            `$$Ren$: "Listen, this is going nowhere. I don't think I can give you an answer you'd like."`,
            `$$PreciousChild$: "But... why?"`,
            `$$Ren$: "Because I don't know either! It's complicated! It's just the way things are! I'm just doing my best, you know. I know very little about the world, and I control even less."`,
            `$$PreciousChild$: "Sorry I upset you."`,
            `$$Ren$: "You didn't upset me. Don't worry. I'm the one who's sorry. I'm bad at explaining."`,
          ]
        ];

      case PARTYMEMBERS.UpbeatDojikko:
        return [
          [
            `$$UpbeatDojikko$: "I have been observing you for a while. I think you have the same power as I do, you can communicate with another world."`,
            `$$Ren$: "You can do that?"`,
            `$$UpbeatDojikko$: "Yes, I am atuned with the world of the dead. But I think your case is different. I've asked the specters and they do not recall talking to you. Who do you communicate with?"`,
            `$$Ren$: "Does the Goddess count? Maybe that's her."`,
            `$$UpbeatDojikko$: "Maybe."`,
          ],
          [
            `$$Ren$: "Hey, $$UpbeatDojikko$, you can do divination, right? Can you see anything in my future? Maybe it could help..."`,
            `$$UpbeatDojikko$: "Let me see..."`,
            `$$UpbeatDojikko$ seizes her crystal ball, incense and tarot deck. She isolates herself for a while, then comes back with a smile on her face.`,
            `$$UpbeatDojikko$: "I have seen your future, and it is promising. You will kill $$demon_lord$ and every monster that stands in your way. You will be successful in your quest!"`,
            `$$Ren$: "That's good to know! Although I'm not sure I trust your methods yet..."`,
          ]
        ];

      case PARTYMEMBERS.StreetSmart:
        return [
          [
            `$$StreetSmart$: "You know, usually, I make all my tools and weapons myself out of all the stuff I can find and pick up."`,
            `$$Ren$: "Yeah, I know a lot of adventurers do. I was kinda expecting to do the same, but it looks like it's not happening."`,
            `$$StreetSmart$: "Want me to teach you?"`,
            `$$Ren$: "I think I'd just be wasting your time. I feel like I'm fundamentally unable to do that. Like I couldn't even learn..."`,
            `$$StreetSmart$: "Okay, whatever."`,
          ],
          [
            `$$StreetSmart$: "You're pretty lucky, it seems that your equipment is pretty durable..."`,
            `$$Ren$: "I know, right! I expected to have to repair it all the time! That's one less thing to think about!"`,
            `$$StreetSmart$: "Sure, but if you ever find that you need it, hit me up, I know a guy."`,
          ]
        ];

      case PARTYMEMBERS.WiseOld:
        return [
          [
            `$$Ren$: "Teach me, master. How can I achieve true enlightenment and get the power I need to succeed in my quest?"`,
            `$$WiseOld$: "To achieve true enlightenment, you must let go of all things, and accept your insignificant place in the whirlwinds of events."`,
            `$$WiseOld$: "You must accept and fully embody the fact that nothing matters. All meaning is constructed. Everything is arbitrary. Only then can you see the truth of the world."`,
            `$$WiseOld$: "Rid yourself of all illusions. Understand what you really are. See the universe in its whole, and peek at what lies behind."`,
            `$$Ren$: "Hmmm. This is all well and good, but I'm not sure how it'll help me defeat $$demon_lord$."`,
          ],
          [
            `$$WiseOld$: "You know, through meditation, you can reach the ultimate truth of all things..."`,
            `$$Ren$: "Oh yeah? and what is this ultimate truth?"`,
            `$$WiseOld$: "All things only exist as distinct entities when there is someone who makes the distinction between them and the rest. To be a thing means drawing a boundary and separating a thing from the non-thing. Everything begets its dual opposite by the simple fact of its existence."`,
            `$$WiseOld$: "And it's the same for you. You only exist as the boundaries that are drawn between the you and the non-you. Others might draw these boundaries, but the final call comes to you, as the narrator of your own life."`,
            `$$WiseOld$: "The self is nothing but a story you tell yourself. You exist because of that story. You and the story are eternally intertwined. "`,
            `$$WiseOld$: "And your body will stop, one day. That much is true. But the story... The story will remain in the books. The story will live on forever."`,
          ]
        ];

      case PARTYMEMBERS.TraitorFisher:
        return [
          [
            `$$TraitorFisher$: "Why are you keeping me around? Aren't you afraid that I'll betray you?"`,
            `$$Ren$: "Hmmm I'm pretty good at knowing where loyalties lie. I usually can rely on the people who join my party for life!"`,
            `$$TraitorFisher$: "But I will betray you!"`,
            `$$Ren$: "Oh, I know that fully well. But that doesn't mean you can't be useful in the meantime. Don't worry about me, I'm fully ready for your inevitable betrayal. When the time comes, I won't even bat a eye."`,
          ],
          [
            `$$Ren$: "So you're passionate about cooking?"`,
            `$$TraitorFisher$: "Yes I am. It frustrates me a lot that we don't get any chance to cook or fish."`,
            `$$Ren$: "I know! I was fully expecting to cook myself. Nowadays it's pretty standard for adventurers to fish and cook. It really feels like cooking should at least be an option."`,
            `$$Ren$: "Though I guess, maybe it's a bit overdone? It seems that tons of adventurers forget about the meals they cook and don't even eat them."`,
            `$$TraitorFisher$: "I'd consider that an insult. Maybe not cooking isn't that bad, if it avoids me that afront!"`,
          ]
        ];

      case PARTYMEMBERS.SavageChild:
        return [
          [
            `$$Ren$: "How are you, $$SavageChild$? Are you okay? Do you need anything?"`,
            `$$SavageChild$: "Meat!"`,
            `$$Ren$: "You know, you don't have to stay with me if you don't want to..."`,
            `$$SavageChild$: "Meat!"`,
            `$$Ren$: "I'm just wondering if you're really happy being on the road with me like that. It's dangerous, we fight a lot..."`,
            `$$SavageChild$: "Meat!"`,
            `$$Ren$: "Well at least you have your priorities straight."`,
          ],
          [
            `$$SavageChild$: "$$Ren$..."`,
            `$$Ren$: "You finally know my name!"`,
            `$$SavageChild$: "$$SavageChild$ protect $$Ren$!"`,
            `$$Ren$: "That's sweet! Thank you, $$SavageChild$!"`,
            `$$SavageChild$: "Now meat, please!"`,
          ]
        ];

      case PARTYMEMBERS.GeniusProdigy:
        return [
          [
            `$$GeniusProdigy$: "You know, I've realized that this investigation is going to be quite difficult. Impossible even."`,
            `$$Ren$: "How so?"`,
            `$$GeniusProdigy$: "Well remember, my hypothesis is that you can travel between different branches of the multiverse. But from the outside observer perspective, that is to say me, there's no real difference between when you make such a trip or not."`,
            `$$GeniusProdigy$: "Any second, you could be coming back from a doomed timeline, and I wouldn't be able to notice it."`,
            `$$GeniusProdigy$: "It could be happening now!"`,
            `$$GeniusProdigy$: "Or now!"`,
            `$$Ren$: "So what? Are you giving up?"`,
            `$$GeniusProdigy$: "No, but it's a real challenge to test my theory. It seems that the only point of difference between you traveling in the multiverse or not is the information you're able to gather. And even that's unclear. All I have to go on is your behavior, which I can use to infer whether or not you behave regularly or abnormally..."`,
            `$$GeniusProdigy$: "But you always behave abnormally!"`,
          ],
          [
            `$$GeniusProdigy$: "It's pretty amazing how you can manipulate the multiverse without even realizing it."`,
            `$$Ren$: "What do you mean?"`,
            `$$GeniusProdigy$: "Without even being aware of it, you're twisting the timeline. There are many cases where I'm pretty sure you should have died. But you used the power given by the Goddess to avert your fate!"`,
            `$$Ren$: "How can you tell? The world looks the same."`,
            `$$GeniusProdigy$: "That's the thing with this kind of divine powers, when it's well done, there's no way to tell! When you can change the fabric of reality, you can also change everyone's memories to make them believe things have not changed."`,
            `$$Ren$: "Doesn't that mean you'll never be able to gather data for your experiments on me?"`,
            `$$GeniusProdigy$: "Alas, I think it does... But I'll find a way!"`,
          ]
        ];

      case PARTYMEMBERS.FemmeFatale:
        return [
          [
            `$$FemmeFatale$: "Now that I've travelled with you a bit, I see what you meant about the people. It's bizarre."`,
            `$$Ren$: "What do you mean?"`,
            `$$FemmeFatale$: "Well I did say all humans are basically the same and you can make them do anything if you know what button to press. But it's even worse than that with you..."`,
            `$$FemmeFatale$: "People just repeat the same things over and over to you, in the same conversation. It's almost like they're possessed..."`,
            `$$Ren$: "I try not to think about it too much, it's pretty scary. Maybe it's just the Goddess feeding them lines."`,
          ],
          [
            `$$FemmeFatale$: "Being the Promised Child is very peculiar. Everybody acts differently around you."`,
            `$$Ren$: "Yeah, most people are bending themselves backwards to help me in my quest. It's pretty nice, but it can be overwhelming..."`,
            `$$FemmeFatale$: "But as soon as you enter a room, everyone seems to already know you...  Could it be that you're that famous?"`,
            `$$FemmeFatale$: "They stop whatever they are doing and focus they full attention on you. Whenever you talk to them, they reply immediately. They put their whole existence on pause just for you..."`,
            `$$Ren$: "Stop it! That's not helping with the pressure at all!"`,
          ]
        ];

      case PARTYMEMBERS.DisguisedPrincess:
        return [
          [
            `$$DisguisedPrincess$: "Do you think that when we're done with that quest, bards will be telling our story?"`,
            `$$Ren$: "Uh, I don't know... maybe..."`,
            `$$DisguisedPrincess$: "It will be so cool! I think we'll make a great story! To be part of those adventures I've heard so much about! I can't wait to see what they'll say about us! How do you think they'll talk of me? Do you think they'll talk about this moment? Wouldn't that be funny?"`,
            `$$Ren$: "I mostly think that before worrying about what people are going to say, we should focus on surviving this quest..."`,
            `$$DisguisedPrincess$: "You're right, if we die, nobody will know what we've been through!"`,
            `$$Ren$: "Do you only care about what other people think?"`,
            `$$DisguisedPrincess$: "Hmmm not really, but it does matter, you know. I was always only treated as a noble, so I was forced to play the part. But I want to exist and be recognized for my own merit as an adventurer! And if you want to be the hero of a tale, you need the tale to have an audience, don't you?"`,
          ],
          [
            `$$DisguisedPrincess$: "I'm just so happy to finally be inside one of the stories I love so much!"`,
            `$$Ren$: "What do you mean?"`,
            `$$DisguisedPrincess$: "This is just like the stuff the bards sang about! It has everything! A big bad enemy, setbacks, a hero bravely triumphing over adversity, sacrifices... I could not dream of a more textbook adventure to join!"`,
            `$$Ren$: "I'm glad our troubles make you happy... In the meantime, in the real world, we're having a tough time, you know. So stop thinking about your stories and focus on the reality, please!"`,
            `$$DisguisedPrincess$: "Yes, yes, sorry. But we are the heroes of our own story, happening right now! And if narrative rules are anything to go by, you're bound to get a happy ending!"`,
            `$$Ren$: "That's a pretty unconvincing argument."`,
          ]
        ];

      case PARTYMEMBERS.DumbMuscles:
        return [
          [
            `$$DumbMuscles$: "So mate, what are some good adventurer tips?"`,
            `$$Ren$: "Hum... Pray frequently. Any time you feel a big battle coming, or maybe a big decision, or anything risky, really. Just go straight to an altar and pray there."`,
            `$$DumbMuscles$: "Damn, I didn't know adventurers were so religious."`,
            `$$Ren$: "Well, the Goddess is very important for adventurer. She guides and protects everyone, and adventurers are the ones who need it the most."`,
          ],
          [
            `$$DumbMuscles$: "Wow, the world is so big, mate! And you can go anywhere?"`,
            `$$Ren$: "Pretty much. It's not always the case, but the Goddess watches over me. She'll tell me if I go somewhere too dangerous."`,
            `$$DumbMuscles$: "That's dope! But how do you know where to go?"`,
            `$$Ren$: "Well it depends, if I want to do my quest, I go to my objectives. But since the world is so big and open, sometimes I do detours and explore it freely."`,
            `$$DumbMuscles$: "Wait, does that mean you're slacking off on your quest?"`,
            `$$Ren$: "Not necessarily! Exploring randomly is a great training for when the real battle come! And I get tons of treasures and weapons to make myself stronger."`,
            `$$DumbMuscles$: "So you're saying it's a good idea to go on tangents?"`,
            `$$Ren$: "Sometimes, when you feel like it. It could be perfect to train yourself some more if you feel like you're not ready for the next bit."`,
            `$$DumbMuscles$: "Awesome! Let's do some training, then!"`,
          ]
        ];

      case PARTYMEMBERS.TorturedSoul:
        return [
          [
            `$$TorturedSoul$: "Child, thou keep running into peril, yet thou endure every time. Thou miss every opportunity to bring your existence to an end, as if miraculously. Is this foolishness or bravery?"`,
            `$$Ren$: "I don't really feel like I have a choice in the matter, you know. The Goddess always has my back, whether I want it or not."`,
          ],
          [
            `$$TorturedSoul$: "Go forth! Make haste! I beg, do turn thine acursed blade against me!"`,
            `$$Ren$: "I can't!"`,
            `$$TorturedSoul$: "It is my deepest longing! I am in dire pain! Release me!"`,
            `$$Ren$: "That's not the problem! There is no friendly fire in this universe. My weapons and spells litteraly cannot hurt you."`,
            `$$TorturedSoul$: "Curses! Am I doomed to never escape from my unrelenting torment?"`,
          ]
        ];

      case PARTYMEMBERS.RetiredProtector:
        return [
          [
            `$$RetiredProtector$: "It's incredible, the world has changed so much since I traveled last. It has more colors, more details..."`,
            `$$Ren$: "Really?"`,
            `$$RetiredProtector$: "Yes, you kids don't know how good you have it. Back in my days, adventurers had to spend days traveling between different places, trying out all kind of combinations of items in hope to find one that would work correctly..."`,
            `$$Ren$: "There's still plenty of weirdness when it comes to what item works where, you know..."`,
            `$$RetiredProtector$: "Sure, but nowadays you're more guided. We needed to do stuff on our own. It took a lot of patience, you know..."`,
          ],
          [
            `$$RetiredProtector$: "Been watching you fight for a while. You kids have it easy..."`,
            `$$Ren$: "What do you mean?"`,
            `$$RetiredProtector$: "All your hits land, all your enemies die so fast... There's no skill whatsoever in the way you fight. You don't know what adversity really is..."`,
            `$$Ren$: "Is that... bad?"`,
            `$$RetiredProtector$: "I suppose not, it bodes well for our quest. It does make me regret all the time and effort I wasted in my youth, though..."`,
          ]
        ];

      case PARTYMEMBERS.SnobRich:
        return [
          [
            `$$SnobRich$: "You seem to amass quite a lot of items in your journey. Yet, I never see you struggle with carrying them around."`,
            `$$Ren$: "Yes, pretty much anything can fit in my bags! It's always been that way. A kind of blessing from the Goddess!"`,
            `$$SnobRich$: "That's quite a useful talent to have in business. When you have a chance, perhaps we should negociate terms for your employment as my courrier..."`,
            `$$Ren$: "No, thanks. I have no interest in becoming a mule."`,
          ],
          [
            `$$SnobRich$: "Say, you've got a real talent for sales. How do you get the merchants to buy basically everything? They even purchase your weird goo and so on."`,
            `$$Ren$: "Hmmm it's not really about the sale. It's more like I only pick up what I know they'll want..."`,
            `$$SnobRich$: "Still, it's pretty weird to see them buy everything you offer. I suppose you have a really keen grasp on the market. Are you sure you don't want to be my business partner? We could make a fortune!"`,
            `$$Ren$: "No, thanks."`,
          ]
        ];

      default:
        return [];
    }
  },

  get_shared: function(after_bestfriend_death){
    var r = [];
    if(!after_bestfriend_death){
      r = r.concat(LANGUAGE_EVENTS._party(PARTYMEMBERS.BestFriend));
    }
    for(var member in PARTYMEMBERS) {
      if(PARTY.has_member(PARTYMEMBERS[member])){
        r = r.concat(LANGUAGE_EVENTS._party(PARTYMEMBERS[member]));
      }
    }
    if (r.length == 0){
      r = LANGUAGE_EVENTS._all_alone;
    }
    return r;
  },
}
