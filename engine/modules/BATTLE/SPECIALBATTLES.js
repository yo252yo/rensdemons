
const SPECIALBATTLES = {
  _battle_extra_data: null,
  
  event: function(text, callback){
    SPECIALBATTLES._battle_extra_data = text;
    BATTLE.api.make("_unique_event", callback);
  },

  rubble: function(payoff, callback){
    SPECIALBATTLES._battle_extra_data = payoff;
    BATTLE.api.make("_rubble", callback);
  },

  treasure: function(payoff, callback){
    SPECIALBATTLES._battle_extra_data = payoff;
    BATTLE.api.make("_treasure", callback);
  },

  conversation: function(name, payoff, seed, callback){
    SPECIALBATTLES._battle_extra_data = [payoff, seed];
    BATTLE.api.make("conversations/" + name, callback);
  },

  shop: function(sprite_nb){
    SPECIALBATTLES._battle_extra_data = [sprite_nb];
    BATTLE.api.make('_shop');
  },
}
