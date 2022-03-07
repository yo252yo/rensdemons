

var _SHOP_PRICES = {};

_SHOP_PRICES[ITEM.BreathingPotion] = 5;
_SHOP_PRICES[ITEM.Elixir_fire] = 10;
_SHOP_PRICES[ITEM.Elixir_ice] = 20;
_SHOP_PRICES[ITEM.Elixir_vine] = 30;
_SHOP_PRICES[ITEM.Elixir_venom] = 40;
_SHOP_PRICES[ITEM.Elixir_decay] = 50;
_SHOP_PRICES[ITEM.Elixir_chaos] = 75;

_SHOP_PRICES[ITEM.Sword_wooden] = 20;
_SHOP_PRICES[ITEM.Dagger] = 50;
_SHOP_PRICES[ITEM.Mace] = 75;
_SHOP_PRICES[ITEM.Shield] = 200;
_SHOP_PRICES[ITEM.Spear] = 250;
_SHOP_PRICES[ITEM.Sword_iron] = 500;
_SHOP_PRICES[ITEM.Axe] = 600;
_SHOP_PRICES[ITEM.Sword_great] = 1000;

_SHOP_PRICES[ITEM.Arrow] = 2;
_SHOP_PRICES[ITEM.Poison_darts] = 5;
_SHOP_PRICES[ITEM.Rope] = 100;
_SHOP_PRICES[ITEM.Bow] = 150;
_SHOP_PRICES[ITEM.Net] = 200;

_SHOP_PRICES[ITEM.Stone] = 4;
_SHOP_PRICES[ITEM.Mushroom] = 4;
_SHOP_PRICES[ITEM.Berry] = 6;
_SHOP_PRICES[ITEM.Stick] = 6;
_SHOP_PRICES[ITEM.Seashell] = 6;
_SHOP_PRICES[ITEM.Fang] = 10;
_SHOP_PRICES[ITEM.Bone] = 10;
_SHOP_PRICES[ITEM.Flower] = 10;
_SHOP_PRICES[ITEM.Meat] = 10;
_SHOP_PRICES[ITEM.Feather] = 20;
_SHOP_PRICES[ITEM.Linnens] = 20;
_SHOP_PRICES[ITEM.Goo] = 20;
_SHOP_PRICES[ITEM.AncientRubbles] = 20;
_SHOP_PRICES[ITEM.Fur] = 30;
_SHOP_PRICES[ITEM.Scale] = 40;
_SHOP_PRICES[ITEM.Eye] = 50;
_SHOP_PRICES[ITEM.Medallion] = 750;

_SHOP_PRICES[ITEM.Spoon] = 1;
_SHOP_PRICES[ITEM.Candle] = 2;
_SHOP_PRICES[ITEM.OldBook] = 3;
_SHOP_PRICES[ITEM.Vase] = 3;
_SHOP_PRICES[ITEM.Umbrella] = 4;
_SHOP_PRICES[ITEM.SnobRichKey] = 6;
_SHOP_PRICES[ITEM.SilverGoblet] = 8;
_SHOP_PRICES[ITEM.PorcelainDoll] = 10;
_SHOP_PRICES[ITEM.RareWine] = 20;
_SHOP_PRICES[ITEM.StuffedBearHead] = 50;
_SHOP_PRICES[ITEM.MassiveGoldStatue] = 70;


_SHOP_SELLONLY = [ITEM.Medallion, ITEM.Goo, ITEM.Eye, ITEM.Fur, ITEM.Seashell, ITEM.Fang, ITEM.Bone, ITEM.Stick, ITEM.Stone, ITEM.Scale, ITEM.Feather, ITEM.Flower, ITEM.Linnens, ITEM.Berry, ITEM.Mushroom,
ITEM.OldBook,ITEM.PorcelainDoll,ITEM.SnobRichKey,ITEM.Spoon,ITEM.SilverGoblet,ITEM.Umbrella,ITEM.Candle,ITEM.Vase,ITEM.RareWine,ITEM.StuffedBearHead,ITEM.MassiveGoldStatue, ITEM.AncientRubbles,
];

const SHOP = {
  selling_discount: 0.5,

  _prices: {

    buy: function(object){
      return Math.round(_SHOP_PRICES[object] * (1 - 0.4 * MARTYRDOM.effect(MARTYRDOMS.Negociation)));
    },
    sell: function(object){
      return Math.ceil(SHOP.selling_discount*_SHOP_PRICES[object] * (1 + 3 * MARTYRDOM.effect(MARTYRDOMS.Negociation)));
    },
  },

  _transaction: {
    buy: function(object){
      var price = SHOP._prices.buy(object);
      if (INVENTORY.cash() >= price){
        INVENTORY.increase(object);
        INVENTORY.decrease(ITEM.Coin, price);
        alert("Purchased " + object);
      }
      SHOP._current_menu.close();
      SHOP._menu.buy();
    },

    _sell: function(object, count){
      var count = count || 1;
      if (INVENTORY.count(object) >= count){
        INVENTORY.decrease(object, count);
        INVENTORY.increase(ITEM.Coin, count * SHOP._prices.sell(object));
        if(object == ITEM.Medallion){
          alert("You feel awful for getting rid of the last memento of the person you cared about the most... This sacrifice better be worth it.");
        }
      }
    },

    sell: function(object){
      SHOP._transaction._sell(object, 1);
      SHOP._current_menu.close();
      SHOP._menu.sell();
    },

    selljunk: function(object){
      var sum = 0 ;
      var summary = "";
      for(var index of _SHOP_SELLONLY){
        if(!Object.keys(_SHOP_PRICES).includes(index)){
          continue;
        }
        var c = INVENTORY.count(index);
        if(!c){
          continue;
        }
        SHOP._transaction._sell(index, c);
        sum += c *  SHOP._prices.sell(index);
        if (summary.length > 0){
          summary += ", ";
        }
        summary += c + " " + index;
      }
      alert(`You sold for ${sum} coins worth of junk: ${summary}`);
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
            {"text": "Sell all junk", "effect": function(){ SHOP._transaction.selljunk(); }},
            {"text": "Leave", "effect": "##CLOSE"},
         ]
       );
    },
  },

  menu_sell: function(type, threshold) {
    SHOP._current_type = type;
    SHOP._current_threshold = threshold;
    SHOP._menu.sell();
  },

  menu_buy: function(type, threshold) {
    SHOP._current_type = type;
    SHOP._current_threshold = threshold;
    SHOP._menu.buy();
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

  get_raw_prices: function(){
    return _SHOP_PRICES;
  },
}
