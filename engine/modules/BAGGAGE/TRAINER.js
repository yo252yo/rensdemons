var _TRAINER_PRICES = {};

_TRAINER_PRICES[ABILITY.Fireball] = 50;
_TRAINER_PRICES[ABILITY.Ice_bolt] = 100;
_TRAINER_PRICES[ABILITY.Thunder] = 150;
_TRAINER_PRICES[ABILITY.Storm] = 200;
_TRAINER_PRICES[ABILITY.Asphyxiate] = 500;
_TRAINER_PRICES[ABILITY.Earthquake] = 1000;
_TRAINER_PRICES[ABILITY.Incinerate] = 2000;
_TRAINER_PRICES[ABILITY.Summon] = 5000;

_TRAINER_PRICES[ABILITY.Poison] = 75;
_TRAINER_PRICES[ABILITY.Shrink] = 150;
_TRAINER_PRICES[ABILITY.Petrify] = 300;
_TRAINER_PRICES[ABILITY.Confusion] = 1000;
_TRAINER_PRICES[ABILITY.Lull] = 3000;
_TRAINER_PRICES[ABILITY.Charm] = 5000;

_TRAINER_PRICES[ABILITY.Circumvent] = 100;
_TRAINER_PRICES[ABILITY.Sneak] = 200;
_TRAINER_PRICES[ABILITY.Persuade] = 500;
_TRAINER_PRICES[ABILITY.Intimidate] = 1000;
_TRAINER_PRICES[ABILITY.Mystify] = 5000;

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
      var merchant_text = `I can teach you the following skills in the way of the ${TRAINER._current_type}, if you got enough experience in your journey. It looks like you have ${INVENTORY.count(ITEM.XpToken)} to spare.`;
      var goods = [];

      for(var index in _TRAINER_PRICES){
        if (ABILITIES.has_ability(index)){
          continue;
        }
        if (!ARCHETYPES.get_items(TRAINER._current_type).includes(index)){
          continue;
        }
        if (TRAINER._current_threshold && _TRAINER_PRICES[index] > TRAINER._current_threshold) {
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
            {"text": "Learn the way of the " + TRAINER._current_type, "effect": function(){ TRAINER._menu.buy(); }},
            {"text": "Leave", "effect": "##CLOSE"},
         ]
       );
    },
  },

  enter: function(type, threshold) {
    TRAINER._current_type = type;
    TRAINER._current_threshold = threshold;
    TextBannerSequence.make([RANDOM.pick([
      `The trainer welcomes you with a smile.`,
      `Trainer: "What can I do for you?"`,
      `Trainer: "I can teach you a lot of things. Where should I start?"`,
    ])], TRAINER._menu.main);
  },

  get_prices: function(){
    return _TRAINER_PRICES;
  }
}
