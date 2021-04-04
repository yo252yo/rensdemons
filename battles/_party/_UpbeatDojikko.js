// ===================
// =================== INITIALIZATION
// ===================
new CenteredImage("assets/battles/villager2.png", 'background');

PLAYER_ACTIONS.escape("Leave");

var battle = "_party/_UpbeatDojikko";
var ud = DICTIONARY.get(PARTYMEMBERS.UpbeatDojikko);


//  PARTY.changeNickname(PARTYMEMBERS.UpbeatDojikko);

var pricelock = function(){
  if(INVENTORY.cash() < 15) {
    BATTLETREE.api.lock(battle, "Read palm");
    BATTLETREE.api.lock(battle, "Read cards");
  }
}


var _read_palm = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Read palm",
  unlock: true,
  outcome: BATTLETREE.ESCAPE,
  description: [
    // TODO
  ],
  extra_function: function(){
    INVENTORY.decrease(ITEM.Coin, 15);
    pricelock();
  }
});

var _read_cards = PLAYER_ACTIONS.function.unlock_replacing_action({
  name: "Read cards",
  unlock: true,
  outcome: BATTLETREE.ESCAPE,
  description: [
    // TODO

  ],
  extra_function: function(){
    INVENTORY.decrease(ITEM.Coin, 15);
    pricelock();
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
                ],
  function: function() {
    _withdraw("Say hello");
    _browse_wares("Say hello");
    _ask_reading("Say hello");
  },
});

// ===================
// =================== START
// ===================
BATTLE.operations.start("You find yourself in an occult shop. The air is heavy with the smell of burnt incense. The walls are covered with tentures and shelves hosting candles, amulets, trinkets or mysterious shiny stones. The hostess is a charming young woman wearing a lot of jewelry which shines erratically under the trembling light of the candles. She seems pretty surprised to see you. You suppose her customers are usually older.");
