var _TRAINER_PRICES = {};

_TRAINER_PRICES[ABILITY.Fireball] = 15;

const TRAINER = {
  _buy: function(ability){
    if (INVENTORY.count(ITEM.XpToken) >= _TRAINER_PRICES[ability]){
      ABILITIES.unlock(ability);
      INVENTORY.decrease(ITEM.XpToken, _TRAINER_PRICES[ability]);
    }

    TRAINER._current_menu.close();
    TRAINER._menu.buy();
  },

  _menu: {
    buy: function(){
      var merchant_text = `I can teach you the following skills, if you got enough experience in your journey. It looks like you have ${INVENTORY.count(ITEM.XpToken)} to spare.`;
      var goods = [];

      for(var index in _TRAINER_PRICES){
        if (ABILITIES.has_ability(index)){
          continue;
        }
        if (!ARCHETYPES.get_items(TRAINER._current_type).includes(index)){
          continue;
        }
        (function(i){
          var text = `${i}: ${_TRAINER_PRICES[i]} xp`;
          goods.push({"text": text, "effect": function(){ TRAINER._buy(i); }, "keep_open": true});
        }(index));
      }

      TRAINER._current_menu = new CenteredTextMenu(merchant_text,
          goods.concat([
            TEXTMENU_EMPTYROW,
            {"text": "Leave", "effect": "##CLOSE"},
         ])
       );
    },

    main: function() {
      TRAINER._current_menu = new CenteredTextMenu("What do you want to do?",
          [
            {"text": "Train", "effect": function(){ TRAINER._menu.buy(); }},
            {"text": "Leave", "effect": "##CLOSE"},
         ]
       );
    },
  },

  enter: function(type) {
    TRAINER._current_type = type;
    TextBannerSequence.make([RANDOM.pick([
      `The trainer welcomes you with a smile.`,
      `Trainer: "What can I do for you?"`,
      `Trainer: "Welcome to my workshop, how may I help you?"`,
    ])], TRAINER._menu.main);
  },
}
