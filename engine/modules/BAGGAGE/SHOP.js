

var _SHOP_PRICES = {};

_SHOP_PRICES[ITEM.Elixir_fire] = 20;
_SHOP_PRICES[ITEM.Elixir_ice] = 50;

_SHOP_PRICES[ITEM.Elixir_vine] = 75;
_SHOP_PRICES[ITEM.Elixir_venom] = 100;
_SHOP_PRICES[ITEM.Elixir_decay] = 150;
_SHOP_PRICES[ITEM.Elixir_chaos] = 200;

_SHOP_PRICES[ITEM.Sword_wooden] = 20;
_SHOP_PRICES[ITEM.Dagger] = 75;
_SHOP_PRICES[ITEM.Mace] = 100;
_SHOP_PRICES[ITEM.Shield] = 200;
_SHOP_PRICES[ITEM.Spear] = 250;
_SHOP_PRICES[ITEM.Sword_iron] = 500;
_SHOP_PRICES[ITEM.Axe] = 600;
_SHOP_PRICES[ITEM.Sword_great] = 1000;

_SHOP_PRICES[ITEM.Arrow] = 5;
_SHOP_PRICES[ITEM.Poison_darts] = 10;
_SHOP_PRICES[ITEM.Rope] = 100;
_SHOP_PRICES[ITEM.Bow] = 150;
_SHOP_PRICES[ITEM.Net] = 200;

_SHOP_PRICES[ITEM.Stone] = 1;
_SHOP_PRICES[ITEM.Mushroom] = 1;
_SHOP_PRICES[ITEM.Berry] = 2;
_SHOP_PRICES[ITEM.Stick] = 2;
_SHOP_PRICES[ITEM.Fang] = 5;
_SHOP_PRICES[ITEM.Bone] = 5;
_SHOP_PRICES[ITEM.Flower] = 5;
_SHOP_PRICES[ITEM.Feather] = 10;
_SHOP_PRICES[ITEM.Linnens] = 10;
_SHOP_PRICES[ITEM.Scale] = 20;


_SHOP_SELLONLY = [ITEM.Fang, ITEM.Bone, ITEM.Stick, ITEM.Stone, ITEM.Scale, ITEM.Feather, ITEM.Flower, ITEM.Linnens, ITEM.Berry, ITEM.Mushroom];

const SHOP = {
  selling_discount: 0.5,

  _prices: {
    buy: function(object){
      return _SHOP_PRICES[object];
    },
    sell: function(object){
      return Math.ceil(SHOP.selling_discount*_SHOP_PRICES[object]);
    },
  },

  _transaction: {
    buy: function(object){
      var price = SHOP._prices.buy(object);
      if (INVENTORY.cash() >= price){
        INVENTORY.increase(object);
        INVENTORY.decrease(ITEM.Coin, price);
      }

      SHOP._current_menu.close();
      SHOP._menu.buy();
    },
    sell: function(object){
      if (INVENTORY.count(object)){
        INVENTORY.decrease(object);
        INVENTORY.increase(ITEM.Coin, SHOP._prices.sell(object));
      }

      SHOP._current_menu.close();
      SHOP._menu.sell();
    },
  },

  _menu: {
    buy: function(){
      var merchant_text = `What are you interested in? Looks like you have ${INVENTORY.cash()} coins.`;
      var goods = [];

      for(var index in _SHOP_PRICES){
        if (_SHOP_SELLONLY.includes(index)){
          continue;
        }
        if (!ARCHETYPES.get_items(SHOP._current_type).includes(index)){
          continue;
        }
        if (SHOP._current_threshold && SHOP._prices.buy(index) > SHOP._current_threshold){
          continue;
        }
        (function(i){
          var text = `${i}: ${SHOP._prices.buy(i)} coins`;
          goods.push({"text": text, "effect": function(){ SHOP._transaction.buy(i); }, "keep_open": true});
        }(index));
      }

      SHOP._current_menu = new CenteredTextMenu(merchant_text,
          goods.concat([
            TEXTMENU_EMPTYROW,
            {"text": "Leave", "effect": "##CLOSE"},
         ])
       );
    },

    sell: function(){
      var merchant_text = `What do you want to sell? Looks like you have ${INVENTORY.cash()} coins.`;
      var goods = [];

      for(var index in INVENTORY.all_objects()){
        if(!Object.keys(_SHOP_PRICES).includes(index)){
          continue;
        }
        (function(i){
          var text = `${i} (${INVENTORY.count(i)}): ${SHOP._prices.sell(i)} coins`;
          goods.push({"text": text, "effect": function(){ SHOP._transaction.sell(i); }, "keep_open": true});
        }(index));
      }

      SHOP._current_menu = new CenteredTextMenu(merchant_text,
          goods.concat([
            TEXTMENU_EMPTYROW,
            {"text": "Leave", "effect": "##CLOSE"},
         ])
       );
    },

    main: function() {
      SHOP._current_menu = new CenteredTextMenu("What do you want to do?",
          [
            {"text": "Buy (Way of the " + SHOP._current_type + ")", "effect": function(){ SHOP._menu.buy(); }},
            {"text": "Sell", "effect": function(){ SHOP._menu.sell(); }},
            {"text": "Leave", "effect": "##CLOSE"},
         ]
       );
    },
  },

  enter: function(type, threshold) {
    SHOP._current_type = type;
    SHOP._current_threshold = threshold;
    TextBannerSequence.make([RANDOM.pick([
      `The shopkeeper welcomes you with a smile.`,
      `Shopkeeper: "What can I do for you?"`,
      `Shopkeeper: "Welcome to my little shop, how may I help you?"`,
    ])], SHOP._menu.main);
  },
}
