var _TRAINER_PRICES = {};

_TRAINER_PRICES[ABILITY.Fireball] = 50;
_TRAINER_PRICES[ABILITY.Ice_bolt] = 150;
_TRAINER_PRICES[ABILITY.Thunder] = 250;
_TRAINER_PRICES[ABILITY.Storm] = 500;
_TRAINER_PRICES[ABILITY.Asphyxiate] = 750;
_TRAINER_PRICES[ABILITY.Earthquake] = 2000;
_TRAINER_PRICES[ABILITY.Incinerate] = 3000;
_TRAINER_PRICES[ABILITY.Summon] = 7500;

_TRAINER_PRICES[ABILITY.Poison] = 75;
_TRAINER_PRICES[ABILITY.Shrink] = 200;
_TRAINER_PRICES[ABILITY.Petrify] = 500;
_TRAINER_PRICES[ABILITY.Confusion] = 2000;
_TRAINER_PRICES[ABILITY.Lull] = 5000;
_TRAINER_PRICES[ABILITY.Charm] = 7500;

_TRAINER_PRICES[ABILITY.Circumvent] = 75;
_TRAINER_PRICES[ABILITY.Sneak] = 250;
_TRAINER_PRICES[ABILITY.Persuade] = 750;
_TRAINER_PRICES[ABILITY.Intimidate] = 2000;
_TRAINER_PRICES[ABILITY.Mystify] = 7500;

const TRAINER = {
  xp_to_gold_multiplier: 3,

  _raw_price: function(ability){
    return _TRAINER_PRICES[ability];
  },

  _price: function(ability){
    return Math.round(TRAINER._raw_price(ability) * (1 - 0.6 * MARTYRDOM.effect(MARTYRDOMS.Learning)));
  },

  _buy: function(ability){
    if (INVENTORY.count(ITEM.XpToken) >= TRAINER._price(ability)){
      new AlertTextBox("Learned " + ability);
      ABILITIES.unlock(ability);
      INVENTORY.decrease(ITEM.XpToken, TRAINER._price(ability));
    }

  //  TRAINER._current_menu.close();
    TRAINER._menu.buy();
  },

  _promptBuy: function(ability, cost){
    if (INVENTORY.count(ITEM.XpToken) < cost){
      TRAINER._menu.buy();
      new AlertTextBox("Not enough experience");
      return;
    }

    new CenteredTextMenu("Do you want to learn the secrets of " + ability + "? It will cost you about " + cost + " of your experience...",
        [
          {"text": "Learn", "effect": function(){ TRAINER._buy(ability); }},
          {"text": "Refuse", "effect": "##BACK"},
       ]
     );


  },

  _menu: {
    buy: function(){
      var merchant_text = `You can learn the way of the ${TRAINER._current_type} here, if you got enough experience in your journey (you have ${INVENTORY.count(ITEM.XpToken)}).`;
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
          var text = `${i}: ${TRAINER._price(i)} xp`;
          goods.push({"text": text, "effect": function(){ TRAINER._promptBuy(i, TRAINER._price(i)); }, "keep_open": false});
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
      TRAINER._current_menu = new CenteredTextMenu("Learn more about the Way of the " + TRAINER._current_type + "?",
          [
            {"text": "Listen", "effect": function(){ TRAINER._menu.buy(); }},
            {"text": "Leave", "effect": "##CLOSE"},
         ]
       );
    },
  },

  menu:function (type, threshold){
    TRAINER._current_type = type;
    TRAINER._current_threshold = threshold;
    TRAINER._menu.buy();
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

  get_raw_prices: function(){
    return _TRAINER_PRICES;
  }
}
