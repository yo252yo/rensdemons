// ===================
// =================== INITIALIZATION
// ===================
new CenteredImage("assets/battles/villager2.png", 'background');

PLAYER_ACTIONS.escape("Leave");

var battle = "_party/_UpbeatDojikko";
var ud = DICTIONARY.get(PARTYMEMBERS.UpbeatDojikko);

var pricelock = function(){
  if(INVENTORY.cash() < 15) {
    BATTLETREE.api.lock(battle, "Read palm");
    BATTLETREE.api.lock(battle, "Read cards");
  }
  // we dont need an unlock in an else clause because its always unlocked by _ask_reading
}

var _behind =  PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Ask about spirit",
  unlock: true,
  outcome: BATTLETREE.ESCAPE,
  description: [`$$Ren$: "Is there something behind me?"`,
                `$$UpbeatDojikko$: "Yes, it's the spirit of my granny, Josephine. She's always near me. I think she likes you."`,
                `This is a bit too much for you to handle. You run away in a panic.`,
  ],
  extra_function: function(){
    STATS.record.flag("UpbeatDojikko_Spirit");
  }
});

var _spirits =  PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Spirits",
  unlock: true,
  description: [`$$Ren$: "What spirits do you talk to?"`,
                `$$UpbeatDojikko$: "The spirits of the departed who cannot move on. They tell me things, and I help guide them."`,
                `$$Ren$: "So you can speak to the dead? It must be grim."`,
                `$$UpbeatDojikko$: "Sometimes, yes. Not always. It's true that most of them have regrets or pains... But I keep them company, I talk to them, I cheer them up..."`,
                `You're starting to feel uncomfortable. This lady has an unhealthy relationship with the spirit world. In fact, she constantly looks over your shoulder, as if exchanging glances with someone invisible standing behind you. Maybe you'd better make your escape quielty...`,
  ],
  function: _behind,
});


var _read_palm = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Read palm",
  unlock: true,
  description: [`$$Ren$: "What do you see in my hand?"`,
                `You hold your hand to her. You feel the chilly touch of her cold fingers against your skin.`,
                `She grabs your wrist to pull your hand closer, but in doing so the drags your arm on the table which knocks out one of her mystical looking grimoires. It falls on the ground, open at a page about 'starting your spiritual journey'.`,
                `$$UpbeatDojikko$: "Oops... Sorry about that. It's ok, don't mind it. Let me see your hand."`,
                `She goes back to staring at your skin. Something obviously catches her attention, because she doesn't move for a few minutes, only occasionally mumbling to herself or asking questions to an invisble presence.`,
                `$$UpbeatDojikko$: "But what does this mean? I don't understand... Why?"`,
                `After a while, she looks up, the face clouded by an expression of pain.`,
                `$$UpbeatDojikko$: "I'm sorry, this has never happened before. I don't see anything. I cannot get a glance at your destiny. It's as if it's... not from this world."`,
                `$$Ren$: "I guess I should have told you... I'm the Promised Child."`,
                `$$UpbeatDojikko$: "Oh..."`,
                `She says absently, as if not really comprehending the information. And then another time:`,
                `$$UpbeatDojikko$: "Oh! That explains it. I certainly cannot peek into the mind of the Goddess. Neither me nor my friendly spirit helpers. We're not priests."`,
                `$$Ren$: "I see, that makes sense. So there's nothing you can tell me about what is to come on my journey?"`,
                `$$UpbeatDojikko$: "I'm afraid not. It's probably you who could tell me things about the future. You can speak to the Goddess, not just silly spirits..."`,
  ],
  function: function(){
    INVENTORY.decrease(ITEM.Coin, 15);
    pricelock();
    _spirits("Read palm");
    STATS.record.flag("UpbeatDojikko_Book");
  }
});

var _read_cards = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Read cards",
  unlock: true,
  outcome: BATTLETREE.ESCAPE,
  description: [`$$Ren$: "Can you read my cards?"`,
                `The fortune teller nods in silence. She takes your coins, and draws a wooden box from a fold in her velvety dress. She opens it to reveal a deck of cards, so worn out that you can barely make out the symbols on the back.`,
                `$$UpbeatDojikko$: "Let us see."`,
                `She places a hand on top of the deck, and closes her eyes. She starts muttering esoterical chants you cannot understand. It lasts for a few minutes, before she finally speaks in a language you can understand.`,
                `$$UpbeatDojikko$: "Spirits, show us the way. Tell us the secrets of this child's destiny."`,
                `With a trembling hand, she draws three cards and places them on the old wood table. You cannot decypher the eroded symbols on them, but the general tone seems pretty ominous, as confirmed by the puzzled expression on your host's face.`,
                `$$Ren$: "Is it bad?"`,
                `$$UpbeatDojikko$: "It's... not that simple. The first card is Death. It seems you and it go hand in hand. It seems to be an ever-looming presence in your life. But the weird thing is... it's in the 'beginning' quadrant. And it resonates with the Wheel of Fortune. It's as if... you can transcend it? And use it to birth new life? But you're stuck in the never-ending cycle of the wheel... My poor child, there's no end to your suffering. And with the Priestess in the 'dominant' quadrant, it's almost as if you embody the cycle of life by yourself. I've never quite seen such a thing."`,
                `Seeing her confusion grow, you decide it's time to come clean.`,
                `$$Ren$: "I think it's because... I'm the Promised Child."`,
                `Her eyes widen at the reveal, but the surprise is quickly replaced by a thoughtful look.`,
                `$$UpbeatDojikko$: "I see... Well, that certainly explains some things. I can clearly see the Goddess within you. But that makes this exercise very challenging. I've never done a reading for a holy being before..."`,
                `$$Ren$: "I imagine... Does this mean my quest won't end well?"`,
                `$$UpbeatDojikko$: "From what I see, it may be that your quest won't end at all. I'm sorry, these visions are very confused. It probably means that it's not decided yet. That it could go either way..."`,
                `$$BestFriend$: "That's not very reassuring..."`,
                `$$UpbeatDojikko$: "Don't worry too much, you have the Goddess on your side. The one thing that the cards tell me clearly is that death may be a constant in your life, but it will never take you."`,
                `$$Ren$: "How could that be?"`,
                `$$UpbeatDojikko$: "I'm sorry, that's as much as I can tell. The spirits are vague, and..."`,
                `The seer body is shaken by a spasm, her eyes close and her head tilts back at a worrying angle.`,
                `Suddenly, she lets out the biggest sneeze you've ever heard. Cards fly all over the room. She rushes to gather them, but in her haste, she pushes over a shelf that crumbles. Amulets and trinkets fall on the ground in a metallic cacophony.`,
                `$$UpbeatDojikko$: "Oh my, I'm sorry."`,
                `She starts gathering the fallen artifacts, but accidentally steps on her dress and ends up on the floor.`,
                `$$UpbeatDojikko$: "Don't worry, that happens all the time."`,
                `$$Ren$: "Are you sure?"`,
                `$$BestFriend$: "Maybe we could help..."`,
                `$$UpbeatDojikko$: "No, no. I'm fine. I'm used to it. I just need a little time to tidy everything. Just leave me alone for a bit, will you?"`,
                ],
  extra_function: function(){
    INVENTORY.decrease(ITEM.Coin, 15);
    pricelock();
    STATS.record.flag("UpbeatDojikko_Cards");
  }
});

var _poor = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Negociate",
  unlock: true,
  outcome: BATTLETREE.ESCAPE,
  description: [`$$Ren$: "I'm sorry, I don't have that kind of money..."`,
                `$$UpbeatDojikko$: "Well I'm already giving you a discount. I can't exactly work for free, you know, I need to eat too! Why don't you ask your parents for a few coins and come back?"`,
                ],
});

var _ask_reading = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Ask reading",
  unlock: true,
  description: [`$$Ren$: "Actually, I'm about to embark on a long journey, and I was wondering if you could ask the spirits for advice about it."`,
                `$$UpbeatDojikko$: "Oh, I see. A journey you say? Oh my, that's quite unusual. Yes, I suppose I could do that. I could read your palms, or I could read your cards. Since you're such a little cutie, I'll give you a discount. How about... 15 coins?"`,
                ],
  function: function() {
    _poor("Ask reading");
    _read_palm("Ask reading");
    _read_cards("Ask reading");
    pricelock();
  },
});

var _browse_wares = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Trade",
  unlock: true,
  outcome: BATTLETREE.ESCAPE,
  description: [`$$Ren$: "I'm here to shop, can I look at your goods?"`,
                `$$UpbeatDojikko$: "You're so sweet, but this shop is not for people your age! Occult sciences are pretty scary, and things can go very bad if you're not careful."`,
                ],
});

var _withdraw = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Apologize",
  unlock: true,
  outcome: BATTLETREE.ESCAPE,
  description: [`$$Ren$: "Huh yeah, sorry, I kinda entered this shop by mistake."`,
                `$$UpbeatDojikko$: "It's fine, no harm done sweetie! But this place is swarming with spirits, you probably shouldn't stay here. Shoo!"`,
                ],
});

PLAYER_ACTIONS.add({
  name: "Say hello",
  unlock: true,
  description: [`$$Ren$: "Hello?"`,
                `$$UpbeatDojikko$: "Hi! Are you lost? Can I help you?"`,
                `She gets up from her seat, and the crystal ball that was on her lap falls on the ground and shatters in a thousand pieces.`,
                `$$UpbeatDojikko$: "Pay no attention to this, it happens all the time."`,
                `$$Ren$: "Huh... okay..."`,
                ],
  function: function() {
    STATS.record.flag("UpbeatDojikko_Fall");
    _withdraw("Say hello");
    _browse_wares("Say hello");
    _ask_reading("Say hello");
  },
});

var _ask_ghost = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: `Ask Josephine`,
  unlock: true,
  outcome: BATTLETREE.WIN,
  description: [`$$Ren$: "It's not a game, I also have a special link with the spirits. Just ask Josephine, she'll tell you that this journey is the right thing to do."`,
                `$$UpbeatDojikko$ looks stunned.`,
                `$$UpbeatDojikko$: "How do you know about Josephine?"`,
                `$$Ren$: "I'm the Promised Child, remember?"`,
                `$$UpbeatDojikko$: "To think the Goddess would also let you see into the realms of the spirits... What a tremendous power. I've never met another seer before. I guess I could learn much in your company."`,
                `$$Ren$: "Of course, ask Josephine, I tell you!"`,
                `$$UpbeatDojikko$ looks over your shoulder.`,
                `$$UpbeatDojikko$: "Is he right, nanny? Should I go?"`,
                `You watch her listen to an answer you cannot hear.`,
                `$$UpbeatDojikko$: "Very well, if you both say so, I will accompany the Promised Child on his quest."`,
                "$$UpbeatDojikko$ joins your party!",
                ],
  extra_function: function(){
    PARTY.changeNickname(PARTYMEMBERS.UpbeatDojikko);
    PARTY.add(PARTYMEMBERS.UpbeatDojikko);
  },
});

var _tarot = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Use tarot",
  unlock: true,
  description: [`$$Ren$: "Let me put it this way. Take out your tarot deck, and draw three cards for me. They will be the major arcana of Death, the Wheel of Fortune and the Priestess. This combination should be unusual enough to trigger your curiosity. Don't you want to know more?"`,
                `$$UpbeatDojikko$: "What are you on about?"`,
                `The fortune teller execute your instructions, growing more curious than skeptical. While she's doing her usual ritual, $$BestFriend$ whispers to you:`,
                `$$BestFriend$: "Is that also the Goddess? Can She manipulate the cards? How do you know the right combination?"`,
                `$$Ren$: "It's a bit complicated, I'm not sure I can explain..."`,
                `As the cards are drawn, the shopkeeper finds the exact combination you predicted.`,
                `$$UpbeatDojikko$: "It is indeed quite uncanny. I suppose this makes sense if you're the Promised Child. It does indeed hint of strange events. Maybe I should come and see them..."`,
                `$$Ren$: "I think you'd find it interesting."`,
                `$$UpbeatDojikko$: "What I find more interesting is how you dare play around with the spirit realm!"`,
                ],
  function: function() {
    BATTLETREE.api.lock(battle, "Use tarot");
    if(STATS.flag("UpbeatDojikko_Spirit")) {
      _ask_ghost("Use tarot");
    }
  },
});


var _tease = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Bluff",
  unlock: true,
  description: [`$$Ren$: "I think you'll see a very special proposition if you look at my palm."`,
                `The fortune teller is pretty suspicious. You have not convinced her yet.`,
                `$$UpbeatDojikko$: "Are you trying to get a free reading out of me?"`,
                `$$Ren$: "Just see what happens."`,
                `You offer your arm to the shopkeeper. As she seizes it, she knocks off the table knocks out one of her mystical looking grimoires. You grin.`,
                `$$UpbeatDojikko$: "What?"`,
                `$$Ren$: "I didn't say you needed to look 'at' my palm."`,
                `You nod in the direction of the book on the floor. It's open at the page 'starting your spiritual journey'.`,
                `$$Ren$: "I'm about to embark on my spiritual journey, and I'm starting to think your talents with spirits could be a great help."`,
                `The fortune teller is still frowning, having a tough time piecing together what is happening. $$BestFriend$ is also confused by the theatrics of your sudden proposal and your apparent power of book-manipulation.`,
                `$$UpbeatDojikko$: "Did you do that?"`,
                `Faced with your lack of answer, she continues:`,
                `$$UpbeatDojikko$: "What's in it for me?"`,
                ],
  function: function() {
    BATTLETREE.api.lock(battle, "Bluff");
    BATTLETREE.api.lock(battle, "Apologize");
    BATTLETREE.api.lock(battle, "Trade");
    if(STATS.flag("UpbeatDojikko_Cards")) {
      _tarot("Bluff");
    }
  },
});

PLAYER_ACTIONS.add({
  name: "Warn",
  description: [`$$Ren$: "Careful! don't get up!"`,
                `$$UpbeatDojikko$: "W... What?"`,
                `Startled by your sudden warning, the fortune teller predictably gets up, and the crystal ball that was on her lap falls on the ground and shatters.`,
                `$$UpbeatDojikko$: "Pay no attention to this, it happens... How?"`,
                `She's visibly intrigued by your foresight. Next to you, $$BestFriend$ is throwing you inquisitive looks. You simply shrug.`,
                `$$Ren$: "I'm the Promised Child. The Goddess lets me see things."`,
                `$$UpbeatDojikko$: "Are you? It's an honor to have you here. What can I do for you?"`,
                ],
  function: function() {
    BATTLETREE.api.lock(battle, "Say hello");
    _withdraw("Warn");
    _browse_wares("Warn");

    if(STATS.flag("UpbeatDojikko_Book")){
      _tease("Warn");
    }
  },
});

if(STATS.flag("UpbeatDojikko_Fall")){
  BATTLETREE.api.unlock(battle, "Warn");
}



// ===================
// =================== START
// ===================
BATTLE.operations.start("You find yourself in an occult shop. The air is heavy with the smell of burnt incense. The walls are covered with tentures and shelves hosting candles, amulets, trinkets or mysterious shiny stones. The hostess is a charming young woman wearing a lot of jewelry which shines erratically under the trembling light of the candles. She seems pretty surprised to see you. You suppose her customers are usually older.");
